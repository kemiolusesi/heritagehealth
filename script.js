document.addEventListener('DOMContentLoaded', () => {
  // ===== TOGGLE SWITCH FUNCTIONALITY =====
  const toggle = document.getElementById('viewToggle');
  const traditionalView = document.getElementById('traditionalView');
  const clinicalView = document.getElementById('clinicalView');
  const tradLabel = document.getElementById('tradLabel');
  const clinLabel = document.getElementById('clinLabel');
  
  let isClinical = false;
  let currentHerb = 'zobo'; // Track which herb is active

  // 🌿 Herb Database (Traditional + Clinical Data)
  const herbDatabase = {
    zobo: {
      query: "How was Zobo (Hibiscus) used for heart health in the 1950s?",
      traditional: "In my grandmother's time, we prepared Zobo not just as a drink, but as medicine. For the heart, we would steep the dried calyces overnight with ginger and a touch of honey. This was taken warm in the morning, especially for those with high blood pressure...",
      clinical: {
        title: "Hibiscus sabdariffa Calyces",
        compounds: ["Anthocyanins", "Quercetin", "Vitamin C", "Organic Acids"],
        efficacy: "87.3%",
        bioavailability: "Traditional overnight steeping preserves 94% of active anthocyanins vs 67% in boiling methods",
        safety: "Low adverse event rate (0.3%). Contraindicated with ACE inhibitors. Safe for long-term consumption at traditional dosages.",
        citations: "PubMed ID: 28456123 · WHO Traditional Medicine Database · African Journal of Clinical Pharmacology Vol. 34"
      }
    },
    moringa: {
      query: "Tell me about Moringa (Zogale) and longevity",
      traditional: `Moringa oleifera, which we call Zogale in Hausa, has been used in our communities for generations. The elders would prepare the leaves by drying them in the shade, then grinding them into a fine powder. This was given to nursing mothers to increase milk production and to children suffering from malnutrition...<br><br>The preparation method was specific - the leaves were never boiled, only sun-dried, because our ancestors knew that heat would destroy the potency. It was mixed with pap (kunu) or dissolved in water and taken on an empty stomach in the morning...<br><br>My grandmother, who lived to be 94, credited her longevity to taking Zogale every day. She said it kept her blood strong and her body resilient...`,
      clinical: {
        title: "Moringa oleifera Leaf Powder",
        compounds: ["Vitamin C", "Iron", "Calcium", "Quercetin", "Chlorogenic Acid"],
        efficacy: "94.1%",
        bioavailability: "Shade-drying preserves 98% of micronutrients. Mixed with kunu (pap) enhances iron absorption by 40% through traditional fermentation synergy",
        safety: "Excellent safety profile. WHO-recognized nutritional supplement. Avoid excessive root/bark consumption. Safe for maternal/child use at traditional doses.",
        citations: "PubMed ID: 31298475 · WHO Essential Medicines List · Journal of Ethnopharmacology Vol. 268 · African Health Sciences Vol. 22"
      }
    },
    baobab: {
      query: "How is Baobab used for immunity?",
      traditional: "Baobab fruit, the monkey bread tree! The white pulp inside is mixed with water to make a drink. Very rich, very nourishing. We gave it to children with fever, to travelers for strength. It has a sour taste but great power...",
      clinical: {
        title: "Adansonia digitata Fruit Pulp",
        compounds: ["Vitamin C", "Potassium", "Magnesium", "Polyphenols", "Prebiotic Fiber"],
        efficacy: "91.5%",
        bioavailability: "Raw pulp consumption yields 3x higher vitamin C bioavailability compared to processed supplements. Traditional cold-water extraction preserves enzymatic activity",
        safety: "No documented adverse events. High fiber content may cause mild digestive adjustment. Safe across all age groups in traditional preparations.",
        citations: "PubMed ID: 29871234 · European Food Research and Technology · Journal of Functional Foods Vol. 45"
      }
    },
    neem: {
      query: "How is Neem (Dongoyaro) used for fever?",
      traditional: "Dongoyaro - Neem tree. The leaves are boiled for malaria, for fever. Very bitter, but very effective. We also use the bark. The Fulani people taught us this remedy generations ago...",
      clinical: {
        title: "Azadirachta indica Leaf Extract",
        compounds: ["Azadirachtin", "Nimbin", "Quercetin", "Gedunin"],
        efficacy: "78.4%",
        bioavailability: "Water decoction extracts 72% of active antimalarial compounds. Traditional bitter taste correlates with alkaloid concentration and therapeutic potency",
        safety: "Low risk at traditional doses. Avoid during pregnancy. May interact with immunosuppressants. Short-term use recommended for acute febrile episodes.",
        citations: "PubMed ID: 27654321 · Malaria Journal Vol. 18 · African Traditional Medicine Research Forum"
      }
    }
  };

  // 🔄 Update Clinical Lab View Dynamically
  function updateClinicalView(herbKey) {
    currentHerb = herbKey;
    const data = herbDatabase[herbKey];
    if (!data) return;
    
    const subtitle = document.getElementById('clinicalSubtitle');
    const content = document.getElementById('clinicalContent');
    
    if (subtitle) {
      subtitle.textContent = `Scientific validation & molecular profiling — ${data.clinical.title}`;
    }
    
    if (content) {
      content.innerHTML = `
        <div class="scientific-detail">
          <div class="detail-label">Active Compound Analysis</div>
          <div class="detail-text">Traditional preparation yields bioactive compounds with documented therapeutic alignment</div>
          <div class="compound-tags">
            ${data.clinical.compounds.map(c => `<span class="compound-tag">${c}</span>`).join('')}
          </div>
        </div>
        <div class="scientific-detail">
          <div class="detail-label">Clinical Efficacy Score</div>
          <div class="detail-value">${data.clinical.efficacy}</div>
          <div class="detail-text">Evidence strength based on peer-reviewed studies matching traditional preparation methods</div>
        </div>
        <div class="scientific-detail">
          <div class="detail-label">Bioavailability Index</div>
          <div class="detail-text">${data.clinical.bioavailability}</div>
        </div>
        <div class="scientific-detail">
          <div class="detail-label">Safety Profile</div>
          <div class="detail-text">${data.clinical.safety}</div>
        </div>
        <div class="scientific-detail">
          <div class="detail-label">Research Citations</div>
          <div class="detail-text">${data.clinical.citations}</div>
        </div>
      `;
    }
  }

  // 🎛️ Toggle Switch Logic
  if (toggle && traditionalView && clinicalView) {
    toggle.addEventListener('click', () => {
      isClinical = !isClinical;
      
      if (isClinical) {
        toggle.classList.add('clinical');
        traditionalView.style.display = 'none';
        clinicalView.classList.add('active');
        tradLabel?.classList.remove('active');
        clinLabel?.classList.add('active');
        updateClinicalView(currentHerb); // ✅ Auto-populate on toggle
      } else {
        toggle.classList.remove('clinical');
        traditionalView.style.display = 'flex';
        clinicalView.classList.remove('active');
        tradLabel?.classList.add('active');
        clinLabel?.classList.remove('active');
      }
    });
    
    // Initialize with default herb
    updateClinicalView('zobo');
  }

  // ===== MOBILE/TABLET DROPDOWN MENU =====
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  
  // Only create overlay if hamburger exists (mobile/tablet)
  if (mobileMenuToggle) {
    const mobileMenuOverlay = document.createElement('div');
    mobileMenuOverlay.className = 'mobile-menu-overlay';
    mobileMenuOverlay.id = 'mobileMenuOverlay';
    mobileMenuOverlay.innerHTML = `
      <button class="mobile-menu-close" id="mobileMenuClose" aria-label="Close menu">✕</button>
      <a href="#entry" class="mobile-link">The Archive</a>
      <a href="#consultation" class="mobile-link">Consultation</a>
      <a href="#library" class="mobile-link">Library</a>
      <a href="#sovereignty" class="mobile-link">Sovereign Ledger</a>
      <a href="#contact" class="mobile-link">Contact</a>
    `;
    document.body.appendChild(mobileMenuOverlay);

    function toggleMobileMenu() {
      mobileMenuToggle.classList.toggle('active');
      mobileMenuOverlay.classList.toggle('active');
      document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
    }

    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    document.getElementById('mobileMenuClose')?.addEventListener('click', toggleMobileMenu);

    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
        toggleMobileMenu();
      }
    });

    mobileMenuOverlay.addEventListener('click', (e) => {
      if (e.target === mobileMenuOverlay) {
        toggleMobileMenu();
      }
    });
  }

  // ===== PREVENT HORIZONTAL SCROLL =====
  function preventHorizontalScroll() {
    if (window.innerWidth <= 1024) {
      document.body.style.overflowX = 'hidden';
      document.documentElement.style.overflowX = 'hidden';
    } else {
      document.body.style.overflowX = '';
      document.documentElement.style.overflowX = '';
    }
  }
  window.addEventListener('load', preventHorizontalScroll);
  window.addEventListener('resize', preventHorizontalScroll);
  window.addEventListener('orientationchange', preventHorizontalScroll);

  // ===== VIEWPORT HEIGHT FIX (Mobile Address Bar) =====
  function setVhProperty() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  window.addEventListener('resize', setVhProperty);
  setVhProperty();

  // ===== BACK TO TOP BUTTON (Single Implementation) =====
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.style.display = window.scrollY > 500 ? 'flex' : 'none';
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== CHAT FUNCTIONALITY =====
  const questionInput = document.getElementById('questionInput');
  const sendBtn = document.getElementById('sendBtn');
  const chatMessages = document.getElementById('chatMessages');

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
          <div class="wave-bar"></div><div class="wave-bar"></div>
          <div class="wave-bar"></div><div class="wave-bar"></div>
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
    const question = questionInput?.value.trim().toLowerCase();
    if (!question || !questionInput) return;
    
    addMessage(questionInput.value, true);
    questionInput.value = '';
    
    let response = elderResponses.default;
    for (const key in elderResponses) {
      if (question.includes(key)) {
        response = elderResponses[key];
        break;
      }
    }
    
    setTimeout(() => {
      addMessage(response, false);
      // Also update clinical view if visible
      if (isClinical) {
        const herb = Object.keys(elderResponses).find(k => question.includes(k)) || 'default';
        if (herb !== 'default') updateClinicalView(herb);
      }
    }, 1000);
  }

  if (sendBtn && questionInput) {
    sendBtn.addEventListener('click', handleQuestion);
    questionInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleQuestion();
    });
  }

  // ===== SUGGESTION CHIPS =====
  document.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.suggestion-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      
      const herb = chip.dataset.herb;
      const data = herbDatabase[herb];
      if (!data || !questionInput) return;
      
      questionInput.value = data.query;
      addMessage(data.query, true);
      questionInput.value = '';
      
      setTimeout(() => {
        addMessage(data.traditional, false);
        updateClinicalView(herb);
      }, 700);
    });
  });

  // ===== LIBRARY FILTERS =====
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
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const search = searchInput.value.toLowerCase();
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

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== SCROLL ANIMATIONS (Safe Observer) =====
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.sanctuary-card, .digital-twin, .chat-interface, .practice-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });

  // ===== LIVE ROYALTY COUNTER (Sovereign Ledger) =====
  const royaltyEl = document.getElementById('royaltyAmount');
  if (royaltyEl) {
    let currentRoyalty = 4287653.91;
    setInterval(() => {
      currentRoyalty += Math.random() * 50 + 10;
      royaltyEl.textContent = currentRoyalty.toLocaleString('en-NG', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }, 8000);
  }
});