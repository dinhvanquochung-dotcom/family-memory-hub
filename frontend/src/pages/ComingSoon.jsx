import { SectionHeading } from "@/components/system/SectionHeading";
import { EmptyState } from "@/components/system/States";
import { Reveal } from "@/components/motion/Reveal";
import { Clock3 } from "lucide-react";

export default function ComingSoon({ title, description }) {
  return (
    <div className="mx-auto max-w-editorial px-6 py-16 md:px-8 md:py-24">
      <Reveal>
        <div className="mb-10 flex flex-col gap-4">
          <span
            className="inline-flex w-fit items-center gap-2 rounded-full border border-brass/40 bg-brass/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brass"
            data-testid="coming-soon-badge"
          >
            <Clock3 size={14} aria-hidden="true" /> Sắp ra mắt
          </span>
          <SectionHeading as="h1" title={title} testId="coming-soon-heading" />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <EmptyState
          icon={Clock3}
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
