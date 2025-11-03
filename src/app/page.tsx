export default function Home() {
  return (
    <div className="home-root">
      {/* Hero */}
      <section className="hero-section relative overflow-hidden">
        <div className="hero-pattern absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-24 lg:pt-28 lg:pb-28">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-white">
            It&apos;s <span className="accent-text">simple</span> to become a pro
            <br className="hidden md:block" /> trader on BrotherX
          </h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-white/70">
            Tại BrotherX, chúng tôi cố gắng làm cho quá trình giao dịch trở nên đơn giản nhất có thể
            để bất kỳ ai, bất kể kinh nghiệm thế nào, đều có thể bắt đầu kiếm tiền.
          </p>
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <a href="/register" className="btn-accent">
              Bắt đầu miễn phí
            </a>
            <a href="/trading" className="btn-outline">
              Giao dịch trực tiếp
            </a>
          </div>
          <div className="mt-14 flex items-center gap-8 opacity-80 logos-row">
            <span className="partner-logo">tether</span>
            <span className="partner-logo">BINANCE</span>
            <span className="partner-logo">bitcoin</span>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center">
          <p className="text-sm tracking-widest uppercase text-foreground/60">BrotherX</p>
          <h2 className="mt-2 text-3xl md:text-5xl font-extrabold">
            Nền tảng được xây dựng <span className="accent-text">Trên sự đột phá</span>
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="feature-card">
            <div className="feature-icon">⚖️</div>
            <h3 className="feature-title">Ổn định & An toàn</h3>
            <p className="feature-text">
              Nền tảng của chúng tôi rất ổn định và có thể truy cập trên mọi nơi trên thế giới.
              Chúng tôi bảo vệ tài sản của bạn bằng các biện pháp bảo mật tốt nhất.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💸</div>
            <h3 className="feature-title">Giới thiệu & Kiếm tiền</h3>
            <p className="feature-text">
              Giới thiệu cho bạn bè và phát triển cùng nhau tại BrotherX.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Nhanh chóng & miễn phí</h3>
            <p className="feature-text">
              Gửi tiền miễn phí và phí rút tiền thấp. Giao dịch hoàn tất trong vòng vài phút.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-center text-3xl md:text-5xl font-extrabold">
          Bắt đầu sau <span className="accent-text">5 phút</span>
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="step-card">
            <div className="step-badge bg-purple-600">1</div>
            <h3 className="step-title">Đăng ký</h3>
            <p className="step-text">
              Sử dụng địa chỉ email của bạn và tạo một tài khoản miễn phí.
            </p>
          </div>
          <div className="step-card">
            <div className="step-badge bg-rose-500">2</div>
            <h3 className="step-title">Ký quỹ</h3>
            <p className="step-text">Nạp bằng nhiều loại tiền điện tử phổ biến.</p>
          </div>
          <div className="step-card">
            <div className="step-badge bg-emerald-500">3</div>
            <h3 className="step-title">Bắt đầu giao dịch</h3>
            <p className="step-text">Kiếm tiền từ việc dự đoán đúng giá của tài sản.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold">
          <span className="accent-text">Mọi nơi</span> bạn muốn.
          <br />
          <span className="accent-text">Mọi lúc</span> bạn cần.
        </h2>
        <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
          Mọi người đều có thể kiếm thu nhập bền vững với BrotherX.
        </p>
        <div className="mt-8">
          <a href="/register" className="btn-accent">
            Bắt đầu miễn phí
          </a>
        </div>
      </section>
    </div>
  );
}
