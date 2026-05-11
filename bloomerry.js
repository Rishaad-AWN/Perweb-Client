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
  document.querySelectorAll('#katGrid .prod-card').forEach(c => {
    c.style.display = (cat === 'semua' || c.dataset.cat === cat) ? 'block' : 'none';
  });
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModalDirect(); });
