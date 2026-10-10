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

  // Handle URL pathname and hash routing (e.g., /declaracao-de-residencia or #declaracao-de-residencia)
  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname.replace(/^\//, '').trim();
      const hash = window.location.hash.replace(/^#/, '').trim();
      const route = pathname || hash;

      if (!route) {
        setActiveView('models');
        setSelectedModel(null);
        document.title = 'Declaração Online - Gerador de Declarações e Documentos';
        return;
      }

      if (route === 'valididade' || route === 'validity') {
        setActiveView('validity');
        setSelectedModel(null);
        document.title = 'Validade Jurídica (Lei 7.115/83 e Lei 13.726/18) - Declaração Online';
      } else if (route === 'como-funciona' || route === 'how-it-works') {
        setActiveView('how-it-works');
        setSelectedModel(null);
        document.title = 'Como Funciona Passo a Passo - Declaração Online';
      } else if (route === 'faq' || route === 'duvidas') {
        setActiveView('faq');
        setSelectedModel(null);
        document.title = 'Dúvidas Frequentes e Validade em Cartório - Declaração Online';
      } else if (route === 'quem-somos' || route === 'about') {
        setActiveView('about');
        setSelectedModel(null);
        document.title = 'Quem Somos - Declaração Online (Elvis Dias)';
      } else {
        // Match declaration model slug
        const matched = DECLARATION_MODELS.find(
          (m) => m.slug === route || m.id === route
        );
        if (matched) {
          setSelectedModel(matched);
          setActiveView('generator');
          document.title = `${matched.title} - Gerador Oficial em PDF | Declaração Online`;
        }
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleSelectModel = (model: DeclarationModel) => {
    setSelectedModel(model);
    setEditingSavedId(undefined);
    setEditingValues(undefined);
    setActiveView('generator');
    window.history.pushState(null, '', `/${model.slug}`);
    document.title = `${model.title} - Gerador Oficial em PDF | Declaração Online`;
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
      window.history.pushState(null, '', `/${matched.slug}`);
      document.title = `${matched.title} - Editar Cópia | Declaração Online`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToModels = () => {
    setSelectedModel(null);
    setEditingSavedId(undefined);
    setEditingValues(undefined);
    setActiveView('models');
    window.history.pushState(null, '', '/');
    document.title = 'Declaração Online - Gerador de Declarações e Documentos';
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
