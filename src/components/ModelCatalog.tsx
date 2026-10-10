import React, { useState, useMemo, useRef, useEffect } from 'react';
import { DECLARATION_MODELS } from '../data/models';
import { DeclarationModel, CategoryType } from '../types/declaration';
import {
  Search,
  FileText,
  ShieldCheck,
  ChevronRight,
  Home,
  DollarSign,
  Users,
  Briefcase,
  Key,
  Car,
  Filter,
  CheckCircle2,
  Sparkles,
  X,
  Tag
} from 'lucide-react';

interface ModelCatalogProps {
  onSelectModel: (model: DeclarationModel) => void;
  selectedCategory?: CategoryType;
}

// Normaliza texto removendo acentos e convertendo para minúsculas
function normalizeStr(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

// Dicionário de sinônimos e palavras-chave populares do cotidiano brasileiro
const MODEL_SYNONYMS: Record<string, string[]> = {
  residencia: ['comprovante', 'conta de luz', 'agua', 'aluguel', 'moradia', 'inquilino', 'endereco', 'cedido', 'prouni'],
  'residencia-terceiro': ['dono', 'titular', 'proprietario', 'mae', 'pai', 'amigo', 'conta no nome de outro'],
  'renda-autonomo': ['rendimento', 'salario', 'bico', 'diarista', 'uber', 'motorista', 'ifood', 'camelô', 'pedreiro', 'mei', 'extrato', 'sem carteira', 'prouni', 'fies'],
  'uniao-estavel': ['casamento', 'convivencia', 'amasiados', 'companheiro', 'companheira', 'plano de saude', 'convenio', 'conjugal'],
  desemprego: ['sem trabalho', 'sem renda', 'isenção vestibular', 'enem', 'sem emprego', 'carteira em branco', 'prouni', 'auxilio'],
  'dependencia-economica': ['dependente', 'sustento', 'filho', 'pai', 'mae', 'plano medico', 'irpf', 'convenio'],
  'nao-possui-imovel': ['minha casa minha vida', 'caixa', 'habitação', 'cohab', 'primeiro imovel', 'desconto cartorio'],
  'nao-convivencia': ['separacao', 'divorcio', 'cadunico', 'cras', 'nao mora junto', 'ex marido', 'ex mulher'],
  'extravio-documento': ['perda', 'perdi', 'furto', 'roubo', 'segunda via', '2 via', 'rg', 'cnh', 'documentos perdidos'],
  'isencao-irpf': ['imposto de renda', 'declaracao de isento', 'receita federal', 'dai', 'isento'],
  'venda-veiculo': ['carro', 'moto', 'dut', 'recibo', 'atpv', 'quitacao', 'compra e venda', 'entrega das chaves', 'placa'],
  'guarda-menor': ['crianca', 'escola', 'creche', 'posto de saude', 'avo', 'tia', 'responsavel', 'matricula'],
  'prestacao-servicos': ['rpa', 'recibo', 'servico', 'mao de obra', 'reforma', 'pintor', 'diaria'],
  'cessao-imovel-comodato': ['imovel cedido', 'de favor', 'comodato', 'sem pagar aluguel', 'terceiro'],
  'autorizacao-viagem': ['viagem', 'aviao', 'onibus', 'hotel', 'hospedagem', 'menor de idade', 'eca'],
  'ausencia-bens': ['sem bens', 'divorcio consensual', 'partilha', 'cartorio', 'separacao'],
};

// Componente para destacar trechos encontrados na busca
function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const normalizedQuery = normalizeStr(query);
  const normalizedText = normalizeStr(text);

  const index = normalizedText.indexOf(normalizedQuery);
  if (index === -1) return <>{text}</>;

  const originalMatch = text.slice(index, index + query.length);
  const before = text.slice(0, index);
  const after = text.slice(index + query.length);

  return (
    <>
      {before}
      <mark className="bg-teal-100 text-teal-900 font-bold rounded px-0.5 no-underline">
        {originalMatch}
      </mark>
      {after}
    </>
  );
}

