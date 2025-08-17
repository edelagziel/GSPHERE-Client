// showMessage: הצגת הודעות bootstrap
function showMessage(type, text, timeout = 3000) {
    let container = document.getElementById('msg-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'msg-container';
      document.body.prepend(container); // להוסיף לראש הדף, אם אין
    }
    container.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show mt-2" role="alert">
        ${text}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    if (timeout) {
      setTimeout(() => { container.innerHTML = ''; }, timeout);
    }
  }
  
  // setButtonLoading: נועל/משחרר כל כפתור
  function setButtonLoading(btn, isLoading, loadingText = "Loading...") {
    if (!btn) return;
    if (isLoading) {
      btn.disabled = true;
      btn.dataset.originalText = btn.innerHTML;
      btn.innerHTML = `${loadingText} <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;
    } else {
      btn.disabled = false;
      if (btn.dataset.originalText) btn.innerHTML = btn.dataset.originalText;
    }
  }
  