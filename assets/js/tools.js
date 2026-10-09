/* ==========================================================================
   UNG MAN (UNGMAN.SE) – INTERACTIVE TOOLS LOGIC
   Livshjulet Canvas, Budgetkalkylator, Fokusklocka & Checklista
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLivshjulet();
  initBudgetCalculator();
  initFocusClock();
  initChecklist();
});

/* --------------------------------------------------------------------------
   1. LIVSHJULET (CANVAS RADAR / SPIDER CHART)
   -------------------------------------------------------------------------- */
function initLivshjulet() {
  const canvas = document.getElementById('livshjulCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  // Categories config
  const categories = [
    { id: 'skola', name: 'Skola & Kunskap', slider: document.getElementById('sliderSkola'), valEl: document.getElementById('valSkola') },
    { id: 'halsa', name: 'Träning & Fysisk Hälsa', slider: document.getElementById('sliderHalsa'), valEl: document.getElementById('valHalsa') },
    { id: 'mental', name: 'Mental Ro & Balans', slider: document.getElementById('sliderMental'), valEl: document.getElementById('valMental') },
    { id: 'relationer', name: 'Vänner & Relationer', slider: document.getElementById('sliderRelationer'), valEl: document.getElementById('valRelationer') },
    { id: 'ekonomi', name: 'Pengar & Ekonomi', slider: document.getElementById('sliderEkonomi'), valEl: document.getElementById('valEkonomi') },
    { id: 'fritid', name: 'Kreativitet & Fritid', slider: document.getElementById('sliderFritid'), valEl: document.getElementById('valFritid') }
  ];

  // Make canvas high-DPI crisp
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    drawChart();
  }

  function getValues() {
    return categories.map(cat => {
      const val = parseInt(cat.slider ? cat.slider.value : 7, 10);
      if (cat.valEl) cat.valEl.textContent = val;
      return { ...cat, value: val };
    });
  }

  function drawChart() {
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 34;

    ctx.clearRect(0, 0, width, height);

    const data = getValues();
    const numPoints = data.length;
    const angleStep = (Math.PI * 2) / numPoints;

    // 1. Draw concentric background rings (grades 2, 4, 6, 8, 10)
    for (let level = 2; level <= 10; level += 2) {
      const r = (radius / 10) * level;
      ctx.beginPath();
      for (let i = 0; i < numPoints; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = level === 10 ? '#cbd5e1' : '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // 2. Draw spokes from center
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Axis Label
      const labelDistance = radius + 20;
      const labelX = centerX + Math.cos(angle) * labelDistance;
      const labelY = centerY + Math.sin(angle) * labelDistance;
      ctx.font = '600 11px Plus Jakarta Sans, sans-serif';
      ctx.fillStyle = '#475569';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(data[i].name.split('&')[0].trim(), labelX, labelY);
    }

    // 3. Draw polygon for user values
    ctx.beginPath();
    for (let i = 0; i < numPoints; i++) {
      const val = data[i].value;
      const r = (radius / 10) * val;
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();

    // Fill with gradient
    ctx.fillStyle = 'rgba(224, 83, 38, 0.28)';
    ctx.fill();
    ctx.strokeStyle = '#e05326';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw vertex dots
    for (let i = 0; i < numPoints; i++) {
      const val = data[i].value;
      const r = (radius / 10) * val;
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;

      ctx.beginPath();
      ctx.arc(x, y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#e05326';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    updateFeedback(data);
  }

  function updateFeedback(data) {
    const totalScore = data.reduce((acc, curr) => acc + curr.value, 0);
    const maxScore = data.length * 10;
    const percentage = Math.round((totalScore / maxScore) * 100);

    const scoreNumberEl = document.getElementById('wheelScoreNumber');
    const feedbackTextEl = document.getElementById('wheelInsightText');

    if (scoreNumberEl) scoreNumberEl.textContent = `${percentage}%`;

    // Find highest and lowest
    const sorted = [...data].sort((a, b) => a.value - b.value);
    const lowest = sorted[0];
    const highest = sorted[sorted.length - 1];

    let advice = "";
    if (lowest.id === 'skola') {
      advice = `Ditt lägsta område just nu är <strong>${lowest.name}</strong> (${lowest.value}/10). Tips: Testa att dela upp plugget i mindre 25-minuterspass med vår Pomodoro-klocka istället för att skjuta upp det.`;
    } else if (lowest.id === 'halsa') {
      advice = `Ditt lägsta område just nu är <strong>${lowest.name}</strong> (${lowest.value}/10). Tips: Börja med små segrar – gå en 20-minuters promenad utan lurar eller gör 3 gympass i veckan med fokus på basövningar.`;
    } else if (lowest.id === 'mental') {
      advice = `Ditt lägsta område just nu är <strong>${lowest.name}</strong> (${lowest.value}/10). Tips: Mental trötthet beror ofta på skärmtid sent på kvällen och ouppklarade krav. Prata med en vän eller sätt telefonen på 'Stör ej' efter kl 21.`;
    } else if (lowest.id === 'ekonomi') {
      advice = `Ditt lägsta område just nu är <strong>${lowest.name}</strong> (${lowest.value}/10). Tips: Använd vår budgetkalkylator nedan för att se var studiebidraget försvinner. Bara att spara 200 kr/mån ger trygghet.`;
    } else if (lowest.id === 'relationer') {
      advice = `Ditt lägsta område just nu är <strong>${lowest.name}</strong> (${lowest.value}/10). Tips: Hör av dig till en vän du inte pratat med på ett tag och föreslå något enkelt som en promenad eller gympass.`;
    } else {
      advice = `Ditt lägsta område just nu är <strong>${lowest.name}</strong> (${lowest.value}/10). Ge dig själv tid för intressen som inte handlar om prestation.`;
    }

    if (feedbackTextEl) {
      feedbackTextEl.innerHTML = `
        <p style="margin-bottom: 8px;">Din starkaste pelare är <strong>${highest.name}</strong> (${highest.value}/10) – fantastiskt jobb där!</p>
        <p>${advice}</p>
      `;
    }
  }

  // Bind sliders
  categories.forEach(cat => {
    if (cat.slider) {
      cat.slider.addEventListener('input', drawChart);
    }
  });

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
}

/* --------------------------------------------------------------------------
   2. BUDGETKALKYLATOR FÖR UNGA (15–18 ÅR)
   -------------------------------------------------------------------------- */
function initBudgetCalculator() {
  const csnInput = document.getElementById('calcCsn');
  const jobInput = document.getElementById('calcJob');
  const otherIncomeInput = document.getElementById('calcOtherIncome');

  const phoneInput = document.getElementById('calcPhone');
  const gymInput = document.getElementById('calcGym');
  const subsInput = document.getElementById('calcSubs');
  const transitInput = document.getElementById('calcTransit');
  const funInput = document.getElementById('calcFun');
  const savingsInput = document.getElementById('calcSavings');

  if (!csnInput || !phoneInput) return;

  const totalIncomeEl = document.getElementById('calcTotalIncome');
  const totalExpensesEl = document.getElementById('calcTotalExpenses');
  const remainderEl = document.getElementById('calcRemainder');
  const yearlySavingsEl = document.getElementById('calcYearlySavings');
  const korkortMonthsEl = document.getElementById('calcKorkortMonths');
  const korkortProgressBar = document.getElementById('korkortProgressFill');

  function calculate() {
    const csn = parseFloat(csnInput.value) || 0;
    const job = parseFloat(jobInput.value) || 0;
    const otherInc = parseFloat(otherIncomeInput.value) || 0;

    const totalIncome = csn + job + otherInc;

    const phone = parseFloat(phoneInput.value) || 0;
    const gym = parseFloat(gymInput.value) || 0;
    const subs = parseFloat(subsInput.value) || 0;
    const transit = parseFloat(transitInput.value) || 0;
    const fun = parseFloat(funInput.value) || 0;
    const savings = parseFloat(savingsInput.value) || 0;

    const totalExpenses = phone + gym + subs + transit + fun + savings;
    const remainder = totalIncome - totalExpenses;

    if (totalIncomeEl) totalIncomeEl.textContent = `${totalIncome.toLocaleString('sv-SE')} kr`;
    if (totalExpensesEl) totalExpensesEl.textContent = `${totalExpenses.toLocaleString('sv-SE')} kr`;
    
    if (remainderEl) {
      remainderEl.textContent = `${remainder.toLocaleString('sv-SE')} kr`;
      remainderEl.className = 'budget-stat-val ' + (remainder >= 0 ? 'positive' : 'negative');
    }

    const yearlySavings = savings * 12;
    if (yearlySavingsEl) yearlySavingsEl.textContent = `${yearlySavings.toLocaleString('sv-SE')} kr`;

    // Körkort estimation (ca 15 000 kr)
    if (savings > 0) {
      const monthsToKorkort = Math.ceil(15000 / savings);
      if (korkortMonthsEl) korkortMonthsEl.textContent = `${monthsToKorkort} månader`;
      const progressPercent = Math.min(100, Math.round((savings / 1500) * 100));
      if (korkortProgressBar) korkortProgressBar.style.width = `${progressPercent}%`;
    } else {
      if (korkortMonthsEl) korkortMonthsEl.textContent = `Börja spara för prognos`;
      if (korkortProgressBar) korkortProgressBar.style.width = `0%`;
    }
  }

  const allInputs = [csnInput, jobInput, otherIncomeInput, phoneInput, gymInput, subsInput, transitInput, funInput, savingsInput];
  allInputs.forEach(inp => {
    if (inp) inp.addEventListener('input', calculate);
  });

  calculate();
}

/* --------------------------------------------------------------------------
   3. FOKUSKLOCKAN (POMODORO STUDIETIMER)
   -------------------------------------------------------------------------- */
function initFocusClock() {
  const display = document.getElementById('pomodoroTimer');
  const startBtn = document.getElementById('pomodoroStartBtn');
  const resetBtn = document.getElementById('pomodoroResetBtn');
  const modePills = document.querySelectorAll('.mode-pill-btn');
  const statusLbl = document.getElementById('pomodoroStatus');

  if (!display || !startBtn) return;

  let currentMode = 'focus'; // 'focus', 'shortBreak', 'longBreak'
  let durations = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  };

  let timeLeft = durations.focus;
  let timerId = null;
  let isRunning = false;

  function updateDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function playChime() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch (e) {
      // AudioContext not allowed before user gesture
    }
  }

  function tick() {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timerId);
      isRunning = false;
      startBtn.textContent = 'Starta';
      playChime();
      alert(currentMode === 'focus' ? 'Bra jobbat! Dags för 5 minuters paus.' : 'Pausen är slut! Dags att fokusera.');
      timeLeft = durations[currentMode];
      updateDisplay();
    }
  }

  startBtn.addEventListener('click', () => {
    if (isRunning) {
      clearInterval(timerId);
      isRunning = false;
      startBtn.textContent = 'Starta';
    } else {
      isRunning = true;
      startBtn.textContent = 'Pausa';
      timerId = setInterval(tick, 1000);
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      clearInterval(timerId);
      isRunning = false;
      startBtn.textContent = 'Starta';
      timeLeft = durations[currentMode];
      updateDisplay();
    });
  }

  modePills.forEach(pill => {
    pill.addEventListener('click', () => {
      modePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentMode = pill.getAttribute('data-mode');
      clearInterval(timerId);
      isRunning = false;
      startBtn.textContent = 'Starta';
      timeLeft = durations[currentMode];
      if (statusLbl) {
        statusLbl.textContent = currentMode === 'focus' ? 'Fokuspass' : 'Återhämtning';
      }
      updateDisplay();
    });
  });

  updateDisplay();
}

