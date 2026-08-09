import "@/App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { AppLayout } from "@/components/layout/AppLayout";
import { RoleProvider } from "@/context/RoleContext";
import { Toaster } from "@/components/ui/sonner";
const Home = lazy(() => import("@/pages/Home"));
const Timeline = lazy(() => import("@/pages/Timeline"));
const MemoryDetail = lazy(() => import("@/pages/MemoryDetail"));
const Upload = lazy(() => import("@/pages/Upload"));
const ComingSoon = lazy(() => import("@/pages/ComingSoon"));
const StatesShowcase = lazy(() => import("@/pages/StatesShowcase"));

function RouteFallback() {
  return (
    <div className="mx-auto flex min-h-[45vh] max-w-editorial items-center justify-center px-6" role="status">
      <span className="font-display text-xl text-ink/60">Đang mở kho ký ức…</span>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <RoleProvider>
        <BrowserRouter>
          <SmoothScroll>
            <AppLayout>
              <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dong-thoi-gian" element={<Timeline />} />
                <Route path="/ky-niem/:id" element={<MemoryDetail />} />
                <Route path="/dang-ky-niem" element={<Upload />} />
                <Route path="/bang-trang-thai" element={<StatesShowcase />} />
                <Route
                  path="/gia-dinh"
                  element={<ComingSoon title="Gia đình" description="Nơi bạn duyệt các nhánh gia đình và từng thành viên. Trải nghiệm này sẽ sớm có mặt." />}
                />
                <Route
                  path="/album"
                  element={<ComingSoon title="Album" description="Các bộ sưu tập theo sự kiện và chủ đề — Tết, Sinh nhật, Đám cưới, Du lịch. Sắp ra mắt." />}
                />
                <Route
                  path="/tim-kiem"
                  element={<ComingSoon title="Tìm trong ký ức" description="Tìm theo người, năm, chú thích và sự kiện. Trải nghiệm tìm kiếm sẽ sớm có mặt." />}
                />
                <Route
                  path="/tuong-nho"
                  element={<ComingSoon title="Tưởng nhớ" description="Một không gian lặng lẽ và ấm áp để tưởng nhớ những người thân yêu. Sắp ra mắt." />}
                />
              </Routes>
              </Suspense>
            </AppLayout>
          </SmoothScroll>
        </BrowserRouter>
      </RoleProvider>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
