const form = document.getElementById('signupForm');
const successBox = document.getElementById('successBox');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confirmar = document.getElementById('confirmar');
const consent = document.getElementById('consent');
const consentError = document.getElementById('consentError');
const strength = document.getElementById('strength');
const strengthText = document.getElementById('strengthText');

// ----- Show / hide password -----
document.querySelectorAll('.toggle-pass').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    const showing = input.type === 'text';
    input.type = showing ? 'password' : 'text';
    btn.textContent = showing ? 'Mostrar' : 'Ocultar';
    btn.setAttribute('aria-pressed', String(!showing));
  });
});

// ----- Password strength -----
function passwordLevel(value) {
  if (!value) return 0;
  let score = 0;
  if (value.length >= 8) score++;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return Math.max(1, score);
}

const levelLabels = ['Use pelo menos 8 caracteres', 'Fraca', 'Razoável', 'Boa', 'Forte'];

senha.addEventListener('input', () => {
  const level = passwordLevel(senha.value);
  strength.dataset.level = level;
  strengthText.textContent = level === 0 ? levelLabels[0] : 'Senha ' + levelLabels[level].toLowerCase();
});

// ----- Helpers -----
function setError(input, hasError) {
  const field = input.closest('.field');
  field.classList.toggle('has-error', hasError);
  input.closest('.input-wrap').classList.toggle('invalid', hasError);
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// ----- Submit -----
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let ok = true;

  const nomeOk = nome.value.trim().length >= 2;
  setError(nome, !nomeOk);
  if (!nomeOk) ok = false;

  const emailOk = validEmail(email.value.trim());
  setError(email, !emailOk);
  if (!emailOk) ok = false;

  const senhaOk = senha.value.length >= 8;
  setError(senha, !senhaOk);
  if (!senhaOk) ok = false;

  const confirmarOk = confirmar.value !== '' && confirmar.value === senha.value;
  setError(confirmar, !confirmarOk);
  if (!confirmarOk) ok = false;

  consentError.classList.toggle('show', !consent.checked);
  if (!consent.checked) ok = false;

  if (!ok) {
    const first = form.querySelector('.has-error input') || consent;
    first.focus();
    return;
  }

  // NOTE: front-end only. Send nome / email / senha to your backend here
  // to actually create the account.
  form.style.display = 'none';
  document.getElementById('formIntro').style.display = 'none';
  document.getElementById('formFooter').style.display = 'none';
  document.getElementById('welcomeName').textContent = nome.value.trim().split(' ')[0];
  successBox.classList.add('show');
});

// Clear an error as soon as the user starts fixing the field
[nome, email, senha, confirmar].forEach(input => {
  input.addEventListener('input', () => setError(input, false));
});
consent.addEventListener('change', () => {
  if (consent.checked) consentError.classList.remove('show');
});