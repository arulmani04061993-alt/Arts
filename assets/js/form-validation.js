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

  // 1. LOGIN FORM VALIDATION & ROLE SWITCHING
  const loginForm = document.getElementById('stackly-login-form');
  if (loginForm) {
    const roleRadios = document.querySelectorAll('input[name="auth_role"]');
    const roleIndicator = document.getElementById('active-role-indicator');
    const submitText = document.getElementById('login-submit-text');
    const emailInput = document.getElementById('login-email');

    roleRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        const role = e.target.value;
        if (role === 'admin') {
          if (roleIndicator) {
            roleIndicator.textContent = 'Role: Administrator';
            roleIndicator.className = 'text-purple small fw-bold';
          }
          if (submitText) submitText.textContent = 'SIGN IN AS ADMIN';
          if (emailInput) {
            emailInput.placeholder = 'admin@stackly.edu';
            if (emailInput.value === 'client@stackly.edu') emailInput.value = 'admin@stackly.edu';
          }
        } else {
          if (roleIndicator) {
            roleIndicator.textContent = 'Role: Client';
            roleIndicator.className = 'text-coral small fw-bold';
          }
          if (submitText) submitText.textContent = 'SIGN IN AS CLIENT';
          if (emailInput) {
            emailInput.placeholder = 'client@stackly.edu';
            if (emailInput.value === 'admin@stackly.edu') emailInput.value = 'client@stackly.edu';
          }
        }
      });
    });

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const passInput = document.getElementById('login-password');
      const feedbackAlert = document.getElementById('login-feedback-alert');
      const selectedRole = document.querySelector('input[name="auth_role"]:checked')?.value || 'client';

      // Fallback email if user left blank or clicks directly
      let emailVal = emailInput ? emailInput.value.trim() : '';
      if (!emailVal) {
        emailVal = selectedRole === 'admin' ? 'admin@stackly.edu' : 'client@stackly.edu';
      }

      // Save authenticated session details immediately
      localStorage.setItem('stackly_user_email', emailVal);
      localStorage.setItem('stackly_user_role', selectedRole);

      const targetDashboard = selectedRole === 'admin' ? 'admin-dashboard.html' : 'client-dashboard.html';

      if (feedbackAlert) {
        const roleLabel = selectedRole === 'admin' ? 'Administrator' : 'Client';
        const alertColor = selectedRole === 'admin' ? 'alert-primary' : 'alert-success';
        feedbackAlert.className = `alert ${alertColor} d-flex align-items-center gap-2 mb-3`;
        feedbackAlert.innerHTML = `<i class="bi bi-shield-check fs-5"></i> <div><strong>Authenticated as ${roleLabel}:</strong> Session verified for <code>${emailVal}</code>. Redirecting to Dashboard...</div>`;
        feedbackAlert.classList.remove('d-none');
      }

      // Direct instant redirection
      window.location.href = targetDashboard;
    });
  }

  // 2. SIGNUP FORM VALIDATION & ROLE SWITCHING
  const signupForm = document.getElementById('stackly-signup-form');
  if (signupForm) {
    const signupRoleRadios = document.querySelectorAll('input[name="signup_auth_role"]');
    const signupRoleIndicator = document.getElementById('signup-active-role-indicator');
    const signupSubmitText = document.getElementById('signup-submit-text');
    const signupDeptLabel = document.getElementById('signup-dept-label');

    signupRoleRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        const role = e.target.value;
        if (role === 'admin') {
          if (signupRoleIndicator) {
            signupRoleIndicator.textContent = 'Role: Administrator';
            signupRoleIndicator.className = 'text-purple small fw-bold';
          }
          if (signupSubmitText) signupSubmitText.textContent = 'CREATE ADMIN ACCOUNT';
        } else {
          if (signupRoleIndicator) {
            signupRoleIndicator.textContent = 'Role: Client';
            signupRoleIndicator.className = 'text-coral small fw-bold';
          }
          if (signupSubmitText) signupSubmitText.textContent = 'CREATE CLIENT ACCOUNT';
        }
      });
    });

    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fname = document.getElementById('signup-fname');
      const lname = document.getElementById('signup-lname');
      const email = document.getElementById('signup-email');
      const phone = document.getElementById('signup-phone');
      const pass = document.getElementById('signup-password');
      const passConfirm = document.getElementById('signup-password-confirm');
      const terms = document.getElementById('signup-terms');
      const feedbackAlert = document.getElementById('signup-feedback-alert');
      const selectedRole = document.querySelector('input[name="signup_auth_role"]:checked')?.value || 'client';

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

      if (terms && !terms.checked) {
        const termsFeedback = terms.parentElement.querySelector('.invalid-feedback-custom');
        if (termsFeedback) termsFeedback.style.display = 'block';
        isValid = false;
      } else if (terms) {
        const termsFeedback = terms.parentElement.querySelector('.invalid-feedback-custom');
        if (termsFeedback) termsFeedback.style.display = 'none';
      }

      if (isValid && feedbackAlert) {
        const roleLabel = selectedRole === 'admin' ? 'Administrator' : 'Client';
        const emailVal = email.value.trim();
        localStorage.setItem('stackly_user_email', emailVal);
        localStorage.setItem('stackly_user_role', selectedRole);

        const targetDashboard = selectedRole === 'admin' ? 'admin-dashboard.html' : 'client-dashboard.html';

        feedbackAlert.className = 'alert alert-success d-flex align-items-center gap-2 mb-3';
        feedbackAlert.innerHTML = `<i class="bi bi-check-circle-fill fs-5"></i> <div><strong>${roleLabel} Account Created:</strong> Welcome, ${fname.value}! Logging into ${roleLabel} Dashboard...</div>`;
        feedbackAlert.classList.remove('d-none');
        signupForm.reset();

        setTimeout(() => {
          window.location.href = targetDashboard;
        }, 900);
      }
    });
  }

  // Password Visibility Toggle Handler
  document.querySelectorAll('.password-toggle-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.parentElement.querySelector('input');
      const icon = this.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye-ready', 'bi-eye');
      }
    });
  });

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
