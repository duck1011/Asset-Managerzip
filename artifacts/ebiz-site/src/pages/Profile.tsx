import { useLanguage } from "@/context/LanguageContext";

export default function Profile() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{t.profile.pageTitle}</h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="space-y-12">
          {/* Mission Section */}
          <section className="bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">{t.profile.missionLabel}</h2>
            <p className="text-2xl md:text-3xl font-medium leading-tight text-foreground" data-testid="text-mission">
              "{t.profile.mission}"
            </p>
          </section>

          {/* Story Section */}
          <section className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-6">{t.profile.storyTitle}</h2>
            <p className="text-muted-foreground leading-relaxed text-lg" data-testid="text-about">
              {t.profile.aboutText}
            </p>
          </section>

          {/* Values / Highlights */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t">
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide font-medium">{t.profile.clientsServed}</div>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-primary mb-2">12</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide font-medium">{t.profile.specialists}</div>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-primary mb-2">2018</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide font-medium">{t.profile.yearFounded}</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
