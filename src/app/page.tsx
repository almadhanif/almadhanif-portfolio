import { Hero } from '@/components/home/Hero';
import { About, Awards, Contact, Experience, Products, Skills, Work } from '@/components/home/Sections';
import { JsonLd } from '@/components/ui';
import { PageTransition } from '@/components/PageTransition';
import { homeJsonLd, jsonLdString } from '@/lib/seo';

export default function Home() {
  return (
    <PageTransition>
      <JsonLd data={jsonLdString(homeJsonLd())} />
      <Hero />
      <About />
      <Work />
      <Products />
      <Experience />
      <Skills />
      <Awards />
      <Contact />
    </PageTransition>
  );
}
