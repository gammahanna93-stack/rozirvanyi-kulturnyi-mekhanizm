(function(){
  'use strict';

  const definitions={
    q1:{mission:1,title:'Спостереження за артефактом',correct:'visible',correctLabel:'На поверхні повторюються темні криволінійні смуги.',explanation:'Це опис видимої ознаки. Він не приписує майстрам намірів і не перекладає мотив без додаткових джерел.'},
    q2:{mission:1,title:'Рівень доказовості',correct:'interpretation',correctLabel:'Інтерпретація / гіпотеза',explanation:'Релігійне значення не можна побачити безпосередньо. Його обґрунтовують через контекст знахідки, порівняння та інші джерела.'},
    q3:{mission:2,title:'Тип симетрії',correct:'rotate90',correctLabel:'Обертання на 90°',explanation:'Після повороту на чверть кола чотири однакові елементи займають місця один одного, а загальний контур не змінюється.'},
    q4:{mission:2,title:'Кількість повторів',correct:'4',correctLabel:'4 елементи',explanation:'Навколо центра розміщено чотири еквівалентні модулі. Це і створює обертальну симетрію четвертого порядку.'},
    q5:{mission:3,title:'Відновлення фрагмента',correct:'b',correctLabel:'Фрагмент B',explanation:'Послідовність чергується A–B–A–B–A–B. Варіант B відновлює правило без додаткових припущень.'},
    q6:{mission:3,title:'Статус реконструкції',correct:'plausible',correctLabel:'Обґрунтований, але перевірний варіант',explanation:'Повторюваність робить реконструкцію вірогідною, однак відсутній фрагмент не можна перетворити на абсолютну певність.'},
    q7:{mission:4,title:'Технологічне зіставлення',correct:'paint|cord|roll',correctLabel:'Трипілля — фарбування; Дзьомон — відтискування; Месопотамія — прокатування печатки',explanation:'Різні операції залишають різний матеріальний слід: колір, фактурний відтиск або безперервне зображення від циліндра.'},
    q8:{mission:4,title:'Технологія та інституції',correct:'coordination',correctLabel:'Техніки могли підтримувати навчання, впізнавання та узгоджені правила.',explanation:'Стабільна техніка потребує передачі навички й повторюваних процедур. Це не тотожне державі, але є формою соціальної координації.'},
    q9:{mission:5,title:'Пастка прямої спадкоємності',correct:'no',correctLabel:'Потрібен ланцюг історичних і контекстуальних доказів.',explanation:'Схожі геометричні рішення можуть виникати незалежно. Часовий розрив не заповнюється лише візуальною подібністю.'},
    q10:{mission:5,title:'Орнамент і культурна пам’ять',correct:'memory',correctLabel:'Форма може підтримувати передачу практики, але значення встановлюють у контексті.',explanation:'Орнамент здатен бути носієм впізнавання і навички, однак не є універсальним словником із незмінними перекладами.'}
  };

  const answerLabels={
    visible:'Видимі криволінійні смуги',sun:'Культ Сонця',priest:'Виготовлення лише жрицями',fact:'Факт',interpretation:'Інтерпретація / гіпотеза',measurement:'Вимірювання',
    rotate90:'Обертання на 90°',shift:'Довільне зміщення',scale:'Збільшення удвічі','2':'2','3':'3','4':'4','8':'8',a:'Фрагмент A',b:'Фрагмент B',c:'Фрагмент C',certain:'Безумовно первісний вигляд',plausible:'Обґрунтований варіант',fiction:'Довільна фантазія',
    'paint|cord|roll':'Трипілля — фарбування; Дзьомон — шнур; Месопотамія — циліндр',magic:'Орнамент доводить державу',coordination:'Техніка підтримує навчання й правила',same:'Мотив завжди доводить контакт',yes:'Так, форма достатня',no:'Ні, потрібні додаткові докази',dictionary:'Універсальний словник',memory:'Форма підтримує пам’ять у контексті',decoration:'Лише прикраса'
  };

  const freshState=()=>({currentView:'intro',answers:{},results:{},completedMissions:[],started:false,finished:false});
  let state=freshState();
  let rotation=0;
  let toastTimer=null;

  const views=[...document.querySelectorAll('.view')];
  const railSteps=[...document.querySelectorAll('.rail-step')];
  const liveScore=document.getElementById('liveScore');
  const connectionBadge=document.getElementById('connectionBadge');

  function score(){return Object.values(state.results).filter(Boolean).length}

  function notify(message){
    const toast=document.getElementById('toast');
    toast.textContent=message;toast.classList.add('is-visible');
    clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('is-visible'),2600);
  }

  function persist(){
    const payload={currentView:state.currentView,answers:state.answers,results:state.results,completedMissions:state.completedMissions,started:state.started,finished:state.finished};
    if(window.SCORM.isConnected())window.SCORM.saveState(payload,score());
    try{localStorage.setItem('ornamentLabState',JSON.stringify(payload))}catch(error){}
  }

  function restore(){
    let stored=window.SCORM.loadState();
    if(!stored){try{stored=JSON.parse(localStorage.getItem('ornamentLabState')||'null')}catch(error){stored=null}}
    if(stored&&stored.started){state={...freshState(),...stored};document.getElementById('continueButton').hidden=false;document.getElementById('startButton').textContent='Почати нову спробу'}
  }

  function updateRail(){
    const activeStep=Number(document.getElementById(state.currentView)?.dataset.step||0);
    railSteps.forEach((button,index)=>{
      button.classList.toggle('is-active',index===activeStep);
      const done=index>0&&index<6&&state.completedMissions.includes(index);
      button.classList.toggle('is-done',done||index===6&&state.finished);
      button.disabled=index!==0&&!(index===6?state.finished:state.started&&(index===1||state.completedMissions.includes(index-1)||state.completedMissions.includes(index)));
    });
    liveScore.textContent=score();
  }

  function showView(id,{scroll=true}={}){
    const target=document.getElementById(id);if(!target)return;
    views.forEach(view=>view.classList.toggle('is-active',view===target));
    state.currentView=id;updateRail();persist();
    if(scroll)window.scrollTo({top:0,behavior:'smooth'});
    document.title=`${target.querySelector('h1,h2')?.textContent.trim()||'Код орнаменту'} — STEM-лабораторія`;
  }

  function resetGame(){
    state=freshState();
    document.querySelectorAll('.option').forEach(option=>{option.classList.remove('is-selected','is-answer','is-user-wrong');option.disabled=false});
    document.querySelectorAll('.question-card').forEach(card=>{card.classList.remove('is-correct','is-wrong');const feedback=card.querySelector('.feedback');if(feedback){feedback.classList.remove('is-visible');feedback.innerHTML=''}});
    document.querySelectorAll('.check-button').forEach(button=>button.hidden=false);
    document.querySelectorAll('.next-button').forEach(button=>button.hidden=true);
    document.querySelectorAll('select[data-match]').forEach(select=>{select.value='';select.disabled=false});
    const drop=document.getElementById('fragmentDrop');delete drop.dataset.fragment;drop.innerHTML='<span>?</span><small>перетягніть фрагмент</small>';
    document.getElementById('fragmentStatus').textContent='Фрагмент ще не встановлено.';
    document.querySelectorAll('.fragment').forEach(fragment=>fragment.classList.remove('is-selected'));
    try{localStorage.removeItem('ornamentLabState')}catch(error){}
    state.started=true;showView('mission-1');
  }

  function selectAnswer(button){
    const card=button.closest('[data-question]');if(!card||card.classList.contains('is-checked'))return;
    card.querySelectorAll('.option').forEach(option=>option.classList.remove('is-selected'));
    button.classList.add('is-selected');state.answers[card.dataset.question]=button.dataset.value;persist();
  }

  function answerFragment(value){
    if(state.completedMissions.includes(3))return;
    state.answers.q5=value;
    const drop=document.getElementById('fragmentDrop');drop.dataset.fragment=value;drop.innerHTML='';
    document.querySelectorAll('.fragment').forEach(fragment=>fragment.classList.toggle('is-selected',fragment.dataset.fragment===value));
    document.getElementById('fragmentStatus').textContent=`Встановлено фрагмент ${value.toUpperCase()}.`;
    persist();
  }

  function collectCompositeAnswer(){
    const values=['trypillia','jomon','mesopotamia'].map(key=>document.querySelector(`[data-match="${key}"]`).value);
    if(values.every(Boolean)){state.answers.q7=values.join('|');document.getElementById('matchStatus').textContent='Усі три технології обрано.';persist()}
    else{delete state.answers.q7;document.getElementById('matchStatus').textContent='Заповніть усі три поля.'}
  }

  function feedbackFor(questionId,isCorrect){
    const def=definitions[questionId];
    return `<span class="feedback-mark">${isCorrect?'✓':'×'}</span><b>${isCorrect?'1 бал.':'0 балів.'}</b> ${def.explanation}`;
  }

  function checkMission(mission){
    const questions=Object.entries(definitions).filter(([,def])=>def.mission===mission).map(([id])=>id);
    if(questions.some(id=>!state.answers[id])){notify('Спершу дайте відповідь на обидва рішення цієї місії.');return}
    questions.forEach(id=>{
      const def=definitions[id];const correct=state.answers[id]===def.correct;state.results[id]=correct;
      const card=document.querySelector(`[data-question="${id}"]`);card.classList.add('is-checked',correct?'is-correct':'is-wrong');
      card.querySelectorAll('.option').forEach(option=>{
        option.disabled=true;
        option.classList.toggle('is-answer',option.dataset.value===def.correct);
        option.classList.toggle('is-user-wrong',option.classList.contains('is-selected')&&option.dataset.value!==def.correct);
      });
      const feedback=card.querySelector('.feedback');if(feedback){feedback.innerHTML=feedbackFor(id,correct);feedback.classList.add('is-visible')}
    });
    if(mission===4)document.querySelectorAll('select[data-match]').forEach(select=>select.disabled=true);
    if(!state.completedMissions.includes(mission))state.completedMissions.push(mission);
    const check=document.querySelector(`[data-check="${mission}"]`);check.hidden=true;
    const next=check.parentElement.querySelector('.next-button');next.hidden=false;
    if(mission===5){state.finished=true;window.SCORM.complete(score());renderResults()}
    updateRail();persist();notify(`Місію ${mission} перевірено: ${questions.filter(id=>state.results[id]).length} із 2 балів.`);
  }

  function resultProfile(points){
    if(points>=9)return{title:'Дослідник культурних кодів',summary:'Ви точно працюєте з формою, бачите математичну структуру й дисципліновано відділяєте доказ від привабливої гіпотези.',tags:['висока доказовість','системне мислення','STEM-синтез']};
    if(points>=7)return{title:'Аналітик орнаментальних систем',summary:'Ви добре читаєте технологію та структуру орнаменту. Окремі межі інтерпретації варто сформулювати обережніше.',tags:['аналіз форми','технологічне мислення','культурний контекст']};
    if(points>=5)return{title:'Лаборант культурної пам’яті',summary:'Основні механізми зрозумілі, але частина висновків ще змішує спостереження, реконструкцію й культурне значення.',tags:['базова реконструкція','потрібна перевірка доказів']};
    return{title:'Потрібна повторна експедиція',summary:'Перегляньте пояснення нижче й повторіть спробу. Особливо зверніть увагу на різницю між видимою ознакою та її можливим значенням.',tags:['повторення теми','робота з джерелом']};
  }

  function renderResults(){
    const points=score();const profile=resultProfile(points);
    document.getElementById('finalScore').textContent=points;document.getElementById('resultTitle').textContent=profile.title;document.getElementById('resultSummary').textContent=profile.summary;
    document.getElementById('correctCount').textContent=`${points} із 10`;
    document.getElementById('resultTags').innerHTML=profile.tags.map(tag=>`<span>${tag}</span>`).join('');
    const circumference=2*Math.PI*72;document.getElementById('scoreProgress').style.strokeDashoffset=String(circumference*(1-points/10));
    document.getElementById('answerReport').innerHTML=Object.entries(definitions).map(([id,def],index)=>{
      const correct=Boolean(state.results[id]);const user=answerLabels[state.answers[id]]||state.answers[id]||'Немає відповіді';
      return `<article class="report-row ${correct?'':'is-wrong'}"><header><h4>${index+1}. ${def.title}</h4><strong>${correct?'+1 бал':'0 балів'}</strong></header><p><b>Ваша відповідь:</b> ${user}. ${correct?'':`<b>Правильно:</b> ${def.correctLabel}. `}${def.explanation}</p></article>`
    }).join('');
    const weakMissions=[1,2,3,4,5].filter(m=>Object.entries(definitions).filter(([,def])=>def.mission===m).some(([id])=>!state.results[id]));
    const advice={1:['Джерело й інтерпретація','Повторіть рівні доказовості: факт → інтерпретація → гіпотеза.'],2:['Симетрія','Потренуйте обертання, модуль і порядок симетрії.'],3:['Реконструкція','Зверніть увагу на обмеження й ступінь певності моделі.'],4:['Технологія','Порівняйте сліди фарбування, відтискування і прокатування.'],5:['Культурна спадкоємність','Не ототожнюйте подібність форми з прямим історичним зв’язком.']};
    document.getElementById('studyAdvice').innerHTML=(weakMissions.length?weakMissions:[1]).slice(0,3).map(m=>`<div class="advice-item"><b>${advice[m][0]}</b>${weakMissions.length?advice[m][1]:'Ви виконали всі рішення правильно. Використайте звіт як короткий конспект.'}</div>`).join('');
  }

  function rehydrate(){
    Object.entries(state.answers).forEach(([id,value])=>{
      if(id==='q5')answerFragment(value);
      else if(id==='q7'){const vals=value.split('|');['trypillia','jomon','mesopotamia'].forEach((key,i)=>document.querySelector(`[data-match="${key}"]`).value=vals[i]||'');collectCompositeAnswer()}
      else{const option=document.querySelector(`[data-question="${id}"] .option[data-value="${value}"]`);if(option)option.classList.add('is-selected')}
    });
    state.completedMissions.slice().forEach(mission=>{
      const existingResults={...state.results};state.completedMissions=state.completedMissions.filter(m=>m!==mission);checkMission(mission);state.results={...existingResults,...state.results};
    });
    if(state.finished)renderResults();
  }

  document.querySelectorAll('.option').forEach(button=>button.addEventListener('click',()=>selectAnswer(button)));
  document.querySelectorAll('.check-button').forEach(button=>button.addEventListener('click',()=>checkMission(Number(button.dataset.check))));
  document.querySelectorAll('.next-button').forEach(button=>button.addEventListener('click',()=>showView(button.dataset.next)));
  railSteps.forEach(button=>button.addEventListener('click',()=>{if(!button.disabled)showView(button.dataset.go)}));
  document.getElementById('startButton').addEventListener('click',()=>{if(state.started&&Object.keys(state.answers).length&&!confirm('Почати нову спробу й очистити попередні відповіді?'))return;resetGame()});
  document.getElementById('continueButton').addEventListener('click',()=>{rehydrate();showView(state.finished?'results':state.currentView)});
  document.getElementById('restartButton').addEventListener('click',()=>{if(confirm('Очистити результат і почати нову спробу?'))resetGame()});
  document.getElementById('reviewButton').addEventListener('click',()=>showView('mission-1'));
  document.getElementById('zoomTrypillia').addEventListener('click',event=>{const frame=event.currentTarget.closest('.zoom-frame');const zoomed=frame.classList.toggle('is-zoomed');event.currentTarget.setAttribute('aria-pressed',String(zoomed));event.currentTarget.textContent=zoomed?'Показати повністю':'Збільшити деталі'});

  document.getElementById('rotatePattern').addEventListener('click',()=>{rotation=(rotation+90)%360;document.getElementById('patternObject').style.setProperty('--rotation',`${rotation}deg`)});
  document.getElementById('mirrorPattern').addEventListener('click',()=>document.getElementById('patternStage').classList.toggle('is-mirrored'));
  document.getElementById('resetPattern').addEventListener('click',()=>{rotation=0;document.getElementById('patternObject').style.removeProperty('--rotation');document.getElementById('patternStage').classList.remove('is-mirrored')});

  const dropZone=document.getElementById('fragmentDrop');
  document.querySelectorAll('.fragment').forEach(fragment=>{
    fragment.addEventListener('click',()=>answerFragment(fragment.dataset.fragment));
    fragment.addEventListener('dragstart',event=>{event.dataTransfer.setData('text/plain',fragment.dataset.fragment);event.dataTransfer.effectAllowed='copy'});
  });
  dropZone.addEventListener('dragover',event=>{event.preventDefault();dropZone.classList.add('is-over')});
  dropZone.addEventListener('dragleave',()=>dropZone.classList.remove('is-over'));
  dropZone.addEventListener('drop',event=>{event.preventDefault();dropZone.classList.remove('is-over');answerFragment(event.dataTransfer.getData('text/plain'))});
  document.querySelectorAll('select[data-match]').forEach(select=>select.addEventListener('change',collectCompositeAnswer));

  const connected=window.SCORM.init();
  connectionBadge.classList.toggle('is-connected',connected);
  connectionBadge.innerHTML=`<i></i>${connected?'Moodle підключено':'Демо-режим'}`;
  restore();updateRail();
  window.addEventListener('beforeunload',()=>{persist();window.SCORM.finish()});
})();
