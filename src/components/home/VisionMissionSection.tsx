import { messages, type Locale } from "@/lib/i18n";
export default function VisionMissionSection({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const t = messages[locale];
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <h2 className="text-2xl font-semibold text-link">{t.mission}</h2>
        <p className="mt-4 leading-relaxed text-muted">{t.missionText}</p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-link">{t.vision}</h2>
        <p className="mt-4 leading-relaxed text-muted">{t.visionText}</p>
      </div>
    </div>
  );
}
