var d=true;function f(a,c){a.prototype=c.constructor==Function?new c:c;a.prototype.constructor=a}function g(a,c){var b={},e;for(e in c)b[e]=c[e];for(e in a)b[e]=a[e];return b}function h(a){this.l=a;this.children=[]}h.prototype.e=function(){for(var a=0;a<this.children.length;a++)this.l.save(),this.children[a].e(this.l),this.l.restore()};function i(a){a=g(a,{left:0,top:0,t:d,a:0});this.left=a.left;this.top=a.top;this.t=a.t;this.a=a.a}i.prototype.e=function(){console.log("ERROR: Calling unimplemented draw method on drawable object.")};
function j(a){a=g(a,{lineWidth:1,color:"black"});i.call(this,a);this.lineWidth=a.lineWidth;this.color=a.color}f(j,i);function Text(a){a=g(a,{content:"",fill:"black",font:"12pt Helvetica",height:12});i.call(this,a);this.content=a.content;this.fill=a.fill;this.font=a.font;this.height=a.height}f(Text,i);Text.prototype.e=function(a){a.fillStyle=this.fill;a.font=this.font;a.fillText(this.content,this.left,this.height)};
function k(a){a=g(a,{width:-1,height:-1,src:""});i.call(this,a);this.width=a.width;this.height=a.height;this.src=a.src}f(k,i);k.prototype.e=function(a){var c=new Image,b=this.left,e=this.top,A=this.width,B=this.height;c.src=this.src;A!=-1&&B!=-1?a.drawImage(c,b,e,A,B):a.drawImage(c,b,e)};function l(a){a=g(a,{p:0,q:0,m:0,n:0,lineWidth:1});j.call(this,a);this.p=a.p;this.q=a.q;this.m=a.m;this.n=a.n;this.lineWidth=a.lineWidth}f(l,j);
l.prototype.e=function(a){a.beginPath();if(typeof this.lineWidth!="undefined")a.lineWidth=this.lineWidth;if(typeof this.color!="undefined")a.strokeStyle=this.color;a.moveTo(this.p,this.q);a.lineTo(this.m,this.n);a.closePath();a.stroke()};function m(a){a=g(a,{type:"straight",f:[],fill:""});j.call(this,a);this.type=a.type;this.f=a.f;this.fill=a.fill}f(m,j);
m.prototype.e=function(a){if(this.f.length>0){a.beginPath();a.moveTo(this.f[0].x,this.f[0].y);if(typeof this.lineWidth!="undefined")a.lineWidth=this.lineWidth;if(typeof this.color!="undefined")a.strokeStyle=this.color;if(this.fill!="")a.fillStyle=this.fill;switch(this.type){case "straight":for(var c=1;c<this.f.length;c++){var b=this.f[c];a.lineTo(b.x,b.y)}break;case "quadratic":for(c=1;c<this.f.length;c++)b=this.f[c],a.quadraticCurveTo(b.u,b.v,b.x,b.y);break;case "bezier":for(c=1;c<this.f.length;c++)b=
this.f[c],a.bezierCurveTo(b.u,b.v,b.w,b.z,b.x,b.y)}this.fill!=""?a.fill():a.stroke()}};function n(a){a=g(a,{c:0,d:0,b:0,j:0,i:0,r:false,fill:""});j.call(this,a);this.c=a.c;this.d=a.d;this.b=a.b;this.j=a.j;this.i=a.i;this.r=a.r;this.left=a.c-a.b;this.top=a.d-a.b;this.fill=a.fill}f(n,j);
n.prototype.e=function(a){a.beginPath();if(typeof this.lineWidth!="undefined")a.lineWidth=this.lineWidth;if(typeof this.color!="undefined")a.strokeStyle=this.color;a.arc(this.c,this.d,this.b,this.j,this.i,this.r);if(this.fill!="")a.fillStyle=this.fill,a.fill();a.stroke()};
function o(a){a=g(a,{width:100,height:100,fill:"",borderColor:"black",borderWidth:0,k:"",g:0,h:0});i.call(this,a);this.children=[];this.width=a.width;this.height=a.height;this.fill=a.fill;this.borderColor=a.borderColor;this.borderWidth=a.borderWidth;this.k=a.k;this.g=a.g;this.h=a.h}f(o,i);
o.prototype.e=function(a){a.save();if(this.borderWidth!=0)a.lineWidth=this.borderWidth;a.translate(this.left,this.top);a.rotate(this.a);a.beginPath();a.moveTo(0,0);a.lineTo(this.width,0);a.lineTo(this.width,this.height);a.lineTo(0,this.height);a.lineTo(0,0);a.closePath();if(this.fill!="")a.fillStyle=this.fill,a.fill();if(this.k!=""){for(var c=a.createLinearGradient(0,0,this.width,this.height),b=0;b<this.k.length;b++){var e=this.k[b];c.addColorStop(e.position,e.color)}a.fillStyle=c;a.fill()}this.borderWidth!=
0&&a.stroke();a.clip();for(b=0;b<this.children.length;b++)c=this.children[b],a.save(),c.e(a),a.restore();a.restore()};function p(a){a=g(a,{b:100,o:3,c:100,d:100,s:0});o.call(this,a);this.b=a.b;this.o=a.o;this.c=a.c;this.d=a.d;this.s=a.s;this.left=a.c-a.b;this.top=a.d-a.b}f(p,o);
p.prototype.e=function(a){a.save();if(this.borderWidth!=0)a.lineWidth=this.borderWidth;if(typeof this.borderColor!="undefined")a.strokeStyle=this.borderColor;if(typeof this.fill!="undefined")a.fillStyle=this.fill;a.save();a.translate(this.c,this.d);a.rotate(-this.s);var c=360/this.o*(Math.PI/180);a.beginPath();a.moveTo(this.b,0);for(var b=1;b<=this.o;b++){var e=c*b;a.lineTo(this.b*Math.cos(e),this.b*Math.sin(e))}a.closePath();a.fill();a.stroke();a.clip();a.restore();a.save();a.translate(this.left,
this.top);for(b=0;b<this.children.length;b++)c=this.children[b],a.save(),c.e(a),a.restore();a.restore();a.restore()};var q=800,r=500,s=void 0,t=void 0,u=void 0,v=void 0,w=[],x=0.05,y=6.75,z=false,C=d,D=void 0,E=0.25,F=1.75;
window.onload=function(){var a=document.getElementById("canvas"),c=a.getContext("2d");a.style.width=q+"px";a.style.height=r+"px";a.width=q;a.height=r;s=new h(c);t=new o({width:q,height:50,left:0,fill:"brown",top:r-50,borderWidth:2});u=new o({width:80,height:80,left:10,top:r-t.height-80,borderWidth:0});_launcher=new o({top:55,left:10,width:40,height:10,a:-Math.PI/3,fill:"#156100",borderWidth:1});u.children=[new n({c:11,d:72,lineWidth:1,b:7,fill:"#333",j:0,i:Math.PI*2}),new n({c:28,d:72,lineWidth:1,
b:7,fill:"#333",j:0,i:Math.PI*2}),new n({c:68,d:72,lineWidth:1,fill:"#333",b:7,j:0,i:Math.PI*2}),new o({top:60,left:0,height:8,width:80,fill:"#156100",borderWidth:1}),_launcher];v=new o({width:18,height:6,left:u.left+_launcher.left,top:u.top+_launcher.top,a:_launcher.a,borderWidth:0,g:3,h:-4});v.children=[new m({color:"black",lineWidth:1,type:"straight",f:[{x:0,y:1},{x:4,y:3},{x:0,y:5}]}),new l({p:2,q:3,m:16,n:3,lineWidth:1}),new m({color:"black",fill:"black",lineWidth:1,type:"straight",f:[{x:18,
y:3},{x:15,y:0},{x:15,y:6}]})];a=new Text({left:20,height:40,content:"Score: "});D=new Text({left:80,height:40,content:"0"});s.children=[a,D,v,t,u];s.e();window.addEventListener("keydown",G,d);setInterval(H,2E3);setInterval(I,10)};function H(){var a=new o({top:Math.random()*(r-70),left:q+10,height:16,width:16,borderWidth:0,g:E+Math.random()*(F-E)});a.children=[new n({c:8,d:8,lineWidth:1,fill:"red",b:6,j:0,i:Math.PI*2})];s.children.push(a);w.push(a)}
function I(){C&&s.l.clearRect(0,0,q,r-50);for(var a=0;a<w.length;a++){var c=w[a];c.left-=c.g;if(Math.abs(c.left-v.left)<=12&&Math.abs(c.top-v.top)<=12){w.splice(a,1);for(var b=0;b<s.children.length;b++)if(s.children[b]==c)s.children.splice(b,1),D.content=parseInt(D.content,10)+1}else if(c.left+15<0){w.splice(a,1);for(b=0;b<s.children.length;b++)s.children[b]==c&&s.children.splice(b,1)}}if(z)v.top<r&&v.left<q?(C=d,v.h+=x,a=v.left,c=v.top,a=Math.atan((c+v.h-c)/(a+v.g-a)),v.left+=v.g,v.top+=v.h,v.a=
a):(z=false,C=d,v.left=u.left+_launcher.left,v.top=u.top+_launcher.top,v.a=_launcher.a,v.g=y*Math.cos(-1*v.a),v.h=-1*y*Math.sin(-1*v.a));s.e()}
function G(a){switch(a.keyCode){case 38:if(_launcher.a+Math.PI/2>0.2&&(C=d,_launcher.a-=0.1,!z))v.a=_launcher.a,v.g=y*Math.cos(-1*v.a),v.h=-1*y*Math.sin(-1*v.a);break;case 40:if(_launcher.a<-0.1&&(C=d,_launcher.a+=0.1,!z))v.a=_launcher.a,v.g=y*Math.cos(-1*v.a),v.h=-1*y*Math.sin(-1*v.a);break;case 37:if(u.left>5&&(C=d,u.left-=3,!z))v.left=u.left+_launcher.left;break;case 39:if(q-u.left+u.width>5&&(C=d,u.left+=3,!z))v.left=u.left+_launcher.left;break;case 32:z||(C=z=d)}};