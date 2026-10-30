import React, { useRef } from 'react';
import { SavedDeclaration } from '../types/declaration';
import {
  deleteSavedDeclaration,
  exportDeclarationsAsJSON,
  importDeclarationsFromJSON,
  clearAllSavedDeclarations,
} from '../utils/storage';
import { X, Trash2, Edit3, Download, Upload, FileText, Calendar, AlertTriangle } from 'lucide-react';

interface SavedDeclarationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedList: SavedDeclaration[];
  onLoadDeclaration: (item: SavedDeclaration) => void;
  onRefreshList: () => void;
}

export const SavedDeclarationsModal: React.FC<SavedDeclarationsModalProps> = ({
  isOpen,
  onClose,
  savedList,
  onLoadDeclaration,
  onRefreshList,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza de que deseja remover esta declaração salva do seu navegador?')) {
      deleteSavedDeclaration(id);
      onRefreshList();
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Atenção: deseja realmente apagar todas as declarações salvas no seu navegador? Essa ação não pode ser desfeita.')) {
      clearAllSavedDeclarations();
      onRefreshList();
    }
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const count = importDeclarationsFromJSON(content);
        if (count > 0) {
          alert(`Sucesso! ${count} declaração(ões) importada(s) para o seu navegador.`);
          onRefreshList();
        } else {
          alert('Nenhuma declaração válida encontrada no arquivo selecionado.');
        }
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 no-print animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl text-white max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Minhas Declarações Salvas</h3>
              <p className="text-xs text-slate-400">
                Armazenadas com privacidade exclusiva no seu dispositivo (navegador)
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

        {/* Content list */}
        <div className="mt-4 overflow-y-auto flex-1 space-y-3 pr-1">
          {savedList.length === 0 ? (
            <div className="text-center py-12 px-4 bg-slate-800/40 rounded-xl border border-dashed border-slate-800">
              <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-300">Nenhuma declaração salva ainda</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Quando estiver preenchendo qualquer modelo de declaração, clique em "Salvar no Navegador" para guardar uma cópia e continuar editando depois.
              </p>
            </div>
          ) : (
            savedList.map((item) => (
              <div
                key={item.id}
                className="bg-slate-800/80 border border-slate-700/70 hover:border-teal-500/50 rounded-xl p-4 transition group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm group-hover:text-teal-300 transition">
                      {item.modelTitle}
                    </span>
                    <span className="text-[10px] bg-teal-950 text-teal-300 px-2 py-0.5 rounded border border-teal-800/60 font-mono">
                      {item.values.nome || item.values.nome1 || 'Sem nome'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>Salvo em {new Date(item.updatedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  </p>
                  {item.values.cidade && (
                    <p className="text-[11px] text-slate-500">
                      Localidade: {item.values.cidade} - {item.values.estado || 'RO'}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-700/50">
                  <button
                    onClick={() => {
                      onLoadDeclaration(item);
                      onClose();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Abrir / Editar</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg bg-slate-700 hover:bg-rose-900/80 text-slate-300 hover:text-rose-200 text-xs transition"
                    title="Excluir cópia"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Hidden File Input for Backup Import */}
        <input
          type="file"
          ref={fileInputRef}
          accept=".json,application/json"
          onChange={handleImportFile}
          className="hidden"
        />

        {/* Modal Footer */}
        <div className="mt-4 pt-4 border-t border-slate-800 shrink-0 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 text-slate-300 hover:text-teal-400 font-medium transition"
              title="Restaurar declarações a partir de um arquivo .json"
            >
              <Upload className="w-4 h-4 text-teal-400" />
              <span>Importar Backup (JSON)</span>
            </button>

            {savedList.length > 0 && (
              <button
                onClick={exportDeclarationsAsJSON}
                className="flex items-center gap-1.5 text-slate-300 hover:text-teal-400 font-medium transition"
                title="Baixar arquivo seguro com todas as declarações salvas"
              >
                <Download className="w-4 h-4 text-teal-400" />
                <span>Baixar Backup (JSON)</span>
              </button>
            )}
          </div>

          {savedList.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition"
              title="Apagar todas as cópias deste navegador"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar Tudo</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
