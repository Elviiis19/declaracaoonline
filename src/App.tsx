import React, { useState, useEffect } from 'react';
import { DECLARATION_MODELS } from './data/models';
import { DeclarationModel, SavedDeclaration } from './types/declaration';
import { getSavedDeclarations } from './utils/storage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ModelCatalog } from './components/ModelCatalog';
import { DeclarationGenerator } from './components/DeclarationGenerator';
import { LegalValidityGuide } from './components/LegalValidityGuide';
import { HowItWorks } from './components/HowItWorks';
import { FAQSection } from './components/FAQSection';
import { SavedDeclarationsModal } from './components/SavedDeclarationsModal';
import { GovSignatureGuideModal } from './components/GovSignatureGuideModal';
import { InstitutionalModal } from './components/InstitutionalModal';
import { OfflineIndicator } from './components/OfflineIndicator';

export default function App() {
  const [activeView, setActiveView] = useState<string>('models');
  const [selectedModel, setSelectedModel] = useState<DeclarationModel | null>(null);
  const [savedList, setSavedList] = useState<SavedDeclaration[]>([]);
  const [savedModalOpen, setSavedModalOpen] = useState(false);
  const [govGuideModalOpen, setGovGuideModalOpen] = useState(false);
  const [institutionalSection, setInstitutionalSection] = useState<
    'about' | 'privacy' | 'terms' | 'contact' | 'sitemap' | null
  >(null);
  const [editingSavedId, setEditingSavedId] = useState<string | undefined>(undefined);
  const [editingValues, setEditingValues] = useState<Record<string, string> | undefined>(undefined);

  // Load saved declarations from browser localStorage on mount
  const refreshSavedList = () => {
    setSavedList(getSavedDeclarations());
  };

  useEffect(() => {
    refreshSavedList();
  }, []);

  // Handle URL hash routing (e.g., #declaracao-de-residencia, #validade, #faq)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) return;

      if (hash === 'valididade' || hash === 'validity') {
        setActiveView('validity');
        setSelectedModel(null);
      } else if (hash === 'como-funciona' || hash === 'how-it-works') {
        setActiveView('how-it-works');
        setSelectedModel(null);
      } else if (hash === 'faq' || hash === 'duvidas') {
        setActiveView('faq');
        setSelectedModel(null);
      } else if (hash === 'quem-somos' || hash === 'about') {
        setActiveView('about');
        setSelectedModel(null);
      } else {
        // Try matching a declaration model slug
        const matched = DECLARATION_MODELS.find(
          (m) => m.slug === hash || m.id === hash
        );
        if (matched) {
          setSelectedModel(matched);
          setActiveView('generator');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectModel = (model: DeclarationModel) => {
    setSelectedModel(model);
    setEditingSavedId(undefined);
    setEditingValues(undefined);
    setActiveView('generator');
    window.location.hash = model.slug;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectModelSlug = (slug: string) => {
    const matched = DECLARATION_MODELS.find((m) => m.slug === slug || m.id === slug);
    if (matched) {
      handleSelectModel(matched);
    }
  };

  const handleLoadSavedDeclaration = (item: SavedDeclaration) => {
    const matched = DECLARATION_MODELS.find((m) => m.id === item.modelId);
    if (matched) {
      setSelectedModel(matched);
      setEditingSavedId(item.id);
      setEditingValues(item.values);
      setActiveView('generator');
      window.location.hash = matched.slug;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToModels = () => {
    setSelectedModel(null);
    setEditingSavedId(undefined);
    setEditingValues(undefined);
    setActiveView('models');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInstitutional = (
    section: 'about' | 'privacy' | 'terms' | 'contact' | 'sitemap'
  ) => {
    setInstitutionalSection(section);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-teal-700 selection:text-white">
      {/* Header */}
      <Header
        activeView={activeView}
        setActiveView={(view) => {
          if (view === 'about') {
            handleOpenInstitutional('about');
          } else {
            setActiveView(view);
            setSelectedModel(null);
            window.location.hash = view === 'models' ? '' : view;
          }
        }}
        savedCount={savedList.length}
        onOpenSavedModal={() => setSavedModalOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {activeView === 'generator' && selectedModel ? (
          <DeclarationGenerator
            model={selectedModel}
            onBackToModels={handleBackToModels}
            onOpenGovGuide={() => setGovGuideModalOpen(true)}
            onDeclarationSaved={refreshSavedList}
            initialValues={editingValues}
            initialId={editingSavedId}
          />
        ) : activeView === 'validity' ? (
          <LegalValidityGuide
            onGoToModels={() => {
              setActiveView('models');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenGovGuide={() => setGovGuideModalOpen(true)}
          />
        ) : activeView === 'how-it-works' ? (
          <HowItWorks
            onGoToModels={() => {
              setActiveView('models');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenGovGuide={() => setGovGuideModalOpen(true)}
          />
        ) : activeView === 'faq' ? (
          <FAQSection onOpenGovGuide={() => setGovGuideModalOpen(true)} />
        ) : (
          /* Default: Models Catalog + Hero */
          <>
            <ModelCatalog onSelectModel={handleSelectModel} />
            <FAQSection onOpenGovGuide={() => setGovGuideModalOpen(true)} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenInstitutional={handleOpenInstitutional}
        onSelectModelSlug={handleSelectModelSlug}
      />

      {/* Modals & Floating Indicators */}
      <SavedDeclarationsModal
        isOpen={savedModalOpen}
        onClose={() => setSavedModalOpen(false)}
        savedList={savedList}
        onLoadDeclaration={handleLoadSavedDeclaration}
        onRefreshList={refreshSavedList}
      />

      <GovSignatureGuideModal
        isOpen={govGuideModalOpen}
        onClose={() => setGovGuideModalOpen(false)}
      />

      <InstitutionalModal
        section={institutionalSection}
        onClose={() => setInstitutionalSection(null)}
        onSelectModelSlug={handleSelectModelSlug}
      />

      <OfflineIndicator />
    </div>
  );
}
