import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { MaskedLines, Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/system/Marquee";
import { SectionHeading } from "@/components/system/SectionHeading";
import { MemoryCard } from "@/components/system/MemoryCard";
import { EventBadge } from "@/components/system/EventBadge";
import { MemorySkeleton, ErrorState } from "@/components/system/States";
import {
  memories,
  memoryById,
  onThisDay,
  chapters,
  branches,
  memorials,
  decades,
  formatViDate,
} from "@/data/mockData";

const featured = memories.find((m) => m.featured) || memories[memories.length - 1];
const recent = memories.filter((m) => m.id !== featured.id).slice(-4).reverse();

export default function Home() {
  const [state, setState] = useState("loading"); // loading | ready | error
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setState("ready"), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      <Hero reduce={reduce} />
      <Marquee
        className="bg-card"
        items={["Gìn giữ", "Kể lại", "Đoàn viên", "Nhớ thương", "Truyền đời", "Sum vầy"]}
      />

      {/* On this day */}
      <section className="mx-auto max-w-editorial px-6 py-16 md:px-8 md:py-24" aria-labelledby="on-this-day">
        <Reveal>
          <SectionHeading
            eyebrow="Ngày này năm xưa"
            title="Cùng một ngày,"
            italicTitle="những năm đã qua"
            description="Mỗi năm, ngày hôm nay lại mang về một kỷ niệm khác. Đây là những khoảnh khắc từng diễn ra vào dịp này."
            testId="on-this-day"
          />
        </Reveal>
        <div className="no-scrollbar mt-10 flex snap-x gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
          {onThisDay.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.08} className="w-[78%] flex-shrink-0 snap-start md:w-auto">
              <OnThisDayCard memory={m} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Numbered manifesto chapters */}
      <section className="bg-card" aria-labelledby="manifesto">
        <div className="mx-auto max-w-editorial px-6 py-20 md:px-8 md:py-28">
          <Reveal>
            <h2 id="manifesto" className="max-w-3xl font-display text-3xl leading-tight text-ink sm:text-4xl">
              Một nơi chốn để gia đình <em className="text-lacquer">trở về</em> — không phải để lưu trữ, mà để sống lại.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-3">
            {chapters.map((c, i) => (
              <Reveal key={c.no} delay={i * 0.1}>
                <div className="flex flex-col gap-4 border-t border-parchment pt-6">
                  <span className="font-display text-5xl text-brass/70">{c.no}</span>
                  <h3 className="font-display text-xl text-ink">{c.title}</h3>
                  <p className="text-base leading-relaxed text-ink/65">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recent memories */}
      <section className="mx-auto max-w-editorial px-6 py-16 md:px-8 md:py-24" aria-labelledby="recent">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Mới gần đây" title="Những kỷ niệm" italicTitle="vừa được kể" testId="recent" />
            <Link
              to="/dong-thoi-gian"
              data-testid="home-view-timeline"
              className="group inline-flex items-center gap-2 text-sm font-medium text-navy transition-colors duration-200 hover:text-lacquer"
            >
              Xem dòng thời gian
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12" aria-live="polite">
          {state === "loading" && <MemorySkeleton count={4} />}
          {state === "error" && <ErrorState onRetry={() => setState("ready")} />}
          {state === "ready" && (
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {recent.map((m, i) => (
                <Reveal key={m.id} delay={i * 0.07}>
                  <MemoryCard memory={m} index={i} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Visual timeline strip */}
      <section className="bg-card" aria-labelledby="timeline-strip">
        <div className="mx-auto max-w-editorial px-6 py-20 md:px-8 md:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="Dòng chảy thời gian"
              title="Băng qua"
              italicTitle="những thập niên"
              description="Từ những mùa Tết đầu tiên đến hôm nay — ký ức của gia đình trải dài qua nhiều thế hệ."
              testId="timeline-strip"
            />
          </Reveal>
          <div className="relative mt-14">
            <div className="absolute left-0 top-4 hidden h-px w-full bg-parchment md:block" aria-hidden="true" />
            <div className="grid gap-8 md:grid-cols-4">
              {decades.map((d, i) => {
                const items = memories.filter((m) => m.year >= d.from && m.year <= d.to);
                return (
                  <Reveal key={d.id} delay={i * 0.08}>
                    <div className="relative flex flex-col gap-3">
                      <span className="hidden h-2.5 w-2.5 rounded-full bg-brass md:block" aria-hidden="true" />
                      <span className="font-display text-2xl text-navy">{d.label}</span>
                      <span className="text-sm text-ink/55">{items.length} kỷ niệm</span>
                      <ul className="mt-1 flex flex-col gap-1.5">
                        {items.map((m) => (
                          <li key={m.id}>
                            <Link
                              to={`/ky-niem/${m.id}`}
                              className="text-sm text-ink/70 underline-offset-4 transition-colors duration-200 hover:text-lacquer hover:underline"
                            >
                              {m.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Family branches */}
      <section className="mx-auto max-w-editorial px-6 py-16 md:px-8 md:py-24" aria-labelledby="branches">
        <Reveal>
          <SectionHeading eyebrow="Các nhánh gia đình" title="Ba nhánh," italicTitle="một cội nguồn" testId="branches" />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {branches.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.08}>
              <Link
                to="/gia-dinh"
                data-testid={`branch-card-${b.id}`}
                className="group flex h-full flex-col justify-between gap-8 border border-parchment bg-card p-8 transition-colors duration-200 hover:border-brass"
              >
                <span className="h-1 w-12" style={{ backgroundColor: b.accent }} aria-hidden="true" />
                <div>
                  <p className="eyebrow text-ink/45">{b.generation}</p>
                  <h3 className="mt-3 font-display text-2xl text-ink">{b.name}</h3>
                  <p className="mt-1 text-sm font-medium text-brass">{b.place}</p>
                  <p className="mt-4 text-base leading-relaxed text-ink/65">{b.note}</p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-navy transition-transform duration-200 group-hover:translate-x-1">
                  Ghé thăm <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Memorial */}
      <MemorialSection />
    </div>
  );
}

function Hero({ reduce }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);

  return (
    <section ref={ref} className="mx-auto max-w-editorial px-6 pt-12 md:px-8 md:pt-16" aria-labelledby="hero-title">
      <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-5">
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? {} : { opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="eyebrow text-brass"
          >
            Hôm nay trong ký ức
          </motion.p>
          <h1 id="hero-title" className="mt-5 font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            <MaskedLines lines={["Mở lại", "cuốn sách", "của gia đình"]} lineClassName="italic first:not-italic [&:nth-child(3)]:text-lacquer" />
          </h1>
          <Reveal delay={0.55} className="mt-7 max-w-md text-lg leading-relaxed text-ink/70">
            <p>
              Nơi những tấm ảnh, câu chuyện và con người thân thương được gìn giữ — và vẫn tiếp tục lớn lên qua từng thế hệ.
            </p>
          </Reveal>
          <Reveal delay={0.68} className="mt-9 flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/dang-ky-niem"
                data-testid="hero-upload-cta"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-navy px-8 text-base font-semibold text-ivory transition-colors duration-200 hover:bg-navy/90"
              >
                <Plus size={20} aria-hidden="true" /> Đăng một kỷ niệm
              </Link>
              <Link
                to="/dong-thoi-gian"
                data-testid="hero-explore-cta"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-ink/20 px-8 text-base font-medium text-ink transition-colors duration-200 hover:border-navy hover:text-navy"
              >
                Khám phá dòng thời gian
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal delay={0.3} y={30}>
            <figure className="relative">
              <div className="relative overflow-hidden bg-parchment clip-frame" style={{ aspectRatio: featured.ratio }}>
                <motion.img
                  src={featured.image}
                  alt={featured.caption}
                  style={{ y }}
                  className="h-[114%] w-full object-cover"
                />
              </div>
              <figcaption className="mt-4 flex items-center gap-3">
                <EventBadge eventId={featured.eventId} />
                <span className="text-sm text-ink/60">{formatViDate(featured.date)}</span>
              </figcaption>
              <p className="mt-2 max-w-xl font-display text-xl italic text-ink/80">"{featured.caption}"</p>
              <Link
                to={`/ky-niem/${featured.id}`}
                data-testid="hero-featured-link"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-lacquer hover:underline"
              >
                Đọc câu chuyện đầy đủ <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function OnThisDayCard({ memory }) {
  return (
    <Link
      to={`/ky-niem/${memory.id}`}
      data-testid={`on-this-day-${memory.id}`}
      className="group flex flex-col gap-4"
    >
      <div className="relative overflow-hidden bg-parchment" style={{ aspectRatio: "3 / 4" }}>
        <img src={memory.image} alt={memory.caption} loading="lazy" className="h-full w-full object-cover transition-transform duration-[300ms] group-hover:scale-[1.03]" />
        <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1 font-display text-lg text-navy">
          {memory.year}
        </span>
      </div>
      <h3 className="font-display text-xl text-ink transition-colors duration-200 group-hover:text-lacquer">{memory.title}</h3>
    </Link>
  );
}

function MemorialSection() {
  return (
    <section className="border-t border-brass/30 bg-[#EFE7D6]" aria-labelledby="memorial">
      <div className="mx-auto max-w-editorial px-6 py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="eyebrow text-brass">Tưởng nhớ</span>
            <h2 id="memorial" className="max-w-2xl font-display text-3xl leading-tight text-navy sm:text-4xl">
              Những người đã đi xa, nhưng vẫn <em className="text-brass">ở lại</em> trong mỗi câu chuyện
            </h2>
          </div>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-3xl gap-10 sm:grid-cols-2">
          {memorials.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.1}>
              <figure className="flex flex-col items-center gap-5 text-center" data-testid={`memorial-${m.id}`}>
                <div className="h-40 w-40 overflow-hidden rounded-full border border-brass/40">
                  <img src={m.photo} alt={`Ảnh tưởng nhớ ${m.name}`} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: "center top" }} />
                </div>
                <figcaption>
                  <p className="font-display text-2xl text-navy">{m.name}</p>
                  <p className="mt-1 text-sm font-medium tracking-wide text-brass">{m.years}</p>
                  <p className="mt-3 max-w-xs text-base italic leading-relaxed text-ink/70">"{m.line}"</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
