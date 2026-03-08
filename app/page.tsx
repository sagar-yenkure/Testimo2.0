import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Steps } from "@/components/steps";
import { Showcase } from "@/components/showcase";
import { Pricing } from "@/components/pricing";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import { TrustedBy } from "@/components/trusted-by";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden relative font-sans bg-[#f8faff] text-gray-900 dark:bg-[#050505] dark:text-white transition-colors duration-300">
      <Navbar />
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
