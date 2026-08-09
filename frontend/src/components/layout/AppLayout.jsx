import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import { TopNav } from "./TopNav";
import { BottomNav } from "./BottomNav";
import { OfflineBanner } from "@/components/system/States";

export function AppLayout({ children }) {
  const [online, setOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-ivory">
      {!online && <OfflineBanner />}
      <TopNav />
      <DemoNotice />
      <main className="flex-1 pb-28 md:pb-0">{children}</main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}

function DemoNotice() {
  return (
    <div
      role="note"
      data-testid="demo-notice"
      className="border-b border-parchment bg-parchment/60"
    >
      <p className="mx-auto flex max-w-editorial items-center gap-2 px-6 py-2 text-xs leading-relaxed text-ink/60 md:px-8">
        <Info size={14} className="flex-shrink-0 text-brass" aria-hidden="true" />
        <span>
          Bản mẫu thiết kế · Mọi tên, ảnh, bình luận và thông tin gia đình đều là <strong className="font-semibold">nội dung minh hoạ</strong>.
        </span>
      </p>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-parchment bg-ivory">
      <div className="mx-auto flex max-w-editorial flex-col gap-8 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="max-w-sm">
          <p className="font-display text-2xl text-navy">
            Kho Ký Ức <em className="text-lacquer">Gia Đình</em>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink/60">
            Một cuốn sách gia đình vẫn đang được viết tiếp — nơi mỗi tấm ảnh, mỗi câu chuyện được gìn giữ qua các thế hệ.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink/70" aria-label="Chân trang">
          <Link to="/" className="hover:text-navy">Trang nhà</Link>
          <Link to="/dong-thoi-gian" className="hover:text-navy">Dòng thời gian</Link>
          <Link to="/gia-dinh" className="hover:text-navy">Gia đình</Link>
          <Link to="/tuong-nho" className="hover:text-navy">Tưởng nhớ</Link>
          <Link to="/bang-trang-thai" className="hover:text-navy">Bảng trạng thái</Link>
        </nav>
      </div>
      <div className="border-t border-parchment">
        <p className="mx-auto max-w-editorial px-6 py-5 text-xs leading-relaxed text-ink/45 md:px-8">
          Đây là bản mẫu riêng tư dành cho gia đình. Trong phiên bản hoàn chỉnh, ký ức sẽ được lưu trữ an toàn và chỉ chia sẻ trong phạm vi gia đình. Dữ liệu và hình ảnh hiện tại chỉ mang tính minh hoạ.
        </p>
      </div>
    </footer>
  );
}
