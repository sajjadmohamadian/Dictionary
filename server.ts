import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { storage } from './src/server/storage';
import { CATEGORIES_CONFIG } from './src/data/seedDictionary';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

// Initialize GoogleGenAI SDK server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const app = express();
app.use(express.json({ limit: '15mb' }));

// ---------------- DICTIONARY API ROUTES ----------------

// Search & List
app.get('/api/dictionary', (req, res) => {
  try {
    const q = (req.query.q as string) || '';
    const category = req.query.category as string;
    const part_of_speech = req.query.part_of_speech as string;
    const dialect = req.query.dialect as string;
    const usage_label = req.query.usage_label as string;
    const match_mode = (req.query.match_mode as any) || 'all';
    const direction = (req.query.direction as any) || 'both';

    const limit = Math.min(parseInt(req.query.limit as string) || 30, 100);
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const offset = (page - 1) * limit;

    const { results, total } = storage.search(
      q,
      { category, part_of_speech, dialect, usage_label, match_mode, direction },
      limit,
      offset
    );

    res.json({
      success: true,
      data: results,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error searching dictionary:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Autocomplete suggestions
app.get('/api/dictionary/autocomplete', (req, res) => {
  try {
    const q = (req.query.q as string) || '';
    const limit = Math.min(parseInt(req.query.limit as string) || 8, 20);
    const suggestions = storage.getAutocomplete(q, limit);
    res.json({ success: true, data: suggestions });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Stats
app.get('/api/dictionary/stats', (req, res) => {
  try {
    const stats = storage.getStats();
    res.json({ success: true, data: stats });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Categories list
app.get('/api/dictionary/categories', (req, res) => {
  try {
    const stats = storage.getStats();
    const categoriesWithCount = CATEGORIES_CONFIG.map(cat => ({
      ...cat,
      count: stats.categories_count[cat.id] || 0
    }));
    res.json({ success: true, data: categoriesWithCount });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Popular words
app.get('/api/dictionary/popular', (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 12, 30);
    const words = storage.getPopular(limit);
    res.json({ success: true, data: words });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Recent words
app.get('/api/dictionary/recent', (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 12, 30);
    const words = storage.getRecent(limit);
    res.json({ success: true, data: words });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Export dictionary (JSON)
app.get('/api/dictionary/export', (req, res) => {
  try {
    const all = storage.getAllEntries();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="sozluk-dictionary-export.json"');
    res.send(JSON.stringify(all, null, 2));
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Export dictionary as Excel (.xlsx)
app.get('/api/dictionary/export-excel', async (req, res) => {
  try {
    const XLSX = await import('xlsx');
    const entries = storage.getAllEntries();
    const rows = entries.map((entry, index) => {
      const example = entry.az_examples && entry.az_examples[0];
      return {
        'ردیف': index + 1,
        'واژه ترکی (الفبای عربی-فارسی)': entry.az_word || '',
        'آوانویسی لاتین': entry.az_latin || '',
        'ترجمه و معادل فارسی': entry.fa_word || '',
        'دسته‌بندی موضوعی': entry.category_fa || entry.category || '',
        'نقش دستوری': entry.part_of_speech_fa || entry.part_of_speech || '',
        'لهجه و منطقه': entry.dialect || 'عمومی',
        'سبک کاربرد': entry.usage_label_fa || entry.usage_label || '',
        'تلفظ فونتیک': entry.az_pronunciation || '',
        'آوانگاری IPA': entry.ipa || '',
        'املاهای متداول در ایران': (entry.az_alternative_spellings || []).join('، '),
        'تعریف و توضیح به فارسی': entry.fa_definition || '',
        'توضیح به ترکی': entry.az_definition || '',
        'جمله نمونه ترکی': example ? example.az : '',
        'ترجمه جمله نمونه': example ? example.fa : '',
        'ریشه‌شناسی': entry.etymology ? `${entry.etymology.origin || ''} ${entry.etymology.root || ''}`.trim() : '',
        'منبع استناد': entry.source || ''
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const colWidths = [
      { wch: 6 },
      { wch: 22 },
      { wch: 20 },
      { wch: 28 },
      { wch: 18 },
      { wch: 14 },
      { wch: 16 },
      { wch: 16 },
      { wch: 18 },
      { wch: 16 },
      { wch: 22 },
      { wch: 45 },
      { wch: 35 },
      { wch: 40 },
      { wch: 40 },
      { wch: 25 },
      { wch: 28 }
    ];
    worksheet['!cols'] = colWidths;
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'لغات ترکی و فارسی');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="sozluk_azerbaijani_persian_dictionary.xlsx"');
    res.send(buffer);
  } catch (error: any) {
    console.error('Error exporting excel:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Check duplicate
app.post('/api/dictionary/check-duplicate', (req, res) => {
  try {
    const { az_word, az_latin, fa_word, excludeId } = req.body;
    const result = storage.checkDuplicate(az_word || '', az_latin || '', fa_word || '', excludeId);
    res.json({ success: true, ...result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Single entry detail
app.get('/api/dictionary/:id', (req, res) => {
  try {
    const entry = storage.getEntryById(req.params.id);
    if (!entry) {
      return res.status(404).json({ success: false, error: 'واژه پیدا نشد.' });
    }
    // Increment search counter
    storage.incrementSearchCount(req.params.id);
    res.json({ success: true, data: entry });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new entry
app.post('/api/dictionary', (req, res) => {
  try {
    const { az_word, fa_word } = req.body;
    if (!az_word || !fa_word) {
      return res.status(400).json({ success: false, error: 'عنوان ترکی و فارسی الزامی است.' });
    }

    // Check duplicate
    const dupCheck = storage.checkDuplicate(az_word, req.body.az_latin || '', fa_word);
    if (dupCheck.isDuplicate) {
      return res.status(409).json({
        success: false,
        error: 'واژه‌ای مشابه در لغت‌نامه از قبل ثبت شده است.',
        matches: dupCheck.matches
      });
    }

    const created = storage.createEntry(req.body);
    res.status(201).json({ success: true, data: created });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update entry
app.put('/api/dictionary/:id', (req, res) => {
  try {
    const updated = storage.updateEntry(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'واژه یافت نشد.' });
    }
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete entry
app.delete('/api/dictionary/:id', (req, res) => {
  try {
    const ok = storage.deleteEntry(req.params.id);
    if (!ok) {
      return res.status(404).json({ success: false, error: 'واژه یافت نشد.' });
    }
    res.json({ success: true, message: 'واژه با موفقیت حذف گردید.' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Bulk Import
app.post('/api/dictionary/import', (req, res) => {
  try {
    const { entries } = req.body;
    if (!Array.isArray(entries)) {
      return res.status(400).json({ success: false, error: 'داده‌های ارسالی باید آرایه‌ای از واژه‌ها باشد.' });
    }
    const result = storage.importEntries(entries);
    res.json({ success: true, ...result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ---------------- PERSONAL LISTS API ----------------

app.get('/api/personal/lists', (req, res) => {
  try {
    const lists = storage.getPersonalLists();
    res.json({ success: true, data: lists });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/personal/lists', (req, res) => {
  try {
    const { title, description, word_ids, id } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, error: 'عنوان فهرست الزامی است.' });
    }
    const saved = storage.savePersonalList({ id, title, description, word_ids: word_ids || [] });
    res.json({ success: true, data: saved });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/personal/lists/:id', (req, res) => {
  try {
    const ok = storage.deletePersonalList(req.params.id);
    if (!ok) {
      return res.status(404).json({ success: false, error: 'فهرست پیدا نشد.' });
    }
    res.json({ success: true, message: 'فهرست حذف گردید.' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ---------------- GEMINI AI LINGUISTIC ASSISTANT ----------------

app.post('/api/ai/linguist', async (req, res) => {
  try {
    const { prompt, type, wordContext } = req.body;

    if (!prompt && !wordContext) {
      return res.status(400).json({ success: false, error: 'درخواست یا کلمه مورد نظر مشخص نشده است.' });
    }

    const systemInstruction = `شما یک زبان‌شناس، لغت‌شناس و پژوهشگر ارشد متخصص در زبان «ترکی آذربایجانی رایج در ایران» و زبان فارسی هستید.
وظیفه شما ارائه تحلیل‌های علمی، دقیق، ریشه‌شناختی، معنایی، دستوری و مقایسه‌ای است.

نکات حیاتی:
۱. همواره توجه داشته باشید که لهجه‌ها، املاها، اصطلاحات و تعابیر مورد بحث، متعلق به ترکی آذربایجانی در ایران (مانند تبریز، ارومیه، اردبیل، زنجان، قشقایی، مراغه و...) است، نه لزوماً ترکی جمهوری آذربایجان یا استانبولی.
۲. هم املا با الفبای عربی-فارسی (سئوگی، کؤنول، چؤره‌ک، قاپی/قاپو) و هم الفبای لاتین را برای واژگان ذکر کنید.
۳. تلفظ، هماهنگی اصوات (Vowel Harmony) و ریشه‌های کهن اوغوزی یا پروتو-ترکیک و تأثیرات متقابل بر فارسی را مستند و متین توضیح دهید.
۴. لحن شما صمیمی، علمی، دانشگاهی و آموزنده باشد.
۵. پاسخ‌ها را به زبان فارسی روان و روشن با خط خوانا بنویسید و نمونه‌های ترکی را به دقت با ترجمه فارسی بنویسید.`;

    let userPrompt = prompt || '';
    if (wordContext) {
      userPrompt = `لطفاً واژه «${wordContext.az_word}» (به لاتین: ${wordContext.az_latin}، معادل فارسی: ${wordContext.fa_word}) را در ترکی آذربایجانی ایران بررسی کن.
نوع درخواست: ${type || 'تحلیل جامع معنایی و دستوری'}.
سؤال کاربر: ${prompt || 'ریشه‌شناسی، کاربردهای محاوره‌ای در شهرهای مختلف آذربایجان و نمونه‌های زنده را بیان کن.'}`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const aiText = response.text || 'پاسخی از مدل دریافت نشد.';

    res.json({
      success: true,
      data: {
        response: aiText,
        isAiGenerated: true,
        disclaimer: 'توجه: این تحلیل توسط هوش مصنوعی (Gemini) تولید شده است و به منزله داده‌های تأییدشده فرهنگستان یا مدخل قطعی لغت‌نامه نیست.'
      }
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      success: false,
      error: 'خطا در ارتباط با دستیار هوش مصنوعی زبان‌شناسی: ' + error.message
    });
  }
});

// ---------------- VITE MIDDLEWARE / STATIC ASSETS ----------------

async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      // Skip API requests and static asset requests with file extensions
      if (url.startsWith('/api') || path.extname(url)) {
        return next();
      }
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
