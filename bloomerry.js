function buildWaMsg(name, cat, price, size) {
  const hasSize = size && size !== 'Hubungi kami' && size !== 'Sesuai permintaan';
  const label = {'Pipe Flower':'Pipe Flower','Artificial Bouquet':'Artificial Flower','Money Bouquet':'Money Bouquet','Custom Bouquet':'Custom Bouquet'}[cat] || name;
  if (cat === 'Gift & Souvenir') return `Halo, saya tertarik untuk membeli produk Gift & Souvenir. Mohon info ketersediaan stok dan detail pemesanannya ya. Terima kasih.`;
  if (hasSize) return `Halo, saya tertarik untuk membeli produk ${label} tipe ${size}. Mohon info ketersediaan stok dan detail pemesanannya ya. Terima kasih.`;
  return `Halo, saya tertarik untuk membeli produk ${label}. Mohon info ketersediaan stok dan detail pemesanannya ya. Terima kasih.`;
}

function openModal(name, cat, price, emoji, desc, size, isi, wrap, berat) {
  document.getElementById('mTitle').textContent = name;
  document.getElementById('mCat').textContent   = cat;
  document.getElementById('mPrice').textContent = price;
  document.getElementById('mDesc').textContent  = desc || '';

  const isImg = emoji.includes('.') || emoji.startsWith('/') || emoji.startsWith('http');
  document.getElementById('mImg').innerHTML = isImg
    ? `<img src="${emoji}" alt="${name}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;border-radius:1.2rem;">`
    : `<span style="font-size:5rem">${emoji}</span>`;

  const specsEl = document.getElementById('mSpecs');
  if (size || isi || wrap || berat) {
    specsEl.style.display = 'block';
    specsEl.innerHTML = `<h4>📐 Spesifikasi</h4>
      ${size  ? `<div class="spec-row"><span class="spec-key">Tipe</span><span>${size}</span></div>` : ''}
      ${berat ? `<div class="spec-row"><span class="spec-key">Ukuran</span><span>${berat !== 'Hubungi kami' ? berat + ' cm' : berat}</span></div>` : ''}
      ${isi   ? `<div class="spec-row"><span class="spec-key">Isi Bunga</span><span>${isi}</span></div>` : ''}
      ${wrap  ? `<div class="spec-row"><span class="spec-key">Wrapping</span><span>${wrap}</span></div>` : ''}`;
  } else { specsEl.style.display = 'none'; }

  const msg = buildWaMsg(name, cat, price, size);
  document.getElementById('mWa').href = `https://wa.me/6281515695526?text=${encodeURIComponent(msg)}`;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) { if (e.target.id === 'modalOverlay') closeModalDirect(); }
function closeModalDirect() { document.getElementById('modalOverlay').classList.remove('open'); document.body.style.overflow = ''; }

// Track current active category and hidden state globally
let currentCat = 'semua';
let katIsHidden = true; // start hidden (collapsed by default)

function filterKat(cat, btn) {
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  currentCat = cat;
  applyKatalogState();
}

function applyKatalogState() {
  const grid = document.getElementById('katGrid');
  const toggleText = document.getElementById('katToggleText');
  const toggleIcon = document.getElementById('katToggleIcon');

  // First, determine which cards match the current category filter
  const allCards = Array.from(document.querySelectorAll('#katGrid .prod-card'));
  const matchingCards = allCards.filter(c => currentCat === 'semua' || c.dataset.cat === currentCat);

  // Hide/show based on category filter
  allCards.forEach(c => {
    const matchesCat = currentCat === 'semua' || c.dataset.cat === currentCat;
    if (!matchesCat) {
      c.style.display = 'none';
    } else {
      // Matching card - show or hide based on katIsHidden (only show first 6)
      if (katIsHidden) {
        const idx = matchingCards.indexOf(c);
        c.style.display = idx < 6 ? 'block' : 'none';
      } else {
        c.style.display = 'block';
      }
    }
  });

  // Update button text & icon
  if (toggleText) toggleText.textContent = katIsHidden ? 'Lihat Semua Produk' : 'Sembunyikan Produk';
  if (toggleIcon) toggleIcon.classList.toggle('rotated', !katIsHidden);

  // Update toggle button visibility: only show if there are more than 6 matching cards
  const toggleWrap = document.getElementById('katToggleWrap');
  if (toggleWrap) toggleWrap.style.display = matchingCards.length > 6 ? 'flex' : 'none';

  // Update floating toggle button too — only show when there's something to toggle (>6 cards)
  const floatBtn = document.getElementById('katFloatBtn');
  if (floatBtn) {
    const shouldShow = matchingCards.length > 6;
    floatBtn.style.display = shouldShow ? 'inline-flex' : 'none';
    if (shouldShow) {
      const floatText = document.getElementById('katFloatText');
      const floatIcon = document.getElementById('katFloatIcon');
      if (floatText) floatText.textContent = katIsHidden ? 'Lihat Semua' : 'Sembunyikan';
      if (floatIcon) floatIcon.classList.toggle('rotated', !katIsHidden);
    }
  }
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModalDirect(); });

document.addEventListener('DOMContentLoaded', () => {
  // Initialize katalog with hidden state
  katIsHidden = true;
  currentCat = 'semua';
  applyKatalogState();
});

function toggleKatalog() {
  katIsHidden = !katIsHidden;
  applyKatalogState();
  if (!katIsHidden) {
    setTimeout(() => document.getElementById('katGrid').scrollIntoView({behavior:'smooth',block:'nearest'}), 50);
  }
}

function toggleNav() {
  const nav=document.getElementById('navLinks'), btn=document.getElementById('hamburger'), overlay=document.getElementById('navOverlay');
  const isOpen=nav.classList.toggle('open');
  btn.classList.toggle('open',isOpen); overlay.classList.toggle('show',isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}
function closeNav() {
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('navOverlay').classList.remove('show');
  document.body.style.overflow = '';
}

function toggleQris() { document.getElementById("qrisAccordion").classList.toggle("open"); }

function downloadQRIS(event) {
  event.preventDefault();
  const img = document.querySelector('.qris-img-wrap img');
  if (img && img.src) {
    const a = document.createElement('a'); a.href=img.src; a.download='QRIS_Bloomerry.png';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }
}
