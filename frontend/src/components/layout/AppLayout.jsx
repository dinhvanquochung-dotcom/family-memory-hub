import { Link } from "react-router-dom";
import { TopNav } from "./TopNav";
import { BottomNav } from "./BottomNav";

export function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <TopNav />
      <main className="flex-1 pb-24 md:pb-0">{children}</main>
      <SiteFooter />
      <BottomNav />
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
        </nav>
      </div>
      <div className="border-t border-parchment">
        <p className="mx-auto max-w-editorial px-6 py-5 text-xs text-ink/40 md:px-8">
          Bản mẫu thiết kế · Dữ liệu và hình ảnh chỉ mang tính minh hoạ.
        </p>
      </div>
    </footer>
  );
}
