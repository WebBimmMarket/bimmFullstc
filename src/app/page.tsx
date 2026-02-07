'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the app loader component to avoid static file issues
const BimmMarketApp = dynamic(() => import('@/components/BimmMarketApp'), {
  ssr: false,
  loading: () => null
});

export default function Home() {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Bimm Market - Top Up Robux & Gamepass</title>
        {/* Stage 6b: Preserve existing OG/SEO/favicon; add logo-based assets */}
        <link rel="icon" type="image/jpeg" href="https://res.cloudinary.com/dovx3ruli/image/upload/v1766445494/saabh3emgk1nfdlfqjom.jpg" />
        <link rel="apple-touch-icon" href="https://res.cloudinary.com/dovx3ruli/image/upload/v1766445494/saabh3emgk1nfdlfqjom.jpg" />
        <meta property="og:image" content="https://res.cloudinary.com/dovx3ruli/image/upload/v1766445494/saabh3emgk1nfdlfqjom.jpg" />
        <meta property="og:image:secure_url" content="https://res.cloudinary.com/dovx3ruli/image/upload/v1766445494/saabh3emgk1nfdlfqjom.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:image" content="https://res.cloudinary.com/dovx3ruli/image/upload/v1766445494/saabh3emgk1nfdlfqjom.jpg" />
        {/* ✅ GOOGLE SITE VERIFICATION */}
        <meta name="google-site-verification" content="-TQiultcDrQYvRTpYvlxVXIHXd4Eeq6GWQjIsj7Ddz0" />

        <meta name="theme-color" content="#050816" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://img1.pixhost.to" />
        <link rel="dns-prefetch" href="https://www.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />

        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='10' fill='%23050816'/%3E%3Cpath d='M14 18h36v10H14zM14 30h36v10H14zM14 42h36v10H14z' fill='%2300ff9c'/%3E%3C/svg%3E" />

        {/* SEO / AEO (Added Stage 6) */}
        <meta name="description" content="🎮 BIMM Market - Top Up Robux & Gamepass Roblox TERMURAH! ⚡ Proses 5-30 menit, Pembayaran QRIS, Dana, Transfer Bank. 1000+ transaksi sukses. Terpercaya & Aman 100%. Melayani Indonesia & Internasional." />
        <meta name="keywords" content="bimm market, top up robux, top up roblox, beli robux, robux murah, robux qris, top up robux indonesia, gamepass roblox, robux dana, robux gopay, top up roblox termurah, joki akun roblox, robux cepat, robux aman" />
        <meta name="author" content="Bimm Market" />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <meta name="language" content="id" />
        <meta name="publisher" content="Bimm Market" />
        <meta name="theme-color" content="#050816" />

        {/* Open Graph */}
        <meta property="og:site_name" content="BIMM Market" />
        <meta property="og:title" content="BIMM Market - Top Up Robux & Gamepass Roblox TERMURAH" />
        <meta property="og:description" content="🎮 Top Up Robux & Gamepass Roblox TERMURAH! ⚡ Proses 5-30 menit, QRIS, Dana, Transfer Bank. 1000+ transaksi sukses. Terpercaya & Aman 100%" />
        <meta property="og:url" content="https://bimm-market.vercel.app" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BIMM Market - Top Up Robux & Gamepass Roblox TERMURAH" />
        <meta name="twitter:description" content="🎮 Top Up Robux & Gamepass Roblox TERMURAH! ⚡ Proses 5-30 menit, QRIS, Dana, Transfer Bank. 1000+ transaksi sukses. Terpercaya & Aman 100%" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "name": "BIMM Market",
                  "url": "https://bimm-market.vercel.app",
                  "logo": "https://res.cloudinary.com/dovx3ruli/image/upload/v1766445494/saabh3emgk1nfdlfqjom.jpg",
                  "description": "BIMM Market adalah website top up Robux dan Gamepass Roblox terpercaya untuk Indonesia dan internasional. Mendukung pembayaran QRIS, Dana, Transfer Bank. Proses cepat, aman, dan realtime.",
                  "sameAs": [
                    "https://www.instagram.com/bimmmarket",
                    "https://www.tiktok.com/@bimmmarket"
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+62-895-4022-89397",
                    "contactType": "Customer Service",
                    "availableLanguage": ["Indonesian", "English"]
                  }
                },
                {
                  "@type": "WebSite",
                  "name": "BIMM Market",
                  "url": "https://bimm-market.vercel.app",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://bimm-market.vercel.app?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "Store",
                  "name": "BIMM Market",
                  "url": "https://bimm-market.vercel.app",
                  "description": "Top up Robux dan Gamepass Roblox TERMURAH dengan pembayaran QRIS, Dana, Transfer Bank untuk Indonesia & internasional.",
                  "paymentAccepted": "QRIS, Dana, GoPay, Transfer Bank",
                  "priceRange": "Rp 5.000 - Rp 5.000.000",
                  "openingHours": "Mo-Fr 08:00-22:00, Sa-Su 09:00-21:00"
                }
              ]
            })
          }}
        />
        <link rel="stylesheet" href="/api/style.css" />
      </head>

      <body>
        <section className="visually-hidden" aria-label="Informasi BIMM Market untuk mesin pencari">
          <h1>BIMM Market – Top Up Robux & Gamepass Roblox Termurah Indonesia</h1>
          <p>BIMM Market adalah platform top up Robux dan Gamepass Roblox terpercaya dan termurah untuk Indonesia dan internasional. Kami menyediakan layanan top up Robux dengan harga terjangkau, proses cepat 5-30 menit, dan mendukung berbagai metode pembayaran seperti QRIS, Dana, GoPay, OVO, dan Transfer Bank (BCA, Mandiri, BRI, BNI).</p>
          <p><strong>Kenapa memilih BIMM Market?</strong> Harga termurah, proses cepat dan aman, 1000+ transaksi sukses, customer service responsif 24/7, metode pembayaran lengkap (QRIS, E-Wallet, Transfer Bank), garansi 100% uang kembali jika order gagal.</p>
          <p><strong>Metode Pembayaran:</strong> QRIS (scan & bayar), Dana, GoPay, OVO, ShopeePay, LinkAja, Transfer Bank (BCA, Mandiri, BRI, BNI, Permata, CIMB Niaga).</p>
          <p><strong>Layanan Kami:</strong> Top Up Robux Roblox, Top Up Gamepass Roblox, Joki Akun Roblox, Jasa Push Rank Roblox. Melayani Indonesia dan internasional dengan dukungan checkout via website, WhatsApp, Telegram, dan Instagram.</p>
          <p><strong>Jam Operasional:</strong> Senin-Jumat 08:00-22:00 WIB, Sabtu-Minggu 09:00-21:00 WIB. Order di luar jam kerja akan diproses keesokan harinya.</p>
        </section>

        <header>
          <div className="header-row">
            <button className="icon-btn secondary" id="btnBurger" aria-label="Lainnya"><span className="burger"><i></i><i></i><i></i></span></button>
            <div className="brand">
              <img id="brandLogo" src="https://img1.pixhost.to/images/8496/638016816_jarroffc.jpg" alt="BIMM Market - Top Up Robux Termurah" />
              <div style={{ minWidth: '0' }}>
                <div className="title">BIMM MARKET</div>
                <div className="subtitle">Robux • Gamepass • Joki Akun</div>
              </div>
            </div>
            <button className="pixel-btn" id="btnLogin">Login</button>
            <div style={{ position: 'relative' }}>
              <button className="icon-btn" id="btnCart" aria-label="Keranjang">🛒</button>
              <span className="badge" id="cartCount">0</span>
            </div>
          </div>
        </header>

        {/* Drawer Menu */}
        <div className="drawer-backdrop" id="drawerBackdrop"></div>
        <aside className="drawer" id="drawer">
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <h3 style={{ margin: '10px 0' }}>Lainnya</h3>
            <button className="pixel-btn secondary" id="btnCloseDrawer">Tutup</button>
          </div>

          <div id="drawerStatic">
            <div className="pixel-card item" style={{ padding: '12px' }} id="btnOpenRanking">
              <div className="ico">🏅</div>
              <div className="txt">
                <div className="t">Daftar Peringkat</div>
                <div className="d">Lihat top customer</div>
              </div>
              <div className="tile-chev">›</div>
            </div>

            <div className="pixel-card item" style={{ padding: '12px' }} id="btnOpenContacts">
              <div className="ico">📌</div>
              <div className="txt">
                <div className="t">Daftar Kontak</div>
                <div className="d">Info & sosial</div>
              </div>
              <div className="tile-chev">›</div>
            </div>
          </div>

          <div id="contactsPanel" style={{ display: 'none', marginTop: '10px' }}>
            <div id="drawerContacts" className="small">Memuat...</div>
          </div>

          <hr className="sep" />

          <div className="small">BIMM Market © {new Date().getFullYear()}</div>
        </aside>


        {/* Toast & Loader */}
        <div className="pixel-card toast" id="toast" role="status"></div>
        <div className="pixel-card loader" id="loader" role="status">Memuat...</div>

        <main>
          {/* Home */}
          <section className="section active" id="secHome">

            {/* Announcement Banner Carousel */}
            <div className="announcement-banner hidden" id="annBanner">
              <div className="banner-slides" id="bannerSlides"></div>
              <button className="banner-nav prev" id="bannerPrev" aria-label="Previous">‹</button>
              <button className="banner-nav next" id="bannerNext" aria-label="Next">›</button>
              <div className="banner-dots" id="bannerDots"></div>
            </div>

            {/* Welcome Card */}
            <div className="pixel-card tile" style={{ padding: '16px', marginBottom: '16px' }}>
              <div className="tile-title">🎮 Welcome to BIMM Market</div>
              <div className="small">Platform Top Up Robux & Gamepass TERMURAH ⚡ Proses 5-30 Menit | QRIS, Dana, Transfer Bank</div>
            </div>

            {/* Stats Counter */}
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number" id="statProducts">0</span>
                <span className="stat-label">Produk</span>
              </div>
              <div className="stat-card">
                <span className="stat-number" id="statCategories">0</span>
                <span className="stat-label">Kategori</span>
              </div>
              <div className="stat-card">
                <span className="stat-number" id="statOrders">0</span>
                <span className="stat-label">Transaksi</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <div className="action-card" id="quickCheckOrder">
                <div className="action-icon">📋</div>
                <div className="action-text">
                  <div className="action-title">Cek Pesanan</div>
                  <div className="action-desc">Lihat status order Anda</div>
                </div>
              </div>
              <div className="action-card" id="quickTopUp">
                <div className="action-icon">⚡</div>
                <div className="action-text">
                  <div className="action-title">Top Up Cepat</div>
                  <div className="action-desc">Beli produk favorit</div>
                </div>
              </div>
            </div>

            {/* Transaksi Terakhir (Horizontal Carousel) */}
            <div className="section-header" style={{ marginTop: '20px' }}>
              <div className="section-title">Transaksi Terakhir</div>
              <button className="view-all-btn" id="btnViewAllTransactions">Lihat Semua →</button>
            </div>
            <div className="recent-transactions-carousel">
              <div className="recent-tx-slides" id="recentTxSlides">
                {/* Loading skeleton */}
                <div className="recent-tx-card skeleton" style={{ minWidth: '280px', height: '140px' }}></div>
                <div className="recent-tx-card skeleton" style={{ minWidth: '280px', height: '140px' }}></div>
                <div className="recent-tx-card skeleton" style={{ minWidth: '280px', height: '140px' }}></div>
              </div>
              <button className="tx-nav prev" id="txPrev" aria-label="Previous">‹</button>
              <button className="tx-nav next" id="txNext" aria-label="Next">›</button>
              <div className="tx-dots" id="txDots"></div>
            </div>

            {/* Popular Products */}
            <div className="section-header">
              <div className="section-title">Produk Populer</div>
              <button className="view-all-btn" id="viewAllProducts">Lihat Semua →</button>
            </div>
            <div className="popular-products-grid" id="popularProductsGrid">
              {/* Loading skeleton */}
              <div className="mini-product-card skeleton" style={{ height: '200px' }}></div>
              <div className="mini-product-card skeleton" style={{ height: '200px' }}></div>
              <div className="mini-product-card skeleton" style={{ height: '200px' }}></div>
            </div>

            {/* Popular Categories */}
            <div className="section-header">
              <div className="section-title">Kategori Populer</div>
              <button className="view-all-btn" id="viewAllCategories">Lihat Semua →</button>
            </div>
            <div className="popular-categories-grid" id="popularCategoriesGrid">
              {/* Loading skeleton */}
              <div className="mini-cat-card skeleton" style={{ height: '140px' }}></div>
              <div className="mini-cat-card skeleton" style={{ height: '140px' }}></div>
              <div className="mini-cat-card skeleton" style={{ height: '140px' }}></div>
            </div>
            <div className="footer">© <span id="yearNow">{new Date().getFullYear()}</span> BIMM Market — Platform Top Up Robux & Gamepass Terpercaya Indonesia</div>
          </section>

          {/* Produk */}
          <section className="section" id="secProduk">
            <div className="pixel-card tile">
              <div className="tile-title">Produk</div>
              <div className="small">Navigasi bertingkat: Kategori → Sub Kategori → Produk</div>

              <div className="search-bar">
                <input className="search-input" id="searchInput" placeholder="Cari kategori / sub / produk..." />
                <select className="select" id="sortSelect">
                  <option value="popular">Terpopuler</option>
                  <option value="price_asc">Harga termurah</option>
                  <option value="price_desc">Harga termahal</option>
                  <option value="name_asc">Nama A-Z</option>
                  <option value="name_desc">Nama Z-A</option>
                </select>
              </div>

              <div className="breadcrumb" id="breadcrumb"></div>

              <div id="levelWrap" className="list"></div>
            </div>

            <div className="footer">© <span className="yearNow2">{new Date().getFullYear()}</span> BIMM Market</div>
          </section>

          {/* Transaksi */}
          <section className="section" id="secTransaksi">
            <div className="pixel-card tile">
              <div className="tile-title">Transaksi</div>
              <div className="small">Status order berubah realtime dari admin. Ketuk pesanan untuk detail.</div>
              <div id="txList" className="list"></div>
            </div>
          </section>

          {/* Profil */}
          <section className="section" id="secProfil">
            <div className="pixel-card tile">
              <div className="tile-title">Profil</div>
              <div id="profileBox" className="small">Belum login.</div>
              <div id="profileEditor" style={{ display: 'none', marginTop: '12px' }}>
                <div className="small" style={{ color: 'var(--muted)', marginBottom: '6px' }}>Ubah Nama & Foto Profil</div>
                <div className="row" style={{ gap: '10px', flexWrap: 'wrap' }}>
                  <input className="input" id="pfName" placeholder="Nama tampilan" style={{ flex: 1, minWidth: '180px' }} />
                  <input className="input" id="pfPhoto" placeholder="URL Foto (pfp)" style={{ flex: 1, minWidth: '180px' }} />
                </div>
                <div style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button className="pixel-btn yellow" id="btnSaveProfile">Simpan Profil</button>
                </div>
              </div>
              {/* ✅ PERBAIKAN: Tombol ganti password + verifikasi disembunyikan default */}
              <div style={{ marginTop: '12px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button className="pixel-btn secondary" id="btnVerifyResend" style={{ display: 'none' }}>Kirim ulang verifikasi</button>
                <button className="pixel-btn secondary" id="btnResetPassProfile" style={{ display: 'none' }}>Ganti Password</button>
                <button className="pixel-btn danger" id="btnLogout">Logout</button>
              </div>
            </div>
          </section>

          {/* Tab Pengaturan (Informasi Publik) */}
          <section className="section" id="secPengaturan">
            <div className="pixel-card tile">
              <div className="tile-title">⚙️ Informasi & Pengaturan</div>
              <div className="small" style={{ marginBottom: '15px' }}>Panduan lengkap seputar BYS Mart</div>

              {/* Tentang Kami */}
              <div className="info-section">
                <div className="info-header">🏪 Tentang BIMM Market</div>
                <div className="info-content">
                  <p className="small">
                    BIMM Market adalah platform top up Robux dan Gamepass Roblox TERMURAH dan terpercaya untuk Indonesia dan internasional.
                    Kami menyediakan layanan cepat (5-30 menit), aman, dan mendukung berbagai metode pembayaran termasuk QRIS, Dana, GoPay, dan Transfer Bank.
                  </p>

                  <div className="info-stats">
                    <div className="stat-mini">
                      <span className="stat-num">1000+</span>
                      <span className="stat-label">Transaksi</span>
                    </div>
                    <div className="stat-mini">
                      <span className="stat-num">500+</span>
                      <span className="stat-label">Customer</span>
                    </div>
                    <div className="stat-mini">
                      <span className="stat-num">24/7</span>
                      <span className="stat-label">Support</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Jam Operasional */}
              <div className="info-section">
                <div className="info-header">⏰ Jam Operasional</div>
                <div className="info-content">
                  <div className="schedule-item">
                    <span className="day">Senin - Jumat</span>
                    <span className="time">08:00 - 22:00 WIB</span>
                  </div>
                  <div className="schedule-item">
                    <span className="day">Sabtu - Minggu</span>
                    <span className="time">09:00 - 21:00 WIB</span>
                  </div>
                  <div className="hint" style={{ marginTop: '8px', textAlign: 'center' }}>
                    ⚡ Order di luar jam kerja akan diproses keesokan harinya
                  </div>
                </div>
              </div>

              {/* Cara Pemesanan */}
              <div className="info-section">
                <div className="info-header">📦 Cara Pemesanan</div>
                <div className="info-content">
                  <div className="step-list">
                    <div className="step-item">
                      <span className="step-num">1</span>
                      <div className="step-text">
                        <div className="step-title">Pilih Produk</div>
                        <div className="step-desc">Browse kategori dan pilih produk yang diinginkan</div>
                      </div>
                    </div>

                    <div className="step-item">
                      <span className="step-num">2</span>
                      <div className="step-text">
                        <div className="step-title">Tambah ke Keranjang</div>
                        <div className="step-desc">Klik tombol "Tambah" atau langsung "Checkout"</div>
                      </div>
                    </div>

                    <div className="step-item">
                      <span className="step-num">3</span>
                      <div className="step-text">
                        <div className="step-title">Isi Data & Bayar</div>
                        <div className="step-desc">Lengkapi form dan lakukan pembayaran</div>
                      </div>
                    </div>

                    <div className="step-item">
                      <span className="step-num">4</span>
                      <div className="step-text">
                        <div className="step-title">Upload Bukti</div>
                        <div className="step-desc">Kirim bukti transfer melalui form checkout</div>
                      </div>
                    </div>

                    <div className="step-item">
                      <span className="step-num">5</span>
                      <div className="step-text">
                        <div className="step-title">Tunggu Proses</div>
                        <div className="step-desc">Admin akan memproses dalam 5-30 menit</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metode Pembayaran */}
              <div className="info-section">
                <div className="info-header">💳 Metode Pembayaran</div>
                <div className="info-content">
                  <div className="payment-grid">
                    <div className="payment-item">
                      <div className="payment-icon">📱</div>
                      <div className="payment-name">QRIS</div>
                    </div>
                    <div className="payment-item">
                      <div className="payment-icon">🏦</div>
                      <div className="payment-name">Transfer Bank</div>
                    </div>
                    <div className="payment-item">
                      <div className="payment-icon">💳</div>
                      <div className="payment-name">E-Wallet</div>
                    </div>
                    <div className="payment-item">
                      <div className="payment-icon">💰</div>
                      <div className="payment-name">Dana</div>
                    </div>
                  </div>
                  <div className="hint" style={{ marginTop: '10px', textAlign: 'center' }}>
                    💡 Metode lengkap akan ditampilkan saat checkout
                  </div>
                </div>
              </div>

              {/* FAQ Cepat */}
              <div className="info-section">
                <div className="info-header">❓ FAQ (Pertanyaan Umum)</div>
                <div className="info-content">
                  <div className="faq-item">
                    <div className="faq-q">Apakah BYS Mart aman?</div>
                    <div className="faq-a">Ya, kami terpercaya dengan 1000+ transaksi sukses. Semua order diproses manual oleh admin.</div>
                  </div>

                  <div className="faq-item">
                    <div className="faq-q">Berapa lama proses order?</div>
                    <div className="faq-a">Biasanya 5-30 menit setelah pembayaran dikonfirmasi (dalam jam operasional).</div>
                  </div>

                  <div className="faq-item">
                    <div className="faq-q">Apakah bisa refund jika gagal?</div>
                    <div className="faq-a">Bisa! Jika order tidak dapat diproses, dana akan dikembalikan 100%.</div>
                  </div>

                  <div className="faq-item">
                    <div className="faq-q">Apakah melayani internasional?</div>
                    <div className="faq-a">Ya, kami melayani pembeli dari seluruh dunia dengan metode pembayaran yang tersedia.</div>
                  </div>
                </div>
              </div>

              {/* Kontak Admin */}
              <div className="info-section">
                <div className="info-header">📞 Hubungi Kami</div>
                <div className="info-content">
                  <div id="contactButtons" className="contact-grid">
                    <p className="small" style={{ textAlign: 'center' }}>Memuat kontak...</p>
                  </div>
                </div>
              </div>

              {/* Kebijakan */}
              <div className="info-section">
                <div className="info-header">📜 Kebijakan & Syarat</div>
                <div className="info-content">
                  <button className="pixel-btn secondary" style={{ width: '100%', marginBottom: '10px' }} id="btnTOS">
                    📄 Syarat & Ketentuan
                  </button>
                  <button className="pixel-btn secondary" style={{ width: '100%', marginBottom: '10px' }} id="btnPrivacy">
                    🔒 Kebijakan Privasi
                  </button>
                  <button className="pixel-btn secondary" style={{ width: '100%' }} id="btnRefund">
                    💰 Kebijakan Pengembalian Dana
                  </button>
                </div>
              </div>

              {/* Bantuan */}
              <div className="info-section">
                <div className="info-header">💬 Bantuan & Dukungan</div>
                <div className="info-content">
                  <button className="pixel-btn yellow" style={{ width: '100%', marginBottom: '10px' }} id="btnReportIssue">
                    🐛 Laporkan Masalah
                  </button>
                  <button className="pixel-btn" style={{ width: '100%' }} id="btnFeedback">
                    💡 Kirim Saran/Feedback
                  </button>
                </div>
              </div>

              {/* Footer Info */}
              <div className="info-footer">
                <div className="small" style={{ textAlign: 'center', color: 'var(--muted)', marginTop: '20px' }}>
                  © <span id="yearFooter">{new Date().getFullYear()}</span> BIMM Market<br />
                  Platform Top Up Robux & Gamepass TERMURAH di Indonesia<br />
                  <span style={{ color: 'var(--neon)' }}>⚡ Proses 5-30 Menit | QRIS, Dana, Transfer Bank</span>
                </div>
              </div>

            </div>
          </section>
        </main>

        {/* Cart Drawer / Modal */}
        <div className="modal-backdrop" id="cartModal">
          <div className="pixel-card modal">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <h3>Keranjang</h3>
              <button className="pixel-btn secondary" id="btnCloseCart">Tutup</button>
            </div>
            <div id="cartItems" className="list"></div>
            <hr className="sep" />
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <div className="small">Total</div>
              <div className="price" id="cartTotal">Rp 0</div>
            </div>
            <div style={{ marginTop: '12px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button className="pixel-btn yellow" id="btnCheckout">Checkout</button>
              <button className="pixel-btn danger" id="btnClearCart">Hapus</button>
            </div>
          </div>
        </div>

        {/* Checkout Modal */}
        <div className="modal-backdrop" id="checkoutModal">
          <div className="pixel-card modal">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <h3>Checkout</h3>
              <button className="pixel-btn secondary" id="btnCloseCheckout">Tutup</button>
            </div>

            <div className="small" id="checkoutNote">Login & verifikasi email diperlukan untuk checkout.</div>

            <hr className="sep" />

            <div className="row">
              <input className="input" id="coName" placeholder="Nama (opsional)" />
            </div>
            <div className="row" style={{ marginTop: '10px' }}>
              <input className="input" id="coEmail" placeholder="Email aktif" />
            </div>
            <div className="row" style={{ marginTop: '10px' }}>
              <input className="input" id="coWA" placeholder="Nomor WA (contoh: 6289... tanpa +)" />
            </div>

            {/* ✅ FIELD BARU: Catatan Opsional */}
            <div className="row" style={{ marginTop: '10px' }}>
              <textarea
                className="input"
                id="coNotes"
                placeholder="Catatan untuk admin (opsional)&#10;Contoh: Mohon diproses cepat, butuh untuk event hari ini"
                rows="3"
                style={{ resize: 'vertical', minHeight: '60px', maxHeight: '120px', fontSize: '11px', lineHeight: '1.4' }}
              ></textarea>
            </div>
            <div className="hint" style={{ marginTop: '4px', color: 'var(--muted)' }}>
              💡 Tuliskan permintaan khusus atau catatan untuk admin di sini
            </div>

            <div className="row" style={{ marginTop: '10px' }}>
              <select className="input" id="coPayMethod"></select>
            </div>
            <div id="payDetail" className="pixel-card" style={{ marginTop: '10px', padding: '12px', display: 'none' }}>
              <div className="small" style={{ marginBottom: '6px', color: 'var(--muted)' }}>Detail Pembayaran</div>
              <div id="payDetailText" className="small"></div>
              <div id="payDetailActions" style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}></div>
              <img id="payDetailQris" alt="QRIS" style={{ marginTop: '12px', width: '100%', maxWidth: '420px', borderRadius: '14px', border: '2px solid rgba(0,229,255,.2)', display: 'none' }} />
            </div>

            <div style={{ marginTop: '10px' }}>
              <div className="small">Upload bukti pembayaran (gambar, max 10MB)</div>
              <input className="file" id="coProof" type="file" accept="image/*" />
              <div className="hint" id="coProofHint"></div>
              <div style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button className="pixel-btn secondary" id="btnUploadProof" type="button">Upload Bukti</button>
                <div className="small" id="proofStatus" style={{ color: 'var(--muted)' }}></div>
              </div>
              <input type="hidden" id="coProofUrl" value="" />

            </div>

            <div style={{ marginTop: '12px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button className="pixel-btn yellow" id="btnSubmitOrder" style={{ width: '100%' }}>Kirim Order</button>
            </div>
          </div>
        </div>

        {/* Login Modal */}
        <div className="modal-backdrop" id="loginModal">
          <div className="pixel-card modal">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <h3>Login / Daftar</h3>
              <button className="pixel-btn secondary" id="btnCloseLogin">Tutup</button>
            </div>

            <div className="small" style={{ marginTop: '10px', color: 'var(--muted)', textAlign: 'center' }}>
              Silakan login menggunakan akun Google Anda untuk melanjutkan.
            </div>

            <div className="row" style={{ marginTop: '20px', justifyContent: 'center' }}>
              <button className="pixel-btn yellow" id="btnGoogleAuth" style={{ width: '100%', maxWidth: '280px', padding: '14px' }}>
                <span style={{ fontSize: '16px', marginRight: '8px' }}>🔐</span>
                Login dengan Google
              </button>
            </div>

            <div className="small" id="authMsg" style={{ marginTop: '12px', color: 'var(--muted)', textAlign: 'center' }}></div>
          </div>
        </div>

        {/* Announcement Popup */}
        <div className="modal-backdrop" id="annModal">
          <div className="pixel-card modal">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <h3 id="annTitle">Pengumuman</h3>
              <button className="pixel-btn secondary" id="btnCloseAnn">Tutup</button>
            </div>
            <div className="small" id="annBody" style={{ marginTop: '10px' }}></div>
            <img id="annImg" alt="" style={{ marginTop: '12px', borderRadius: '14px', border: '2px solid rgba(0,229,255,.2)', display: 'none' }} />
          </div>
        </div>

        {/* Ranking Popup */}
        <div className="modal-backdrop" id="rankModal">
          <div className="pixel-card modal">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <h3>Peringkat</h3>
              <button className="pixel-btn secondary" id="btnCloseRank">Tutup</button>
            </div>
            <div id="rankList" className="list" style={{ marginTop: '10px' }}></div>
          </div>
        </div>

        {/* Transaction Detail Modal */}
        <div className="modal-backdrop" id="txDetailModal">
          <div className="pixel-card modal">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <h3>Detail Pesanan</h3>
              <button className="pixel-btn secondary" id="btnCloseTxDetail">Tutup</button>
            </div>

            <div id="txDetailContent" style={{ marginTop: '10px' }}>
              {/* Content injected via JS */}
            </div>
          </div>
        </div>

        <nav className="bottom-nav" aria-label="Navigasi bawah">
          <button className="active" data-tab="home"><span className="ic">🏠</span>Home</button>
          <button data-tab="produk"><span className="ic">📦</span>Produk</button>
          <button data-tab="transaksi"><span className="ic">🧾</span>Transaksi</button>
          <button data-tab="profil"><span className="ic">👤</span>Profil</button>
          <button data-tab="pengaturan"><span className="ic">⚙️</span>Pengaturan</button>
        </nav>

        {/* Zoom Modal */}
        <div className="modal-backdrop" id="zoomModal">
          <div className="pixel-card modal">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <h3>Preview</h3>
              <button className="pixel-btn secondary" id="btnCloseZoom">Tutup</button>
            </div>
            <div className="zoom-wrap">
              <img id="zoomImg" src="" alt="Zoom" />
            </div>
          </div>
        </div>

        {/* Load the JavaScript application */}
        <BimmMarketApp />
      </body>
    </>
  );
}
