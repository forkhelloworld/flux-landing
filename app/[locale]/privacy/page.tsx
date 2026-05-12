import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { VisualEffects } from "@/components/landing/VisualEffects";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return {
    title: t("title"),
  };
}

interface Section {
  title: string;
  content?: string;
  list?: string[];
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  
  // Defensive way to get sections
  let sections: Section[] = [];
  try {
    const raw = t.raw("sections");
    if (Array.isArray(raw)) {
      sections = raw;
    } else if (raw && typeof raw === 'object') {
      sections = Object.values(raw);
    }
  } catch (e) {
    console.error("Error loading sections:", e);
  }
  
  const lastUpdatedDate = new Date().toLocaleDateString(locale === "ua" ? "uk-UA" : "en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="grain-overlay flex flex-col min-h-screen text-white bg-black overflow-x-hidden selection:bg-teal-500/30">
      <VisualEffects />
      <Header />
      <main className="flex-1 pt-40 pb-32 px-6 relative z-[3]">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
              {t("title")}
            </h1>
            <p className="text-sm font-mono text-white/20 uppercase tracking-widest">
              {t("lastUpdated", { date: lastUpdatedDate })}
            </p>
          </div>
          
          <div className="space-y-16">
            <p className="text-xl text-foreground-muted leading-relaxed font-medium italic border-l-2 border-accent/30 pl-6 py-2">
              {t("intro")}
            </p>

            {Array.isArray(sections) && sections.map((section, idx) => (
              <section key={idx} className="group">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-4 group-hover:text-accent transition-colors">
                  <span className="text-xs font-mono text-white/10">0{idx + 1}</span>
                  {section?.title}
                </h2>
                {section?.content && (
                  <p className="text-foreground-muted leading-relaxed text-lg">
                    {section.content}
                  </p>
                )}
                {Array.isArray(section?.list) && (
                  <ul className="mt-6 space-y-4">
                    {section.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-foreground-muted">
                        <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-accent/40 shrink-0" />
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
