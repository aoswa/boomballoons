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

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('whatsapp-form');

  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.elements.name.value.trim();
    const phone = form.elements.phone.value.trim();
    const message = form.elements.message.value.trim();

    const text = [
      'Bună! Mă interesează un decor cu baloane.',
      '',
      name ? `Nume: ${name}` : null,
      phone ? `Telefon: ${phone}` : null,
      message ? `Mesaj: ${message}` : null,
      '',
      'Trimis de pe boomballoons.ro'
    ]
        .filter(Boolean)
        .join('\n');

    const whatsappUrl = `https://wa.me/40750433955?text=${encodeURIComponent(text)}`;

    window.location.href = whatsappUrl;
  });
});