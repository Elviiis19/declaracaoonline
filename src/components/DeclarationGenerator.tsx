import React, { useState, useEffect } from 'react';
import { DeclarationModel, SavedDeclaration } from '../types/declaration';
import { DocumentPaper } from './DocumentPaper';
import { applyFieldMask } from '../utils/masks';
import { saveDeclarationToStorage } from '../utils/storage';
import {
  Printer,
  Copy,
  Download,
  Bookmark,
  Share2,
  Check,
  RotateCcw,
  Sparkles,
  HelpCircle,
  FileCheck2,
  ArrowLeft,
  Eye,
  Edit,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { AdSenseBanner } from './AdSenseBanner';

interface DeclarationGeneratorProps {
  model: DeclarationModel;
  onBackToModels: () => void;
  onOpenGovGuide: () => void;
  onDeclarationSaved: () => void;
  initialValues?: Record<string, string>;
  initialId?: string;
}

export const DeclarationGenerator: React.FC<DeclarationGeneratorProps> = ({
  model,
  onBackToModels,
  onOpenGovGuide,
  onDeclarationSaved,
  initialValues,
  initialId,
}) => {
  // Initialize form fields with defaults or initial values
  const [formValues, setFormValues] = useState<Record<string, string>>(() => {
    if (initialValues) return initialValues;
    const defaults: Record<string, string> = {};
    model.fields.forEach((f) => {
      defaults[f.id] = f.defaultValue || '';
    });
    return defaults;
  });

  const [currentId, setCurrentId] = useState<string | undefined>(initialId);
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Update form if model changes
  useEffect(() => {
    if (initialValues) {
      setFormValues(initialValues);
      setCurrentId(initialId);
    } else {
      const defaults: Record<string, string> = {};
      model.fields.forEach((f) => {
        defaults[f.id] = f.defaultValue || '';
      });
      setFormValues(defaults);
      setCurrentId(undefined);
    }
  }, [model.id, initialValues, initialId]);

  const handleInputChange = (fieldId: string, type: string, value: string) => {
    const masked = applyFieldMask(type, value);
    setFormValues((prev) => ({
      ...prev,
      [fieldId]: masked,
    }));
  };

  const handleFillExample = () => {
    const examples: Record<string, Record<string, string>> = {
      residencia: {
        nome: 'Maria Eduarda da Silva',
        nacionalidade: 'brasileira',
        estadoCivil: 'solteiro(a)',
        profissao: 'Assistente Administrativa',
        rg: '1.458.963 SSP/RO',
        cpf: '852.147.963-00',
        logradouro: 'Avenida Sete de Setembro, 1250, Apto 302',
        bairro: 'Nossa Senhora das Graças',
        cep: '76804-123',
        cidade: 'Porto Velho',
        estado: 'RO',
        motivo: 'resido no endereço acima especificado',
      },
      'renda-autonomo': {
        nome: 'Carlos Eduardo Ferreira',
        cpf: '741.852.963-11',
        rg: '2.589.631 SSP/RO',
        profissao: 'Motorista por Aplicativo e Entregador',
        rendaMedia: 'R$ 3.450,00',
        tempoAtividade: '3 anos',
        logradouro: 'Rua José Amador dos Reis, 3200',
        cidade: 'Porto Velho',
        estado: 'RO',
      },
      'uniao-estavel': {
        nome1: 'Marcos Vinícius Santana',
        cpf1: '321.654.987-22',
        rg1: '1.234.567 SSP/RO',
        estadoCivil1: 'Solteiro(a)',
        nome2: 'Beatriz Helena Souza',
        cpf2: '987.654.321-33',
        rg2: '7.654.321 SSP/RO',
        estadoCivil2: 'Solteira(a)',
        dataInicio: 'janeiro de 2021',
        regimeBens: 'Comunhão Parcial de Bens (padrão legal)',
        logradouro: 'Rua das Araras, 450, Casa 2',
        cidade: 'Porto Velho',
        estado: 'RO',
      },
      desemprego: {
        nome: 'Juliana Costa Ferreira',
        cpf: '654.987.321-44',
        rg: '3.698.521 SSP/RO',
        tempoDesemprego: 'fevereiro de 2025',
        fonteSubsistencia: 'auxílio financeiro dos pais e pequenos bicos esporádicos',
        cidade: 'Porto Velho',
        estado: 'RO',
      },
    };

    const ex = examples[model.id] || {
      nome: 'João da Silva Santos',
      cpf: '123.456.789-00',
      rg: '9.876.543 SSP/RO',
      cidade: 'Porto Velho',
      estado: 'RO',
    };

    setFormValues((prev) => ({
      ...prev,
      ...ex,
    }));
  };

  const handleReset = () => {
    if (window.confirm('Deseja limpar todos os campos preenchidos?')) {
      const defaults: Record<string, string> = {};
      model.fields.forEach((f) => {
        defaults[f.id] = f.defaultValue || '';
      });
      setFormValues(defaults);
    }
  };

  const handlePrint = () => {
    // 1. Force the preview tab active so the document container is 100% rendered and visible in DOM
    setMobileTab('preview');

    // 2. Track analytics event
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'print_declaration', {
        event_category: 'Document',
        event_label: model.title,
        model_id: model.id,
      });
    }

    // 3. Set clean document title during print so browser print headers don't print site URL or taglines
    const originalTitle = document.title;
    const content = model.generateText(formValues);
    document.title = content.title;

    // 4. Give React 120ms to flush state and render before triggering browser print dialog
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
    }, 120);
  };

  const handleSaveToBrowser = () => {
    const saved = saveDeclarationToStorage({
      id: currentId,
      modelId: model.id,
      modelTitle: model.title,
      values: formValues,
      previewSnippet: `${model.title} - ${formValues.nome || formValues.nome1 || 'Sem nome'}`,
    });
    setCurrentId(saved.id);
    setSavedSuccess(true);
    onDeclarationSaved();
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'save_declaration', {
        event_category: 'Document',
        event_label: model.title,
        model_id: model.id,
      });
    }
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleCopyText = () => {
    const content = model.generateText(formValues);
    const fullText = [
      content.title,
      '--------------------------------------------------',
      ...content.body,
      '',
      content.cityDateLine,
      '',
      ...content.signers.map((s) => `${s.name}\n${s.document}${s.role ? ` (${s.role})` : ''}`),
      content.notes ? `\nNota: ${content.notes}` : '',
    ].join('\n\n');

    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'copy_declaration_text', {
          event_category: 'Document',
          event_label: model.title,
          model_id: model.id,
        });
      }
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleDownloadWord = () => {
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'download_word_document', {
        event_category: 'Document',
        event_label: model.title,
        model_id: model.id,
      });
    }
    const content = model.generateText(formValues);
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>${content.title}</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.5; margin: 3cm 2.5cm 2.5cm 3cm; }
        h1 { text-align: center; font-size: 14pt; font-weight: bold; margin-bottom: 24pt; }
        p { text-align: justify; text-indent: 1.5cm; margin-bottom: 12pt; }
        .date { text-align: right; margin-top: 36pt; margin-bottom: 48pt; }
        .signature { text-align: center; margin-top: 36pt; }
        .line { border-top: 1px solid black; width: 60%; margin: 0 auto 6pt auto; }
      </style>
      </head>
      <body>
        <h1>${content.title}</h1>
        ${content.body.map((p) => `<p>${p}</p>`).join('')}
        <div class="date">${content.cityDateLine}</div>
        ${content.signers
          .map(
            (s) => `
          <div class="signature">
            <div class="line"></div>
            <strong>${s.name}</strong><br>
            <span>${s.document}</span>
          </div>
        `
          )
          .join('')}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${model.slug}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="generator-main-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 print:p-0 print:m-0 print:max-w-none">
      {/* Back button and document title banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 no-print">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToModels}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-teal-700 hover:border-teal-400 shadow-sm transition"
            title="Voltar ao catálogo de modelos"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                {model.badge}
              </span>
              <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                {model.legalBase}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {model.title}
            </h1>
          </div>
        </div>

        {/* Action buttons header (Save, Print, Gov.br) */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* PRIMARY CALL TO ACTION: Imprimir / Salvar PDF (High Contrast, WCAG AAA, Accessible) */}
          <button
            onClick={handlePrint}
            aria-label="Imprimir declaração oficial em folha A4 ou salvar como arquivo PDF"
            className="flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm sm:text-base font-extrabold bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-lg shadow-emerald-900/20 border-2 border-emerald-500 hover:border-emerald-400 transition-all transform active:scale-95 focus-visible:ring-4 focus-visible:ring-emerald-300 focus:outline-none cursor-pointer"
          >
            <Printer className="w-5 h-5 text-white shrink-0" />
            <div className="text-left leading-tight">
              <span className="block uppercase tracking-wide">Imprimir ou Salvar PDF</span>
              <span className="text-[10px] font-medium text-emerald-100 hidden sm:block">Grátis • Pronto para Assinar</span>
            </div>
          </button>

          {/* Secondary Actions */}
          <button
            onClick={handleDownloadWord}
            aria-label="Baixar cópia no formato Word .doc"
            className="flex items-center gap-1.5 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 transition shadow-sm focus-visible:ring-2 focus-visible:ring-teal-600 focus:outline-none cursor-pointer"
            title="Baixar em formato Word .DOC editável"
          >
            <Download className="w-4 h-4 text-blue-600" />
            <span>Word (.doc)</span>
          </button>

          <button
            onClick={handleCopyText}
            aria-label="Copiar texto oficial da declaração"
            className="flex items-center gap-1.5 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 transition shadow-sm focus-visible:ring-2 focus-visible:ring-teal-600 focus:outline-none cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
            <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
          </button>

          <button
            onClick={handleSaveToBrowser}
            aria-label="Salvar rascunho da declaração no navegador"
            className={`flex items-center gap-1.5 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold border transition shadow-sm focus-visible:ring-2 focus-visible:ring-teal-600 focus:outline-none cursor-pointer ${
              savedSuccess
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            {savedSuccess ? <Check className="w-4 h-4 text-emerald-600" /> : <Bookmark className="w-4 h-4 text-teal-600" />}
            <span>{savedSuccess ? 'Salvo no Navegador!' : 'Salvar Cópia'}</span>
          </button>
        </div>
      </div>

      {/* Explanatory banner for 2026/2027 SERP human tone */}
      <div className="my-5 p-4 bg-teal-50/70 border border-teal-200/80 rounded-2xl text-xs text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 no-print">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
          <div>
            <strong className="text-teal-950 font-semibold block text-sm">
              Quando usar este modelo:
            </strong>
            <p className="mt-0.5 text-slate-600 leading-relaxed">
              {model.whenToUse}
            </p>
          </div>
        </div>
        <button
          onClick={onOpenGovGuide}
          className="shrink-0 inline-flex items-center gap-1.5 text-teal-800 hover:text-teal-950 bg-teal-100/80 hover:bg-teal-200/80 px-3 py-1.5 rounded-xl font-semibold transition"
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Como assinar pelo Gov.br (Grátis)</span>
        </button>
      </div>

      {/* Top Strategic Ad Placement (High Viewability Leaderboard - Internal Pages Only) */}
      <AdSenseBanner format="horizontal" className="my-3 no-print" />

      {/* Mobile Tab switcher (Form vs Preview) */}
      <div className="lg:hidden flex rounded-xl bg-slate-200/80 p-1 mb-6 no-print">
        <button
          onClick={() => setMobileTab('form')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
            mobileTab === 'form' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
          }`}
        >
          <Edit className="w-3.5 h-3.5" />
          <span>1. Preencher Formulário</span>
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
            mobileTab === 'preview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>2. Visualizar Documento A4</span>
        </button>
      </div>

      {/* Main Split Layout */}
      <div className="document-split-container grid grid-cols-1 lg:grid-cols-12 gap-8 items-start print:!block print:!gap-0 print:!m-0 print:!p-0">
        {/* Left column: Form Fields (7 cols on lg, or mobile active) */}
        <div
          className={`lg:col-span-5 space-y-6 ${
            mobileTab === 'preview' ? 'hidden lg:block' : 'block'
          } no-print`}
        >
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Dados para a Declaração
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleFillExample}
                  className="flex items-center gap-1 text-[11px] font-semibold text-teal-700 hover:text-teal-900 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200 transition"
                  title="Preencher com dados fictícios para testar"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>Exemplo</span>
                </button>
                <button
                  onClick={handleReset}
                  className="p-1 text-slate-400 hover:text-slate-600 transition"
                  title="Limpar campos"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Dynamic Inputs grid */}
            <div className="mt-5 space-y-4">
              {model.fields.map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <label
                    htmlFor={field.id}
                    className="block text-xs font-semibold text-slate-700"
                  >
                    {field.label}{' '}
                    {field.required && <span className="text-rose-500">*</span>}
                  </label>

                  {field.type === 'select' ? (
                    <select
                      id={field.id}
                      value={formValues[field.id] || ''}
                      onChange={(e) =>
                        handleInputChange(field.id, field.type, e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition"
                    >
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      id={field.id}
                      rows={3}
                      value={formValues[field.id] || ''}
                      placeholder={field.placeholder}
                      onChange={(e) =>
                        handleInputChange(field.id, field.type, e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition resize-none"
                    />
                  ) : (
                    <input
                      id={field.id}
                      type={field.type === 'number' ? 'number' : 'text'}
                      value={formValues[field.id] || ''}
                      placeholder={field.placeholder}
                      onChange={(e) =>
                        handleInputChange(field.id, field.type, e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition"
                    />
                  )}

                  {field.helperText && (
                    <p className="text-[10px] text-slate-500">{field.helperText}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Form Completion & Accessible Primary Action Card */}
            <div className="mt-6 pt-5 border-t border-slate-200 space-y-3">
              <button
                onClick={handlePrint}
                aria-label="Gerar e imprimir declaração oficial em folha A4 ou salvar como PDF"
                className="w-full py-4 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-3 shadow-lg shadow-emerald-950/20 border-2 border-emerald-500 hover:border-emerald-400 transition-all transform active:scale-95 focus-visible:ring-4 focus-visible:ring-emerald-300 focus:outline-none cursor-pointer"
              >
                <Printer className="w-5 h-5 text-white shrink-0" />
                <span className="uppercase tracking-wider">GERAR E IMPRIMIR DECLARAÇÃO</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMobileTab('preview')}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-300 transition lg:hidden cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-teal-700" />
                  <span>Ver Folha A4</span>
                </button>
                <button
                  onClick={handleDownloadWord}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-300 transition cursor-pointer"
                  title="Baixar cópia no formato Word .doc"
                >
                  <Download className="w-4 h-4 text-blue-600" />
                  <span>Baixar Word</span>
                </button>
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-center">
                <p className="text-[11px] text-emerald-950 font-medium leading-relaxed">
                  💡 <strong>Como salvar em PDF:</strong> Ao clicar no botão verde, na janela de impressão do seu navegador, escolha a impressora <strong>"Salvar como PDF"</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Local specific FAQ for this model */}
          {model.faqs && model.faqs.length > 0 && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wide">
                <HelpCircle className="w-4 h-4 text-teal-600" />
                <span>Perguntas Frequentes deste Modelo</span>
              </div>
              <div className="space-y-2.5 pt-1">
                {model.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group border border-slate-100 rounded-xl bg-slate-50/50 p-3 text-xs"
                  >
                    <summary className="font-semibold text-slate-800 cursor-pointer list-none flex items-center justify-between gap-2">
                      <span>{faq.question}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-open:rotate-180 transition-transform shrink-0" />
                    </summary>
                    <p className="mt-2 text-slate-600 leading-relaxed text-[11px] pt-1 border-t border-slate-200/50">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* AdSense In-Form Placement (Sidebar High-Relevance) */}
          <AdSenseBanner format="rectangle" className="mt-4 no-print" />
        </div>

        {/* Right column: Document Paper Preview (7 cols on lg, or mobile active) */}
        <div
          className={`lg:col-span-7 document-preview-column print:!block print:!w-full print:!m-0 print:!p-0 ${
            mobileTab === 'form' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Prominent Quick-Action Bar above preview (Accessible & Visible) */}
          <div className="mb-4 p-3 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800">
                Visualização Oficial Folha A4 • Lei 7.115/83
              </span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handlePrint}
                aria-label="Imprimir documento em folha A4 ou salvar como PDF"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-sm transition transform active:scale-95 cursor-pointer focus-visible:ring-4 focus-visible:ring-emerald-300"
              >
                <Printer className="w-4 h-4 text-white" />
                <span>Imprimir / Salvar PDF</span>
              </button>
              <button
                onClick={handleDownloadWord}
                aria-label="Baixar cópia no formato Microsoft Word"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition cursor-pointer"
                title="Baixar em formato Word"
              >
                <Download className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Word</span>
              </button>
            </div>
          </div>

          {/* Document Sheet */}
          <DocumentPaper model={model} formValues={formValues} />

          {/* High RPM Strategic Bottom Action Banner - Maximum User Dwell Time */}
          <div className="mt-8 space-y-4 no-print">
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-teal-950 via-slate-900 to-slate-900 text-white shadow-lg border border-teal-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-base font-bold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Documento pronto para uso oficial
                </p>
                <p className="text-xs text-slate-300 mt-1 max-w-md leading-relaxed">
                  Imprima em folha A4 com margens regulamentares ou salve em PDF sem marcas d'água. 100% gratuito e amparado na Lei nº 7.115/83.
                </p>
              </div>
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full sm:w-auto shrink-0">
                <button
                  onClick={handlePrint}
                  aria-label="Imprimir declaração ou salvar em arquivo PDF"
                  className="flex-1 sm:flex-none shrink-0 whitespace-nowrap flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-black bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-950/40 transition transform active:scale-95 cursor-pointer focus-visible:ring-4 focus-visible:ring-emerald-300"
                >
                  <Printer className="w-5 h-5 text-slate-950 shrink-0" />
                  <span className="uppercase tracking-wider">Imprimir / PDF</span>
                </button>
                <button
                  onClick={handleDownloadWord}
                  aria-label="Baixar cópia no formato Microsoft Word"
                  className="flex-1 sm:flex-none shrink-0 whitespace-nowrap flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border border-white/20 transition cursor-pointer"
                  title="Baixar cópia no formato Microsoft Word (.doc)"
                >
                  <Download className="w-4 h-4 text-teal-300 shrink-0" />
                  <span>Word (.doc)</span>
                </button>
              </div>
            </div>

            {/* Strategic AdSense Placement below preview */}
            <AdSenseBanner format="action" />
          </div>
        </div>
      </div>
    </div>
  );
};
