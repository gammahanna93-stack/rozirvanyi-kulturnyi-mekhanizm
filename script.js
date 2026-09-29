(() => {
  "use strict";

  const slideTitles = [
    "Обкладинка",
    "Пригадаємо лекцію",
    "Розігрів",
    "Тренувальний кейс",
    "Зламай механізм",
    "Ваше завдання",
    "Вибір кейсу",
    "Власна позиція",
    "Побудуйте механізм",
    "Невидимі умови",
    "Картка-зміна",
    "Що зламалося?",
    "Ремонт механізму",
    "Захист",
    "Перехресне питання",
    "Exit ticket",
    "Фінал"
  ];

  const teacherNotes = [
    {
      time: "0–1 хв",
      questions: "Яку проблему обіцяє назва «розірваний механізм»?",
      directions: "Не просіть визначення. Достатньо первинної гіпотези: щось між цінністю та дією не спрацьовує.",
      silence: "Попросіть назвати будь-який приклад, коли люди підтримують ідею, але діють інакше.",
      takeaway: "Сьогодні аналізуємо не окремі цінності, а причинні зв’язки між ними й поведінкою."
    },
    {
      time: "1–4 хв",
      questions: "Який перехід у ланцюгу здається найбільш автоматичним?",
      directions: "Студенти можуть назвати перехід від цінності до норми або від інституції до поведінки.",
      silence: "Відкривайте по одному вузлу й просіть коротко передбачити наступний.",
      takeaway: "Наявність цінності ще не гарантує відповідної поведінки."
    },
    {
      time: "4–6 хв",
      questions: "Яку з названих цінностей найважче перетворити на регулярну дію?",
      directions: "Шукайте різницю між декларуванням і практикою, а не моральну оцінку людей.",
      silence: "Відкрийте «здоров’я» або «чесність» і попросіть навести одну невідповідну дію.",
      takeaway: "Між цінністю й поведінкою працюють норми, практики, інституції та стимули."
    },
    {
      time: "6–13 хв",
      questions: "Чому саме цей крок веде до наступного? Який перехід тут найслабший?",
      directions: "Смисл — реальність результату; цінності — чесність, справедливість, довіра; далі — норма, практика й інституційна підтримка.",
      silence: "Запитайте: що має робити студент, а що має робити університет?",
      takeaway: "Повний ланцюг пояснює поведінку краще, ніж сама декларація цінності."
    },
    {
      time: "13–16 хв",
      questions: "Що зміниться першим, якщо правило ніхто не перевіряє?",
      directions: "Норма може лишитися формально, але практика виконання й очікувана поведінка слабшають.",
      silence: "Попросіть порівняти дві ситуації: правило існує і правило реально застосовують.",
      takeaway: "Цінність може зберегтися, коли механізм її реалізації вже не працює."
    },
    {
      time: "16–18 хв",
      questions: "Чим причинне пояснення відрізняється від списку правильних слів?",
      directions: "Причинне пояснення описує, за яких умов один вузол породжує наступний.",
      silence: "Попросіть завершити фразу: «Ця норма змінює практику, тому що…»",
      takeaway: "Оцінюються стрілки й механізми, а не вгадування термінів."
    },
    {
      time: "18–20 хв",
      questions: "У чому центральний конфлікт вашого кейсу? Хто може мати іншу позицію?",
      directions: "Розподіліть A–F. Не давайте групам готового ланцюга й не називайте єдиної правильної відповіді.",
      silence: "Попросіть кожну групу прочитати вголос лише конфлікт своєї картки.",
      takeaway: "Кожен кейс має кілька можливих механізмів і ризиків.",
      example: true
    },
    {
      time: "20–25 хв",
      questions: "Хто може розуміти ту саму практику інакше?",
      directions: "Приймайте короткі первинні відповіді. Важливо зафіксувати їх до групового узгодження.",
      silence: "Запропонуйте почати з конфлікту на картці й назвати сторону, яка може не погодитися.",
      takeaway: "Початкова особиста позиція має залишитися видимою для подальшої ревізії."
    },
    {
      time: "25–40 хв",
      questions: "Чому ваша цінність стає правилом? Хто й як підтримує практику?",
      directions: "Вимагайте шість пояснених переходів, а не сім заповнених комірок.",
      silence: "Оберіть одну стрілку й запитайте: який доказ у кейсі дає право її провести?",
      takeaway: "Механізм — це система умовних причинних переходів."
    },
    {
      time: "40–45 хв",
      questions: "Без якого ресурсу, правила або носія ваша схема перестане працювати?",
      directions: "Група має додати ресурси, право, комунікацію, матеріальний носій і можливе виключення.",
      silence: "Запитайте окремо: хто платить, хто вирішує і кого не чути?",
      takeaway: "Невидимі умови визначають стійкість культурного механізму."
    },
    {
      time: "45–47 хв",
      questions: "Яке ваше перше передбачення: що змінить ця подія?",
      directions: "Відкрийте тільки одну картку З1–З6. Не дозволяйте одразу переписувати початкову карту.",
      silence: "Попросіть спершу назвати один вузол або одну стрілку, яка зазнає тиску.",
      takeaway: "Нова інформація перевіряє модель, а не просто додається до неї."
    },
    {
      time: "47–55 хв",
      questions: "Подія змінила вузол чи зв’язок між вузлами?",
      directions: "Заохочуйте позначити конкретні стрілки. Зміна одного елемента не обов’язково руйнує всю систему.",
      silence: "Пройдіть шість діагностичних питань по черзі й відмітьте лише ті, де відповідь «так».",
      takeaway: "Точна локалізація розриву передує ремонту."
    },
    {
      time: "55–67 хв",
      questions: "Які три зміни є мінімально достатніми? Який ризик вони створюють?",
      directions: "Не дозволяйте перебудовувати все. Кожна зміна має формат «було → стало → чому».",
      silence: "Запропонуйте спочатку відремонтувати найслабшу стрілку, а потім перевірити наслідки далі по ланцюгу.",
      takeaway: "Сильна ревізія є обмеженою, причинною й поясненою."
    },
    {
      time: "67–79 хв",
      questions: "Яка стрілка у вашій моделі найслабша? За якої умови вона працює?",
      directions: "Тримайте групи у шаблоні: цінність, механізм, зміна, ремонт, ризик.",
      silence: "Попросіть назвати лише одну ключову стрілку й один ризик — це запускає весь захист.",
      takeaway: "Захист демонструє причинність і межі рішення, а не повноту переказу."
    },
    {
      time: "79–83 хв",
      questions: "Яка можлива відповідь зробить пояснення іншої групи слабшим?",
      directions: "Питання має перевіряти причинний механізм конкурентним поясненням або новими даними.",
      silence: "Дайте рамку: «Що станеться з вашим поясненням, якщо…?»",
      takeaway: "Перехресне питання має бути потенційно спростовувальним."
    },
    {
      time: "83–90 хв",
      questions: "Який зв’язок ви вважали автоматичним на початку?",
      directions: "Відповідь особиста, 90–120 слів. Вона має назвати доказ або питання, що змінили пояснення.",
      silence: "Попросіть повернутися до першого запису й знайти одне слово або стрілку, які тепер потребують умови.",
      takeaway: "Результат заняття — видима й аргументована зміна власної моделі."
    },
    {
      time: "Після 90 хв",
      questions: "Де саме може зламатися культурний механізм?",
      directions: "Прийміть кілька різних відповідей: норма, практика, ресурси, інституційні стимули або зворотний зв’язок.",
      silence: "Поверніться до однієї картки-зміни й попросіть назвати лише місце розриву.",
      takeaway: "Культурний механізм потрібно не назвати — його потрібно пояснити."
    }
  ];

  const caseData = {
    A: {
      title: "Борщ як спадщина",
      situation: "Родинна практика стає публічним символом; з’являються фестиваль, сертифікація та комерційні бренди.",
      conflict: "Хто має право визначати «автентичність» і отримувати дохід?"
    },
    B: {
      title: "Громадська цифрова бібліотека",
      situation: "Волонтери оцифровують локальні архіви; платформа пропонує монетизацію.",
      conflict: "Як поєднати доступ, авторські права, оплату праці й пам’ять?"
    },
    C: {
      title: "Меморіальний день громади",
      situation: "Приватна скорбота переходить у шкільний календар і міський ритуал.",
      conflict: "Коли вшанування стає нормою, а коли — примусом до єдиної пам’яті?"
    },
    D: {
      title: "Мовна норма онлайн-спільноти",
      situation: "Неформальне правило переходить у модераційну політику та систему санкцій.",
      conflict: "Як норма змінює поведінку й хто контролює її виконання?"
    },
    E: {
      title: "Ремісничий фестиваль",
      situation: "Уміння майстрів стає туристичним продуктом і предметом грантової підтримки.",
      conflict: "Хто фінансує передавання знань і як не перетворити носіїв на декорацію?"
    },
    F: {
      title: "Шкільний кодекс взаємоповаги",
      situation: "Цінність безпеки формалізують у правила, процедуру скарг і практики відновлення.",
      conflict: "Чи може добра цінність породити надмірний контроль?"
    }
  };

  const trainingSteps = [
    {
      label: "Смисл",
      question: "Який тут смисл?",
      answer: "Результат навчання повинен відображати реальні знання та роботу студента.",
      short: "Реальні знання й власна робота"
    },
    {
      label: "Цінність",
      question: "Яка цінність?",
      answer: "Чесність · справедливість · довіра.",
      short: "Чесність · справедливість · довіра"
    },
    {
      label: "Норма",
      question: "Яка норма виникає?",
      answer: "Не видавати чужу роботу за власну.",
      short: "Не видавати чужу роботу за власну"
    },
    {
      label: "Практика",
      question: "Які практики підтримують норму?",
      answer: "Самостійне виконання · цитування · перевірка джерел · декларування використання ШІ.",
      short: "Виконання · цитування · перевірка · декларація ШІ"
    },
    {
      label: "Інституція",
      question: "Яка інституція підтримує ці практики?",
      answer: "Університет · правила академічної доброчесності · оцінювання · процедури перевірки.",
      short: "Університет · правила · оцінювання · перевірка"
    },
    {
      label: "Поведінка",
      question: "Яку поведінку очікуємо?",
      answer: "Студент самостійно виконує роботу, цитує джерела й декларує використання ШІ.",
      short: "Власна робота · цитування · прозорість"
    }
  ];

  const slides = [...document.querySelectorAll(".slide")];
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const slideCounter = document.getElementById("slideCounter");
  const slideTitle = document.getElementById("slideTitle");
  const deckProgress = document.getElementById("deckProgress");
  let currentIndex = 0;
  let toastTimer = null;

  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }

  function updateTeacherPanel() {
    const note = teacherNotes[currentIndex];
    document.getElementById("teacherStage").textContent = `Екран ${currentIndex + 1} · ${slideTitles[currentIndex]}`;
    document.getElementById("teacherTime").textContent = note.time;
    document.getElementById("teacherQuestions").textContent = note.questions;
    document.getElementById("teacherDirections").textContent = note.directions;
    document.getElementById("teacherSilence").textContent = note.silence;
    document.getElementById("teacherTakeaway").textContent = note.takeaway;
    const example = document.getElementById("teacherExample");
    example.classList.toggle("is-hidden", !note.example);
    if (note.example) {
      document.getElementById("teacherExampleBody").innerHTML = [
        "<p><strong>Смисл:</strong> зв’язок поколінь / культурна приналежність.</p>",
        "<p><strong>Цінність:</strong> культурна спадщина / пам’ять / передавання знання.</p>",
        "<p><strong>Норма:</strong> практику варто зберігати та передавати.</p>",
        "<p><strong>Практика:</strong> приготування, навчання, фестивалі, публічна репрезентація.</p>",
        "<p><strong>Інституція:</strong> громада, культурні організації, механізми охорони спадщини, фестивальні структури.</p>",
        "<p><strong>Поведінка:</strong> участь, передавання рецептурних знань, споживання, популяризація.</p>",
        "<p><strong>Можливий ризик:</strong> комерціалізація, монополізація поняття «автентичності», виключення частини носіїв.</p>",
        "<p><em>Це лише викладацький орієнтир, а не єдина правильна відповідь.</em></p>"
      ].join("");
    }
  }

  function showSlide(index, updateHash = true) {
    const nextIndex = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === nextIndex);
      slide.classList.toggle("is-before", i < nextIndex);
      slide.setAttribute("aria-hidden", i === nextIndex ? "false" : "true");
    });
    currentIndex = nextIndex;
    slideCounter.textContent = `${currentIndex + 1} / ${slides.length}`;
    slideTitle.textContent = slideTitles[currentIndex];
    deckProgress.style.width = `${((currentIndex + 1) / slides.length) * 100}%`;
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === slides.length - 1;
    updateTeacherPanel();
    updateOverviewCurrent();
    if (updateHash) history.replaceState(null, "", `#screen-${currentIndex + 1}`);
    document.title = `${slideTitles[currentIndex]} — Розірваний культурний механізм`;
  }

  prevButton.addEventListener("click", () => showSlide(currentIndex - 1));
  nextButton.addEventListener("click", () => showSlide(currentIndex + 1));
  document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => showSlide(Number(button.dataset.go) - 1));
  });

  /* Screen 2: progressive lecture chain */
  const lectureNodes = [...document.querySelectorAll("#lectureChain .chain-node")];
  const lectureArrows = [...document.querySelectorAll("#lectureChain .chain-arrow")];
  const lectureNext = document.getElementById("lectureNext");
  let lectureStep = 0;

  lectureNext.addEventListener("click", () => {
    if (lectureStep > 0) lectureArrows[lectureStep - 1]?.classList.add("is-visible");
    lectureNodes[lectureStep]?.classList.add("is-visible");
    lectureStep += 1;
    if (lectureStep >= lectureNodes.length) {
      lectureNext.classList.add("is-hidden");
      document.getElementById("lectureQuestion").classList.remove("is-hidden");
    } else {
      lectureNext.textContent = `Показати: ${lectureNodes[lectureStep].textContent}`;
    }
  });

  document.querySelectorAll("[data-lecture-choice]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-lecture-choice]").forEach(item => item.classList.toggle("is-selected", item === button));
      document.getElementById("lectureVerdict").classList.remove("is-hidden");
    });
  });

  /* Screen 3: warm-up examples */
  const valueButtons = [...document.querySelectorAll(".flip-value")];
  valueButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (button.classList.contains("is-open")) return;
      button.classList.add("is-open");
      button.querySelector("strong").textContent = button.dataset.value;
      if (valueButtons.some(item => item.classList.contains("is-open"))) {
        document.getElementById("warmupFooter").classList.remove("is-hidden");
      }
    });
  });
  document.getElementById("warmupQuestionButton").addEventListener("click", () => {
    document.getElementById("warmupQuestion").classList.remove("is-hidden");
  });

  /* Screen 4: training case */
  const trainingSlots = document.getElementById("trainingSlots");
  trainingSteps.forEach(step => {
    const slot = document.createElement("div");
    slot.className = "training-slot";
    slot.innerHTML = `<span>${step.label}</span><strong>—</strong>`;
    trainingSlots.appendChild(slot);
  });
  let trainingIndex = 0;
  const trainingReveal = document.getElementById("trainingReveal");
  const trainingContinue = document.getElementById("trainingContinue");

  function renderTrainingQuestion() {
    const step = trainingSteps[trainingIndex];
    document.getElementById("trainingStepLabel").textContent = `Питання ${trainingIndex + 1} із ${trainingSteps.length}`;
    document.getElementById("trainingQuestion").textContent = step.question;
    document.getElementById("trainingAnswer").classList.add("is-hidden");
    document.getElementById("trainingAnswer").textContent = "";
    trainingReveal.classList.remove("is-hidden");
    trainingContinue.classList.add("is-hidden");
  }

  trainingReveal.addEventListener("click", () => {
    const step = trainingSteps[trainingIndex];
    const answer = document.getElementById("trainingAnswer");
    answer.textContent = step.answer;
    answer.classList.remove("is-hidden");
    const slot = trainingSlots.children[trainingIndex];
    slot.querySelector("strong").textContent = step.short;
    slot.classList.add("is-filled");
    document.getElementById("trainingProgress").textContent = `${trainingIndex + 1} / ${trainingSteps.length}`;
    trainingReveal.classList.add("is-hidden");
    if (trainingIndex < trainingSteps.length - 1) {
      trainingContinue.classList.remove("is-hidden");
    } else {
      const final = document.getElementById("trainingFinal");
      final.innerHTML = trainingSteps.map((item, i) => `${i ? "<b>→</b>" : ""}<span>${item.label}<br>${item.short}</span>`).join("");
      final.classList.remove("is-hidden");
      showToast("Повний ланцюг відкрито");
    }
  });

  trainingContinue.addEventListener("click", () => {
    trainingIndex += 1;
    renderTrainingQuestion();
  });

  /* Screen 5: rupture */
  document.querySelectorAll("#integrityMechanism .mechanism-node").forEach(node => {
    node.addEventListener("click", () => node.classList.toggle("is-selected"));
  });
  document.getElementById("changeCondition").addEventListener("click", event => {
    document.getElementById("ruptureReveal").classList.remove("is-hidden");
    event.currentTarget.classList.add("is-hidden");
  });
  document.getElementById("highlightWeak").addEventListener("click", () => {
    ["norm", "practice", "behavior"].forEach(name => {
      document.querySelector(`#integrityMechanism [data-node="${name}"]`).classList.add("is-weak");
    });
    const arrows = document.querySelectorAll("#integrityMechanism .mechanism-arrow");
    arrows[2]?.classList.add("is-weak");
    arrows[3]?.classList.add("is-weak");
    document.getElementById("ruptureConclusion").classList.remove("is-hidden");
  });

  /* Case modal */
  const caseModal = document.getElementById("caseModal");
  let lastCaseTrigger = null;

  function openCase(code, trigger) {
    const data = caseData[code];
    lastCaseTrigger = trigger;
    document.getElementById("caseModalCode").textContent = code;
    document.getElementById("caseModalTitle").textContent = data.title;
    document.getElementById("caseModalSituation").textContent = data.situation;
    document.getElementById("caseModalConflict").textContent = data.conflict;
    caseModal.querySelector(".modal__card").dataset.letter = code;
    caseModal.classList.add("is-open");
    caseModal.setAttribute("aria-hidden", "false");
    caseModal.querySelector(".modal__close").focus();
  }

  function closeCase() {
    caseModal.classList.remove("is-open");
    caseModal.setAttribute("aria-hidden", "true");
    lastCaseTrigger?.focus();
  }

  document.querySelectorAll("[data-case]").forEach(button => {
    button.addEventListener("click", () => openCase(button.dataset.case, button));
  });
  document.querySelectorAll("[data-close-case]").forEach(button => button.addEventListener("click", closeCase));

  /* Timers */
  const timerStates = new WeakMap();

  function formatTime(seconds) {
    const safe = Math.max(0, Math.ceil(seconds));
    return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
  }

  function paintTimer(timer, state) {
    timer.querySelector(".timer__display").textContent = formatTime(state.remaining);
    const track = timer.querySelector(".timer__track i");
    if (track) track.style.width = `${(state.remaining / state.duration) * 100}%`;
    timer.classList.toggle("is-running", Boolean(state.interval));
  }

  function pauseTimer(timer) {
    const state = timerStates.get(timer);
    if (!state.interval) return;
    state.remaining = Math.max(0, Math.ceil((state.endsAt - Date.now()) / 1000));
    window.clearInterval(state.interval);
    state.interval = null;
    paintTimer(timer, state);
  }

  function tickTimer(timer) {
    const state = timerStates.get(timer);
    state.remaining = Math.max(0, Math.ceil((state.endsAt - Date.now()) / 1000));
    paintTimer(timer, state);
    if (state.remaining === 0) {
      window.clearInterval(state.interval);
      state.interval = null;
      timer.classList.add("is-finished");
      window.setTimeout(() => timer.classList.remove("is-finished"), 1900);
      showToast("Час завершився");
    }
  }

  function startTimer(timer) {
    const state = timerStates.get(timer);
    if (state.interval) return;
    if (state.remaining <= 0) state.remaining = state.duration;
    state.endsAt = Date.now() + state.remaining * 1000;
    state.interval = window.setInterval(() => tickTimer(timer), 250);
    paintTimer(timer, state);
  }

  function resetTimer(timer) {
    const state = timerStates.get(timer);
    if (state.interval) window.clearInterval(state.interval);
    state.interval = null;
    state.remaining = state.duration;
    timer.classList.remove("is-finished");
    paintTimer(timer, state);
  }

  document.querySelectorAll("[data-timer]").forEach(timer => {
    const duration = Number(timer.dataset.timer);
    const state = { duration, remaining: duration, interval: null, endsAt: 0 };
    timerStates.set(timer, state);
    paintTimer(timer, state);
    timer.querySelectorAll("[data-timer-action]").forEach(button => {
      button.addEventListener("click", () => {
        const action = button.dataset.timerAction;
        if (action === "start") startTimer(timer);
        if (action === "pause") pauseTimer(timer);
        if (action === "reset") resetTimer(timer);
      });
    });
  });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      document.querySelectorAll("[data-timer]").forEach(timer => {
        const state = timerStates.get(timer);
        if (state.interval) tickTimer(timer);
      });
    }
  });

  /* Screens 10–12 */
  document.querySelectorAll("#conditionGrid button").forEach(button => {
    button.addEventListener("click", () => button.classList.toggle("is-selected"));
  });

  document.getElementById("openChanges").addEventListener("click", () => {
    document.getElementById("shockIntro").classList.add("is-hidden");
    document.getElementById("changeStage").classList.remove("is-hidden");
  });

  document.querySelectorAll(".change-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".change-card").forEach(item => {
        item.classList.remove("is-open");
        item.querySelector("span").textContent = item.dataset.change;
        item.querySelector("small").textContent = "Відкрити картку";
      });
      card.classList.add("is-open");
      card.querySelector("span").textContent = card.dataset.change;
      card.querySelector("small").textContent = card.dataset.text;
    });
  });

  document.querySelectorAll("#breakChain button").forEach(button => {
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      const broken = button.classList.toggle("is-broken");
      button.setAttribute("aria-pressed", String(broken));
    });
  });

  /* Screens 15 and 17 */
  document.getElementById("crossReveal").addEventListener("click", event => {
    document.getElementById("crossExample").classList.remove("is-hidden");
    event.currentTarget.classList.add("is-hidden");
  });

  let finalStep = 0;
  document.getElementById("finalReveal").addEventListener("click", event => {
    const equationItems = document.querySelectorAll("#finalEquation > *");
    finalStep += 1;
    if (finalStep === 1) equationItems[1].classList.remove("is-hidden");
    if (finalStep === 2) equationItems[2].classList.remove("is-hidden");
    if (finalStep === 3) {
      const chain = document.getElementById("finalChain");
      chain.classList.remove("is-hidden");
      chain.classList.add("is-sequencing");
      event.currentTarget.classList.add("is-hidden");
      window.setTimeout(() => {
        document.getElementById("finalStatement").classList.remove("is-hidden");
        document.getElementById("finalQuestion").classList.remove("is-hidden");
      }, 850);
    }
  });

  /* Teacher panel */
  const teacherPanel = document.getElementById("teacherPanel");
  const teacherButton = document.getElementById("teacherButton");
  const teacherScrim = document.getElementById("teacherScrim");

  function toggleTeacher(force) {
    const open = typeof force === "boolean" ? force : !teacherPanel.classList.contains("is-open");
    teacherPanel.classList.toggle("is-open", open);
    teacherScrim.classList.toggle("is-open", open);
    teacherPanel.setAttribute("aria-hidden", String(!open));
    teacherButton.setAttribute("aria-expanded", String(open));
    if (open) teacherPanel.querySelector("#teacherClose").focus();
    else teacherButton.focus();
  }

  teacherButton.addEventListener("click", () => toggleTeacher());
  document.getElementById("teacherClose").addEventListener("click", () => toggleTeacher(false));
  teacherScrim.addEventListener("click", () => toggleTeacher(false));

  /* Overview */
  const overview = document.getElementById("overview");
  const overviewGrid = document.getElementById("overviewGrid");
  slideTitles.forEach((title, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><strong>${title}</strong>`;
    button.addEventListener("click", () => {
      closeOverview();
      showSlide(index);
    });
    overviewGrid.appendChild(button);
  });

  function updateOverviewCurrent() {
    [...overviewGrid.children].forEach((button, index) => button.classList.toggle("is-current", index === currentIndex));
  }

  function openOverview() {
    overview.classList.add("is-open");
    overview.setAttribute("aria-hidden", "false");
    updateOverviewCurrent();
    document.getElementById("overviewClose").focus();
  }

  function closeOverview() {
    overview.classList.remove("is-open");
    overview.setAttribute("aria-hidden", "true");
    document.getElementById("overviewButton").focus();
  }

  document.getElementById("overviewButton").addEventListener("click", openOverview);
  document.getElementById("overviewClose").addEventListener("click", closeOverview);
  overview.addEventListener("click", event => {
    if (event.target === overview) closeOverview();
  });

  let fallbackFullscreen = false;

  function setPresentationFallback(active) {
    fallbackFullscreen = active;
    document.body.classList.toggle("is-presentation-mode", active);
    document.getElementById("fullscreenButton").setAttribute("aria-pressed", String(active));
    showToast(active ? "Презентаційний режим увімкнено" : "Презентаційний режим вимкнено");
  }

  function toggleFullscreen() {
    if (fallbackFullscreen) {
      setPresentationFallback(false);
      return;
    }
    const root = document.documentElement;
    const activeFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    const requestFullscreen = root.requestFullscreen || root.webkitRequestFullscreen || root.msRequestFullscreen;
    const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;

    if (requestFullscreen) {
      if (!activeFullscreen) {
        const result = requestFullscreen.call(root);
        result?.catch(() => setPresentationFallback(true));
        window.setTimeout(() => {
          const entered = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
          if (!entered && !fallbackFullscreen) setPresentationFallback(true);
        }, 450);
      } else {
        exitFullscreen?.call(document);
      }
      return;
    }

    setPresentationFallback(!fallbackFullscreen);
  }

  document.getElementById("fullscreenButton").addEventListener("click", toggleFullscreen);
  document.addEventListener("fullscreenchange", () => {
    document.getElementById("fullscreenButton").setAttribute("aria-pressed", String(Boolean(document.fullscreenElement)));
  });

  function contextualSpaceAction() {
    const slideNumber = currentIndex + 1;
    if (slideNumber === 1) return document.querySelector('[data-go="2"]').click();
    if (slideNumber === 2 && !lectureNext.classList.contains("is-hidden")) return lectureNext.click();
    if (slideNumber === 3) {
      const unopened = valueButtons.find(button => !button.classList.contains("is-open"));
      if (unopened) return unopened.click();
      if (document.getElementById("warmupQuestion").classList.contains("is-hidden")) return document.getElementById("warmupQuestionButton").click();
    }
    if (slideNumber === 4) {
      if (!trainingReveal.classList.contains("is-hidden")) return trainingReveal.click();
      if (!trainingContinue.classList.contains("is-hidden")) return trainingContinue.click();
    }
    if (slideNumber === 5) {
      const changeButton = document.getElementById("changeCondition");
      if (!changeButton.classList.contains("is-hidden")) return changeButton.click();
      if (document.getElementById("ruptureConclusion").classList.contains("is-hidden")) return document.getElementById("highlightWeak").click();
    }
    if ([8, 9, 13, 14, 16].includes(slideNumber)) {
      const timer = slides[currentIndex].querySelector("[data-timer]");
      if (timer) return startTimer(timer);
    }
    if (slideNumber === 11 && !document.getElementById("openChanges").closest(".shock-intro").classList.contains("is-hidden")) return document.getElementById("openChanges").click();
    if (slideNumber === 15 && !document.getElementById("crossReveal").classList.contains("is-hidden")) return document.getElementById("crossReveal").click();
    if (slideNumber === 17 && !document.getElementById("finalReveal").classList.contains("is-hidden")) return document.getElementById("finalReveal").click();
    if (currentIndex < slides.length - 1) showSlide(currentIndex + 1);
  }

  document.addEventListener("keydown", event => {
    const interactive = event.target.closest("button, a, input, textarea, select, [contenteditable='true']");
    const typingTarget = event.target.closest("input, textarea, select, [contenteditable='true']");
    if (event.key === "Escape") {
      if (caseModal.classList.contains("is-open")) closeCase();
      else if (overview.classList.contains("is-open")) closeOverview();
      else if (teacherPanel.classList.contains("is-open")) toggleTeacher(false);
      return;
    }
    if (event.key.toLowerCase() === "f" && !typingTarget) {
      event.preventDefault();
      toggleFullscreen();
      return;
    }
    if (event.key.toLowerCase() === "t" && !typingTarget) {
      event.preventDefault();
      toggleTeacher();
      return;
    }
    if (caseModal.classList.contains("is-open") || overview.classList.contains("is-open") || teacherPanel.classList.contains("is-open")) return;
    if (event.key === "ArrowLeft" && !typingTarget) {
      event.preventDefault();
      showSlide(currentIndex - 1);
    }
    if (event.key === "ArrowRight" && !typingTarget) {
      event.preventDefault();
      showSlide(currentIndex + 1);
    }
    if (event.code === "Space" && !interactive) {
      event.preventDefault();
      contextualSpaceAction();
    }
  });

  const hashMatch = location.hash.match(/screen-(\d+)/);
  if (hashMatch) currentIndex = Math.max(0, Math.min(slides.length - 1, Number(hashMatch[1]) - 1));
  renderTrainingQuestion();
  showSlide(currentIndex, false);
})();
