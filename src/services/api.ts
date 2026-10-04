import { DictionaryEntry, DictionaryStats, PersonalList, SearchFilters, SearchResult } from '../types/dictionary';

export async function fetchDictionaryEntries(
  query: string = '',
  filters?: SearchFilters,
  page: number = 1,
  limit: number = 30
): Promise<{ results: SearchResult[]; total: number; totalPages: number }> {
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  if (filters?.category) params.set('category', filters.category);
  if (filters?.part_of_speech) params.set('part_of_speech', filters.part_of_speech);
  if (filters?.dialect) params.set('dialect', filters.dialect);
  if (filters?.usage_label) params.set('usage_label', filters.usage_label);
  if (filters?.match_mode) params.set('match_mode', filters.match_mode);
  if (filters?.direction) params.set('direction', filters.direction);
  params.set('page', page.toString());
  params.set('limit', limit.toString());

  const res = await fetch(`/api/dictionary?${params.toString()}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'خطا در بارگذاری اطلاعات');
  return {
    results: json.data,
    total: json.pagination.total,
    totalPages: json.pagination.totalPages
  };
}

export async function fetchAutocomplete(query: string): Promise<Array<{
  id: string;
  az_word: string;
  az_latin: string;
  fa_word: string;
  part_of_speech_fa: string;
}>> {
  if (!query.trim()) return [];
  const res = await fetch(`/api/dictionary/autocomplete?q=${encodeURIComponent(query)}`);
  const json = await res.json();
  return json.data || [];
}

export async function fetchEntryById(id: string): Promise<DictionaryEntry> {
  const res = await fetch(`/api/dictionary/${id}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'واژه پیدا نشد');
  return json.data;
}

export async function fetchStats(): Promise<DictionaryStats> {
  const res = await fetch('/api/dictionary/stats');
  const json = await res.json();
  return json.data;
}

export async function fetchCategories(): Promise<Array<{ id: string; name: string; name_fa: string; description: string; count: number }>> {
  const res = await fetch('/api/dictionary/categories');
  const json = await res.json();
  return json.data;
}

export async function fetchPopularWords(limit: number = 12): Promise<DictionaryEntry[]> {
  const res = await fetch(`/api/dictionary/popular?limit=${limit}`);
  const json = await res.json();
  return json.data || [];
}

export async function fetchRecentWords(limit: number = 12): Promise<DictionaryEntry[]> {
  const res = await fetch(`/api/dictionary/recent?limit=${limit}`);
  const json = await res.json();
  return json.data || [];
}

export async function checkDuplicate(az_word: string, az_latin: string, fa_word: string, excludeId?: string) {
  const res = await fetch('/api/dictionary/check-duplicate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ az_word, az_latin, fa_word, excludeId })
  });
  return await res.json();
}

export async function createEntry(entry: Partial<DictionaryEntry>): Promise<DictionaryEntry> {
  const res = await fetch('/api/dictionary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry)
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'خطا در افزودن واژه');
  return json.data;
}

export async function updateEntry(id: string, entry: Partial<DictionaryEntry>): Promise<DictionaryEntry> {
  const res = await fetch(`/api/dictionary/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry)
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'خطا در ویرایش واژه');
  return json.data;
}

export async function deleteEntry(id: string): Promise<void> {
  const res = await fetch(`/api/dictionary/${id}`, {
    method: 'DELETE'
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'خطا در حذف واژه');
}

export async function importEntries(entries: Partial<DictionaryEntry>[]): Promise<{ added: number; skipped: number }> {
  const res = await fetch('/api/dictionary/import', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ entries })
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'خطا در ورود داده‌ها');
  return { added: json.added, skipped: json.skipped };
}

// Personal Lists
export async function fetchPersonalLists(): Promise<PersonalList[]> {
  const res = await fetch('/api/personal/lists');
  const json = await res.json();
  return json.data || [];
}

export async function savePersonalList(list: { id?: string; title: string; description?: string; word_ids: string[] }): Promise<PersonalList> {
  const res = await fetch('/api/personal/lists', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(list)
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'خطا در ذخیره فهرست');
  return json.data;
}

export async function deletePersonalList(id: string): Promise<void> {
  const res = await fetch(`/api/personal/lists/${id}`, {
    method: 'DELETE'
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'خطا در حذف فهرست');
}

// AI Linguist
export async function askAiLinguist(params: {
  prompt?: string;
  type?: string;
  wordContext?: { az_word: string; az_latin: string; fa_word: string };
}): Promise<{ response: string; isAiGenerated: boolean; disclaimer: string }> {
  const res = await fetch('/api/ai/linguist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'خطا در ارتباط با دستیار هوش مصنوعی');
  return json.data;
}
