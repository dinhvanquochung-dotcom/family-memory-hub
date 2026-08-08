import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { AppLayout } from "@/components/layout/AppLayout";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import Timeline from "@/pages/Timeline";
import MemoryDetail from "@/pages/MemoryDetail";
import Upload from "@/pages/Upload";
import ComingSoon from "@/pages/ComingSoon";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SmoothScroll>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dong-thoi-gian" element={<Timeline />} />
              <Route path="/ky-niem/:id" element={<MemoryDetail />} />
              <Route path="/dang-ky-niem" element={<Upload />} />
              <Route
                path="/gia-dinh"
                element={<ComingSoon title="Gia đình" eyebrow="Đang hoàn thiện" description="Nơi bạn duyệt các nhánh gia đình và từng thành viên. Trải nghiệm này sẽ sớm có mặt." />}
              />
              <Route
                path="/album"
                element={<ComingSoon title="Album" eyebrow="Đang hoàn thiện" description="Các bộ sưu tập theo sự kiện và chủ đề — Tết, Sinh nhật, Đám cưới, Du lịch. Sắp ra mắt." />}
              />
              <Route
                path="/tim-kiem"
                element={<ComingSoon title="Tìm trong ký ức" eyebrow="Đang hoàn thiện" description="Tìm theo người, năm, chú thích và sự kiện. Trải nghiệm tìm kiếm sẽ sớm có mặt." />}
              />
              <Route
                path="/tuong-nho"
                element={<ComingSoon title="Tưởng nhớ" eyebrow="Đang hoàn thiện" description="Một không gian lặng lẽ và ấm áp để tưởng nhớ những người thân yêu. Sắp ra mắt." />}
              />
            </Routes>
          </AppLayout>
        </SmoothScroll>
      </BrowserRouter>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
