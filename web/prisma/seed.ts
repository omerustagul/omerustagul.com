// Seed — demo data mirroring the prototype (theme/members.js, courses, market).
// Run: npm run seed  (after `prisma migrate dev`). Idempotent-ish: clears first.
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const ADMIN_EMAIL = "admin@marka.test";
const ADMIN_PASSWORD = "admin1234"; // dev only — change in production

const TR: Record<string, string> = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u" };
function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[çğıöşü]/g, (m) => TR[m] || m)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// demo members from the prototype's members.js seed()
const DEMO_USERS = [
  { name: "Ece K.", memory: 60, reaction: 220, sequence: 50 },
  { name: "Mert S.", memory: 56, reaction: 238, sequence: 47 },
  { name: "Lale Y.", memory: 52, reaction: 256, sequence: 44 },
  { name: "Can A.", memory: 48, reaction: 274, sequence: 41 },
  { name: "Su D.", memory: 44, reaction: 292, sequence: 38 },
  { name: "Ada Y.", memory: 40, reaction: 310, sequence: 35 },
  { name: "Kaan E.", memory: 36, reaction: 328, sequence: 32 },
  { name: "Nil B.", memory: 32, reaction: 346, sequence: 29 },
];

async function main() {
  // clean (child-first) so re-seeding is safe in dev
  await prisma.gameScore.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.purchase.deleteMany();
  await prisma.review.deleteMany();
  await prisma.projectVote.deleteMany();
  await prisma.project.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.service.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.course.deleteMany();
  await prisma.product.deleteMany();
  await prisma.section.deleteMany();
  await prisma.page.deleteMany();
  await prisma.user.deleteMany();
  await prisma.siteSettings.deleteMany();
  await prisma.profile.deleteMany();

  // --- users: 1 admin + demo leaderboard members ---
  await prisma.user.create({
    data: {
      name: "Marka Admin",
      email: ADMIN_EMAIL,
      role: "ADMIN",
      passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 10),
    },
  });
  for (const u of DEMO_USERS) {
    const email = u.name.toLowerCase().replace(/[^a-z]/g, "") + "@demo.co";
    await prisma.user.create({
      data: {
        name: u.name,
        email,
        role: "MEMBER",
        gameScores: {
          create: [
            { game: "memory", best: u.memory },
            { game: "reaction", best: u.reaction },
            { game: "sequence", best: u.sequence },
          ],
        },
      },
    });
  }

  // --- academy: one course with two modules/lessons ---
  await prisma.course.create({
    data: {
      title: "Editöryel Web Tasarımı",
      slug: "editoryel-web-tasarimi",
      price: 1299,
      modules: {
        create: [
          {
            title: "Temeller",
            order: 1,
            lessons: {
              create: [
                { title: "Grid & ritim", kind: "video", order: 1 },
                { title: "Tipografi ölçeği", kind: "video", order: 2 },
              ],
            },
          },
          {
            title: "Hareket",
            order: 2,
            lessons: {
              create: [{ title: "Scroll-reveal", kind: "doc", order: 1 }],
            },
          },
        ],
      },
    },
  });

  // --- market: two products with reviews ---
  const reviewer = await prisma.user.findFirstOrThrow({ where: { role: "MEMBER" } });
  await prisma.product.create({
    data: {
      title: "Marka UI Kit",
      slug: "marka-ui-kit",
      price: 59,
      reviews: { create: [{ userId: reviewer.id, rating: 5, body: "Premium ve eksiksiz." }] },
    },
  });
  await prisma.product.create({
    data: { title: "İkon Paketi", slug: "ikon-paketi", price: 29 },
  });

  // --- portfolio projects ---
  const PROJECTS = [
    { title: "Atlas Rebrand", client: "Atlas Teknoloji", category: "MARKA", featured: true },
    { title: "Forma E-ticaret", client: "Forma", category: "WEB" },
    { title: "Küre Mobil Uygulama", client: "Küre", category: "MOBİL" },
    { title: "Lumen Kampanya", client: "Lumen", category: "KAMPANYA" },
    { title: "Verto Kurumsal Site", client: "Verto", category: "WEB" },
    { title: "Prizma Marka Kimliği", client: "Prizma", category: "MARKA" },
  ];
  await Promise.all(
    PROJECTS.map((p, i) =>
      prisma.project.create({
        data: { ...p, slug: slugify(p.title), order: i },
      }),
    ),
  );

  // --- blog posts ---
  const POSTS = [
    { title: "Editöryel tasarımın gücü", category: "MAKALE", readTime: "6 dk", excerpt: "Beyaz alanı bir araç olarak kullanmak neden işe yarar?", featured: true },
    { title: "Marka sesini bulmak", category: "REHBER", readTime: "8 dk", excerpt: "Tutarlı bir ton, güveni nasıl inşa eder?" },
    { title: "Hareketin ritmi", category: "MOTION", readTime: "5 dk", excerpt: "Premium animasyonun arkasındaki zamanlama prensipleri." },
    { title: "Tipografi ölçeği kurmak", category: "MAKALE", readTime: "7 dk", excerpt: "Akışkan clamp ölçekleriyle hiyerarşi." },
  ];
  await Promise.all(
    POSTS.map((p) =>
      prisma.blogPost.create({
        data: { ...p, slug: slugify(p.title), publishedAt: new Date("2026-06-12T09:00:00Z") },
      }),
    ),
  );

  // --- partners (marquee) ---
  await Promise.all(
    ["NEXUS", "FORMA", "ATLAS", "VERTO", "KÜRE", "LUMEN", "PRIZMA"].map((name, i) =>
      prisma.partner.create({ data: { name, order: i } }),
    ),
  );

  // --- services ---
  const SERVICES = [
    { title: "Marka Kimliği", description: "Logo, ton ve görsel sistem." },
    { title: "Web Tasarım & Geliştirme", description: "Editöryel, performanslı siteler." },
    { title: "Ürün & UX", description: "Araştırmadan arayüze dijital ürünler." },
    { title: "Kampanya & İçerik", description: "Lansman ve büyüme kampanyaları." },
  ];
  await Promise.all(
    SERVICES.map((s, i) =>
      prisma.service.create({ data: { ...s, slug: slugify(s.title), order: i } }),
    ),
  );

  // --- content & settings ---
  await prisma.siteSettings.create({
    data: {
      id: 1,
      data: { headerTemplate: "classic", footerTemplate: "columns", heroVariant: "full", accent: "#16D17F", mode: "light", font: "general", radius: 10 },
    },
  });
  await prisma.profile.create({
    data: { data: { name: "Marka", title: "Kreatif Stüdyo", bio: "Markaları geleceğe taşıyoruz." } },
  });

  const counts = {
    users: await prisma.user.count(),
    courses: await prisma.course.count(),
    products: await prisma.product.count(),
    projects: await prisma.project.count(),
    posts: await prisma.blogPost.count(),
    partners: await prisma.partner.count(),
    services: await prisma.service.count(),
    gameScores: await prisma.gameScore.count(),
  };
  console.log("Seed complete:", counts);
  console.log(`Admin login → ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
