function openModal(name, cat, price, emoji, desc, size, isi, wrap, berat) {
  document.getElementById('mTitle').textContent = name;
  document.getElementById('mCat').textContent = cat;
  document.getElementById('mPrice').textContent = price;
  document.getElementById('mDesc').textContent = desc || '';

  const isImg = emoji.includes('.') || emoji.startsWith('/') || emoji.startsWith('http');
  document.getElementById('mImg').innerHTML = isImg
    ? `<img src="${emoji}" alt="${name}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;border-radius:1.2rem;">`
    : `<span style="font-size:5rem">${emoji}</span>`;

  const specs = document.getElementById('mSpecs');
  if (size || isi || wrap || berat) {
    specs.style.display = 'block';
    specs.innerHTML = `<h4>📐 Spesifikasi</h4>
      ${size  ? `<div class="spec-row"><span class="spec-key">Ukuran</span><span>${size}</span></div>`  : ''}
      ${isi   ? `<div class="spec-row"><span class="spec-key">Isi</span><span>${isi}</span></div>`      : ''}
      ${wrap  ? `<div class="spec-row"><span class="spec-key">Wrapping</span><span>${wrap}</span></div>`: ''}
      ${berat ? `<div class="spec-row"><span class="spec-key">Berat</span><span>${berat}</span></div>`  : ''}`;
  } else { specs.style.display = 'none'; }

  const msg = `Halo Bloomerry! Saya tertarik dengan *${name}* (${price}). Boleh info lebih lanjut?`;
  document.getElementById('mWa').href = `https://wa.me/6281516595526?text=${encodeURIComponent(msg)}`;

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) { if (e.target.id === 'modalOverlay') closeModalDirect(); }
function closeModalDirect() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function filterKat(cat, btn) {
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const grid = document.getElementById('katGrid');
  if (grid.classList.contains('collapsed')) {
    grid.classList.remove('collapsed');
    document.getElementById('katToggleText').textContent = 'Sembunyikan Produk';
    document.getElementById('katToggleIcon').classList.add('rotated');
  }
  document.querySelectorAll('#katGrid .prod-card').forEach(c => {
    c.style.display = (cat === 'semua' || c.dataset.cat === cat) ? 'block' : 'none';
  });
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModalDirect(); });

/* ─── KATALOG TOGGLE ─── */
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('katGrid');
  if (grid) grid.classList.add('collapsed');
});

function toggleKatalog() {
  const grid = document.getElementById('katGrid');
  const btn  = document.getElementById('katToggleBtn');
  const text = document.getElementById('katToggleText');
  const icon = document.getElementById('katToggleIcon');
  const isCollapsed = grid.classList.toggle('collapsed');
  text.textContent = isCollapsed ? 'Lihat Semua Produk' : 'Sembunyikan Produk';
  icon.classList.toggle('rotated', !isCollapsed);
  // When collapsing, remove inline display styles so CSS nth-child rule takes effect
  if (isCollapsed) {
    grid.querySelectorAll('.prod-card').forEach((c, i) => {
      if (i >= 6) c.style.display = '';
    });
  }
  if (!isCollapsed) {
    setTimeout(() => grid.scrollIntoView({ behavior:'smooth', block:'nearest' }), 50);
  }
}

/* ─── HAMBURGER MENU ─── */
function toggleNav() {
  const nav    = document.getElementById('navLinks');
  const btn    = document.getElementById('hamburger');
  const overlay= document.getElementById('navOverlay');
  const isOpen = nav.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  overlay.classList.toggle('show', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}
function closeNav() {
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('navOverlay').classList.remove('show');
  document.body.style.overflow = '';
}

function toggleQris() {
  var acc = document.getElementById("qrisAccordion");
  acc.classList.toggle("open");
}

function downloadQRIS(event) {
  event.preventDefault();
  const imgElement = document.querySelector('.qris-img-wrap img');
  if (imgElement && imgElement.src) {
    const link = document.createElement('a');
    link.href = imgElement.src;
    link.download = 'QRIS_Bloomerry.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}