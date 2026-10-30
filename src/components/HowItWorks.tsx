import React from 'react';
import { FileEdit, CheckCircle2, Printer, FileCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import { AdSenseBanner } from './AdSenseBanner';

export const HowItWorks: React.FC<{ onGoToModels: () => void; onOpenGovGuide: () => void }> = ({
  onGoToModels,
  onOpenGovGuide,
}) => {
  const steps = [
    {
      step: '01',
      title: 'Selecione o Modelo Necessário',
      description:
        'Escolha entre os 30 modelos padronizados: residência, hipossuficiência, MEI, autônomo, união estável, desemprego, compra e venda e muito mais.',
      icon: FileEdit,
    },
    {
      step: '02',
      title: 'Preencha seus Dados Pessoais',
      description:
        'O formulário formata seu CPF, RG, CEP e telefone automaticamente. Sem complicação e sem termos jurídicos difíceis.',
      icon: CheckCircle2,
    },
    {
      step: '03',
      title: 'Confira a Folha A4 em Tempo Real',
      description:
        'Veja a declaração montada na hora com padrão gráfico oficial de repartição, respeitando margens, citações legais e linhas de assinatura.',
      icon: ShieldCheck,
    },
    {
      step: '04',
      title: 'Imprima ou Salve em PDF',
      description:
        'Com 1 clique, imprima diretamente na sua impressora ou gere um arquivo PDF limpo e pronto para anexar em e-mails, portais ou WhatsApp.',
      icon: Printer,
    },
    {
      step: '05',
      title: 'Assine Grátis ou no Papel',
      description:
        'Você pode assinar com caneta ou usar o assinador eletrônico gratuito do Governo Federal (Gov.br), dispensando gastos no cartório.',
      icon: FileCheck,
    },
  ];

  return (
    <div className="py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
          Passo a Passo Transparente
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
          Como Funciona o Declaração Online
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          Criamos um processo rápido em 5 passos para que qualquer pessoa consiga seu documento oficial em menos de 2 minutos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative group hover:border-teal-500 transition"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-teal-800 font-mono">
                  {s.step}
                </span>
                <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">
                {s.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {s.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-teal-950">
            Pronto para gerar sua declaração agora?
          </h3>
          <p className="text-xs sm:text-sm text-teal-800 mt-1 max-w-xl">
            Escolha um dos modelos disponíveis e obtenha seu documento com presunção legal de veracidade em segundos.
          </p>
        </div>
        <button
          onClick={onGoToModels}
          className="shrink-0 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
        >
          <span>Acessar Modelos</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Internal Page AdSense Placement */}
      <AdSenseBanner format="horizontal" className="mt-8 no-print" />
    </div>
  );
};
