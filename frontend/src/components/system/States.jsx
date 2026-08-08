import { Link } from "react-router-dom";
import { Inbox, WifiOff, TriangleAlert, RotateCw } from "lucide-react";

// Skeleton block that mirrors the memory grid rhythm.
export function MemorySkeleton({ count = 6, testId = "memory-skeleton" }) {
  return (
    <div
      data-testid={testId}
      className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-4">
          <div className="aspect-[4/3] w-full animate-pulse bg-parchment" />
          <div className="h-4 w-24 animate-pulse bg-parchment" />
          <div className="h-6 w-3/4 animate-pulse bg-parchment" />
          <div className="h-4 w-full animate-pulse bg-parchment/70" />
        </div>
      ))}
    </div>
  );
}

// Generic empty state — warm, human copy, always with an action.
export function EmptyState({ title, description, actionLabel, actionTo, onAction, icon: Icon = Inbox, testId = "empty-state" }) {
  return (
    <div
      data-testid={testId}
      className="flex flex-col items-center justify-center gap-5 border border-dashed border-parchment bg-card px-6 py-20 text-center"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-parchment text-brass">
        <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      <p className="max-w-md text-base leading-relaxed text-ink/60">{description}</p>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          data-testid="empty-state-action"
          className="mt-2 inline-flex min-h-[44px] items-center rounded-full bg-navy px-7 text-sm font-medium text-ivory transition-colors duration-200 hover:bg-navy/90"
        >
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          data-testid="empty-state-action"
          className="mt-2 inline-flex min-h-[44px] items-center rounded-full bg-navy px-7 text-sm font-medium text-ivory transition-colors duration-200 hover:bg-navy/90"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

// Error state with an explicit retry. Icon + text conveys status (not color alone).
export function ErrorState({ title = "Không tải được ký ức", description = "Đã có trục trặc khi mở kho ký ức. Xin thử lại trong giây lát.", onRetry, testId = "error-state" }) {
  return (
    <div
      data-testid={testId}
      role="alert"
      className="flex flex-col items-center justify-center gap-5 border border-lacquer/30 bg-lacquer/5 px-6 py-20 text-center"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-lacquer/10 text-lacquer">
        <TriangleAlert size={28} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      <p className="max-w-md text-base leading-relaxed text-ink/60">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          data-testid="error-retry-button"
          className="mt-2 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-navy px-7 text-sm font-medium text-navy transition-colors duration-200 hover:bg-navy hover:text-ivory"
        >
          <RotateCw size={16} aria-hidden="true" /> Thử lại
        </button>
      )}
    </div>
  );
}

// Offline banner — communicates via icon + text.
export function OfflineBanner({ testId = "offline-banner" }) {
  return (
    <div
      data-testid={testId}
      role="status"
      className="flex items-center justify-center gap-3 bg-ink px-4 py-2 text-sm text-ivory"
    >
      <WifiOff size={16} aria-hidden="true" />
      <span>Bạn đang xem ngoại tuyến — một số ký ức có thể chưa được cập nhật.</span>
    </div>
  );
}
