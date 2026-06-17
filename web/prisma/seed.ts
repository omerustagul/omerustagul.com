// Seed — demo data mirroring the prototype (theme/members.js, courses, market).
// Run: npm run seed  (after `prisma migrate dev`). Idempotent-ish: clears first.
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

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
    data: { name: "Marka Admin", email: "admin@marka.test", role: "ADMIN", passwordHash: null },
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
    gameScores: await prisma.gameScore.count(),
  };
  console.log("Seed complete:", counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
