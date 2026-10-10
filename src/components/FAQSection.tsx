import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';

export const FAQSection: React.FC<{ onOpenGovGuide: () => void }> = ({ onOpenGovGuide }) => {
  const faqs = [
    {
      question: 'Preciso gastar dinheiro reconhecendo firma em cartório?',
      answer:
        'Na enorme maioria dos casos, não! Desde a sanção da Lei Federal nº 13.726/2018 (conhecida como Lei da Desburocratização), órgãos públicos federais, estaduais e municipais estão expressamente proibidos de exigir reconhecimento de firma ou autenticação de cópias, bastando você assinar e apresentar seu documento oficial com foto. Para bancos privados ou imobiliárias, você pode também assinar gratuitamente pelo sistema Gov.br (prata ou ouro), que possui validade jurídica equivalente à firma reconhecida.'
    },
    {
      question: 'Qual é o fundamento da Lei nº 7.115/1983 citada nos documentos?',
      answer:
        'A Lei Federal nº 7.115/1983 é a lei basilar da cidadania brasileira no que tange a simplificação documental. Ela determina que a declaração assinada pelo próprio cidadão sobre sua residência, estado de pobreza, dependência econômica, bons antecedentes ou estado civil presume-se verdadeira perante qualquer autoridade pública ou privada. Ou seja: o cidadão tem a presunção de boa-fé garantida por lei federal.'
    },
    {
      question: 'Bancos, Faculdades (Prouni/FIES) e o CRAS aceitam essas declarações?',
      answer:
        'Sim! Todos os nossos modelos foram elaborados rigorosamente de acordo com os requisitos exigidos pelo MEC/FNDE (editais do Prouni e FIES), Ministério do Desenvolvimento Social (CadÚnico/CRAS), Caixa Econômica Federal e Banco do Brasil. Centenas de milhares de brasileiros utilizam a declaração de residência e a declaração de renda informal para conseguir bolsas e benefícios.'
    },
    {
      question: 'Como posso assinar digitalmente de graça pelo celular com o Gov.br?',
      answer:
        'Você não precisa imprimir em papel se não quiser! Basta gerar o documento aqui, salvar em PDF, acessar o site oficial gratuito assinador.iti.br, fazer login com sua conta do Gov.br e aplicar a sua assinatura digital. O PDF receberá um carimbo com QR Code criptografado que qualquer pessoa ou órgão pode verificar instantaneamente online.'
    },
    {
      question: 'O site armazena meu CPF ou dados pessoais em algum servidor?',
      answer:
        'Não! Em total conformidade com a LGPD (Lei Geral de Proteção de Dados - Lei 13.709/2018), todo o processamento de preenchimento, máscara e geração do PDF ocorre 100% no seu próprio navegador de internet. Nós não enviamos nem salvamos seus dados pessoais em servidores remotos. Caso escolha a opção "Salvar Cópia", o arquivo é gravado unicamente na memória local do seu aparelho.'
    },
    {
      question: 'O que acontece se alguém colocar informações falsas em uma declaração?',
      answer:
        'A declaração goza de presunção de veracidade, mas quem presta uma informação comprovadamente inverídica (por exemplo, inventar que mora em um local ou mentir valor de renda) comete o crime de falsidade ideológica, capitulado no Artigo 299 do Código Penal Brasileiro, com pena de reclusão de 1 a 5 anos e multa. Por isso, declare sempre apenas a verdade factual.'
    },
    {
      question: 'Preciso de testemunhas assinando comigo?',
      answer:
        'Apenas alguns modelos específicos (como a Declaração de União Estável) recomendam a presença de duas testemunhas para reforçar a publicidade do fato. Para as declarações individuais cotidianas (residência, desemprego, renda autônomo, isenção de IRPF, perda de documento), basta exclusivamente a sua própria assinatura.'
    },
    {
      question: 'Posso imprimir em papel sulfite comum A4?',
      answer:
        'Sim. A folha A4 comum branca é o padrão universal brasileiro aceito por todas as repartições públicas, bancos e cartórios. O gerador do Declaração Online já aplica as margens exatas para que a declaração caiba perfeitamente em 1 folha única.'
    }
  ];

  return (
    <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
          <span>Esclarecimento Direto e Transparente</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Perguntas Frequentes sobre Declarações
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Entenda como garantir que seu documento seja aceito de primeira sem dor de cabeça e sem custos extras.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm transition hover:border-teal-400"
          >
            <summary className="font-bold text-slate-900 text-sm sm:text-base cursor-pointer list-none flex items-center justify-between gap-3">
              <span>{faq.question}</span>
              <span className="p-1 rounded-full bg-slate-100 group-open:bg-teal-100 group-open:text-teal-800 text-slate-500 transition-colors shrink-0">
                <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
              </span>
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>

      {/* Gov.br Banner callout */}
      <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-teal-900 to-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-teal-800">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-base text-white flex items-center justify-center sm:justify-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-400" />
            <span>Economize dinheiro: assine online pelo Gov.br</span>
          </h3>
          <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
            Veja o passo a passo ilustrado de como usar o assinador oficial do Governo Federal gratuitamente em qualquer declaração gerada no site.
          </p>
        </div>
        <button
          onClick={onOpenGovGuide}
          className="shrink-0 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm transition shadow-lg shadow-teal-950/30"
        >
          Ver Passo a Passo Grátis
        </button>
      </div>
    </section>
  );
};
