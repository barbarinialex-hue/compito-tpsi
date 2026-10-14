const themeToggle = document.getElementById('themeToggle');
const dateLabel = document.getElementById('dateLabel');
const contactForm = document.getElementById('contactForm');

const setDate = () => {
  const now = new Date();
  dateLabel.textContent = now.toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const updateTheme = () => {
  const isDark = document.body.classList.toggle('dark');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
};

if (themeToggle) {
  themeToggle.addEventListener('click', updateTheme);
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const value = nameInput.value.trim();

    if (!value) {
      nameInput.focus();
      nameInput.placeholder = 'Inserisci un nome valido';
      return;
    }

    alert(`Grazie, ${value}! Il tuo messaggio è stato preparato.`);
    contactForm.reset();
    nameInput.placeholder = 'Il tuo nome';
  });
}

setDate();
