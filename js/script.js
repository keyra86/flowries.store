/* ========== JS: Flowries Store ========== */
const currency = (n)=> new Intl.NumberFormat('id-ID',{style:'currency', currency:'IDR', maximumFractionDigits:0}).format(n);

const PRODUCTS = [
  {id:'rose-blush', name:'Rose Blush', price:289000, img:'img/product1.svg', desc:'Buket mawar lembut nuansa pink.'},
  {id:'freesia-sun', name:'Freesia Sun', price:259000, img:'img/product2.svg', desc:'Freesia ceria beraroma segar.'},
  {id:'tulip-sugar', name:'Tulip Sugar', price:319000, img:'img/product3.svg', desc:'Tulip manis untuk hari spesial.'},
  {id:'peony-cloud', name:'Peony Cloud', price:349000, img:'img/product4.svg', desc:'Peony fluffy, super elegan.'},
  {id:'daisy-dream', name:'Daisy Dream', price:199000, img:'img/product5.svg', desc:'Daisy ceria penuh warna.'},
];

// ===== Slider =====
const slidesContainer = document.getElementById('slidesContainer');
function renderSlides(){
  slidesContainer.innerHTML = PRODUCTS.map(p => `
    <article class="slide card product-card" aria-label="${p.name}">
      <div class="product-media"><img src="${p.img}" alt="${p.name}"></div>
      <div class="product-info">
        <div>
          <h3 class="product-title">${p.name}</h3>
          <p class="small">${p.desc}</p>
        </div>
        <div class="price">${currency(p.price)}</div>
      </div>
      <div style="display:flex; gap:8px; margin-top:6px">
        <button class="btn btn-outline" onclick="addToCart('${p.id}')">Tambah</button>
        <button class="btn btn-primary" onclick="buyNow('${p.id}')">Beli Sekarang</button>
      </div>
    </article>
  `).join('');
}
renderSlides();

let autoPlay;
function startAutoPlay(){
  stopAutoPlay();
  autoPlay = setInterval(()=> slidesContainer.scrollBy({left: 320, behavior:'smooth'}), 4000);
}
function stopAutoPlay(){ if(autoPlay) clearInterval(autoPlay); }
startAutoPlay();

document.getElementById('nextSlide').addEventListener('click', ()=> slidesContainer.scrollBy({left: 320, behavior:'smooth'}));
document.getElementById('prevSlide').addEventListener('click', ()=> slidesContainer.scrollBy({left: -320, behavior:'smooth'}));
slidesContainer.addEventListener('mouseenter', stopAutoPlay);
slidesContainer.addEventListener('mouseleave', startAutoPlay);

// ===== Cart =====
const CART_KEY = 'flowries_cart_v1';
function getCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } }
function saveCart(items){ localStorage.setItem(CART_KEY, JSON.stringify(items)); updateCartCount(); renderCart(); }
function updateCartCount(){ document.getElementById('cartCount').textContent = getCart().reduce((a,b)=>a+b.qty,0); }
function addToCart(id){
  const p = PRODUCTS.find(x=>x.id===id); if(!p) return;
  const cart = getCart();
  const idx = cart.findIndex(i=>i.id===id);
  if(idx>-1) cart[idx].qty+=1; else cart.push({id, qty:1});
  saveCart(cart);
  openCart();
}
function buyNow(id){ addToCart(id); }
function removeFromCart(id){
  saveCart(getCart().filter(i=> i.id!==id));
}
function changeQty(id, delta){
  const cart = getCart().map(i=> i.id===id ? {...i, qty: Math.max(1, i.qty+delta)} : i);
  saveCart(cart);
}

