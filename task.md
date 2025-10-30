# 🧭 Binary Options Frontend — Task Specification

## 🎯 Mục tiêu
Triển khai frontend cho hệ thống **Binary Options** bằng **Next.js + TypeScript**, hỗ trợ 2 vai trò:
- **User**: giao dịch, xem chart, quản lý ví
- **Admin**: quản lý tài sản, người dùng, thống kê

---

## ⚙️ Tổng quan kỹ thuật
- Framework: **Next.js (App Router)**
- Ngôn ngữ: **TypeScript**
- Styling: **TailwindCSS**
- State: **Zustand**
- Realtime: **Socket.IO**
- Chart: **Recharts**
- HTTP: **axios / fetch + interceptor**
- Test: **Vitest + React Testing Library**
- CI/CD: **GitHub Actions → Vercel**

---

## 🔌 Realtime Price Feed

### Mẫu kết nối frontend
```ts
import socketIOClient from "socket.io-client";

const SERVER_URL = "http://localhost:3001/price-feed";

interface PriceData {
  symbol: string;
  minuteTimestamp: number;
  minuteTime: string;
  summary: {
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  };
  secondsData: Array<{
    second: number;
    timestamp: number;
    time: string;
    price: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }>;
}

const socket = socketIOClient(SERVER_URL, { transports: ["websocket"] });

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);
  socket.emit("subscribe", { symbols: ["BTCUSDT", "ETHUSDT"] });
});

socket.on("price-update", (data: PriceData) => {
  console.log("📈 Price update:", data);
});

socket.on("disconnect", (reason) => {
  console.log("❌ Disconnected:", reason);
});

socket.on("connect_error", (err: any) => {
  console.error("⚠️ Connection error:", err.message);
});
```

---

### Mẫu dữ liệu thực tế
```json
{
  "symbol": "BTCUSDT",
  "minuteTimestamp": 1761815820000,
  "minuteTime": "2025-10-30T09:17:00.000Z",
  "summary": {
    "open": 110438.53,
    "high": 110482.08,
    "low": 110347.87,
    "close": 110390.09,
    "volume": 0.382
  },
  "secondsData": [
    {
      "second": 0,
      "timestamp": 1761815820259,
      "time": "2025-10-30T09:17:00.259Z",
      "price": 110445.29,
      "open": 110438.53,
      "high": 110445.99,
      "low": 110436.84,
      "close": 110445.29,
      "volume": 0.0083
    }
  ]
}
```

---

### Bảng mô tả dữ liệu

| Trường | Kiểu | Mô tả |
|--------|------|-------|
| `symbol` | `string` | Mã tài sản (VD: BTCUSDT) |
| `minuteTimestamp` | `number` | Epoch ms của phút hiện tại |
| `minuteTime` | `string` | ISO time của candle phút |
| `summary` | `object` | Giá mở, cao, thấp, đóng, volume |
| `secondsData` | `array` | Từng tick giá theo giây |
| `price` | `number` | Giá tại thời điểm đó |
| `volume` | `number` | Khối lượng tại tick đó |

---

### Cách dùng trong frontend
- Lưu realtime data vào `useAssets` store (Zustand)
- Render biểu đồ tick chart từ `secondsData`
- Dùng `summary` để cập nhật candle 1 phút

---

## ⚠️ Lưu ý triển khai
- Retry socket với exponential backoff  
- Cleanup listener khi component unmount  
- Chỉ update symbol đang xem để tối ưu hiệu năng  

---

## 🔐 Auth Flow
- Đăng ký / đăng nhập bằng JWT  
- Middleware bảo vệ route theo vai trò  
- Lưu token trong cookie httpOnly (ưu tiên) hoặc localStorage  

---

## 👤 User Features
- **Dashboard**: danh sách tài sản + giá realtime  
- **Trade Page**: chart, đặt lệnh, chọn hướng & thời gian  
- **Wallet**: số dư, lịch sử giao dịch  
- **History**: thống kê kết quả  

---

## 🛠️ Admin Features
- CRUD Assets (symbol, profit rate, v.v.)
- Quản lý Users & Orders
- Dashboard thống kê volume, P/L

---

## 🧪 Testing & CI/CD
- Unit test: `TradePanel`, `AssetCard`
- Integration test: order flow (mock bằng msw)
- Snapshot: `ChartContainer`
- CI/CD: GitHub Actions → lint + test + build → Vercel

---

## ✅ Task Breakdown (Issue-ready)
1. Setup repo, ESLint, Prettier, Vitest  
2. Auth flow (login/register)  
3. Assets list + price realtime (socket)  
4. Trade page + chart + validation  
5. Order flow (REST + realtime update)  
6. Wallet & History page  
7. Admin CRUD + dashboard  
8. Tests + deploy  

---

## ☑️ Checklist Deliver
- [ ] Responsive hoàn chỉnh  
- [ ] Socket reconnect ổn định  
- [ ] Error handling đầy đủ  
- [ ] Tests pass  
- [ ] Env rõ ràng (`NEXT_PUBLIC_API_BASE`, `NEXT_PUBLIC_WS_URL`)  

---

## 📝 Notes
- Sử dụng `decimal.js` để tránh lỗi số thực  
- Không tính thắng/thua ở frontend  
- Có thể thêm `useAssets` store mẫu để cập nhật realtime