export const ModelCatalog: React.FC<ModelCatalogProps> = ({
  onSelectModel,
  selectedCategory = 'todos',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryType>(selectedCategory);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: 'todos', label: 'Todos os Modelos', icon: FileText },
    { id: 'residencia', label: 'Residência & Endereço', icon: Home },
    { id: 'renda', label: 'Renda & Financeiro', icon: DollarSign },
    { id: 'familia', label: 'Família & União', icon: Users },
    { id: 'habitacao', label: 'Habitação & Imóveis', icon: Key },
    { id: 'trabalho', label: 'Trabalho & Serviços', icon: Briefcase },
    { id: 'bens', label: 'Veículos & Bens', icon: Car },
  ];

  const quickSearchSuggestions = [
    'Residência',
    'Renda Autônomo',
    'União Estável',
    'Desemprego',
    'Minha Casa Minha Vida',
    'Venda de Veículo',
    'Isenção IRPF',
    'Perda de Documento',
  ];

  // Atalho do teclado: pressionar "/" para focar a barra de pesquisa
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredModels = useMemo(() => {
    const normalizedQuery = normalizeStr(searchTerm);

    return DECLARATION_MODELS.filter((model) => {
      const matchesCategory =
        activeCategory === 'todos' || model.category === activeCategory;

      if (!normalizedQuery) return matchesCategory;

      const normalizedTitle = normalizeStr(model.title);
      const normalizedShortTitle = normalizeStr(model.shortTitle);
      const normalizedDesc = normalizeStr(model.description);
      const normalizedWhen = normalizeStr(model.whenToUse);
      const normalizedLegal = normalizeStr(model.legalBase);
      const normalizedBadge = normalizeStr(model.badge);
      const synonyms = (MODEL_SYNONYMS[model.id] || []).map(normalizeStr);

      const matchesSearch =
        normalizedTitle.includes(normalizedQuery) ||
        normalizedShortTitle.includes(normalizedQuery) ||
        normalizedDesc.includes(normalizedQuery) ||
        normalizedWhen.includes(normalizedQuery) ||
        normalizedLegal.includes(normalizedQuery) ||
        normalizedBadge.includes(normalizedQuery) ||
        synonyms.some((s) => s.includes(normalizedQuery) || normalizedQuery.includes(s));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="py-8 sm:py-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto px-4 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Formatadas conforme os padrões oficiais de cartórios e órgãos públicos</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Modelos de Declaração Prontos para Preencher e Imprimir
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          Sem burocracia, sem termos jurídicos difíceis e sem pagar nada. Escolha o modelo que você precisa, insira seus dados e tenha seu documento em PDF gerado na hora com presunção legal de veracidade.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="max-w-5xl mx-auto px-4 mb-8 space-y-4">
        {/* Real-Time Live Search Bar */}
        <div className="relative flex items-center shadow-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite para buscar em tempo real (ex: residência, autônomo, prouni, união estável, aluguel, carro)..."
            className="w-full pl-11 pr-24 py-3.5 rounded-2xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 shadow-sm transition"
          />
          <div className="absolute right-3 flex items-center gap-1.5">
            {searchTerm ? (
              <button
                onClick={() => {
                  setSearchTerm('');
                  searchInputRef.current?.focus();
                }}
                className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 text-xs transition"
                title="Limpar busca"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 border border-slate-200 rounded">
                /
              </kbd>
            )}
          </div>
        </div>

        {/* Quick Search Suggestions Chips */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs text-slate-500">
          <span className="font-semibold text-slate-700 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-teal-600" /> Mais buscados:
          </span>
          {quickSearchSuggestions.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSearchTerm(tag);
                setActiveCategory('todos');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                searchTerm.toLowerCase() === tag.toLowerCase()
                  ? 'bg-teal-700 text-white font-bold'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-400 hover:text-teal-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as CategoryType)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                  isSelected
                    ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-teal-200' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Results Counter & Active Filter Banner */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1">
          <div>
            Mostrando <strong>{filteredModels.length}</strong> de {DECLARATION_MODELS.length} modelos de declaração
            {searchTerm && (
              <span> para o termo <strong className="text-teal-800 font-semibold">"{searchTerm}"</strong></span>
            )}
          </div>
          {(searchTerm || activeCategory !== 'todos') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('todos');
              }}
              className="text-teal-700 hover:text-teal-900 font-semibold underline underline-offset-2 transition"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {/* Grid of declaration cards */}
      <div className="max-w-6xl mx-auto px-4">
        {filteredModels.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">
              Nenhum modelo encontrado para "{searchTerm}"
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
              Tente utilizar termos mais genéricos como "renda", "residencia", "aluguel" ou explore todas as opções abaixo.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('todos');
                }}
                className="px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold hover:bg-teal-800 transition"
              >
                Ver todos os 16 modelos
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModels.map((model) => (
              <div
                key={model.id}
                onClick={() => onSelectModel(model)}
                className="bg-white border border-slate-200 hover:border-teal-500 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/80">
                      {model.badge}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {model.fields.length} campos
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition leading-snug">
                    <HighlightMatch text={model.title} query={searchTerm} />
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    <HighlightMatch text={model.description} query={searchTerm} />
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1.5">
                    <p className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Indicação:</strong>{' '}
                        <HighlightMatch text={model.whenToUse} query={searchTerm} />
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium truncate max-w-[170px]">
                    {model.legalBase}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 group-hover:text-teal-900 group-hover:translate-x-0.5 transition-all">
                    Preencher
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

