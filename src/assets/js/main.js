const toggle=document.querySelector('[data-menu-toggle]');
const mobileNav=document.querySelector('[data-mobile-nav]');
if(toggle&&mobileNav){
  toggle.addEventListener('click',()=>{
    const open=mobileNav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded',String(open));
  });
  mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    mobileNav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded','false');
  }));
}
const dialog=document.querySelector('[data-lightbox-dialog]');
const dialogImg=document.querySelector('[data-lightbox-img]');
const closeBtn=document.querySelector('[data-lightbox-close]');
document.querySelectorAll('[data-lightbox]').forEach(btn=>btn.addEventListener('click',()=>{
  if(!dialog||!dialogImg)return;
  dialogImg.src=btn.getAttribute('data-lightbox');
  dialog.showModal();
}));
if(dialog&&closeBtn){
  closeBtn.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
}


/* Portfolio tabs */
const tabButtons=document.querySelectorAll('.tabs button[data-filter]');
const portfolioItems=document.querySelectorAll('.portfolio-grid button[data-category]');
tabButtons.forEach(tab=>{
  tab.addEventListener('click',()=>{
    const filter=tab.dataset.filter;
    tabButtons.forEach(button=>button.classList.remove('selected'));
    tab.classList.add('selected');
    portfolioItems.forEach(item=>{
      const categories=(item.dataset.category||'').split(/\s+/);
      const visible=filter==='all'||categories.includes(filter);
      item.classList.toggle('is-hidden',!visible);
    });
  });
});

/* Lock page scroll while lightbox is open */
if(dialog){
  dialog.addEventListener('close',()=>document.body.classList.remove('lightbox-open'));
  document.querySelectorAll('[data-lightbox]').forEach(btn=>{
    btn.addEventListener('click',()=>document.body.classList.add('lightbox-open'));
  });
}

console.log('[WA FORM] script loaded');

const form = document.querySelector('.contact-form');

console.log('[WA FORM] form found:', form);

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    console.log('[WA FORM] submit triggered');

    const name = form.querySelector('input[aria-label="Nume"]')?.value.trim() || '';
    const phone = form.querySelector('input[aria-label="Telefon"]')?.value.trim() || '';
    const message = form.querySelector('textarea[aria-label="Mesaj"]')?.value.trim() || '';

    console.log('[WA FORM] values:', { name, phone, message });

    const text = [
      'Bună! Mă interesează un decor cu baloane.',
      '',
      name ? `Nume: ${name}` : '',
      phone ? `Telefon: ${phone}` : '',
      message ? `Mesaj: ${message}` : '',
      '',
      'Trimis de pe boomballoons.ro'
    ]
        .filter(Boolean)
        .join('\n');

    const url = `https://wa.me/40750433955?text=${encodeURIComponent(text)}`;

    console.log('[WA FORM] redirect:', url);

    window.location.href = url;
  });
}