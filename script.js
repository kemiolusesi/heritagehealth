document.addEventListener('DOMContentLoaded', () => {
// Toggle Switch Functionality
const toggle = document.getElementById('viewToggle');
const traditionalView = document.getElementById('traditionalView');
const clinicalView = document.getElementById('clinicalView');
const tradLabel = document.getElementById('tradLabel');
const clinLabel = document.getElementById('clinLabel');
let isClinical = false;

toggle.addEventListener('click', () => {
  isClinical = !isClinical;
  
  if (isClinical) {
    toggle.classList.add('clinical');
    traditionalView.style.display = 'none';
    clinicalView.classList.add('active');
    tradLabel.classList.remove('active');
    clinLabel.classList.add('active');
  } else {
    toggle.classList.remove('clinical');
    traditionalView.style.display = 'flex';
    clinicalView.classList.remove('active');
    tradLabel.classList.add('active');
    clinLabel.classList.remove('active');
  }
});

// Chat Input Functionality
const questionInput = document.getElementById('questionInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');
const waveform = document.getElementById('waveform');

const elderResponses = {
  'moringa': 'Ah, Moringa - we call it Zogale. The leaves are dried in shade, never in direct sun. Ground into powder and mixed with kunu or pap. Given to nursing mothers to increase milk, and to children who are weak. My grandmother said it keeps the blood strong...',
  'baobab': 'Baobab fruit, the monkey bread tree! The white pulp inside is mixed with water to make a drink. Very rich, very nourishing. We gave it to children with fever, to travelers for strength. It has a sour taste but great power...',
  'neem': 'Dongoyaro - Neem tree. The leaves are boiled for malaria, for fever. Very bitter, but very effective. We also use the bark. The Fulani people taught us this remedy generations ago...',
  'default': 'That is an important question. In our tradition, we learned that the earth provides remedies for every ailment. The knowledge was passed from grandmother to mother to daughter. Each plant has its spirit, its purpose. Tell me more about what you seek to understand...'
};

function addMessage(text, isUser = true) {
  const messageDiv = document.createElement('div');
  messageDiv.className = isUser ? 'user-message' : 'elder-response';
  
  if (isUser) {
    messageDiv.textContent = text;
  } else {
    messageDiv.innerHTML = `
      <p>${text}</p>
      <div class="audio-waveform active">
        <div class="wave-bar"></div>
        <div class="wave-bar"></div>
        <div class="wave-bar"></div>
        <div class="wave-bar"></div>
        <div class="wave-bar"></div>
      </div>
      <div class="source-tag">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <span>Kano State, Hausa Tradition · Dala District</span>
      </div>
    `;
  }
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleQuestion() {
  const question = questionInput.value.trim().toLowerCase();
  if (!question) return;
  
  addMessage(questionInput.value, true);
  questionInput.value = '';
  
  // Find matching response
  let response = elderResponses.default;
  for (const key in elderResponses) {
    if (question.includes(key)) {
      response = elderResponses[key];
      break;
    }
  }
  
  setTimeout(() => {
    addMessage(response, false);
  }, 1000);
}

sendBtn.addEventListener('click', handleQuestion);
questionInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleQuestion();
});

// Library Filter Functionality
let activeFilter = 'all';
let activeStatus = 'all';

document.querySelectorAll('.practice-item').forEach(item => {
  item.addEventListener('click', function() {
    document.querySelectorAll('.practice-item').forEach(i => {
      if (i !== this) i.classList.remove('open');
    });
    this.classList.toggle('open');
  });
});

function setFilter(tradition) {
  activeFilter = tradition;
  document.querySelectorAll('.filter-group:first-child .pill').forEach(pill => {
    pill.classList.remove('active');
    if (pill.textContent.toLowerCase() === tradition || (tradition === 'all' && pill.textContent === 'All')) {
      pill.classList.add('active');
    }
  });
  applyFilters();
}

function setStatusFilter(status) {
  activeStatus = status;
  document.querySelectorAll('.filter-group:last-child .pill').forEach(pill => {
    pill.classList.remove('active');
    if (pill.textContent.toLowerCase().replace(' ', '') === status || (status === 'all' && pill.textContent === 'All')) {
      pill.classList.add('active');
    }
  });
  applyFilters();
}

function applyFilters() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('.practice-item').forEach(item => {
    const tradition = item.dataset.tradition;
    const status = item.dataset.status;
    const text = item.textContent.toLowerCase();
    
    const matchTradition = activeFilter === 'all' || tradition === activeFilter;
    const matchStatus = activeStatus === 'all' || status === activeStatus;
    const matchSearch = !search || text.includes(search);
    
    item.style.display = (matchTradition && matchStatus && matchSearch) ? 'block' : 'none';
  });
}

document.getElementById('searchInput').addEventListener('input', applyFilters);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Safe scroll animation observer
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target); // Stops watching after animating (better performance)
    }
  });
}, observerOptions);

document.querySelectorAll('.sanctuary-card, .digital-twin, .chat-interface, .practice-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(el);
});
// 🌿 Herb Database & Clinical Updater (keep your existing code here)
  const herbDatabase = { /* ... your data ... */ };

  function updateClinicalView(herbKey) {
    // ... your existing updater logic ...
  }

  // 💬 Chat & Suggestion Chips Logic (keep your existing code here)
  // ...
});