/* Common UI: mobile nav, gallery lightbox & filter, contact validation, newsletter */
document.addEventListener('DOMContentLoaded', ()=>{

  // Mobile menu
  const menuu = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  if(menuu && navLinks){
    menuu.addEventListener('click', ()=> navLinks.classList.toggle('open'));
  }

  // Active link highlight
  const path = location.pathname.split('/').pop().toLowerCase() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href && href.toLowerCase().endsWith(path)) a.classList.add('active');
  });

  /* Gallery: filter */
  const filterBtns = document.querySelectorAll('[data-filter]');
  if(filterBtns.length){
    filterBtns.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        filterBtns.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        document.querySelectorAll('.gallery-item').forEach(item=>{
          if(cat==='all' || item.dataset.cat === cat) item.style.display = '';
          else item.style.display = 'none';
        });
      });
    });
  }

  /* Lightbox */
  const lightbox = document.querySelector('.lightbox');
  if(lightbox){
    const lbImg = lightbox.querySelector('img');
    document.querySelectorAll('[data-lightbox]').forEach(link=>{
      link.addEventListener('click', (e)=>{
        e.preventDefault();
        const src = link.getAttribute('href') || link.dataset.src;
        lbImg.src = src;
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', ()=> lightbox.classList.remove('open'));
  }

  /* Contact form validation */
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    const msg = document.getElementById('formMessage');
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const form = new FormData(contactForm);
      const name = (form.get('name')||'').trim();
      const email = (form.get('email')||'').trim();
      const message = (form.get('message')||'').trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if(!name || !emailOk || !message){
        msg.textContent = 'Please complete all required fields with a valid email.';
        msg.style.color = '#c55';
        msg.style.display = 'block';
        return;
      }
      msg.textContent = 'Thank you! Your message passed validation. Connect a backend to send it.';
      msg.style.color = 'var(--accent)';
      msg.style.display = 'block';
      contactForm.reset();
    });
  }

  /* Newsletter (simple local validation) */
  const newsletter = document.getElementById('newsletterForm');
  if(newsletter){
    newsletter.addEventListener('submit', (e)=>{
      e.preventDefault();
      const email = (newsletter.querySelector('input[name="email"]').value||'').trim();
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        alert('Please enter a valid email for the newsletter.');
        return;
      }
      alert('Thanks! You subscribed (local demo).');
      newsletter.reset();
    });
  }

});
