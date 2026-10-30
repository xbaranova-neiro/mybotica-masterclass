const goals={earn:['Найдите идею для услуги','Посмотрите, какие задачи бизнеса решают ИИ-боты и какие решения можно предлагать заказчикам.'],self:['Выберите помощника для себя','Узнайте, какие ежедневные и рабочие задачи можно поручить ИИ-боту, чтобы освободить время для более важных дел.']};
document.querySelectorAll('[data-goal]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-goal]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));const [title,text]=goals[button.dataset.goal];document.getElementById('goal-title').textContent=title;document.getElementById('goal-description').textContent=text;}));
const dialog=document.getElementById('registration-dialog');
const widgetHost=document.getElementById('registration-widget');
const widgetViewport=document.getElementById('registration-viewport');
const widgetStatus=document.getElementById('registration-status');
const widgetRetry=document.getElementById('registration-retry');
const widgetOrigin='https://neyroseti.neiroguru.ru';
const widgetKey='98b4b1bd306b624b448fd5dac51cb40ef2ec89c1';
const thankYouUrl='https://xeniabaranova-school.ru/sps/neyroseti/thank_mbnov26';
let widgetStarted=false;
let widgetTimeout;
let widgetHeight=540;
function fitRegistrationWidget(){
 const width=widgetViewport.clientWidth;
 if(!width)return;
 // GetCourse's submit button is 328px wide plus form margins.
 const canvasWidth=Math.max(360,width);
 const scale=width/canvasWidth;
 widgetHost.style.width=canvasWidth+'px';
 widgetHost.style.transform=scale<1?'scale('+scale+')':'none';
 widgetViewport.style.height=Math.ceil(widgetHeight*scale)+'px';
}
if('ResizeObserver' in window)new ResizeObserver(fitRegistrationWidget).observe(widgetViewport);
else window.addEventListener('resize',fitRegistrationWidget);
function showWidgetError(){
 widgetHost.hidden=true;
 widgetViewport.hidden=true;
 widgetStatus.hidden=false;
 widgetStatus.textContent='Форма пока не загрузилась. Проверьте соединение и попробуйте ещё раз.';
 widgetRetry.hidden=false;
}
function loadRegistrationWidget(){
 if(widgetStarted)return;
 widgetStarted=true;
 widgetStatus.hidden=false;
 widgetStatus.textContent='Загружаем форму регистрации…';
 widgetRetry.hidden=true;
 widgetHost.hidden=false;
 widgetViewport.hidden=false;
 widgetHost.replaceChildren();
 widgetHost.style.height='';
 fitRegistrationWidget();
 const script=document.createElement('script');
 script.id=widgetKey;
 script.src=widgetOrigin+'/pl/lite/widget/script?id=1675822';
 script.async=true;
 script.addEventListener('load',()=>{
  document.dispatchEvent(new Event('StartWidget'+widgetKey));
  const frame=widgetHost.querySelector('iframe');
  if(frame)frame.title='Регистрация на практикум MyBotica 7 ноября';
 });
 script.addEventListener('error',showWidgetError);
 widgetHost.append(script);
 widgetTimeout=setTimeout(showWidgetError,20000);
}
// GetCourse sends this event only after its form processor reports success.
// Check both the exact sender window and origin before accepting it.
window.addEventListener('message',event=>{
 const frame=widgetHost.querySelector('iframe');
 if(!frame||event.origin!==widgetOrigin||event.source!==frame.contentWindow)return;
 let data=event.data;
 if(typeof data==='string'){try{data=JSON.parse(data);}catch{return;}}
 if(!data||typeof data!=='object')return;
 if(data.uniqName===widgetKey&&Number(data.height)>50){
  widgetHeight=Number(data.height);
  clearTimeout(widgetTimeout);
  widgetStatus.hidden=true;
  widgetRetry.hidden=true;
  widgetHost.hidden=false;
  widgetViewport.hidden=false;
  fitRegistrationWidget();
 }
 if(data.event==='getCourseFormSubmitted'&&data.eventInfo?.inFrame===1){
  window.location.assign(thankYouUrl);
 }
});
widgetRetry.addEventListener('click',()=>{
 clearTimeout(widgetTimeout);
 widgetStarted=false;
 loadRegistrationWidget();
});
function openRegistration(trigger){
 const request=new CustomEvent('mybotica:registration',{cancelable:true,detail:{source:trigger.dataset.register}});
 if(!document.dispatchEvent(request))return;
 if(botExamples.open)botExamples.close();
 if(!dialog.open){dialog.showModal();document.documentElement.classList.add('registration-open');}
 fitRegistrationWidget();
 loadRegistrationWidget();
}
document.querySelectorAll('[data-register]').forEach(button=>button.addEventListener('click',()=>openRegistration(button)));
dialog.addEventListener('close',()=>document.documentElement.classList.remove('registration-open'));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.animate([{opacity:.65,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.2,.7,.2,1)'});observer.unobserve(entry.target);}});},{threshold:.1});document.querySelectorAll('.hero-copy,.hero-art,.gifts-heading,.lesson,.program-road article,.choice-art,.choice-paper,.audience .section-heading,.audience-grid article,.example-art,.example-copy,.portrait,.host-grid h2,.before-steps article,.faq-heading,.join-panel').forEach(element=>observer.observe(element));}

const exampleTabs=[...document.querySelectorAll('[data-example]')];
function selectExample(tab,focus=false){for(const item of exampleTabs){const selected=item===tab;item.setAttribute('aria-selected',String(selected));item.tabIndex=selected?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!selected;}if(focus)tab.focus();}
exampleTabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectExample(tab));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%exampleTabs.length;else if(event.key==='ArrowLeft')next=(index+exampleTabs.length-1)%exampleTabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=exampleTabs.length-1;else return;event.preventDefault();selectExample(exampleTabs[next],true);});});

