import { auth } from "@/auth";
import { Hero } from "@/components/marka/Hero";
import { LatestWorks, Partners, Academy, Blog, Market, Stats, CTABlocks } from "@/components/marka/Sections";
import { Services } from "@/components/marka/Services";
import { WeeklyWork, Collections } from "@/components/marka/community";
import { GamesSection } from "@/components/marka/games-section";

export const dynamic = "force-dynamic";

// Homepage — faithful 1:1 reproduction of the prototype (ui_kits/website), with
// the exact section content and order from the Claude-designed prototype.

const WORKS = [
  { title: "Nova Spor Uygulaması", client: "Nova · 2026", category: "UI/UX", hue: 0, href: "/projects", votes: 248 },
  { title: "Pera Galeri kimliği", client: "Pera Sanat · 2025", category: "MARKA", hue: 40, href: "/projects", votes: 156 },
  { title: "Venta e-ticaret", client: "Venta · 2026", category: "E-TİCARET", hue: -50, href: "/projects", votes: 197 },
];

const PARTNERS = ["ATLAS", "NOVA", "KÖK", "VENTA", "ORBİT", "FORM", "PERA", "LUMA"];

const COURSES = [
  { title: "Sıfırdan Tasarım Sistemi", instructor: "Deniz Arı", rating: 4.9, reviews: 214, price: "₺1.299", level: "Orta", hue: 0, href: "/academy" },
  { title: "Webflow ile Üretim", instructor: "Ece Kaya", rating: 4.8, reviews: 178, price: "₺899", level: "Başlangıç", hue: 30, href: "/academy" },
  { title: "Motion & Etkileşim", instructor: "Mert Su", rating: 5.0, reviews: 96, price: "₺1.499", level: "İleri", hue: -40, href: "/academy" },
  { title: "Marka Stratejisi", instructor: "Lale Yön", rating: 4.7, reviews: 132, price: "₺1.099", level: "Orta", hue: 70, href: "/academy" },
];

const BLOG_FEATURED = {
  title: "2026'da editoryal grid'ler neden geri döndü?",
  excerpt: "Bol negatif alan, ince çizgiler ve büyük tipografi: ödüllü sitelerin ortak dili.",
  category: "Görüş",
  date: "12 Haz 2026",
  readTime: "6 dk okuma",
  hue: 0,
  href: "/blog",
};
const BLOG_REST = [
  { title: "Bir marka kimliğini nasıl kurguluyoruz", category: "Süreç", date: "03 Haz", readTime: "4 dk", hue: 40, href: "/blog" },
  { title: "Smooth scroll ve performans dengesi", category: "Teknik", date: "28 May", readTime: "7 dk", hue: -40, href: "/blog" },
  { title: "Stüdyoda bir hafta", category: "Kültür", date: "19 May", readTime: "3 dk", hue: 70, href: "/blog" },
];

const PRODUCTS = [
  { title: "Grid UI Kit", seller: "Marka Studio", format: "Figma", price: "59 USD", hue: 0, href: "/market" },
  { title: "Portfolyo Şablonu", seller: "Nova Labs", format: "Webflow", price: "39 USD", hue: 40, href: "/market" },
  { title: "Ikon Seti — 240", seller: "Form Co.", format: "SVG", price: "29 USD", hue: -40, href: "/market" },
  { title: "Sunum Sistemi", seller: "Pera", format: "Keynote", price: "49 USD", hue: 70, href: "/market" },
];

export default async function Home() {
  const session = await auth();
  const earnedIds = session?.user ? ["uye"] : [];

  return (
    <main>
      <Hero lines={["Atlas Finans", "yeniden", "markalaşma"]} client="Atlas Bank" service="Marka · Web · Ürün" score="9.2" href="/projects" />
      <LatestWorks works={WORKS} />
      <WeeklyWork />
      <Partners names={PARTNERS} />
      <Services />
      <Academy courses={COURSES} />
      <Collections earnedIds={earnedIds} />
      <GamesSection />
      <Blog featured={BLOG_FEATURED} rest={BLOG_REST} />
      <Market products={PRODUCTS} />
      <Stats />
      <CTABlocks />
    </main>
  );
}