/* --------------------------------------------------------------------------
   4. CHECKLISTA FÖR VUXENLIVET (PERSISTENT I LOCALSTORAGE)
   -------------------------------------------------------------------------- */
function initChecklist() {
  const container = document.getElementById('adulthoodChecklist');
  const progressText = document.getElementById('checklistProgressText');
  const progressBar = document.getElementById('checklistProgressBar');

  if (!container) return;

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem('ungman_checklist') || '{}');
    } catch (e) {
      return {};
    }
  }

  function saveState(state) {
    localStorage.setItem('ungman_checklist', JSON.stringify(state));
  }

  const savedState = loadState();

  const checkboxes = container.querySelectorAll('.checklist-checkbox');

  function updateProgress() {
    const total = checkboxes.length;
    let completed = 0;
    checkboxes.forEach(cb => {
      const item = cb.closest('.checklist-item');
      if (cb.checked) {
        completed++;
        if (item) item.classList.add('completed');
      } else {
        if (item) item.classList.remove('completed');
      }
    });

    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    if (progressText) progressText.textContent = `${completed} av ${total} avklarade (${percent}%)`;
    if (progressBar) progressBar.style.width = `${percent}%`;
  }

  checkboxes.forEach(cb => {
    const id = cb.getAttribute('data-id');
    if (savedState[id]) {
      cb.checked = true;
    }

    cb.addEventListener('change', () => {
      const state = loadState();
      state[id] = cb.checked;
      saveState(state);
      updateProgress();
    });
  });

  updateProgress();
}
