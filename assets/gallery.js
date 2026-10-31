(function(){
var grid=document.getElementById('gallery');if(!grid)return;
var dlg=document.getElementById('lightbox'),img=document.getElementById('lb-img'),cap=document.getElementById('lb-cap');
var items=[],cur=0;
function empty(){
  grid.innerHTML='';
  var msg=document.createElement('p');msg.className='note';msg.textContent='Photographs will be added here soon.';
  var wrap=document.createElement('div');wrap.className='gallery';
  for(var i=0;i<6;i++){var d=document.createElement('div');d.className='ph empty';d.innerHTML='<span>Photo<br><small>coming soon</small></span>';wrap.appendChild(d);}
  grid.appendChild(wrap);grid.appendChild(msg);grid.className='';
}
function show(i){cur=(i+items.length)%items.length;var p=items[cur];img.src='assets/gallery/'+encodeURIComponent(p.file);img.alt=p.caption||'';
  cap.textContent=(p.caption||'')+(p.date?'  \u00b7  '+fmt(p.date):'');}
function fmt(d){var m=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],a=String(d).split('-');
  if(a.length===3)return parseInt(a[2],10)+' '+m[a[1]-1]+' '+a[0];if(a.length===2)return m[a[1]-1]+' '+a[0];return a[0];}
function open(i){show(i);if(dlg.showModal)dlg.showModal();else dlg.setAttribute('open','');}
function render(list){
  items=list.filter(function(p){return p&&p.file}).sort(function(a,b){return String(b.date||'').localeCompare(String(a.date||''))});
  if(!items.length){empty();return;}
  grid.innerHTML='';
  items.forEach(function(p,i){
    var b=document.createElement('button');b.className='ph';b.type='button';b.setAttribute('aria-label','Enlarge: '+(p.caption||p.file));
    var im=document.createElement('img');im.loading='lazy';im.decoding='async';im.src='assets/gallery/'+encodeURIComponent(p.file);im.alt=p.caption||'';
    b.appendChild(im);
    if(p.caption){var c=document.createElement('span');c.className='cap';c.textContent=p.caption;b.appendChild(c);}
    b.addEventListener('click',function(){open(i)});grid.appendChild(b);
  });
}
fetch('gallery.json',{cache:'no-cache'}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){render(j.photos||[])}).catch(empty);
dlg.querySelector('.lb-close').onclick=function(){dlg.close?dlg.close():dlg.removeAttribute('open')};
dlg.querySelector('.lb-prev').onclick=function(){show(cur-1)};dlg.querySelector('.lb-next').onclick=function(){show(cur+1)};
dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
dlg.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
})();
