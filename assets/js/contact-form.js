/**
* Contact form submission via Formspree (https://formspree.io)
* Replaces the PHP-based "PHP Email Form" library, which requires a PHP host
* and a paid library not included in this template's free version.
*/
(function () {
  "use strict";

  const forms = document.querySelectorAll('.php-email-form');
  const FALLBACK_MESSAGES = {
    fr: {
      noAction: "L'adresse d'envoi du formulaire n'est pas configurée.",
      generic: "Une erreur est survenue lors de l'envoi du message."
    },
    en: {
      noAction: "The form's send address is not configured.",
      generic: "An error occurred while sending the message."
    }
  };

  function currentLang() {
    return document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'fr';
  }

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const action = form.getAttribute('action');
      if (!action) {
        displayError(form, FALLBACK_MESSAGES[currentLang()].noAction);
        return;
      }

      form.querySelector('.loading').classList.add('d-block');

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          form.querySelector('.loading').classList.remove('d-block');
          if (response.ok) {
            showSuccessModal(form);
            form.reset();
            return;
          }
          return response.json().then(function (data) {
            const message = (data && data.errors)
              ? data.errors.map(function (err) { return err.message; }).join(', ')
              : FALLBACK_MESSAGES[currentLang()].generic;
            throw new Error(message);
          });
        })
        .catch(function (error) {
          displayError(form, error.message || error);
        });
    });
  });

  function showModal(form, selector) {
    const modalEl = form.parentElement.querySelector(selector);
    if (modalEl && window.bootstrap) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
      return modal;
    }
  }

  function showSuccessModal(form) {
    showModal(form, '#contactSuccessModal');
  }

  function displayError(form, error) {
    form.querySelector('.loading').classList.remove('d-block');
    const modalEl = form.parentElement.querySelector('#contactErrorModal');
    if (modalEl) {
      modalEl.querySelector('.contact-error-text').textContent = error;
    }
    showModal(form, '#contactErrorModal');
  }

})();
