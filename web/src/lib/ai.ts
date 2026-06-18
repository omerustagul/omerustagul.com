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
