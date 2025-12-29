// ===================================
// HAMBURGER MENU
// ===================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
}

// ===================================
// SCROLL TO TOP
// ===================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
        scrollTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    }
});

scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===================================
// CONTACT FORM
// ===================================
const contactForm = document.getElementById('contactForm');
const formAlert = document.getElementById('formAlert');

if (contactForm && formAlert) {
    const submitBtn = contactForm.querySelector('.submit-btn');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Reset alert
        formAlert.style.display = 'none';
        formAlert.className = 'form-alert';

        // Button state
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent.trim();
        submitBtn.innerHTML = 'Sending... <span class="btn-spinner"></span>';

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                showAlert('Thank you! Your message was sent successfully.', 'success');
                contactForm.reset();
            } else {
                throw new Error('Network error');
            }
        } catch (error) {
            showAlert('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

function showAlert(message, type) {
    formAlert.textContent = message;
    formAlert.className = `form-alert ${type}`;
    formAlert.style.display = 'block';
    setTimeout(() => formAlert.style.display = 'none', 5000);
}

// ===================================
// CART COUNTER (Fixed)
// ===================================
const cartIcon = document.querySelector('.icon-cart');
const cartCountEl = document.getElementById('cartCount');

if (cartIcon && cartCountEl) {
    let count = 0;
    cartIcon.addEventListener('click', () => {
        count++;
        cartCountEl.textContent = count;
    });
}