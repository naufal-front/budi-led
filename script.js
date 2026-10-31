// =========================================
// BUDI LED — WEBSITE INTERACTIONS
// =========================================


// =========================================
// ELEMENT SELECTORS
// =========================================

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const backToTop = document.querySelector(".back-to-top");
const header = document.querySelector(".site-header");


// =========================================
// DARK MODE & LIGHT MODE
// =========================================

const themeToggle = document.querySelector("#theme-toggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');

const savedTheme = localStorage.getItem("budi-led-theme");

const systemPrefersLight = window.matchMedia(
  "(prefers-color-scheme: light)"
).matches;

// Prioritas:
// 1. Tema pilihan manual yang tersimpan.
// 2. Preferensi tema perangkat jika belum pernah memilih.

const initialTheme =
  savedTheme || (systemPrefersLight ? "light" : "dark");


// Terapkan tema
function applyTheme(theme) {

  const isLight = theme === "light";

  document.body.classList.toggle("light-mode", isLight);

  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Aktifkan mode gelap" : "Aktifkan mode terang"
    );

    themeToggle.setAttribute(
      "aria-pressed",
      String(isLight)
    );
  }

  // Sesuaikan warna browser mobile
  if (themeMeta) {
    themeMeta.setAttribute(
      "content",
      isLight ? "#f3f3f0" : "#142337"
    );
  }

}


// Terapkan tema awal
applyTheme(initialTheme);


// Tombol pergantian tema
themeToggle?.addEventListener("click", () => {

  const isCurrentlyLight =
    document.body.classList.contains("light-mode");

  const newTheme = isCurrentlyLight ? "dark" : "light";

  applyTheme(newTheme);

  // Simpan pilihan manual pengunjung
  localStorage.setItem("budi-led-theme", newTheme);

});



// =========================================
// NAVIGATION
// =========================================

// Fungsi scroll ke section
function scrollToSection(target) {
  if (!target) return;

  const headerHeight = header ? header.offsetHeight : 0;

  const targetPosition =
    target.getBoundingClientRect().top +
    window.scrollY -
    headerHeight;

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth"
  });
}


// Fungsi menutup menu mobile
function closeMobileMenu() {
  navMenu?.classList.remove("open");

  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Buka menu");
}


// Navigasi navbar
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || !targetId.startsWith("#")) return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    scrollToSection(target);

    closeMobileMenu();

    // Perbarui URL tanpa reload halaman
    history.pushState(null, "", targetId);
  });
});


// =========================================
// MOBILE NAVIGATION
// =========================================

if (menuToggle && navMenu) {

  // Tombol buka/tutup menu
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Tutup menu" : "Buka menu"
    );
  });


  // Tutup menu ketika klik di luar navigasi
  document.addEventListener("click", (event) => {
    if (
      !navMenu.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMobileMenu();
    }
  });

}


// =========================================
// SCROLL REVEAL ANIMATION
// =========================================

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12
    }
  );


  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });

} else {

  // Fallback untuk browser yang tidak mendukung IntersectionObserver
  revealItems.forEach((item) => {
    item.classList.add("is-visible");
  });

}


// =========================================
// BACK TO TOP BUTTON
// =========================================

// Tampilkan tombol ketika halaman di-scroll
window.addEventListener(
  "scroll",
  () => {

    backToTop?.classList.toggle(
      "visible",
      window.scrollY > 500
    );

  },
  {
    passive: true
  }
);


// Kembali ke bagian paling atas
backToTop?.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


// =========================================
// ACTIVE NAVIGATION ON SCROLL
// =========================================

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {

  const sectionObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          navLinks.forEach((link) => {

            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );

          });

        }

      });

    },
    {
      rootMargin: "-20% 0px -65% 0px"
    }
  );


  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

}


// =========================================
// AUTOMATIC COPYRIGHT YEAR
// =========================================

const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// =========================================
// BUDI LED — CONSULTATION FORM
// =========================================

const consultationForm = document.querySelector("#consultation-form");

if (consultationForm) {

  consultationForm.addEventListener("submit", (event) => {

    event.preventDefault();


    // Ambil data dari form
    const nama = document.querySelector("#nama")?.value.trim() || "";

    const whatsapp = document.querySelector("#whatsapp")?.value.trim() || "";

    const produk =
      consultationForm.querySelector('[name="produk"]')?.value || "";

    const lokasi = document.querySelector("#lokasi")?.value.trim() || "";

    const pesan = document.querySelector("#pesan")?.value.trim() || "";


    // Bersihkan nomor WhatsApp dari karakter selain angka
    const nomorBersih = whatsapp.replace(/\D/g, "");


    // Validasi nomor WhatsApp
    if (nomorBersih.length < 8) {

      alert("Silakan masukkan nomor WhatsApp yang valid.");

      return;

    }


    // Susun pesan konsultasi
    const pesanWhatsApp = `
Halo Budi LED, saya ingin melakukan konsultasi.

Nama: ${nama}
Nomor WhatsApp: ${whatsapp}
Produk yang diminati: ${produk}
Lokasi proyek: ${lokasi || "-"}

Kebutuhan:
${pesan || "Belum ada keterangan tambahan."}

Terima kasih.
    `.trim();


    // Nomor WhatsApp tujuan Budi LED
    const nomorWhatsAppTujuan = "6283899372591";


    // Buat URL WhatsApp
    const urlWhatsApp =
      `https://wa.me/${nomorWhatsAppTujuan}?text=${encodeURIComponent(pesanWhatsApp)}`;


    // Buka WhatsApp
    window.open(
      urlWhatsApp,
      "_blank",
      "noopener,noreferrer"
    );

  });

}