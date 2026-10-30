import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Settings } from 'lucide-react';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  preferences: boolean;
  decidedAt: string;
}

const STORAGE_KEY = 'declaracaoonline_cookie_consent_v1';

export const CookieBanner: React.FC<{ onOpenPrivacy: () => void }> = ({ onOpenPrivacy }) => {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [preferences, setPreferences] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setVisible(true);
      } else {
        const parsed: CookiePreferences = JSON.parse(saved);
        applyAnalyticsConsent(parsed.analytics);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const applyAnalyticsConsent = (enabled: boolean) => {
    // Desativa ou reativa Google Analytics conforme escolha do usuário
    (window as unknown as Record<string, boolean>)['ga-disable-G-4SG7VKTG5V'] = !enabled;
  };

  const handleAcceptAll = () => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics: true,
      preferences: true,
      decidedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    applyAnalyticsConsent(true);
    setVisible(false);
  };

  const handleRejectAll = () => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics: false,
      preferences: false,
      decidedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    applyAnalyticsConsent(false);
    setVisible(false);
  };

  const handleSavePreferences = () => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics,
      preferences,
      decidedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    applyAnalyticsConsent(analytics);
    setModalOpen(false);
    setVisible(false);
  };

  if (!visible && !modalOpen) return null;

  return (
    <>
      {/* Bottom Sticky Banner */}
      {visible && (
        <div
          id="cookie-banner"
          className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl p-4 sm:p-5 no-print animate-in slide-in-from-bottom duration-300"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1 text-slate-700 text-xs sm:text-sm leading-relaxed">
              <p>
                Usamos cookies para melhorar sua experiência e analisar o tráfego do site em conformidade com a <strong>LGPD</strong>. Ao clicar em <strong>"Aceitar"</strong>, você concorda com o uso de cookies. Ao clicar em <strong>"Recusar"</strong>, utilizaremos apenas os essenciais. Saiba mais em nossa{' '}
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="text-teal-700 hover:text-teal-900 underline font-semibold transition"
                >
                  Política de Privacidade
                </button>
                .
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={handleRejectAll}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              >
                Recusar
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Personalizar</span>
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white shadow-sm transition"
              >
                Aceitar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 no-print animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-2xl text-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    Preferências de Cookies
                  </h3>
                  <p className="text-xs text-slate-500">
                    Gerencie suas opções de privacidade conforme a LGPD
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs sm:text-sm">
              {/* Essential */}
              <div className="flex items-start justify-between gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div>
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>Cookies Essenciais</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-normal">
                      Obrigatório
                    </span>
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Necessários para o funcionamento seguro do gerador, navegação e download das declarações. Não podem ser desativados.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled={true}
                  className="mt-1 h-4 w-4 rounded text-teal-600 cursor-not-allowed"
                />
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-4 p-3.5 rounded-xl border border-slate-200 hover:border-teal-300 transition">
                <div>
                  <h4 className="font-bold text-slate-900">Cookies Analíticos (Google Analytics)</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Permitem entender de forma agregada e anônima quais modelos de declarações são mais acessados para aprimorar o serviço.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="analytics-toggle"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded text-teal-600 cursor-pointer accent-teal-600"
                />
              </div>

              {/* Preferences */}
              <div className="flex items-start justify-between gap-4 p-3.5 rounded-xl border border-slate-200 hover:border-teal-300 transition">
                <div>
                  <h4 className="font-bold text-slate-900">Cookies de Preferências</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Permitem que o navegador guarde seu histórico e rascunhos de declarações preenchidas localmente no seu dispositivo.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="preferences-toggle"
                  checked={preferences}
                  onChange={(e) => setPreferences(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded text-teal-600 cursor-pointer accent-teal-600"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSavePreferences}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white shadow-sm transition"
              >
                Salvar Preferências
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
