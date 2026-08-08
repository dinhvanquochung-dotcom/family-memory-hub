import { useState } from "react";
import { Search, CalendarSearch, Trash2 } from "lucide-react";
import { SectionHeading } from "@/components/system/SectionHeading";
import {
  MemorySkeleton,
  EmptyState,
  ErrorState,
  PermissionDenied,
  OfflineBanner,
} from "@/components/system/States";
import { SafeImage } from "@/components/system/SafeImage";
import { Reveal } from "@/components/motion/Reveal";

function Demo({ label, children }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-display text-2xl text-navy">{label}</h2>
      <div>{children}</div>
    </section>
  );
}

export default function StatesShowcase() {
  const [retried, setRetried] = useState(false);

  return (
    <div className="mx-auto flex max-w-editorial flex-col gap-16 px-6 py-16 md:px-8 md:py-20">
      <Reveal>
        <SectionHeading
          as="h1"
          eyebrow="Hệ thống thiết kế"
          title="Bảng trạng thái"
          italicTitle="ứng dụng"
          description="Các trạng thái dùng lại trong toàn bộ sản phẩm: đang tải, trống, lỗi có thể khôi phục, từ chối quyền, ngoại tuyến, ảnh không khả dụng và không có kết quả. Nội dung minh hoạ."
          testId="showcase-heading"
        />
      </Reveal>

      <Demo label="Đang tải (skeleton)">
        <MemorySkeleton count={3} testId="showcase-skeleton" />
      </Demo>

      <Demo label="Không có kỷ niệm (trống)">
        <EmptyState
          title="Chưa có kỷ niệm nào ở đây"
          description="Khi gia đình bắt đầu chia sẻ, những khoảnh khắc đầu tiên sẽ xuất hiện tại đây."
          actionLabel="Đăng kỷ niệm"
          actionTo="/dang-ky-niem"
          testId="showcase-empty"
        />
      </Demo>

      <Demo label="Không có kết quả tìm kiếm">
        <EmptyState
          icon={Search}
          title="Không tìm thấy kết quả"
          description="Không có ký ức nào khớp với tìm kiếm của bạn. Thử một tên người, một năm hoặc một dịp khác."
          testId="showcase-no-results"
        />
      </Demo>

      <Demo label="Không có kỷ niệm trong dòng thời gian">
        <EmptyState
          icon={CalendarSearch}
          title="Chưa có kỷ niệm cho khoảng thời gian này"
          description="Hãy nới rộng bộ lọc, hoặc là người đầu tiên thêm một kỷ niệm cho giai đoạn này."
          actionLabel="Đăng kỷ niệm"
          actionTo="/dang-ky-niem"
          testId="showcase-empty-timeline"
        />
      </Demo>

      <Demo label="Kỷ niệm đã bị xoá hoặc không còn">
        <EmptyState
          icon={Trash2}
          title="Kỷ niệm này không còn khả dụng"
          description="Có thể kỷ niệm đã được gỡ hoặc di chuyển. Hãy quay lại dòng thời gian để xem những khoảnh khắc khác."
          actionLabel="Về dòng thời gian"
          actionTo="/dong-thoi-gian"
          testId="showcase-deleted"
        />
      </Demo>

      <Demo label="Lỗi có thể khôi phục">
        <ErrorState
          onRetry={() => setRetried(true)}
          testId="showcase-error"
        />
        {retried && <p className="mt-3 text-sm text-moss" data-testid="showcase-retry-ack">Đã thử lại — trong ứng dụng thật, nội dung sẽ được tải lại.</p>}
      </Demo>

      <Demo label="Từ chối quyền">
        <PermissionDenied testId="showcase-permission-denied" />
      </Demo>

      <Demo label="Ngoại tuyến">
        <div className="overflow-hidden border border-parchment">
          <OfflineBanner testId="showcase-offline" />
        </div>
      </Demo>

      <Demo label="Ảnh không khả dụng">
        <div className="w-64">
          <div className="aspect-[4/3] w-full">
            <SafeImage src="" alt="Ảnh minh hoạ không khả dụng" className="h-full w-full" testId="showcase-image-unavailable" />
          </div>
        </div>
      </Demo>
    </div>
  );
}
