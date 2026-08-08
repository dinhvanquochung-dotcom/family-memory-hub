import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Share2, Pencil, Send, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Reveal, FadeIn } from "@/components/motion/Reveal";
import { EventBadge } from "@/components/system/EventBadge";
import { EmptyState, ErrorState } from "@/components/system/States";
import {
  memoryById,
  personById,
  branchById,
  formatViDate,
  memories,
} from "@/data/mockData";

export default function MemoryDetail() {
  const { id } = useParams();
  const [state, setState] = useState("loading");
  const [comments, setComments] = useState([]);
  const [draft, setDraft] = useState("");
  const memory = memoryById(id);

  useEffect(() => {
    setState("loading");
    const t = setTimeout(() => {
      setState("ready");
      setComments(memory ? memory.comments : []);
    }, 600);
    return () => clearTimeout(t);
  }, [id]);

  if (state === "loading") return <DetailSkeleton />;
  if (state === "error") return <div className="mx-auto max-w-editorial px-6 py-24"><ErrorState onRetry={() => setState("ready")} /></div>;

  if (!memory) {
    return (
      <div className="mx-auto max-w-editorial px-6 py-24 md:px-8">
        <EmptyState
          title="Không tìm thấy kỷ niệm này"
          description="Có thể kỷ niệm đã được di chuyển hoặc chưa từng tồn tại. Hãy quay lại dòng thời gian."
          actionLabel="Về dòng thời gian"
          actionTo="/dong-thoi-gian"
          testId="detail-not-found"
        />
      </div>
    );
  }

  const branch = branchById(memory.branchId);
  const relatedPeople = memory.peopleIds.map(personById).filter(Boolean);
  const related = memories.filter((m) => m.id !== memory.id && m.eventId === memory.eventId).slice(0, 3);

  const handleShare = () => {
    toast.success("Đã sao chép liên kết kỷ niệm", { description: "Bạn có thể gửi cho người thân trong gia đình." });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setComments((c) => [
      ...c,
      { id: `local-${Date.now()}`, author: "Minh Anh", text: draft.trim(), date: new Date().toISOString() },
    ]);
    setDraft("");
    toast.success("Đã thêm lời nhắn của bạn");
  };

  return (
    <article className="mx-auto max-w-4xl px-6 py-10 md:px-8 md:py-14" data-testid="memory-detail">
      <FadeIn>
        <Link to="/dong-thoi-gian" data-testid="detail-back" className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 transition-colors duration-200 hover:text-navy">
          <ArrowLeft size={16} aria-hidden="true" /> Dòng thời gian
        </Link>
      </FadeIn>

      <Reveal delay={0.05} className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <EventBadge eventId={memory.eventId} />
          <span className="text-sm text-ink/55">{formatViDate(memory.date)}</span>
        </div>
        <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">{memory.title}</h1>
        <p className="mt-4 max-w-2xl font-display text-xl italic leading-relaxed text-ink/75">{memory.caption}</p>
      </Reveal>

      {/* Hero photo — full, uncropped presentation */}
      <Reveal delay={0.12} y={28} className="mt-10">
        <figure>
          <div className="overflow-hidden bg-parchment" style={{ aspectRatio: memory.ratio }}>
            <img src={memory.image} alt={memory.caption} className="h-full w-full object-cover" />
          </div>
          <figcaption className="mt-3 flex items-center gap-2 text-sm text-ink/50">
            <MapPin size={14} aria-hidden="true" /> {branch?.name} · {branch?.place}
          </figcaption>
        </figure>
      </Reveal>

      {/* Story + sidebar */}
      <div className="mt-14 grid gap-12 md:grid-cols-[1fr_18rem]">
        <Reveal className="order-2 md:order-1">
          <div className="prose-family">
            <h2 className="font-display text-2xl text-ink">Câu chuyện</h2>
            <p className="mt-4 text-lg leading-[1.8] text-ink/80">{memory.story}</p>
          </div>

          {/* Comments */}
          <section className="mt-14" aria-labelledby="comments-heading">
            <h2 id="comments-heading" className="font-display text-2xl text-ink">Lời nhắn của gia đình</h2>
            <ul className="mt-6 flex flex-col gap-6" data-testid="comment-list">
              {comments.length === 0 && (
                <li className="text-base text-ink/55">Chưa có lời nhắn nào. Hãy là người đầu tiên chia sẻ cảm xúc.</li>
              )}
              {comments.map((c) => (
                <li key={c.id} className="flex gap-4" data-testid={`comment-${c.id}`}>
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-parchment font-display text-lg text-navy">
                    {c.author.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold text-ink">{c.author}</span>
                    </p>
                    <p className="mt-1 text-base leading-relaxed text-ink/75">{c.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <form onSubmit={handleAddComment} className="mt-8 flex flex-col gap-3">
              <label htmlFor="comment-input" className="text-sm font-medium text-ink">Thêm một lời nhắn</label>
              <div className="flex gap-3">
                <input
                  id="comment-input"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Viết cảm nghĩ của bạn…"
                  data-testid="comment-input"
                  className="min-h-[48px] flex-1 rounded-md border border-input bg-card px-4 text-base text-ink placeholder:text-ink/40 focus-visible:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
                />
                <button
                  type="submit"
                  data-testid="comment-submit"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-md bg-navy px-5 text-sm font-semibold text-ivory transition-colors duration-200 hover:bg-navy/90"
                >
                  <Send size={16} aria-hidden="true" /> Gửi
                </button>
              </div>
            </form>
          </section>
        </Reveal>

        {/* Sidebar */}
        <Reveal delay={0.1} className="order-1 flex flex-col gap-8 md:order-2">
          <div>
            <h3 className="eyebrow text-ink/45">Người thân trong ảnh</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {relatedPeople.map((p) => (
                <li key={p.id} className="flex items-center gap-3" data-testid={`related-person-${p.id}`}>
                  <img src={p.photo} alt={`Ảnh ${p.name}`} loading="lazy" className="h-10 w-10 rounded-full object-cover" style={{ objectPosition: "center top" }} />
                  <span>
                    <span className="block text-sm font-medium text-ink">{p.name}</span>
                    <span className="block text-xs text-ink/55">{p.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hair-divider" />

          <div className="flex flex-col gap-3">
            <button
              onClick={handleShare}
              data-testid="detail-share"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-parchment bg-card text-sm font-medium text-ink transition-colors duration-200 hover:border-navy hover:text-navy"
            >
              <Share2 size={16} aria-hidden="true" /> Chia sẻ
            </button>
            <button
              onClick={() => toast("Chỉnh sửa kỷ niệm", { description: "Bạn có quyền chỉnh sửa kỷ niệm này." })}
              data-testid="detail-edit"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-parchment bg-card text-sm font-medium text-ink transition-colors duration-200 hover:border-navy hover:text-navy"
            >
              <Pencil size={16} aria-hidden="true" /> Chỉnh sửa
            </button>
          </div>
        </Reveal>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <Reveal className="mt-20 border-t border-parchment pt-12">
          <h2 className="font-display text-2xl text-ink">Những kỷ niệm <em className="text-lacquer">cùng dịp</em></h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {related.map((m) => (
              <Link key={m.id} to={`/ky-niem/${m.id}`} data-testid={`related-memory-${m.id}`} className="group flex flex-col gap-3">
                <div className="overflow-hidden bg-parchment" style={{ aspectRatio: "4 / 3" }}>
                  <img src={m.image} alt={m.caption} loading="lazy" className="h-full w-full object-cover transition-transform duration-[300ms] group-hover:scale-[1.03]" />
                </div>
                <h3 className="font-display text-lg text-ink transition-colors duration-200 group-hover:text-lacquer">{m.title}</h3>
                <span className="text-xs text-ink/45">{m.year}</span>
              </Link>
            ))}
          </div>
        </Reveal>
      )}
    </article>
  );
}

function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-14 md:px-8" data-testid="detail-skeleton" aria-hidden="true">
      <div className="h-4 w-32 animate-pulse bg-parchment" />
      <div className="mt-8 h-6 w-40 animate-pulse bg-parchment" />
      <div className="mt-4 h-12 w-3/4 animate-pulse bg-parchment" />
      <div className="mt-10 aspect-[3/2] w-full animate-pulse bg-parchment" />
      <div className="mt-10 flex flex-col gap-3">
        <div className="h-4 w-full animate-pulse bg-parchment/70" />
        <div className="h-4 w-11/12 animate-pulse bg-parchment/70" />
        <div className="h-4 w-4/5 animate-pulse bg-parchment/70" />
      </div>
    </div>
  );
}
