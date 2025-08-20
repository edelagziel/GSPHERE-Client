document.querySelector("form").onsubmit = function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // גוף ההודעה - אפשר לערוך איך שאתה רוצה שיופיע במייל
    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    // פותח חלון מייל חדש עם כל הפרטים
    window.location.href =
        `mailto:info@gsphere.com?subject=${encodeURIComponent(subject)}&body=${body}`;
};
