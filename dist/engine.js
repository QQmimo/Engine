(()=>{"use strict";class t extends Number{toDegree(){return 180*this.valueOf()/Math.PI}toRadian(){return this.valueOf()}static degree(e){return new t(e*Math.PI/180)}static byPoints(e,n){const s=e instanceof h?e.Transform.Position:e,i=n instanceof h?n.Transform.Position:n;return new t(Math.atan2(i.Y-s.Y,i.X-s.X))}}class e{static Float(t,e){return void 0===e?Math.random()*t:Math.random()*(e-t+1)+t}static Integer(t,n){return Math.floor(e.Float(t,n))}static Color(){return`rgb(${e.Integer(255)}, ${e.Integer(255)}, ${e.Integer(255)})`}static Boolean(){return 1===e.Integer(0,1)}static Angle(n=360){return t.degree(e.Integer(n))}}class n{}n.new=()=>"xxxx-xxxx-xxxx-xxxx".replace(/x/g,(t=>"0123456789ABCDEF".charAt(e.Integer(16))));class s{static solve(t,e){const n=t instanceof h?t.Transform.Position:t,s=e instanceof h?e.Transform.Position:e;return Math.sqrt(Math.pow(s.X-n.X,2)+Math.pow(s.Y-n.Y,2))}}class i{constructor(t){this.addTag=t=>{this.Tags.push(t)},this.compareTag=t=>this.Tags.some((e=>e===t)),this.destroy=()=>{i.delete(this.Id),this._onDestroy&&this._onDestroy()},this.onDestroy=t=>{this._onDestroy=t},this.Id=n.new(),this.Tags=[],this.Name=t,i.add(this)}get Childs(){return i.findByParent(this)}set Name(t){this._Name=t}get Name(){return this._Name}static add(t){if(i.findById(t.Id))throw new Error(`ОШИБКА: ${this.name} с идентификатором '${t.Id}' уже существует.`);this.Objects.set(t.Id,t)}static findById(t){return this.Objects.get(t)}static findByName(t){return Array.from(this.Objects,(([t,e])=>e)).find((e=>this.name===e.constructor.name&&e.Name===t))}static findByTag(t){return Array.from(this.Objects,(([t,e])=>e)).filter((e=>this.name===e.constructor.name&&e.compareTag(t)))}static findByParent(t){return Array.from(this.Objects,(([t,e])=>e)).filter((e=>{var n;return(null===(n=e.Parent)||void 0===n?void 0:n.Id)===t.Id}))}static delete(t){this.Objects.delete(t)}}i.Objects=new Map;class o extends i{constructor(t,e){super(e),this.addGameObject=t=>{t.setLayer(this)},this.update=()=>{return t=this,e=void 0,s=function*(){const t=[];this.Childs.forEach((e=>{e.broadcast&&!1===this.IsHidden&&t.push(e.broadcast("update"))})),yield Promise.all(t)},new((n=void 0)||(n=Promise))((function(i,o){function r(t){try{h(s.next(t))}catch(t){o(t)}}function a(t){try{h(s.throw(t))}catch(t){o(t)}}function h(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}h((s=s.apply(t,e||[])).next())}));var t,e,n,s},this.Parent=t,this.IsHidden=!1}get Childs(){return super.Childs}set Order(t){this._Order=t,i.Objects=new Map(Array.from(i.Objects,(([t,e])=>e)).sort(((t,e)=>t instanceof o&&e instanceof o?t.Order>e.Order?1:t.Order<e.Order?-1:0:0)).map((t=>[t.Id,t])))}get Order(){return this._Order}get Scene(){return this.Parent}get Screen(){var t;return null===(t=this.Parent)||void 0===t?void 0:t.Screen}get GameObjects(){return this.Childs}static findById(t){return super.findById(t)}static findByName(t){return super.findByName(t)}static findByTag(t){return super.findByTag(t)}static findByParent(t){return super.findByParent(t)}}class r extends i{constructor(t,e){super(e),this.addLayer=t=>{const e=new o(this,t);return e.Order=this.Childs.length,e},this.update=()=>{return t=this,e=void 0,s=function*(){const t=[];this.Childs.forEach((e=>{t.push(e.update())})),yield Promise.all(t)},new((n=void 0)||(n=Promise))((function(i,o){function r(t){try{h(s.next(t))}catch(t){o(t)}}function a(t){try{h(s.throw(t))}catch(t){o(t)}}function h(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}h((s=s.apply(t,e||[])).next())}));var t,e,n,s},this.play=()=>{this.IsPause=!1},this.pause=()=>{this.IsPause=!0},this.Parent=t,this.IsActive=!0,this.IsPause=!1}get Childs(){return super.Childs}get Layers(){return this.Childs}get Screen(){return this.Parent}static findById(t){return this.Objects.get(t)}static findByName(t){return super.findByName(t)}static findByTag(t){return super.findByTag(t)}static findByParent(t){return super.findByParent(t)}}class a{constructor(e){this.Position={X:0,Y:0},this.Rotation=new t(0),this.Scale=1,this._GameObject=e}rotateToPoint(e){const n=e instanceof h?e.Transform.Position:e;this.Rotation=new t(-t.byPoints(this._GameObject,n).toRadian())}}class h extends i{constructor(t,...e){super(t),this.addComponent=t=>{const e=new t(this);this.Components.set(t.name,e)},this.setLayer=t=>{this.Parent=t},this.broadcast=(t,...e)=>{return n=this,s=void 0,o=function*(){try{const n=[];Array.from(this.Components,(([t,e])=>e)).filter((e=>e[t]&&"function"==typeof e[t])).forEach((s=>{if(s[t].length!==e.length)throw new Error(`ОШИБКА: Метод '${t}' в компоненте '${s.constructor.name}' количество переданных аргументов (${e.length}) не соответствует ожидаемому (${s[t].length})`);n.push(s[t].apply(this,...e))})),yield Promise.all(n)}catch(t){console.error(t)}},new((i=void 0)||(i=Promise))((function(t,e){function r(t){try{h(o.next(t))}catch(t){e(t)}}function a(t){try{h(o.throw(t))}catch(t){e(t)}}function h(e){var n;e.done?t(e.value):(n=e.value,n instanceof i?n:new i((function(t){t(n)}))).then(r,a)}h((o=o.apply(n,s||[])).next())}));var n,s,i,o},this.getComponent=t=>{const e=this.Components.get(t.name);if(void 0===e)throw new Error(`ОШИБКА: Компонент '${t.name}' не найден.`);return e},this.tryGetComponent=t=>this.Components.get(t.name),this.detachComponent=t=>{this.Components.delete(t.name)},this.Components=new Map,this.Transform=new a(this),e.forEach((t=>{this.addComponent(t)}))}get Layer(){return this.Parent}get Scene(){var t;return null===(t=this.Parent)||void 0===t?void 0:t.Scene}get Screen(){var t;return null===(t=this.Parent)||void 0===t?void 0:t.Screen}static findById(t){return super.findById(t)}static findByName(t){return super.findByName(t)}static findByTag(t){return super.findByTag(t)}static findByParent(t){return super.findByParent(t)}static findByComponent(t){return Array.from(super.Objects,(([t,e])=>e)).filter((e=>e instanceof h&&e.tryGetComponent(t)))}}class c{constructor(t){this.GameObject=t}get IsPause(){return this.GameObject.Scene.IsPause}}class d extends c{constructor(){super(...arguments),this._IsMoving=!1,this._MoveAngle=new t(0),this.Speed=0,this.stop=()=>{this.Target=void 0},this.onStart=t=>{this._onStart=t},this.onFinish=t=>{this._onFinish=t},this.onMove=t=>{this._onMove=t},this.update=()=>{return e=this,n=void 0,i=function*(){if(!1!==this.IsPause||void 0===this.Target||this.Target.X===this.GameObject.Transform.Position.X&&this.Target.Y===this.GameObject.Transform.Position.Y)void 0!==this.Target&&this._onFinish&&(this.Target=void 0,this._IsMoving=!1,this._onFinish(this.GameObject,this));else{this._MoveAngle=t.byPoints(this.GameObject,this.Target),this._onStart&&!1===this._IsMoving&&this._onStart(this.GameObject,this),this._IsMoving=!0;const e=Math.cos(this._MoveAngle.toRadian())*this.Speed,n=Math.sin(this._MoveAngle.toRadian())*this.Speed;this.GameObject.Transform.Position.X+=e,this.GameObject.Transform.Position.Y+=n,Math.abs(this.GameObject.Transform.Position.X-this.Target.X)<e&&(this.GameObject.Transform.Position.X=this.Target.X),Math.abs(this.GameObject.Transform.Position.Y-this.Target.Y)<n&&(this.GameObject.Transform.Position.Y=this.Target.Y),this._onMove&&this._onMove(this.GameObject,this)}},new((s=void 0)||(s=Promise))((function(t,o){function r(t){try{h(i.next(t))}catch(t){o(t)}}function a(t){try{h(i.throw(t))}catch(t){o(t)}}function h(e){var n;e.done?t(e.value):(n=e.value,n instanceof s?n:new s((function(t){t(n)}))).then(r,a)}h((i=i.apply(e,n||[])).next())}));var e,n,s,i}}get MoveAngle(){return this._MoveAngle}get IsMoving(){return this._IsMoving}moveTo(t){this.Target=t instanceof h?t.Transform.Position:t}}class l extends c{constructor(){super(...arguments),this._Dots=[],this.IsHidden=!1,this.clearLineStyle=()=>{this._LineStyle={}},this.clearFillStyle=()=>{this._FillStyle={}},this.draw=(...t)=>{var e,n,s,i,o,r,a,h;if(this._Dots=t,this.GameObject.Layer&&!this.IsHidden){this.GameObject.Screen.Context.beginPath();const c=this.GameObject.Transform.Position.X,d=this.GameObject.Transform.Position.Y,l=this.GameObject.Transform.Rotation.toRadian();this._Dots.forEach(((e,n,s)=>{const i=e.X+c,o=e.Y+d,r=Math.cos(l),a=Math.sin(l);if(0===n?this.GameObject.Screen.Context.moveTo(r*(i-c)+a*(o-d)+c,r*(o-d)-a*(i-c)+d):this.GameObject.Screen.Context.lineTo(r*(i-c)+a*(o-d)+c,r*(o-d)-a*(i-c)+d),n===t.length-1){const t=s[0].X+c,e=s[0].Y+d;this.GameObject.Screen.Context.lineTo(r*(t-c)+a*(e-d)+c,r*(e-d)-a*(t-c)+d)}})),void 0!==(null===(e=this.LineStyle)||void 0===e?void 0:e.Color)&&0!==(null===(n=this.LineStyle)||void 0===n?void 0:n.Width)&&(this.GameObject.Screen.Context.globalAlpha=(null===(s=this.LineStyle)||void 0===s?void 0:s.Opacity)||1,this.GameObject.Screen.Context.setLineDash((null===(i=this.LineStyle)||void 0===i?void 0:i.Template)||[]),this.GameObject.Screen.Context.lineWidth=null===(o=this.LineStyle)||void 0===o?void 0:o.Width,this.GameObject.Screen.Context.strokeStyle=null===(r=this.LineStyle)||void 0===r?void 0:r.Color,this.GameObject.Screen.Context.stroke()),this.GameObject.Screen.Context.globalAlpha=(null===(a=this.FillStyle)||void 0===a?void 0:a.Opacity)||1,this.GameObject.Screen.Context.fillStyle=null===(h=this.FillStyle)||void 0===h?void 0:h.Color,this.GameObject.Screen.Context.fill(),this.GameObject.Screen.Context.closePath()}},this.drawByDotsCount=(e,n)=>{const s=[];for(let i=0;i<e;i++){const o=t.degree(360/e*i),r=this.GameObject.Transform.Position.X,a=this.GameObject.Transform.Position.Y,h=r+n,c=a,d=Math.cos(o.toRadian()),l=Math.sin(o.toRadian());s.push({X:d*(h-r)+l*(c-a),Y:d*(c-a)-l*(h-r)})}this.draw(...s)},this.drawLine=(t,e)=>{this.draw(t,e)},this.update=()=>{return t=this,e=void 0,s=function*(){this.draw(...this._Dots)},new((n=void 0)||(n=Promise))((function(i,o){function r(t){try{h(s.next(t))}catch(t){o(t)}}function a(t){try{h(s.throw(t))}catch(t){o(t)}}function h(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}h((s=s.apply(t,e||[])).next())}));var t,e,n,s}}set LineStyle(t){this._LineStyle=Object.assign(Object.assign({},this._LineStyle),t)}get LineStyle(){return this._LineStyle}set FillStyle(t){this._FillStyle=Object.assign(Object.assign({},this._FillStyle),t)}get FillStyle(){return this._FillStyle}get Dots(){return this._Dots.map((t=>({X:t.X+this.GameObject.Transform.Position.X,Y:t.Y+this.GameObject.Transform.Position.Y})))}}class u extends c{constructor(){super(...arguments),this._solveNeighbours=()=>{const t=h.findByComponent(u).filter((t=>t.Id!==this.GameObject.Id)).map((t=>({distance:s.solve(this.GameObject,t),object:t}))).sort(((t,e)=>t.distance>e.distance?1:t.distance<e.distance?-1:0)).filter(((t,e)=>e<this._NeighboursCount)).map((t=>t.object));return this._onNeighboursChange&&this._onNeighboursChange(this.GameObject,t),t},this._NeighboursCount=1,this._Neighbours=[],this.update=()=>{var t,e;null!==(e=null===(t=this.GameObject.tryGetComponent(d))||void 0===t?void 0:t.IsMoving)&&void 0!==e&&e&&this._onCollision&&(this._Neighbours=h.findByComponent(u).filter((t=>t.Id!==this.GameObject.Id)),this._Neighbours.forEach((t=>{this.check(this.GameObject,t)&&this._onCollision(this.GameObject,t)})))},this.onCollision=t=>{this._onCollision=t},this.onNeighboursChange=(t,e)=>{this._NeighboursCount=t,this._onNeighboursChange=e}}check(t,e){const n=this._getAxes(t).concat(this._getAxes(e));for(const s of n){const n=this.project(t,s),i=this.project(e,s);if(!this._overlaps(n,i))return!1}return!0}project(t,e){var n,s;let i=1/0,o=-1/0;for(const r of null!==(s=null===(n=t.tryGetComponent(l))||void 0===n?void 0:n.Dots)&&void 0!==s?s:[]){const t=e.X*r.X+e.Y*r.Y;i=Math.min(i,t),o=Math.max(o,t)}return{min:i,max:o}}_overlaps(t,e){return t.max>=e.min&&e.max>=t.min}_getAxes(t){var e,n;const s=[],i=null!==(n=null===(e=t.tryGetComponent(l))||void 0===e?void 0:e.Dots)&&void 0!==n?n:[];for(let t=0;t<i.length;t++){const e=i[t],n=i[(t+1)%i.length],o={X:n.X-e.X,Y:n.Y-e.Y},r={X:-o.Y,Y:o.X},a=Math.sqrt(Math.pow(r.X,2)+Math.pow(r.Y,2));s.push({X:r.X/a,Y:r.Y/a})}return s}}const m=new class extends i{constructor(t,e,n){super(),this._resizeCanvas=()=>{this.Canvas.width=innerWidth,this.Canvas.height=innerHeight,this.Canvas.style.cssText="position: absolute; top: 0; left: 0;"},this._onShowFps=()=>{const t=performance.now();for(;this._Times.length>0&&this._Times[0]<=t-1e3;)this._Times.shift();return this._Times.push(t),this._Times.length},this.addScene=t=>new r(this,t),this.removeScene=t=>{var e;null===(e=r.findByName(t))||void 0===e||e.destroy()},this.update=()=>{return t=this,e=void 0,s=function*(){const t=[];this.Context.clearRect(0,0,this.Width,this.Height),this.Childs.filter((t=>t.IsActive)).forEach((e=>{this.Context.setTransform(1,0,0,1,0,0),t.push(e.update()),this.Context.restore()})),this._IsShowFps&&this.showFps(this._IsShowFps),yield Promise.all(t)},new((n=void 0)||(n=Promise))((function(i,o){function r(t){try{h(s.next(t))}catch(t){o(t)}}function a(t){try{h(s.throw(t))}catch(t){o(t)}}function h(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}h((s=s.apply(t,e||[])).next())}));var t,e,n,s},this.showFps=(t=!1)=>{this._IsShowFps=t,this._IsShowFps&&(this.Context.beginPath(),this.Context.globalAlpha=.75,this.Context.fillStyle="black",this.Context.fillRect(10,10,70,24),this.Context.closePath(),this.Context.beginPath(),this.Context.globalAlpha=1,this.Context.textAlign="center",this.Context.strokeStyle="#00fb00",this.Context.textBaseline="middle",this.Context.font="lighter 18px sans-serif",this.Context.moveTo(35,22),this.Context.fillStyle="#00fb00",this.Context.fillText(`FPS: ${this._onShowFps()}`,45,22,70),this.Context.closePath())},this.play=()=>{this.update(),this.Loop=requestAnimationFrame(this.play)},this.pause=()=>{cancelAnimationFrame(this.Loop)},this._Times=[],this._IsShowFps=!1,this.Canvas=document.createElement("canvas"),this.Context=this.Canvas.getContext("2d"),void 0===e||void 0===n||null===e||null===n?(this._resizeCanvas(),window.addEventListener("resize",(t=>{this._resizeCanvas()}))):(this.Canvas.width=e,this.Canvas.height=n),t.appendChild(this.Canvas)}get Childs(){return super.Childs}set Name(t){if(i.findByName(t))throw new Error(`ОШИБКА: ${this.constructor.name} с именем '${t}' уже существует.`);super.Name=t}get Name(){return super.Name}get Width(){return this.Canvas.width}get Height(){return this.Canvas.height}get Scenes(){return this.Childs}static findSceneByName(t){return Array.from(this.Objects,(([t,e])=>e)).find((e=>e instanceof r&&e.Name===t))}static findById(t){return super.findById(t)}static findByName(t){return super.findByName(t)}static findByTag(t){return super.findByTag(t)}}(document.body),f=m.addScene("game"),g=f.addLayer("world"),p=f.addLayer("interface");(()=>{for(let t=0;t<100;t++){const t=new h("cube",d,l,u);t.Transform.Position={X:e.Integer(innerWidth),Y:e.Integer(innerHeight)},t.getComponent(d).moveTo({X:e.Integer(innerWidth),Y:e.Integer(innerHeight)}),t.getComponent(d).onStart(((t,n)=>{t.Transform.rotateToPoint(n.Target),t.getComponent(l).drawByDotsCount(e.Integer(3,10),e.Integer(5,10)),t.getComponent(l).FillStyle={Color:"green"},t.getComponent(d).Speed=1,t.setLayer(g)})),t.getComponent(u).onCollision(((t,e)=>{t.getComponent(d).stop(),t.getComponent(l).FillStyle={Color:"red"},e.getComponent(d).stop(),e.getComponent(l).FillStyle={Color:"red"}})),t.getComponent(d).onFinish((t=>{console.log(`${t.Id} is stop!`),setTimeout((()=>{t.getComponent(l).drawByDotsCount(e.Integer(3,10),e.Integer(5,10)),t.getComponent(d).moveTo({X:e.Integer(innerWidth),Y:e.Integer(innerHeight)})}),2e3)})),g.addGameObject(t)}})(),m.showFps(!0),m.play(),document.body.addEventListener("keypress",(t=>{if("Spacebar"===t.key||" "===t.key){console.log("click");const t=g.Order;g.Order=p.Order,p.Order=t}}))})();