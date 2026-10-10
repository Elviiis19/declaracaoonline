import React, { useState } from 'react';
import { DECLARATION_MODELS } from '../data/models';
import {
  X,
  ShieldCheck,
  Users,
  FileText,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Lock,
  ChevronRight,
  Send
} from 'lucide-react';

interface InstitutionalModalProps {
  section: 'about' | 'privacy' | 'terms' | 'contact' | 'sitemap' | null;
  onClose: () => void;
  onSelectModelSlug: (slug: string) => void;
}

export const InstitutionalModal: React.FC<InstitutionalModalProps> = ({
  section,
  onClose,
  onSelectModelSlug,
}) => {
  const [currentSection, setCurrentSection] = useState<'about' | 'privacy' | 'terms' | 'contact' | 'sitemap'>(
    section || 'about'
  );

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  // Sync state if prop changes
  React.useEffect(() => {
    if (section) setCurrentSection(section);
  }, [section]);

  if (!section) return null;

  const handleSendContact = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(
      `Olá Elvis, meu nome é ${contactName} (${contactEmail}). Mensagem enviada pelo site Declaração Online: ${contactMessage}`
    );
    window.open(`https://wa.me/5569981039664?text=${encoded}`, '_blank');
    setContactSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 no-print animate-in fade-in duration-200">
      <div className="w-full max-w-3xl rounded-2xl bg-white border border-slate-200 shadow-2xl text-slate-800 max-h-[92vh] flex flex-col overflow-hidden">
        {/* Navigation Tabs Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setCurrentSection('about')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                currentSection === 'about'
                  ? 'bg-teal-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Quem Somos
            </button>
            <button
              onClick={() => setCurrentSection('privacy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                currentSection === 'privacy'
                  ? 'bg-teal-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Privacidade (LGPD)
            </button>
            <button
              onClick={() => setCurrentSection('terms')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                currentSection === 'terms'
                  ? 'bg-teal-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Termos de Uso
            </button>
            <button
              onClick={() => setCurrentSection('contact')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                currentSection === 'contact'
                  ? 'bg-teal-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Fale Conosco
            </button>
            <button
              onClick={() => setCurrentSection('sitemap')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                currentSection === 'sitemap'
                  ? 'bg-teal-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Mapa do Site
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-sm leading-relaxed text-slate-600">
          {/* 1. QUEM SOMOS */}
          {currentSection === 'about' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  Nossa História & Propósito
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  Quem Somos — Declaração Online
                </h2>
              </div>

              <p>
                O <strong>Declaração Online</strong> nasceu de uma constatação simples, porém marcante no dia a dia do brasileiro: a imensa burocracia para conseguir comprovar fatos simples da vida civil, como onde você mora, quanto você ganha como trabalhador autônomo, ou sua convivência conjugal.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <h3 className="font-bold text-slate-900 text-base">
                  Liderança e Responsabilidade
                </h3>
                <p className="text-xs sm:text-sm">
                  O projeto é <strong>gerido por Elvis Dias</strong> (CNPJ: 43.027.941/0001-21), com o objetivo inegociável de democratizar o acesso a documentos jurídicos idôneos sem custos abusivos e sem linguagem rebuscada incompreensível.
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    Sede: Rondônia, Brasil
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-teal-600" />
                    Contato: (69) 98103-9664
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 text-base">Nossos Pilares</h3>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Simplicidade Real:</strong> Você preenche um formulário descomplicado e o documento oficial sai formatado e pronto para imprimir.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Sem Cobranças Ocultas:</strong> Acesso livre a todos os modelos para estudantes, trabalhadores, famílias e cidadãos em geral.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Segurança & Privacidade:</strong> Seus dados não ficam expostos na nuvem. Tudo é gerado no navegador do seu próprio aparelho.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* 2. POLÍTICA DE PRIVACIDADE LGPD */}
          {currentSection === 'privacy' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  Privacidade por Design (Privacy by Design)
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  Política de Privacidade & LGPD
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Em total conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018).
                </p>
              </div>

              <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl flex items-start gap-3 text-xs sm:text-sm text-teal-900">
                <Lock className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Compromisso Fundamental:</strong> O Declaração Online <strong>NÃO COLETA, NÃO TRANSMITE E NÃO ARMAZENA</strong> seus dados pessoais digitados (como nome, CPF, RG, endereços ou rendas) em servidores de banco de dados remotos.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">1. Como seus dados são processados</h3>
                <p className="text-xs sm:text-sm">
                  Toda a digitação, aplicação de máscara e montagem visual do documento ocorrem estritamente no motor Javascript do seu navegador de internet (lado do cliente). Quando você clica em "Imprimir / Salvar em PDF", o próprio navegador converte a tela em documento de impressão.
                </p>

                <h3 className="font-bold text-slate-900 text-sm">2. Recurso "Salvar no Navegador"</h3>
                <p className="text-xs sm:text-sm">
                  Ao utilizar a função de salvar declarações, os dados são guardados exclusivamente no <em>localStorage</em> do seu navegador. Isso significa que apenas você, no seu próprio aparelho, tem acesso a essa cópia. Você pode apagar tudo a qualquer momento clicando em "Limpar Tudo".
                </p>

                <h3 className="font-bold text-slate-900 text-sm">3. Direitos do Titular (Art. 18 da LGPD)</h3>
                <p className="text-xs sm:text-sm">
                  Como não retemos bases de dados de usuários em nuvem, você detém controle físico e exclusivo e soberano sobre qualquer documento que emitir.
                </p>

                <h3 className="font-bold text-slate-900 text-sm">4. Encarregado pelo Tratamento de Dados (DPO)</h3>
                <p className="text-xs sm:text-sm">
                  Dúvidas sobre proteção de dados podem ser encaminhadas ao gestor responsável Elvis Dias pelo WhatsApp: (69) 98103-9664.
                </p>
              </div>
            </div>
          )}

          {/* 3. TERMOS DE USO */}
          {currentSection === 'terms' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  Condições Gerais de Acesso
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  Termos de Uso do Portal
                </h2>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <h3 className="font-bold text-slate-900">1. Finalidade do Serviço</h3>
                <p>
                  O site <strong>declaracaoonline.com.br</strong> fornece ferramentas de editoração e modelos padronizados de declarações civis com fundamentação na legislação brasileira (notadamente a Lei Federal nº 7.115/1983 e Lei nº 13.726/2018).
                </p>

                <h3 className="font-bold text-slate-900">2. Responsabilidade pelas Informações</h3>
                <p>
                  O declarante (usuário) é o <strong>único e exclusivo responsável civil e criminalmente</strong> pela veracidade de todas as informações que inserir nos documentos gerados. A prestação de dados falsos ou adulterados sujeita o autor às penalidades de Falsidade Ideológica cominadas no Artigo 299 do Código Penal Brasileiro.
                </p>

                <h3 className="font-bold text-slate-900">3. Natureza Informativa e Despacho Gratuito</h3>
                <p>
                  O Declaração Online não presta consultoria advocatícia individualizada privativa de OAB. Trata-se de serviço de facilitação documental e modelos de declaração de interesse público.
                </p>

                <h3 className="font-bold text-slate-900">4. Aceitação Institucional</h3>
                <p>
                  Embora os modelos sigam o rigor dos padrões legais exigidos por órgãos públicos e privados no Brasil, a exigência de documentos complementares (como certidões adicionais ou comprovantes de vínculo) fica a critério do órgão solicitante conforme regulamentos específicos.
                </p>
              </div>
            </div>
          )}

          {/* 4. FALE CONOSCO / CONTATO */}
          {currentSection === 'contact' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  Canais Oficiais de Atendimento
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  Fale Conosco
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Direct Cards */}
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Gestor do Portal</span>
                    <p className="font-bold text-slate-900 text-base">Elvis Dias</p>
                    <p className="text-xs text-slate-600 font-mono">CNPJ: 43.027.941/0001-21</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">WhatsApp Direto</span>
                    <p className="font-bold text-teal-800 text-base">
                      (69) 98103-9664
                    </p>
                    <a
                      href="https://wa.me/5569981039664?text=Ol%C3%A1%20Elvis,%20estou%20no%20site%20Declara%C3%A7%C3%A3o%20Online%20e%20gostaria%20de%20um%20suporte"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-teal-700 hover:text-teal-900 font-bold underline"
                    >
                      <span>Abrir conversa no WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1 text-xs text-slate-600">
                    <p><strong>Horário de Atendimento:</strong></p>
                    <p>Segunda a Sexta, das 08h às 18h (Horário de Rondônia / Brasília)</p>
                  </div>
                </div>

                {/* Direct quick message form */}
                <form onSubmit={handleSendContact} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm">Envie uma Mensagem Rápida</h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Seu Nome</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Ex: Ana Paula"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Seu E-mail ou Telefone</label>
                    <input
                      type="text"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="Ex: seuemail@email.com"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Como podemos te ajudar?</label>
                    <textarea
                      rows={3}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Descreva sua dúvida ou sugestão de novo modelo de declaração..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-teal-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar para o WhatsApp Oficial</span>
                  </button>

                  {contactSent && (
                    <p className="text-xs text-emerald-700 font-semibold text-center mt-2">
                      Mensagem encaminhada com sucesso para o WhatsApp!
                    </p>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* 5. SITEMAP ESTRUTURADO */}
          {currentSection === 'sitemap' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  Estrutura de Indexação
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  Mapa do Site (Sitemap)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Índice completo de todas as seções e modelos de documentos disponíveis no domínio declaracaoonline.com.br
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">Páginas Principais</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-semibold text-slate-900">Página Inicial / Hub de Modelos</p>
                    <p className="text-slate-500 text-[11px]">https://declaracaoonline.com.br/</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-semibold text-slate-900">Validade Jurídica (Lei 7.115/83)</p>
                    <p className="text-slate-500 text-[11px]">https://declaracaoonline.com.br/#validade</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-semibold text-slate-900">Como Funciona Passo a Passo</p>
                    <p className="text-slate-500 text-[11px]">https://declaracaoonline.com.br/#como-funciona</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-semibold text-slate-900">Perguntas Frequentes (FAQ)</p>
                    <p className="text-slate-500 text-[11px]">https://declaracaoonline.com.br/#faq</p>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-sm mt-6">
                  Todos os Modelos de Declaração ({DECLARATION_MODELS.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {DECLARATION_MODELS.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        onSelectModelSlug(model.slug);
                        onClose();
                      }}
                      className="p-3 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 rounded-xl text-left transition flex items-center justify-between group"
                    >
                      <div>
                        <p className="font-semibold text-slate-900 group-hover:text-teal-900">
                          {model.title}
                        </p>
                        <p className="text-slate-500 text-[11px]">
                          https://declaracaoonline.com.br/{model.slug}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-700 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 shrink-0 flex items-center justify-between text-xs text-slate-500">
          <span>Gerido por Elvis Dias • CNPJ: 43.027.941/0001-21</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
