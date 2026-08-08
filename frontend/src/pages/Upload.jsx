import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ImagePlus, X, ArrowLeft, ArrowRight, Check, RotateCw,
  CircleCheck, CircleAlert, Loader2, CalendarDays, Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Reveal, FadeIn } from "@/components/motion/Reveal";
import { events, branches } from "@/data/mockData";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const STEPS = ["Chọn ảnh", "Xem trước", "Chi tiết", "Xem lại", "Đăng"];

const SAMPLES = [
  "https://images.unsplash.com/photo-1738411324196-b9a70184a34b?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
  "https://images.unsplash.com/photo-1744680740511-c48ed0ae4bb9?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
  "https://images.unsplash.com/photo-1670899460364-ebc917bac09a?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
];

export default function Upload() {
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState([]); // {id, url, name, status}
  const [form, setForm] = useState({ caption: "", date: "", eventId: "", branchId: "" });
  const [publishState, setPublishState] = useState("idle"); // idle | publishing | partial | done
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => () => files.forEach((f) => f.local && URL.revokeObjectURL(f.url)), []);

  const addFiles = (list) => {
    const next = Array.from(list).map((file, i) => ({
      id: `f-${Date.now()}-${i}`,
      url: URL.createObjectURL(file),
      name: file.name,
      local: true,
    }));
    setFiles((p) => [...p, ...next]);
  };

  const addSample = (url, i) => {
    setFiles((p) => [...p, { id: `s-${Date.now()}-${i}`, url, name: `ky-niem-mau-${i + 1}.jpg`, local: false }]);
  };

  const removeFile = (id) => setFiles((p) => p.filter((f) => f.id !== id));

  const canProceed = () => {
    if (step === 0 || step === 1) return files.length > 0;
    if (step === 2) return form.caption.trim() && form.date && form.eventId && form.branchId;
    return true;
  };

  const startPublish = () => {
    setStep(4);
    setPublishState("publishing");
    setFiles((p) => p.map((f) => ({ ...f, status: "uploading", progress: 0 })));

    // Simulate per-file progress; the last file fails to demo partial failure + retry.
    files.forEach((f, idx) => {
      const failThis = idx === files.length - 1 && files.length > 1;
      let prog = 0;
      const iv = setInterval(() => {
        prog += Math.random() * 22 + 8;
        if (prog >= 100) {
          prog = 100;
          clearInterval(iv);
          setFiles((p) => p.map((x) => (x.id === f.id ? { ...x, progress: 100, status: failThis ? "error" : "done" } : x)));
          setTimeout(evaluate, 200);
        } else {
          setFiles((p) => p.map((x) => (x.id === f.id ? { ...x, progress: Math.round(prog) } : x)));
        }
      }, 260);
    });
  };

  const evaluate = () => {
    setFiles((cur) => {
      const anyError = cur.some((f) => f.status === "error");
      const allDone = cur.every((f) => f.status === "done" || f.status === "error");
      if (allDone) setPublishState(anyError ? "partial" : "done");
      return cur;
    });
  };

  const retryFailed = () => {
    setPublishState("publishing");
    const failed = files.filter((f) => f.status === "error");
    setFiles((p) => p.map((f) => (f.status === "error" ? { ...f, status: "uploading", progress: 0 } : f)));
    failed.forEach((f) => {
      let prog = 0;
      const iv = setInterval(() => {
        prog += Math.random() * 30 + 12;
        if (prog >= 100) {
          clearInterval(iv);
          setFiles((p) => p.map((x) => (x.id === f.id ? { ...x, progress: 100, status: "done" } : x)));
          setTimeout(evaluate, 200);
        } else {
          setFiles((p) => p.map((x) => (x.id === f.id ? { ...x, progress: Math.round(prog) } : x)));
        }
      }, 220);
    });
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-8 md:px-8 md:py-14" data-testid="upload-flow">
      <FadeIn>
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 hover:text-navy" data-testid="upload-close">
            <ArrowLeft size={16} aria-hidden="true" /> Trang nhà
          </Link>
          <span className="text-sm text-ink/50">Bước {Math.min(step + 1, 5)} / 5</span>
        </div>
        <h1 className="mt-6 font-display text-3xl text-ink sm:text-4xl">Đăng một kỷ niệm</h1>
        <p className="mt-2 text-base text-ink/60">Chia sẻ một khoảnh khắc để cả gia đình cùng gìn giữ.</p>
      </FadeIn>

      <Stepper step={step} />

      <div className="mt-8">
        {step === 0 && (
          <Reveal>
            <div className="flex flex-col gap-6">
              <button
                onClick={() => inputRef.current?.click()}
                data-testid="upload-select-button"
                className="flex min-h-[180px] flex-col items-center justify-center gap-4 border-2 border-dashed border-parchment bg-card px-6 text-center transition-colors duration-200 hover:border-brass"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-parchment text-brass">
                  <ImagePlus size={30} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="font-display text-xl text-ink">Chọn ảnh từ thiết bị</span>
                <span className="text-sm text-ink/55">Chạm để chọn ảnh hoặc video từ máy của bạn</span>
              </button>
              <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={(e) => addFiles(e.target.files)} data-testid="upload-file-input" />

              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-ink/60">Hoặc dùng ảnh mẫu để thử:</span>
                <div className="grid grid-cols-3 gap-3">
                  {SAMPLES.map((url, i) => (
                    <button key={url} onClick={() => addSample(url, i)} data-testid={`upload-sample-${i}`} className="group relative aspect-square overflow-hidden border border-parchment">
                      <img src={url} alt={`Ảnh mẫu ${i + 1}`} className="h-full w-full object-cover" />
                      <span className="absolute inset-0 flex items-center justify-center bg-navy/0 text-ivory opacity-0 transition-all duration-200 group-hover:bg-navy/40 group-hover:opacity-100">
                        <ImagePlus size={22} aria-hidden="true" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {files.length > 0 && <p className="text-sm font-medium text-moss" data-testid="upload-count">Đã chọn {files.length} tệp</p>}
            </div>
          </Reveal>
        )}

        {step === 1 && (
          <Reveal>
            <h2 className="font-display text-xl text-ink">Xem trước lựa chọn</h2>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {files.map((f) => (
                <div key={f.id} className="group relative aspect-square overflow-hidden border border-parchment bg-parchment" data-testid={`upload-preview-${f.id}`}>
                  <img src={f.url} alt={f.name} className="h-full w-full object-cover" />
                  <button
                    onClick={() => removeFile(f.id)}
                    aria-label={`Xoá ${f.name}`}
                    data-testid={`upload-remove-${f.id}`}
                    className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-ivory transition-colors duration-200 hover:bg-lacquer"
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {step === 2 && (
          <Reveal>
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <Field label="Chú thích" htmlFor="up-caption" required>
                <textarea
                  id="up-caption"
                  rows={3}
                  value={form.caption}
                  onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  placeholder="Kể một chút về khoảnh khắc này…"
                  data-testid="upload-caption"
                  className="w-full rounded-md border border-input bg-card px-4 py-3 text-base text-ink placeholder:text-ink/40 focus-visible:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
                />
              </Field>

              <Field label="Ngày diễn ra" htmlFor="up-date" required>
                <div className="relative">
                  <CalendarDays size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/45" aria-hidden="true" />
                  <input
                    id="up-date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    data-testid="upload-date"
                    className="min-h-[52px] w-full rounded-md border border-input bg-card pl-11 pr-4 text-base text-ink focus-visible:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
                  />
                </div>
              </Field>

              <Field label="Sự kiện" htmlFor="up-event" required>
                <Select value={form.eventId} onValueChange={(v) => setForm({ ...form, eventId: v })}>
                  <SelectTrigger id="up-event" data-testid="upload-event" className="min-h-[52px] border-input bg-card text-base">
                    <SelectValue placeholder="Chọn loại sự kiện" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    {events.map((e) => (
                      <SelectItem key={e.id} value={e.id} data-testid={`upload-event-${e.id}`}>{e.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Nhánh gia đình" htmlFor="up-branch" required>
                <Select value={form.branchId} onValueChange={(v) => setForm({ ...form, branchId: v })}>
                  <SelectTrigger id="up-branch" data-testid="upload-branch" className="min-h-[52px] border-input bg-card text-base">
                    <SelectValue placeholder="Chọn nhánh gia đình" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    {branches.map((b) => (
                      <SelectItem key={b.id} value={b.id} data-testid={`upload-branch-${b.id}`}>{b.name} · {b.place}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </form>
          </Reveal>
        )}

        {step === 3 && (
          <Reveal>
            <h2 className="font-display text-xl text-ink">Xem lại trước khi đăng</h2>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {files.map((f) => (
                <div key={f.id} className="aspect-square overflow-hidden border border-parchment bg-parchment">
                  <img src={f.url} alt={f.name} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
            <dl className="mt-8 divide-y divide-parchment border-y border-parchment" data-testid="upload-review">
              <ReviewRow label="Chú thích" value={form.caption} />
              <ReviewRow label="Ngày" value={form.date} />
              <ReviewRow label="Sự kiện" value={events.find((e) => e.id === form.eventId)?.label} />
              <ReviewRow label="Nhánh" value={branches.find((b) => b.id === form.branchId)?.name} />
              <ReviewRow label="Số tệp" value={`${files.length} ảnh`} />
            </dl>
          </Reveal>
        )}

        {step === 4 && (
          <PublishStage
            files={files}
            publishState={publishState}
            onRetry={retryFailed}
            onDone={() => { toast.success("Kỷ niệm đã được lưu vào kho gia đình"); navigate("/dong-thoi-gian"); }}
          />
        )}
      </div>

      {/* Footer controls */}
      {step < 4 && (
        <div className="mt-10 flex items-center justify-between gap-4 border-t border-parchment pt-6">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            data-testid="upload-back"
            className="inline-flex min-h-[52px] items-center gap-2 rounded-full px-6 text-base font-medium text-ink/70 transition-colors duration-200 hover:text-navy disabled:opacity-40"
          >
            <ArrowLeft size={18} aria-hidden="true" /> Quay lại
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              data-testid="upload-next"
              className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-navy px-8 text-base font-semibold text-ivory transition-colors duration-200 hover:bg-navy/90 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
            >
              Tiếp tục <ArrowRight size={18} aria-hidden="true" />
            </button>
          ) : (
            <button
              onClick={startPublish}
              data-testid="upload-publish"
              className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-lacquer px-8 text-base font-semibold text-ivory transition-colors duration-200 hover:bg-lacquer/90 sm:flex-none"
            >
              <Sparkles size={18} aria-hidden="true" /> Đăng kỷ niệm
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Stepper({ step }) {
  return (
    <ol className="mt-8 flex items-center gap-2" aria-label="Tiến trình đăng kỷ niệm">
      {STEPS.map((label, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <li key={label} className="flex flex-1 flex-col gap-2" data-testid={`stepper-${i}`}>
            <span className={"h-1 w-full rounded-full transition-colors duration-200 " + (done || active ? "bg-navy" : "bg-parchment")} />
            <span className={"text-[11px] font-medium transition-colors duration-200 " + (active ? "text-navy" : done ? "text-ink/50" : "text-ink/35")}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

function Field({ label, htmlFor, required, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label} {required && <span className="text-lacquer" aria-hidden="true">*</span>}
      </label>
      {children}
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-6 py-3">
      <dt className="text-sm text-ink/55">{label}</dt>
      <dd className="max-w-[65%] text-right text-base text-ink">{value || "—"}</dd>
    </div>
  );
}

function PublishStage({ files, publishState, onRetry, onDone }) {
  return (
    <Reveal>
      <div className="flex flex-col gap-6" aria-live="polite" data-testid="upload-publish-stage">
        <div className="flex items-center gap-3">
          {publishState === "publishing" && <Loader2 size={22} className="animate-spin text-navy" aria-hidden="true" />}
          {publishState === "done" && <CircleCheck size={22} className="text-moss" aria-hidden="true" />}
          {publishState === "partial" && <CircleAlert size={22} className="text-lacquer" aria-hidden="true" />}
          <h2 className="font-display text-2xl text-ink">
            {publishState === "publishing" && "Đang lưu kỷ niệm…"}
            {publishState === "done" && "Đã lưu thành công"}
            {publishState === "partial" && "Một số ảnh chưa lưu được"}
          </h2>
        </div>

        <ul className="flex flex-col gap-4">
          {files.map((f) => (
            <li key={f.id} className="flex items-center gap-4" data-testid={`publish-item-${f.id}`}>
              <div className="h-14 w-14 flex-shrink-0 overflow-hidden border border-parchment bg-parchment">
                <img src={f.url} alt={f.name} className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-ink">{f.name}</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-parchment">
                  <div
                    className="h-full rounded-full transition-all duration-200"
                    style={{ width: `${f.progress || 0}%`, backgroundColor: f.status === "error" ? "#9B3A32" : "#456B58" }}
                  />
                </div>
              </div>
              <span className="flex w-24 items-center justify-end gap-1.5 text-xs font-medium">
                {f.status === "done" && <><Check size={14} className="text-moss" aria-hidden="true" /><span className="text-moss">Hoàn tất</span></>}
                {f.status === "error" && <><CircleAlert size={14} className="text-lacquer" aria-hidden="true" /><span className="text-lacquer">Lỗi</span></>}
                {f.status === "uploading" && <span className="text-ink/55">{f.progress || 0}%</span>}
              </span>
            </li>
          ))}
        </ul>

        {publishState === "partial" && (
          <div className="flex flex-col gap-3 border border-lacquer/30 bg-lacquer/5 p-5">
            <p className="text-sm leading-relaxed text-ink/75">Một vài ảnh gặp trục trặc khi tải lên. Bạn có thể thử lại — những ảnh đã lưu vẫn được giữ nguyên.</p>
            <button onClick={onRetry} data-testid="publish-retry" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-navy px-6 text-sm font-medium text-navy transition-colors duration-200 hover:bg-navy hover:text-ivory">
              <RotateCw size={16} aria-hidden="true" /> Thử lại ảnh chưa lưu
            </button>
          </div>
        )}

        {publishState === "done" && (
          <div className="flex flex-col items-center gap-5 border border-moss/30 bg-moss/5 p-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-moss/10 text-moss">
              <CircleCheck size={30} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <p className="font-display text-2xl text-ink">Kỷ niệm đã thuộc về gia đình</p>
            <p className="max-w-sm text-base text-ink/60">Khoảnh khắc của bạn giờ đã nằm trong kho ký ức chung, sẵn sàng để mọi người cùng xem lại.</p>
            <button onClick={onDone} data-testid="publish-done" className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-navy px-8 text-base font-semibold text-ivory transition-colors duration-200 hover:bg-navy/90">
              Xem trong dòng thời gian <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </Reveal>
  );
}
