// Cloudflare Pages Function for AI Linguist
// Automatically deployed on Cloudflare Pages at /api/ai/linguist

export async function onRequestPost(context: any) {
  try {
    const { request, env } = context;
    const apiKey = env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'کلید GEMINI_API_KEY در تنظیمات محیطی Cloudflare Pages تنظیم نشده است.'
        }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const body = await request.json();
    const { prompt, type, wordContext } = body;

    if (!prompt && !wordContext) {
      return new Response(
        JSON.stringify({ success: false, error: 'درخواست یا کلمه مورد نظر مشخص نشده است.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
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

    // Call Google Gemini API directly via fetch
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = {
      system_instruction: {
        parts: [{ text: systemInstruction }]
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: userPrompt }]
        }
      ],
      generationConfig: {
        temperature: 0.7
      }
    };

    const aiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      return new Response(
        JSON.stringify({
          success: false,
          error: `خطا در فراخوانی مدل هوش مصنوعی: ${aiRes.status} ${errText}`
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiRes.json();
    const candidateText =
      aiData.candidates?.[0]?.content?.parts?.[0]?.text || 'پاسخی از مدل دریافت نشد.';

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          response: candidateText,
          isAiGenerated: true,
          disclaimer:
            'توجه: این تحلیل توسط هوش مصنوعی تولید شده است و به منزله داده‌های تأییدشده فرهنگستان یا مدخل قطعی لغت‌نامه نیست.'
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
