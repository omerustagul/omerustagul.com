import { redirect } from "next/navigation";

// The course player is now combined into the course page (faithful to the
// prototype's course.html). Keep this path working via a redirect.
export default async function LearnRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/academy/${slug}`);
}
