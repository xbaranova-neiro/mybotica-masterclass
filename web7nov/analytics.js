/* MyBotica web7nov — analytics, no contact fields or widget payloads are sent. */
(function () {
  const counter = 114003699;
  (function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r)return;}
    k=e.createElement(t);a=e.getElementsByTagName(t)[0];k.async=1;k.src=r;a.parentNode.insertBefore(k,a);
  })(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id='+counter,'ym');
  ym(counter,'init',{webvisor:true,clickmap:true,accurateTrackBounce:true,trackLinks:true});
  window.myboticaTrack=function(name,params,callback){
    try { ym(counter,'reachGoal',name,params||{},callback); } catch (_) { if(callback)callback(); }
  };
  document.addEventListener('mybotica:registration',function(event){
    window.myboticaTrack('registration_open',{button:event.detail.source});
  });
  document.addEventListener('click',function(event){
    if(event.target.closest('.examples-open'))window.myboticaTrack('examples_open');
  });
  const reached=new Set();
  let scheduled=false;
  function checkScroll(){
    scheduled=false;
    const available=document.documentElement.scrollHeight-window.innerHeight;
    if(available<=0)return;
    const percent=window.scrollY/available*100;
    [50,90].forEach(function(threshold){
      if(percent>=threshold&&!reached.has(threshold)){
        reached.add(threshold);window.myboticaTrack('scroll_'+threshold);
      }
    });
  }
  window.addEventListener('scroll',function(){
    if(!scheduled){scheduled=true;requestAnimationFrame(checkScroll);}
  },{passive:true});
})();
