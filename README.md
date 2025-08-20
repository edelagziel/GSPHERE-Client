# GSPHERE - Client

Frontend for **GSPHERE**, the Gaming Collaboration Hub platform — enabling game developers, designers, musicians, and other creatives to connect, build teams, manage projects, and collaborate efficiently.

> 🔗 This is the client-side of the project. The backend is available in the [GSPHERE-Server](https://github.com/edelagziel/GSPHERE-Server) repository.

---

## 🚀 Tech Stack

- ✅ HTML5  
- 🎨 CSS3 + custom styles  
- ⚙️ JavaScript (Vanilla)  
- 🎛 Bootstrap 5.3.3  
- 🌐 Fetch API for server communication  
- 🍪 Cookie-based authentication (login/register)

---

## 📁 Project Structure

```
GSPHERE-Client/
├── js/               # JavaScript files (fetch, render, auth, etc.)
├── Mycss/            # Custom CSS styling
├── page/             # All HTML pages (home, login, register, profile, etc.)
├── svg/              # Icon SVGs
├── Compnonenet/      # Reusable components (navbar, footer, etc.)
├── Temp/             # Temporary files or future development
├── index.html        # Main landing page
├── index copy.html   # Backup or alt version
```

---

## ✨ Features

- 🔐 **Authentication system** – login & registration using cookies  
- 🧠 **Role-based access** – recruiter / candidate views  
- 🧱 **Modular JS** – split into logical parts (fetch, events, rendering)  
- 🧭 **Responsive Bootstrap layout**  
- 🎴 **Dynamic project/job cards rendering**  
- ⚡ Fast & clean UI with reusable HTML components

---

## ⚙️ How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/edelagziel/GSPHERE-Client.git
   ```

2. Open the project in VSCode.

3. Right-click `index.html` and select:  
   > `Open with Live Server` (recommended extension)

   ⚠️ `fetch(...)` will **not work with file:// path** – a local server is required!

4. Make sure the [GSPHERE-Server](https://github.com/edelagziel/GSPHERE-Server) is running on the backend.

---

## 📌 To-Do / Improvements

- [ ] Add loading spinners / UX indicators  
- [ ] Improve mobile responsiveness for dashboard  
- [ ] Add modular import/export using ES6  
- [ ] Improve error handling and form validation  
- [ ] Add basic accessibility (a11y) improvements

---

## 👥 Contributors

- 👤 [Eden Lagziel](https://github.com/edelagziel)  


## 📝 License

This project is licensed under the MIT License.
