# 📸 Family Memory Hub

> Ứng dụng web chia sẻ ảnh/video gia đình - Miễn phí, an toàn, dễ sử dụng

## 🌟 Tính năng

✅ **Chia sẻ ảnh/video** - Tải lên và chia sẻ khoảnh khắc gia đình  
✅ **Google Drive API** - Lưu trữ miễn phí (15GB), không cần server riêng  
✅ **Giao diện đẹp** - Responsive, hoạt động trên mobile và desktop  
✅ **Tìm kiếm nâng cao** - Lọc theo ngày tháng, tên file  
✅ **Album riêng** - Phân loại ảnh theo sự kiện  
✅ **Chia sẻ link** - Share với gia đình qua link  
✅ **Hoàn toàn miễn phí** - Không phí setup, không phí hàng tháng  

## 🚀 Quick Start

### 1️⃣ Yêu cầu chuẩn bị
- Tài khoản Google (Gmail)
- Tài khoản GitHub
- Tài khoản Vercel (kết nối GitHub)

### 2️⃣ Setup Google Drive API (5 phút)
Xem file `SETUP_GUIDE.docx` để hướng dẫn chi tiết

**Tóm tắt:**
1. Truy cập: https://console.cloud.google.com
2. Tạo Project: "Family Memory Hub"
3. Enable Google Drive API
4. Tạo OAuth 2.0 Credentials (Web)
5. Copy Client ID → `.env.local`

### 3️⃣ Deploy lên Vercel (1 phút)
1. Push code lên GitHub (folder: family-memory-hub)
2. Truy cập: https://vercel.com/new
3. Import GitHub repo
4. Thêm Environment Variable: `REACT_APP_GOOGLE_CLIENT_ID`
5. Click Deploy ✨

### 4️⃣ Bắt đầu sử dụng
- Truy cập: `https://family-memory-hub.vercel.app`
- Đăng nhập Google
- Bắt đầu tải ảnh/video lên! 📸

## 📁 Cấu trúc file

```
family-memory-hub/
├── index.html           # App React hoàn chỉnh
├── package.json         # Dependencies
├── .env.local          # Google Client ID (bí mật)
├── README.md           # File này
└── public/             # Thư mục tĩnh (tuỳ chọn)
```

## 🔧 Công nghệ sử dụng

- **Frontend**: React 18 + Vanilla CSS
- **API**: Google Drive API
- **Auth**: Google OAuth 2.0
- **Hosting**: Vercel (miễn phí)
- **Storage**: Google Drive (15GB miễn phí)

## 🆘 Troubleshooting

### ❌ "Google Client ID không hợp lệ"
→ Kiểm tra Client ID trong `.env.local`
→ Kiểm tra authorized origins trong Google Cloud

### ❌ "Deploy fail"
→ Xem logs trên Vercel dashboard
→ Đảm bảo index.html ở root folder

### ❌ "Không upload được ảnh"
→ Bật Google Drive API
→ Kiểm tra quyền folder Google Drive
→ Thử file ảnh khác

## 📖 Hướng dẫn chi tiết

Xem file `SETUP_GUIDE.docx` để hướng dẫn từng bước:
- Thiết lập Google Drive API
- Chuẩn bị code
- Deploy lên Vercel
- Troubleshooting

## 🎁 Bonus: Local Development

Nếu bạn muốn test trên máy cá nhân:

```bash
# Cài đặt
npm install

# Chạy server local
npm run dev

# Truy cập: http://localhost:3000
```

## 👥 Chia sẻ với gia đình

1. Lấy URL app: `https://family-memory-hub.vercel.app`
2. Share link với gia đình qua Messenger, Zalo, etc.
3. Tất cả gia đình dùng tài khoản Google của riêng họ để đăng nhập
4. Mỗi người có thể tải ảnh lên và xem album chung

## 💡 Mẹo

- 📸 Tải ảnh/video thường xuyên để lưu trữ khoảnh khắc
- 👨‍👩‍👧‍👦 Tổ chức album theo sự kiện (sinh nhật, lễ, du lịch)
- 🔒 Kiểm tra quyền share folder Google Drive
- 💾 Backup định kỳ (Google Drive tự động backup)

## 📞 Hỗ trợ

- 🐛 Báo cáo lỗi: GitHub Issues
- 💬 Hỏi đáp: GitHub Discussions
- 📧 Email: your.email@example.com

## 📄 License

MIT License - Bạn có thể sử dụng, sửa đổi, phát hành code

---

**Made with ❤️ for families everywhere**

Chúc gia đình bạn có nhiều khoảnh khắc yêu thương! 📸✨
