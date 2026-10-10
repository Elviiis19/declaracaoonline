import React from 'react';
import { X, ExternalLink, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface GovSignatureGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GovSignatureGuideModal: React.FC<GovSignatureGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 no-print animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Como Assinar pelo Gov.br Gratuitamente
              </h3>
              <p className="text-xs text-slate-400">
                Tem a mesma validade jurídica de firma reconhecida em cartório (Lei nº 14.063/2020)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 space-y-4 text-sm text-slate-300">
          <p className="leading-relaxed">
            Desde a aprovação da Lei Federal nº 14.063/2020, todo cidadão brasileiro com conta Gov.br nível <strong>Prata ou Ouro</strong> pode assinar documentos eletronicamente com valor legal pleno e autenticidade garantida por QR Code, sem precisar gastar dinheiro no cartório.
          </p>

          <div className="space-y-3 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold shrink-0">1</span>
              <div>
                <strong className="text-white block text-sm">Salve a Declaração em PDF</strong>
                <p className="text-xs text-slate-300 mt-0.5">
                  Clique no botão <strong>"Imprimir / Salvar em PDF"</strong> aqui na página e selecione "Salvar como PDF" no seu computador ou celular.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold shrink-0">2</span>
              <div>
                <strong className="text-white block text-sm">Acesse o Assinador Oficial do Governo</strong>
                <p className="text-xs text-slate-300 mt-0.5">
                  Entre no site oficial gratuito do ITI / Governo Federal:
                </p>
                <a
                  href="https://assinador.iti.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-1.5 text-xs text-teal-400 hover:text-teal-300 underline font-medium"
                >
                  <span>https://assinador.iti.br</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold shrink-0">3</span>
              <div>
                <strong className="text-white block text-sm">Carregue o arquivo e posicione sua assinatura</strong>
                <p className="text-xs text-slate-300 mt-0.5">
                  Faça login com seu CPF e senha do Gov.br. Envie o PDF baixado e arraste o carimbo de assinatura sobre a linha do seu nome.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold shrink-0">4</span>
              <div>
                <strong className="text-white block text-sm">Confirme com código SMS e baixe assinado</strong>
                <p className="text-xs text-slate-300 mt-0.5">
                  Você receberá uma notificação ou SMS do Gov.br. Confirme e pronto! O arquivo conterá um carimbo digital auditável pronto para enviar por e-mail ou WhatsApp.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-teal-950/40 border border-teal-800/40 rounded-xl flex items-start gap-2.5 text-xs text-teal-200">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <p>
              <strong>Aceitação Universal:</strong> Tribunais de Justiça, bancos (Caixa, Banco do Brasil, Bradesco, etc.), universidades, cartórios e prefeituras são legalmente obrigados a aceitar a assinatura eletrônica do Gov.br.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 font-semibold text-white text-sm transition"
          >
            Entendi, fechar tutorial
          </button>
        </div>
      </div>
    </div>
  );
};
