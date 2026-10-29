const goals={earn:['Найдите идею для услуги','Выберите задачу заказчика и посмотрите, как работает помощник, которого можно настроить под его работу.'],self:['Выберите помощника для себя','Начните с повторяющейся задачи: подготовка материалов, ответы на вопросы или работа с информацией.']};
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
