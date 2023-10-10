(()=>{"use strict";class t{constructor(t,e,s){this.addElement=t=>{t.setContext(this.Context),this.Elements.push(t)},this.update=()=>{this.Context.clearRect(0,0,this.Width,this.Height),this.Elements.forEach((t=>{t.draw()}))},this.Name=t,this.Width=e,this.Height=s,this.Canvas=document.createElement("canvas"),this.Context=this.Canvas.getContext("2d"),this.Canvas.width=this.Width,this.Canvas.height=this.Height,this.Elements=[]}removeElement(t){this.Elements=this.Elements.filter((e=>e.Id!==("string"==typeof t?t:t.Id)))}}var e,s;!function(t){t.White="#fff",t.Black="#000",t.Red="#f00",t.Green="#0f0",t.Blue="#00f"}(e||(e={}));class i{}i.Integer=(t=0,e=1)=>Math.floor(i.Float(t,e)),i.Float=(t=0,e=1)=>Math.random()*(e-t)+t;class h{}h.New=()=>"xxxx-xxxx-xxxx-xxxx".replace(/x/g,(t=>"0123456789ABCDEF".charAt(i.Integer(0,16)))),function(t){t.Square="square",t.Circle="circle"}(s||(s={}));class n{constructor(t,e,i,n,a=n){this.setContext=t=>{this.ParentContext=t},this.setBackground=(t,e=1)=>{this.Background=t,this.Opacity=e},this.moveTo=(t,e,s=1)=>new Promise((i=>{const h=()=>{const n=Math.atan2(e-this.Y,t-this.X);this.X+=Math.round(10*(Math.cos(n)*s+Number.EPSILON))/10,this.Y+=Math.round(10*(Math.sin(n)*s+Number.EPSILON))/10,Math.floor(this.X)===t&&(this.X=t),Math.floor(this.Y)===e&&(this.Y=e),console.log(`target: (${t}; ${e}) | obj: (${this.X}; ${this.Y})`),this.X===t&&this.Y===e?i():setTimeout((()=>{h()}),10)};h()})),this.draw=()=>{this.ParentContext&&(this.ParentContext.beginPath(),this.Background&&(this.ParentContext.fillStyle=this.Background),this.ParentContext.globalAlpha=this.Opacity,this.Type===s.Circle?this.ParentContext.arc(this.X,this.Y,this.Width,0,2*Math.PI):this.Type===s.Square&&this.ParentContext.fillRect(this.X,this.Y,this.Width,this.Height),this.ParentContext.fill(),this.ParentContext.closePath(),this.ParentContext.restore())},this.Id=h.New(),this.Type=t,this.X=e,this.Y=i,this.Width=n,this.Height=a,this.Opacity=1}}const a=new class{constructor(e,s,i){this.addLayer=e=>{if(this.getLayerByName(e))throw new Error(`У слоев должно быть уникальное имя. Имя '${e}' уже существует.`);const s=new t(e,this.Width,this.Height);return this.Layers.push(s),this.Target.appendChild(s.Canvas),s},this.getLayerByName=t=>this.Layers.find((e=>e.Name===t)),this.render=()=>{this.Layers.forEach((t=>{t.update()}))},this.run=()=>{this.render(),requestAnimationFrame(this.run)},this.Target=e,this.Width=s,this.Height=i,this.Layers=[]}}(document.body,800,600),r=a.addLayer("World");r.Canvas.style.cssText="border: 1px solid #000;";const o=new n(s.Square,25,0,50);o.setBackground(e.Green,.25);const c=new n(s.Circle,25,25,25);c.setBackground(e.Red,.25),r.addElement(o),r.addElement(c);let d=!1;r.Canvas.addEventListener("click",(t=>{if(!1===d){d=!0;const i=5,h=new n(s.Circle,t.offsetX,t.offsetY,5);h.setBackground(e.Red),r.addElement(h);const a=c.X,o=c.Y;c.moveTo(h.X,h.Y,i).then((()=>{r.removeElement(h)})).then((()=>{c.moveTo(a,o,i).then((()=>{d=!1}))}))}})),a.run(),console.log(a)})();