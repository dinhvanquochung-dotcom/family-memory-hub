// Fictional Vietnamese family archive data — all names, dates and stories are invented.
// No real personal data, no production Firebase data.

export const branches = [
  {
    id: "noi-hanoi",
    name: "Nhánh Ông Bà Nội",
    place: "Hà Nội",
    generation: "Thế hệ thứ nhất",
    accent: "#183153",
    note: "Gốc rễ của gia đình, nơi mọi câu chuyện bắt đầu bên Hồ Tây.",
  },
  {
    id: "ngoai-hue",
    name: "Nhánh Ông Bà Ngoại",
    place: "Huế",
    generation: "Thế hệ thứ nhất",
    accent: "#9B3A32",
    note: "Những mùa mưa Huế, tiếng đàn và mâm cơm chiều bên sông Hương.",
  },
  {
    id: "cau-ba-sg",
    name: "Nhánh Cậu Ba",
    place: "Sài Gòn",
    generation: "Thế hệ thứ hai",
    accent: "#456B58",
    note: "Chuyến đi phương Nam, phố phường náo nhiệt và những Tết xa nhà.",
  },
];

export const people = [
  { id: "p-long", name: "Nguyễn Văn Long", role: "Ông Nội", branchId: "noi-hanoi", born: 1948, photo: "https://images.unsplash.com/photo-1586498024141-1940debde48d?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { id: "p-mai", name: "Trần Thị Mai", role: "Bà Nội", branchId: "noi-hanoi", born: 1951, photo: "https://images.unsplash.com/photo-1609465736803-130dde4a2a1b?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { id: "p-huong", name: "Phạm Thị Hương", role: "Mẹ", branchId: "ngoai-hue", born: 1976, photo: "https://images.unsplash.com/photo-1768836994489-53d17a43ba65?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { id: "p-nam", name: "Lê Hoàng Nam", role: "Cha", branchId: "cau-ba-sg", born: 1974, photo: "https://images.unsplash.com/photo-1738411324196-b9a70184a34b?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { id: "p-anh", name: "Nguyễn Minh Anh", role: "Con gái", branchId: "noi-hanoi", born: 2004, photo: "https://images.unsplash.com/photo-1768836994904-8104b206fc8a?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { id: "p-khoa", name: "Nguyễn Đăng Khoa", role: "Con trai", branchId: "cau-ba-sg", born: 2008, photo: "https://images.unsplash.com/photo-1744680740511-c48ed0ae4bb9?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
];

export const memorials = [
  {
    id: "m-duc",
    name: "Cụ Nguyễn Văn Đức",
    role: "Cụ Ông",
    years: "1922 – 2009",
    photo: "https://images.unsplash.com/photo-1647082286159-16a43c39eab1?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    line: "Người trồng cây khế đầu ngõ mà cả nhà vẫn hái mỗi mùa hè.",
  },
  {
    id: "m-lan",
    name: "Cụ Bà Nguyễn Thị Lan",
    role: "Cụ Bà",
    years: "1930 – 2018",
    photo: "https://images.unsplash.com/photo-1784206049445-13fa85f01257?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    line: "Bàn tay gói bánh chưng khéo nhất nhà, Tết nào cũng nhớ.",
  },
];

export const events = [
  { id: "tet", label: "Tết", color: "#9B3A32" },
  { id: "sinh-nhat", label: "Sinh nhật", color: "#B89656" },
  { id: "dam-cuoi", label: "Đám cưới", color: "#183153" },
  { id: "du-lich", label: "Du lịch", color: "#456B58" },
  { id: "ngay-thuong", label: "Ngày thường", color: "#6B6455" },
];

export const memories = [
  {
    id: "mem-tet-1998",
    authorId: "p-mai",
    title: "Tết đầu tiên có đủ ba thế hệ",
    caption: "Cả nhà quây quần bên nồi bánh chưng, khói bếp và tiếng cười không dứt.",
    story:
      "Mùng Một Tết năm ấy, lần đầu tiên ông bà nội, ba mẹ và các cháu cùng đón giao thừa dưới một mái nhà ở Hà Nội. Bà Mai dậy từ ba giờ sáng luộc bánh, ông Long thì lo bày mâm ngũ quả. Không ai chụp được tấm ảnh nào rõ nét vì ai cũng bận cười.",
    date: "1998-01-28",
    year: 1998,
    eventId: "tet",
    branchId: "noi-hanoi",
    image: "https://images.unsplash.com/photo-1699727861609-c74cdc7d7c80?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    ratio: "4 / 3",
    peopleIds: ["p-long", "p-mai", "p-huong", "p-anh"],
    comments: [
      { id: "c1", author: "Minh Anh", text: "Con vẫn giữ chiếc áo đỏ trong ảnh này ạ!", date: "2024-02-02" },
      { id: "c2", author: "Mẹ Hương", text: "Năm đó lạnh lắm mà ấm nhất nhà mình.", date: "2024-02-03" },
    ],
  },
  {
    id: "mem-cuoi-2001",
    authorId: "p-huong",
    title: "Đám cưới ba mẹ bên sông Hương",
    caption: "Một chiều Huế trong veo, tà áo dài trắng và lời hẹn ước.",
    story:
      "Ba mẹ làm lễ ở Huế, quê ngoại. Trời hôm ấy mưa nhẹ rồi tạnh, ai cũng bảo là điềm lành. Cậu Ba từ Sài Gòn ra kịp giờ, mang theo một va li đầy bánh phồng tôm.",
    date: "2001-11-12",
    year: 2001,
    eventId: "dam-cuoi",
    branchId: "ngoai-hue",
    image: "https://images.unsplash.com/photo-1777917676708-2c53ec780a86?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    ratio: "3 / 4",
    peopleIds: ["p-huong", "p-nam"],
    comments: [
      { id: "c3", author: "Cậu Ba", text: "Chuyến tàu đó anh nhớ mãi.", date: "2023-11-12" },
    ],
  },
  {
    id: "mem-sinhnhat-2012",
    authorId: "p-nam",
    title: "Sinh nhật tám tuổi của Khoa",
    caption: "Chiếc bánh kem đầu tiên tự tay mẹ làm, hơi méo nhưng ngọt nhất.",
    story:
      "Khoa thổi nến ba lần mới tắt hết. Cả nhà hát mừng sinh nhật bằng ba giọng miền khác nhau, nghe vui tai vô cùng.",
    date: "2012-06-15",
    year: 2012,
    eventId: "sinh-nhat",
    branchId: "cau-ba-sg",
    image: "https://images.unsplash.com/photo-1744680740511-c48ed0ae4bb9?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    ratio: "4 / 3",
    peopleIds: ["p-khoa", "p-nam"],
    comments: [],
  },
  {
    id: "mem-dulich-2016",
    authorId: "p-long",
    title: "Chuyến đi Đà Lạt của cả họ",
    caption: "Sáng sớm sương giăng, mọi người co ro bên ly sữa đậu nóng.",
    story:
      "Lần hiếm hoi cả ba nhánh cùng đi chơi xa. Xe mười sáu chỗ chật kín người và tiếng hát. Ông Long ngủ gật suốt đường nhưng tỉnh dậy đúng lúc tới đồi chè.",
    date: "2016-12-03",
    year: 2016,
    eventId: "du-lich",
    branchId: "noi-hanoi",
    image: "https://images.unsplash.com/photo-1670899460364-ebc917bac09a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    ratio: "16 / 10",
    peopleIds: ["p-long", "p-mai", "p-nam", "p-huong", "p-anh", "p-khoa"],
    comments: [
      { id: "c4", author: "Minh Anh", text: "Đồi chè đẹp như tranh luôn.", date: "2022-12-03" },
    ],
  },
  {
    id: "mem-tet-2020",
    authorId: "p-nam",
    title: "Tết giữa phố, nhớ Tết quê",
    caption: "Cành đào nhỏ trong căn hộ Sài Gòn, đủ để thấy Tết về.",
    story:
      "Năm đó gia đình cậu Ba không về Bắc được. Một cành đào con con cũng khiến căn hộ ấm hẳn lên. Mọi người gọi video cho ông bà, màn hình nhòe vì ai cũng rưng rưng.",
    date: "2020-01-25",
    year: 2020,
    eventId: "tet",
    branchId: "cau-ba-sg",
    image: "https://images.unsplash.com/photo-1768836994489-53d17a43ba65?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    ratio: "3 / 4",
    peopleIds: ["p-nam", "p-khoa"],
    comments: [],
  },
  {
    id: "mem-ngaythuong-2023",
    authorId: "p-huong",
    title: "Bữa cơm chiều thứ Tư",
    caption: "Không dịp gì đặc biệt, chỉ là cả nhà lại đủ mặt.",
    story:
      "Một buổi chiều rất bình thường, mẹ nấu canh chua, bà kể chuyện ngày xưa. Những ngày thường như thế lại là điều chúng tôi nhớ nhất.",
    date: "2023-09-20",
    year: 2023,
    eventId: "ngay-thuong",
    branchId: "ngoai-hue",
    image: "https://images.unsplash.com/photo-1738411324196-b9a70184a34b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    ratio: "4 / 3",
    peopleIds: ["p-huong", "p-mai", "p-anh"],
    comments: [
      { id: "c5", author: "Bà Nội", text: "Canh chua con nấu ngày càng ngon.", date: "2023-09-21" },
    ],
  },
  {
    id: "mem-tet-2024",
    authorId: "p-anh",
    title: "Tết đoàn viên sau nhiều năm",
    caption: "Bốn thế hệ trong một khung hình, hiếm hoi và quý giá.",
    story:
      "Cuối cùng cả nhà cũng lại đủ mặt ở Hà Nội. Cụ bà tuy đã yếu nhưng vẫn ngồi giữa, tay nắm tay từng đứa cháu. Tấm ảnh này được in ra và treo ngay phòng khách.",
    date: "2024-02-10",
    year: 2024,
    eventId: "tet",
    branchId: "noi-hanoi",
    image: "https://images.unsplash.com/photo-1767604455862-ef31888f68fa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHw0fHx2aWV0bmFtZXNlJTIwZmFtaWx5JTIwcG9ydHJhaXR8ZW58MHx8fHwxNzg2MTg0MDMxfDA&ixlib=rb-4.1.0&q=85&w=1800",
    ratio: "3 / 2",
    peopleIds: ["p-long", "p-mai", "p-huong", "p-nam", "p-anh", "p-khoa"],
    featured: true,
    comments: [
      { id: "c6", author: "Cậu Ba", text: "Bức ảnh của cả một đời người.", date: "2024-02-11" },
      { id: "c7", author: "Minh Anh", text: "Con thương cả nhà mình nhiều lắm.", date: "2024-02-12" },
    ],
  },
];

export const albums = [
  { id: "al-tet", label: "Tết", count: 3, cover: memories.find((m) => m.id === "mem-tet-2024").image },
  { id: "al-sinhnhat", label: "Sinh nhật", count: 1, cover: memories.find((m) => m.id === "mem-sinhnhat-2012").image },
  { id: "al-cuoi", label: "Đám cưới", count: 1, cover: memories.find((m) => m.id === "mem-cuoi-2001").image },
  { id: "al-dulich", label: "Du lịch", count: 1, cover: memories.find((m) => m.id === "mem-dulich-2016").image },
];

export const chapters = [
  {
    no: "01",
    title: "Mỗi tấm ảnh là một cánh cửa",
    body: "Chúng tôi lưu giữ dữ liệu một cách có trách nhiệm — để những buổi chiều, mùi hương và tiếng cười tưởng đã quên vẫn có thể được tìm lại.",
  },
  {
    no: "02",
    title: "Kể lại, để không quên",
    body: "Bên dưới mỗi bức hình là một câu chuyện. Ông bà kể, con cháu ghi. Ký ức được truyền tay như một món gia bảo.",
  },
  {
    no: "03",
    title: "Một cuốn sách còn đang viết tiếp",
    body: "Kho ký ức này vẫn đang lớn lên mỗi ngày, với từng kỷ niệm mới mà mỗi thành viên gửi về.",
  },
];

export const eventById = (id) => events.find((e) => e.id === id);
export const personById = (id) => people.find((p) => p.id === id);
export const branchById = (id) => branches.find((b) => b.id === id);
export const memoryById = (id) => memories.find((m) => m.id === id);

// "Ngày này năm xưa" — memories sharing a month with today (fallback: featured set)
export const onThisDay = memories.filter((m) => ["mem-tet-1998", "mem-tet-2020", "mem-tet-2024"].includes(m.id));

// Timeline grouped by decade
export const decades = [
  { id: "1990s", label: "Thập niên 1990", from: 1990, to: 1999 },
  { id: "2000s", label: "Thập niên 2000", from: 2000, to: 2009 },
  { id: "2010s", label: "Thập niên 2010", from: 2010, to: 2019 },
  { id: "2020s", label: "Thập niên 2020", from: 2020, to: 2029 },
];

export const monthNamesVi = [
  "Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu",
  "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai",
];

export const formatViDate = (iso) => {
  const d = new Date(iso);
  return `Ngày ${d.getDate()}, ${monthNamesVi[d.getMonth()]} năm ${d.getFullYear()}`;
};
