import React from 'react';
import { ShieldCheck, Scale, Award, FileText, CheckCircle, AlertOctagon, ArrowRight } from 'lucide-react';
import { AdSenseBanner } from './AdSenseBanner';

export const LegalValidityGuide: React.FC<{ onGoToModels: () => void; onOpenGovGuide: () => void }> = ({
  onGoToModels,
  onOpenGovGuide,
}) => {
  return (
    <div className="py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
          <Scale className="w-3.5 h-3.5 text-teal-600" />
          <span>Amparo Legal e Direitos do Cidadão Brasileiro</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Validade Jurídica das Declarações
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          Tudo o que você precisa saber sobre as leis federais que garantem a aceitação da sua declaração e quando a exigência de cartório é considerada ilegal.
        </p>
      </div>

      {/* Main Law Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Lei 7.115/1983 */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:border-teal-400 transition space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">Lei Federal</span>
              <h2 className="text-lg font-bold text-slate-900">Lei nº 7.115, de 29/08/1983</h2>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Estabelece expressamente que a declaração firmada pelo interessado ou seu procurador sobre <strong>residência, estado de pobreza, dependência econômica, vida pregressa e estado civil</strong> supre para todos os efeitos a exigência de comprovantes específicos perante quaisquer órgãos públicos ou entidades privadas.
          </p>
          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 font-mono border border-slate-100">
            "Art. 1º - A declaração destinada a fazer prova de vida e residência, estado de pobreza, dependência econômica ou homonímia, quando firmada pelo próprio interessado, presume-se verdadeira."
          </div>
        </div>

        {/* Lei 13.726/2018 */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:border-teal-400 transition space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Desburocratização</span>
              <h2 className="text-lg font-bold text-slate-900">Lei nº 13.726, de 08/10/2018</h2>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Racionaliza atos e procedimentos administrativos dos Poderes da União, Estados e Municípios. <strong>Fica dispensado o reconhecimento de firma</strong>: o agente público deve comparar a assinatura com a do documento de identidade com foto ou lavrar sua autenticidade no local.
          </p>
          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 font-mono border border-slate-100">
            "Art. 3º - É dispensada a exigência de reconhecimento de firma, devendo o agente público confrontar a assinatura com a do documento de identidade do signatário."
          </div>
        </div>

        {/* Lei 14.063/2020 */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:border-teal-400 transition space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">Assinatura Eletrônica</span>
              <h2 className="text-lg font-bold text-slate-900">Lei nº 14.063, de 23/09/2020</h2>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Regulamenta o uso das assinaturas eletrônicas avançadas e qualificadas em interações com o poder público e transações entre particulares. A assinatura gratuita pelo <strong>Gov.br</strong> tem plena validade perante bancos, faculdades e juntas comerciais.
          </p>
          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 font-mono border border-slate-100">
            "Art. 5º - A assinatura eletrônica avançada permite identificar o signatário e anexa dados unívocos que garantem a integridade do documento."
          </div>
        </div>

        {/* Artigo 299 CP */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:border-teal-400 transition space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Responsabilidade</span>
              <h2 className="text-lg font-bold text-slate-900">Art. 299 do Código Penal</h2>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            A declaração particular confia na boa-fé do cidadão. Declarar fato juridicamente relevante que seja comprovadamente falso constitui <strong>crime de falsidade ideológica</strong>, sujeito a reclusão e multa. Por essa razão, declare sempre fatos verdadeiros.
          </p>
          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 font-mono border border-slate-100">
            "Omitir, em documento público ou particular, declaração que dele devia constar, ou nele inserir declaração falsa ou diversa da que devia ser escrita."
          </div>
        </div>
      </div>

      {/* When is notary actually needed? */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl mb-12">
        <h3 className="text-lg sm:text-xl font-bold mb-4">
          Quando o Cartório é realmente obrigatório no Brasil?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> NÃO precisa de Cartório:
            </h4>
            <ul className="space-y-1.5 list-disc list-inside text-slate-300 pl-1">
              <li>Matrícula escolar e faculdade (Prouni, FIES, cotas)</li>
              <li>Cadastros do SUS e postos de saúde</li>
              <li>Abertura de conta corrente na maioria dos bancos</li>
              <li>CadÚnico, CRAS e benefícios de programas sociais</li>
              <li>Concursos públicos e isenção de taxa de vestibular</li>
              <li>Solicitação de 2ª via de RG e CNH</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-amber-400 flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4" /> QUANDO pode ser exigido reconhecimento:
            </h4>
            <ul className="space-y-1.5 list-disc list-inside text-slate-300 pl-1">
              <li>Transferência de veículo no DETRAN (DUT/ATPV-e)</li>
              <li>Compra e venda de imóveis de alto valor (Escritura Pública)</li>
              <li>Autorização de viagem internacional de menores pela PF</li>
              <li>Procurações públicas com poderes para vender bens</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-400 text-center sm:text-left">
            Dica 2026: Você pode substituir a ida ao cartório pela assinatura digital no Gov.br.
          </span>
          <div className="flex gap-2">
            <button
              onClick={onOpenGovGuide}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition"
            >
              Aprender a assinar no Gov.br
            </button>
            <button
              onClick={onGoToModels}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-semibold transition"
            >
              Escolher um Modelo
            </button>
          </div>
        </div>
      </div>

      {/* Internal Page AdSense Banner */}
      <AdSenseBanner format="horizontal" className="mt-8 no-print" />
    </div>
  );
};
