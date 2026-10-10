import { SavedDeclaration } from '../types/declaration';

const STORAGE_KEY = 'declaracao_online_saved_v1';

export function getSavedDeclarations(): SavedDeclaration[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Erro ao carregar declarações salvas:', e);
    return [];
  }
}

export function saveDeclarationToStorage(declaration: Omit<SavedDeclaration, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): SavedDeclaration {
  const existing = getSavedDeclarations();
  const now = new Date().toISOString();

  if (declaration.id) {
    // Atualizar existente
    const index = existing.findIndex((item) => item.id === declaration.id);
    if (index !== -1) {
      const updated: SavedDeclaration = {
        ...existing[index],
        ...declaration,
        id: declaration.id,
        updatedAt: now,
      };
      existing[index] = updated;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      return updated;
    }
  }

  // Criar nova
  const newItem: SavedDeclaration = {
    ...declaration,
    id: 'dec_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    createdAt: now,
    updatedAt: now,
  };

  const updatedList = [newItem, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  return newItem;
}

export function deleteSavedDeclaration(id: string): void {
  const existing = getSavedDeclarations();
  const filtered = existing.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function clearAllSavedDeclarations(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportDeclarationsAsJSON(): void {
  const items = getSavedDeclarations();
  const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `backup-declaracao-online-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
