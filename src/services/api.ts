import { DictionaryEntry, DictionaryStats, PersonalList, SearchFilters, SearchResult } from '../types/dictionary';
import { clientDictionary } from './clientDictionary';

let backendState: 'unknown' | 'available' | 'unavailable' = 'unknown';

async function checkBackend(): Promise<boolean> {
  if (backendState === 'available') return true;
  if (backendState === 'unavailable') return false;

  try {
    const res = await fetch('/api/dictionary/stats', { method: 'GET' });
    if (res.ok) {
      const json = await res.json();
      if (json.success) {
        backendState = 'available';
        return true;
      }
    }
  } catch {
    // Backend is unreachable, switch to static client mode
  }
  backendState = 'unavailable';
  return false;
}

export async function fetchDictionaryEntries(
  query: string = '',
  filters?: SearchFilters,
  page: number = 1,
  limit: number = 30
): Promise<{ results: SearchResult[]; total: number; totalPages: number }> {
  const hasBackend = await checkBackend();

  if (hasBackend) {
    try {
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
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          return {
            results: json.data,
            total: json.pagination.total,
            totalPages: json.pagination.totalPages
          };
        }
      }
    } catch (e) {
      console.warn('Backend search failed, falling back to local client search:', e);
      backendState = 'unavailable';
    }
  }

  // Pure static / offline client search
  const offset = (page - 1) * limit;
  const { results, total } = await clientDictionary.search(query, filters, limit, offset);
  return {
    results,
    total,
    totalPages: Math.ceil(total / limit)
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

  const hasBackend = await checkBackend();
  if (hasBackend) {
    try {
      const res = await fetch(`/api/dictionary/autocomplete?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) return json.data;
      }
    } catch {
      backendState = 'unavailable';
    }
  }

  return await clientDictionary.getAutocomplete(query, 8);
}

export async function fetchEntryById(id: string): Promise<DictionaryEntry> {
  const hasBackend = await checkBackend();
  if (hasBackend) {
    try {
      const res = await fetch(`/api/dictionary/${id}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) return json.data;
      }
    } catch {
      backendState = 'unavailable';
    }
  }

  const entry = await clientDictionary.getEntryById(id);
  if (!entry) throw new Error('واژه پیدا نشد');
  return entry;
}

export async function fetchStats(): Promise<DictionaryStats> {
  const hasBackend = await checkBackend();
  if (hasBackend) {
    try {
      const res = await fetch('/api/dictionary/stats');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) return json.data;
      }
    } catch {
      backendState = 'unavailable';
    }
  }

  return await clientDictionary.getStats();
}

export async function fetchCategories(): Promise<Array<{ id: string; name: string; name_fa: string; description: string; count: number }>> {
  const hasBackend = await checkBackend();
  if (hasBackend) {
    try {
      const res = await fetch('/api/dictionary/categories');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) return json.data;
      }
    } catch {
      backendState = 'unavailable';
    }
  }

  return await clientDictionary.getCategories();
}

export async function fetchPopularWords(limit: number = 12): Promise<DictionaryEntry[]> {
  const hasBackend = await checkBackend();
  if (hasBackend) {
    try {
      const res = await fetch(`/api/dictionary/popular?limit=${limit}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) return json.data;
      }
    } catch {
      backendState = 'unavailable';
    }
  }

  return await clientDictionary.getPopular(limit);
}

export async function fetchRecentWords(limit: number = 12): Promise<DictionaryEntry[]> {
  const hasBackend = await checkBackend();
  if (hasBackend) {
    try {
      const res = await fetch(`/api/dictionary/recent?limit=${limit}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) return json.data;
      }
    } catch {
      backendState = 'unavailable';
    }
  }

  return await clientDictionary.getRecent(limit);
}

export async function checkDuplicate(az_word: string, az_latin: string, fa_word: string, excludeId?: string) {
  const hasBackend = await checkBackend();
  if (hasBackend) {
    try {
      const res = await fetch('/api/dictionary/check-duplicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ az_word, az_latin, fa_word, excludeId })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      backendState = 'unavailable';
    }
  }

  return await clientDictionary.checkDuplicate(az_word, az_latin, fa_word, excludeId);
}

export async function createEntry(entry: Partial<DictionaryEntry>): Promise<DictionaryEntry> {
  const hasBackend = await checkBackend();
  if (hasBackend) {
    try {
      const res = await fetch('/api/dictionary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) return json.data;
      }
    } catch {
      backendState = 'unavailable';
    }
  }

  return await clientDictionary.createEntry(entry as any);
}

export async function updateEntry(id: string, entry: Partial<DictionaryEntry>): Promise<DictionaryEntry> {
  const hasBackend = await checkBackend();
  if (hasBackend) {
    try {
      const res = await fetch(`/api/dictionary/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) return json.data;
      }
    } catch {
      backendState = 'unavailable';
    }
  }

  const updated = await clientDictionary.updateEntry(id, entry);
  if (!updated) throw new Error('واژه یافت نشد');
  return updated;
}

export async function deleteEntry(id: string): Promise<void> {
  const hasBackend = await checkBackend();
  if (hasBackend) {
    try {
      const res = await fetch(`/api/dictionary/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) return;
      }
    } catch {
      backendState = 'unavailable';
    }
  }

  const ok = await clientDictionary.deleteEntry(id);
  if (!ok) throw new Error('واژه حذف نشد');
}

