export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="brand">
          <div className="logo" aria-hidden>
            👑
          </div>
          <div>
            <div className="title">BrotherX</div>
            <div
              className="subtitle"
              style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}
            >
              Nền tảng giao dịch chuyên nghiệp
            </div>
          </div>
        </div>

        <div className="links-grid">
          <div>
            <h4>Hỗ trợ</h4>
            <a href="#">Nghĩa vụ thành viên VIP</a>
            <a href="#">Chính sách bảo mật</a>
          </div>

          <div>
            <h4>Bảo mật</h4>
            <a href="#">Điều khoản và điều kiện</a>
            <a href="#">Cảnh báo rủi ro</a>
            <a href="#">Miễn trừ trách nhiệm</a>
          </div>

          <div>
            <h4>Liên hệ</h4>
            <a href="#">Hỗ trợ khách hàng</a>
            <a href="#">Chính sách</a>
          </div>
        </div>

        <div className="language-select">
          <select
            aria-label="language"
            defaultValue="vi"
            style={{
              background: "transparent",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "0.35rem 0.5rem",
              borderRadius: "0.375rem",
            }}
          >
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      <div className="footer-inner">
        <div className="disclaimer">
          Cảnh báo rủi ro: Giao dịch và đầu tư vào các tùy chọn kỹ thuật số có mức độ rủi ro đáng kể
          và không phù hợp với tất cả khách hàng. Vui lòng đảm bảo rằng bạn cân nhắc cẩn thận các
          mục tiêu đầu tư, mức độ kinh nghiệm và khả năng chịu lỗ trước khi quyết định đầu tư. Dữ
          liệu lịch sử không đảm bảo kết quả trong tương lai và không nên được xem là tư vấn đầu tư
          hoặc pháp lý.
        </div>
      </div>
    </footer>
  );
}