const botExamples=document.getElementById('bot-examples-dialog');
const botExamplesData=[
['Бот-консультант','Отвечает на вопросы покупателей, помогает выбрать товар или услугу и разобраться в ассортименте.','Меньше однотипных вопросов менеджерам.',['Интернет-магазины','Бьюти-сфера','Онлайн-курсы','Услуги и консультации'],'Здравствуйте! Подскажите, какой крем подойдёт для чувствительной кожи?','Здравствуйте! Уточните, пожалуйста, какой уход вы ищете: для лица или тела? Помогу найти подходящие варианты в каталоге.'],
['Помощник по контенту','Превращает заметки и материалы в черновики публикаций.','Помогает быстрее подготовить первый вариант текста.',['Блоги экспертов','Социальные сети','Проекты заказчиков'],'Помоги собрать пост из заметок.','ИИ-бот берёт на себя повторяющиеся задачи — от ответов клиентам до черновиков постов. Начните с одной задачи, которая отнимает у вас время.'],
['Помощник по документам','Помогает находить нужную информацию в загруженных материалах.','Меньше времени на поиск по инструкциям и заметкам.',['Базы знаний команд','Рабочие инструкции','Личные материалы'],'Где найти порядок возврата?','В инструкции «Возвраты», раздел 3: примите заявку, проверьте номер заказа и передайте обращение ответственному сотруднику.'],
['Помощник для обучения','Помогает разобраться в материалах и потренироваться на вопросах.','Можно вернуться к сложной теме в удобное время.',['Онлайн-курсы','Обучение сотрудников','Самостоятельная учёба'],'Помоги повторить тему урока.','Начнём с вопроса: чем инструкция для бота отличается от его базы знаний? Ответьте своими словами, а я помогу разобраться.'],
['Помощник для рабочих задач','Помогает составить план, подготовить черновик и упорядочить информацию.','Освобождает время от повторяющихся задач.',['Работа специалиста','Небольшие команды','Проектные задачи'],'Помоги подготовиться к встрече.','План на 30 минут: 5 минут — цель, 15 — обсуждение вариантов, 10 — решения. Подготовьте список вопросов и статус текущих задач.'],
['Помощник для повседневных дел','Помогает с планами, идеями и бытовыми задачами.','Удобно собирать варианты и выбирать подходящий.',['Семейные дела','Творчество','Личные планы'],'Придумай занятия на выходные.','Фотоохота на прогулке, домашняя пицца и настольные игры — три идеи для семейного выходного.']
];
const botSceneVisuals=[
['consultant','Консультант магазина косметики за ноутбуком','M7 5h18a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2h-8l-7 5v-5H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2ZM11 11h10M11 16h7'],
['content','Автор готовит контент в творческой студии','M7 5h14l5 5v17H7ZM20 5v7h6M12 17h9M12 22h6'],
['documents','Специалист работает с документами','M4 9h10l3 4h11v14H4ZM4 9V5h10l3 4h10v4M10 18h12M10 22h8'],
['learning','Девушка учится с ноутбуком и конспектами','M3 7c5-2 9-2 13 1 4-3 8-3 13-1v20c-5-2-9-2-13 1-4-3-8-3-13-1ZM16 8v20'],
['work','Специалист готовит рабочую встречу','M5 9h22v19H5ZM10 4v9M22 4v9M5 16h22M11 21l4 4 7-6'],
['daily','Мама с ребёнком планируют семейные дела','M3 15 16 4l13 11M7 12v16h18V12M13 28V18h6v10']
];
let sceneRenderToken=0;
let scenesPreloaded=false;
function preloadBotScenes(){if(scenesPreloaded)return;scenesPreloaded=true;botSceneVisuals.forEach(([key])=>{const image=new Image();image.src='assets/popup-'+key+'-v3.webp';});}
function renderBotScene(){
 const token=++sceneRenderToken;
 const [key,alt,path]=botSceneVisuals[botExampleIndex];
 const preview=botExamples.querySelector('.bot-example-preview');preview.dataset.scene=key;
 const photo=preview.querySelector('img');
 const image=new Image();
 image.onload=()=>{if(token!==sceneRenderToken)return;photo.src=image.src;photo.alt=alt;document.querySelector('.chat-avatar').style.backgroundImage='url("'+image.src+'")';if(!matchMedia('(prefers-reduced-motion: reduce)').matches){photo.animate([{opacity:.25},{opacity:1}],{duration:320,easing:'ease-out'});}};
 image.src='assets/popup-'+key+'-v3.webp';
 document.querySelector('.bot-example-icon path').setAttribute('d',path);
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.querySelectorAll('.bot-example-question,.bot-example-answer,.bot-example-copy').forEach((node,index)=>node.animate([{opacity:.3,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:260,delay:index*35,easing:'ease-out'}));}
}
let botExampleIndex=0;
function renderBotExample(){renderBotScene();const [title,description,benefit,uses,question,answer]=botExamplesData[botExampleIndex];document.getElementById('bot-example-title').textContent=title;document.getElementById('bot-example-description').textContent=description;document.getElementById('bot-example-benefit').textContent=benefit;document.getElementById('bot-example-question').textContent=question;document.getElementById('bot-example-answer').textContent=answer;document.querySelector('.bot-example-count').textContent=(botExampleIndex+1)+' / '+botExamplesData.length;document.querySelectorAll('[data-bot-dot]').forEach((dot,index)=>dot.setAttribute('aria-pressed',String(index===botExampleIndex)));document.getElementById('bot-example-uses').replaceChildren(...uses.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));}
document.querySelector('.examples-open').addEventListener('click',()=>{preloadBotScenes();renderBotExample();botExamples.showModal();document.documentElement.classList.add('examples-opened');});
document.querySelector('.bot-examples-close').addEventListener('click',()=>botExamples.close());
botExamples.addEventListener('close',()=>document.documentElement.classList.remove('examples-opened'));
function moveBotExample(step){botExampleIndex=(botExampleIndex+step+botExamplesData.length)%botExamplesData.length;renderBotExample();}
document.getElementById('bot-example-prev').addEventListener('click',()=>moveBotExample(-1));document.getElementById('bot-example-next').addEventListener('click',()=>moveBotExample(1));
botExamples.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();moveBotExample(1);}if(event.key==='ArrowLeft'){event.preventDefault();moveBotExample(-1);}});
botExamples.addEventListener('click',event=>{if(event.target===botExamples){const r=botExamples.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)botExamples.close();}});

const botDots=document.querySelector('.bot-example-dots');
botExamplesData.forEach((item,index)=>{const dot=document.createElement('button');dot.type='button';dot.dataset.botDot=index;dot.setAttribute('aria-label','Пример '+(index+1)+': '+item[0]);dot.setAttribute('aria-pressed',String(index===botExampleIndex));dot.addEventListener('click',()=>{botExampleIndex=index;renderBotExample();});botDots.append(dot);});