export async function importEntries(entries: Partial<DictionaryEntry>[]): Promise<{ added: number; skipped: number }> {
  const hasBackend = await checkBackend();
  if (hasBackend) {
    try {
      const res = await fetch('/api/dictionary/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entries })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) return { added: json.added, skipped: json.skipped };
      }
    } catch {
      backendState = 'unavailable';
    }
  }

  return await clientDictionary.importEntries(entries);
}

// Personal Lists
export async function fetchPersonalLists(): Promise<PersonalList[]> {
  const hasBackend = await checkBackend();
  if (hasBackend) {
    try {
      const res = await fetch('/api/personal/lists');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) return json.data;
      }
    } catch {
      backendState = 'unavailable';
    }
  }

  return await clientDictionary.getPersonalLists();
}

export async function savePersonalList(list: { id?: string; title: string; description?: string; word_ids: string[] }): Promise<PersonalList> {
  const hasBackend = await checkBackend();
  if (hasBackend) {
    try {
      const res = await fetch('/api/personal/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(list)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) return json.data;
      }
    } catch {
      backendState = 'unavailable';
    }
  }

  return await clientDictionary.savePersonalList(list);
}

export async function deletePersonalList(id: string): Promise<void> {
  const hasBackend = await checkBackend();
  if (hasBackend) {
    try {
      const res = await fetch(`/api/personal/lists/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) return;
      }
    } catch {
      backendState = 'unavailable';
    }
  }

  const ok = await clientDictionary.deletePersonalList(id);
  if (!ok) throw new Error('فهرست حذف نشد');
}

// AI Linguist
export async function askAiLinguist(params: {
  prompt?: string;
  type?: string;
  wordContext?: { az_word: string; az_latin: string; fa_word: string };
}): Promise<{ response: string; isAiGenerated: boolean; disclaimer: string }> {
  try {
    const res = await fetch('/api/ai/linguist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) return json.data;
      throw new Error(json.error || 'خطا در پاسخ هوش مصنوعی');
    }

    // If 404 or 503, provide helpful explanation for static Cloudflare hosting
    if (res.status === 404 || res.status === 503) {
      return {
        response: `درود و احترام.\nاپلیکیشن سؤزلوک در حال حاضر در بستر ابری استاتیک (Cloudflare Pages) و به صورت کاملاً آفلاین فعال است.\n\nبخش‌های جستجوی پیشرفته، ریشه‌شناسی لغات، دسته‌بندی‌ها، تلفظ صوتی و فهرست‌های شخصی بدون نیاز به سرور به صورت ۱۰۰٪ مستقل و محلی کار می‌کنند.\nبرای فعال‌سازی دستیار زبانی تعاملی در Cloudflare Pages، می‌توانید متغیر محیطی GEMINI_API_KEY را در بخش Settings > Environment variables پروژه کلودفلر تعریف نمایید.`,
        isAiGenerated: false,
        disclaimer: 'این راهنما به صورت خودکار جهت استفاده آفلاین / استاتیک نمایش داده شده است.'
      };
    }

    const errJson = await res.json().catch(() => ({ error: 'خطای ناشناخته در ارتباط با سرور' }));
    throw new Error(errJson.error || `خطا (${res.status})`);
  } catch (error: any) {
    // If offline or completely unreachable
    return {
      response: `در حال حاضر دسترسی به دستیار آنلاین هوش مصنوعی امکان‌پذیر نیست (حالت آفلاین یا عدم اتصال به اینترنت).\n\nتمامی واژگان (${params.wordContext?.az_word || 'مورد نظر'})، معانی، ریشه‌شناسی و املاهای ثبت‌شده در لغت‌نامه همچنان به صورت آفلاین در دسترس شما هستند.`,
      isAiGenerated: false,
      disclaimer: 'وضعیت: حالت آفلاین / هاست استاتیک'
    };
  }
}
