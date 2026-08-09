import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ImagePlus, X, ArrowLeft, ArrowRight, Check, RotateCw, CircleCheck,
  CircleAlert, Loader2, CalendarDays, Sparkles, Trash2, WifiOff, AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Reveal, FadeIn } from "@/components/motion/Reveal";
import { events, branches } from "@/data/mockData";
import { useRole } from "@/context/RoleContext";
import { PermissionDenied } from "@/components/system/States";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const STEPS = ["Chọn ảnh", "Xem trước", "Chi tiết", "Xem lại", "Đăng"];
const MAX_SIZE = 8 * 1024 * 1024; // 8MB
const SAMPLES = [
  "https://images.unsplash.com/photo-1738411324196-b9a70184a34b?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
  "https://images.unsplash.com/photo-1744680740511-c48ed0ae4bb9?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
  "https://images.unsplash.com/photo-1670899460364-ebc917bac09a?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
];

export default function Upload() {
  const { can } = useRole();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [step, setStep] = useState(0);
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [form, setForm] = useState({ caption: "", date: "", eventId: "", branchId: "" });
  const [errors, setErrors] = useState({});
  const [publishState, setPublishState] = useState("idle");
  const [online, setOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true);
  const [leaveOpen, setLeaveOpen] = useState(false);

  const hasUnsaved =
    publishState !== "done" &&
    (files.length > 0 || form.caption || form.date || form.eventId || form.branchId);

  // Online/offline awareness
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);

  // Unsaved-work warning on browser unload
  useEffect(() => {
    const handler = (e) => { if (hasUnsaved) { e.preventDefault(); e.returnValue = ""; } };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasUnsaved]);

  useEffect(() => () => files.forEach((f) => f.local && URL.revokeObjectURL(f.url)), []); // eslint-disable-line react-hooks/exhaustive-deps

  const addFiles = (list) => {
    const accepted = [];
    const bad = [];
    Array.from(list).forEach((file, i) => {
      if (!file.type.startsWith("image/")) {
        bad.push({ name: file.name, reason: "Định dạng không được hỗ trợ (chỉ nhận ảnh)" });
      } else if (file.size > MAX_SIZE) {
        bad.push({ name: file.name, reason: "Tệp vượt quá 8MB" });
      } else {
        accepted.push({ id: `f-${Date.now()}-${i}`, url: URL.createObjectURL(file), name: file.name, size: file.size, local: true });
      }
    });
    if (accepted.length) setFiles((p) => [...p, ...accepted]);
    setRejected(bad);
    if (bad.length) toast.error(`${bad.length} tệp không thể thêm`, { description: "Xem chi tiết bên dưới ô chọn ảnh." });
  };

  const addSample = (url, i) => {
    setRejected([]);
    setFiles((p) => [...p, { id: `s-${Date.now()}-${i}`, url, name: `ky-niem-mau-${i + 1}.jpg`, local: false }]);
  };

  const removeFile = (id) => setFiles((p) => p.filter((f) => f.id !== id));

  // ---- publish simulation ----
  const evaluate = useCallback(() => {
    setFiles((cur) => {
      const active = cur.filter((f) => f.status !== "removed");
      const allSettled = active.length > 0 && active.every((f) => f.status === "done" || f.status === "error");
      if (allSettled) setPublishState(active.some((f) => f.status === "error") ? "partial" : "done");
      return cur;
    });
  }, []);

  const runUpload = useCallback((id, { fail }) => {
    let prog = 0;
    const iv = setInterval(() => {
      prog += Math.random() * 22 + 8;
      if (prog >= 100) {
        clearInterval(iv);
        setFiles((p) => p.map((x) => (x.id === id ? { ...x, progress: 100, status: fail ? "error" : "done" } : x)));
        setTimeout(evaluate, 200);
      } else {
        setFiles((p) => p.map((x) => (x.id === id ? { ...x, progress: Math.round(prog) } : x)));
      }
    }, 260);
  }, [evaluate]);

  const startPublish = () => {
    if (!online) { toast.error("Bạn đang ngoại tuyến", { description: "Hãy kết nối mạng để đăng kỷ niệm." }); return; }
    setStep(4);
    setPublishState("publishing");
    const list = files;
    setFiles((p) => p.map((f) => ({ ...f, status: "uploading", progress: 0 })));
    list.forEach((f, idx) => runUpload(f.id, { fail: idx === list.length - 1 && list.length > 1 }));
  };

  const retryFile = (id) => {
    setPublishState("publishing");
    setFiles((p) => p.map((f) => (f.id === id ? { ...f, status: "uploading", progress: 0 } : f)));
    runUpload(id, { fail: false });
  };

  const removeDuringPublish = (id) => {
    setFiles((p) => p.filter((f) => f.id !== id));
    setTimeout(evaluate, 50);
  };

  // ---- navigation / validation ----
  const validateDetails = () => {
    const e = {};
    if (!form.caption.trim()) e.caption = "Hãy thêm một dòng chú thích cho kỷ niệm.";
    if (!form.date) e.date = "Hãy chọn ngày diễn ra khoảnh khắc này.";
    if (!form.eventId) e.eventId = "Hãy chọn loại sự kiện.";
    if (!form.branchId) e.branchId = "Hãy chọn nhánh gia đình.";
    return e;
  };

  const goNext = () => {
    if (step === 2) {
      const e = validateDetails();
      setErrors(e);
      if (Object.keys(e).length) return;
    }
    setStep((s) => s + 1);
  };

  const requestLeave = () => {
    if (hasUnsaved) setLeaveOpen(true);
    else navigate("/");
  };

  const confirmLeave = () => { setLeaveOpen(false); navigate("/"); };

  const resetFlow = () => {
    files.forEach((f) => f.local && URL.revokeObjectURL(f.url));
    setFiles([]); setRejected([]); setForm({ caption: "", date: "", eventId: "", branchId: "" });
    setErrors({}); setPublishState("idle"); setStep(0);
  };

  // ---- permission guard ----
  if (!can("upload")) {
    return (
      <div className="mx-auto max-w-editorial px-6 py-24 md:px-8">
        <h1 className="sr-only">Đăng kỷ niệm</h1>
        <PermissionDenied
          title="Bạn chưa có quyền đăng kỷ niệm"
          description="Chỉ thành viên có quyền Cộng tác viên trở lên mới có thể đăng kỷ niệm. Hãy liên hệ quản trị gia đình để được cấp quyền."
          testId="upload-permission-denied"
        />
      </div>
    );
  }

  const canProceedFiles = files.length > 0;

  return (
    <div className="mx-auto max-w-2xl px-5 py-8 md:px-8 md:py-14" data-testid="upload-flow">
      {!online && (
        <div className="mb-6 flex items-center gap-3 border border-ink/15 bg-ink px-4 py-2.5 text-sm text-ivory" role="status" data-testid="upload-offline">
          <WifiOff size={16} aria-hidden="true" /> Bạn đang ngoại tuyến — không thể đăng cho đến khi có kết nối.
        </div>
      )}

      <FadeIn>
        <div className="flex items-center justify-between">
          <button onClick={requestLeave} className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 hover:text-navy" data-testid="upload-close">
            <ArrowLeft size={16} aria-hidden="true" /> Trang nhà
          </button>
          <span className="text-sm text-ink/50">Bước {Math.min(step + 1, 5)} / 5</span>
        </div>
        <h1 className="mt-6 font-display text-3xl text-ink sm:text-4xl">Đăng kỷ niệm</h1>
        <p className="mt-2 text-base text-ink/60">Chia sẻ một khoảnh khắc để cả gia đình cùng gìn giữ. Nội dung minh hoạ.</p>
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
                <span className="text-sm text-ink/55">Chạm để chọn ảnh (JPG, PNG…) tối đa 8MB mỗi tệp</span>
              </button>
              <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} data-testid="upload-file-input" />

              {rejected.length > 0 && (
                <div className="flex flex-col gap-2 border border-lacquer/30 bg-lacquer/5 p-4" role="alert" data-testid="upload-rejected">
                  <p className="flex items-center gap-2 text-sm font-semibold text-lacquer"><AlertCircle size={16} aria-hidden="true" /> Một số tệp không thể thêm</p>
                  <ul className="flex flex-col gap-1 text-sm text-ink/70">
                    {rejected.map((r, i) => (
                      <li key={i}><span className="font-medium text-ink">{r.name}</span> — {r.reason}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-ink/60">Hoặc dùng ảnh mẫu để thử:</span>
                <div className="grid grid-cols-3 gap-3">
                  {SAMPLES.map((url, i) => (
                    <button key={url} onClick={() => addSample(url, i)} data-testid={`upload-sample-${i}`} aria-label={`Thêm ảnh mẫu ${i + 1}`} className="group relative aspect-square overflow-hidden border border-parchment">
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
                  <button onClick={() => removeFile(f.id)} aria-label={`Xoá ${f.name}`} data-testid={`upload-remove-${f.id}`} className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-ivory transition-colors duration-200 hover:bg-lacquer">
                    <X size={16} aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {step === 2 && (
          <Reveal>
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()} noValidate>
              <Field label="Chú thích" htmlFor="up-caption" required error={errors.caption} errorId="err-caption">
                <textarea
                  id="up-caption" rows={3} value={form.caption}
                  onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  placeholder="Kể một chút về khoảnh khắc này…"
                  aria-invalid={!!errors.caption} aria-describedby={errors.caption ? "err-caption" : undefined}
                  data-testid="upload-caption"
                  className="w-full rounded-md border border-input bg-card px-4 py-3 text-base text-ink placeholder:text-ink/40 focus-visible:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
                />
              </Field>

              <Field label="Ngày diễn ra" htmlFor="up-date" required error={errors.date} errorId="err-date">
                <div className="relative">
                  <CalendarDays size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/45" aria-hidden="true" />
                  <input
                    id="up-date" type="date" value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    aria-invalid={!!errors.date} aria-describedby={errors.date ? "err-date" : undefined}
                    data-testid="upload-date"
                    className="min-h-[52px] w-full rounded-md border border-input bg-card pl-11 pr-4 text-base text-ink focus-visible:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
                  />
                </div>
              </Field>

              <Field label="Sự kiện" htmlFor="up-event" required error={errors.eventId} errorId="err-event">
                <Select value={form.eventId} onValueChange={(v) => setForm({ ...form, eventId: v })}>
                  <SelectTrigger id="up-event" aria-label="Sự kiện" aria-invalid={!!errors.eventId} data-testid="upload-event" className="min-h-[52px] border-input bg-card text-base">
                    <SelectValue placeholder="Chọn loại sự kiện" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    {events.map((e) => (<SelectItem key={e.id} value={e.id} data-testid={`upload-event-${e.id}`}>{e.label}</SelectItem>))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Nhánh gia đình" htmlFor="up-branch" required error={errors.branchId} errorId="err-branch">
                <Select value={form.branchId} onValueChange={(v) => setForm({ ...form, branchId: v })}>
                  <SelectTrigger id="up-branch" aria-label="Nhánh gia đình" aria-invalid={!!errors.branchId} data-testid="upload-branch" className="min-h-[52px] border-input bg-card text-base">
                    <SelectValue placeholder="Chọn nhánh gia đình" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    {branches.map((b) => (<SelectItem key={b.id} value={b.id} data-testid={`upload-branch-${b.id}`}>{b.name} · {b.place}</SelectItem>))}
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
            files={files} publishState={publishState}
            onRetryFile={retryFile} onRemoveFile={removeDuringPublish}
            onViewMemory={() => navigate("/ky-niem/mem-tet-2024")}
            onAddAnother={resetFlow}
          />
        )}
      </div>

      {step < 4 && (
        <div className="mt-10 flex flex-col gap-4 border-t border-parchment pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} data-testid="upload-back" className="inline-flex min-h-[52px] items-center gap-2 rounded-full px-5 text-base font-medium text-ink/70 transition-colors duration-200 hover:text-navy disabled:opacity-40">
              <ArrowLeft size={18} aria-hidden="true" /> Quay lại
            </button>
            <button onClick={requestLeave} data-testid="upload-cancel" className="inline-flex min-h-[52px] items-center gap-2 rounded-full px-5 text-base font-medium text-ink/50 transition-colors duration-200 hover:text-lacquer">
              Huỷ
            </button>
          </div>

          {step === 0 && !canProceedFiles && <p className="text-sm text-ink/45" data-testid="upload-hint">Chọn ít nhất một ảnh để tiếp tục</p>}

          {step < 3 ? (
            <button onClick={goNext} disabled={(step === 0 || step === 1) && !canProceedFiles} data-testid="upload-next" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-navy px-8 text-base font-semibold text-ivory transition-colors duration-200 hover:bg-navy/90 disabled:cursor-not-allowed disabled:opacity-40">
              Tiếp tục <ArrowRight size={18} aria-hidden="true" />
            </button>
          ) : (
            <button onClick={startPublish} disabled={!online} data-testid="upload-publish" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-lacquer px-8 text-base font-semibold text-ivory transition-colors duration-200 hover:bg-lacquer/90 disabled:cursor-not-allowed disabled:opacity-40">
              <Sparkles size={18} aria-hidden="true" /> Đăng kỷ niệm
            </button>
          )}
        </div>
      )}

      <AlertDialog open={leaveOpen} onOpenChange={setLeaveOpen}>
        <AlertDialogContent className="border-parchment bg-card" data-testid="cancel-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-2xl text-ink">Rời khỏi mà không lưu?</AlertDialogTitle>
            <AlertDialogDescription className="text-base text-ink/65">
              Ảnh và thông tin bạn đã nhập sẽ không được lưu lại. Bạn có chắc muốn rời khỏi?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="cancel-stay" className="min-h-[44px] border-parchment">Ở lại tiếp tục</AlertDialogCancel>
            <AlertDialogAction data-testid="cancel-confirm" onClick={confirmLeave} className="min-h-[44px] bg-lacquer text-ivory hover:bg-lacquer/90">Rời khỏi</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Stepper({ step }) {
  return (
    <ol className="mt-8 flex items-center gap-2" aria-label="Tiến trình đăng kỷ niệm">
      {STEPS.map((label, i) => {
        const done = i < step, active = i === step;
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

function Field({ label, htmlFor, required, error, errorId, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label} {required && <span className="text-lacquer" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} role="alert" data-testid={`${errorId}`} className="flex items-center gap-1.5 text-sm text-lacquer">
          <AlertCircle size={14} aria-hidden="true" /> {error}
        </p>
      )}
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

function PublishStage({ files, publishState, onRetryFile, onRemoveFile, onViewMemory, onAddAnother }) {
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
                  <div className="h-full rounded-full transition-all duration-200" style={{ width: `${f.progress || 0}%`, backgroundColor: f.status === "error" ? "#9B3A32" : "#456B58" }} />
                </div>
              </div>
              <div className="flex w-32 items-center justify-end gap-2">
                {f.status === "done" && <span className="flex items-center gap-1.5 text-xs font-medium text-moss"><Check size={14} aria-hidden="true" /> Hoàn tất</span>}
                {f.status === "uploading" && <span className="text-xs text-ink/55">{f.progress || 0}%</span>}
                {f.status === "error" && (
                  <>
                    <button onClick={() => onRetryFile(f.id)} data-testid={`publish-retry-${f.id}`} aria-label={`Thử lại ${f.name}`} className="flex h-8 w-8 items-center justify-center rounded-full border border-navy text-navy transition-colors duration-200 hover:bg-navy hover:text-ivory">
                      <RotateCw size={14} aria-hidden="true" />
                    </button>
                    <button onClick={() => onRemoveFile(f.id)} data-testid={`publish-remove-${f.id}`} aria-label={`Bỏ ${f.name}`} className="flex h-8 w-8 items-center justify-center rounded-full border border-lacquer/40 text-lacquer transition-colors duration-200 hover:bg-lacquer hover:text-ivory">
                      <Trash2 size={14} aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>

        {publishState === "partial" && (
          <div className="flex flex-col gap-3 border border-lacquer/30 bg-lacquer/5 p-5" data-testid="publish-partial">
            <p className="text-sm leading-relaxed text-ink/75">Một vài ảnh gặp trục trặc khi tải lên. Bạn có thể thử lại từng ảnh, hoặc bỏ ảnh lỗi — những ảnh đã lưu vẫn được giữ nguyên.</p>
          </div>
        )}

        {publishState === "done" && (
          <div className="flex flex-col items-center gap-5 border border-moss/30 bg-moss/5 p-8 text-center" data-testid="publish-success">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-moss/10 text-moss"><CircleCheck size={30} strokeWidth={1.5} aria-hidden="true" /></span>
            <p className="font-display text-2xl text-ink">Kỷ niệm đã thuộc về gia đình</p>
            <p className="max-w-sm text-base text-ink/60">Khoảnh khắc của bạn giờ đã nằm trong kho ký ức chung, sẵn sàng để mọi người cùng xem lại.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button onClick={onViewMemory} data-testid="publish-view" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-navy px-8 text-base font-semibold text-ivory transition-colors duration-200 hover:bg-navy/90">
                Xem kỷ niệm <ArrowRight size={18} aria-hidden="true" />
              </button>
              <button onClick={onAddAnother} data-testid="publish-add-another" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-navy px-8 text-base font-medium text-navy transition-colors duration-200 hover:bg-navy hover:text-ivory">
                Đăng thêm kỷ niệm
              </button>
            </div>
          </div>
        )}
      </div>
    </Reveal>
  );
}
