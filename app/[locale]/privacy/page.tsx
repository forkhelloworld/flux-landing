import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { VisualEffects } from '@/components/landing/VisualEffects';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params?.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'Privacy' });
  return {
    title: t('title'),
  };
}

interface Section {
  title: string;
  content?: string;
  list?: string[];
}

export default async function PrivacyPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params?.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'Privacy' });

  // Defensive way to get sections
  let sections: Section[] = [];
  try {
    const raw = t.raw('sections');
    if (Array.isArray(raw)) {
      sections = raw;
    } else if (raw && typeof raw === 'object') {
      sections = Object.values(raw);
    }
  } catch (e) {
    console.error('Error loading sections:', e);
  }

  const lastUpdatedDate = new Date().toLocaleDateString(locale === 'ua' ? 'uk-UA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="grain-overlay flex min-h-screen flex-col overflow-x-hidden bg-black text-white selection:bg-teal-500/30">
      <VisualEffects />
      <Header />
      <main className="relative z-[3] flex-1 px-6 pt-40 pb-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16">
            <h1 className="mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-4xl font-bold tracking-tighter text-transparent md:text-6xl">
              {t('title')}
            </h1>
            <p className="font-mono text-sm tracking-widest text-white/20 uppercase">
              {t('lastUpdated', { date: lastUpdatedDate })}
            </p>
          </div>

          <div className="space-y-16">
            <p className="text-foreground-muted border-accent/30 border-l-2 py-2 pl-6 text-xl leading-relaxed font-medium italic">
              {t('intro')}
            </p>

            {Array.isArray(sections) &&
              sections.map((section, idx) => (
                <section key={idx} className="group">
                  <h2 className="group-hover:text-accent mb-6 flex items-center gap-4 text-2xl font-bold transition-colors">
                    <span className="font-mono text-xs text-white/10">0{idx + 1}</span>
                    {section?.title}
                  </h2>
                  {section?.content && (
                    <p className="text-foreground-muted text-lg leading-relaxed">
                      {section.content}
                    </p>
                  )}
                  {Array.isArray(section?.list) && (
                    <ul className="mt-6 space-y-4">
                      {section.list.map((item, i) => (
                        <li key={i} className="text-foreground-muted flex items-start gap-3">
                          <div className="bg-accent/40 mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                          <span className="text-lg">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
