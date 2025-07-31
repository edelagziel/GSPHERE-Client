// Basic JS for login.html: simple client-side validation and feedback

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Remove any previous error message
        let errorMsg = document.getElementById('login-error');
        if (errorMsg) {
            errorMsg.remove();
        }

        if (!username || !password) {
            errorMsg = document.createElement('div');
            errorMsg.id = 'login-error';
            errorMsg.style.color = 'red';
            errorMsg.style.marginBottom = '1rem';
            errorMsg.textContent = 'Please enter both username and password.';
            form.insertBefore(errorMsg, form.firstChild);
            return;
        }

        // Use fetch to send credentials to the server-side route
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redirect or show success
                window.location.href = data.redirect || '/';
            } else {
                errorMsg = document.createElement('div');
                errorMsg.id = 'login-error';
                errorMsg.style.color = 'red';
                errorMsg.style.marginBottom = '1rem';
                errorMsg.textContent = data.message || 'Invalid username or password.';
                form.insertBefore(errorMsg, form.firstChild);
            }
        })
        .catch(err => {
            errorMsg = document.createElement('div');
            errorMsg.id = 'login-error';
            errorMsg.style.color = 'red';
            errorMsg.style.marginBottom = '1rem';
            errorMsg.textContent = 'An error occurred. Please try again.';
            form.insertBefore(errorMsg, form.firstChild);
        });
    });
});
