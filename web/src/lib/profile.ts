// Founder "Ben Kimim" / CV content — ported from the prototype's theme/profile.js
// defaults. The Profile model (Json) overrides these; the public /ben-kimim page
// merges DB data over these defaults, and the admin Profil/CV module writes them.

export type ProfileStat = { num: number; suffix?: string; label: string };
export type ProfileExperience = { id: string; role: string; company: string; period: string; current?: boolean; desc?: string };
export type ProfileVenture = { id: string; name: string; role: string; period: string; desc?: string; url?: string };
export type ProfileAward = { id: string; title: string; org: string; year: string };
export type ProfilePress = { id: string; title: string; outlet: string; year: string; url?: string };
export type ProfileFeatured = { id: string; title: string; year: string; href?: string };

export type ProfileData = {
  name: string;
  role: string;
  tagline: string;
  location: string;
  available: boolean;
  avatar: string | null;
  cover: string | null;
  bio: string;
  stats: ProfileStat[];
  experience: ProfileExperience[];
  ventures: ProfileVenture[];
  awards: ProfileAward[];
  skills: string[];
  press: ProfilePress[];
  featured: ProfileFeatured[];
  contactEmail: string;
};

export const DEFAULT_PROFILE: ProfileData = {
  name: "Deniz Arı",
  role: "Kurucu & Kreatif Direktör",
  tagline: "Markaları dijitalde yeni bir standarda taşıyorum.",
  location: "İstanbul, Türkiye",
  available: true,
  avatar: null,
  cover: null,
  bio: "On yılı aşkın süredir markaların dijital kimliğini kurguluyorum. İşim; karmaşık fikirleri sade, cesur ve ölçülebilir deneyimlere çevirmek.\n\nStratejiden arayüze, hareket tasarımından ekip kültürüne kadar tek bir sistem kurmaya inanıyorum — çünkü iyi tasarım, tutarlılıktan doğar.",
  stats: [
    { num: 240, suffix: "+", label: "Tamamlanan proje" },
    { num: 31, suffix: "", label: "Kazanılan ödül" },
    { num: 12, suffix: "", label: "Yıllık deneyim" },
  ],
  experience: [
    { id: "e1", role: "Kurucu & Kreatif Direktör", company: "Marka", period: "2019 — Bugün", current: true, desc: "Editöryel, performanslı ve ödüllü dijital ürünler üreten bir kreatif stüdyo kurdum." },
    { id: "e2", role: "Tasarım Lideri", company: "Nova Labs", period: "2015 — 2019", current: false, desc: "Fintech ve SaaS ürünleri için tasarım ekibini büyüttüm; 0→1 ürünler çıkardım." },
    { id: "e3", role: "Kıdemli Arayüz Tasarımcısı", company: "Atlas Digital", period: "2012 — 2015", current: false, desc: "Kurumsal markalar için web ve mobil arayüzler tasarladım." },
  ],
  ventures: [
    { id: "v1", name: "Marka", role: "Kurucu", period: "2019", desc: "Kreatif ajans + akademi + market platformu.", url: "" },
    { id: "v2", name: "Grid UI Kit", role: "Yaratıcı", period: "2021", desc: "300+ satışa ulaşan editöryel tasarım sistemi.", url: "" },
  ],
  awards: [
    { id: "a1", title: "Site of the Day", org: "Awwwards", year: "2025" },
    { id: "a2", title: "Yılın Ajansı (Finalist)", org: "Webby", year: "2024" },
    { id: "a3", title: "Developer Award", org: "CSSDA", year: "2023" },
  ],
  skills: ["Marka Stratejisi", "Sanat Yönetimi", "UI/UX Tasarım", "Motion", "Tasarım Sistemleri", "Ekip Liderliği"],
  press: [
    { id: "p1", title: "Türkiye'de tasarımın geleceği", outlet: "Webrazzi", year: "2025", url: "" },
    { id: "p2", title: "Editöryel web'in yükselişi", outlet: "Medium", year: "2024", url: "" },
  ],
  featured: [
    { id: "f1", title: "Atlas Finans yeniden markalaşma", year: "2026", href: "/projects" },
    { id: "f2", title: "Nova Spor Uygulaması", year: "2025", href: "/projects" },
  ],
  contactEmail: "merhaba@marka.studio",
};

/** Merge persisted Profile.data (Json) over the defaults. */
export function resolveProfile(data: unknown): ProfileData {
  if (data && typeof data === "object") {
    return { ...DEFAULT_PROFILE, ...(data as Partial<ProfileData>) };
  }
  return DEFAULT_PROFILE;
}
