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
import { CookieBanner } from './components/CookieBanner';

export default function App() {
  const [activeView, setActiveView] = useState<string>('models');
  const [selectedModel, setSelectedModel] = useState<DeclarationModel | null>(null);
  const [savedList, setSavedList] = useState<SavedDeclaration[]>([]);
  const [savedModalOpen, setSavedModalOpen] = useState(false);
  const [govGuideModalOpen, setGovGuideModalOpen] = useState(false);
  const [institutionalSection, setInstitutionalSection] = useState<
    'about' | 'privacy' | 'terms' | 'contact' | 'sitemap' | 'disclaimer' | null
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

  // Helper to dynamically synchronize title, canonical URL, and description for Googlebot and users
  const updateMetaTags = (title: string, description: string, canonicalPath: string) => {
    document.title = title;
    const canonicalUrl = `https://declaracaoonline.com.br${canonicalPath}`;

    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = canonicalUrl;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Send Real-Time SPA Pageview to Google Analytics (GA4)
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'page_view', {
        page_title: title,
        page_location: canonicalUrl,
        page_path: canonicalPath,
      });
    }
  };

  // Handle URL pathname and hash routing (e.g., /declaracao-de-residencia, /residencia, /aviso-legal, #declaracao-de-residencia)
  useEffect(() => {
    const handleLocationChange = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const redirectParam = urlParams.get('p') || urlParams.get('redirect');
      if (redirectParam) {
        // Clean query string and update history to real path without reloading
        const cleanPath = redirectParam.startsWith('/') ? redirectParam : `/${redirectParam}`;
        window.history.replaceState(null, '', cleanPath);
      }

      const activePath = redirectParam ? redirectParam.replace(/^\//, '') : window.location.pathname.replace(/^\//, '');
      const rawPathname = activePath.replace(/\/$/, '').trim();
      const rawHash = window.location.hash.replace(/^#\/?/, '').replace(/\/$/, '').trim();
      const rawRoute = rawPathname || rawHash;
      // Strip optional "declaracoes/" prefix if visited
      const route = rawRoute.replace(/^declaracoes\//, '');

      if (!route) {
        setActiveView('models');
        setSelectedModel(null);
        updateMetaTags(
          'Declaração Online - Gerador de Declarações e Documentos',
          'Gerador gratuito de declarações com validade jurídica (Lei nº 7.115/83). Modelos de residência, renda autônomo, união estável, desemprego e mais.',
          '/'
        );
        return;
      }

      if (route === 'valididade' || route === 'validity') {
        setActiveView('validity');
        setSelectedModel(null);
        updateMetaTags(
          'Validade Jurídica (Lei 7.115/83 e Lei 13.726/18) - Declaração Online',
          'Entenda a validade legal das declarações civis pela Lei Federal 7.115/83 e a dispensa de reconhecimento de firma em cartório pela Lei 13.726/2018.',
          '/validade-juridica'
        );
      } else if (route === 'como-funciona' || route === 'how-it-works') {
        setActiveView('how-it-works');
        setSelectedModel(null);
        updateMetaTags(
          'Como Funciona Passo a Passo - Declaração Online',
          'Veja como preencher seus dados, gerar o documento oficial em formato A4 e assinar gratuitamente com o Gov.br em menos de 2 minutos.',
          '/como-funciona'
        );
      } else if (route === 'faq' || route === 'duvidas' || route === 'perguntas-frequentes') {
        setActiveView('faq');
        setSelectedModel(null);
        updateMetaTags(
          'Dúvidas Frequentes e Validade em Cartório - Declaração Online',
          'Perguntas frequentes sobre declarações civis, aceitação em bancos, PROUNI, CRAS e validade jurídica de documentos sem cartório.',
          '/perguntas-frequentes'
        );
      } else if (route === 'quem-somos' || route === 'about' || route === 'sobre') {
        setInstitutionalSection('about');
        updateMetaTags(
          'Quem Somos - Declaração Online (Elvis Dias)',
          'Conheça o portal Declaração Online, gerido por Elvis Dias (CNPJ 43.027.941/0001-21), facilitando a desburocratização de documentos no Brasil.',
          '/sobre'
        );
      } else if (route === 'politica-privacidade' || route === 'politica-de-privacidade') {
        setInstitutionalSection('privacy');
        updateMetaTags(
          'Política de Privacidade (LGPD) - Declaração Online',
          'Política de privacidade do portal Declaração Online. Seus dados nunca saem do seu navegador. 100% em conformidade com a LGPD.',
          '/politica-privacidade'
        );
      } else if (route === 'termos-uso' || route === 'termos-de-uso') {
        setInstitutionalSection('terms');
        updateMetaTags(
          'Termos de Uso - Declaração Online',
          'Termos e condições de uso do portal gratuito Declaração Online.',
          '/termos-uso'
        );
      } else if (route === 'aviso-legal') {
        setInstitutionalSection('disclaimer');
        updateMetaTags(
          'Aviso Legal e Isenção - Declaração Online',
          'Aviso legal e conformidade jurídica das declarações civis pela Lei 7.115/83 e Lei 13.726/18.',
          '/aviso-legal'
        );
      } else if (route === 'fale-conosco' || route === 'contato') {
        setInstitutionalSection('contact');
        updateMetaTags(
          'Fale Conosco - Declaração Online',
          'Entre em contato com o suporte do Declaração Online pelo WhatsApp (69) 98103-9664.',
          '/fale-conosco'
        );
      } else {
        // Match declaration model slug or id or direct short route
        const matched = DECLARATION_MODELS.find(
          (m) =>
            m.slug === route ||
            m.id === route ||
            m.slug === `declaracao-de-${route}` ||
            m.slug === `declaracao-${route}` ||
            (route === 'autorizacao-de-viagem-para-menor' && m.id === 'autorizacao-viagem') ||
            (route === 'declaracao-de-veracidade' && m.id === 'veracidade-documentos') ||
            (route === 'declaracao-de-trabalho' && m.id === 'declaracao-trabalho')
        );
        if (matched) {
          setSelectedModel(matched);
          setActiveView('generator');
          updateMetaTags(
            `${matched.title} - Gerador Oficial em PDF | Declaração Online`,
            `${matched.description} Preenchimento gratuito em formato padrão A4 com validade pela Lei Federal nº 7.115/83.`,
            `/${matched.slug}`
          );
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
    updateMetaTags(
      `${model.title} - Gerador Oficial em PDF | Declaração Online`,
      `${model.description} Preenchimento gratuito em formato padrão A4 com validade pela Lei Federal nº 7.115/83.`,
      `/${model.slug}`
    );
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
    section: 'about' | 'privacy' | 'terms' | 'contact' | 'sitemap' | 'disclaimer'
  ) => {
    setInstitutionalSection(section);
  };

  return (
    <div className="app-container min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-teal-700 selection:text-white print:block print:min-h-0 print:bg-white">
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
      <main className="flex-1 print:block print:p-0 print:m-0">
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

      {/* LGPD Cookie Consent Banner */}
      <CookieBanner onOpenPrivacy={() => handleOpenInstitutional('privacy')} />
    </div>
  );
}
