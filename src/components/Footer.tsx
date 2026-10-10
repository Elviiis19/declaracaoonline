import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, CheckCircle, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  onOpenInstitutional: (section: 'about' | 'privacy' | 'terms' | 'contact' | 'sitemap') => void;
  onSelectModelSlug?: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInstitutional, onSelectModelSlug }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm no-print">
      {/* Upper banner: Security & LGPD commitment */}
      <div className="border-b border-slate-900 bg-slate-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Privacidade Total e LGPD</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Nenhum dado pessoal é transmitido ou guardado em servidores externos. Seus documentos ficam salvos com segurança apenas no seu navegador.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Amparado pela Lei 7.115/1983</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Presunção legal de veracidade em todo o território nacional perante órgãos públicos, faculdades, bancos e empresas.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Suporte & Atendimento Humano</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Dúvidas ou sugestões? Converse diretamente com o gestor do portal através do WhatsApp no contato oficial.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">
                Declaração<span className="text-teal-400">Online</span>
              </span>
              <span className="bg-teal-900/80 text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-700/50">
                Oficial 2026
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              O portal <strong>declaracaoonline.com.br</strong> foi idealizado para facilitar a vida do cidadão brasileiro, permitindo preencher, formatar e imprimir declarações com validade jurídica de forma rápida, intuitiva e sem custo abusivo de despachante.
            </p>
            <div className="pt-2 text-xs text-slate-300 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Rondônia / Brasil • Atendimento em todo território nacional</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a
                  href="https://wa.me/5569981039664?text=Ol%C3%A1%20Elvis,%20estou%20no%20site%20Declara%C3%A7%C3%A3o%20Online%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-400 underline underline-offset-2 transition"
                >
                  WhatsApp: (69) 98103-9664
                </a>
              </p>
            </div>
          </div>

          {/* Modelos Populares */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Modelos Mais Utilizados
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectModelSlug?.('declaracao-de-residencia')}
                  className="hover:text-teal-400 transition text-left"
                >
                  Declaração de Residência
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectModelSlug?.('declaracao-de-renda-autonomo')}
                  className="hover:text-teal-400 transition text-left"
                >
                  Declaração de Renda Autônomo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectModelSlug?.('declaracao-de-uniao-estavel')}
                  className="hover:text-teal-400 transition text-left"
                >
                  Declaração de União Estável
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectModelSlug?.('declaracao-de-desemprego')}
                  className="hover:text-teal-400 transition text-left"
                >
                  Declaração de Desemprego
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectModelSlug?.('declaracao-de-dependencia-economica')}
                  className="hover:text-teal-400 transition text-left"
                >
                  Dependência Econômica
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectModelSlug?.('declaracao-de-isencao-de-imposto-de-renda')}
                  className="hover:text-teal-400 transition text-left"
                >
                  Isenção de Imposto de Renda
                </button>
              </li>
            </ul>
          </div>

          {/* Modelos Civis e Bens */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Documentos & Negócios
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectModelSlug?.('declaracao-de-venda-e-recibo-de-veiculo')}
                  className="hover:text-teal-400 transition text-left"
                >
                  Venda e Recibo de Veículo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectModelSlug?.('declaracao-de-nao-possuir-outro-imovel')}
                  className="hover:text-teal-400 transition text-left"
                >
                  Não Possuir Outro Imóvel
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectModelSlug?.('declaracao-de-extravio-de-documento')}
                  className="hover:text-teal-400 transition text-left"
                >
                  Extravio / Perda de Documento
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectModelSlug?.('declaracao-de-cessao-de-imovel-comodato')}
                  className="hover:text-teal-400 transition text-left"
                >
                  Cessão Gratuita de Imóvel
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectModelSlug?.('declaracao-de-prestacao-de-servicos')}
                  className="hover:text-teal-400 transition text-left"
                >
                  Prestação de Serviços Autônomos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectModelSlug?.('declaracao-de-autorizacao-de-viagem-hospedagem-menor')}
                  className="hover:text-teal-400 transition text-left"
                >
                  Autorização de Viagem de Menor
                </button>
              </li>
            </ul>
          </div>

          {/* Institucional & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Institucional
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onOpenInstitutional('about')}
                  className="hover:text-teal-400 transition text-left"
                >
                  Quem Somos & História
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInstitutional('privacy')}
                  className="hover:text-teal-400 transition text-left"
                >
                  Política de Privacidade (LGPD)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInstitutional('terms')}
                  className="hover:text-teal-400 transition text-left"
                >
                  Termos e Condições de Uso
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInstitutional('contact')}
                  className="hover:text-teal-400 transition text-left"
                >
                  Fale Conosco / Contato
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInstitutional('sitemap')}
                  className="hover:text-teal-400 transition text-left"
                >
                  Mapa do Site (Sitemap)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory legal and ownership footer line */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-center sm:text-left text-slate-400">
            <p className="font-semibold text-slate-200">
              Gerido por Elvis Dias
            </p>
            <p className="mt-1 text-slate-400">
              CNPJ: 43.027.941/0001-21 | Contato: (69) 98103-9664
            </p>
          </div>

          <div className="text-center sm:text-right text-slate-500 text-[11px]">
            <p>© {new Date().getFullYear()} Declaração Online — Todos os direitos reservados.</p>
            <p className="mt-0.5">
              https://declaracaoonline.com.br • Hospedado com alta performance e PWA nativo
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
