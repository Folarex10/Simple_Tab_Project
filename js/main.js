/* Tab Switching & Hamburger Menu */

document.addEventListener('DOMContentLoaded', () => {

  /*  Hamburger Menu */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });


    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }
  
  /* Close mobile nav on desktop resize */
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  }
});

/* Smooth Page Transitions */
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href]');
  if (!link) return;                              
  if (link.getAttribute('href') === '#') return; 
  if (!document.startViewTransition) return;
  e.preventDefault();
  document.startViewTransition(() => {
    window.location.href = link.href;
  });
}); 
 
  /* Contact Form Validation (Contact Page) */
  const sendBtn = document.querySelector('.btn-send');
 
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const fullName = document.querySelector('#fullname').value.trim();
      const email    = document.querySelector('#email').value.trim();
      const subject  = document.querySelector('#subject').value.trim();
      const message  = document.querySelector('#message').value.trim();
 
      // Clear any existing error messages
      document.querySelectorAll('.field-error').forEach(el => el.remove());
 
      let hasError = false;
 
      // Check all fields are filled
      [['fullname', fullName], ['email', email], ['subject', subject], ['message', message]].forEach(([id, val]) => {
        if (!val) {
          showFieldError(id, 'This field is required.');
          hasError = true;
        }
      });
 
      // Validate email format
      if (email && !isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid email address.');
        hasError = true;
      }
 
      if (!hasError) {
        showPopup();
        document.querySelector('#fullname').value = '';
        document.querySelector('#email').value    = '';
        document.querySelector('#subject').value  = '';
        document.querySelector('#message').value  = '';
      }
    });
  }
 
  /* Helpers */
 
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
 
  function showFieldError(fieldId, message) {
    const field = document.querySelector(`#${fieldId}`);
    if (!field) return;
    const error = document.createElement('p');
    error.className = 'field-error';
    error.textContent = message;
    field.parentElement.appendChild(error);
  }
 
  function showPopup() {
    const existing = document.querySelector('.success-popup');
    if (existing) existing.remove();
 
    const popup = document.createElement('div');
    popup.className = 'success-popup';
    popup.innerHTML = `
      <div class="popup-inner">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6B21A8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <h3>Message Sent Successfully!</h3>
        <p>Thank you for reaching out. Our team will get back to you shortly.</p>
        <button class="popup-close">Close</button>
      </div>
    `;
 
    document.body.appendChild(popup);
 
    popup.querySelector('.popup-close').addEventListener('click', () => popup.remove());
    setTimeout(() => { if (popup) popup.remove(); }, 4000);
  }


});