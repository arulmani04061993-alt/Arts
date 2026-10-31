/**
 * STACKLY — Art & Design Institute
 * Universal Form Validation & Interactive Feedback (Pure Vanilla JavaScript)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Helper: Show Input Error
  function setInputError(input, message) {
    input.classList.add('is-invalid');
    const feedback = input.parentElement.querySelector('.invalid-feedback-custom');
    if (feedback) feedback.textContent = message;
  }

  // Helper: Clear Input Error
  function clearInputError(input) {
    input.classList.remove('is-invalid');
  }

  // Generic Field Validator
  function validateField(input) {
    const value = input.value.trim();
    const type = input.getAttribute('type');
    const isRequired = input.hasAttribute('required');

    if (isRequired && !value) {
      setInputError(input, 'This field is required.');
      return false;
    }

    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setInputError(input, 'Please enter a valid email address.');
        return false;
      }
    }

    if (type === 'tel' && value) {
      const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      if (value.length < 8) {
        setInputError(input, 'Please enter a valid telephone number.');
        return false;
      }
    }

    if (type === 'password' && isRequired && value.length < 6) {
      setInputError(input, 'Password must be at least 6 characters.');
      return false;
    }

    clearInputError(input);
    return true;
  }

  // 1. LOGIN FORM VALIDATION
  const loginForm = document.getElementById('stackly-login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('login-email');
      const passInput = document.getElementById('login-password');
      const feedbackAlert = document.getElementById('login-feedback-alert');

      let isValid = true;
      if (!validateField(emailInput)) isValid = false;
      if (!validateField(passInput)) isValid = false;

      if (isValid) {
        if (feedbackAlert) {
          feedbackAlert.className = 'alert alert-success d-flex align-items-center gap-2 mb-3';
          feedbackAlert.innerHTML = '<i class="bi bi-check-circle-fill"></i> <strong>Simulation Success:</strong> Credentials validated. (Note: Production authentication requires backend connection).';
          feedbackAlert.classList.remove('d-none');
        }
      }
    });
  }

  // 2. SIGNUP FORM VALIDATION
  const signupForm = document.getElementById('stackly-signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fname = document.getElementById('signup-fname');
      const lname = document.getElementById('signup-lname');
      const email = document.getElementById('signup-email');
      const phone = document.getElementById('signup-phone');
      const pass = document.getElementById('signup-password');
      const passConfirm = document.getElementById('signup-password-confirm');
      const course = document.getElementById('signup-course');
      const terms = document.getElementById('signup-terms');
      const feedbackAlert = document.getElementById('signup-feedback-alert');

      let isValid = true;
      if (!validateField(fname)) isValid = false;
      if (!validateField(lname)) isValid = false;
      if (!validateField(email)) isValid = false;
      if (!validateField(phone)) isValid = false;
      if (!validateField(pass)) isValid = false;

      if (pass && passConfirm && pass.value !== passConfirm.value) {
        setInputError(passConfirm, 'Passwords do not match.');
        isValid = false;
      } else if (passConfirm) {
        clearInputError(passConfirm);
      }

      if (course && !course.value) {
        setInputError(course, 'Please select your area of creative interest.');
        isValid = false;
      } else if (course) {
        clearInputError(course);
      }

      if (terms && !terms.checked) {
        const termsFeedback = terms.parentElement.querySelector('.invalid-feedback-custom');
        if (termsFeedback) termsFeedback.style.display = 'block';
        isValid = false;
      } else if (terms) {
        const termsFeedback = terms.parentElement.querySelector('.invalid-feedback-custom');
        if (termsFeedback) termsFeedback.style.display = 'none';
      }

      if (isValid && feedbackAlert) {
        feedbackAlert.className = 'alert alert-success d-flex align-items-center gap-2 mb-3';
        feedbackAlert.innerHTML = '<i class="bi bi-check-circle-fill"></i> <strong>Account Created:</strong> Welcome to STACKLY! (Sample frontend confirmation).';
        feedbackAlert.classList.remove('d-none');
        signupForm.reset();
      }
    });
  }

  // 3. FORGOT PASSWORD FORM
  const forgotForm = document.getElementById('stackly-forgot-form');
  if (forgotForm) {
    forgotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('forgot-email');
      const feedbackAlert = document.getElementById('forgot-feedback-alert');

      if (validateField(emailInput)) {
        if (feedbackAlert) {
          feedbackAlert.className = 'alert alert-success d-flex align-items-center gap-2 mb-3';
          feedbackAlert.innerHTML = '<i class="bi bi-envelope-check-fill"></i> <strong>Reset Link Sent:</strong> If an account exists for ' + emailInput.value + ', reset instructions have been dispatched. (Actual delivery requires backend mail service).';
          feedbackAlert.classList.remove('d-none');
        }
        emailInput.value = '';
      }
    });
  }

  // 4. ADMISSIONS APPLICATION FORM
  const admissionForm = document.getElementById('stackly-admission-form');
  if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('app-fullname');
      const email = document.getElementById('app-email');
      const phone = document.getElementById('app-phone');
      const course = document.getElementById('app-course');
      const statement = document.getElementById('app-statement');
      const feedbackAlert = document.getElementById('admission-feedback-alert');

      let isValid = true;
      if (name && !validateField(name)) isValid = false;
      if (email && !validateField(email)) isValid = false;
      if (phone && !validateField(phone)) isValid = false;
      if (course && !course.value) {
        setInputError(course, 'Please select a program.');
        isValid = false;
      } else if (course) {
        clearInputError(course);
      }
      if (statement && !validateField(statement)) isValid = false;

      if (isValid && feedbackAlert) {
        feedbackAlert.className = 'alert alert-success p-3 rounded mb-4';
        feedbackAlert.innerHTML = `
          <h5><i class="bi bi-check-circle-fill text-success"></i> Application Submitted Successfully!</h5>
          <p class="mb-0 small">Thank you, <strong>${name.value}</strong>. Your portfolio and admissions dossier for <strong>${course.options[course.selectedIndex].text}</strong> has been logged for review. Our admissions board evaluates submissions within 3 to 5 academic days. <em>(Frontend demonstration — not sent to server)</em>.</p>
        `;
        feedbackAlert.classList.remove('d-none');
        feedbackAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        admissionForm.reset();
      }
    });
  }

  // 5. CONTACT FORM
  const contactForm = document.getElementById('stackly-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name');
      const email = document.getElementById('contact-email');
      const message = document.getElementById('contact-message');
      const feedbackAlert = document.getElementById('contact-feedback-alert');

      let isValid = true;
      if (name && !validateField(name)) isValid = false;
      if (email && !validateField(email)) isValid = false;
      if (message && !validateField(message)) isValid = false;

      if (isValid && feedbackAlert) {
        feedbackAlert.className = 'alert alert-success d-flex align-items-center gap-2 mb-3';
        feedbackAlert.innerHTML = '<i class="bi bi-check-circle-fill"></i> Thank you! Your inquiry has been received. Our studio coordinators will respond shortly.';
        feedbackAlert.classList.remove('d-none');
        contactForm.reset();
      }
    });
  }

  // Realtime field cleanup on input
  document.querySelectorAll('.form-control-custom, .form-select-custom').forEach(input => {
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) {
        validateField(input);
      }
    });
  });
});
