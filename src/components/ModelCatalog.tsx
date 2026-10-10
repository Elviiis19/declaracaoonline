import React, { useState, useMemo } from 'react';
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
  Sparkles
} from 'lucide-react';

interface ModelCatalogProps {
  onSelectModel: (model: DeclarationModel) => void;
  selectedCategory?: CategoryType;
}

export const ModelCatalog: React.FC<ModelCatalogProps> = ({
  onSelectModel,
  selectedCategory = 'todos',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryType>(selectedCategory);

  const categories = [
    { id: 'todos', label: 'Todos os Modelos', icon: FileText },
    { id: 'residencia', label: 'Residência & Endereço', icon: Home },
    { id: 'renda', label: 'Renda & Financeiro', icon: DollarSign },
    { id: 'familia', label: 'Família & União', icon: Users },
    { id: 'habitacao', label: 'Habitação & Imóveis', icon: Key },
    { id: 'trabalho', label: 'Trabalho & Serviços', icon: Briefcase },
    { id: 'bens', label: 'Veículos & Bens', icon: Car },
  ];

  const filteredModels = useMemo(() => {
    return DECLARATION_MODELS.filter((model) => {
      const matchesCategory =
        activeCategory === 'todos' || model.category === activeCategory;
      const cleanSearch = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !cleanSearch ||
        model.title.toLowerCase().includes(cleanSearch) ||
        model.description.toLowerCase().includes(cleanSearch) ||
        model.whenToUse.toLowerCase().includes(cleanSearch) ||
        model.legalBase.toLowerCase().includes(cleanSearch) ||
        model.shortTitle.toLowerCase().includes(cleanSearch);

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
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar por modelo, ex: residência, autônomo, prouni, união estável, aluguel..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar mt-2">
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
      </div>

      {/* Grid of declaration cards */}
      <div className="max-w-6xl mx-auto px-4">
        {filteredModels.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">Nenhum modelo encontrado</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Tente utilizar outros termos na busca ou limpe o filtro para ver todas as opções disponíveis.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('todos');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold hover:bg-teal-800 transition"
            >
              Ver todos os modelos
            </button>
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
                    {model.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {model.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1.5">
                    <p className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span><strong>Indicação:</strong> {model.whenToUse}</span>
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
