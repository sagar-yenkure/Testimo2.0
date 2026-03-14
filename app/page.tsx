import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Steps } from "@/components/steps";
import { Showcase } from "@/components/showcase";
import { Pricing } from "@/components/pricing";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import { TrustedBy } from "@/components/trusted-by";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  // check if user is authenticated for navbar
  const { isAuthenticated } = await auth();

  return (
    <div className="min-h-screen overflow-hidden relative bg-background text-foreground transition-colors duration-300">
      <Navbar isAuthenticated={isAuthenticated} />
      <main>
        <Hero />
        <TrustedBy />
        <Features />
        <Steps />
        <Showcase />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
