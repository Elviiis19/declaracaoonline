import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { FileText, Download, ShieldCheck, HelpCircle, Users, Bookmark, Menu, X, Smartphone } from 'lucide-react';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
  savedCount: number;
  onOpenSavedModal: () => void;
  onSelectCategory?: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  savedCount,
  onOpenSavedModal,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: string) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white no-print">
        {/* Top announcement / system status bar */}
        <div className="bg-slate-950/90 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-teal-300 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Ambiente Seguro SSL • Lei Federal 7.115/83 & Lei 13.726/18</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400 font-mono select-none">
              <span className="bg-slate-800 px-2 py-0.5 rounded text-teal-400 font-semibold">SISTEMA WEB v2.6</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">ACESSO 100% GRATUITO</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div
              onClick={() => handleNav('models')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 p-0.5 shadow-lg shadow-teal-900/40 flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400" />
                </div>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>Declaração<span className="text-teal-400">Online</span></span>
                  <span className="text-[10px] font-semibold text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded-md border border-teal-800/80 uppercase tracking-wider hidden md:inline">
                    App Web
                  </span>
                </span>
                <p className="text-[11px] text-slate-400 leading-none hidden sm:block">
                  Sistema Oficial de Emissão Documental • Formato A4
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => handleNav('models')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                  activeView === 'models'
                    ? 'text-teal-400 bg-slate-800/80'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Modelos de Declaração
              </button>
              <button
                onClick={() => handleNav('validity')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                  activeView === 'validity'
                    ? 'text-teal-400 bg-slate-800/80'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Validade Jurídica
              </button>
              <button
                onClick={() => handleNav('how-it-works')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                  activeView === 'how-it-works'
                    ? 'text-teal-400 bg-slate-800/80'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Como Funciona
              </button>
              <button
                onClick={() => handleNav('faq')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                  activeView === 'faq'
                    ? 'text-teal-400 bg-slate-800/80'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Dúvidas (FAQ)
              </button>
              <button
                onClick={() => handleNav('about')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                  activeView === 'about'
                    ? 'text-teal-400 bg-slate-800/80'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Quem Somos
              </button>
            </nav>

            {/* Right side actions (Saved declarations + PWA Install) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Saved items trigger button */}
              <button
                onClick={onOpenSavedModal}
                className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-medium border border-slate-700/80 transition"
                title="Acessar declarações que você salvou no navegador"
              >
                <Bookmark className="w-4 h-4 text-teal-400" />
                <span className="hidden sm:inline">Salvas</span>
                {savedCount > 0 && (
                  <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-bold leading-none text-white bg-teal-600 rounded-full">
                    {savedCount}
                  </span>
                )}
              </button>

              {/* In-App PWA Install Prompt (Chromium / Android) */}
              {!isInstalled && isInstallable && (
                <button
                  onClick={install}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-teal-900/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Instalar App</span>
                </button>
              )}

              {/* iOS PWA Install Guide trigger */}
              {!isInstalled && isIOS && (
                <button
                  onClick={() => setShowIOSGuide(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium border border-slate-700 transition"
                >
                  <Smartphone className="w-4 h-4 text-teal-400" />
                  <span className="hidden sm:inline">Instalar no iPhone</span>
                  <span className="sm:hidden">App</span>
                </button>
              )}

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                aria-label="Abrir menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2">
            <button
              onClick={() => handleNav('models')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                activeView === 'models' ? 'text-teal-400 bg-slate-800' : 'text-slate-300'
              }`}
            >
              Modelos de Declaração
            </button>
            <button
              onClick={() => handleNav('validity')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                activeView === 'validity' ? 'text-teal-400 bg-slate-800' : 'text-slate-300'
              }`}
            >
              Validade Jurídica (Lei 7.115/83)
            </button>
            <button
              onClick={() => handleNav('how-it-works')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                activeView === 'how-it-works' ? 'text-teal-400 bg-slate-800' : 'text-slate-300'
              }`}
            >
              Como Funciona Passo a Passo
            </button>
            <button
              onClick={() => handleNav('faq')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                activeView === 'faq' ? 'text-teal-400 bg-slate-800' : 'text-slate-300'
              }`}
            >
              Dúvidas Frequentes (FAQ)
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                activeView === 'about' ? 'text-teal-400 bg-slate-800' : 'text-slate-300'
              }`}
            >
              Quem Somos
            </button>
          </div>
        )}
      </header>

      {/* iOS Installation Instruction Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 no-print">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-white animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Como instalar no iPhone ou iPad</h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Você pode usar o Declaração Online direto como aplicativo na sua tela de início sem ocupar memória:
            </p>
            <ol className="mt-4 space-y-2.5 text-xs text-slate-300 font-medium list-decimal list-inside bg-slate-800/60 p-4 rounded-xl border border-slate-700/50">
              <li>Toque no botão de <strong>Compartilhar</strong> (ícone do quadrado com a seta para cima no Safari)</li>
              <li>Role a lista para baixo e toque em <strong>"Adicionar à Tela de Início"</strong></li>
              <li>Toque em <strong>"Adicionar"</strong> no canto superior direito</li>
            </ol>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full rounded-xl bg-teal-600 hover:bg-teal-500 py-2.5 text-sm font-semibold text-white transition"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </>
  );
};
