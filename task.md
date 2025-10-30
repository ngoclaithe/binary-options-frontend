Task List — Binary Options Frontend

Mục tiêu: triển khai frontend cho hệ thống Binary Options (Next.js + TypeScript). Hỗ trợ 2 role: user và admin. Ứng dụng giao tiếp với backend và WebSocket theo schema đã cung cấp.

Tổng quan kỹ thuật

Framework: Next.js (App Router)

Language: TypeScript

Styling: TailwindCSS

State management: Zustand

Realtime: Socket.IO (giá realtime, cập nhật orders, notifications)

Charts: Recharts hoặc tương tự

HTTP client: fetch / axios + interceptor

Testing: Vitest + React Testing Library

CI/CD: GitHub Actions + Vercel

Realtime Price Feed mô tả chi tiết

Khi frontend kết nối đến endpoint Socket.IO của backend, dữ liệu giá được stream theo cấu trúc sau.

Code mẫu frontend:
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
  console.log("✅ Connected, id:", socket.id);
  const symbols = ["BTCUSDT", "ETHUSDT"];
  socket.emit("subscribe", { symbols });
  console.log(`📩 Subscribed: ${symbols.join(", ")}`);
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

Response thực tế mẫu
{
  "symbol": "BTCUSDT",
  "minuteTimestamp": 1761815820000,
  "minuteTime": "2025-10-30T09:17:00.000Z",
  "summary": {
    "open": 110438.53,
    "high": 110482.07782205,
    "low": 110347.87671028,
    "close": 110390.09755739,
    "volume": 0.38228461
  },
  "secondsData": [
    {
      "second": 0,
      "timestamp": 1761815820259,
      "time": "2025-10-30T09:17:00.259Z",
      "price": 110445.29083111187,
      "open": 110438.53,
      "high": 110445.99154052959,
      "low": 110436.84643475925,
      "close": 110445.29083111187,
      "volume": 0.008301797365134773
    },
    {
      "second": 1,
      "timestamp": 1761815821259,
      "time": "2025-10-30T09:17:01.259Z",
      "price": 110428.613717716,
      "open": 110416.10563335574,
      "high": 110429.67018490874,
      "low": 110414.61831205043,
      "close": 110428.613717716,
      "volume": 0.007638525579128543
    }
  ]
}

Mô tả trường dữ liệu
Trường	Kiểu	Mô tả
symbol	string	Mã tài sản (ví dụ BTCUSDT)
minuteTimestamp	number	Epoch ms của phút hiện tại
minuteTime	string (ISO)	Thời điểm minute candle
summary	object	Tổng hợp giá mở, cao, thấp, đóng, khối lượng của phút đó
secondsData	array	Dữ liệu từng giây trong phút, phục vụ vẽ biểu đồ realtime
secondsData[n].timestamp	number	Epoch ms của tick
secondsData[n].price	number	Giá tại giây đó
secondsData[n].volume	number	Khối lượng giao dịch tại giây
Cách sử dụng frontend

Sau khi nhận sự kiện price-update, frontend cập nhật vào store useAssets hoặc useTrade.

Dữ liệu summary dùng để cập nhật candle 1 phút.

Dữ liệu secondsData có thể render biểu đồ tick chart / line chart realtime.

Lưu ý khi triển khai

Giữ socket kết nối bền vững (retry với exponential backoff)

Dọn dẹp listener khi unmount component

Cập nhật state cục bộ tối ưu (chỉ update symbol đang xem)

Các phần khác (Auth, UI, Admin, Tests, CI/CD)
Auth

Đăng ký / đăng nhập (JWT)

Middleware bảo vệ route theo role

Lưu token bằng cookie httpOnly hoặc localStorage + refresh flow

User

Dashboard hiển thị danh sách assets và giá realtime

Trade page có Chart, TradePanel (đặt lệnh, chọn direction, duration)

Wallet page (balance, lịch sử)

History page (positions, thống kê winrate)

Thông báo kết quả realtime

Admin

CRUD Assets (symbol, min/max, profitPercentage…)

Quản lý Users, Orders

Thống kê hệ thống (volume, profit/loss)

CI/CD

GitHub Actions: lint → test → build → deploy (Vercel)

Env: NEXT_PUBLIC_API_BASE, NEXT_PUBLIC_WS_URL

Validation & UX

Kiểm tra min/max trade amount

Disable trade nếu asset không khả dụng

Skeleton loading / modal xác nhận

Tests

Unit: TradePanel, AssetCard

Integration: order flow (msw)

Snapshot: chart container

Tasks phân bước (Issue-ready)

Setup repo, ESLint, Prettier, Vitest

Auth flow (login/register)

Assets list + price realtime (WebSocket)

Trade page + Chart + validation

Order flow (POST /api/orders + realtime status)

Wallet & History page

Admin CRUD + dashboard

Tests + deploy

Checklist trước deliver

 Responsive hoàn chỉnh

 Realtime ổn định khi reconnect

 Error handling đầy đủ

 Tests pass

 Env variables rõ ràng

Ghi chú

Nếu backend cung cấp secondsData, nên render chart realtime từng giây.

Sử dụng decimal.js hoặc BigNumber để tính toán số tiền.

Kết quả thắng/thua chỉ hiển thị, không tính toán trên frontend.