function renderCart(){
  const wrap = document.getElementById('cartItems');
  const cart = getCart();
  if(cart.length===0){
    wrap.innerHTML = '<p class="small">Keranjang masih kosong.</p>';
    document.getElementById('cartTotal').textContent = currency(0);
    return;
  }
  let total = 0;
  wrap.innerHTML = cart.map(it=>{
    const p = PRODUCTS.find(x=>x.id===it.id);
    const line = p.price * it.qty; total += line;
    return `
      <div class="cart-item">
        <img src="${p.img}" alt="${p.name}">
        <div>
          <div style="font-weight:600">${p.name}</div>
          <div class="small">${currency(p.price)} · <span class="qty">
            <button onclick="changeQty('${p.id}',-1)" aria-label="Kurangi">-</button>
            <span>${it.qty}</span>
            <button onclick="changeQty('${p.id}',+1)" aria-label="Tambah">+</button>
          </span></div>
          <button class="small icon-btn" onclick="removeFromCart('${p.id}')" aria-label="Hapus">&times; Hapus</button>
        </div>
        <div style="font-weight:700">${currency(line)}</div>
      </div>
    `;
  }).join('');
  document.getElementById('cartTotal').textContent = currency(total);
}
updateCartCount(); renderCart();

const drawer = document.getElementById('cartDrawer');
function openCart(){ drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false'); }
function closeCart(){ drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); }
document.getElementById('openCartBtn').addEventListener('click', openCart);
document.getElementById('closeCartBtn').addEventListener('click', closeCart);

document.getElementById('checkoutBtn').addEventListener('click', ()=>{
  const cart = getCart();
  if(cart.length===0){ alert('Keranjang kosong.'); return; }
  const items = cart.map(it=>{
    const p = PRODUCTS.find(x=>x.id===it.id);
    return `- ${p.name} x${it.qty} (${currency(p.price*it.qty)})`;
  }).join('\n');
  const total = cart.reduce((acc,it)=> acc + (PRODUCTS.find(p=>p.id===it.id).price*it.qty), 0);
  alert(`Checkout Berhasil!\n\nRingkasan:\n${items}\n\nTotal: ${currency(total)}\n\n*Simulasi* — integrasi pembayaran dapat ditambahkan nanti.`);
  localStorage.removeItem(CART_KEY);
  updateCartCount(); renderCart(); closeCart();
});

// ===== Testimoni =====
const TESTI_KEY='flowries_testi_v1';
function getTesti(){ try{ return JSON.parse(localStorage.getItem(TESTI_KEY))||[] } catch{ return [] } }
function saveTesti(list){ localStorage.setItem(TESTI_KEY, JSON.stringify(list)); renderTesti(); }
function renderTesti(){
  const list = getTesti();
  const wrap = document.getElementById('testiList');
  if(list.length===0){ wrap.innerHTML = '<p class="small">Belum ada testimoni. Jadilah yang pertama!</p>'; return; }
  wrap.innerHTML = list.map(t => `
    <div class="card" style="padding:14px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <strong>${t.nama}</strong>
        <span aria-label="Rating">⭐️ ${t.rating}/5</span>
      </div>
      <p style="margin:.4rem 0 0">${t.pesan}</p>
      <p class="small" style="color:#777;margin:.3rem 0 0">${new Date(t.tanggal).toLocaleDateString('id-ID')}</p>
    </div>
  `).join('');
}
renderTesti();

document.getElementById('testiForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const entry = {
    nama: fd.get('nama').toString().trim(),
    rating: Number(fd.get('rating')),
    pesan: fd.get('pesan').toString().trim(),
    tanggal: Date.now()
  };
  if(!entry.nama || !entry.pesan){ return; }
  const list = getTesti(); list.unshift(entry); saveTesti(list);
  e.target.reset();
});

// ===== Feedback (Kritik & Saran) =====
document.getElementById('feedbackForm').addEventListener('submit',(e)=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const payload = {
    nama: fd.get('nama'),
    email: fd.get('email'),
    pesan: fd.get('pesan'),
    waktu: new Date().toISOString()
  };
  // Simulasi kirim — tampilkan status & simpan ke localStorage
  const all = JSON.parse(localStorage.getItem('flowries_feedback_v1')||'[]');
  all.push(payload);
  localStorage.setItem('flowries_feedback_v1', JSON.stringify(all));
  const s = document.getElementById('feedbackStatus');
  s.textContent = 'Terima kasih! Pesan kamu sudah terekam.';
  e.target.reset();
  setTimeout(()=> s.textContent='', 4000);
});

// ===== Misc =====
document.getElementById('year').textContent = new Date().getFullYear();
