document.querySelectorAll('.menu-btn').forEach(function(b){b.addEventListener('click',function(){var n=document.getElementById('nav');var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});});
document.querySelectorAll('nav a').forEach(function(a){a.addEventListener('click',function(){document.getElementById('nav').classList.remove('open')})});
(function(){
var f=document.getElementById('askform');if(!f)return;
var cfg=window.SITE_CONFIG||{},st=document.getElementById('form-status');
function say(t,ok){st.textContent=t;st.className='status '+(ok?'ok':'err')}
f.addEventListener('submit',function(e){
  e.preventDefault();
  if(!f.checkValidity()){f.reportValidity();return}
  var d=new FormData(f);if(d.get('_gotcha'))return;
  if(cfg.formEndpoint){
    var b=f.querySelector('button');b.disabled=true;say('Sending\u2026',true);
    fetch(cfg.formEndpoint,{method:'POST',body:d,headers:{'Accept':'application/json'}}).then(function(r){
      if(!r.ok)throw 0;f.reset();say('Thank you. Your message has been sent. You will get a reply by email or phone.',true)
    }).catch(function(){say('Sorry, the message could not be sent. Please email '+cfg.email+' directly.',false)}).then(function(){b.disabled=false});
  }else{
    var body='Name: '+d.get('name')+'\n'+'Email: '+d.get('email')+'\n'+'Phone: '+(d.get('phone')||'-')+'\n\n'+d.get('message')+'\n\n(Consent given on the website to be contacted about this message.)';
    window.location.href='mailto:'+(cfg.deliveryEmail||cfg.email||'')+'?subject='+encodeURIComponent('Question from website: '+d.get('name'))+'&body='+encodeURIComponent(body);
    say('Your email program should open with the message ready to send. If it does not, please write to '+cfg.email+'.',true);
  }
});
})();
