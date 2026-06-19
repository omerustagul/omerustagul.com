import Anthropic from "@anthropic-ai/sdk";

export type BlogDraft = {
  title: string;
  excerpt: string;
  body: string;
  category: string;
  readTime: string;
};

const SYSTEM =
  "Sen 'Marka' adlı Awwwards seviyesinde bir kreatif ajansın editöryel blog yazarısın. " +
  "Türkçe, premium, editöryel ve özgüvenli bir dille yazarsın; asla emoji kullanmazsın. " +
  "Çıktıyı YALNIZCA şu şemada geçerli JSON olarak döndür (markdown veya açıklama ekleme): " +
  '{"title": string, "excerpt": string, "body": string, "category": string, "readTime": string}. ' +
  "body 3-4 paragraf olmalı, paragraflar çift satır boşlukla (\\n\\n) ayrılmalı. " +
  "category tek kelime BÜYÜK HARF (örn. MAKALE, REHBER, MOTION). readTime '5 dk' formatında.";

/** Generate a blog draft. Uses Claude if ANTHROPIC_API_KEY is set; otherwise a
 *  graceful local simulation (same fallback philosophy as the prototype). */
export async function generateBlogDraft(topic: string): Promise<BlogDraft> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return simulate(topic);

  try {
    const client = new Anthropic({ apiKey });
    const res = await client.messages.create({
      model: "claude-opus-4-8", // latest, most capable (claude-api skill default)
      max_tokens: 4000,
      system: SYSTEM,
      messages: [{ role: "user", content: `Konu: "${topic}". Bu konuda bir blog taslağı üret.` }],
    });
    const text = res.content.find((b) => b.type === "text")?.text ?? "";
    const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
    const parsed = JSON.parse(json) as BlogDraft;
    if (!parsed.title || !parsed.body) return simulate(topic);
    return parsed;
  } catch {
    return simulate(topic);
  }
}

/* --------------------------------------------------------------- reports */
const REPORT_SYSTEM =
  "Sen 'Marka' ajansının yapay zeka analistisin. Verilen haftalık metriklerden Türkçe, " +
  "editöryel ve öz bir yönetici raporu yazarsın. Yalnızca markdown döndür: '## ' başlıklar ve " +
  "'*   ' madde imleri kullan, emoji kullanma. İki bölüm olsun: '## Yönetici özeti' ve '## Öneriler'.";

/** Generate a weekly executive report. Claude if keyed, else a local simulation. */
export async function generateReport(context: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return simulateReport();
  try {
    const client = new Anthropic({ apiKey });
    const res = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 2000,
      system: REPORT_SYSTEM,
      messages: [{ role: "user", content: `Bu haftanın verileri: ${context}. Kısa bir yönetici raporu yaz.` }],
    });
    const text = res.content.find((b) => b.type === "text")?.text ?? "";
    return text.trim() || simulateReport();
  } catch {
    return simulateReport();
  }
}

/* ------------------------------------------------------------------- seo */
export type SeoSuggestion = { title: string; description: string };
const SEO_SYSTEM =
  "Sen bir SEO uzmanısın. Verilen sayfa için Türkçe, tıklanabilir bir meta başlık (en çok 60 karakter) " +
  "ve meta açıklama (en çok 155 karakter) üretirsin. Emoji kullanma. Çıktıyı YALNIZCA şu şemada geçerli " +
  'JSON döndür: {"title": string, "description": string}.';

/** Suggest SEO meta for a page. Claude if keyed, else a local simulation. */
export async function suggestSeo(pageName: string): Promise<SeoSuggestion> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return simulateSeo(pageName);
  try {
    const client = new Anthropic({ apiKey });
    const res = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 600,
      system: SEO_SYSTEM,
      messages: [{ role: "user", content: `Sayfa: "${pageName}". Bu sayfa için meta başlık ve açıklama öner.` }],
    });
    const text = res.content.find((b) => b.type === "text")?.text ?? "";
    const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
    const parsed = JSON.parse(json) as SeoSuggestion;
    if (!parsed.title || !parsed.description) return simulateSeo(pageName);
    return parsed;
  } catch {
    return simulateSeo(pageName);
  }
}

function simulateReport(): string {
  return `## Yönetici özeti
Geçtiğimiz hafta, trafik hedeflerimizde **%12'lik** net bir büyüme yakaladık. Salı ve cuma günleri yayınlanan içeriklerin sosyal medya etkileşimini yukarı taşıdığı görülüyor. Sayfa başı kalma süresi **2.4 dakikaya** ulaştı.

## Öneriler
*   **Hafta sonu etkileşimi:** Cumartesi sabahları hafif bir bülten veya özet içerik planlanabilir.
*   **Arama motoru optimizasyonu:** Son yayınlanan 3 makalenin SEO başlıklarını güncel arama trendlerine göre optimize edelim.
*   **Dönüşüm oranı:** Satış sayfalarındaki çağrı butonlarını A/B testine sokarak %3 seviyesindeki dönüşümü artırabiliriz.`;
}

function simulateSeo(name: string): SeoSuggestion {
  return {
    title: `${name} — Marka`,
    description: `${name} hakkında premium, editöryel ve net bir özet. Bu sayfa kullanıcıların ilgisini çekecek şekilde tasarlandı.`,
  };
}

function simulate(topic: string): BlogDraft {
  const t = topic.trim() || "Dijital tasarım";
  return {
    title: `${t}: editöryel bir bakış`,
    excerpt: `${t} üzerine kısa, premium bir değerlendirme — neden önemli ve nasıl uygulanır?`,
    body:
      `${t}, markaların dijitalde fark yaratmasında giderek daha belirleyici hale geliyor. ` +
      `Doğru kurgulandığında yalnızca estetik değil, ölçülebilir sonuçlar da getiriyor.\n\n` +
      `İyi bir yaklaşım; net bir hiyerarşi, cömert beyaz alan ve amaçlı hareketle başlar. ` +
      `Detaylar tutarlı olduğunda deneyim güven verir.\n\n` +
      `Sonuç olarak ${t.toLowerCase()}, bir trend değil bir disiplindir. ` +
      `Marka olarak bu disiplini her projeye taşıyoruz.`,
    category: "MAKALE",
    readTime: "5 dk",
  };
}
