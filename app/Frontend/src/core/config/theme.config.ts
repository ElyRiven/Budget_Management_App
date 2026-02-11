/**
 * Theme Configuration
 * Centralized theme settings including category colors
 */

export const CATEGORY_COLORS: Record<string, string> = {
  'Alimentación': 'bg-blue-100 text-blue-800',
  'Transporte': 'bg-green-100 text-green-800',
  'Vivienda': 'bg-purple-100 text-purple-800',
  'Salud': 'bg-red-100 text-red-800',
  'Educación': 'bg-yellow-100 text-yellow-800',
  'Entretenimiento': 'bg-pink-100 text-pink-800',
  'Salario': 'bg-emerald-100 text-emerald-800',
  'Negocio': 'bg-orange-100 text-orange-800',
  'Inversiones': 'bg-indigo-100 text-indigo-800',
  'Otros': 'bg-gray-100 text-gray-800',
} as const;

export const getCategoryColor = (category: string): string => {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS['Otros'];
};
