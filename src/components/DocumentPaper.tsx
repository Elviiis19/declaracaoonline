import React from 'react';
import { DeclarationModel } from '../types/declaration';

interface DocumentPaperProps {
  model: DeclarationModel;
  formValues: Record<string, string>;
}

export const DocumentPaper: React.FC<DocumentPaperProps> = ({ model, formValues }) => {
  const content = model.generateText(formValues);

  return (
    <div
      id="printable-declaration-document"
      className="printable-document-container bg-white text-black font-serif text-[15px] print:text-[14px] leading-relaxed print:leading-normal p-8 sm:p-12 md:p-14 print:p-0 border border-slate-200 print:border-none shadow-xl print:shadow-none rounded-sm max-w-[800px] print:max-w-none mx-auto min-h-[960px] print:min-h-0 print:h-auto flex flex-col justify-between print:block select-text"
    >
      {/* Official Document Header */}
      <div>
        <div className="text-center pb-8 border-b border-black/15 mb-8 print:pb-4 print:mb-5">
          <div className="inline-block p-2 rounded-full border border-teal-800 mb-3 print:border-black print:p-1 print:mb-2">
            <svg className="w-8 h-8 text-teal-800 print:text-black mx-auto print:w-6 print:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="font-bold text-lg sm:text-xl print:text-base tracking-wider text-black uppercase">
            {content.title}
          </h1>
          <p className="text-xs uppercase tracking-widest text-slate-700 print:text-black mt-1 font-sans">
            Instrumento Particular com Força Jurídica • Lei Federal nº 7.115/1983
          </p>
        </div>

        {/* Document Body Paragraphs */}
        <div className="space-y-4 print:space-y-3 text-justify leading-[1.85] print:leading-[1.65] text-slate-900 print:text-black indent-10 font-normal">
          {content.body.map((paragraph, idx) => (
            <p key={idx} className="hyphens-auto">
              {paragraph}
            </p>
          ))}
        </div>

        {/* City and Date Line */}
        <div className="mt-10 print:mt-6 text-right font-medium text-slate-900 print:text-black">
          <p>{content.cityDateLine}</p>
        </div>

        {/* Signatures Area */}
        <div className="mt-14 print:mt-8 space-y-10 print:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 print:gap-4 pt-4 print:pt-2">
            {content.signers.map((signer, idx) => (
              <div key={idx} className="text-center space-y-1">
                <div className="w-4/5 mx-auto border-t-2 border-slate-800 print:border-black pt-2" />
                <p className="font-bold text-slate-900 print:text-black text-sm">
                  {signer.name}
                </p>
                <p className="text-xs text-slate-600 print:text-black font-sans">
                  {signer.document}
                </p>
                {signer.role && (
                  <p className="text-[11px] font-sans uppercase tracking-wider text-slate-500 print:text-black">
                    ({signer.role})
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Witnesses (if model requires) */}
          {content.witnesses && content.witnesses.length > 0 && (
            <div className="pt-6 border-t border-slate-200 print:border-black">
              <p className="text-xs font-sans font-bold uppercase tracking-widest text-slate-600 print:text-black mb-6 text-center">
                Testemunhas Instrumentárias:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {content.witnesses.map((w, idx) => (
                  <div key={idx} className="text-center space-y-1">
                    <div className="w-4/5 mx-auto border-t border-slate-800 print:border-black pt-2" />
                    <p className="text-xs font-mono text-slate-700 print:text-black">{w.name}</p>
                    <p className="text-[11px] font-mono text-slate-500 print:text-black">{w.document}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Official Footer Note */}
      <div className="mt-14 print:mt-6 pt-4 print:pt-2 border-t border-slate-200 print:border-black/30 text-[10px] text-slate-500 print:text-black font-sans flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>
          Documento emitido via <strong>declaraçãoonline.com.br</strong> • Presunção de veracidade da Lei Federal 7.115/83.
        </p>
        <p className="text-slate-400 print:text-black">
          Sujeito às sanções do Art. 299 do Código Penal.
        </p>
      </div>
    </div>
  );
};
