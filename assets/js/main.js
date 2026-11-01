// Deesha Global redesign — mobile menu + sticky header shadow only.
(function(){
  var btn=document.querySelector('.nav-toggle');
  var links=document.querySelector('.nav-links');
  var header=document.querySelector('.site-header');
  if(btn&&links){
    btn.addEventListener('click',function(){
      var open=links.classList.toggle('open');
      btn.setAttribute('aria-expanded',open?'true':'false');
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){links.classList.remove('open');btn.setAttribute('aria-expanded','false');});
    });
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'){links.classList.remove('open');btn.setAttribute('aria-expanded','false');}
    });
  }
  var unit=document.querySelector('.header-unit');
  if(header||unit){
    var onScroll=function(){
      var scrolled=window.scrollY>8;
      if(header){header.classList.toggle('scrolled',scrolled);}
      if(unit){unit.classList.toggle('scrolled',scrolled);}
    };
    window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  }
})();
