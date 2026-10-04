import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as XLSX from 'xlsx';
import { DictionaryEntry } from '../src/types/dictionary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../.data');
const DICTIONARY_FILE = path.join(DATA_DIR, 'dictionary.json');
const PUBLIC_DIR = path.resolve(__dirname, '../public');

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

let entries: DictionaryEntry[] = [];
if (fs.existsSync(DICTIONARY_FILE)) {
  entries = JSON.parse(fs.readFileSync(DICTIONARY_FILE, 'utf-8'));
}

console.log(`Exporting ${entries.length} words to Excel format...`);

// Prepare rows for Excel
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

// Create worksheet
const worksheet = XLSX.utils.json_to_sheet(rows);

// Set column widths
const colWidths = [
  { wch: 6 },  // ردیف
  { wch: 22 }, // واژه ترکی
  { wch: 20 }, // آوانویسی لاتین
  { wch: 28 }, // ترجمه فارسی
  { wch: 18 }, // دسته‌بندی
  { wch: 14 }, // نقش دستوری
  { wch: 16 }, // لهجه
  { wch: 16 }, // سبک کاربرد
  { wch: 18 }, // تلفظ فونتیک
  { wch: 16 }, // IPA
  { wch: 22 }, // املاهای متداول
  { wch: 45 }, // تعریف فارسی
  { wch: 35 }, // توضیح ترکی
  { wch: 40 }, // جمله نمونه
  { wch: 40 }, // ترجمه جمله
  { wch: 25 }, // ریشه‌شناسی
  { wch: 28 }  // منبع
];
worksheet['!cols'] = colWidths;

// Create workbook
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'لغات ترکی و فارسی');

// Output paths
const publicExcelPath = path.join(PUBLIC_DIR, 'sozluk_azerbaijani_persian_dictionary.xlsx');
const rootExcelPath = path.resolve(__dirname, '../sozluk_azerbaijani_persian_dictionary.xlsx');

XLSX.writeFile(workbook, publicExcelPath);
XLSX.writeFile(workbook, rootExcelPath);

console.log(`Excel file created successfully at:\n- ${publicExcelPath}\n- ${rootExcelPath}`);
