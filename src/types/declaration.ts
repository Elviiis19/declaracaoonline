export type CategoryType =
  | 'todos'
  | 'residencia'
  | 'renda'
  | 'familia'
  | 'trabalho'
  | 'habitacao'
  | 'escolaridade'
  | 'bens'
  | 'geral';


export interface FieldDefinition {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'cpf' | 'rg' | 'cep' | 'phone' | 'currency';
  placeholder?: string;
  options?: { value: string; label: string }[];
  helperText?: string;
  required?: boolean;
  defaultValue?: string;
  gridSpan?: 'full' | 'half';
}

export interface DeclarationModel {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: CategoryType;
  badge: string;
  description: string;
  whenToUse: string;
  legalBase: string;
  requiresWitnesses?: boolean;
  fields: FieldDefinition[];
  generateText: (values: Record<string, string>) => {
    title: string;
    body: string[];
    cityDateLine: string;
    signers: { name: string; document: string; role?: string }[];
    witnesses?: { name: string; document: string }[];
    notes?: string;
  };
  faqs: { question: string; answer: string }[];
}

export interface SavedDeclaration {
  id: string;
  modelId: string;
  modelTitle: string;
  createdAt: string;
  updatedAt: string;
  values: Record<string, string>;
  previewSnippet: string;
}
