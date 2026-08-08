import { SectionHeading } from "@/components/system/SectionHeading";
import { EmptyState } from "@/components/system/States";
import { Reveal } from "@/components/motion/Reveal";

export default function ComingSoon({ title, eyebrow, description }) {
  return (
    <div className="mx-auto max-w-editorial px-6 py-16 md:px-8 md:py-24">
      <Reveal>
        <SectionHeading eyebrow={eyebrow} title={title} className="mb-12" testId="coming-soon-heading" />
      </Reveal>
      <Reveal delay={0.1}>
        <EmptyState
          title="Trải nghiệm này đang được hoàn thiện"
          description={description}
          actionLabel="Về trang nhà"
          actionTo="/"
          testId="coming-soon-empty"
        />
      </Reveal>
    </div>
  );
}
