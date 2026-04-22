import{r as Dv,a as OS,g as Hp,b as be}from"./react-vendor-BPqIqOiq.js";var ud={exports:{}},ya={};var S0;function BS(){if(S0)return ya;S0=1;var r=Dv(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),n=Object.prototype.hasOwnProperty,i=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s={key:!0,ref:!0,__self:!0,__source:!0};function o(c,u,h){var f,p={},m=null,g=null;h!==void 0&&(m=""+h),u.key!==void 0&&(m=""+u.key),u.ref!==void 0&&(g=u.ref);for(f in u)n.call(u,f)&&!s.hasOwnProperty(f)&&(p[f]=u[f]);if(c&&c.defaultProps)for(f in u=c.defaultProps,u)p[f]===void 0&&(p[f]=u[f]);return{$$typeof:e,type:c,key:m,ref:g,props:p,_owner:i.current}}return ya.Fragment=t,ya.jsx=o,ya.jsxs=o,ya}var M0;function zS(){return M0||(M0=1,ud.exports=BS()),ud.exports}var Oi=zS(),Ec={},w0;function kS(){if(w0)return Ec;w0=1;var r=OS();return Ec.createRoot=r.createRoot,Ec.hydrateRoot=r.hydrateRoot,Ec}var Nv=kS();const kP=Hp(Nv),VS="modulepreload",HS=function(r){return"/"+r},E0={},VP=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){let u=function(h){return Promise.all(h.map(f=>Promise.resolve(f).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),c=o?.nonce||o?.getAttribute("nonce");i=u(t.map(h=>{if(h=HS(h),h in E0)return;E0[h]=!0;const f=h.endsWith(".css"),p=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${p}`))return;const m=document.createElement("link");if(m.rel=f?"stylesheet":VS,f||(m.as="script"),m.crossOrigin="",m.href=h,c&&m.setAttribute("nonce",c),document.head.appendChild(m),f)return new Promise((g,x)=>{m.addEventListener("load",g),m.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${h}`)))})}))}function s(o){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=o,window.dispatchEvent(c),!c.defaultPrevented)throw o}return i.then(o=>{for(const c of o||[])c.status==="rejected"&&s(c.reason);return e().catch(s)})};const gl="184",GS={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},WS={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Uv=0,yp=1,Fv=2,XS=3,Ov=0,zo=1,ka=2,Ns=3,Rr=0,Wn=1,zi=2,lr=0,Bs=1,Sp=2,Mp=3,wp=4,Bv=5,qS=6,jr=100,zv=101,kv=102,Vv=103,Hv=104,Gv=200,Wv=201,Xv=202,qv=203,bu=204,Tu=205,Yv=206,Zv=207,Jv=208,jv=209,Kv=210,Qv=211,$v=212,ex=213,tx=214,Au=0,Cu=1,Ru=2,Gs=3,Pu=4,Iu=5,Lu=6,Du=7,_l=0,nx=1,ix=2,Ci=0,Gp=1,Wp=2,Xp=3,Sh=4,qp=5,Yp=6,Zp=7,Ep="attached",rx="detached",Mh=300,cr=301,es=302,Va=303,Ha=304,Zo=306,Ka=1e3,ti=1001,Qa=1002,on=1003,Jp=1004,YS=1004,Uo=1005,ZS=1005,Yt=1006,Ga=1007,JS=1007,or=1008,jS=1008,Vn=1009,jp=1010,Kp=1011,Vo=1012,wh=1013,Ri=1014,Gn=1015,ur=1016,Eh=1017,bh=1018,Ho=1020,Qp=35902,$p=35899,em=1021,tm=1022,Nn=1023,hr=1026,Kr=1027,Th=1028,vl=1029,ts=1030,Ah=1031,KS=1032,Ch=1033,Wa=33776,Xa=33777,qa=33778,Ya=33779,Nu=35840,Uu=35841,Fu=35842,Ou=35843,Bu=36196,zu=37492,ku=37496,Vu=37488,Hu=37489,$a=37490,Gu=37491,Wu=37808,Xu=37809,qu=37810,Yu=37811,Zu=37812,Ju=37813,ju=37814,Ku=37815,Qu=37816,$u=37817,eh=37818,th=37819,nh=37820,ih=37821,rh=36492,sh=36494,oh=36495,ah=36283,lh=36284,el=36285,ch=36286,sx=2200,ox=2201,ax=2202,tl=2300,uh=2301,Su=2302,bp=2303,Us=2400,Fs=2401,nl=2402,Rh=2500,nm=2501,QS=0,$S=1,eM=2,lx=3200,tM=3201,nM=3202,iM=3203,Pr=0,cx=1,Tr="",$n="srgb",il="srgb-linear",rl="linear",Ht="srgb",rM="",sM="rg",oM="ga",aM=0,Ls=7680,lM=7681,cM=7682,uM=7683,hM=34055,fM=34056,dM=5386,pM=512,mM=513,gM=514,_M=515,vM=516,xM=517,yM=518,Tp=519,ux=512,hx=513,fx=514,Ph=515,dx=516,px=517,Ih=518,mx=519,sl=35044,SM=35048,MM=35040,wM=35045,EM=35049,bM=35041,TM=35046,AM=35050,CM=35042,RM="100",Ap="300 es",hi=2e3,Ws=2001,PM={COMPUTE:"compute",RENDER:"render"},IM={PERSPECTIVE:"perspective",LINEAR:"linear",FLAT:"flat"},LM={NORMAL:"normal",CENTROID:"centroid",SAMPLE:"sample",FIRST:"first",EITHER:"either"},DM={TEXTURE_COMPARE:"depthTextureCompare"};function NM(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}const UM={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function Fo(r,e){return new UM[r](e)}function gx(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function ol(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function _x(){const r=ol("canvas");return r.style.display="block",r}const b0={};let ns=null;function FM(r){ns=r}function OM(){return ns}function al(...r){const e="THREE."+r.shift();ns?ns("log",e,...r):console.log(e,...r)}function vx(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Oe(...r){r=vx(r);const e="THREE."+r.shift();if(ns)ns("warn",e,...r);else{const t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function rt(...r){r=vx(r);const e="THREE."+r.shift();if(ns)ns("error",e,...r);else{const t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function hh(...r){const e=r.join(" ");e in b0||(b0[e]=!0,Oe(...r))}function BM(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const zM={[Au]:Cu,[Ru]:Lu,[Pu]:Du,[Gs]:Iu,[Cu]:Au,[Lu]:Ru,[Du]:Pu,[Iu]:Gs};class Gi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const In=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let T0=1234567;const zs=Math.PI/180,Go=180/Math.PI;function di(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(In[r&255]+In[r>>8&255]+In[r>>16&255]+In[r>>24&255]+"-"+In[e&255]+In[e>>8&255]+"-"+In[e>>16&15|64]+In[e>>24&255]+"-"+In[t&63|128]+In[t>>8&255]+"-"+In[t>>16&255]+In[t>>24&255]+In[n&255]+In[n>>8&255]+In[n>>16&255]+In[n>>24&255]).toLowerCase()}function ht(r,e,t){return Math.max(e,Math.min(t,r))}function im(r,e){return(r%e+e)%e}function kM(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function VM(r,e,t){return r!==e?(t-r)/(e-r):0}function Za(r,e,t){return(1-t)*r+t*e}function HM(r,e,t,n){return Za(r,e,1-Math.exp(-t*n))}function GM(r,e=1){return e-Math.abs(im(r,e*2)-e)}function WM(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function XM(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function qM(r,e){return r+Math.floor(Math.random()*(e-r+1))}function YM(r,e){return r+Math.random()*(e-r)}function ZM(r){return r*(.5-Math.random())}function JM(r){r!==void 0&&(T0=r);let e=T0+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function jM(r){return r*zs}function KM(r){return r*Go}function QM(r){return(r&r-1)===0&&r!==0}function $M(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function e1(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function t1(r,e,t,n,i){const s=Math.cos,o=Math.sin,c=s(t/2),u=o(t/2),h=s((e+n)/2),f=o((e+n)/2),p=s((e-n)/2),m=o((e-n)/2),g=s((n-e)/2),x=o((n-e)/2);switch(i){case"XYX":r.set(c*f,u*p,u*m,c*h);break;case"YZY":r.set(u*m,c*f,u*p,c*h);break;case"ZXZ":r.set(u*p,u*m,c*f,c*h);break;case"XZX":r.set(c*f,u*x,u*g,c*h);break;case"YXY":r.set(u*g,c*f,u*x,c*h);break;case"ZYZ":r.set(u*x,u*g,c*f,c*h);break;default:Oe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Hn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function wt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const xx={DEG2RAD:zs,RAD2DEG:Go,generateUUID:di,clamp:ht,euclideanModulo:im,mapLinear:kM,inverseLerp:VM,lerp:Za,damp:HM,pingpong:GM,smoothstep:WM,smootherstep:XM,randInt:qM,randFloat:YM,randFloatSpread:ZM,seededRandom:JM,degToRad:jM,radToDeg:KM,isPowerOfTwo:QM,ceilPowerOfTwo:$M,floorPowerOfTwo:e1,setQuaternionFromProperEuler:t1,normalize:wt,denormalize:Hn},zm=class zm{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};zm.prototype.isVector2=!0;let pe=zm;class Xn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,c){let u=n[i+0],h=n[i+1],f=n[i+2],p=n[i+3],m=s[o+0],g=s[o+1],x=s[o+2],w=s[o+3];if(p!==w||u!==m||h!==g||f!==x){let y=u*m+h*g+f*x+p*w;y<0&&(m=-m,g=-g,x=-x,w=-w,y=-y);let v=1-c;if(y<.9995){const M=Math.acos(y),E=Math.sin(M);v=Math.sin(v*M)/E,c=Math.sin(c*M)/E,u=u*v+m*c,h=h*v+g*c,f=f*v+x*c,p=p*v+w*c}else{u=u*v+m*c,h=h*v+g*c,f=f*v+x*c,p=p*v+w*c;const M=1/Math.sqrt(u*u+h*h+f*f+p*p);u*=M,h*=M,f*=M,p*=M}}e[t]=u,e[t+1]=h,e[t+2]=f,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,i,s,o){const c=n[i],u=n[i+1],h=n[i+2],f=n[i+3],p=s[o],m=s[o+1],g=s[o+2],x=s[o+3];return e[t]=c*x+f*p+u*g-h*m,e[t+1]=u*x+f*m+h*p-c*g,e[t+2]=h*x+f*g+c*m-u*p,e[t+3]=f*x-c*p-u*m-h*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,c=Math.cos,u=Math.sin,h=c(n/2),f=c(i/2),p=c(s/2),m=u(n/2),g=u(i/2),x=u(s/2);switch(o){case"XYZ":this._x=m*f*p+h*g*x,this._y=h*g*p-m*f*x,this._z=h*f*x+m*g*p,this._w=h*f*p-m*g*x;break;case"YXZ":this._x=m*f*p+h*g*x,this._y=h*g*p-m*f*x,this._z=h*f*x-m*g*p,this._w=h*f*p+m*g*x;break;case"ZXY":this._x=m*f*p-h*g*x,this._y=h*g*p+m*f*x,this._z=h*f*x+m*g*p,this._w=h*f*p-m*g*x;break;case"ZYX":this._x=m*f*p-h*g*x,this._y=h*g*p+m*f*x,this._z=h*f*x-m*g*p,this._w=h*f*p+m*g*x;break;case"YZX":this._x=m*f*p+h*g*x,this._y=h*g*p+m*f*x,this._z=h*f*x-m*g*p,this._w=h*f*p-m*g*x;break;case"XZY":this._x=m*f*p-h*g*x,this._y=h*g*p-m*f*x,this._z=h*f*x+m*g*p,this._w=h*f*p+m*g*x;break;default:Oe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],c=t[5],u=t[9],h=t[2],f=t[6],p=t[10],m=n+c+p;if(m>0){const g=.5/Math.sqrt(m+1);this._w=.25/g,this._x=(f-u)*g,this._y=(s-h)*g,this._z=(o-i)*g}else if(n>c&&n>p){const g=2*Math.sqrt(1+n-c-p);this._w=(f-u)/g,this._x=.25*g,this._y=(i+o)/g,this._z=(s+h)/g}else if(c>p){const g=2*Math.sqrt(1+c-n-p);this._w=(s-h)/g,this._x=(i+o)/g,this._y=.25*g,this._z=(u+f)/g}else{const g=2*Math.sqrt(1+p-n-c);this._w=(o-i)/g,this._x=(s+h)/g,this._y=(u+f)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ht(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,c=t._x,u=t._y,h=t._z,f=t._w;return this._x=n*f+o*c+i*h-s*u,this._y=i*f+o*u+s*c-n*h,this._z=s*f+o*h+n*u-i*c,this._w=o*f-n*c-i*u-s*h,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,o=e._w,c=this.dot(e);c<0&&(n=-n,i=-i,s=-s,o=-o,c=-c);let u=1-t;if(c<.9995){const h=Math.acos(c),f=Math.sin(h);u=Math.sin(u*h)/f,t=Math.sin(t*h)/f,this._x=this._x*u+n*t,this._y=this._y*u+i*t,this._z=this._z*u+s*t,this._w=this._w*u+o*t,this._onChangeCallback()}else this._x=this._x*u+n*t,this._y=this._y*u+i*t,this._z=this._z*u+s*t,this._w=this._w*u+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const km=class km{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(A0.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(A0.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,c=e.z,u=e.w,h=2*(o*i-c*n),f=2*(c*t-s*i),p=2*(s*n-o*t);return this.x=t+u*h+o*p-c*f,this.y=n+u*f+c*h-s*p,this.z=i+u*p+s*f-o*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,c=t.y,u=t.z;return this.x=i*u-s*c,this.y=s*o-n*u,this.z=n*c-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return hd.copy(this).projectOnVector(e),this.sub(hd)}reflect(e){return this.sub(hd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};km.prototype.isVector3=!0;let F=km;const hd=new F,A0=new Xn,Vm=class Vm{constructor(e,t,n,i,s,o,c,u,h){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,c,u,h)}set(e,t,n,i,s,o,c,u,h){const f=this.elements;return f[0]=e,f[1]=i,f[2]=c,f[3]=t,f[4]=s,f[5]=u,f[6]=n,f[7]=o,f[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],c=n[3],u=n[6],h=n[1],f=n[4],p=n[7],m=n[2],g=n[5],x=n[8],w=i[0],y=i[3],v=i[6],M=i[1],E=i[4],b=i[7],L=i[2],R=i[5],U=i[8];return s[0]=o*w+c*M+u*L,s[3]=o*y+c*E+u*R,s[6]=o*v+c*b+u*U,s[1]=h*w+f*M+p*L,s[4]=h*y+f*E+p*R,s[7]=h*v+f*b+p*U,s[2]=m*w+g*M+x*L,s[5]=m*y+g*E+x*R,s[8]=m*v+g*b+x*U,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],c=e[5],u=e[6],h=e[7],f=e[8];return t*o*f-t*c*h-n*s*f+n*c*u+i*s*h-i*o*u}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],c=e[5],u=e[6],h=e[7],f=e[8],p=f*o-c*h,m=c*u-f*s,g=h*s-o*u,x=t*p+n*m+i*g;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/x;return e[0]=p*w,e[1]=(i*h-f*n)*w,e[2]=(c*n-i*o)*w,e[3]=m*w,e[4]=(f*t-i*u)*w,e[5]=(i*s-c*t)*w,e[6]=g*w,e[7]=(n*u-h*t)*w,e[8]=(o*t-n*s)*w,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,c){const u=Math.cos(s),h=Math.sin(s);return this.set(n*u,n*h,-n*(u*o+h*c)+o+e,-i*h,i*u,-i*(-h*o+u*c)+c+t,0,0,1),this}scale(e,t){return this.premultiply(fd.makeScale(e,t)),this}rotate(e){return this.premultiply(fd.makeRotation(-e)),this}translate(e,t){return this.premultiply(fd.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Vm.prototype.isMatrix3=!0;let vt=Vm;const fd=new vt,C0=new vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),R0=new vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function n1(){const r={enabled:!0,workingColorSpace:il,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Ht&&(i.r=Cr(i.r),i.g=Cr(i.g),i.b=Cr(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ht&&(i.r=ko(i.r),i.g=ko(i.g),i.b=ko(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Tr?rl:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return hh("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return hh("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[il]:{primaries:e,whitePoint:n,transfer:rl,toXYZ:C0,fromXYZ:R0,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:$n},outputColorSpaceConfig:{drawingBufferColorSpace:$n}},[$n]:{primaries:e,whitePoint:n,transfer:Ht,toXYZ:C0,fromXYZ:R0,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:$n}}}),r}const At=n1();function Cr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ko(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let co;class yx{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{co===void 0&&(co=ol("canvas")),co.width=e.width,co.height=e.height;const i=co.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=co}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ol("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Cr(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Cr(t[n]/255)*255):t[n]=Cr(t[n]);return{data:t,width:e.width,height:e.height}}else return Oe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let i1=0;class Qr{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:i1++}),this.uuid=di(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,c=i.length;o<c;o++)i[o].isDataTexture?s.push(dd(i[o].image)):s.push(dd(i[o]))}else s=dd(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function dd(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?yx.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Oe("Texture: Unable to serialize Texture."),{})}let r1=0;const pd=new F;class jt extends Gi{constructor(e=jt.DEFAULT_IMAGE,t=jt.DEFAULT_MAPPING,n=ti,i=ti,s=Yt,o=or,c=Nn,u=Vn,h=jt.DEFAULT_ANISOTROPY,f=Tr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:r1++}),this.uuid=di(),this.name="",this.source=new Qr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=h,this.format=c,this.internalFormat=null,this.type=u,this.offset=new pe(0,0),this.repeat=new pe(1,1),this.center=new pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(pd).x}get height(){return this.source.getSize(pd).y}get depth(){return this.source.getSize(pd).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Oe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Oe(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Mh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ka:e.x=e.x-Math.floor(e.x);break;case ti:e.x=e.x<0?0:1;break;case Qa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ka:e.y=e.y-Math.floor(e.y);break;case ti:e.y=e.y<0?0:1;break;case Qa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}jt.DEFAULT_IMAGE=null;jt.DEFAULT_MAPPING=Mh;jt.DEFAULT_ANISOTROPY=1;const Hm=class Hm{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const u=e.elements,h=u[0],f=u[4],p=u[8],m=u[1],g=u[5],x=u[9],w=u[2],y=u[6],v=u[10];if(Math.abs(f-m)<.01&&Math.abs(p-w)<.01&&Math.abs(x-y)<.01){if(Math.abs(f+m)<.1&&Math.abs(p+w)<.1&&Math.abs(x+y)<.1&&Math.abs(h+g+v-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(h+1)/2,b=(g+1)/2,L=(v+1)/2,R=(f+m)/4,U=(p+w)/4,A=(x+y)/4;return E>b&&E>L?E<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(E),i=R/n,s=U/n):b>L?b<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(b),n=R/i,s=A/i):L<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(L),n=U/s,i=A/s),this.set(n,i,s,t),this}let M=Math.sqrt((y-x)*(y-x)+(p-w)*(p-w)+(m-f)*(m-f));return Math.abs(M)<.001&&(M=1),this.x=(y-x)/M,this.y=(p-w)/M,this.z=(m-f)/M,this.w=Math.acos((h+g+v-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this.w=ht(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this.w=ht(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Hm.prototype.isVector4=!0;let Rt=Hm;class rm extends Gi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Rt(0,0,e,t),this.scissorTest=!1,this.viewport=new Rt(0,0,e,t),this.textures=[];const i={width:e,height:t,depth:n.depth},s=new jt(i),o=n.count;for(let c=0;c<o;c++)this.textures[c]=s.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Yt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Qr(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class pi extends rm{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Lh extends jt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=on,this.minFilter=on,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class s1 extends pi{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Lh(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}class Dh extends jt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=on,this.minFilter=on,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class o1 extends pi{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Dh(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}const yh=class yh{constructor(e,t,n,i,s,o,c,u,h,f,p,m,g,x,w,y){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,c,u,h,f,p,m,g,x,w,y)}set(e,t,n,i,s,o,c,u,h,f,p,m,g,x,w,y){const v=this.elements;return v[0]=e,v[4]=t,v[8]=n,v[12]=i,v[1]=s,v[5]=o,v[9]=c,v[13]=u,v[2]=h,v[6]=f,v[10]=p,v[14]=m,v[3]=g,v[7]=x,v[11]=w,v[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new yh().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,i=1/uo.setFromMatrixColumn(e,0).length(),s=1/uo.setFromMatrixColumn(e,1).length(),o=1/uo.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),c=Math.sin(n),u=Math.cos(i),h=Math.sin(i),f=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){const m=o*f,g=o*p,x=c*f,w=c*p;t[0]=u*f,t[4]=-u*p,t[8]=h,t[1]=g+x*h,t[5]=m-w*h,t[9]=-c*u,t[2]=w-m*h,t[6]=x+g*h,t[10]=o*u}else if(e.order==="YXZ"){const m=u*f,g=u*p,x=h*f,w=h*p;t[0]=m+w*c,t[4]=x*c-g,t[8]=o*h,t[1]=o*p,t[5]=o*f,t[9]=-c,t[2]=g*c-x,t[6]=w+m*c,t[10]=o*u}else if(e.order==="ZXY"){const m=u*f,g=u*p,x=h*f,w=h*p;t[0]=m-w*c,t[4]=-o*p,t[8]=x+g*c,t[1]=g+x*c,t[5]=o*f,t[9]=w-m*c,t[2]=-o*h,t[6]=c,t[10]=o*u}else if(e.order==="ZYX"){const m=o*f,g=o*p,x=c*f,w=c*p;t[0]=u*f,t[4]=x*h-g,t[8]=m*h+w,t[1]=u*p,t[5]=w*h+m,t[9]=g*h-x,t[2]=-h,t[6]=c*u,t[10]=o*u}else if(e.order==="YZX"){const m=o*u,g=o*h,x=c*u,w=c*h;t[0]=u*f,t[4]=w-m*p,t[8]=x*p+g,t[1]=p,t[5]=o*f,t[9]=-c*f,t[2]=-h*f,t[6]=g*p+x,t[10]=m-w*p}else if(e.order==="XZY"){const m=o*u,g=o*h,x=c*u,w=c*h;t[0]=u*f,t[4]=-p,t[8]=h*f,t[1]=m*p+w,t[5]=o*f,t[9]=g*p-x,t[2]=x*p-g,t[6]=c*f,t[10]=w*p+m}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(a1,e,l1)}lookAt(e,t,n){const i=this.elements;return ci.subVectors(e,t),ci.lengthSq()===0&&(ci.z=1),ci.normalize(),Vr.crossVectors(n,ci),Vr.lengthSq()===0&&(Math.abs(n.z)===1?ci.x+=1e-4:ci.z+=1e-4,ci.normalize(),Vr.crossVectors(n,ci)),Vr.normalize(),bc.crossVectors(ci,Vr),i[0]=Vr.x,i[4]=bc.x,i[8]=ci.x,i[1]=Vr.y,i[5]=bc.y,i[9]=ci.y,i[2]=Vr.z,i[6]=bc.z,i[10]=ci.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],c=n[4],u=n[8],h=n[12],f=n[1],p=n[5],m=n[9],g=n[13],x=n[2],w=n[6],y=n[10],v=n[14],M=n[3],E=n[7],b=n[11],L=n[15],R=i[0],U=i[4],A=i[8],P=i[12],O=i[1],D=i[5],V=i[9],K=i[13],te=i[2],H=i[6],Z=i[10],J=i[14],z=i[3],W=i[7],q=i[11],re=i[15];return s[0]=o*R+c*O+u*te+h*z,s[4]=o*U+c*D+u*H+h*W,s[8]=o*A+c*V+u*Z+h*q,s[12]=o*P+c*K+u*J+h*re,s[1]=f*R+p*O+m*te+g*z,s[5]=f*U+p*D+m*H+g*W,s[9]=f*A+p*V+m*Z+g*q,s[13]=f*P+p*K+m*J+g*re,s[2]=x*R+w*O+y*te+v*z,s[6]=x*U+w*D+y*H+v*W,s[10]=x*A+w*V+y*Z+v*q,s[14]=x*P+w*K+y*J+v*re,s[3]=M*R+E*O+b*te+L*z,s[7]=M*U+E*D+b*H+L*W,s[11]=M*A+E*V+b*Z+L*q,s[15]=M*P+E*K+b*J+L*re,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],c=e[5],u=e[9],h=e[13],f=e[2],p=e[6],m=e[10],g=e[14],x=e[3],w=e[7],y=e[11],v=e[15],M=u*g-h*m,E=c*g-h*p,b=c*m-u*p,L=o*g-h*f,R=o*m-u*f,U=o*p-c*f;return t*(w*M-y*E+v*b)-n*(x*M-y*L+v*R)+i*(x*E-w*L+v*U)-s*(x*b-w*R+y*U)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],c=e[5],u=e[6],h=e[7],f=e[8],p=e[9],m=e[10],g=e[11],x=e[12],w=e[13],y=e[14],v=e[15],M=t*c-n*o,E=t*u-i*o,b=t*h-s*o,L=n*u-i*c,R=n*h-s*c,U=i*h-s*u,A=f*w-p*x,P=f*y-m*x,O=f*v-g*x,D=p*y-m*w,V=p*v-g*w,K=m*v-g*y,te=M*K-E*V+b*D+L*O-R*P+U*A;if(te===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/te;return e[0]=(c*K-u*V+h*D)*H,e[1]=(i*V-n*K-s*D)*H,e[2]=(w*U-y*R+v*L)*H,e[3]=(m*R-p*U-g*L)*H,e[4]=(u*O-o*K-h*P)*H,e[5]=(t*K-i*O+s*P)*H,e[6]=(y*b-x*U-v*E)*H,e[7]=(f*U-m*b+g*E)*H,e[8]=(o*V-c*O+h*A)*H,e[9]=(n*O-t*V-s*A)*H,e[10]=(x*R-w*b+v*M)*H,e[11]=(p*b-f*R-g*M)*H,e[12]=(c*P-o*D-u*A)*H,e[13]=(t*D-n*P+i*A)*H,e[14]=(w*E-x*L-y*M)*H,e[15]=(f*L-p*E+m*M)*H,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,c=e.y,u=e.z,h=s*o,f=s*c;return this.set(h*o+n,h*c-i*u,h*u+i*c,0,h*c+i*u,f*c+n,f*u-i*o,0,h*u-i*c,f*u+i*o,s*u*u+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,c=t._z,u=t._w,h=s+s,f=o+o,p=c+c,m=s*h,g=s*f,x=s*p,w=o*f,y=o*p,v=c*p,M=u*h,E=u*f,b=u*p,L=n.x,R=n.y,U=n.z;return i[0]=(1-(w+v))*L,i[1]=(g+b)*L,i[2]=(x-E)*L,i[3]=0,i[4]=(g-b)*R,i[5]=(1-(m+v))*R,i[6]=(y+M)*R,i[7]=0,i[8]=(x+E)*U,i[9]=(y-M)*U,i[10]=(1-(m+w))*U,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let o=uo.set(i[0],i[1],i[2]).length();const c=uo.set(i[4],i[5],i[6]).length(),u=uo.set(i[8],i[9],i[10]).length();s<0&&(o=-o),Ni.copy(this);const h=1/o,f=1/c,p=1/u;return Ni.elements[0]*=h,Ni.elements[1]*=h,Ni.elements[2]*=h,Ni.elements[4]*=f,Ni.elements[5]*=f,Ni.elements[6]*=f,Ni.elements[8]*=p,Ni.elements[9]*=p,Ni.elements[10]*=p,t.setFromRotationMatrix(Ni),n.x=o,n.y=c,n.z=u,this}makePerspective(e,t,n,i,s,o,c=hi,u=!1){const h=this.elements,f=2*s/(t-e),p=2*s/(n-i),m=(t+e)/(t-e),g=(n+i)/(n-i);let x,w;if(u)x=s/(o-s),w=o*s/(o-s);else if(c===hi)x=-(o+s)/(o-s),w=-2*o*s/(o-s);else if(c===Ws)x=-o/(o-s),w=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return h[0]=f,h[4]=0,h[8]=m,h[12]=0,h[1]=0,h[5]=p,h[9]=g,h[13]=0,h[2]=0,h[6]=0,h[10]=x,h[14]=w,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,t,n,i,s,o,c=hi,u=!1){const h=this.elements,f=2/(t-e),p=2/(n-i),m=-(t+e)/(t-e),g=-(n+i)/(n-i);let x,w;if(u)x=1/(o-s),w=o/(o-s);else if(c===hi)x=-2/(o-s),w=-(o+s)/(o-s);else if(c===Ws)x=-1/(o-s),w=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return h[0]=f,h[4]=0,h[8]=0,h[12]=m,h[1]=0,h[5]=p,h[9]=0,h[13]=g,h[2]=0,h[6]=0,h[10]=x,h[14]=w,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};yh.prototype.isMatrix4=!0;let dt=yh;const uo=new F,Ni=new dt,a1=new F(0,0,0),l1=new F(1,1,1),Vr=new F,bc=new F,ci=new F,P0=new dt,I0=new Xn;class Hi{constructor(e=0,t=0,n=0,i=Hi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],c=i[8],u=i[1],h=i[5],f=i[9],p=i[2],m=i[6],g=i[10];switch(t){case"XYZ":this._y=Math.asin(ht(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,g),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(m,h),this._z=0);break;case"YXZ":this._x=Math.asin(-ht(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(c,g),this._z=Math.atan2(u,h)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(ht(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-p,g),this._z=Math.atan2(-o,h)):(this._y=0,this._z=Math.atan2(u,s));break;case"ZYX":this._y=Math.asin(-ht(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(m,g),this._z=Math.atan2(u,s)):(this._x=0,this._z=Math.atan2(-o,h));break;case"YZX":this._z=Math.asin(ht(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-f,h),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(c,g));break;case"XZY":this._z=Math.asin(-ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(m,h),this._y=Math.atan2(c,s)):(this._x=Math.atan2(-f,g),this._y=0);break;default:Oe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return P0.makeRotationFromQuaternion(e),this.setFromRotationMatrix(P0,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return I0.setFromEuler(this),this.setFromQuaternion(I0,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Hi.DEFAULT_ORDER="XYZ";class ks{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let c1=0;const L0=new F,ho=new Xn,yr=new dt,Tc=new F,Sa=new F,u1=new F,h1=new Xn,D0=new F(1,0,0),N0=new F(0,1,0),U0=new F(0,0,1),F0={type:"added"},f1={type:"removed"},fo={type:"childadded",child:null},md={type:"childremoved",child:null};class Nt extends Gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:c1++}),this.uuid=di(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Nt.DEFAULT_UP.clone();const e=new F,t=new Hi,n=new Xn,i=new F(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new dt},normalMatrix:{value:new vt}}),this.matrix=new dt,this.matrixWorld=new dt,this.matrixAutoUpdate=Nt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ks,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ho.setFromAxisAngle(e,t),this.quaternion.multiply(ho),this}rotateOnWorldAxis(e,t){return ho.setFromAxisAngle(e,t),this.quaternion.premultiply(ho),this}rotateX(e){return this.rotateOnAxis(D0,e)}rotateY(e){return this.rotateOnAxis(N0,e)}rotateZ(e){return this.rotateOnAxis(U0,e)}translateOnAxis(e,t){return L0.copy(e).applyQuaternion(this.quaternion),this.position.add(L0.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(D0,e)}translateY(e){return this.translateOnAxis(N0,e)}translateZ(e){return this.translateOnAxis(U0,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Tc.copy(e):Tc.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Sa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yr.lookAt(Sa,Tc,this.up):yr.lookAt(Tc,Sa,this.up),this.quaternion.setFromRotationMatrix(yr),i&&(yr.extractRotation(i.matrixWorld),ho.setFromRotationMatrix(yr),this.quaternion.premultiply(ho.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(rt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(F0),fo.child=e,this.dispatchEvent(fo),fo.child=null):rt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(f1),md.child=e,this.dispatchEvent(md),md.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yr.multiply(e.parent.matrixWorld)),e.applyMatrix4(yr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(F0),fo.child=e,this.dispatchEvent(fo),fo.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sa,e,u1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sa,h1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(c=>({...c})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(c,u){return c[u.uuid]===void 0&&(c[u.uuid]=u.toJSON(e)),u.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const u=c.shapes;if(Array.isArray(u))for(let h=0,f=u.length;h<f;h++){const p=u[h];s(e.shapes,p)}else s(e.shapes,u)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let u=0,h=this.material.length;u<h;u++)c.push(s(e.materials,this.material[u]));i.material=c}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let c=0;c<this.children.length;c++)i.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let c=0;c<this.animations.length;c++){const u=this.animations[c];i.animations.push(s(e.animations,u))}}if(t){const c=o(e.geometries),u=o(e.materials),h=o(e.textures),f=o(e.images),p=o(e.shapes),m=o(e.skeletons),g=o(e.animations),x=o(e.nodes);c.length>0&&(n.geometries=c),u.length>0&&(n.materials=u),h.length>0&&(n.textures=h),f.length>0&&(n.images=f),p.length>0&&(n.shapes=p),m.length>0&&(n.skeletons=m),g.length>0&&(n.animations=g),x.length>0&&(n.nodes=x)}return n.object=i,n;function o(c){const u=[];for(const h in c){const f=c[h];delete f.metadata,u.push(f)}return u}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Nt.DEFAULT_UP=new F(0,1,0);Nt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Oo extends Nt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const d1={type:"move"};class Mu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Oo,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Oo,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Oo,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const c=this._targetRay,u=this._grip,h=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(h&&e.hand){o=!0;for(const w of e.hand.values()){const y=t.getJointPose(w,n),v=this._getHandJoint(h,w);y!==null&&(v.matrix.fromArray(y.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=y.radius),v.visible=y!==null}const f=h.joints["index-finger-tip"],p=h.joints["thumb-tip"],m=f.position.distanceTo(p.position),g=.02,x=.005;h.inputState.pinching&&m>g+x?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&m<=g-x&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else u!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(u.matrix.fromArray(s.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,s.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(s.linearVelocity)):u.hasLinearVelocity=!1,s.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(s.angularVelocity)):u.hasAngularVelocity=!1,u.eventsEnabled&&u.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(c.matrix.fromArray(i.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,i.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(i.linearVelocity)):c.hasLinearVelocity=!1,i.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(i.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(d1)))}return c!==null&&(c.visible=i!==null),u!==null&&(u.visible=s!==null),h!==null&&(h.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Oo;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Sx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hr={h:0,s:0,l:0},Ac={h:0,s:0,l:0};function gd(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Ye{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=$n){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,At.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=At.workingColorSpace){return this.r=e,this.g=t,this.b=n,At.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=At.workingColorSpace){if(e=im(e,1),t=ht(t,0,1),n=ht(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=gd(o,s,e+1/3),this.g=gd(o,s,e),this.b=gd(o,s,e-1/3)}return At.colorSpaceToWorking(this,i),this}setStyle(e,t=$n){function n(s){s!==void 0&&parseFloat(s)<1&&Oe("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],c=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Oe("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);Oe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=$n){const n=Sx[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Oe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Cr(e.r),this.g=Cr(e.g),this.b=Cr(e.b),this}copyLinearToSRGB(e){return this.r=ko(e.r),this.g=ko(e.g),this.b=ko(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=$n){return At.workingToColorSpace(Ln.copy(this),e),Math.round(ht(Ln.r*255,0,255))*65536+Math.round(ht(Ln.g*255,0,255))*256+Math.round(ht(Ln.b*255,0,255))}getHexString(e=$n){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=At.workingColorSpace){At.workingToColorSpace(Ln.copy(this),t);const n=Ln.r,i=Ln.g,s=Ln.b,o=Math.max(n,i,s),c=Math.min(n,i,s);let u,h;const f=(c+o)/2;if(c===o)u=0,h=0;else{const p=o-c;switch(h=f<=.5?p/(o+c):p/(2-o-c),o){case n:u=(i-s)/p+(i<s?6:0);break;case i:u=(s-n)/p+2;break;case s:u=(n-i)/p+4;break}u/=6}return e.h=u,e.s=h,e.l=f,e}getRGB(e,t=At.workingColorSpace){return At.workingToColorSpace(Ln.copy(this),t),e.r=Ln.r,e.g=Ln.g,e.b=Ln.b,e}getStyle(e=$n){At.workingToColorSpace(Ln.copy(this),e);const t=Ln.r,n=Ln.g,i=Ln.b;return e!==$n?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Hr),this.setHSL(Hr.h+e,Hr.s+t,Hr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Hr),e.getHSL(Ac);const n=Za(Hr.h,Ac.h,t),i=Za(Hr.s,Ac.s,t),s=Za(Hr.l,Ac.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ln=new Ye;Ye.NAMES=Sx;class Nh{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ye(e),this.density=t}clone(){return new Nh(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Uh{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ye(e),this.near=t,this.far=n}clone(){return new Uh(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class fh extends Nt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Hi,this.environmentIntensity=1,this.environmentRotation=new Hi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Ui=new F,Sr=new F,_d=new F,Mr=new F,po=new F,mo=new F,O0=new F,vd=new F,xd=new F,yd=new F,Sd=new Rt,Md=new Rt,wd=new Rt;class ei{constructor(e=new F,t=new F,n=new F){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Ui.subVectors(e,t),i.cross(Ui);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Ui.subVectors(i,t),Sr.subVectors(n,t),_d.subVectors(e,t);const o=Ui.dot(Ui),c=Ui.dot(Sr),u=Ui.dot(_d),h=Sr.dot(Sr),f=Sr.dot(_d),p=o*h-c*c;if(p===0)return s.set(0,0,0),null;const m=1/p,g=(h*u-c*f)*m,x=(o*f-c*u)*m;return s.set(1-g-x,x,g)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Mr)===null?!1:Mr.x>=0&&Mr.y>=0&&Mr.x+Mr.y<=1}static getInterpolation(e,t,n,i,s,o,c,u){return this.getBarycoord(e,t,n,i,Mr)===null?(u.x=0,u.y=0,"z"in u&&(u.z=0),"w"in u&&(u.w=0),null):(u.setScalar(0),u.addScaledVector(s,Mr.x),u.addScaledVector(o,Mr.y),u.addScaledVector(c,Mr.z),u)}static getInterpolatedAttribute(e,t,n,i,s,o){return Sd.setScalar(0),Md.setScalar(0),wd.setScalar(0),Sd.fromBufferAttribute(e,t),Md.fromBufferAttribute(e,n),wd.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Sd,s.x),o.addScaledVector(Md,s.y),o.addScaledVector(wd,s.z),o}static isFrontFacing(e,t,n,i){return Ui.subVectors(n,t),Sr.subVectors(e,t),Ui.cross(Sr).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ui.subVectors(this.c,this.b),Sr.subVectors(this.a,this.b),Ui.cross(Sr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ei.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ei.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return ei.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return ei.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ei.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,c;po.subVectors(i,n),mo.subVectors(s,n),vd.subVectors(e,n);const u=po.dot(vd),h=mo.dot(vd);if(u<=0&&h<=0)return t.copy(n);xd.subVectors(e,i);const f=po.dot(xd),p=mo.dot(xd);if(f>=0&&p<=f)return t.copy(i);const m=u*p-f*h;if(m<=0&&u>=0&&f<=0)return o=u/(u-f),t.copy(n).addScaledVector(po,o);yd.subVectors(e,s);const g=po.dot(yd),x=mo.dot(yd);if(x>=0&&g<=x)return t.copy(s);const w=g*h-u*x;if(w<=0&&h>=0&&x<=0)return c=h/(h-x),t.copy(n).addScaledVector(mo,c);const y=f*x-g*p;if(y<=0&&p-f>=0&&g-x>=0)return O0.subVectors(s,i),c=(p-f)/(p-f+(g-x)),t.copy(i).addScaledVector(O0,c);const v=1/(y+w+m);return o=w*v,c=m*v,t.copy(n).addScaledVector(po,o).addScaledVector(mo,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class pn{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Fi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Fi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Fi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,c=s.count;o<c;o++)e.isMesh===!0?e.getVertexPosition(o,Fi):Fi.fromBufferAttribute(s,o),Fi.applyMatrix4(e.matrixWorld),this.expandByPoint(Fi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Cc.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Cc.copy(n.boundingBox)),Cc.applyMatrix4(e.matrixWorld),this.union(Cc)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Fi),Fi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ma),Rc.subVectors(this.max,Ma),go.subVectors(e.a,Ma),_o.subVectors(e.b,Ma),vo.subVectors(e.c,Ma),Gr.subVectors(_o,go),Wr.subVectors(vo,_o),ys.subVectors(go,vo);let t=[0,-Gr.z,Gr.y,0,-Wr.z,Wr.y,0,-ys.z,ys.y,Gr.z,0,-Gr.x,Wr.z,0,-Wr.x,ys.z,0,-ys.x,-Gr.y,Gr.x,0,-Wr.y,Wr.x,0,-ys.y,ys.x,0];return!Ed(t,go,_o,vo,Rc)||(t=[1,0,0,0,1,0,0,0,1],!Ed(t,go,_o,vo,Rc))?!1:(Pc.crossVectors(Gr,Wr),t=[Pc.x,Pc.y,Pc.z],Ed(t,go,_o,vo,Rc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Fi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Fi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(wr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),wr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),wr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),wr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),wr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),wr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),wr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),wr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(wr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const wr=[new F,new F,new F,new F,new F,new F,new F,new F],Fi=new F,Cc=new pn,go=new F,_o=new F,vo=new F,Gr=new F,Wr=new F,ys=new F,Ma=new F,Rc=new F,Pc=new F,Ss=new F;function Ed(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Ss.fromArray(r,s);const c=i.x*Math.abs(Ss.x)+i.y*Math.abs(Ss.y)+i.z*Math.abs(Ss.z),u=e.dot(Ss),h=t.dot(Ss),f=n.dot(Ss);if(Math.max(-Math.max(u,h,f),Math.min(u,h,f))>c)return!1}return!0}const Ar=p1();function p1(){const r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let u=0;u<256;++u){const h=u-127;h<-27?(n[u]=0,n[u|256]=32768,i[u]=24,i[u|256]=24):h<-14?(n[u]=1024>>-h-14,n[u|256]=1024>>-h-14|32768,i[u]=-h-1,i[u|256]=-h-1):h<=15?(n[u]=h+15<<10,n[u|256]=h+15<<10|32768,i[u]=13,i[u|256]=13):h<128?(n[u]=31744,n[u|256]=64512,i[u]=24,i[u|256]=24):(n[u]=31744,n[u|256]=64512,i[u]=13,i[u|256]=13)}const s=new Uint32Array(2048),o=new Uint32Array(64),c=new Uint32Array(64);for(let u=1;u<1024;++u){let h=u<<13,f=0;for(;(h&8388608)===0;)h<<=1,f-=8388608;h&=-8388609,f+=947912704,s[u]=h|f}for(let u=1024;u<2048;++u)s[u]=939524096+(u-1024<<13);for(let u=1;u<31;++u)o[u]=u<<23;o[31]=1199570944,o[32]=2147483648;for(let u=33;u<63;++u)o[u]=2147483648+(u-32<<23);o[63]=3347054592;for(let u=1;u<64;++u)u!==32&&(c[u]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:o,offsetTable:c}}function Qn(r){Math.abs(r)>65504&&Oe("DataUtils.toHalfFloat(): Value out of range."),r=ht(r,-65504,65504),Ar.floatView[0]=r;const e=Ar.uint32View[0],t=e>>23&511;return Ar.baseTable[t]+((e&8388607)>>Ar.shiftTable[t])}function Oa(r){const e=r>>10;return Ar.uint32View[0]=Ar.mantissaTable[Ar.offsetTable[e]+(r&1023)]+Ar.exponentTable[e],Ar.floatView[0]}class m1{static toHalfFloat(e){return Qn(e)}static fromHalfFloat(e){return Oa(e)}}const un=new F,Ic=new pe;let g1=0;class Gt extends Gi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:g1++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=sl,this.updateRanges=[],this.gpuType=Gn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ic.fromBufferAttribute(this,t),Ic.applyMatrix3(e),this.setXY(t,Ic.x,Ic.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.applyMatrix3(e),this.setXYZ(t,un.x,un.y,un.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.applyMatrix4(e),this.setXYZ(t,un.x,un.y,un.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.applyNormalMatrix(e),this.setXYZ(t,un.x,un.y,un.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.transformDirection(e),this.setXYZ(t,un.x,un.y,un.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Hn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=wt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Hn(t,this.array)),t}setX(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Hn(t,this.array)),t}setY(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Hn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Hn(t,this.array)),t}setW(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array),i=wt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array),i=wt(i,this.array),s=wt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==sl&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class _1 extends Gt{constructor(e,t,n){super(new Int8Array(e),t,n)}}class v1 extends Gt{constructor(e,t,n){super(new Uint8Array(e),t,n)}}class x1 extends Gt{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}}class y1 extends Gt{constructor(e,t,n){super(new Int16Array(e),t,n)}}class sm extends Gt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class S1 extends Gt{constructor(e,t,n){super(new Int32Array(e),t,n)}}class om extends Gt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class M1 extends Gt{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=Oa(this.array[e*this.itemSize]);return this.normalized&&(t=Hn(t,this.array)),t}setX(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize]=Qn(t),this}getY(e){let t=Oa(this.array[e*this.itemSize+1]);return this.normalized&&(t=Hn(t,this.array)),t}setY(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+1]=Qn(t),this}getZ(e){let t=Oa(this.array[e*this.itemSize+2]);return this.normalized&&(t=Hn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+2]=Qn(t),this}getW(e){let t=Oa(this.array[e*this.itemSize+3]);return this.normalized&&(t=Hn(t,this.array)),t}setW(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+3]=Qn(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array)),this.array[e+0]=Qn(t),this.array[e+1]=Qn(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array),i=wt(i,this.array)),this.array[e+0]=Qn(t),this.array[e+1]=Qn(n),this.array[e+2]=Qn(i),this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array),i=wt(i,this.array),s=wt(s,this.array)),this.array[e+0]=Qn(t),this.array[e+1]=Qn(n),this.array[e+2]=Qn(i),this.array[e+3]=Qn(s),this}}class je extends Gt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const w1=new pn,wa=new F,bd=new F;class mn{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):w1.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;wa.subVectors(e,this.center);const t=wa.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(wa,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(bd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(wa.copy(e.center).add(bd)),this.expandByPoint(wa.copy(e.center).sub(bd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let E1=0;const Ai=new dt,Td=new Nt,xo=new F,ui=new pn,Ea=new pn,Sn=new F;class xt extends Gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:E1++}),this.uuid=di(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(NM(e)?om:sm)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new vt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ai.makeRotationFromQuaternion(e),this.applyMatrix4(Ai),this}rotateX(e){return Ai.makeRotationX(e),this.applyMatrix4(Ai),this}rotateY(e){return Ai.makeRotationY(e),this.applyMatrix4(Ai),this}rotateZ(e){return Ai.makeRotationZ(e),this.applyMatrix4(Ai),this}translate(e,t,n){return Ai.makeTranslation(e,t,n),this.applyMatrix4(Ai),this}scale(e,t,n){return Ai.makeScale(e,t,n),this.applyMatrix4(Ai),this}lookAt(e){return Td.lookAt(e),Td.updateMatrix(),this.applyMatrix4(Td.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xo).negate(),this.translate(xo.x,xo.y,xo.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new je(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&Oe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new pn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];ui.setFromBufferAttribute(s),this.morphTargetsRelative?(Sn.addVectors(this.boundingBox.min,ui.min),this.boundingBox.expandByPoint(Sn),Sn.addVectors(this.boundingBox.max,ui.max),this.boundingBox.expandByPoint(Sn)):(this.boundingBox.expandByPoint(ui.min),this.boundingBox.expandByPoint(ui.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&rt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const n=this.boundingSphere.center;if(ui.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const c=t[s];Ea.setFromBufferAttribute(c),this.morphTargetsRelative?(Sn.addVectors(ui.min,Ea.min),ui.expandByPoint(Sn),Sn.addVectors(ui.max,Ea.max),ui.expandByPoint(Sn)):(ui.expandByPoint(Ea.min),ui.expandByPoint(Ea.max))}ui.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Sn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Sn));if(t)for(let s=0,o=t.length;s<o;s++){const c=t[s],u=this.morphTargetsRelative;for(let h=0,f=c.count;h<f;h++)Sn.fromBufferAttribute(c,h),u&&(xo.fromBufferAttribute(e,h),Sn.add(xo)),i=Math.max(i,n.distanceToSquared(Sn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&rt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){rt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Gt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),c=[],u=[];for(let A=0;A<n.count;A++)c[A]=new F,u[A]=new F;const h=new F,f=new F,p=new F,m=new pe,g=new pe,x=new pe,w=new F,y=new F;function v(A,P,O){h.fromBufferAttribute(n,A),f.fromBufferAttribute(n,P),p.fromBufferAttribute(n,O),m.fromBufferAttribute(s,A),g.fromBufferAttribute(s,P),x.fromBufferAttribute(s,O),f.sub(h),p.sub(h),g.sub(m),x.sub(m);const D=1/(g.x*x.y-x.x*g.y);isFinite(D)&&(w.copy(f).multiplyScalar(x.y).addScaledVector(p,-g.y).multiplyScalar(D),y.copy(p).multiplyScalar(g.x).addScaledVector(f,-x.x).multiplyScalar(D),c[A].add(w),c[P].add(w),c[O].add(w),u[A].add(y),u[P].add(y),u[O].add(y))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let A=0,P=M.length;A<P;++A){const O=M[A],D=O.start,V=O.count;for(let K=D,te=D+V;K<te;K+=3)v(e.getX(K+0),e.getX(K+1),e.getX(K+2))}const E=new F,b=new F,L=new F,R=new F;function U(A){L.fromBufferAttribute(i,A),R.copy(L);const P=c[A];E.copy(P),E.sub(L.multiplyScalar(L.dot(P))).normalize(),b.crossVectors(R,P);const D=b.dot(u[A])<0?-1:1;o.setXYZW(A,E.x,E.y,E.z,D)}for(let A=0,P=M.length;A<P;++A){const O=M[A],D=O.start,V=O.count;for(let K=D,te=D+V;K<te;K+=3)U(e.getX(K+0)),U(e.getX(K+1)),U(e.getX(K+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Gt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let m=0,g=n.count;m<g;m++)n.setXYZ(m,0,0,0);const i=new F,s=new F,o=new F,c=new F,u=new F,h=new F,f=new F,p=new F;if(e)for(let m=0,g=e.count;m<g;m+=3){const x=e.getX(m+0),w=e.getX(m+1),y=e.getX(m+2);i.fromBufferAttribute(t,x),s.fromBufferAttribute(t,w),o.fromBufferAttribute(t,y),f.subVectors(o,s),p.subVectors(i,s),f.cross(p),c.fromBufferAttribute(n,x),u.fromBufferAttribute(n,w),h.fromBufferAttribute(n,y),c.add(f),u.add(f),h.add(f),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(w,u.x,u.y,u.z),n.setXYZ(y,h.x,h.y,h.z)}else for(let m=0,g=t.count;m<g;m+=3)i.fromBufferAttribute(t,m+0),s.fromBufferAttribute(t,m+1),o.fromBufferAttribute(t,m+2),f.subVectors(o,s),p.subVectors(i,s),f.cross(p),n.setXYZ(m+0,f.x,f.y,f.z),n.setXYZ(m+1,f.x,f.y,f.z),n.setXYZ(m+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Sn.fromBufferAttribute(e,t),Sn.normalize(),e.setXYZ(t,Sn.x,Sn.y,Sn.z)}toNonIndexed(){function e(c,u){const h=c.array,f=c.itemSize,p=c.normalized,m=new h.constructor(u.length*f);let g=0,x=0;for(let w=0,y=u.length;w<y;w++){c.isInterleavedBufferAttribute?g=u[w]*c.data.stride+c.offset:g=u[w]*f;for(let v=0;v<f;v++)m[x++]=h[g++]}return new Gt(m,f,p)}if(this.index===null)return Oe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new xt,n=this.index.array,i=this.attributes;for(const c in i){const u=i[c],h=e(u,n);t.setAttribute(c,h)}const s=this.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,p=h.length;f<p;f++){const m=h[f],g=e(m,n);u.push(g)}t.morphAttributes[c]=u}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];t.addGroup(h.start,h.count,h.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const u=this.parameters;for(const h in u)u[h]!==void 0&&(e[h]=u[h]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const u in n){const h=n[u];e.data.attributes[u]=h.toJSON(e.data)}const i={};let s=!1;for(const u in this.morphAttributes){const h=this.morphAttributes[u],f=[];for(let p=0,m=h.length;p<m;p++){const g=h[p];f.push(g.toJSON(e.data))}f.length>0&&(i[u]=f,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const h in i){const f=i[h];this.setAttribute(h,f.clone(t))}const s=e.morphAttributes;for(const h in s){const f=[],p=s[h];for(let m=0,g=p.length;m<g;m++)f.push(p[m].clone(t));this.morphAttributes[h]=f}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let h=0,f=o.length;h<f;h++){const p=o[h];this.addGroup(p.start,p.count,p.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const u=e.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Fh{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=sl,this.updateRanges=[],this.version=0,this.uuid=di()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=di()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=di()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const zn=new F;class fi{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)zn.fromBufferAttribute(this,t),zn.applyMatrix4(e),this.setXYZ(t,zn.x,zn.y,zn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)zn.fromBufferAttribute(this,t),zn.applyNormalMatrix(e),this.setXYZ(t,zn.x,zn.y,zn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)zn.fromBufferAttribute(this,t),zn.transformDirection(e),this.setXYZ(t,zn.x,zn.y,zn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Hn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=wt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=wt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Hn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Hn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Hn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Hn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array),i=wt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array),i=wt(i,this.array),s=wt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){al("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Gt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new fi(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){al("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let b1=0;class Tn extends Gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:b1++}),this.uuid=di(),this.name="",this.type="Material",this.blending=Bs,this.side=Rr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bu,this.blendDst=Tu,this.blendEquation=jr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=Gs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Tp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ls,this.stencilZFail=Ls,this.stencilZPass=Ls,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Oe(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Oe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Bs&&(n.blending=this.blending),this.side!==Rr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==bu&&(n.blendSrc=this.blendSrc),this.blendDst!==Tu&&(n.blendDst=this.blendDst),this.blendEquation!==jr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Gs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Tp&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ls&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ls&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ls&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const c in s){const u=s[c];delete u.metadata,o.push(u)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class am extends Tn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let yo;const ba=new F,So=new F,Mo=new F,wo=new pe,Ta=new pe,Mx=new dt,Lc=new F,Aa=new F,Dc=new F,B0=new pe,Ad=new pe,z0=new pe;class wx extends Nt{constructor(e=new am){if(super(),this.isSprite=!0,this.type="Sprite",yo===void 0){yo=new xt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Fh(t,5);yo.setIndex([0,1,2,0,2,3]),yo.setAttribute("position",new fi(n,3,0,!1)),yo.setAttribute("uv",new fi(n,2,3,!1))}this.geometry=yo,this.material=e,this.center=new pe(.5,.5),this.count=1}raycast(e,t){e.camera===null&&rt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),So.setFromMatrixScale(this.matrixWorld),Mx.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Mo.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&So.multiplyScalar(-Mo.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const o=this.center;Nc(Lc.set(-.5,-.5,0),Mo,o,So,i,s),Nc(Aa.set(.5,-.5,0),Mo,o,So,i,s),Nc(Dc.set(.5,.5,0),Mo,o,So,i,s),B0.set(0,0),Ad.set(1,0),z0.set(1,1);let c=e.ray.intersectTriangle(Lc,Aa,Dc,!1,ba);if(c===null&&(Nc(Aa.set(-.5,.5,0),Mo,o,So,i,s),Ad.set(0,1),c=e.ray.intersectTriangle(Lc,Dc,Aa,!1,ba),c===null))return;const u=e.ray.origin.distanceTo(ba);u<e.near||u>e.far||t.push({distance:u,point:ba.clone(),uv:ei.getInterpolation(ba,Lc,Aa,Dc,B0,Ad,z0,new pe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Nc(r,e,t,n,i,s){wo.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(Ta.x=s*wo.x-i*wo.y,Ta.y=i*wo.x+s*wo.y):Ta.copy(wo),r.copy(e),r.x+=Ta.x,r.y+=Ta.y,r.applyMatrix4(Mx)}const Uc=new F,k0=new F;class Ex extends Nt{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);const t=e.levels;for(let n=0,i=t.length;n<i;n++){const s=t[n];this.addLevel(s.object.clone(),s.distance,s.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);const i=this.levels;let s;for(s=0;s<i.length&&!(t<i[s].distance);s++);return i.splice(s,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){const t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){const i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){const t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let s=t[n].distance;if(t[n].object.visible&&(s-=s*t[n].hysteresis),e<s)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){Uc.setFromMatrixPosition(this.matrixWorld);const i=e.ray.origin.distanceTo(Uc);this.getObjectForDistance(i).raycast(e,t)}}update(e){const t=this.levels;if(t.length>1){Uc.setFromMatrixPosition(e.matrixWorld),k0.setFromMatrixPosition(this.matrixWorld);const n=Uc.distanceTo(k0)/e.zoom;t[0].object.visible=!0;let i,s;for(i=1,s=t.length;i<s;i++){let o=t[i].distance;if(t[i].object.visible&&(o-=o*t[i].hysteresis),n>=o)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<s;i++)t[i].object.visible=!1}}toJSON(e){const t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];const n=this.levels;for(let i=0,s=n.length;i<s;i++){const o=n[i];t.object.levels.push({object:o.object.uuid,distance:o.distance,hysteresis:o.hysteresis})}return t}}const Er=new F,Cd=new F,Fc=new F,Xr=new F,Rd=new F,Oc=new F,Pd=new F;class Jo{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Er)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Er.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Er.copy(this.origin).addScaledVector(this.direction,t),Er.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Cd.copy(e).add(t).multiplyScalar(.5),Fc.copy(t).sub(e).normalize(),Xr.copy(this.origin).sub(Cd);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Fc),c=Xr.dot(this.direction),u=-Xr.dot(Fc),h=Xr.lengthSq(),f=Math.abs(1-o*o);let p,m,g,x;if(f>0)if(p=o*u-c,m=o*c-u,x=s*f,p>=0)if(m>=-x)if(m<=x){const w=1/f;p*=w,m*=w,g=p*(p+o*m+2*c)+m*(o*p+m+2*u)+h}else m=s,p=Math.max(0,-(o*m+c)),g=-p*p+m*(m+2*u)+h;else m=-s,p=Math.max(0,-(o*m+c)),g=-p*p+m*(m+2*u)+h;else m<=-x?(p=Math.max(0,-(-o*s+c)),m=p>0?-s:Math.min(Math.max(-s,-u),s),g=-p*p+m*(m+2*u)+h):m<=x?(p=0,m=Math.min(Math.max(-s,-u),s),g=m*(m+2*u)+h):(p=Math.max(0,-(o*s+c)),m=p>0?s:Math.min(Math.max(-s,-u),s),g=-p*p+m*(m+2*u)+h);else m=o>0?-s:s,p=Math.max(0,-(o*m+c)),g=-p*p+m*(m+2*u)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,p),i&&i.copy(Cd).addScaledVector(Fc,m),g}intersectSphere(e,t){Er.subVectors(e.center,this.origin);const n=Er.dot(this.direction),i=Er.dot(Er)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),c=n-o,u=n+o;return u<0?null:c<0?this.at(u,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,c,u;const h=1/this.direction.x,f=1/this.direction.y,p=1/this.direction.z,m=this.origin;return h>=0?(n=(e.min.x-m.x)*h,i=(e.max.x-m.x)*h):(n=(e.max.x-m.x)*h,i=(e.min.x-m.x)*h),f>=0?(s=(e.min.y-m.y)*f,o=(e.max.y-m.y)*f):(s=(e.max.y-m.y)*f,o=(e.min.y-m.y)*f),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),p>=0?(c=(e.min.z-m.z)*p,u=(e.max.z-m.z)*p):(c=(e.max.z-m.z)*p,u=(e.min.z-m.z)*p),n>u||c>i)||((c>n||n!==n)&&(n=c),(u<i||i!==i)&&(i=u),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Er)!==null}intersectTriangle(e,t,n,i,s){Rd.subVectors(t,e),Oc.subVectors(n,e),Pd.crossVectors(Rd,Oc);let o=this.direction.dot(Pd),c;if(o>0){if(i)return null;c=1}else if(o<0)c=-1,o=-o;else return null;Xr.subVectors(this.origin,e);const u=c*this.direction.dot(Oc.crossVectors(Xr,Oc));if(u<0)return null;const h=c*this.direction.dot(Rd.cross(Xr));if(h<0||u+h>o)return null;const f=-c*Xr.dot(Pd);return f<0?null:this.at(f/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rs extends Tn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hi,this.combine=_l,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const V0=new dt,Ms=new Jo,Bc=new mn,H0=new F,zc=new F,kc=new F,Vc=new F,Id=new F,Hc=new F,G0=new F,Gc=new F;class an extends Nt{constructor(e=new xt,t=new rs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const c=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const c=this.morphTargetInfluences;if(s&&c){Hc.set(0,0,0);for(let u=0,h=s.length;u<h;u++){const f=c[u],p=s[u];f!==0&&(Id.fromBufferAttribute(p,e),o?Hc.addScaledVector(Id,f):Hc.addScaledVector(Id.sub(t),f))}t.add(Hc)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Bc.copy(n.boundingSphere),Bc.applyMatrix4(s),Ms.copy(e.ray).recast(e.near),!(Bc.containsPoint(Ms.origin)===!1&&(Ms.intersectSphere(Bc,H0)===null||Ms.origin.distanceToSquared(H0)>(e.far-e.near)**2))&&(V0.copy(s).invert(),Ms.copy(e.ray).applyMatrix4(V0),!(n.boundingBox!==null&&Ms.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ms)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,c=s.index,u=s.attributes.position,h=s.attributes.uv,f=s.attributes.uv1,p=s.attributes.normal,m=s.groups,g=s.drawRange;if(c!==null)if(Array.isArray(o))for(let x=0,w=m.length;x<w;x++){const y=m[x],v=o[y.materialIndex],M=Math.max(y.start,g.start),E=Math.min(c.count,Math.min(y.start+y.count,g.start+g.count));for(let b=M,L=E;b<L;b+=3){const R=c.getX(b),U=c.getX(b+1),A=c.getX(b+2);i=Wc(this,v,e,n,h,f,p,R,U,A),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=y.materialIndex,t.push(i))}}else{const x=Math.max(0,g.start),w=Math.min(c.count,g.start+g.count);for(let y=x,v=w;y<v;y+=3){const M=c.getX(y),E=c.getX(y+1),b=c.getX(y+2);i=Wc(this,o,e,n,h,f,p,M,E,b),i&&(i.faceIndex=Math.floor(y/3),t.push(i))}}else if(u!==void 0)if(Array.isArray(o))for(let x=0,w=m.length;x<w;x++){const y=m[x],v=o[y.materialIndex],M=Math.max(y.start,g.start),E=Math.min(u.count,Math.min(y.start+y.count,g.start+g.count));for(let b=M,L=E;b<L;b+=3){const R=b,U=b+1,A=b+2;i=Wc(this,v,e,n,h,f,p,R,U,A),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=y.materialIndex,t.push(i))}}else{const x=Math.max(0,g.start),w=Math.min(u.count,g.start+g.count);for(let y=x,v=w;y<v;y+=3){const M=y,E=y+1,b=y+2;i=Wc(this,o,e,n,h,f,p,M,E,b),i&&(i.faceIndex=Math.floor(y/3),t.push(i))}}}}function T1(r,e,t,n,i,s,o,c){let u;if(e.side===Wn?u=n.intersectTriangle(o,s,i,!0,c):u=n.intersectTriangle(i,s,o,e.side===Rr,c),u===null)return null;Gc.copy(c),Gc.applyMatrix4(r.matrixWorld);const h=t.ray.origin.distanceTo(Gc);return h<t.near||h>t.far?null:{distance:h,point:Gc.clone(),object:r}}function Wc(r,e,t,n,i,s,o,c,u,h){r.getVertexPosition(c,zc),r.getVertexPosition(u,kc),r.getVertexPosition(h,Vc);const f=T1(r,e,t,n,zc,kc,Vc,G0);if(f){const p=new F;ei.getBarycoord(G0,zc,kc,Vc,p),i&&(f.uv=ei.getInterpolatedAttribute(i,c,u,h,p,new pe)),s&&(f.uv1=ei.getInterpolatedAttribute(s,c,u,h,p,new pe)),o&&(f.normal=ei.getInterpolatedAttribute(o,c,u,h,p,new F),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const m={a:c,b:u,c:h,normal:new F,materialIndex:0};ei.getNormal(zc,kc,Vc,m.normal),f.face=m,f.barycoord=p}return f}const Ca=new Rt,W0=new Rt,X0=new Rt,A1=new Rt,q0=new dt,Xc=new F,Ld=new mn,Y0=new dt,Dd=new Jo;class bx extends an{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ep,this.bindMatrix=new dt,this.bindMatrixInverse=new dt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new pn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Xc),this.boundingBox.expandByPoint(Xc)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new mn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Xc),this.boundingSphere.expandByPoint(Xc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ld.copy(this.boundingSphere),Ld.applyMatrix4(i),e.ray.intersectsSphere(Ld)!==!1&&(Y0.copy(i).invert(),Dd.copy(e.ray).applyMatrix4(Y0),!(this.boundingBox!==null&&Dd.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Dd)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Rt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Ep?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===rx?this.bindMatrixInverse.copy(this.bindMatrix).invert():Oe("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;W0.fromBufferAttribute(i.attributes.skinIndex,e),X0.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Ca.copy(t),t.set(0,0,0,0)):(Ca.set(...t,1),t.set(0,0,0)),Ca.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){const o=X0.getComponent(s);if(o!==0){const c=W0.getComponent(s);q0.multiplyMatrices(n.bones[c].matrixWorld,n.boneInverses[c]),t.addScaledVector(A1.copy(Ca).applyMatrix4(q0),o)}}return t.isVector4&&(t.w=Ca.w),t.applyMatrix4(this.bindMatrixInverse)}}class lm extends Nt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Vi extends jt{constructor(e=null,t=1,n=1,i,s,o,c,u,h=on,f=on,p,m){super(null,o,c,u,h,f,i,s,p,m),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Z0=new dt,C1=new dt;class Oh{constructor(e=[],t=[]){this.uuid=di(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Oe("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new dt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new dt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const c=e[s]?e[s].matrixWorld:C1;Z0.multiplyMatrices(c,t[s]),Z0.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Oh(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Vi(t,e,e,Nn,Gn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(Oe("Skeleton: No bone found with UUID:",s),o=new lm),this.bones.push(o),this.boneInverses.push(new dt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const c=n[i];e.boneInverses.push(c.toArray())}return e}}class Wo extends Gt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Eo=new dt,J0=new dt,qc=[],j0=new pn,R1=new dt,Ra=new an,Pa=new mn;class Tx extends an{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Wo(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,R1)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new pn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Eo),j0.copy(e.boundingBox).applyMatrix4(Eo),this.boundingBox.union(j0)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new mn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Eo),Pa.copy(e.boundingSphere).applyMatrix4(Eo),this.boundingSphere.union(Pa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let c=0;c<n.length;c++)n[c]=i[o+c]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Ra.geometry=this.geometry,Ra.material=this.material,Ra.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Pa.copy(this.boundingSphere),Pa.applyMatrix4(n),e.ray.intersectsSphere(Pa)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Eo),J0.multiplyMatrices(n,Eo),Ra.matrixWorld=J0,Ra.raycast(e,qc);for(let o=0,c=qc.length;o<c;o++){const u=qc[o];u.instanceId=s,u.object=this,t.push(u)}qc.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Wo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Vi(new Float32Array(i*this.count),i,this.count,Th,Gn));const s=this.morphTexture.source.data.data;let o=0;for(let h=0;h<n.length;h++)o+=n[h];const c=this.geometry.morphTargetsRelative?1:1-o,u=i*e;return s[u]=c,s.set(n,u+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Nd=new F,P1=new F,I1=new vt;class Jr{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Nd.subVectors(n,t).cross(P1.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const i=e.delta(Nd),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(i,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||I1.getNormalMatrix(e),i=this.coplanarPoint(Nd).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ws=new mn,L1=new pe(.5,.5),Yc=new F;class jo{constructor(e=new Jr,t=new Jr,n=new Jr,i=new Jr,s=new Jr,o=new Jr){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(n),c[3].copy(i),c[4].copy(s),c[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=hi,n=!1){const i=this.planes,s=e.elements,o=s[0],c=s[1],u=s[2],h=s[3],f=s[4],p=s[5],m=s[6],g=s[7],x=s[8],w=s[9],y=s[10],v=s[11],M=s[12],E=s[13],b=s[14],L=s[15];if(i[0].setComponents(h-o,g-f,v-x,L-M).normalize(),i[1].setComponents(h+o,g+f,v+x,L+M).normalize(),i[2].setComponents(h+c,g+p,v+w,L+E).normalize(),i[3].setComponents(h-c,g-p,v-w,L-E).normalize(),n)i[4].setComponents(u,m,y,b).normalize(),i[5].setComponents(h-u,g-m,v-y,L-b).normalize();else if(i[4].setComponents(h-u,g-m,v-y,L-b).normalize(),t===hi)i[5].setComponents(h+u,g+m,v+y,L+b).normalize();else if(t===Ws)i[5].setComponents(u,m,y,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ws.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ws.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ws)}intersectsSprite(e){ws.center.set(0,0,0);const t=L1.distanceTo(e.center);return ws.radius=.7071067811865476+t,ws.applyMatrix4(e.matrixWorld),this.intersectsSphere(ws)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Yc.x=i.normal.x>0?e.max.x:e.min.x,Yc.y=i.normal.y>0?e.max.y:e.min.y,Yc.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Yc)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const $i=new dt,er=new jo;class Bh{constructor(){this.coordinateSystem=hi}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if($i.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),er.setFromProjectionMatrix($i,i.coordinateSystem,i.reversedDepth),er.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if($i.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),er.setFromProjectionMatrix($i,i.coordinateSystem,i.reversedDepth),er.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if($i.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),er.setFromProjectionMatrix($i,i.coordinateSystem,i.reversedDepth),er.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if($i.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),er.setFromProjectionMatrix($i,i.coordinateSystem,i.reversedDepth),er.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){const i=t.cameras[n];if($i.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),er.setFromProjectionMatrix($i,i.coordinateSystem,i.reversedDepth),er.containsPoint(e))return!0}return!1}clone(){return new Bh}}function Ud(r,e){return r-e}function D1(r,e){return r.z-e.z}function N1(r,e){return e.z-r.z}class U1{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){const s=this.pool,o=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});const c=s[this.index];o.push(c),this.index++,c.start=e,c.count=t,c.z=n,c.index=i}reset(){this.list.length=0,this.index=0}}const Kn=new dt,F1=new Ye(1,1,1),K0=new jo,O1=new Bh,Zc=new pn,Es=new mn,Ia=new F,Q0=new F,B1=new F,Fd=new U1,Dn=new an,Jc=[];function z1(r,e,t=0){const n=e.itemSize;if(r.isInterleavedBufferAttribute||r.array.constructor!==e.array.constructor){const i=r.count;for(let s=0;s<i;s++)for(let o=0;o<n;o++)e.setComponent(s+t,o,r.getComponent(s,o))}else e.array.set(r.array,t*n);e.needsUpdate=!0}function bs(r,e){if(r.constructor!==e.constructor){const t=Math.min(r.length,e.length);for(let n=0;n<t;n++)e[n]=r[n]}else{const t=Math.min(r.length,e.length);e.set(new r.constructor(r.buffer,0,t))}}class Ax extends an{constructor(e,t,n=t*2,i){super(new xt,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4),n=new Vi(t,e,e,Nn,Gn);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Uint32Array(e*e),n=new Vi(t,e,e,vl,Ri);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Float32Array(e*e*4).fill(1),n=new Vi(t,e,e,Nn,Gn);n.colorSpace=At.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){const t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(const s in e.attributes){const o=e.getAttribute(s),{array:c,itemSize:u,normalized:h}=o,f=new c.constructor(n*u),p=new Gt(f,u,h);t.setAttribute(s,p)}if(e.getIndex()!==null){const s=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new Gt(s,1))}this._geometryInitialized=!0}}_validateGeometry(e){const t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(const n in t.attributes){if(!e.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const i=e.getAttribute(n),s=t.getAttribute(n);if(i.itemSize!==s.itemSize||i.normalized!==s.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(e){const t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){const t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new pn);const e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const s=t[n].geometryIndex;this.getMatrixAt(n,Kn),this.getBoundingBoxAt(s,Zc).applyMatrix4(Kn),e.union(Zc)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mn);const e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;const s=t[n].geometryIndex;this.getMatrixAt(n,Kn),this.getBoundingSphereAt(s,Es).applyMatrix4(Kn),e.union(Es)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");const n={visible:!0,active:!0,geometryIndex:e};let i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Ud),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));const s=this._matricesTexture;Kn.identity().toArray(s.image.data,i*16),s.needsUpdate=!0;const o=this._colorsTexture;return o&&(F1.toArray(o.image.data,i*4),o.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);const i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},s=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;const o=e.getIndex();if(o!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?o.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let u;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Ud),u=this._availableGeometryIds.shift(),s[u]=i):(u=this._geometryCount,this._geometryCount++,s.push(i)),this.setGeometryAt(u,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,u}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);const n=this.geometry,i=n.getIndex()!==null,s=n.getIndex(),o=t.getIndex(),c=this._geometryInfo[e];if(i&&o.count>c.reservedIndexCount||t.attributes.position.count>c.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");const u=c.vertexStart,h=c.reservedVertexCount;c.vertexCount=t.getAttribute("position").count;for(const f in n.attributes){const p=t.getAttribute(f),m=n.getAttribute(f);z1(p,m,u);const g=p.itemSize;for(let x=p.count,w=h;x<w;x++){const y=u+x;for(let v=0;v<g;v++)m.setComponent(y,v,0)}m.needsUpdate=!0,m.addUpdateRange(u*g,h*g)}if(i){const f=c.indexStart,p=c.reservedIndexCount;c.indexCount=t.getIndex().count;for(let m=0;m<o.count;m++)s.setX(f+m,u+o.getX(m));for(let m=o.count,g=p;m<g;m++)s.setX(f+m,u);s.needsUpdate=!0,s.addUpdateRange(f,c.reservedIndexCount)}return c.start=i?c.indexStart:c.vertexStart,c.count=i?c.indexCount:c.vertexCount,c.boundingBox=null,t.boundingBox!==null&&(c.boundingBox=t.boundingBox.clone()),c.boundingSphere=null,t.boundingSphere!==null&&(c.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){const t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;const n=this._instanceInfo;for(let i=0,s=n.length;i<s;i++)n[i].active&&n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0;const n=this._geometryInfo,i=n.map((o,c)=>c).sort((o,c)=>n[o].vertexStart-n[c].vertexStart),s=this.geometry;for(let o=0,c=n.length;o<c;o++){const u=i[o],h=n[u];if(h.active!==!1){if(s.index!==null){if(h.indexStart!==t){const{indexStart:f,vertexStart:p,reservedIndexCount:m}=h,g=s.index,x=g.array,w=e-p;for(let y=f;y<f+m;y++)x[y]=x[y]+w;g.array.copyWithin(t,f,f+m),g.addUpdateRange(t,m),g.needsUpdate=!0,h.indexStart=t}t+=h.reservedIndexCount}if(h.vertexStart!==e){const{vertexStart:f,reservedVertexCount:p}=h,m=s.attributes;for(const g in m){const x=m[g],{array:w,itemSize:y}=x;w.copyWithin(e*y,f*y,(f+p)*y),x.addUpdateRange(e*y,p*y),x.needsUpdate=!0}h.vertexStart=e}e+=h.reservedVertexCount,h.start=s.index?h.indexStart:h.vertexStart}}return this._nextIndexStart=t,this._nextVertexStart=e,this._visibilityChanged=!0,this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){const s=new pn,o=n.index,c=n.attributes.position;for(let u=i.start,h=i.start+i.count;u<h;u++){let f=u;o&&(f=o.getX(f)),s.expandByPoint(Ia.fromBufferAttribute(c,f))}i.boundingBox=s}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;const n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){const s=new mn;this.getBoundingBoxAt(e,Zc),Zc.getCenter(s.center);const o=n.index,c=n.attributes.position;let u=0;for(let h=i.start,f=i.start+i.count;h<f;h++){let p=h;o&&(p=o.getX(p)),Ia.fromBufferAttribute(c,p),u=Math.max(u,s.center.distanceToSquared(Ia))}s.radius=Math.sqrt(u),i.boundingSphere=s}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);const n=this._matricesTexture,i=this._matricesTexture.image.data;return t.toArray(i,e*16),n.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null?t.isVector4?t.set(1,1,1,1):t.setRGB(1,1,1):t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);const n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){const t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(Ud);t[t.length-1]===n.length-1;)n.pop(),t.pop();if(e<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);const i=new Int32Array(e),s=new Int32Array(e);bs(this._multiDrawCounts,i),bs(this._multiDrawStarts,s),this._multiDrawCounts=i,this._multiDrawStarts=s,this._maxInstanceCount=e;const o=this._indirectTexture,c=this._matricesTexture,u=this._colorsTexture;o.dispose(),this._initIndirectTexture(),bs(o.image.data,this._indirectTexture.image.data),c.dispose(),this._initMatricesTexture(),bs(c.image.data,this._matricesTexture.image.data),u&&(u.dispose(),this._initColorsTexture(),bs(u.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){const n=[...this._geometryInfo].filter(c=>c.active);if(Math.max(...n.map(c=>c.vertexStart+c.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(u=>u.indexStart+u.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);const s=this.geometry;s.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new xt,this._initializeGeometry(s));const o=this.geometry;s.index&&bs(s.index.array,o.index.array);for(const c in s.attributes)bs(s.attributes[c].array,o.attributes[c].array)}raycast(e,t){const n=this._instanceInfo,i=this._geometryInfo,s=this.matrixWorld,o=this.geometry;Dn.material=this.material,Dn.geometry.index=o.index,Dn.geometry.attributes=o.attributes,Dn.geometry.boundingBox===null&&(Dn.geometry.boundingBox=new pn),Dn.geometry.boundingSphere===null&&(Dn.geometry.boundingSphere=new mn);for(let c=0,u=n.length;c<u;c++){if(!n[c].visible||!n[c].active)continue;const h=n[c].geometryIndex,f=i[h];Dn.geometry.setDrawRange(f.start,f.count),this.getMatrixAt(c,Dn.matrixWorld).premultiply(s),this.getBoundingBoxAt(h,Dn.geometry.boundingBox),this.getBoundingSphereAt(h,Dn.geometry.boundingSphere),Dn.raycast(e,Jc);for(let p=0,m=Jc.length;p<m;p++){const g=Jc[p];g.object=this,g.batchId=c,t.push(g)}Jc.length=0}Dn.material=null,Dn.geometry.index=null,Dn.geometry.attributes={},Dn.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._availableInstanceIds=e._availableInstanceIds.slice(),this._availableGeometryIds=e._availableGeometryIds.slice(),this._nextIndexStart=e._nextIndexStart,this._nextVertexStart=e._nextVertexStart,this._geometryCount=e._geometryCount,this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._indirectTexture=e._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(e,t,n,i,s){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const o=i.getIndex();let c=o===null?1:o.array.BYTES_PER_ELEMENT,u=1;s.wireframe&&(u=2,c=i.attributes.position.count>65535?4:2);const h=this._instanceInfo,f=this._multiDrawStarts,p=this._multiDrawCounts,m=this._geometryInfo,g=this.perObjectFrustumCulled,x=this._indirectTexture,w=x.image.data,y=n.isArrayCamera?O1:K0;g&&!n.isArrayCamera&&(Kn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),K0.setFromProjectionMatrix(Kn,n.coordinateSystem,n.reversedDepth));let v=0;if(this.sortObjects){Kn.copy(this.matrixWorld).invert(),Ia.setFromMatrixPosition(n.matrixWorld).applyMatrix4(Kn),Q0.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(Kn);for(let b=0,L=h.length;b<L;b++)if(h[b].visible&&h[b].active){const R=h[b].geometryIndex;this.getMatrixAt(b,Kn),this.getBoundingSphereAt(R,Es).applyMatrix4(Kn);let U=!1;if(g&&(U=!y.intersectsSphere(Es,n)),!U){const A=m[R],P=B1.subVectors(Es.center,Ia).dot(Q0);Fd.push(A.start,A.count,P,b)}}const M=Fd.list,E=this.customSort;E===null?M.sort(s.transparent?N1:D1):E.call(this,M,n);for(let b=0,L=M.length;b<L;b++){const R=M[b];f[v]=R.start*c*u,p[v]=R.count*u,w[v]=R.index,v++}Fd.reset()}else for(let M=0,E=h.length;M<E;M++)if(h[M].visible&&h[M].active){const b=h[M].geometryIndex;let L=!1;if(g&&(this.getMatrixAt(M,Kn),this.getBoundingSphereAt(b,Es).applyMatrix4(Kn),L=!y.intersectsSphere(Es,n)),!L){const R=m[b];f[v]=R.start*c*u,p[v]=R.count*u,w[v]=M,v++}}x.needsUpdate=!0,this._multiDrawCount=v,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,s,o){this.onBeforeRender(e,null,i,s,o)}}class qn extends Tn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const dh=new F,ph=new F,$0=new dt,La=new Jo,jc=new mn,Od=new F,e_=new F;let is=class extends Nt{constructor(e=new xt,t=new qn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)dh.fromBufferAttribute(t,i-1),ph.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=dh.distanceTo(ph);e.setAttribute("lineDistance",new je(n,1))}else Oe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),jc.copy(n.boundingSphere),jc.applyMatrix4(i),jc.radius+=s,e.ray.intersectsSphere(jc)===!1)return;$0.copy(i).invert(),La.copy(e.ray).applyMatrix4($0);const c=s/((this.scale.x+this.scale.y+this.scale.z)/3),u=c*c,h=this.isLineSegments?2:1,f=n.index,m=n.attributes.position;if(f!==null){const g=Math.max(0,o.start),x=Math.min(f.count,o.start+o.count);for(let w=g,y=x-1;w<y;w+=h){const v=f.getX(w),M=f.getX(w+1),E=Kc(this,e,La,u,v,M,w);E&&t.push(E)}if(this.isLineLoop){const w=f.getX(x-1),y=f.getX(g),v=Kc(this,e,La,u,w,y,x-1);v&&t.push(v)}}else{const g=Math.max(0,o.start),x=Math.min(m.count,o.start+o.count);for(let w=g,y=x-1;w<y;w+=h){const v=Kc(this,e,La,u,w,w+1,w);v&&t.push(v)}if(this.isLineLoop){const w=Kc(this,e,La,u,x-1,g,x-1);w&&t.push(w)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const c=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=s}}}}};function Kc(r,e,t,n,i,s,o){const c=r.geometry.attributes.position;if(dh.fromBufferAttribute(c,i),ph.fromBufferAttribute(c,s),t.distanceSqToSegment(dh,ph,Od,e_)>n)return;Od.applyMatrix4(r.matrixWorld);const h=e.ray.origin.distanceTo(Od);if(!(h<e.near||h>e.far))return{distance:h,point:e_.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const t_=new F,n_=new F;class fr extends is{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)t_.fromBufferAttribute(t,i),n_.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+t_.distanceTo(n_);e.setAttribute("lineDistance",new je(n,1))}else Oe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Cx extends is{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class cm extends Tn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const i_=new dt,Cp=new Jo,Qc=new mn,$c=new F;class Rx extends Nt{constructor(e=new xt,t=new cm){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Qc.copy(n.boundingSphere),Qc.applyMatrix4(i),Qc.radius+=s,e.ray.intersectsSphere(Qc)===!1)return;i_.copy(i).invert(),Cp.copy(e.ray).applyMatrix4(i_);const c=s/((this.scale.x+this.scale.y+this.scale.z)/3),u=c*c,h=n.index,p=n.attributes.position;if(h!==null){const m=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=m,w=g;x<w;x++){const y=h.getX(x);$c.fromBufferAttribute(p,y),r_($c,y,u,i,e,t,this)}}else{const m=Math.max(0,o.start),g=Math.min(p.count,o.start+o.count);for(let x=m,w=g;x<w;x++)$c.fromBufferAttribute(p,x),r_($c,x,u,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const c=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=s}}}}}function r_(r,e,t,n,i,s,o){const c=Cp.distanceSqToPoint(r);if(c<t){const u=new F;Cp.closestPointToPoint(r,u),u.applyMatrix4(n);const h=i.ray.origin.distanceTo(u);if(h<i.near||h>i.far)return;s.push({distance:h,distanceToRay:Math.sqrt(c),point:u,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Px extends jt{constructor(e,t,n,i,s=Yt,o=Yt,c,u,h){super(e,t,n,i,s,o,c,u,h),this.isVideoTexture=!0,this.generateMipmaps=!1,this._requestVideoFrameCallbackId=0;const f=this;function p(){f.needsUpdate=!0,f._requestVideoFrameCallbackId=e.requestVideoFrameCallback(p)}"requestVideoFrameCallback"in e&&(this._requestVideoFrameCallbackId=e.requestVideoFrameCallback(p))}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}dispose(){this._requestVideoFrameCallbackId!==0&&(this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId),this._requestVideoFrameCallbackId=0),super.dispose()}}class k1 extends Px{constructor(e,t,n,i,s,o,c,u){super({},e,t,n,i,s,o,c,u),this.isVideoFrameTexture=!0}update(){}clone(){return new this.constructor().copy(this)}setFrame(e){this.image=e,this.needsUpdate=!0}}class V1 extends jt{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=on,this.minFilter=on,this.generateMipmaps=!1,this.needsUpdate=!0}}class zh extends jt{constructor(e,t,n,i,s,o,c,u,h,f,p,m){super(null,o,c,u,h,f,i,s,p,m),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class H1 extends zh{constructor(e,t,n,i,s,o){super(e,t,n,s,o),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=ti,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class G1 extends zh{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,cr),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}}class xl extends jt{constructor(e=[],t=cr,n,i,s,o,c,u,h,f){super(e,t,n,i,s,o,c,u,h,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class W1 extends jt{constructor(e,t,n,i,s,o,c,u,h){super(e,t,n,i,s,o,c,u,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class X1 extends jt{constructor(e,t,n,i,s,o,c,u,h){super(e,t,n,i,s,o,c,u,h),this.isHTMLTexture=!0,this.generateMipmaps=!1,this.needsUpdate=!0;const f=e?e.parentNode:null;f!==null&&"requestPaint"in f&&(f.onpaint=()=>{this.needsUpdate=!0},f.requestPaint())}dispose(){const e=this.image?this.image.parentNode:null;e!==null&&"onpaint"in e&&(e.onpaint=null),super.dispose()}}class Xs extends jt{constructor(e,t,n=Ri,i,s,o,c=on,u=on,h,f=hr,p=1){if(f!==hr&&f!==Kr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const m={width:e,height:t,depth:p};super(m,i,s,o,c,u,f,n,h),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Qr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Ix extends Xs{constructor(e,t=Ri,n=cr,i,s,o=on,c=on,u,h=hr){const f={width:e,height:e,depth:1},p=[f,f,f,f,f,f];super(e,e,t,n,i,s,o,c,u,h),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class um extends jt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ys extends xt{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const c=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const u=[],h=[],f=[],p=[];let m=0,g=0;x("z","y","x",-1,-1,n,t,e,o,s,0),x("z","y","x",1,-1,n,t,-e,o,s,1),x("x","z","y",1,1,e,n,t,i,o,2),x("x","z","y",1,-1,e,n,-t,i,o,3),x("x","y","z",1,-1,e,t,n,i,s,4),x("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(u),this.setAttribute("position",new je(h,3)),this.setAttribute("normal",new je(f,3)),this.setAttribute("uv",new je(p,2));function x(w,y,v,M,E,b,L,R,U,A,P){const O=b/U,D=L/A,V=b/2,K=L/2,te=R/2,H=U+1,Z=A+1;let J=0,z=0;const W=new F;for(let q=0;q<Z;q++){const re=q*D-K;for(let he=0;he<H;he++){const Ie=he*O-V;W[w]=Ie*M,W[y]=re*E,W[v]=te,h.push(W.x,W.y,W.z),W[w]=0,W[y]=0,W[v]=R>0?1:-1,f.push(W.x,W.y,W.z),p.push(he/U),p.push(1-q/A),J+=1}}for(let q=0;q<A;q++)for(let re=0;re<U;re++){const he=m+re+H*q,Ie=m+re+H*(q+1),nt=m+(re+1)+H*(q+1),Qe=m+(re+1)+H*q;u.push(he,Ie,Qe),u.push(Ie,nt,Qe),z+=6}c.addGroup(g,z,P),g+=z,m+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ys(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class kh extends xt{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));const o=[],c=[],u=[],h=[],f=t/2,p=Math.PI/2*e,m=t,g=2*p+m,x=n*2+s,w=i+1,y=new F,v=new F;for(let M=0;M<=x;M++){let E=0,b=0,L=0,R=0;if(M<=n){const P=M/n,O=P*Math.PI/2;b=-f-e*Math.cos(O),L=e*Math.sin(O),R=-e*Math.cos(O),E=P*p}else if(M<=n+s){const P=(M-n)/s;b=-f+P*t,L=e,R=0,E=p+P*m}else{const P=(M-n-s)/n,O=P*Math.PI/2;b=f+e*Math.sin(O),L=e*Math.cos(O),R=e*Math.sin(O),E=p+m+P*p}const U=Math.max(0,Math.min(1,E/g));let A=0;M===0?A=.5/i:M===x&&(A=-.5/i);for(let P=0;P<=i;P++){const O=P/i,D=O*Math.PI*2,V=Math.sin(D),K=Math.cos(D);v.x=-L*K,v.y=b,v.z=L*V,c.push(v.x,v.y,v.z),y.set(-L*K,R,L*V),y.normalize(),u.push(y.x,y.y,y.z),h.push(O+A,U)}if(M>0){const P=(M-1)*w;for(let O=0;O<i;O++){const D=P+O,V=P+O+1,K=M*w+O,te=M*w+O+1;o.push(D,V,K),o.push(V,te,K)}}}this.setIndex(o),this.setAttribute("position",new je(c,3)),this.setAttribute("normal",new je(u,3)),this.setAttribute("uv",new je(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kh(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Vh extends xt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],o=[],c=[],u=[],h=new F,f=new pe;o.push(0,0,0),c.push(0,0,1),u.push(.5,.5);for(let p=0,m=3;p<=t;p++,m+=3){const g=n+p/t*i;h.x=e*Math.cos(g),h.y=e*Math.sin(g),o.push(h.x,h.y,h.z),c.push(0,0,1),f.x=(o[m]/e+1)/2,f.y=(o[m+1]/e+1)/2,u.push(f.x,f.y)}for(let p=1;p<=t;p++)s.push(p,p+1,0);this.setIndex(s),this.setAttribute("position",new je(o,3)),this.setAttribute("normal",new je(c,3)),this.setAttribute("uv",new je(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vh(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class yl extends xt{constructor(e=1,t=1,n=1,i=32,s=1,o=!1,c=0,u=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:c,thetaLength:u};const h=this;i=Math.floor(i),s=Math.floor(s);const f=[],p=[],m=[],g=[];let x=0;const w=[],y=n/2;let v=0;M(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(f),this.setAttribute("position",new je(p,3)),this.setAttribute("normal",new je(m,3)),this.setAttribute("uv",new je(g,2));function M(){const b=new F,L=new F;let R=0;const U=(t-e)/n;for(let A=0;A<=s;A++){const P=[],O=A/s,D=O*(t-e)+e;for(let V=0;V<=i;V++){const K=V/i,te=K*u+c,H=Math.sin(te),Z=Math.cos(te);L.x=D*H,L.y=-O*n+y,L.z=D*Z,p.push(L.x,L.y,L.z),b.set(H,U,Z).normalize(),m.push(b.x,b.y,b.z),g.push(K,1-O),P.push(x++)}w.push(P)}for(let A=0;A<i;A++)for(let P=0;P<s;P++){const O=w[P][A],D=w[P+1][A],V=w[P+1][A+1],K=w[P][A+1];(e>0||P!==0)&&(f.push(O,D,K),R+=3),(t>0||P!==s-1)&&(f.push(D,V,K),R+=3)}h.addGroup(v,R,0),v+=R}function E(b){const L=x,R=new pe,U=new F;let A=0;const P=b===!0?e:t,O=b===!0?1:-1;for(let V=1;V<=i;V++)p.push(0,y*O,0),m.push(0,O,0),g.push(.5,.5),x++;const D=x;for(let V=0;V<=i;V++){const te=V/i*u+c,H=Math.cos(te),Z=Math.sin(te);U.x=P*Z,U.y=y*O,U.z=P*H,p.push(U.x,U.y,U.z),m.push(0,O,0),R.x=H*.5+.5,R.y=Z*.5*O+.5,g.push(R.x,R.y),x++}for(let V=0;V<i;V++){const K=L+V,te=D+V;b===!0?f.push(te,te+1,K):f.push(te+1,te,K),A+=3}h.addGroup(v,A,b===!0?1:2),v+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yl(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Sl extends yl{constructor(e=1,t=1,n=32,i=1,s=!1,o=0,c=Math.PI*2){super(0,e,t,n,i,s,o,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:c}}static fromJSON(e){return new Sl(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ss extends xt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],o=[];c(i),h(n),f(),this.setAttribute("position",new je(s,3)),this.setAttribute("normal",new je(s.slice(),3)),this.setAttribute("uv",new je(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function c(M){const E=new F,b=new F,L=new F;for(let R=0;R<t.length;R+=3)g(t[R+0],E),g(t[R+1],b),g(t[R+2],L),u(E,b,L,M)}function u(M,E,b,L){const R=L+1,U=[];for(let A=0;A<=R;A++){U[A]=[];const P=M.clone().lerp(b,A/R),O=E.clone().lerp(b,A/R),D=R-A;for(let V=0;V<=D;V++)V===0&&A===R?U[A][V]=P:U[A][V]=P.clone().lerp(O,V/D)}for(let A=0;A<R;A++)for(let P=0;P<2*(R-A)-1;P++){const O=Math.floor(P/2);P%2===0?(m(U[A][O+1]),m(U[A+1][O]),m(U[A][O])):(m(U[A][O+1]),m(U[A+1][O+1]),m(U[A+1][O]))}}function h(M){const E=new F;for(let b=0;b<s.length;b+=3)E.x=s[b+0],E.y=s[b+1],E.z=s[b+2],E.normalize().multiplyScalar(M),s[b+0]=E.x,s[b+1]=E.y,s[b+2]=E.z}function f(){const M=new F;for(let E=0;E<s.length;E+=3){M.x=s[E+0],M.y=s[E+1],M.z=s[E+2];const b=y(M)/2/Math.PI+.5,L=v(M)/Math.PI+.5;o.push(b,1-L)}x(),p()}function p(){for(let M=0;M<o.length;M+=6){const E=o[M+0],b=o[M+2],L=o[M+4],R=Math.max(E,b,L),U=Math.min(E,b,L);R>.9&&U<.1&&(E<.2&&(o[M+0]+=1),b<.2&&(o[M+2]+=1),L<.2&&(o[M+4]+=1))}}function m(M){s.push(M.x,M.y,M.z)}function g(M,E){const b=M*3;E.x=e[b+0],E.y=e[b+1],E.z=e[b+2]}function x(){const M=new F,E=new F,b=new F,L=new F,R=new pe,U=new pe,A=new pe;for(let P=0,O=0;P<s.length;P+=9,O+=6){M.set(s[P+0],s[P+1],s[P+2]),E.set(s[P+3],s[P+4],s[P+5]),b.set(s[P+6],s[P+7],s[P+8]),R.set(o[O+0],o[O+1]),U.set(o[O+2],o[O+3]),A.set(o[O+4],o[O+5]),L.copy(M).add(E).add(b).divideScalar(3);const D=y(L);w(R,O+0,M,D),w(U,O+2,E,D),w(A,O+4,b,D)}}function w(M,E,b,L){L<0&&M.x===1&&(o[E]=M.x-1),b.x===0&&b.z===0&&(o[E]=L/2/Math.PI+.5)}function y(M){return Math.atan2(M.z,-M.x)}function v(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ss(e.vertices,e.indices,e.radius,e.detail)}}class Hh extends ss{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Hh(e.radius,e.detail)}}const eu=new F,tu=new F,Bd=new F,nu=new ei;class Lx extends xt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),s=Math.cos(zs*t),o=e.getIndex(),c=e.getAttribute("position"),u=o?o.count:c.count,h=[0,0,0],f=["a","b","c"],p=new Array(3),m={},g=[];for(let x=0;x<u;x+=3){o?(h[0]=o.getX(x),h[1]=o.getX(x+1),h[2]=o.getX(x+2)):(h[0]=x,h[1]=x+1,h[2]=x+2);const{a:w,b:y,c:v}=nu;if(w.fromBufferAttribute(c,h[0]),y.fromBufferAttribute(c,h[1]),v.fromBufferAttribute(c,h[2]),nu.getNormal(Bd),p[0]=`${Math.round(w.x*i)},${Math.round(w.y*i)},${Math.round(w.z*i)}`,p[1]=`${Math.round(y.x*i)},${Math.round(y.y*i)},${Math.round(y.z*i)}`,p[2]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,!(p[0]===p[1]||p[1]===p[2]||p[2]===p[0]))for(let M=0;M<3;M++){const E=(M+1)%3,b=p[M],L=p[E],R=nu[f[M]],U=nu[f[E]],A=`${b}_${L}`,P=`${L}_${b}`;P in m&&m[P]?(Bd.dot(m[P].normal)<=s&&(g.push(R.x,R.y,R.z),g.push(U.x,U.y,U.z)),m[P]=null):A in m||(m[A]={index0:h[M],index1:h[E],normal:Bd.clone()})}}for(const x in m)if(m[x]){const{index0:w,index1:y}=m[x];eu.fromBufferAttribute(c,w),tu.fromBufferAttribute(c,y),g.push(eu.x,eu.y,eu.z),g.push(tu.x,tu.y,tu.z)}this.setAttribute("position",new je(g,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Wi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Oe("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let c=0,u=s-1,h;for(;c<=u;)if(i=Math.floor(c+(u-c)/2),h=n[i]-o,h<0)c=i+1;else if(h>0)u=i-1;else{u=i;break}if(i=u,n[i]===o)return i/(s-1);const f=n[i],m=n[i+1]-f,g=(o-f)/m;return(i+g)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),c=this.getPoint(s),u=t||(o.isVector2?new pe:new F);return u.copy(c).sub(o).normalize(),u}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new F,i=[],s=[],o=[],c=new F,u=new dt;for(let g=0;g<=e;g++){const x=g/e;i[g]=this.getTangentAt(x,new F)}s[0]=new F,o[0]=new F;let h=Number.MAX_VALUE;const f=Math.abs(i[0].x),p=Math.abs(i[0].y),m=Math.abs(i[0].z);f<=h&&(h=f,n.set(1,0,0)),p<=h&&(h=p,n.set(0,1,0)),m<=h&&n.set(0,0,1),c.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],c),o[0].crossVectors(i[0],s[0]);for(let g=1;g<=e;g++){if(s[g]=s[g-1].clone(),o[g]=o[g-1].clone(),c.crossVectors(i[g-1],i[g]),c.length()>Number.EPSILON){c.normalize();const x=Math.acos(ht(i[g-1].dot(i[g]),-1,1));s[g].applyMatrix4(u.makeRotationAxis(c,x))}o[g].crossVectors(i[g],s[g])}if(t===!0){let g=Math.acos(ht(s[0].dot(s[e]),-1,1));g/=e,i[0].dot(c.crossVectors(s[0],s[e]))>0&&(g=-g);for(let x=1;x<=e;x++)s[x].applyMatrix4(u.makeRotationAxis(i[x],g*x)),o[x].crossVectors(i[x],s[x])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Gh extends Wi{constructor(e=0,t=0,n=1,i=1,s=0,o=Math.PI*2,c=!1,u=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=c,this.aRotation=u}getPoint(e,t=new pe){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const c=this.aStartAngle+e*s;let u=this.aX+this.xRadius*Math.cos(c),h=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const f=Math.cos(this.aRotation),p=Math.sin(this.aRotation),m=u-this.aX,g=h-this.aY;u=m*f-g*p+this.aX,h=m*p+g*f+this.aY}return n.set(u,h)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Dx extends Gh{constructor(e,t,n,i,s,o){super(e,t,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function hm(){let r=0,e=0,t=0,n=0;function i(s,o,c,u){r=s,e=c,t=-3*s+3*o-2*c-u,n=2*s-2*o+c+u}return{initCatmullRom:function(s,o,c,u,h){i(o,c,h*(c-s),h*(u-o))},initNonuniformCatmullRom:function(s,o,c,u,h,f,p){let m=(o-s)/h-(c-s)/(h+f)+(c-o)/f,g=(c-o)/f-(u-o)/(f+p)+(u-c)/p;m*=f,g*=f,i(o,c,m,g)},calc:function(s){const o=s*s,c=o*s;return r+e*s+t*o+n*c}}}const s_=new F,o_=new F,zd=new hm,kd=new hm,Vd=new hm;class Nx extends Wi{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new F){const n=t,i=this.points,s=i.length,o=(s-(this.closed?0:1))*e;let c=Math.floor(o),u=o-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/s)+1)*s:u===0&&c===s-1&&(c=s-2,u=1);let h,f;this.closed||c>0?h=i[(c-1)%s]:(o_.subVectors(i[0],i[1]).add(i[0]),h=o_);const p=i[c%s],m=i[(c+1)%s];if(this.closed||c+2<s?f=i[(c+2)%s]:(s_.subVectors(i[s-1],i[s-2]).add(i[s-1]),f=s_),this.curveType==="centripetal"||this.curveType==="chordal"){const g=this.curveType==="chordal"?.5:.25;let x=Math.pow(h.distanceToSquared(p),g),w=Math.pow(p.distanceToSquared(m),g),y=Math.pow(m.distanceToSquared(f),g);w<1e-4&&(w=1),x<1e-4&&(x=w),y<1e-4&&(y=w),zd.initNonuniformCatmullRom(h.x,p.x,m.x,f.x,x,w,y),kd.initNonuniformCatmullRom(h.y,p.y,m.y,f.y,x,w,y),Vd.initNonuniformCatmullRom(h.z,p.z,m.z,f.z,x,w,y)}else this.curveType==="catmullrom"&&(zd.initCatmullRom(h.x,p.x,m.x,f.x,this.tension),kd.initCatmullRom(h.y,p.y,m.y,f.y,this.tension),Vd.initCatmullRom(h.z,p.z,m.z,f.z,this.tension));return n.set(zd.calc(u),kd.calc(u),Vd.calc(u)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new F().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function a_(r,e,t,n,i){const s=(n-e)*.5,o=(i-t)*.5,c=r*r,u=r*c;return(2*t-2*n+s+o)*u+(-3*t+3*n-2*s-o)*c+s*r+t}function q1(r,e){const t=1-r;return t*t*e}function Y1(r,e){return 2*(1-r)*r*e}function Z1(r,e){return r*r*e}function Ja(r,e,t,n){return q1(r,e)+Y1(r,t)+Z1(r,n)}function J1(r,e){const t=1-r;return t*t*t*e}function j1(r,e){const t=1-r;return 3*t*t*r*e}function K1(r,e){return 3*(1-r)*r*r*e}function Q1(r,e){return r*r*r*e}function ja(r,e,t,n,i){return J1(r,e)+j1(r,t)+K1(r,n)+Q1(r,i)}class fm extends Wi{constructor(e=new pe,t=new pe,n=new pe,i=new pe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new pe){const n=t,i=this.v0,s=this.v1,o=this.v2,c=this.v3;return n.set(ja(e,i.x,s.x,o.x,c.x),ja(e,i.y,s.y,o.y,c.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ux extends Wi{constructor(e=new F,t=new F,n=new F,i=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new F){const n=t,i=this.v0,s=this.v1,o=this.v2,c=this.v3;return n.set(ja(e,i.x,s.x,o.x,c.x),ja(e,i.y,s.y,o.y,c.y),ja(e,i.z,s.z,o.z,c.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class dm extends Wi{constructor(e=new pe,t=new pe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new pe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new pe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Fx extends Wi{constructor(e=new F,t=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new F){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new F){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class pm extends Wi{constructor(e=new pe,t=new pe,n=new pe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new pe){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(Ja(e,i.x,s.x,o.x),Ja(e,i.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class mm extends Wi{constructor(e=new F,t=new F,n=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new F){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(Ja(e,i.x,s.x,o.x),Ja(e,i.y,s.y,o.y),Ja(e,i.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class gm extends Wi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new pe){const n=t,i=this.points,s=(i.length-1)*e,o=Math.floor(s),c=s-o,u=i[o===0?o:o-1],h=i[o],f=i[o>i.length-2?i.length-1:o+1],p=i[o>i.length-3?i.length-1:o+2];return n.set(a_(c,u.x,h.x,f.x,p.x),a_(c,u.y,h.y,f.y,p.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new pe().fromArray(i))}return this}}var mh=Object.freeze({__proto__:null,ArcCurve:Dx,CatmullRomCurve3:Nx,CubicBezierCurve:fm,CubicBezierCurve3:Ux,EllipseCurve:Gh,LineCurve:dm,LineCurve3:Fx,QuadraticBezierCurve:pm,QuadraticBezierCurve3:mm,SplineCurve:gm});class Ox extends Wi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new mh[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,c=this.curves[s],u=c.getLength(),h=u===0?0:1-o/u;return c.getPointAt(h,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],c=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,u=o.getPoints(c);for(let h=0;h<u.length;h++){const f=u[h];n&&n.equals(f)||(t.push(f),n=f)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new mh[i.type]().fromJSON(i))}return this}}class gh extends Ox{constructor(e){super(),this.type="Path",this.currentPoint=new pe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new dm(this.currentPoint.clone(),new pe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new pm(this.currentPoint.clone(),new pe(e,t),new pe(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,o){const c=new fm(this.currentPoint.clone(),new pe(e,t),new pe(n,i),new pe(s,o));return this.curves.push(c),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new gm(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,o){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absarc(e+c,t+u,n,i,s,o),this}absarc(e,t,n,i,s,o){return this.absellipse(e,t,n,n,i,s,o),this}ellipse(e,t,n,i,s,o,c,u){const h=this.currentPoint.x,f=this.currentPoint.y;return this.absellipse(e+h,t+f,n,i,s,o,c,u),this}absellipse(e,t,n,i,s,o,c,u){const h=new Gh(e,t,n,i,s,o,c,u);if(this.curves.length>0){const p=h.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(h);const f=h.getPoint(1);return this.currentPoint.copy(f),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Vs extends gh{constructor(e){super(e),this.uuid=di(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new gh().fromJSON(i))}return this}}function $1(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=Bx(r,0,i,t,!0);const o=[];if(!s||s.next===s.prev)return o;let c,u,h;if(n&&(s=rw(r,e,s,t)),r.length>80*t){c=r[0],u=r[1];let f=c,p=u;for(let m=t;m<i;m+=t){const g=r[m],x=r[m+1];g<c&&(c=g),x<u&&(u=x),g>f&&(f=g),x>p&&(p=x)}h=Math.max(f-c,p-u),h=h!==0?32767/h:0}return ll(s,o,t,c,u,h,0),o}function Bx(r,e,t,n,i){let s;if(i===mw(r,e,t,n)>0)for(let o=e;o<t;o+=n)s=l_(o/n|0,r[o],r[o+1],s);else for(let o=t-n;o>=e;o-=n)s=l_(o/n|0,r[o],r[o+1],s);return s&&Xo(s,s.next)&&(ul(s),s=s.next),s}function qs(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(Xo(t,t.next)||en(t.prev,t,t.next)===0)){if(ul(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function ll(r,e,t,n,i,s,o){if(!r)return;!o&&s&&cw(r,n,i,s);let c=r;for(;r.prev!==r.next;){const u=r.prev,h=r.next;if(s?tw(r,n,i,s):ew(r)){e.push(u.i,r.i,h.i),ul(r),r=h.next,c=h.next;continue}if(r=h,r===c){o?o===1?(r=nw(qs(r),e),ll(r,e,t,n,i,s,2)):o===2&&iw(r,e,t,n,i,s):ll(qs(r),e,t,n,i,s,1);break}}}function ew(r){const e=r.prev,t=r,n=r.next;if(en(e,t,n)>=0)return!1;const i=e.x,s=t.x,o=n.x,c=e.y,u=t.y,h=n.y,f=Math.min(i,s,o),p=Math.min(c,u,h),m=Math.max(i,s,o),g=Math.max(c,u,h);let x=n.next;for(;x!==e;){if(x.x>=f&&x.x<=m&&x.y>=p&&x.y<=g&&Ba(i,c,s,u,o,h,x.x,x.y)&&en(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function tw(r,e,t,n){const i=r.prev,s=r,o=r.next;if(en(i,s,o)>=0)return!1;const c=i.x,u=s.x,h=o.x,f=i.y,p=s.y,m=o.y,g=Math.min(c,u,h),x=Math.min(f,p,m),w=Math.max(c,u,h),y=Math.max(f,p,m),v=Rp(g,x,e,t,n),M=Rp(w,y,e,t,n);let E=r.prevZ,b=r.nextZ;for(;E&&E.z>=v&&b&&b.z<=M;){if(E.x>=g&&E.x<=w&&E.y>=x&&E.y<=y&&E!==i&&E!==o&&Ba(c,f,u,p,h,m,E.x,E.y)&&en(E.prev,E,E.next)>=0||(E=E.prevZ,b.x>=g&&b.x<=w&&b.y>=x&&b.y<=y&&b!==i&&b!==o&&Ba(c,f,u,p,h,m,b.x,b.y)&&en(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;E&&E.z>=v;){if(E.x>=g&&E.x<=w&&E.y>=x&&E.y<=y&&E!==i&&E!==o&&Ba(c,f,u,p,h,m,E.x,E.y)&&en(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;b&&b.z<=M;){if(b.x>=g&&b.x<=w&&b.y>=x&&b.y<=y&&b!==i&&b!==o&&Ba(c,f,u,p,h,m,b.x,b.y)&&en(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function nw(r,e){let t=r;do{const n=t.prev,i=t.next.next;!Xo(n,i)&&kx(n,t,t.next,i)&&cl(n,i)&&cl(i,n)&&(e.push(n.i,t.i,i.i),ul(t),ul(t.next),t=r=i),t=t.next}while(t!==r);return qs(t)}function iw(r,e,t,n,i,s){let o=r;do{let c=o.next.next;for(;c!==o.prev;){if(o.i!==c.i&&fw(o,c)){let u=Vx(o,c);o=qs(o,o.next),u=qs(u,u.next),ll(o,e,t,n,i,s,0),ll(u,e,t,n,i,s,0);return}c=c.next}o=o.next}while(o!==r)}function rw(r,e,t,n){const i=[];for(let s=0,o=e.length;s<o;s++){const c=e[s]*n,u=s<o-1?e[s+1]*n:r.length,h=Bx(r,c,u,n,!1);h===h.next&&(h.steiner=!0),i.push(hw(h))}i.sort(sw);for(let s=0;s<i.length;s++)t=ow(i[s],t);return t}function sw(r,e){let t=r.x-e.x;if(t===0&&(t=r.y-e.y,t===0)){const n=(r.next.y-r.y)/(r.next.x-r.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function ow(r,e){const t=aw(r,e);if(!t)return e;const n=Vx(t,r);return qs(n,n.next),qs(t,t.next)}function aw(r,e){let t=e;const n=r.x,i=r.y;let s=-1/0,o;if(Xo(r,t))return t;do{if(Xo(r,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){const p=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(p<=n&&p>s&&(s=p,o=t.x<t.next.x?t:t.next,p===n))return o}t=t.next}while(t!==e);if(!o)return null;const c=o,u=o.x,h=o.y;let f=1/0;t=o;do{if(n>=t.x&&t.x>=u&&n!==t.x&&zx(i<h?n:s,i,u,h,i<h?s:n,i,t.x,t.y)){const p=Math.abs(i-t.y)/(n-t.x);cl(t,r)&&(p<f||p===f&&(t.x>o.x||t.x===o.x&&lw(o,t)))&&(o=t,f=p)}t=t.next}while(t!==c);return o}function lw(r,e){return en(r.prev,r,e.prev)<0&&en(e.next,r,r.next)<0}function cw(r,e,t,n){let i=r;do i.z===0&&(i.z=Rp(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,uw(i)}function uw(r){let e,t=1;do{let n=r,i;r=null;let s=null;for(e=0;n;){e++;let o=n,c=0;for(let h=0;h<t&&(c++,o=o.nextZ,!!o);h++);let u=t;for(;c>0||u>0&&o;)c!==0&&(u===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,c--):(i=o,o=o.nextZ,u--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;n=o}s.nextZ=null,t*=2}while(e>1);return r}function Rp(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function hw(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function zx(r,e,t,n,i,s,o,c){return(i-o)*(e-c)>=(r-o)*(s-c)&&(r-o)*(n-c)>=(t-o)*(e-c)&&(t-o)*(s-c)>=(i-o)*(n-c)}function Ba(r,e,t,n,i,s,o,c){return!(r===o&&e===c)&&zx(r,e,t,n,i,s,o,c)}function fw(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!dw(r,e)&&(cl(r,e)&&cl(e,r)&&pw(r,e)&&(en(r.prev,r,e.prev)||en(r,e.prev,e))||Xo(r,e)&&en(r.prev,r,r.next)>0&&en(e.prev,e,e.next)>0)}function en(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Xo(r,e){return r.x===e.x&&r.y===e.y}function kx(r,e,t,n){const i=ru(en(r,e,t)),s=ru(en(r,e,n)),o=ru(en(t,n,r)),c=ru(en(t,n,e));return!!(i!==s&&o!==c||i===0&&iu(r,t,e)||s===0&&iu(r,n,e)||o===0&&iu(t,r,n)||c===0&&iu(t,e,n))}function iu(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function ru(r){return r>0?1:r<0?-1:0}function dw(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&kx(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function cl(r,e){return en(r.prev,r,r.next)<0?en(r,e,r.next)>=0&&en(r,r.prev,e)>=0:en(r,e,r.prev)<0||en(r,r.next,e)<0}function pw(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function Vx(r,e){const t=Pp(r.i,r.x,r.y),n=Pp(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function l_(r,e,t,n){const i=Pp(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ul(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Pp(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function mw(r,e,t,n){let i=0;for(let s=e,o=t-n;s<t;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class gw{static triangulate(e,t,n=2){return $1(e,t,n)}}class ki{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return ki.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];c_(e),u_(n,e);let o=e.length;t.forEach(c_);for(let u=0;u<t.length;u++)i.push(o),o+=t[u].length,u_(n,t[u]);const c=gw.triangulate(n,i);for(let u=0;u<c.length;u+=3)s.push(c.slice(u,u+3));return s}}function c_(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function u_(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class Wh extends xt{constructor(e=new Vs([new pe(.5,.5),new pe(-.5,.5),new pe(-.5,-.5),new pe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],s=[];for(let c=0,u=e.length;c<u;c++){const h=e[c];o(h)}this.setAttribute("position",new je(i,3)),this.setAttribute("uv",new je(s,2)),this.computeVertexNormals();function o(c){const u=[],h=t.curveSegments!==void 0?t.curveSegments:12,f=t.steps!==void 0?t.steps:1,p=t.depth!==void 0?t.depth:1;let m=t.bevelEnabled!==void 0?t.bevelEnabled:!0,g=t.bevelThickness!==void 0?t.bevelThickness:.2,x=t.bevelSize!==void 0?t.bevelSize:g-.1,w=t.bevelOffset!==void 0?t.bevelOffset:0,y=t.bevelSegments!==void 0?t.bevelSegments:3;const v=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:_w;let E,b=!1,L,R,U,A;if(v){E=v.getSpacedPoints(f),b=!0,m=!1;const de=v.isCatmullRomCurve3?v.closed:!1;L=v.computeFrenetFrames(f,de),R=new F,U=new F,A=new F}m||(y=0,g=0,x=0,w=0);const P=c.extractPoints(h);let O=P.shape;const D=P.holes;if(!ki.isClockWise(O)){O=O.reverse();for(let de=0,xe=D.length;de<xe;de++){const me=D[de];ki.isClockWise(me)&&(D[de]=me.reverse())}}function K(de){const me=10000000000000001e-36;let Ue=de[0];for(let De=1;De<=de.length;De++){const at=De%de.length,k=de[at],ft=k.x-Ue.x,tt=k.y-Ue.y,ct=ft*ft+tt*tt,ye=Math.max(Math.abs(k.x),Math.abs(k.y),Math.abs(Ue.x),Math.abs(Ue.y)),Pt=me*ye*ye;if(ct<=Pt){de.splice(at,1),De--;continue}Ue=k}}K(O),D.forEach(K);const te=D.length,H=O;for(let de=0;de<te;de++){const xe=D[de];O=O.concat(xe)}function Z(de,xe,me){return xe||rt("ExtrudeGeometry: vec does not exist"),de.clone().addScaledVector(xe,me)}const J=O.length;function z(de,xe,me){let Ue,De,at;const k=de.x-xe.x,ft=de.y-xe.y,tt=me.x-de.x,ct=me.y-de.y,ye=k*k+ft*ft,Pt=k*ct-ft*tt;if(Math.abs(Pt)>Number.EPSILON){const N=Math.sqrt(ye),C=Math.sqrt(tt*tt+ct*ct),Q=xe.x-ft/N,ue=xe.y+k/N,ge=me.x-ct/C,Ee=me.y+tt/C,Pe=((ge-Q)*ct-(Ee-ue)*tt)/(k*ct-ft*tt);Ue=Q+k*Pe-de.x,De=ue+ft*Pe-de.y;const ae=Ue*Ue+De*De;if(ae<=2)return new pe(Ue,De);at=Math.sqrt(ae/2)}else{let N=!1;k>Number.EPSILON?tt>Number.EPSILON&&(N=!0):k<-Number.EPSILON?tt<-Number.EPSILON&&(N=!0):Math.sign(ft)===Math.sign(ct)&&(N=!0),N?(Ue=-ft,De=k,at=Math.sqrt(ye)):(Ue=k,De=ft,at=Math.sqrt(ye/2))}return new pe(Ue/at,De/at)}const W=[];for(let de=0,xe=H.length,me=xe-1,Ue=de+1;de<xe;de++,me++,Ue++)me===xe&&(me=0),Ue===xe&&(Ue=0),W[de]=z(H[de],H[me],H[Ue]);const q=[];let re,he=W.concat();for(let de=0,xe=te;de<xe;de++){const me=D[de];re=[];for(let Ue=0,De=me.length,at=De-1,k=Ue+1;Ue<De;Ue++,at++,k++)at===De&&(at=0),k===De&&(k=0),re[Ue]=z(me[Ue],me[at],me[k]);q.push(re),he=he.concat(re)}let Ie;if(y===0)Ie=ki.triangulateShape(H,D);else{const de=[],xe=[];for(let me=0;me<y;me++){const Ue=me/y,De=g*Math.cos(Ue*Math.PI/2),at=x*Math.sin(Ue*Math.PI/2)+w;for(let k=0,ft=H.length;k<ft;k++){const tt=Z(H[k],W[k],at);$e(tt.x,tt.y,-De),Ue===0&&de.push(tt)}for(let k=0,ft=te;k<ft;k++){const tt=D[k];re=q[k];const ct=[];for(let ye=0,Pt=tt.length;ye<Pt;ye++){const N=Z(tt[ye],re[ye],at);$e(N.x,N.y,-De),Ue===0&&ct.push(N)}Ue===0&&xe.push(ct)}}Ie=ki.triangulateShape(de,xe)}const nt=Ie.length,Qe=x+w;for(let de=0;de<J;de++){const xe=m?Z(O[de],he[de],Qe):O[de];b?(U.copy(L.normals[0]).multiplyScalar(xe.x),R.copy(L.binormals[0]).multiplyScalar(xe.y),A.copy(E[0]).add(U).add(R),$e(A.x,A.y,A.z)):$e(xe.x,xe.y,0)}for(let de=1;de<=f;de++)for(let xe=0;xe<J;xe++){const me=m?Z(O[xe],he[xe],Qe):O[xe];b?(U.copy(L.normals[de]).multiplyScalar(me.x),R.copy(L.binormals[de]).multiplyScalar(me.y),A.copy(E[de]).add(U).add(R),$e(A.x,A.y,A.z)):$e(me.x,me.y,p/f*de)}for(let de=y-1;de>=0;de--){const xe=de/y,me=g*Math.cos(xe*Math.PI/2),Ue=x*Math.sin(xe*Math.PI/2)+w;for(let De=0,at=H.length;De<at;De++){const k=Z(H[De],W[De],Ue);$e(k.x,k.y,p+me)}for(let De=0,at=D.length;De<at;De++){const k=D[De];re=q[De];for(let ft=0,tt=k.length;ft<tt;ft++){const ct=Z(k[ft],re[ft],Ue);b?$e(ct.x,ct.y+E[f-1].y,E[f-1].x+me):$e(ct.x,ct.y,p+me)}}}oe(),we();function oe(){const de=i.length/3;if(m){let xe=0,me=J*xe;for(let Ue=0;Ue<nt;Ue++){const De=Ie[Ue];Ke(De[2]+me,De[1]+me,De[0]+me)}xe=f+y*2,me=J*xe;for(let Ue=0;Ue<nt;Ue++){const De=Ie[Ue];Ke(De[0]+me,De[1]+me,De[2]+me)}}else{for(let xe=0;xe<nt;xe++){const me=Ie[xe];Ke(me[2],me[1],me[0])}for(let xe=0;xe<nt;xe++){const me=Ie[xe];Ke(me[0]+J*f,me[1]+J*f,me[2]+J*f)}}n.addGroup(de,i.length/3-de,0)}function we(){const de=i.length/3;let xe=0;Se(H,xe),xe+=H.length;for(let me=0,Ue=D.length;me<Ue;me++){const De=D[me];Se(De,xe),xe+=De.length}n.addGroup(de,i.length/3-de,1)}function Se(de,xe){let me=de.length;for(;--me>=0;){const Ue=me;let De=me-1;De<0&&(De=de.length-1);for(let at=0,k=f+y*2;at<k;at++){const ft=J*at,tt=J*(at+1),ct=xe+Ue+ft,ye=xe+De+ft,Pt=xe+De+tt,N=xe+Ue+tt;Te(ct,ye,Pt,N)}}}function $e(de,xe,me){u.push(de),u.push(xe),u.push(me)}function Ke(de,xe,me){pt(de),pt(xe),pt(me);const Ue=i.length/3,De=M.generateTopUV(n,i,Ue-3,Ue-2,Ue-1);Ze(De[0]),Ze(De[1]),Ze(De[2])}function Te(de,xe,me,Ue){pt(de),pt(xe),pt(Ue),pt(xe),pt(me),pt(Ue);const De=i.length/3,at=M.generateSideWallUV(n,i,De-6,De-3,De-2,De-1);Ze(at[0]),Ze(at[1]),Ze(at[3]),Ze(at[1]),Ze(at[2]),Ze(at[3])}function pt(de){i.push(u[de*3+0]),i.push(u[de*3+1]),i.push(u[de*3+2])}function Ze(de){s.push(de.x),s.push(de.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return vw(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,o=e.shapes.length;s<o;s++){const c=t[e.shapes[s]];n.push(c)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new mh[i.type]().fromJSON(i)),new Wh(n,e.options)}}const _w={generateTopUV:function(r,e,t,n,i){const s=e[t*3],o=e[t*3+1],c=e[n*3],u=e[n*3+1],h=e[i*3],f=e[i*3+1];return[new pe(s,o),new pe(c,u),new pe(h,f)]},generateSideWallUV:function(r,e,t,n,i,s){const o=e[t*3],c=e[t*3+1],u=e[t*3+2],h=e[n*3],f=e[n*3+1],p=e[n*3+2],m=e[i*3],g=e[i*3+1],x=e[i*3+2],w=e[s*3],y=e[s*3+1],v=e[s*3+2];return Math.abs(c-f)<Math.abs(o-h)?[new pe(o,1-u),new pe(h,1-p),new pe(m,1-x),new pe(w,1-v)]:[new pe(c,1-u),new pe(f,1-p),new pe(g,1-x),new pe(y,1-v)]}};function vw(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];t.shapes.push(s.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Xh extends ss{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Xh(e.radius,e.detail)}}class qh extends xt{constructor(e=[new pe(0,-.5),new pe(.5,0),new pe(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=ht(i,0,Math.PI*2);const s=[],o=[],c=[],u=[],h=[],f=1/t,p=new F,m=new pe,g=new F,x=new F,w=new F;let y=0,v=0;for(let M=0;M<=e.length-1;M++)switch(M){case 0:y=e[M+1].x-e[M].x,v=e[M+1].y-e[M].y,g.x=v*1,g.y=-y,g.z=v*0,w.copy(g),g.normalize(),u.push(g.x,g.y,g.z);break;case e.length-1:u.push(w.x,w.y,w.z);break;default:y=e[M+1].x-e[M].x,v=e[M+1].y-e[M].y,g.x=v*1,g.y=-y,g.z=v*0,x.copy(g),g.x+=w.x,g.y+=w.y,g.z+=w.z,g.normalize(),u.push(g.x,g.y,g.z),w.copy(x)}for(let M=0;M<=t;M++){const E=n+M*f*i,b=Math.sin(E),L=Math.cos(E);for(let R=0;R<=e.length-1;R++){p.x=e[R].x*b,p.y=e[R].y,p.z=e[R].x*L,o.push(p.x,p.y,p.z),m.x=M/t,m.y=R/(e.length-1),c.push(m.x,m.y);const U=u[3*R+0]*b,A=u[3*R+1],P=u[3*R+0]*L;h.push(U,A,P)}}for(let M=0;M<t;M++)for(let E=0;E<e.length-1;E++){const b=E+M*e.length,L=b,R=b+e.length,U=b+e.length+1,A=b+1;s.push(L,R,A),s.push(U,A,R)}this.setIndex(s),this.setAttribute("position",new je(o,3)),this.setAttribute("uv",new je(c,2)),this.setAttribute("normal",new je(h,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qh(e.points,e.segments,e.phiStart,e.phiLength)}}class Ml extends ss{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ml(e.radius,e.detail)}}class Ko extends xt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,c=Math.floor(n),u=Math.floor(i),h=c+1,f=u+1,p=e/c,m=t/u,g=[],x=[],w=[],y=[];for(let v=0;v<f;v++){const M=v*m-o;for(let E=0;E<h;E++){const b=E*p-s;x.push(b,-M,0),w.push(0,0,1),y.push(E/c),y.push(1-v/u)}}for(let v=0;v<u;v++)for(let M=0;M<c;M++){const E=M+h*v,b=M+h*(v+1),L=M+1+h*(v+1),R=M+1+h*v;g.push(E,b,R),g.push(b,L,R)}this.setIndex(g),this.setAttribute("position",new je(x,3)),this.setAttribute("normal",new je(w,3)),this.setAttribute("uv",new je(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ko(e.width,e.height,e.widthSegments,e.heightSegments)}}class Yh extends xt{constructor(e=.5,t=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const c=[],u=[],h=[],f=[];let p=e;const m=(t-e)/i,g=new F,x=new pe;for(let w=0;w<=i;w++){for(let y=0;y<=n;y++){const v=s+y/n*o;g.x=p*Math.cos(v),g.y=p*Math.sin(v),u.push(g.x,g.y,g.z),h.push(0,0,1),x.x=(g.x/t+1)/2,x.y=(g.y/t+1)/2,f.push(x.x,x.y)}p+=m}for(let w=0;w<i;w++){const y=w*(n+1);for(let v=0;v<n;v++){const M=v+y,E=M,b=M+n+1,L=M+n+2,R=M+1;c.push(E,b,R),c.push(b,L,R)}}this.setIndex(c),this.setAttribute("position",new je(u,3)),this.setAttribute("normal",new je(h,3)),this.setAttribute("uv",new je(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yh(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Zh extends xt{constructor(e=new Vs([new pe(0,.5),new pe(-.5,-.5),new pe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],s=[],o=[];let c=0,u=0;if(Array.isArray(e)===!1)h(e);else for(let f=0;f<e.length;f++)h(e[f]),this.addGroup(c,u,f),c+=u,u=0;this.setIndex(n),this.setAttribute("position",new je(i,3)),this.setAttribute("normal",new je(s,3)),this.setAttribute("uv",new je(o,2));function h(f){const p=i.length/3,m=f.extractPoints(t);let g=m.shape;const x=m.holes;ki.isClockWise(g)===!1&&(g=g.reverse());for(let y=0,v=x.length;y<v;y++){const M=x[y];ki.isClockWise(M)===!0&&(x[y]=M.reverse())}const w=ki.triangulateShape(g,x);for(let y=0,v=x.length;y<v;y++){const M=x[y];g=g.concat(M)}for(let y=0,v=g.length;y<v;y++){const M=g[y];i.push(M.x,M.y,0),s.push(0,0,1),o.push(M.x,M.y)}for(let y=0,v=w.length;y<v;y++){const M=w[y],E=M[0]+p,b=M[1]+p,L=M[2]+p;n.push(E,b,L),u+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return xw(t,e)}static fromJSON(e,t){const n=[];for(let i=0,s=e.shapes.length;i<s;i++){const o=t[e.shapes[i]];n.push(o)}return new Zh(n,e.curveSegments)}}function xw(r,e){if(e.shapes=[],Array.isArray(r))for(let t=0,n=r.length;t<n;t++){const i=r[t];e.shapes.push(i.uuid)}else e.shapes.push(r.uuid);return e}class wl extends xt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:c},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const u=Math.min(o+c,Math.PI);let h=0;const f=[],p=new F,m=new F,g=[],x=[],w=[],y=[];for(let v=0;v<=n;v++){const M=[],E=v/n;let b=0;v===0&&o===0?b=.5/t:v===n&&u===Math.PI&&(b=-.5/t);for(let L=0;L<=t;L++){const R=L/t;p.x=-e*Math.cos(i+R*s)*Math.sin(o+E*c),p.y=e*Math.cos(o+E*c),p.z=e*Math.sin(i+R*s)*Math.sin(o+E*c),x.push(p.x,p.y,p.z),m.copy(p).normalize(),w.push(m.x,m.y,m.z),y.push(R+b,1-E),M.push(h++)}f.push(M)}for(let v=0;v<n;v++)for(let M=0;M<t;M++){const E=f[v][M+1],b=f[v][M],L=f[v+1][M],R=f[v+1][M+1];(v!==0||o>0)&&g.push(E,b,R),(v!==n-1||u<Math.PI)&&g.push(b,L,R)}this.setIndex(g),this.setAttribute("position",new je(x,3)),this.setAttribute("normal",new je(w,3)),this.setAttribute("uv",new je(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wl(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Jh extends ss{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Jh(e.radius,e.detail)}}class jh extends xt{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2,o=0,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s,thetaStart:o,thetaLength:c},n=Math.floor(n),i=Math.floor(i);const u=[],h=[],f=[],p=[],m=new F,g=new F,x=new F;for(let w=0;w<=n;w++){const y=o+w/n*c;for(let v=0;v<=i;v++){const M=v/i*s;g.x=(e+t*Math.cos(y))*Math.cos(M),g.y=(e+t*Math.cos(y))*Math.sin(M),g.z=t*Math.sin(y),h.push(g.x,g.y,g.z),m.x=e*Math.cos(M),m.y=e*Math.sin(M),x.subVectors(g,m).normalize(),f.push(x.x,x.y,x.z),p.push(v/i),p.push(w/n)}}for(let w=1;w<=n;w++)for(let y=1;y<=i;y++){const v=(i+1)*w+y-1,M=(i+1)*(w-1)+y-1,E=(i+1)*(w-1)+y,b=(i+1)*w+y;u.push(v,M,b),u.push(M,E,b)}this.setIndex(u),this.setAttribute("position",new je(h,3)),this.setAttribute("normal",new je(f,3)),this.setAttribute("uv",new je(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jh(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Kh extends xt{constructor(e=1,t=.4,n=64,i=8,s=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:o},n=Math.floor(n),i=Math.floor(i);const c=[],u=[],h=[],f=[],p=new F,m=new F,g=new F,x=new F,w=new F,y=new F,v=new F;for(let E=0;E<=n;++E){const b=E/n*s*Math.PI*2;M(b,s,o,e,g),M(b+.01,s,o,e,x),y.subVectors(x,g),v.addVectors(x,g),w.crossVectors(y,v),v.crossVectors(w,y),w.normalize(),v.normalize();for(let L=0;L<=i;++L){const R=L/i*Math.PI*2,U=-t*Math.cos(R),A=t*Math.sin(R);p.x=g.x+(U*v.x+A*w.x),p.y=g.y+(U*v.y+A*w.y),p.z=g.z+(U*v.z+A*w.z),u.push(p.x,p.y,p.z),m.subVectors(p,g).normalize(),h.push(m.x,m.y,m.z),f.push(E/n),f.push(L/i)}}for(let E=1;E<=n;E++)for(let b=1;b<=i;b++){const L=(i+1)*(E-1)+(b-1),R=(i+1)*E+(b-1),U=(i+1)*E+b,A=(i+1)*(E-1)+b;c.push(L,R,A),c.push(R,U,A)}this.setIndex(c),this.setAttribute("position",new je(u,3)),this.setAttribute("normal",new je(h,3)),this.setAttribute("uv",new je(f,2));function M(E,b,L,R,U){const A=Math.cos(E),P=Math.sin(E),O=L/b*E,D=Math.cos(O);U.x=R*(2+D)*.5*A,U.y=R*(2+D)*P*.5,U.z=R*Math.sin(O)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kh(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class Qh extends xt{constructor(e=new mm(new F(-1,-1,0),new F(-1,1,0),new F(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const c=new F,u=new F,h=new pe;let f=new F;const p=[],m=[],g=[],x=[];w(),this.setIndex(x),this.setAttribute("position",new je(p,3)),this.setAttribute("normal",new je(m,3)),this.setAttribute("uv",new je(g,2));function w(){for(let E=0;E<t;E++)y(E);y(s===!1?t:0),M(),v()}function y(E){f=e.getPointAt(E/t,f);const b=o.normals[E],L=o.binormals[E];for(let R=0;R<=i;R++){const U=R/i*Math.PI*2,A=Math.sin(U),P=-Math.cos(U);u.x=P*b.x+A*L.x,u.y=P*b.y+A*L.y,u.z=P*b.z+A*L.z,u.normalize(),m.push(u.x,u.y,u.z),c.x=f.x+n*u.x,c.y=f.y+n*u.y,c.z=f.z+n*u.z,p.push(c.x,c.y,c.z)}}function v(){for(let E=1;E<=t;E++)for(let b=1;b<=i;b++){const L=(i+1)*(E-1)+(b-1),R=(i+1)*E+(b-1),U=(i+1)*E+b,A=(i+1)*(E-1)+b;x.push(L,R,A),x.push(R,U,A)}}function M(){for(let E=0;E<=t;E++)for(let b=0;b<=i;b++)h.x=E/t,h.y=b/i,g.push(h.x,h.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Qh(new mh[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class _m extends xt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],n=new Set,i=new F,s=new F;if(e.index!==null){const o=e.attributes.position,c=e.index;let u=e.groups;u.length===0&&(u=[{start:0,count:c.count,materialIndex:0}]);for(let h=0,f=u.length;h<f;++h){const p=u[h],m=p.start,g=p.count;for(let x=m,w=m+g;x<w;x+=3)for(let y=0;y<3;y++){const v=c.getX(x+y),M=c.getX(x+(y+1)%3);i.fromBufferAttribute(o,v),s.fromBufferAttribute(o,M),h_(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{const o=e.attributes.position;for(let c=0,u=o.count/3;c<u;c++)for(let h=0;h<3;h++){const f=3*c+h,p=3*c+(h+1)%3;i.fromBufferAttribute(o,f),s.fromBufferAttribute(o,p),h_(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new je(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function h_(r,e,t){const n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}var f_=Object.freeze({__proto__:null,BoxGeometry:Ys,CapsuleGeometry:kh,CircleGeometry:Vh,ConeGeometry:Sl,CylinderGeometry:yl,DodecahedronGeometry:Hh,EdgesGeometry:Lx,ExtrudeGeometry:Wh,IcosahedronGeometry:Xh,LatheGeometry:qh,OctahedronGeometry:Ml,PlaneGeometry:Ko,PolyhedronGeometry:ss,RingGeometry:Yh,ShapeGeometry:Zh,SphereGeometry:wl,TetrahedronGeometry:Jh,TorusGeometry:jh,TorusKnotGeometry:Kh,TubeGeometry:Qh,WireframeGeometry:_m});class Hx extends Tn{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ye(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}function qo(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];if(d_(i))i.isRenderTargetTexture?(Oe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(d_(i[0])){const s=[];for(let o=0,c=i.length;o<c;o++)s[o]=i[o].clone();e[t][n]=s}else e[t][n]=i.slice();else e[t][n]=i}}return e}function kn(r){const e={};for(let t=0;t<r.length;t++){const n=qo(r[t]);for(const i in n)e[i]=n[i]}return e}function d_(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function yw(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Gx(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:At.workingColorSpace}const _h={clone:qo,merge:kn};var Sw=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Mw=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class mi extends Tn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sw,this.fragmentShader=Mw,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=qo(e.uniforms),this.uniformsGroups=yw(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class vm extends mi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class xm extends Tn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pr,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Wx extends xm{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new pe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ht(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ye(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ye(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ye(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Xx extends Tn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ye(16777215),this.specular=new Ye(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pr,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hi,this.combine=_l,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class qx extends Tn{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Ye(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pr,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}class Yx extends Tn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pr,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class Zx extends Tn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pr,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hi,this.combine=_l,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ym extends Tn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=lx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Sm extends Tn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Jx extends Tn{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Ye(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pr,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this.fog=e.fog,this}}class jx extends qn{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function Os(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Kx(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Ip(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const c=t[s]*e;for(let u=0;u!==e;++u)i[o++]=r[c+u]}return i}function Mm(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}function ww(r,e,t,n,i=30){const s=r.clone();s.name=e;const o=[];for(let u=0;u<s.tracks.length;++u){const h=s.tracks[u],f=h.getValueSize(),p=[],m=[];for(let g=0;g<h.times.length;++g){const x=h.times[g]*i;if(!(x<t||x>=n)){p.push(h.times[g]);for(let w=0;w<f;++w)m.push(h.values[g*f+w])}}p.length!==0&&(h.times=Os(p,h.times.constructor),h.values=Os(m,h.values.constructor),o.push(h))}s.tracks=o;let c=1/0;for(let u=0;u<s.tracks.length;++u)c>s.tracks[u].times[0]&&(c=s.tracks[u].times[0]);for(let u=0;u<s.tracks.length;++u)s.tracks[u].shift(-1*c);return s.resetDuration(),s}function Ew(r,e=0,t=r,n=30){n<=0&&(n=30);const i=t.tracks.length,s=e/n;for(let o=0;o<i;++o){const c=t.tracks[o],u=c.ValueTypeName;if(u==="bool"||u==="string")continue;const h=r.tracks.find(function(v){return v.name===c.name&&v.ValueTypeName===u});if(h===void 0)continue;let f=0;const p=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(f=p/3);let m=0;const g=h.getValueSize();h.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(m=g/3);const x=c.times.length-1;let w;if(s<=c.times[0]){const v=f,M=p-f;w=c.values.slice(v,M)}else if(s>=c.times[x]){const v=x*p+f,M=v+p-f;w=c.values.slice(v,M)}else{const v=c.createInterpolant(),M=f,E=p-f;v.evaluate(s),w=v.resultBuffer.slice(M,E)}u==="quaternion"&&new Xn().fromArray(w).normalize().conjugate().toArray(w);const y=h.times.length;for(let v=0;v<y;++v){const M=v*g+m;if(u==="quaternion")Xn.multiplyQuaternionsFlat(h.values,M,w,0,h.values,M);else{const E=g-m*2;for(let b=0;b<E;++b)h.values[M+b]-=w[b]}}}return r.blendMode=nm,r}class bw{static convertArray(e,t){return Os(e,t)}static isTypedArray(e){return gx(e)}static getKeyframeOrder(e){return Kx(e)}static sortedArray(e,t,n){return Ip(e,t,n)}static flattenJSON(e,t,n,i){Mm(e,t,n,i)}static subclip(e,t,n,i,s=30){return ww(e,t,n,i,s)}static makeClipAdditive(e,t=0,n=e,i=30){return Ew(e,t,n,i)}}class Qo{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let c=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===c)break;if(s=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=s)){const c=t[1];e<c&&(n=2,s=c);for(let u=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===u)break;if(i=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){const c=n+o>>>1;e<t[c]?o=c:n=c+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Qx extends Qo{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Us,endingEnd:Us}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,c=i[s],u=i[o];if(c===void 0)switch(this.getSettings_().endingStart){case Fs:s=e,c=2*t-n;break;case nl:s=i.length-2,c=t+i[s]-i[s+1];break;default:s=e,c=n}if(u===void 0)switch(this.getSettings_().endingEnd){case Fs:o=e,u=2*n-t;break;case nl:o=1,u=n+i[1]-i[0];break;default:o=e-1,u=t}const h=(n-t)*.5,f=this.valueSize;this._weightPrev=h/(t-c),this._weightNext=h/(u-n),this._offsetPrev=s*f,this._offsetNext=o*f}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,u=e*c,h=u-c,f=this._offsetPrev,p=this._offsetNext,m=this._weightPrev,g=this._weightNext,x=(n-t)/(i-t),w=x*x,y=w*x,v=-m*y+2*m*w-m*x,M=(1+m)*y+(-1.5-2*m)*w+(-.5+m)*x+1,E=(-1-g)*y+(1.5+g)*w+.5*x,b=g*y-g*w;for(let L=0;L!==c;++L)s[L]=v*o[f+L]+M*o[h+L]+E*o[u+L]+b*o[p+L];return s}}class wm extends Qo{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,u=e*c,h=u-c,f=(n-t)/(i-t),p=1-f;for(let m=0;m!==c;++m)s[m]=o[h+m]*p+o[u+m]*f;return s}}class $x extends Qo{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class ey extends Qo{interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,u=e*c,h=u-c,f=this.settings||this.DefaultSettings_,p=f.inTangents,m=f.outTangents;if(!p||!m){const w=(n-t)/(i-t),y=1-w;for(let v=0;v!==c;++v)s[v]=o[h+v]*y+o[u+v]*w;return s}const g=c*2,x=e-1;for(let w=0;w!==c;++w){const y=o[h+w],v=o[u+w],M=x*g+w*2,E=m[M],b=m[M+1],L=e*g+w*2,R=p[L],U=p[L+1];let A=(n-t)/(i-t),P,O,D,V,K;for(let te=0;te<8;te++){P=A*A,O=P*A,D=1-A,V=D*D,K=V*D;const Z=K*t+3*V*A*E+3*D*P*R+O*i-n;if(Math.abs(Z)<1e-10)break;const J=3*V*(E-t)+6*D*A*(R-E)+3*P*(i-R);if(Math.abs(J)<1e-10)break;A=A-Z/J,A=Math.max(0,Math.min(1,A))}s[w]=K*y+3*V*A*b+3*D*P*U+O*v}return s}}class Pi{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Os(t,this.TimeBufferType),this.values=Os(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Os(e.times,Array),values:Os(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new $x(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new wm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Qx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new ey(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case tl:t=this.InterpolantFactoryMethodDiscrete;break;case uh:t=this.InterpolantFactoryMethodLinear;break;case Su:t=this.InterpolantFactoryMethodSmooth;break;case bp:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Oe("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return tl;case this.InterpolantFactoryMethodLinear:return uh;case this.InterpolantFactoryMethodSmooth:return Su;case this.InterpolantFactoryMethodBezier:return bp}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const c=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*c,o*c)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(rt("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(rt("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let c=0;c!==s;c++){const u=n[c];if(typeof u=="number"&&isNaN(u)){rt("KeyframeTrack: Time is not a valid number.",this,c,u),e=!1;break}if(o!==null&&o>u){rt("KeyframeTrack: Out of order keys.",this,c,u,o),e=!1;break}o=u}if(i!==void 0&&gx(i))for(let c=0,u=i.length;c!==u;++c){const h=i[c];if(isNaN(h)){rt("KeyframeTrack: Value is not a valid number.",this,c,h),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Su,s=e.length-1;let o=1;for(let c=1;c<s;++c){let u=!1;const h=e[c],f=e[c+1];if(h!==f&&(c!==1||h!==e[0]))if(i)u=!0;else{const p=c*n,m=p-n,g=p+n;for(let x=0;x!==n;++x){const w=t[p+x];if(w!==t[m+x]||w!==t[g+x]){u=!0;break}}}if(u){if(c!==o){e[o]=e[c];const p=c*n,m=o*n;for(let g=0;g!==n;++g)t[m+g]=t[p+g]}++o}}if(s>0){e[o]=e[s];for(let c=s*n,u=o*n,h=0;h!==n;++h)t[u+h]=t[c+h];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Pi.prototype.ValueTypeName="";Pi.prototype.TimeBufferType=Float32Array;Pi.prototype.ValueBufferType=Float32Array;Pi.prototype.DefaultInterpolation=uh;class Zs extends Pi{constructor(e,t,n){super(e,t,n)}}Zs.prototype.ValueTypeName="bool";Zs.prototype.ValueBufferType=Array;Zs.prototype.DefaultInterpolation=tl;Zs.prototype.InterpolantFactoryMethodLinear=void 0;Zs.prototype.InterpolantFactoryMethodSmooth=void 0;class Em extends Pi{constructor(e,t,n,i){super(e,t,n,i)}}Em.prototype.ValueTypeName="color";class hl extends Pi{constructor(e,t,n,i){super(e,t,n,i)}}hl.prototype.ValueTypeName="number";class ty extends Qo{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,u=(n-t)/(i-t);let h=e*c;for(let f=h+c;h!==f;h+=4)Xn.slerpFlat(s,0,o,h-c,o,h,u);return s}}class El extends Pi{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new ty(this.times,this.values,this.getValueSize(),e)}}El.prototype.ValueTypeName="quaternion";El.prototype.InterpolantFactoryMethodSmooth=void 0;class Js extends Pi{constructor(e,t,n){super(e,t,n)}}Js.prototype.ValueTypeName="string";Js.prototype.ValueBufferType=Array;Js.prototype.DefaultInterpolation=tl;Js.prototype.InterpolantFactoryMethodLinear=void 0;Js.prototype.InterpolantFactoryMethodSmooth=void 0;class fl extends Pi{constructor(e,t,n,i){super(e,t,n,i)}}fl.prototype.ValueTypeName="vector";class dl{constructor(e="",t=-1,n=[],i=Rh){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=di(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,c=n.length;o!==c;++o)t.push(Aw(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,o=n.length;s!==o;++s)t.push(Pi.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let c=0;c<s;c++){let u=[],h=[];u.push((c+s-1)%s,c,(c+1)%s),h.push(0,1,0);const f=Kx(u);u=Ip(u,1,f),h=Ip(h,1,f),!i&&u[0]===0&&(u.push(s),h.push(h[0])),o.push(new hl(".morphTargetInfluences["+t[c].name+"]",u,h).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let c=0,u=e.length;c<u;c++){const h=e[c],f=h.name.match(s);if(f&&f.length>1){const p=f[1];let m=i[p];m||(i[p]=m=[]),m.push(h)}}const o=[];for(const c in i)o.push(this.CreateFromMorphTargetSequence(c,i[c],t,n));return o}static parseAnimation(e,t){if(Oe("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return rt("AnimationClip: No animation in JSONLoader data."),null;const n=function(p,m,g,x,w){if(g.length!==0){const y=[],v=[];Mm(g,y,v,x),y.length!==0&&w.push(new p(m,y,v))}},i=[],s=e.name||"default",o=e.fps||30,c=e.blendMode;let u=e.length||-1;const h=e.hierarchy||[];for(let p=0;p<h.length;p++){const m=h[p].keys;if(!(!m||m.length===0))if(m[0].morphTargets){const g={};let x;for(x=0;x<m.length;x++)if(m[x].morphTargets)for(let w=0;w<m[x].morphTargets.length;w++)g[m[x].morphTargets[w]]=-1;for(const w in g){const y=[],v=[];for(let M=0;M!==m[x].morphTargets.length;++M){const E=m[x];y.push(E.time),v.push(E.morphTarget===w?1:0)}i.push(new hl(".morphTargetInfluence["+w+"]",y,v))}u=g.length*o}else{const g=".bones["+t[p].name+"]";n(fl,g+".position",m,"pos",i),n(El,g+".quaternion",m,"rot",i),n(fl,g+".scale",m,"scl",i)}}return i.length===0?null:new this(s,u,i,c)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Tw(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return hl;case"vector":case"vector2":case"vector3":case"vector4":return fl;case"color":return Em;case"quaternion":return El;case"bool":case"boolean":return Zs;case"string":return Js}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function Aw(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Tw(r.type);if(r.times===void 0){const t=[],n=[];Mm(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const ar={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(p_(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!p_(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function p_(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class bm{constructor(e,t,n){const i=this;let s=!1,o=0,c=0,u;const h=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(f){c++,s===!1&&i.onStart!==void 0&&i.onStart(f,o,c),s=!0},this.itemEnd=function(f){o++,i.onProgress!==void 0&&i.onProgress(f,o,c),o===c&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(f){i.onError!==void 0&&i.onError(f)},this.resolveURL=function(f){return u?u(f):f},this.setURLModifier=function(f){return u=f,this},this.addHandler=function(f,p){return h.push(f,p),this},this.removeHandler=function(f){const p=h.indexOf(f);return p!==-1&&h.splice(p,2),this},this.getHandler=function(f){for(let p=0,m=h.length;p<m;p+=2){const g=h[p],x=h[p+1];if(g.global&&(g.lastIndex=0),g.test(f))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const ny=new bm;class ni{constructor(e){this.manager=e!==void 0?e:ny,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}ni.DEFAULT_MATERIAL_NAME="__DEFAULT";const br={};class Cw extends Error{constructor(e,t){super(e),this.response=t}}class Ir extends ni{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=ar.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(br[e]!==void 0){br[e].push({onLoad:t,onProgress:n,onError:i});return}br[e]=[],br[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),c=this.mimeType,u=this.responseType;fetch(o).then(h=>{if(h.status===200||h.status===0){if(h.status===0&&Oe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||h.body===void 0||h.body.getReader===void 0)return h;const f=br[e],p=h.body.getReader(),m=h.headers.get("X-File-Size")||h.headers.get("Content-Length"),g=m?parseInt(m):0,x=g!==0;let w=0;const y=new ReadableStream({start(v){M();function M(){p.read().then(({done:E,value:b})=>{if(E)v.close();else{w+=b.byteLength;const L=new ProgressEvent("progress",{lengthComputable:x,loaded:w,total:g});for(let R=0,U=f.length;R<U;R++){const A=f[R];A.onProgress&&A.onProgress(L)}v.enqueue(b),M()}},E=>{v.error(E)})}}});return new Response(y)}else throw new Cw(`fetch for "${h.url}" responded with ${h.status}: ${h.statusText}`,h)}).then(h=>{switch(u){case"arraybuffer":return h.arrayBuffer();case"blob":return h.blob();case"document":return h.text().then(f=>new DOMParser().parseFromString(f,c));case"json":return h.json();default:if(c==="")return h.text();{const p=/charset="?([^;"\s]*)"?/i.exec(c),m=p&&p[1]?p[1].toLowerCase():void 0,g=new TextDecoder(m);return h.arrayBuffer().then(x=>g.decode(x))}}}).then(h=>{ar.add(`file:${e}`,h);const f=br[e];delete br[e];for(let p=0,m=f.length;p<m;p++){const g=f[p];g.onLoad&&g.onLoad(h)}}).catch(h=>{const f=br[e];if(f===void 0)throw this.manager.itemError(e),h;delete br[e];for(let p=0,m=f.length;p<m;p++){const g=f[p];g.onError&&g.onError(h)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class Rw extends ni{constructor(e){super(e)}load(e,t,n,i){const s=this,o=new Ir(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(c){try{t(s.parse(JSON.parse(c)))}catch(u){i?i(u):rt(u),s.manager.itemError(e)}},n,i)}parse(e){const t=[];for(let n=0;n<e.length;n++){const i=dl.parse(e[n]);t.push(i)}return t}}class Pw extends ni{constructor(e){super(e)}load(e,t,n,i){const s=this,o=[],c=new zh,u=new Ir(this.manager);u.setPath(this.path),u.setResponseType("arraybuffer"),u.setRequestHeader(this.requestHeader),u.setWithCredentials(s.withCredentials);let h=0;function f(p){u.load(e[p],function(m){const g=s.parse(m,!0);o[p]={width:g.width,height:g.height,format:g.format,mipmaps:g.mipmaps},h+=1,h===6&&(g.mipmapCount===1&&(c.minFilter=Yt),c.image=o,c.format=g.format,c.needsUpdate=!0,t&&t(c))},n,i)}if(Array.isArray(e))for(let p=0,m=e.length;p<m;++p)f(p);else u.load(e,function(p){const m=s.parse(p,!0);if(m.isCubemap){const g=m.mipmaps.length/m.mipmapCount;for(let x=0;x<g;x++){o[x]={mipmaps:[]};for(let w=0;w<m.mipmapCount;w++)o[x].mipmaps.push(m.mipmaps[x*m.mipmapCount+w]),o[x].format=m.format,o[x].width=m.width,o[x].height=m.height}c.image=o}else c.image.width=m.width,c.image.height=m.height,c.mipmaps=m.mipmaps;m.mipmapCount===1&&(c.minFilter=Yt),c.format=m.format,c.needsUpdate=!0,t&&t(c)},n,i);return c}}const bo=new WeakMap;class pl extends ni{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=ar.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let p=bo.get(o);p===void 0&&(p=[],bo.set(o,p)),p.push({onLoad:t,onError:i})}return o}const c=ol("img");function u(){f(),t&&t(this);const p=bo.get(this)||[];for(let m=0;m<p.length;m++){const g=p[m];g.onLoad&&g.onLoad(this)}bo.delete(this),s.manager.itemEnd(e)}function h(p){f(),i&&i(p),ar.remove(`image:${e}`);const m=bo.get(this)||[];for(let g=0;g<m.length;g++){const x=m[g];x.onError&&x.onError(p)}bo.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function f(){c.removeEventListener("load",u,!1),c.removeEventListener("error",h,!1)}return c.addEventListener("load",u,!1),c.addEventListener("error",h,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(c.crossOrigin=this.crossOrigin),ar.add(`image:${e}`,c),s.manager.itemStart(e),c.src=e,c}}class Iw extends ni{constructor(e){super(e)}load(e,t,n,i){const s=new xl;s.colorSpace=$n;const o=new pl(this.manager);o.setCrossOrigin(this.crossOrigin),o.setPath(this.path);let c=0;function u(h){o.load(e[h],function(f){s.images[h]=f,c++,c===6&&(s.needsUpdate=!0,t&&t(s))},void 0,i)}for(let h=0;h<e.length;++h)u(h);return s}}class Lw extends ni{constructor(e){super(e)}load(e,t,n,i){const s=this,o=new Vi,c=new Ir(this.manager);return c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setPath(this.path),c.setWithCredentials(s.withCredentials),c.load(e,function(u){let h;try{h=s.parse(u)}catch(f){i!==void 0?i(f):rt(f);return}h.image!==void 0?o.image=h.image:h.data!==void 0&&(o.image.width=h.width,o.image.height=h.height,o.image.data=h.data),o.wrapS=h.wrapS!==void 0?h.wrapS:ti,o.wrapT=h.wrapT!==void 0?h.wrapT:ti,o.magFilter=h.magFilter!==void 0?h.magFilter:Yt,o.minFilter=h.minFilter!==void 0?h.minFilter:Yt,o.anisotropy=h.anisotropy!==void 0?h.anisotropy:1,h.colorSpace!==void 0&&(o.colorSpace=h.colorSpace),h.flipY!==void 0&&(o.flipY=h.flipY),h.format!==void 0&&(o.format=h.format),h.type!==void 0&&(o.type=h.type),h.mipmaps!==void 0&&(o.mipmaps=h.mipmaps,o.minFilter=or),h.mipmapCount===1&&(o.minFilter=Yt),h.generateMipmaps!==void 0&&(o.generateMipmaps=h.generateMipmaps),o.needsUpdate=!0,t&&t(o,h)},n,i),o}}class Dw extends ni{constructor(e){super(e)}load(e,t,n,i){const s=new jt,o=new pl(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(c){s.image=c,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class os extends Nt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class iy extends os{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ye(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Hd=new dt,m_=new F,g_=new F;class Tm{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new pe(512,512),this.mapType=Vn,this.map=null,this.mapPass=null,this.matrix=new dt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new jo,this._frameExtents=new pe(1,1),this._viewportCount=1,this._viewports=[new Rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;m_.setFromMatrixPosition(e.matrixWorld),t.position.copy(m_),g_.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(g_),t.updateMatrixWorld(),Hd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Hd,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Ws||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Hd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const su=new F,ou=new Xn,tr=new F;class bl extends Nt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new dt,this.projectionMatrix=new dt,this.projectionMatrixInverse=new dt,this.coordinateSystem=hi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(su,ou,tr),tr.x===1&&tr.y===1&&tr.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(su,ou,tr.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(su,ou,tr),tr.x===1&&tr.y===1&&tr.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(su,ou,tr.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const qr=new F,__=new pe,v_=new pe;class hn extends bl{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Go*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(zs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Go*2*Math.atan(Math.tan(zs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){qr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(qr.x,qr.y).multiplyScalar(-e/qr.z),qr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qr.x,qr.y).multiplyScalar(-e/qr.z)}getViewSize(e,t){return this.getViewBounds(e,__,v_),t.subVectors(v_,__)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(zs*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const u=o.fullWidth,h=o.fullHeight;s+=o.offsetX*i/u,t-=o.offsetY*n/h,i*=o.width/u,n*=o.height/h}const c=this.filmOffset;c!==0&&(s+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Nw extends Tm{constructor(){super(new hn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Go*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class ry extends os{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.target=new Nt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new Nw}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class Uw extends Tm{constructor(){super(new hn(90,1,.5,500)),this.isPointLightShadow=!0}}class sy extends os{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Uw}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class as extends bl{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,c=i+t,u=i-t;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=h*this.view.offsetX,o=s+h*this.view.width,c-=f*this.view.offsetY,u=c-f*this.view.height}this.projectionMatrix.makeOrthographic(s,o,c,u,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Fw extends Tm{constructor(){super(new as(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class oy extends os{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.target=new Nt,this.shadow=new Fw}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class ay extends os{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class ly extends os{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){const t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}}class Am{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new F)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){const n=e.x,i=e.y,s=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.282095),t.addScaledVector(o[1],.488603*i),t.addScaledVector(o[2],.488603*s),t.addScaledVector(o[3],.488603*n),t.addScaledVector(o[4],1.092548*(n*i)),t.addScaledVector(o[5],1.092548*(i*s)),t.addScaledVector(o[6],.315392*(3*s*s-1)),t.addScaledVector(o[7],1.092548*(n*s)),t.addScaledVector(o[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){const n=e.x,i=e.y,s=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.886227),t.addScaledVector(o[1],2*.511664*i),t.addScaledVector(o[2],2*.511664*s),t.addScaledVector(o[3],2*.511664*n),t.addScaledVector(o[4],2*.429043*n*i),t.addScaledVector(o[5],2*.429043*i*s),t.addScaledVector(o[6],.743125*s*s-.247708),t.addScaledVector(o[7],2*.429043*n*s),t.addScaledVector(o[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){const n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){const n=e.x,i=e.y,s=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*s,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*s,t[6]=.315392*(3*s*s-1),t[7]=1.092548*n*s,t[8]=.546274*(n*n-i*i)}}class cy extends os{constructor(e=new Am,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}toJSON(e){const t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}}class $h extends ni{constructor(e){super(e),this.textures={}}load(e,t,n,i){const s=this,o=new Ir(s.manager);o.setPath(s.path),o.setRequestHeader(s.requestHeader),o.setWithCredentials(s.withCredentials),o.load(e,function(c){try{t(s.parse(JSON.parse(c)))}catch(u){i?i(u):rt(u),s.manager.itemError(e)}},n,i)}parse(e){const t=this.textures;function n(s){return t[s]===void 0&&Oe("MaterialLoader: Undefined texture",s),t[s]}const i=this.createMaterialFromType(e.type);if(e.uuid!==void 0&&(i.uuid=e.uuid),e.name!==void 0&&(i.name=e.name),e.color!==void 0&&i.color!==void 0&&i.color.setHex(e.color),e.roughness!==void 0&&(i.roughness=e.roughness),e.metalness!==void 0&&(i.metalness=e.metalness),e.sheen!==void 0&&(i.sheen=e.sheen),e.sheenColor!==void 0&&(i.sheenColor=new Ye().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(i.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(e.emissive),e.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(e.specular),e.specularIntensity!==void 0&&(i.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&i.specularColor!==void 0&&i.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(i.shininess=e.shininess),e.clearcoat!==void 0&&(i.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(i.dispersion=e.dispersion),e.iridescence!==void 0&&(i.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(i.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(i.transmission=e.transmission),e.thickness!==void 0&&(i.thickness=e.thickness),e.attenuationDistance!==void 0&&(i.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&i.attenuationColor!==void 0&&i.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(i.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(i.fog=e.fog),e.flatShading!==void 0&&(i.flatShading=e.flatShading),e.blending!==void 0&&(i.blending=e.blending),e.combine!==void 0&&(i.combine=e.combine),e.side!==void 0&&(i.side=e.side),e.shadowSide!==void 0&&(i.shadowSide=e.shadowSide),e.opacity!==void 0&&(i.opacity=e.opacity),e.transparent!==void 0&&(i.transparent=e.transparent),e.alphaTest!==void 0&&(i.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(i.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(i.depthFunc=e.depthFunc),e.depthTest!==void 0&&(i.depthTest=e.depthTest),e.depthWrite!==void 0&&(i.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(i.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(i.blendSrc=e.blendSrc),e.blendDst!==void 0&&(i.blendDst=e.blendDst),e.blendEquation!==void 0&&(i.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(i.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(i.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(i.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&i.blendColor!==void 0&&i.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(i.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(i.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(i.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(i.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(i.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(i.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(i.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(i.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(i.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(i.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(i.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(i.rotation=e.rotation),e.linewidth!==void 0&&(i.linewidth=e.linewidth),e.dashSize!==void 0&&(i.dashSize=e.dashSize),e.gapSize!==void 0&&(i.gapSize=e.gapSize),e.scale!==void 0&&(i.scale=e.scale),e.polygonOffset!==void 0&&(i.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(i.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(i.dithering=e.dithering),e.alphaToCoverage!==void 0&&(i.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(i.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(i.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(i.allowOverride=e.allowOverride),e.visible!==void 0&&(i.visible=e.visible),e.toneMapped!==void 0&&(i.toneMapped=e.toneMapped),e.userData!==void 0&&(i.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?i.vertexColors=e.vertexColors>0:i.vertexColors=e.vertexColors),e.uniforms!==void 0)for(const s in e.uniforms){const o=e.uniforms[s];switch(i.uniforms[s]={},o.type){case"t":i.uniforms[s].value=n(o.value);break;case"c":i.uniforms[s].value=new Ye().setHex(o.value);break;case"v2":i.uniforms[s].value=new pe().fromArray(o.value);break;case"v3":i.uniforms[s].value=new F().fromArray(o.value);break;case"v4":i.uniforms[s].value=new Rt().fromArray(o.value);break;case"m3":i.uniforms[s].value=new vt().fromArray(o.value);break;case"m4":i.uniforms[s].value=new dt().fromArray(o.value);break;default:i.uniforms[s].value=o.value}}if(e.defines!==void 0&&(i.defines=e.defines),e.vertexShader!==void 0&&(i.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(i.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(i.glslVersion=e.glslVersion),e.extensions!==void 0)for(const s in e.extensions)i.extensions[s]=e.extensions[s];if(e.lights!==void 0&&(i.lights=e.lights),e.clipping!==void 0&&(i.clipping=e.clipping),e.size!==void 0&&(i.size=e.size),e.sizeAttenuation!==void 0&&(i.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(i.map=n(e.map)),e.matcap!==void 0&&(i.matcap=n(e.matcap)),e.alphaMap!==void 0&&(i.alphaMap=n(e.alphaMap)),e.bumpMap!==void 0&&(i.bumpMap=n(e.bumpMap)),e.bumpScale!==void 0&&(i.bumpScale=e.bumpScale),e.normalMap!==void 0&&(i.normalMap=n(e.normalMap)),e.normalMapType!==void 0&&(i.normalMapType=e.normalMapType),e.normalScale!==void 0){let s=e.normalScale;Array.isArray(s)===!1&&(s=[s,s]),i.normalScale=new pe().fromArray(s)}return e.displacementMap!==void 0&&(i.displacementMap=n(e.displacementMap)),e.displacementScale!==void 0&&(i.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(i.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(i.roughnessMap=n(e.roughnessMap)),e.metalnessMap!==void 0&&(i.metalnessMap=n(e.metalnessMap)),e.emissiveMap!==void 0&&(i.emissiveMap=n(e.emissiveMap)),e.emissiveIntensity!==void 0&&(i.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(i.specularMap=n(e.specularMap)),e.specularIntensityMap!==void 0&&(i.specularIntensityMap=n(e.specularIntensityMap)),e.specularColorMap!==void 0&&(i.specularColorMap=n(e.specularColorMap)),e.envMap!==void 0&&(i.envMap=n(e.envMap)),e.envMapRotation!==void 0&&i.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(i.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(i.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(i.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(i.lightMap=n(e.lightMap)),e.lightMapIntensity!==void 0&&(i.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(i.aoMap=n(e.aoMap)),e.aoMapIntensity!==void 0&&(i.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(i.gradientMap=n(e.gradientMap)),e.clearcoatMap!==void 0&&(i.clearcoatMap=n(e.clearcoatMap)),e.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(e.clearcoatRoughnessMap)),e.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(e.clearcoatNormalMap)),e.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new pe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(i.iridescenceMap=n(e.iridescenceMap)),e.iridescenceThicknessMap!==void 0&&(i.iridescenceThicknessMap=n(e.iridescenceThicknessMap)),e.transmissionMap!==void 0&&(i.transmissionMap=n(e.transmissionMap)),e.thicknessMap!==void 0&&(i.thicknessMap=n(e.thicknessMap)),e.anisotropyMap!==void 0&&(i.anisotropyMap=n(e.anisotropyMap)),e.sheenColorMap!==void 0&&(i.sheenColorMap=n(e.sheenColorMap)),e.sheenRoughnessMap!==void 0&&(i.sheenRoughnessMap=n(e.sheenRoughnessMap)),i}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return $h.createMaterialFromType(e)}static createMaterialFromType(e){const t={ShadowMaterial:Hx,SpriteMaterial:am,RawShaderMaterial:vm,ShaderMaterial:mi,PointsMaterial:cm,MeshPhysicalMaterial:Wx,MeshStandardMaterial:xm,MeshPhongMaterial:Xx,MeshToonMaterial:qx,MeshNormalMaterial:Yx,MeshLambertMaterial:Zx,MeshDepthMaterial:ym,MeshDistanceMaterial:Sm,MeshBasicMaterial:rs,MeshMatcapMaterial:Jx,LineDashedMaterial:jx,LineBasicMaterial:qn,Material:Tn};return new t[e]}}class Lp{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Cm extends xt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class uy extends ni{constructor(e){super(e)}load(e,t,n,i){const s=this,o=new Ir(s.manager);o.setPath(s.path),o.setRequestHeader(s.requestHeader),o.setWithCredentials(s.withCredentials),o.load(e,function(c){try{t(s.parse(JSON.parse(c)))}catch(u){i?i(u):rt(u),s.manager.itemError(e)}},n,i)}parse(e){const t={},n={};function i(g,x){if(t[x]!==void 0)return t[x];const y=g.interleavedBuffers[x],v=s(g,y.buffer),M=Fo(y.type,v),E=new Fh(M,y.stride);return E.uuid=y.uuid,t[x]=E,E}function s(g,x){if(n[x]!==void 0)return n[x];const y=g.arrayBuffers[x],v=new Uint32Array(y).buffer;return n[x]=v,v}const o=e.isInstancedBufferGeometry?new Cm:new xt,c=e.data.index;if(c!==void 0){const g=Fo(c.type,c.array);o.setIndex(new Gt(g,1))}const u=e.data.attributes;for(const g in u){const x=u[g];let w;if(x.isInterleavedBufferAttribute){const y=i(e.data,x.data);w=new fi(y,x.itemSize,x.offset,x.normalized)}else{const y=Fo(x.type,x.array),v=x.isInstancedBufferAttribute?Wo:Gt;w=new v(y,x.itemSize,x.normalized)}x.name!==void 0&&(w.name=x.name),x.usage!==void 0&&w.setUsage(x.usage),o.setAttribute(g,w)}const h=e.data.morphAttributes;if(h)for(const g in h){const x=h[g],w=[];for(let y=0,v=x.length;y<v;y++){const M=x[y];let E;if(M.isInterleavedBufferAttribute){const b=i(e.data,M.data);E=new fi(b,M.itemSize,M.offset,M.normalized)}else{const b=Fo(M.type,M.array);E=new Gt(b,M.itemSize,M.normalized)}M.name!==void 0&&(E.name=M.name),w.push(E)}o.morphAttributes[g]=w}e.data.morphTargetsRelative&&(o.morphTargetsRelative=!0);const p=e.data.groups||e.data.drawcalls||e.data.offsets;if(p!==void 0)for(let g=0,x=p.length;g!==x;++g){const w=p[g];o.addGroup(w.start,w.count,w.materialIndex)}const m=e.data.boundingSphere;return m!==void 0&&(o.boundingSphere=new mn().fromJSON(m)),e.name&&(o.name=e.name),e.userData&&(o.userData=e.userData),o}}const Gd={};class Ow extends ni{constructor(e){super(e)}load(e,t,n,i){const s=this,o=this.path===""?Lp.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||o;const c=new Ir(this.manager);c.setPath(this.path),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(u){let h=null;try{h=JSON.parse(u)}catch(p){i!==void 0&&i(p),rt("ObjectLoader: Can't parse "+e+".",p.message);return}const f=h.metadata;if(f===void 0||f.type===void 0||f.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e)),rt("ObjectLoader: Can't load "+e);return}s.parse(h,t)},n,i)}async loadAsync(e,t){const n=this,i=this.path===""?Lp.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;const s=new Ir(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials);const o=await s.loadAsync(e,t);let c;try{c=JSON.parse(o)}catch(h){throw new Error("ObjectLoader: Can't parse "+e+". "+h.message)}const u=c.metadata;if(u===void 0||u.type===void 0||u.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(c)}parse(e,t){const n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),s=this.parseGeometries(e.geometries,i),o=this.parseImages(e.images,function(){t!==void 0&&t(h)}),c=this.parseTextures(e.textures,o),u=this.parseMaterials(e.materials,c),h=this.parseObject(e.object,s,u,c,n),f=this.parseSkeletons(e.skeletons,h);if(this.bindSkeletons(h,f),this.bindLightTargets(h),t!==void 0){let p=!1;for(const m in o)if(o[m].data instanceof HTMLImageElement){p=!0;break}p===!1&&t(h)}return h}async parseAsync(e){const t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),s=await this.parseImagesAsync(e.images),o=this.parseTextures(e.textures,s),c=this.parseMaterials(e.materials,o),u=this.parseObject(e.object,i,c,o,t),h=this.parseSkeletons(e.skeletons,u);return this.bindSkeletons(u,h),this.bindLightTargets(u),u}static registerGeometry(e,t){Gd[e]=t}parseShapes(e){const t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){const s=new Vs().fromJSON(e[n]);t[s.uuid]=s}return t}parseSkeletons(e,t){const n={},i={};if(t.traverse(function(s){s.isBone&&(i[s.uuid]=s)}),e!==void 0)for(let s=0,o=e.length;s<o;s++){const c=new Oh().fromJSON(e[s],i);n[c.uuid]=c}return n}parseGeometries(e,t){const n={};if(e!==void 0){const i=new uy;for(let s=0,o=e.length;s<o;s++){let c;const u=e[s];switch(u.type){case"BufferGeometry":case"InstancedBufferGeometry":c=i.parse(u);break;default:u.type in f_?c=f_[u.type].fromJSON(u,t):u.type in Gd?c=Gd[u.type].fromJSON(u,t):Oe(`ObjectLoader: Unknown geometry type "${u.type}". Use .registerGeometry() before starting the deserialization process.`)}c.uuid=u.uuid,u.name!==void 0&&(c.name=u.name),u.userData!==void 0&&(c.userData=u.userData),n[u.uuid]=c}}return n}parseMaterials(e,t){const n={},i={};if(e!==void 0){const s=new $h;s.setTextures(t);for(let o=0,c=e.length;o<c;o++){const u=e[o];n[u.uuid]===void 0&&(n[u.uuid]=s.parse(u)),i[u.uuid]=n[u.uuid]}}return i}parseAnimations(e){const t={};if(e!==void 0)for(let n=0;n<e.length;n++){const i=e[n],s=dl.parse(i);t[s.uuid]=s}return t}parseImages(e,t){const n=this,i={};let s;function o(u){return n.manager.itemStart(u),s.load(u,function(){n.manager.itemEnd(u)},void 0,function(){n.manager.itemError(u),n.manager.itemEnd(u)})}function c(u){if(typeof u=="string"){const h=u,f=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(h)?h:n.resourcePath+h;return o(f)}else return u.data?{data:Fo(u.type,u.data),width:u.width,height:u.height}:null}if(e!==void 0&&e.length>0){const u=new bm(t);s=new pl(u),s.setCrossOrigin(this.crossOrigin);for(let h=0,f=e.length;h<f;h++){const p=e[h],m=p.url;if(Array.isArray(m)){const g=[];for(let x=0,w=m.length;x<w;x++){const y=m[x],v=c(y);v!==null&&(v instanceof HTMLImageElement?g.push(v):g.push(new Vi(v.data,v.width,v.height)))}i[p.uuid]=new Qr(g)}else{const g=c(p.url);i[p.uuid]=new Qr(g)}}}return i}async parseImagesAsync(e){const t=this,n={};let i;async function s(o){if(typeof o=="string"){const c=o,u=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:t.resourcePath+c;return await i.loadAsync(u)}else return o.data?{data:Fo(o.type,o.data),width:o.width,height:o.height}:null}if(e!==void 0&&e.length>0){i=new pl(this.manager),i.setCrossOrigin(this.crossOrigin);for(let o=0,c=e.length;o<c;o++){const u=e[o],h=u.url;if(Array.isArray(h)){const f=[];for(let p=0,m=h.length;p<m;p++){const g=h[p],x=await s(g);x!==null&&(x instanceof HTMLImageElement?f.push(x):f.push(new Vi(x.data,x.width,x.height)))}n[u.uuid]=new Qr(f)}else{const f=await s(u.url);n[u.uuid]=new Qr(f)}}}return n}parseTextures(e,t){function n(s,o){return typeof s=="number"?s:(Oe("ObjectLoader.parseTexture: Constant should be in numeric form.",s),o[s])}const i={};if(e!==void 0)for(let s=0,o=e.length;s<o;s++){const c=e[s];c.image===void 0&&Oe('ObjectLoader: No "image" specified for',c.uuid),t[c.image]===void 0&&Oe("ObjectLoader: Undefined image",c.image);const u=t[c.image],h=u.data;let f;Array.isArray(h)?(f=new xl,h.length===6&&(f.needsUpdate=!0)):(h&&h.data?f=new Vi:f=new jt,h&&(f.needsUpdate=!0)),f.source=u,f.uuid=c.uuid,c.name!==void 0&&(f.name=c.name),c.mapping!==void 0&&(f.mapping=n(c.mapping,Bw)),c.channel!==void 0&&(f.channel=c.channel),c.offset!==void 0&&f.offset.fromArray(c.offset),c.repeat!==void 0&&f.repeat.fromArray(c.repeat),c.center!==void 0&&f.center.fromArray(c.center),c.rotation!==void 0&&(f.rotation=c.rotation),c.wrap!==void 0&&(f.wrapS=n(c.wrap[0],x_),f.wrapT=n(c.wrap[1],x_)),c.format!==void 0&&(f.format=c.format),c.internalFormat!==void 0&&(f.internalFormat=c.internalFormat),c.type!==void 0&&(f.type=c.type),c.colorSpace!==void 0&&(f.colorSpace=c.colorSpace),c.minFilter!==void 0&&(f.minFilter=n(c.minFilter,y_)),c.magFilter!==void 0&&(f.magFilter=n(c.magFilter,y_)),c.anisotropy!==void 0&&(f.anisotropy=c.anisotropy),c.flipY!==void 0&&(f.flipY=c.flipY),c.generateMipmaps!==void 0&&(f.generateMipmaps=c.generateMipmaps),c.premultiplyAlpha!==void 0&&(f.premultiplyAlpha=c.premultiplyAlpha),c.unpackAlignment!==void 0&&(f.unpackAlignment=c.unpackAlignment),c.compareFunction!==void 0&&(f.compareFunction=c.compareFunction),c.normalized!==void 0&&(f.normalized=c.normalized),c.userData!==void 0&&(f.userData=c.userData),i[c.uuid]=f}return i}parseObject(e,t,n,i,s){let o;function c(m){return t[m]===void 0&&Oe("ObjectLoader: Undefined geometry",m),t[m]}function u(m){if(m!==void 0){if(Array.isArray(m)){const g=[];for(let x=0,w=m.length;x<w;x++){const y=m[x];n[y]===void 0&&Oe("ObjectLoader: Undefined material",y),g.push(n[y])}return g}return n[m]===void 0&&Oe("ObjectLoader: Undefined material",m),n[m]}}function h(m){return i[m]===void 0&&Oe("ObjectLoader: Undefined texture",m),i[m]}let f,p;switch(e.type){case"Scene":o=new fh,e.background!==void 0&&(Number.isInteger(e.background)?o.background=new Ye(e.background):o.background=h(e.background)),e.environment!==void 0&&(o.environment=h(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?o.fog=new Uh(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(o.fog=new Nh(e.fog.color,e.fog.density)),e.fog.name!==""&&(o.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(o.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(o.backgroundIntensity=e.backgroundIntensity),e.backgroundRotation!==void 0&&o.backgroundRotation.fromArray(e.backgroundRotation),e.environmentIntensity!==void 0&&(o.environmentIntensity=e.environmentIntensity),e.environmentRotation!==void 0&&o.environmentRotation.fromArray(e.environmentRotation);break;case"PerspectiveCamera":o=new hn(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(o.focus=e.focus),e.zoom!==void 0&&(o.zoom=e.zoom),e.filmGauge!==void 0&&(o.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(o.filmOffset=e.filmOffset),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"OrthographicCamera":o=new as(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(o.zoom=e.zoom),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"AmbientLight":o=new ay(e.color,e.intensity);break;case"DirectionalLight":o=new oy(e.color,e.intensity),o.target=e.target||"";break;case"PointLight":o=new sy(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":o=new ly(e.color,e.intensity,e.width,e.height);break;case"SpotLight":o=new ry(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay),o.target=e.target||"";break;case"HemisphereLight":o=new iy(e.color,e.groundColor,e.intensity);break;case"LightProbe":const m=new Am().fromArray(e.sh);o=new cy(m,e.intensity);break;case"SkinnedMesh":f=c(e.geometry),p=u(e.material),o=new bx(f,p),e.bindMode!==void 0&&(o.bindMode=e.bindMode),e.bindMatrix!==void 0&&o.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(o.skeleton=e.skeleton);break;case"Mesh":f=c(e.geometry),p=u(e.material),o=new an(f,p);break;case"InstancedMesh":f=c(e.geometry),p=u(e.material);const g=e.count,x=e.instanceMatrix,w=e.instanceColor;o=new Tx(f,p,g),o.instanceMatrix=new Wo(new Float32Array(x.array),16),w!==void 0&&(o.instanceColor=new Wo(new Float32Array(w.array),w.itemSize));break;case"BatchedMesh":f=c(e.geometry),p=u(e.material),o=new Ax(e.maxInstanceCount,e.maxVertexCount,e.maxIndexCount,p),o.geometry=f,o.perObjectFrustumCulled=e.perObjectFrustumCulled,o.sortObjects=e.sortObjects,o._drawRanges=e.drawRanges,o._reservedRanges=e.reservedRanges,o._geometryInfo=e.geometryInfo.map(y=>{let v=null,M=null;return y.boundingBox!==void 0&&(v=new pn().fromJSON(y.boundingBox)),y.boundingSphere!==void 0&&(M=new mn().fromJSON(y.boundingSphere)),{...y,boundingBox:v,boundingSphere:M}}),o._instanceInfo=e.instanceInfo,o._availableInstanceIds=e._availableInstanceIds,o._availableGeometryIds=e._availableGeometryIds,o._nextIndexStart=e.nextIndexStart,o._nextVertexStart=e.nextVertexStart,o._geometryCount=e.geometryCount,o._maxInstanceCount=e.maxInstanceCount,o._maxVertexCount=e.maxVertexCount,o._maxIndexCount=e.maxIndexCount,o._geometryInitialized=e.geometryInitialized,o._matricesTexture=h(e.matricesTexture.uuid),o._indirectTexture=h(e.indirectTexture.uuid),e.colorsTexture!==void 0&&(o._colorsTexture=h(e.colorsTexture.uuid)),e.boundingSphere!==void 0&&(o.boundingSphere=new mn().fromJSON(e.boundingSphere)),e.boundingBox!==void 0&&(o.boundingBox=new pn().fromJSON(e.boundingBox));break;case"LOD":o=new Ex;break;case"Line":o=new is(c(e.geometry),u(e.material));break;case"LineLoop":o=new Cx(c(e.geometry),u(e.material));break;case"LineSegments":o=new fr(c(e.geometry),u(e.material));break;case"PointCloud":case"Points":o=new Rx(c(e.geometry),u(e.material));break;case"Sprite":o=new wx(u(e.material));break;case"Group":o=new Oo;break;case"Bone":o=new lm;break;default:o=new Nt}if(o.uuid=e.uuid,e.name!==void 0&&(o.name=e.name),e.matrix!==void 0?(o.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(o.matrixAutoUpdate=e.matrixAutoUpdate),o.matrixAutoUpdate&&o.matrix.decompose(o.position,o.quaternion,o.scale)):(e.position!==void 0&&o.position.fromArray(e.position),e.rotation!==void 0&&o.rotation.fromArray(e.rotation),e.quaternion!==void 0&&o.quaternion.fromArray(e.quaternion),e.scale!==void 0&&o.scale.fromArray(e.scale)),e.up!==void 0&&o.up.fromArray(e.up),e.pivot!==void 0&&(o.pivot=new F().fromArray(e.pivot)),e.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),e.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=e.morphTargetInfluences.slice()),e.castShadow!==void 0&&(o.castShadow=e.castShadow),e.receiveShadow!==void 0&&(o.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.intensity!==void 0&&(o.shadow.intensity=e.shadow.intensity),e.shadow.bias!==void 0&&(o.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(o.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(o.shadow.radius=e.shadow.radius),e.shadow.mapSize!==void 0&&o.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(o.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(o.visible=e.visible),e.frustumCulled!==void 0&&(o.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(o.renderOrder=e.renderOrder),e.static!==void 0&&(o.static=e.static),e.userData!==void 0&&(o.userData=e.userData),e.layers!==void 0&&(o.layers.mask=e.layers),e.children!==void 0){const m=e.children;for(let g=0;g<m.length;g++)o.add(this.parseObject(m[g],t,n,i,s))}if(e.animations!==void 0){const m=e.animations;for(let g=0;g<m.length;g++){const x=m[g];o.animations.push(s[x])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(o.autoUpdate=e.autoUpdate);const m=e.levels;for(let g=0;g<m.length;g++){const x=m[g],w=o.getObjectByProperty("uuid",x.object);w!==void 0&&o.addLevel(w,x.distance,x.hysteresis)}}return o}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){const i=t[n.skeleton];i===void 0?Oe("ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(e){e.traverse(function(t){if(t.isDirectionalLight||t.isSpotLight){const n=t.target,i=e.getObjectByProperty("uuid",n);i!==void 0?t.target=i:t.target=new Nt}})}}const Bw={UVMapping:Mh,CubeReflectionMapping:cr,CubeRefractionMapping:es,EquirectangularReflectionMapping:Va,EquirectangularRefractionMapping:Ha,CubeUVReflectionMapping:Zo},x_={RepeatWrapping:Ka,ClampToEdgeWrapping:ti,MirroredRepeatWrapping:Qa},y_={NearestFilter:on,NearestMipmapNearestFilter:Jp,NearestMipmapLinearFilter:Uo,LinearFilter:Yt,LinearMipmapNearestFilter:Ga,LinearMipmapLinearFilter:or},Wd=new WeakMap;class zw extends ni{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Oe("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Oe("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=ar.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(h=>{Wd.has(o)===!0?(i&&i(Wd.get(o)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(h),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);return}const c={};c.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",c.headers=this.requestHeader,c.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const u=fetch(e,c).then(function(h){return h.blob()}).then(function(h){return createImageBitmap(h,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(h){ar.add(`image-bitmap:${e}`,h),t&&t(h),s.manager.itemEnd(e)}).catch(function(h){i&&i(h),Wd.set(u,h),ar.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});ar.add(`image-bitmap:${e}`,u),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}let au;class Rm{static getContext(){return au===void 0&&(au=new(window.AudioContext||window.webkitAudioContext)),au}static setContext(e){au=e}}class kw extends ni{constructor(e){super(e)}load(e,t,n,i){const s=this,o=new Ir(this.manager);o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(u){try{const h=u.slice(0),f=Rm.getContext(),p=e+"#decode";s.manager.itemStart(p),f.decodeAudioData(h,function(m){t(m),s.manager.itemEnd(p)}).catch(function(m){c(m),s.manager.itemEnd(p)})}catch(h){c(h)}},n,i);function c(u){i?i(u):rt(u),s.manager.itemError(e)}}}const S_=new dt,M_=new dt,Ts=new dt;class Vw{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new hn,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new hn,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){const t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,Ts.copy(e.projectionMatrix);const i=t.eyeSep/2,s=i*t.near/t.focus,o=t.near*Math.tan(zs*t.fov*.5)/t.zoom;let c,u;M_.elements[12]=-i,S_.elements[12]=i,c=-o*t.aspect+s,u=o*t.aspect+s,Ts.elements[0]=2*t.near/(u-c),Ts.elements[8]=(u+c)/(u-c),this.cameraL.projectionMatrix.copy(Ts),c=-o*t.aspect-s,u=o*t.aspect-s,Ts.elements[0]=2*t.near/(u-c),Ts.elements[8]=(u+c)/(u-c),this.cameraR.projectionMatrix.copy(Ts)}this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(M_),this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(S_)}}const To=-90,Ao=1;class hy extends Nt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new hn(To,Ao,e,t);i.layers=this.layers,this.add(i);const s=new hn(To,Ao,e,t);s.layers=this.layers,this.add(s);const o=new hn(To,Ao,e,t);o.layers=this.layers,this.add(o);const c=new hn(To,Ao,e,t);c.layers=this.layers,this.add(c);const u=new hn(To,Ao,e,t);u.layers=this.layers,this.add(u);const h=new hn(To,Ao,e,t);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,c,u]=t;for(const h of t)this.remove(h);if(e===hi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),u.up.set(0,1,0),u.lookAt(0,0,-1);else if(e===Ws)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),u.up.set(0,-1,0),u.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const h of t)this.add(h),h.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,c,u,h,f]=this.children,p=e.getRenderTarget(),m=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const w=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let y=!1;e.isWebGLRenderer===!0?y=e.state.buffers.depth.getReversed():y=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,i),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,i),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,3,i),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(n,4,i),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),n.texture.generateMipmaps=w,e.setRenderTarget(n,5,i),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,f),e.setRenderTarget(p,m,g),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class fy extends hn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class dy{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Hw.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Hw(){this._document.hidden===!1&&this.reset()}const As=new F,Xd=new Xn,Gw=new F,Cs=new F,Rs=new F;class Ww extends Nt{constructor(){super(),this.type="AudioListener",this.context=Rm.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._timer=new dy}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e),this._timer.update();const t=this.context.listener;if(this.timeDelta=this._timer.getDelta(),this.matrixWorld.decompose(As,Xd,Gw),Cs.set(0,0,-1).applyQuaternion(Xd),Rs.set(0,1,0).applyQuaternion(Xd),t.positionX){const n=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(As.x,n),t.positionY.linearRampToValueAtTime(As.y,n),t.positionZ.linearRampToValueAtTime(As.z,n),t.forwardX.linearRampToValueAtTime(Cs.x,n),t.forwardY.linearRampToValueAtTime(Cs.y,n),t.forwardZ.linearRampToValueAtTime(Cs.z,n),t.upX.linearRampToValueAtTime(Rs.x,n),t.upY.linearRampToValueAtTime(Rs.y,n),t.upZ.linearRampToValueAtTime(Rs.z,n)}else t.setPosition(As.x,As.y,As.z),t.setOrientation(Cs.x,Cs.y,Cs.z,Rs.x,Rs.y,Rs.z)}}class py extends Nt{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){Oe("Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){Oe("Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){Oe("Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(e=0){if(this.hasPlaybackControl===!1){Oe("Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+e),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){Oe("Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this._progress=0}getLoop(){return this.hasPlaybackControl===!1?(Oe("Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){Oe("Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}copy(e,t){return super.copy(e,t),e.sourceType!=="buffer"?(Oe("Audio: Audio source type cannot be copied."),this):(this.autoplay=e.autoplay,this.buffer=e.buffer,this.detune=e.detune,this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this.offset=e.offset,this.duration=e.duration,this.playbackRate=e.playbackRate,this.hasPlaybackControl=e.hasPlaybackControl,this.sourceType=e.sourceType,this.filters=e.filters.slice(),this)}clone(e){return new this.constructor(this.listener).copy(this,e)}}const Ps=new F,w_=new Xn,Xw=new F,Is=new F;class qw extends py{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){return super.connect(),this.panner.connect(this.gain),this}disconnect(){return super.disconnect(),this.panner.disconnect(this.gain),this}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(Ps,w_,Xw),Is.set(0,0,1).applyQuaternion(w_);const t=this.panner;if(t.positionX){const n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(Ps.x,n),t.positionY.linearRampToValueAtTime(Ps.y,n),t.positionZ.linearRampToValueAtTime(Ps.z,n),t.orientationX.linearRampToValueAtTime(Is.x,n),t.orientationY.linearRampToValueAtTime(Is.y,n),t.orientationZ.linearRampToValueAtTime(Is.z,n)}else t.setPosition(Ps.x,Ps.y,Ps.z),t.setOrientation(Is.x,Is.y,Is.z)}}class Yw{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0;const t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}}class my{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,o;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let c=0;c!==i;++c)n[s+c]=n[c];o=t}else{o+=t;const c=t/o;this._mixBufferRegion(n,s,0,c,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,c=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const u=t*this._origIndex;this._mixBufferRegion(n,i,u,1-s,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let u=t,h=t+t;u!==h;++u)if(n[u]!==n[u+t]){c.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,o=i;s!==o;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let o=0;o!==s;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){Xn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const o=this._workIndex*s;Xn.multiplyQuaternionsFlat(e,o,e,t,e,n),Xn.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,s){const o=1-i;for(let c=0;c!==s;++c){const u=t+c;e[u]=e[u]*o+e[n+c]*i}}_lerpAdditive(e,t,n,i,s){for(let o=0;o!==s;++o){const c=t+o;e[c]=e[c]+e[n+o]*i}}}const Pm="\\[\\]\\.:\\/",Zw=new RegExp("["+Pm+"]","g"),Im="[^"+Pm+"]",Jw="[^"+Pm.replace("\\.","")+"]",jw=/((?:WC+[\/:])*)/.source.replace("WC",Im),Kw=/(WCOD+)?/.source.replace("WCOD",Jw),Qw=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Im),$w=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Im),eE=new RegExp("^"+jw+Kw+Qw+$w+"$"),tE=["material","materials","bones","map"];class nE{constructor(e,t,n){const i=n||Dt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Dt{constructor(e,t,n){this.path=t,this.parsedPath=n||Dt.parseTrackName(t),this.node=Dt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Dt.Composite(e,t,n):new Dt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Zw,"")}static parseTrackName(e){const t=eE.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);tE.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const c=s[o];if(c.name===t||c.uuid===t)return c;const u=n(c.children);if(u)return u}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Dt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Oe("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let h=t.objectIndex;switch(n){case"materials":if(!e.material){rt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){rt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){rt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let f=0;f<e.length;f++)if(e[f].name===h){h=f;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){rt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){rt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){rt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(h!==void 0){if(e[h]===void 0){rt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[h]}}const o=e[i];if(o===void 0){const h=t.nodeName;rt("PropertyBinding: Trying to update property for track: "+h+"."+i+" but it wasn't found.",e);return}let c=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?c=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let u=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){rt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){rt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}u=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(u=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(u=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[u],this.setValue=this.SetterByBindingTypeAndVersioning[u][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Dt.Composite=nE;Dt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Dt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Dt.prototype.GetterByBindingType=[Dt.prototype._getValue_direct,Dt.prototype._getValue_array,Dt.prototype._getValue_arrayElement,Dt.prototype._getValue_toArray];Dt.prototype.SetterByBindingTypeAndVersioning=[[Dt.prototype._setValue_direct,Dt.prototype._setValue_direct_setNeedsUpdate,Dt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Dt.prototype._setValue_array,Dt.prototype._setValue_array_setNeedsUpdate,Dt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Dt.prototype._setValue_arrayElement,Dt.prototype._setValue_arrayElement_setNeedsUpdate,Dt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Dt.prototype._setValue_fromArray,Dt.prototype._setValue_fromArray_setNeedsUpdate,Dt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class iE{constructor(){this.isAnimationObjectGroup=!0,this.uuid=di(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){const e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,s=this._bindings,o=s.length;let c,u=e.length,h=this.nCachedObjects_;for(let f=0,p=arguments.length;f!==p;++f){const m=arguments[f],g=m.uuid;let x=t[g];if(x===void 0){x=u++,t[g]=x,e.push(m);for(let w=0,y=o;w!==y;++w)s[w].push(new Dt(m,n[w],i[w]))}else if(x<h){c=e[x];const w=--h,y=e[w];t[y.uuid]=x,e[x]=y,t[g]=w,e[w]=m;for(let v=0,M=o;v!==M;++v){const E=s[v],b=E[w];let L=E[x];E[x]=b,L===void 0&&(L=new Dt(m,n[v],i[v])),E[w]=L}}else e[x]!==c&&rt("AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=h}remove(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_;for(let o=0,c=arguments.length;o!==c;++o){const u=arguments[o],h=u.uuid,f=t[h];if(f!==void 0&&f>=s){const p=s++,m=e[p];t[m.uuid]=f,e[f]=m,t[h]=p,e[p]=u;for(let g=0,x=i;g!==x;++g){const w=n[g],y=w[p],v=w[f];w[f]=y,w[p]=v}}}this.nCachedObjects_=s}uncache(){const e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length;let s=this.nCachedObjects_,o=e.length;for(let c=0,u=arguments.length;c!==u;++c){const h=arguments[c],f=h.uuid,p=t[f];if(p!==void 0)if(delete t[f],p<s){const m=--s,g=e[m],x=--o,w=e[x];t[g.uuid]=p,e[p]=g,t[w.uuid]=m,e[m]=w,e.pop();for(let y=0,v=i;y!==v;++y){const M=n[y],E=M[m],b=M[x];M[p]=E,M[m]=b,M.pop()}}else{const m=--o,g=e[m];m>0&&(t[g.uuid]=p),e[p]=g,e.pop();for(let x=0,w=i;x!==w;++x){const y=n[x];y[p]=y[m],y.pop()}}}this.nCachedObjects_=s}subscribe_(e,t){const n=this._bindingsIndicesByPath;let i=n[e];const s=this._bindings;if(i!==void 0)return s[i];const o=this._paths,c=this._parsedPaths,u=this._objects,h=u.length,f=this.nCachedObjects_,p=new Array(h);i=s.length,n[e]=i,o.push(e),c.push(t),s.push(p);for(let m=f,g=u.length;m!==g;++m){const x=u[m];p[m]=new Dt(x,e,t)}return p}unsubscribe_(e){const t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){const i=this._paths,s=this._parsedPaths,o=this._bindings,c=o.length-1,u=o[c],h=e[c];t[h]=n,o[n]=u,o.pop(),s[n]=s[c],s.pop(),i[n]=i[c],i.pop()}}}class gy{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,o=s.length,c=new Array(o),u={endingStart:Us,endingEnd:Us};for(let h=0;h!==o;++h){const f=s[h].createInterpolant(null);c[h]=f,f.settings&&Object.assign(u,f.settings),f.settings=u}this._interpolantSettings=u,this._interpolants=c,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=ox,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const i=this._clip.duration,s=e._clip.duration,o=s/i,c=i/s;e.warp(1,o,t),this.warp(c,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,o=this.timeScale;let c=this._timeScaleInterpolant;c===null&&(c=i._lendControlInterpolant(),this._timeScaleInterpolant=c);const u=c.parameterPositions,h=c.sampleValues;return u[0]=s,u[1]=s+n,h[0]=e/o,h[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const u=(e-s)*n;u<0||n===0?t=0:(this._startTime=null,t=n*u)}t*=this._updateTimeScale(e);const o=this._updateTime(t),c=this._updateWeight(e);if(c>0){const u=this._interpolants,h=this._propertyBindings;switch(this.blendMode){case nm:for(let f=0,p=u.length;f!==p;++f)u[f].evaluate(o),h[f].accumulateAdditive(c);break;case Rh:default:for(let f=0,p=u.length;f!==p;++f)u[f].evaluate(o),h[f].accumulate(i,c)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const o=n===ax;if(e===0)return s===-1?i:o&&(s&1)===1?t-i:i;if(n===sx){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const c=Math.floor(i/t);i-=t*c,s+=Math.abs(c);const u=this.repetitions-s;if(u<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(u===1){const h=e<0;this._setEndings(h,!h,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:c})}}else this._loopCount=s,this.time=i;if(o&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=Fs,i.endingEnd=Fs):(e?i.endingStart=this.zeroSlopeAtStart?Fs:Us:i.endingStart=nl,t?i.endingEnd=this.zeroSlopeAtEnd?Fs:Us:i.endingEnd=nl)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const c=o.parameterPositions,u=o.sampleValues;return c[0]=s,u[0]=t,c[1]=s+e,u[1]=n,this}}const rE=new Float32Array(1);class sE extends Gi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,o=e._propertyBindings,c=e._interpolants,u=n.uuid,h=this._bindingsByRootAndName;let f=h[u];f===void 0&&(f={},h[u]=f);for(let p=0;p!==s;++p){const m=i[p],g=m.name;let x=f[g];if(x!==void 0)++x.referenceCount,o[p]=x;else{if(x=o[p],x!==void 0){x._cacheIndex===null&&(++x.referenceCount,this._addInactiveBinding(x,u,g));continue}const w=t&&t._propertyBindings[p].binding.parsedPath;x=new my(Dt.create(n,g,w),m.ValueTypeName,m.getValueSize()),++x.referenceCount,this._addInactiveBinding(x,u,g),o[p]=x}c[p].resultBuffer=x.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{const c=o.knownActions;e._byClipCacheIndex=c.length,c.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,o=this._actionsByClip,c=o[s],u=c.knownActions,h=u[u.length-1],f=e._byClipCacheIndex;h._byClipCacheIndex=f,u[f]=h,u.pop(),e._byClipCacheIndex=null;const p=c.actionByRoot,m=(e._localRoot||this._root).uuid;delete p[m],u.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,c=o[i],u=t[t.length-1],h=e._cacheIndex;u._cacheIndex=h,t[h]=u,t.pop(),delete c[s],Object.keys(c).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new wm(new Float32Array(2),new Float32Array(2),1,rE),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let o=typeof e=="string"?dl.findByName(i,e):e;const c=o!==null?o.uuid:e,u=this._actionsByClip[c];let h=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Rh),u!==void 0){const p=u.actionByRoot[s];if(p!==void 0&&p.blendMode===n)return p;h=u.knownActions[0],o===null&&(o=h._clip)}if(o===null)return null;const f=new gy(this,o,t,n);return this._bindAction(f,h),this._addInactiveAction(f,c,s),f}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?dl.findByName(n,e):e,o=s?s.uuid:e,c=this._actionsByClip[o];return c!==void 0&&c.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let h=0;h!==n;++h)t[h]._update(i,e,s,o);const c=this._bindings,u=this._nActiveBindings;for(let h=0;h!==u;++h)c[h].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const o=s.knownActions;for(let c=0,u=o.length;c!==u;++c){const h=o[c];this._deactivateAction(h);const f=h._cacheIndex,p=t[t.length-1];h._cacheIndex=null,h._byClipCacheIndex=null,p._cacheIndex=f,t[f]=p,t.pop(),this._removeInactiveBindingsForAction(h)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const c=n[o].actionByRoot,u=c[t];u!==void 0&&(this._deactivateAction(u),this._removeInactiveAction(u))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const o in s){const c=s[o];c.restoreOriginalState(),this._removeInactiveBinding(c)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class oE extends rm{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isRenderTarget3D=!0,this.depth=n,this.texture=new Dh(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}class Lm{constructor(e){this.value=e}clone(){return new Lm(this.value.clone===void 0?this.value:this.value.clone())}}let aE=0;class lE extends Gi{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:aE++}),this.name="",this.usage=sl,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){const t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){this.dispatchEvent({type:"dispose"})}copy(e){this.name=e.name,this.usage=e.usage;const t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){const s=Array.isArray(t[n])?t[n]:[t[n]];for(let o=0;o<s.length;o++)this.uniforms.push(s[o].clone())}return this}clone(){return new this.constructor().copy(this)}}class vh extends Fh{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}class cE{constructor(e,t,n,i,s,o=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=s,this.normalized=o,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}}const E_=new dt;class _y{constructor(e,t,n=0,i=1/0){this.ray=new Jo(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new ks,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):rt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return E_.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(E_),this}intersectObject(e,t=!0,n=[]){return Dp(e,this,n,t),n.sort(b_),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)Dp(e[i],this,n,t);return n.sort(b_),n}}function b_(r,e){return r.distance-e.distance}function Dp(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let o=0,c=s.length;o<c;o++)Dp(s[o],e,t,!0)}}class vy{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Oe("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}class uE{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ht(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ht(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class hE{constructor(e=1,t=0,n=0){this.radius=e,this.theta=t,this.y=n}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}}const Gm=class Gm{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}};Gm.prototype.isMatrix2=!0;let Np=Gm;const T_=new pe;class fE{constructor(e=new pe(1/0,1/0),t=new pe(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=T_.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,T_).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const A_=new F,lu=new F,Co=new F,Ro=new F,qd=new F,dE=new F,pE=new F;class xy{constructor(e=new F,t=new F){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){A_.subVectors(e,this.start),lu.subVectors(this.end,this.start);const n=lu.dot(lu);if(n===0)return 0;let s=lu.dot(A_)/n;return t&&(s=ht(s,0,1)),s}closestPointToPoint(e,t,n){const i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(e,t=dE,n=pE){const i=10000000000000001e-32;let s,o;const c=this.start,u=e.start,h=this.end,f=e.end;Co.subVectors(h,c),Ro.subVectors(f,u),qd.subVectors(c,u);const p=Co.dot(Co),m=Ro.dot(Ro),g=Ro.dot(qd);if(p<=i&&m<=i)return t.copy(c),n.copy(u),t.sub(n),t.dot(t);if(p<=i)s=0,o=g/m,o=ht(o,0,1);else{const x=Co.dot(qd);if(m<=i)o=0,s=ht(-x/p,0,1);else{const w=Co.dot(Ro),y=p*m-w*w;y!==0?s=ht((w*g-x*m)/y,0,1):s=0,o=(w*s+g)/m,o<0?(o=0,s=ht(-x/p,0,1)):o>1&&(o=1,s=ht((w-x)/p,0,1))}}return t.copy(c).addScaledVector(Co,s),n.copy(u).addScaledVector(Ro,o),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}const C_=new F;class mE extends Nt{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";const n=new xt,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let o=0,c=1,u=32;o<u;o++,c++){const h=o/u*Math.PI*2,f=c/u*Math.PI*2;i.push(Math.cos(h),Math.sin(h),1,Math.cos(f),Math.sin(f),1)}n.setAttribute("position",new je(i,3));const s=new qn({fog:!1,toneMapped:!1});this.cone=new fr(n,s),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld);const e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),C_.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(C_),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const Yr=new F,cu=new dt,Yd=new dt;class gE extends fr{constructor(e){const t=yy(e),n=new xt,i=[],s=[];for(let h=0;h<t.length;h++){const f=t[h];f.parent&&f.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),s.push(0,0,0),s.push(0,0,0))}n.setAttribute("position",new je(i,3)),n.setAttribute("color",new je(s,3));const o=new qn({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,o),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1;const c=new Ye(255),u=new Ye(65280);this.setColors(c,u)}updateMatrixWorld(e){const t=this.bones,n=this.geometry,i=n.getAttribute("position");Yd.copy(this.root.matrixWorld).invert();for(let s=0,o=0;s<t.length;s++){const c=t[s];c.parent&&c.parent.isBone&&(cu.multiplyMatrices(Yd,c.matrixWorld),Yr.setFromMatrixPosition(cu),i.setXYZ(o,Yr.x,Yr.y,Yr.z),cu.multiplyMatrices(Yd,c.parent.matrixWorld),Yr.setFromMatrixPosition(cu),i.setXYZ(o+1,Yr.x,Yr.y,Yr.z),o+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}setColors(e,t){const i=this.geometry.getAttribute("color");for(let s=0;s<i.count;s+=2)i.setXYZ(s,e.r,e.g,e.b),i.setXYZ(s+1,t.r,t.g,t.b);return i.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}function yy(r){const e=[];r.isBone===!0&&e.push(r);for(let t=0;t<r.children.length;t++)e.push(...yy(r.children[t]));return e}class _E extends an{constructor(e,t,n){const i=new wl(t,4,2),s=new rs({wireframe:!0,fog:!1,toneMapped:!1});super(i,s),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const vE=new F,R_=new Ye,P_=new Ye;class xE extends Nt{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";const i=new Ml(t);i.rotateY(Math.PI*.5),this.material=new rs({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);const s=i.getAttribute("position"),o=new Float32Array(s.count*3);i.setAttribute("color",new Gt(o,3)),this.add(new an(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{const t=e.geometry.getAttribute("color");R_.copy(this.light.color),P_.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){const s=n<i/2?R_:P_;t.setXYZ(n,s.r,s.g,s.b)}t.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),e.lookAt(vE.setFromMatrixPosition(this.light.matrixWorld).negate())}}class yE extends fr{constructor(e=10,t=10,n=4473924,i=8947848){n=new Ye(n),i=new Ye(i);const s=t/2,o=e/t,c=e/2,u=[],h=[];for(let m=0,g=0,x=-c;m<=t;m++,x+=o){u.push(-c,0,x,c,0,x),u.push(x,0,-c,x,0,c);const w=m===s?n:i;w.toArray(h,g),g+=3,w.toArray(h,g),g+=3,w.toArray(h,g),g+=3,w.toArray(h,g),g+=3}const f=new xt;f.setAttribute("position",new je(u,3)),f.setAttribute("color",new je(h,3));const p=new qn({vertexColors:!0,toneMapped:!1});super(f,p),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class SE extends fr{constructor(e=10,t=16,n=8,i=64,s=4473924,o=8947848){s=new Ye(s),o=new Ye(o);const c=[],u=[];if(t>1)for(let p=0;p<t;p++){const m=p/t*(Math.PI*2),g=Math.sin(m)*e,x=Math.cos(m)*e;c.push(0,0,0),c.push(g,0,x);const w=p&1?s:o;u.push(w.r,w.g,w.b),u.push(w.r,w.g,w.b)}for(let p=0;p<n;p++){const m=p&1?s:o,g=e-e/n*p;for(let x=0;x<i;x++){let w=x/i*(Math.PI*2),y=Math.sin(w)*g,v=Math.cos(w)*g;c.push(y,0,v),u.push(m.r,m.g,m.b),w=(x+1)/i*(Math.PI*2),y=Math.sin(w)*g,v=Math.cos(w)*g,c.push(y,0,v),u.push(m.r,m.g,m.b)}}const h=new xt;h.setAttribute("position",new je(c,3)),h.setAttribute("color",new je(u,3));const f=new qn({vertexColors:!0,toneMapped:!1});super(h,f),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const I_=new F,uu=new F,L_=new F;class ME extends Nt{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new xt;i.setAttribute("position",new je([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));const s=new qn({fog:!1,toneMapped:!1});this.lightPlane=new is(i,s),this.add(this.lightPlane),i=new xt,i.setAttribute("position",new je([0,0,0,0,0,1],3)),this.targetLine=new is(i,s),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),I_.setFromMatrixPosition(this.light.matrixWorld),uu.setFromMatrixPosition(this.light.target.matrixWorld),L_.subVectors(uu,I_),this.lightPlane.lookAt(uu),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(uu),this.targetLine.scale.z=L_.length()}}const hu=new F,nn=new bl;class wE extends fr{constructor(e){const t=new xt,n=new qn({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],s=[],o={};c("n1","n2"),c("n2","n4"),c("n4","n3"),c("n3","n1"),c("f1","f2"),c("f2","f4"),c("f4","f3"),c("f3","f1"),c("n1","f1"),c("n2","f2"),c("n3","f3"),c("n4","f4"),c("p","n1"),c("p","n2"),c("p","n3"),c("p","n4"),c("u1","u2"),c("u2","u3"),c("u3","u1"),c("c","t"),c("p","c"),c("cn1","cn2"),c("cn3","cn4"),c("cf1","cf2"),c("cf3","cf4");function c(x,w){u(x),u(w)}function u(x){i.push(0,0,0),s.push(0,0,0),o[x]===void 0&&(o[x]=[]),o[x].push(i.length/3-1)}t.setAttribute("position",new je(i,3)),t.setAttribute("color",new je(s,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=o,this.update();const h=new Ye(16755200),f=new Ye(16711680),p=new Ye(43775),m=new Ye(16777215),g=new Ye(3355443);this.setColors(h,f,p,m,g)}setColors(e,t,n,i,s){const c=this.geometry.getAttribute("color");return c.setXYZ(0,e.r,e.g,e.b),c.setXYZ(1,e.r,e.g,e.b),c.setXYZ(2,e.r,e.g,e.b),c.setXYZ(3,e.r,e.g,e.b),c.setXYZ(4,e.r,e.g,e.b),c.setXYZ(5,e.r,e.g,e.b),c.setXYZ(6,e.r,e.g,e.b),c.setXYZ(7,e.r,e.g,e.b),c.setXYZ(8,e.r,e.g,e.b),c.setXYZ(9,e.r,e.g,e.b),c.setXYZ(10,e.r,e.g,e.b),c.setXYZ(11,e.r,e.g,e.b),c.setXYZ(12,e.r,e.g,e.b),c.setXYZ(13,e.r,e.g,e.b),c.setXYZ(14,e.r,e.g,e.b),c.setXYZ(15,e.r,e.g,e.b),c.setXYZ(16,e.r,e.g,e.b),c.setXYZ(17,e.r,e.g,e.b),c.setXYZ(18,e.r,e.g,e.b),c.setXYZ(19,e.r,e.g,e.b),c.setXYZ(20,e.r,e.g,e.b),c.setXYZ(21,e.r,e.g,e.b),c.setXYZ(22,e.r,e.g,e.b),c.setXYZ(23,e.r,e.g,e.b),c.setXYZ(24,t.r,t.g,t.b),c.setXYZ(25,t.r,t.g,t.b),c.setXYZ(26,t.r,t.g,t.b),c.setXYZ(27,t.r,t.g,t.b),c.setXYZ(28,t.r,t.g,t.b),c.setXYZ(29,t.r,t.g,t.b),c.setXYZ(30,t.r,t.g,t.b),c.setXYZ(31,t.r,t.g,t.b),c.setXYZ(32,n.r,n.g,n.b),c.setXYZ(33,n.r,n.g,n.b),c.setXYZ(34,n.r,n.g,n.b),c.setXYZ(35,n.r,n.g,n.b),c.setXYZ(36,n.r,n.g,n.b),c.setXYZ(37,n.r,n.g,n.b),c.setXYZ(38,i.r,i.g,i.b),c.setXYZ(39,i.r,i.g,i.b),c.setXYZ(40,s.r,s.g,s.b),c.setXYZ(41,s.r,s.g,s.b),c.setXYZ(42,s.r,s.g,s.b),c.setXYZ(43,s.r,s.g,s.b),c.setXYZ(44,s.r,s.g,s.b),c.setXYZ(45,s.r,s.g,s.b),c.setXYZ(46,s.r,s.g,s.b),c.setXYZ(47,s.r,s.g,s.b),c.setXYZ(48,s.r,s.g,s.b),c.setXYZ(49,s.r,s.g,s.b),c.needsUpdate=!0,this}update(){const e=this.geometry,t=this.pointMap,n=1,i=1;let s,o;if(nn.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),this.camera.reversedDepth===!0)s=1,o=0;else if(this.camera.coordinateSystem===hi)s=-1,o=1;else if(this.camera.coordinateSystem===Ws)s=0,o=1;else throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: "+this.camera.coordinateSystem);sn("c",t,e,nn,0,0,s),sn("t",t,e,nn,0,0,o),sn("n1",t,e,nn,-n,-i,s),sn("n2",t,e,nn,n,-i,s),sn("n3",t,e,nn,-n,i,s),sn("n4",t,e,nn,n,i,s),sn("f1",t,e,nn,-n,-i,o),sn("f2",t,e,nn,n,-i,o),sn("f3",t,e,nn,-n,i,o),sn("f4",t,e,nn,n,i,o),sn("u1",t,e,nn,n*.7,i*1.1,s),sn("u2",t,e,nn,-n*.7,i*1.1,s),sn("u3",t,e,nn,0,i*2,s),sn("cf1",t,e,nn,-n,0,o),sn("cf2",t,e,nn,n,0,o),sn("cf3",t,e,nn,0,-i,o),sn("cf4",t,e,nn,0,i,o),sn("cn1",t,e,nn,-n,0,s),sn("cn2",t,e,nn,n,0,s),sn("cn3",t,e,nn,0,-i,s),sn("cn4",t,e,nn,0,i,s),e.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function sn(r,e,t,n,i,s,o){hu.set(i,s,o).unproject(n);const c=e[r];if(c!==void 0){const u=t.getAttribute("position");for(let h=0,f=c.length;h<f;h++)u.setXYZ(c[h],hu.x,hu.y,hu.z)}}const fu=new pn;class EE extends fr{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),s=new xt;s.setIndex(new Gt(n,1)),s.setAttribute("position",new Gt(i,3)),super(s,new qn({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&fu.setFromObject(this.object),fu.isEmpty())return;const e=fu.min,t=fu.max,n=this.geometry.attributes.position,i=n.array;i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=e.x,i[4]=t.y,i[5]=t.z,i[6]=e.x,i[7]=e.y,i[8]=t.z,i[9]=t.x,i[10]=e.y,i[11]=t.z,i[12]=t.x,i[13]=t.y,i[14]=e.z,i[15]=e.x,i[16]=t.y,i[17]=e.z,i[18]=e.x,i[19]=e.y,i[20]=e.z,i[21]=t.x,i[22]=e.y,i[23]=e.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class bE extends fr{constructor(e,t=16776960){const n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],s=new xt;s.setIndex(new Gt(n,1)),s.setAttribute("position",new je(i,3)),super(s,new qn({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){const t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){this.geometry.dispose(),this.material.dispose()}}class TE extends is{constructor(e,t=1,n=16776960){const i=n,s=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],o=new xt;o.setAttribute("position",new je(s,3)),o.computeBoundingSphere(),super(o,new qn({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;const c=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],u=new xt;u.setAttribute("position",new je(c,3)),u.computeBoundingSphere(),this.add(new an(u,new rs({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const D_=new F;let du,Zd;class AE extends Nt{constructor(e=new F(0,0,1),t=new F(0,0,0),n=1,i=16776960,s=n*.2,o=s*.2){super(),this.type="ArrowHelper",du===void 0&&(du=new xt,du.setAttribute("position",new je([0,0,0,0,1,0],3)),Zd=new Sl(.5,1,5,1),Zd.translate(0,-.5,0)),this.position.copy(t),this.line=new is(du,new qn({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new an(Zd,new rs({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,s,o)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{D_.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(D_,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class CE extends fr{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new xt;i.setAttribute("position",new je(t,3)),i.setAttribute("color",new je(n,3));const s=new qn({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(e,t,n){const i=new Ye,s=this.geometry.attributes.color.array;return i.set(e),i.toArray(s,0),i.toArray(s,3),i.set(t),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class RE{constructor(){this.type="ShapePath",this.color=new Ye,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new gh,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,s,o){return this.currentPath.bezierCurveTo(e,t,n,i,s,o),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(v){const M=[];for(let E=0,b=v.length;E<b;E++){const L=v[E],R=new Vs;R.curves=L.curves,M.push(R)}return M}function n(v,M){const E=M.length;let b=!1;for(let L=E-1,R=0;R<E;L=R++){let U=M[L],A=M[R],P=A.x-U.x,O=A.y-U.y;if(Math.abs(O)>Number.EPSILON){if(O<0&&(U=M[R],P=-P,A=M[L],O=-O),v.y<U.y||v.y>A.y)continue;if(v.y===U.y){if(v.x===U.x)return!0}else{const D=O*(v.x-U.x)-P*(v.y-U.y);if(D===0)return!0;if(D<0)continue;b=!b}}else{if(v.y!==U.y)continue;if(A.x<=v.x&&v.x<=U.x||U.x<=v.x&&v.x<=A.x)return!0}}return b}const i=ki.isClockWise,s=this.subPaths;if(s.length===0)return[];let o,c,u;const h=[];if(s.length===1)return c=s[0],u=new Vs,u.curves=c.curves,h.push(u),h;let f=!i(s[0].getPoints());f=e?!f:f;const p=[],m=[];let g=[],x=0,w;m[x]=void 0,g[x]=[];for(let v=0,M=s.length;v<M;v++)c=s[v],w=c.getPoints(),o=i(w),o=e?!o:o,o?(!f&&m[x]&&x++,m[x]={s:new Vs,p:w},m[x].s.curves=c.curves,f&&x++,g[x]=[]):g[x].push({h:c,p:w[0]});if(!m[0])return t(s);if(m.length>1){let v=!1,M=0;for(let E=0,b=m.length;E<b;E++)p[E]=[];for(let E=0,b=m.length;E<b;E++){const L=g[E];for(let R=0;R<L.length;R++){const U=L[R];let A=!0;for(let P=0;P<m.length;P++)n(U.p,m[P].p)&&(E!==P&&M++,A?(A=!1,p[P].push(U)):v=!0);A&&p[E].push(U)}}M>0&&v===!1&&(g=p)}let y;for(let v=0,M=m.length;v<M;v++){u=m[v].s,h.push(u),y=g[v];for(let E=0,b=y.length;E<b;E++)u.holes.push(y[E].h)}return h}}class PE extends Gi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Oe("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function IE(r,e){const t=r.image&&r.image.width?r.image.width/r.image.height:1;return t>e?(r.repeat.x=1,r.repeat.y=t/e,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2):(r.repeat.x=e/t,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0),r}function LE(r,e){const t=r.image&&r.image.width?r.image.width/r.image.height:1;return t>e?(r.repeat.x=e/t,r.repeat.y=1,r.offset.x=(1-r.repeat.x)/2,r.offset.y=0):(r.repeat.x=1,r.repeat.y=t/e,r.offset.x=0,r.offset.y=(1-r.repeat.y)/2),r}function DE(r){return r.repeat.x=1,r.repeat.y=1,r.offset.x=0,r.offset.y=0,r}function Up(r,e,t,n){const i=NE(n);switch(t){case em:return r*e;case Th:return r*e/i.components*i.byteLength;case vl:return r*e/i.components*i.byteLength;case ts:return r*e*2/i.components*i.byteLength;case Ah:return r*e*2/i.components*i.byteLength;case tm:return r*e*3/i.components*i.byteLength;case Nn:return r*e*4/i.components*i.byteLength;case Ch:return r*e*4/i.components*i.byteLength;case Wa:case Xa:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case qa:case Ya:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Uu:case Ou:return Math.max(r,16)*Math.max(e,8)/4;case Nu:case Fu:return Math.max(r,8)*Math.max(e,8)/2;case Bu:case zu:case Vu:case Hu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case ku:case $a:case Gu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Wu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Xu:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case qu:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Yu:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Zu:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Ju:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case ju:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Ku:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Qu:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case $u:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case eh:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case th:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case nh:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case ih:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case rh:case sh:case oh:return Math.ceil(r/4)*Math.ceil(e/4)*16;case ah:case lh:return Math.ceil(r/4)*Math.ceil(e/4)*8;case el:case ch:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function NE(r){switch(r){case Vn:case jp:return{byteLength:1,components:1};case Vo:case Kp:case ur:return{byteLength:2,components:1};case Eh:case bh:return{byteLength:2,components:4};case Ri:case wh:case Gn:return{byteLength:4,components:1};case Qp:case $p:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}class UE{static contain(e,t){return IE(e,t)}static cover(e,t){return LE(e,t)}static fill(e){return DE(e)}static getByteLength(e,t,n,i){return Up(e,t,n,i)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:gl}}));typeof window<"u"&&(window.__THREE__?Oe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=gl);function Sy(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&r!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function FE(r){const e=new WeakMap;function t(c,u){const h=c.array,f=c.usage,p=h.byteLength,m=r.createBuffer();r.bindBuffer(u,m),r.bufferData(u,h,f),c.onUploadCallback();let g;if(h instanceof Float32Array)g=r.FLOAT;else if(typeof Float16Array<"u"&&h instanceof Float16Array)g=r.HALF_FLOAT;else if(h instanceof Uint16Array)c.isFloat16BufferAttribute?g=r.HALF_FLOAT:g=r.UNSIGNED_SHORT;else if(h instanceof Int16Array)g=r.SHORT;else if(h instanceof Uint32Array)g=r.UNSIGNED_INT;else if(h instanceof Int32Array)g=r.INT;else if(h instanceof Int8Array)g=r.BYTE;else if(h instanceof Uint8Array)g=r.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)g=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:m,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:p}}function n(c,u,h){const f=u.array,p=u.updateRanges;if(r.bindBuffer(h,c),p.length===0)r.bufferSubData(h,0,f);else{p.sort((g,x)=>g.start-x.start);let m=0;for(let g=1;g<p.length;g++){const x=p[m],w=p[g];w.start<=x.start+x.count+1?x.count=Math.max(x.count,w.start+w.count-x.start):(++m,p[m]=w)}p.length=m+1;for(let g=0,x=p.length;g<x;g++){const w=p[g];r.bufferSubData(h,w.start*f.BYTES_PER_ELEMENT,f,w.start,w.count)}u.clearUpdateRanges()}u.onUploadCallback()}function i(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function s(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=e.get(c);u&&(r.deleteBuffer(u.buffer),e.delete(c))}function o(c,u){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const f=e.get(c);(!f||f.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const h=e.get(c);if(h===void 0)e.set(c,t(c,u));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,c,u),h.version=c.version}}return{get:i,remove:s,update:o}}var OE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,BE=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,zE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,kE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,VE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,HE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,GE=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,WE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,XE=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,qE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,YE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ZE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,JE=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,jE=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,KE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,QE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$E=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,eb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,tb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ib=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,rb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,sb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,ob=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ab=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,lb=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,cb=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ub=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,db="gl_FragColor = linearToOutputTexel( gl_FragColor );",pb=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mb=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,gb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,_b=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,vb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xb=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,yb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Sb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Mb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Eb=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,bb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Tb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ab=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Cb=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Rb=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Pb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ib=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Lb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Db=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Nb=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ub=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Fb=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ob=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Bb=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,zb=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,kb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Vb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Wb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Xb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Yb=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Jb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Kb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$b=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,eT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,nT=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,iT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,oT=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,aT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,uT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fT=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,dT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_T=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xT=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,yT=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ST=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,MT=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,wT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ET=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,bT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,TT=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,AT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,CT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,RT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,PT=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,IT=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,LT=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,DT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,NT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,UT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,FT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const OT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,BT=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kT=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,VT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,HT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,GT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,WT=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,XT=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,qT=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,YT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ZT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,JT=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jT=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,KT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,QT=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$T=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,eA=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tA=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,nA=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iA=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,rA=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,sA=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,oA=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,aA=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,lA=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cA=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uA=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hA=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,fA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dA=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pA=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mA=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Et={alphahash_fragment:OE,alphahash_pars_fragment:BE,alphamap_fragment:zE,alphamap_pars_fragment:kE,alphatest_fragment:VE,alphatest_pars_fragment:HE,aomap_fragment:GE,aomap_pars_fragment:WE,batching_pars_vertex:XE,batching_vertex:qE,begin_vertex:YE,beginnormal_vertex:ZE,bsdfs:JE,iridescence_fragment:jE,bumpmap_pars_fragment:KE,clipping_planes_fragment:QE,clipping_planes_pars_fragment:$E,clipping_planes_pars_vertex:eb,clipping_planes_vertex:tb,color_fragment:nb,color_pars_fragment:ib,color_pars_vertex:rb,color_vertex:sb,common:ob,cube_uv_reflection_fragment:ab,defaultnormal_vertex:lb,displacementmap_pars_vertex:cb,displacementmap_vertex:ub,emissivemap_fragment:hb,emissivemap_pars_fragment:fb,colorspace_fragment:db,colorspace_pars_fragment:pb,envmap_fragment:mb,envmap_common_pars_fragment:gb,envmap_pars_fragment:_b,envmap_pars_vertex:vb,envmap_physical_pars_fragment:Rb,envmap_vertex:xb,fog_vertex:yb,fog_pars_vertex:Sb,fog_fragment:Mb,fog_pars_fragment:wb,gradientmap_pars_fragment:Eb,lightmap_pars_fragment:bb,lights_lambert_fragment:Tb,lights_lambert_pars_fragment:Ab,lights_pars_begin:Cb,lights_toon_fragment:Pb,lights_toon_pars_fragment:Ib,lights_phong_fragment:Lb,lights_phong_pars_fragment:Db,lights_physical_fragment:Nb,lights_physical_pars_fragment:Ub,lights_fragment_begin:Fb,lights_fragment_maps:Ob,lights_fragment_end:Bb,lightprobes_pars_fragment:zb,logdepthbuf_fragment:kb,logdepthbuf_pars_fragment:Vb,logdepthbuf_pars_vertex:Hb,logdepthbuf_vertex:Gb,map_fragment:Wb,map_pars_fragment:Xb,map_particle_fragment:qb,map_particle_pars_fragment:Yb,metalnessmap_fragment:Zb,metalnessmap_pars_fragment:Jb,morphinstance_vertex:jb,morphcolor_vertex:Kb,morphnormal_vertex:Qb,morphtarget_pars_vertex:$b,morphtarget_vertex:eT,normal_fragment_begin:tT,normal_fragment_maps:nT,normal_pars_fragment:iT,normal_pars_vertex:rT,normal_vertex:sT,normalmap_pars_fragment:oT,clearcoat_normal_fragment_begin:aT,clearcoat_normal_fragment_maps:lT,clearcoat_pars_fragment:cT,iridescence_pars_fragment:uT,opaque_fragment:hT,packing:fT,premultiplied_alpha_fragment:dT,project_vertex:pT,dithering_fragment:mT,dithering_pars_fragment:gT,roughnessmap_fragment:_T,roughnessmap_pars_fragment:vT,shadowmap_pars_fragment:xT,shadowmap_pars_vertex:yT,shadowmap_vertex:ST,shadowmask_pars_fragment:MT,skinbase_vertex:wT,skinning_pars_vertex:ET,skinning_vertex:bT,skinnormal_vertex:TT,specularmap_fragment:AT,specularmap_pars_fragment:CT,tonemapping_fragment:RT,tonemapping_pars_fragment:PT,transmission_fragment:IT,transmission_pars_fragment:LT,uv_pars_fragment:DT,uv_pars_vertex:NT,uv_vertex:UT,worldpos_vertex:FT,background_vert:OT,background_frag:BT,backgroundCube_vert:zT,backgroundCube_frag:kT,cube_vert:VT,cube_frag:HT,depth_vert:GT,depth_frag:WT,distance_vert:XT,distance_frag:qT,equirect_vert:YT,equirect_frag:ZT,linedashed_vert:JT,linedashed_frag:jT,meshbasic_vert:KT,meshbasic_frag:QT,meshlambert_vert:$T,meshlambert_frag:eA,meshmatcap_vert:tA,meshmatcap_frag:nA,meshnormal_vert:iA,meshnormal_frag:rA,meshphong_vert:sA,meshphong_frag:oA,meshphysical_vert:aA,meshphysical_frag:lA,meshtoon_vert:cA,meshtoon_frag:uA,points_vert:hA,points_frag:fA,shadow_vert:dA,shadow_frag:pA,sprite_vert:mA,sprite_frag:gA},ze={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new vt},alphaMap:{value:null},alphaMapTransform:{value:new vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new vt}},envmap:{envMap:{value:null},envMapRotation:{value:new vt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new vt},normalScale:{value:new pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new F},probesMax:{value:new F},probesResolution:{value:new F}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new vt},alphaTest:{value:0},uvTransform:{value:new vt}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new vt},alphaMap:{value:null},alphaMapTransform:{value:new vt},alphaTest:{value:0}}},Bi={basic:{uniforms:kn([ze.common,ze.specularmap,ze.envmap,ze.aomap,ze.lightmap,ze.fog]),vertexShader:Et.meshbasic_vert,fragmentShader:Et.meshbasic_frag},lambert:{uniforms:kn([ze.common,ze.specularmap,ze.envmap,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.fog,ze.lights,{emissive:{value:new Ye(0)},envMapIntensity:{value:1}}]),vertexShader:Et.meshlambert_vert,fragmentShader:Et.meshlambert_frag},phong:{uniforms:kn([ze.common,ze.specularmap,ze.envmap,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.fog,ze.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Et.meshphong_vert,fragmentShader:Et.meshphong_frag},standard:{uniforms:kn([ze.common,ze.envmap,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.roughnessmap,ze.metalnessmap,ze.fog,ze.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Et.meshphysical_vert,fragmentShader:Et.meshphysical_frag},toon:{uniforms:kn([ze.common,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.gradientmap,ze.fog,ze.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Et.meshtoon_vert,fragmentShader:Et.meshtoon_frag},matcap:{uniforms:kn([ze.common,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.fog,{matcap:{value:null}}]),vertexShader:Et.meshmatcap_vert,fragmentShader:Et.meshmatcap_frag},points:{uniforms:kn([ze.points,ze.fog]),vertexShader:Et.points_vert,fragmentShader:Et.points_frag},dashed:{uniforms:kn([ze.common,ze.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Et.linedashed_vert,fragmentShader:Et.linedashed_frag},depth:{uniforms:kn([ze.common,ze.displacementmap]),vertexShader:Et.depth_vert,fragmentShader:Et.depth_frag},normal:{uniforms:kn([ze.common,ze.bumpmap,ze.normalmap,ze.displacementmap,{opacity:{value:1}}]),vertexShader:Et.meshnormal_vert,fragmentShader:Et.meshnormal_frag},sprite:{uniforms:kn([ze.sprite,ze.fog]),vertexShader:Et.sprite_vert,fragmentShader:Et.sprite_frag},background:{uniforms:{uvTransform:{value:new vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Et.background_vert,fragmentShader:Et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new vt}},vertexShader:Et.backgroundCube_vert,fragmentShader:Et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Et.cube_vert,fragmentShader:Et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Et.equirect_vert,fragmentShader:Et.equirect_frag},distance:{uniforms:kn([ze.common,ze.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Et.distance_vert,fragmentShader:Et.distance_frag},shadow:{uniforms:kn([ze.lights,ze.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:Et.shadow_vert,fragmentShader:Et.shadow_frag}};Bi.physical={uniforms:kn([Bi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new vt},clearcoatNormalScale:{value:new pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new vt},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new vt},transmissionSamplerSize:{value:new pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new vt},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new vt},anisotropyVector:{value:new pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new vt}}]),vertexShader:Et.meshphysical_vert,fragmentShader:Et.meshphysical_frag};const pu={r:0,b:0,g:0},_A=new dt,My=new vt;My.set(-1,0,0,0,1,0,0,0,1);function vA(r,e,t,n,i,s){const o=new Ye(0);let c=i===!0?0:1,u,h,f=null,p=0,m=null;function g(M){let E=M.isScene===!0?M.background:null;if(E&&E.isTexture){const b=M.backgroundBlurriness>0;E=e.get(E,b)}return E}function x(M){let E=!1;const b=g(M);b===null?y(o,c):b&&b.isColor&&(y(b,1),E=!0);const L=r.xr.getEnvironmentBlendMode();L==="additive"?t.buffers.color.setClear(0,0,0,1,s):L==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(r.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function w(M,E){const b=g(E);b&&(b.isCubeTexture||b.mapping===Zo)?(h===void 0&&(h=new an(new Ys(1,1,1),new mi({name:"BackgroundCubeMaterial",uniforms:qo(Bi.backgroundCube.uniforms),vertexShader:Bi.backgroundCube.vertexShader,fragmentShader:Bi.backgroundCube.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,R,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),h.material.uniforms.envMap.value=b,h.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(_A.makeRotationFromEuler(E.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&h.material.uniforms.backgroundRotation.value.premultiply(My),h.material.toneMapped=At.getTransfer(b.colorSpace)!==Ht,(f!==b||p!==b.version||m!==r.toneMapping)&&(h.material.needsUpdate=!0,f=b,p=b.version,m=r.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):b&&b.isTexture&&(u===void 0&&(u=new an(new Ko(2,2),new mi({name:"BackgroundMaterial",uniforms:qo(Bi.background.uniforms),vertexShader:Bi.background.vertexShader,fragmentShader:Bi.background.fragmentShader,side:Rr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(u)),u.material.uniforms.t2D.value=b,u.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,u.material.toneMapped=At.getTransfer(b.colorSpace)!==Ht,b.matrixAutoUpdate===!0&&b.updateMatrix(),u.material.uniforms.uvTransform.value.copy(b.matrix),(f!==b||p!==b.version||m!==r.toneMapping)&&(u.material.needsUpdate=!0,f=b,p=b.version,m=r.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null))}function y(M,E){M.getRGB(pu,Gx(r)),t.buffers.color.setClear(pu.r,pu.g,pu.b,E,s)}function v(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,E=1){o.set(M),c=E,y(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,y(o,c)},render:x,addToRenderList:w,dispose:v}}function xA(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=m(null);let s=i,o=!1;function c(D,V,K,te,H){let Z=!1;const J=p(D,te,K,V);s!==J&&(s=J,h(s.object)),Z=g(D,te,K,H),Z&&x(D,te,K,H),H!==null&&e.update(H,r.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,b(D,V,K,te),H!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function u(){return r.createVertexArray()}function h(D){return r.bindVertexArray(D)}function f(D){return r.deleteVertexArray(D)}function p(D,V,K,te){const H=te.wireframe===!0;let Z=n[V.id];Z===void 0&&(Z={},n[V.id]=Z);const J=D.isInstancedMesh===!0?D.id:0;let z=Z[J];z===void 0&&(z={},Z[J]=z);let W=z[K.id];W===void 0&&(W={},z[K.id]=W);let q=W[H];return q===void 0&&(q=m(u()),W[H]=q),q}function m(D){const V=[],K=[],te=[];for(let H=0;H<t;H++)V[H]=0,K[H]=0,te[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:K,attributeDivisors:te,object:D,attributes:{},index:null}}function g(D,V,K,te){const H=s.attributes,Z=V.attributes;let J=0;const z=K.getAttributes();for(const W in z)if(z[W].location>=0){const re=H[W];let he=Z[W];if(he===void 0&&(W==="instanceMatrix"&&D.instanceMatrix&&(he=D.instanceMatrix),W==="instanceColor"&&D.instanceColor&&(he=D.instanceColor)),re===void 0||re.attribute!==he||he&&re.data!==he.data)return!0;J++}return s.attributesNum!==J||s.index!==te}function x(D,V,K,te){const H={},Z=V.attributes;let J=0;const z=K.getAttributes();for(const W in z)if(z[W].location>=0){let re=Z[W];re===void 0&&(W==="instanceMatrix"&&D.instanceMatrix&&(re=D.instanceMatrix),W==="instanceColor"&&D.instanceColor&&(re=D.instanceColor));const he={};he.attribute=re,re&&re.data&&(he.data=re.data),H[W]=he,J++}s.attributes=H,s.attributesNum=J,s.index=te}function w(){const D=s.newAttributes;for(let V=0,K=D.length;V<K;V++)D[V]=0}function y(D){v(D,0)}function v(D,V){const K=s.newAttributes,te=s.enabledAttributes,H=s.attributeDivisors;K[D]=1,te[D]===0&&(r.enableVertexAttribArray(D),te[D]=1),H[D]!==V&&(r.vertexAttribDivisor(D,V),H[D]=V)}function M(){const D=s.newAttributes,V=s.enabledAttributes;for(let K=0,te=V.length;K<te;K++)V[K]!==D[K]&&(r.disableVertexAttribArray(K),V[K]=0)}function E(D,V,K,te,H,Z,J){J===!0?r.vertexAttribIPointer(D,V,K,H,Z):r.vertexAttribPointer(D,V,K,te,H,Z)}function b(D,V,K,te){w();const H=te.attributes,Z=K.getAttributes(),J=V.defaultAttributeValues;for(const z in Z){const W=Z[z];if(W.location>=0){let q=H[z];if(q===void 0&&(z==="instanceMatrix"&&D.instanceMatrix&&(q=D.instanceMatrix),z==="instanceColor"&&D.instanceColor&&(q=D.instanceColor)),q!==void 0){const re=q.normalized,he=q.itemSize,Ie=e.get(q);if(Ie===void 0)continue;const nt=Ie.buffer,Qe=Ie.type,oe=Ie.bytesPerElement,we=Qe===r.INT||Qe===r.UNSIGNED_INT||q.gpuType===wh;if(q.isInterleavedBufferAttribute){const Se=q.data,$e=Se.stride,Ke=q.offset;if(Se.isInstancedInterleavedBuffer){for(let Te=0;Te<W.locationSize;Te++)v(W.location+Te,Se.meshPerAttribute);D.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=Se.meshPerAttribute*Se.count)}else for(let Te=0;Te<W.locationSize;Te++)y(W.location+Te);r.bindBuffer(r.ARRAY_BUFFER,nt);for(let Te=0;Te<W.locationSize;Te++)E(W.location+Te,he/W.locationSize,Qe,re,$e*oe,(Ke+he/W.locationSize*Te)*oe,we)}else{if(q.isInstancedBufferAttribute){for(let Se=0;Se<W.locationSize;Se++)v(W.location+Se,q.meshPerAttribute);D.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let Se=0;Se<W.locationSize;Se++)y(W.location+Se);r.bindBuffer(r.ARRAY_BUFFER,nt);for(let Se=0;Se<W.locationSize;Se++)E(W.location+Se,he/W.locationSize,Qe,re,he*oe,he/W.locationSize*Se*oe,we)}}else if(J!==void 0){const re=J[z];if(re!==void 0)switch(re.length){case 2:r.vertexAttrib2fv(W.location,re);break;case 3:r.vertexAttrib3fv(W.location,re);break;case 4:r.vertexAttrib4fv(W.location,re);break;default:r.vertexAttrib1fv(W.location,re)}}}}M()}function L(){P();for(const D in n){const V=n[D];for(const K in V){const te=V[K];for(const H in te){const Z=te[H];for(const J in Z)f(Z[J].object),delete Z[J];delete te[H]}}delete n[D]}}function R(D){if(n[D.id]===void 0)return;const V=n[D.id];for(const K in V){const te=V[K];for(const H in te){const Z=te[H];for(const J in Z)f(Z[J].object),delete Z[J];delete te[H]}}delete n[D.id]}function U(D){for(const V in n){const K=n[V];for(const te in K){const H=K[te];if(H[D.id]===void 0)continue;const Z=H[D.id];for(const J in Z)f(Z[J].object),delete Z[J];delete H[D.id]}}}function A(D){for(const V in n){const K=n[V],te=D.isInstancedMesh===!0?D.id:0,H=K[te];if(H!==void 0){for(const Z in H){const J=H[Z];for(const z in J)f(J[z].object),delete J[z];delete H[Z]}delete K[te],Object.keys(K).length===0&&delete n[V]}}}function P(){O(),o=!0,s!==i&&(s=i,h(s.object))}function O(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:c,reset:P,resetDefaultState:O,dispose:L,releaseStatesOfGeometry:R,releaseStatesOfObject:A,releaseStatesOfProgram:U,initAttributes:w,enableAttribute:y,disableUnusedAttributes:M}}function yA(r,e,t){let n;function i(u){n=u}function s(u,h){r.drawArrays(n,u,h),t.update(h,n,1)}function o(u,h,f){f!==0&&(r.drawArraysInstanced(n,u,h,f),t.update(h,n,f))}function c(u,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,u,0,h,0,f);let m=0;for(let g=0;g<f;g++)m+=h[g];t.update(m,n,1)}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=c}function SA(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const U=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(U.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(U){return!(U!==Nn&&n.convert(U)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(U){const A=U===ur&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(U!==Vn&&n.convert(U)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&U!==Gn&&!A)}function u(U){if(U==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";U="mediump"}return U==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=t.precision!==void 0?t.precision:"highp";const f=u(h);f!==h&&(Oe("WebGLRenderer:",h,"not supported, using",f,"instead."),h=f);const p=t.logarithmicDepthBuffer===!0,m=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&m===!1&&Oe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const g=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),x=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=r.getParameter(r.MAX_TEXTURE_SIZE),y=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),v=r.getParameter(r.MAX_VERTEX_ATTRIBS),M=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),E=r.getParameter(r.MAX_VARYING_VECTORS),b=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),L=r.getParameter(r.MAX_SAMPLES),R=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:u,textureFormatReadable:o,textureTypeReadable:c,precision:h,logarithmicDepthBuffer:p,reversedDepthBuffer:m,maxTextures:g,maxVertexTextures:x,maxTextureSize:w,maxCubemapSize:y,maxAttributes:v,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:b,maxSamples:L,samples:R}}function MA(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Jr,c=new vt,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(p,m){const g=p.length!==0||m||n!==0||i;return i=m,n=p.length,g},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(p,m){t=f(p,m,0)},this.setState=function(p,m,g){const x=p.clippingPlanes,w=p.clipIntersection,y=p.clipShadows,v=r.get(p);if(!i||x===null||x.length===0||s&&!y)s?f(null):h();else{const M=s?0:n,E=M*4;let b=v.clippingState||null;u.value=b,b=f(x,m,E,g);for(let L=0;L!==E;++L)b[L]=t[L];v.clippingState=b,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=M}};function h(){u.value!==t&&(u.value=t,u.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function f(p,m,g,x){const w=p!==null?p.length:0;let y=null;if(w!==0){if(y=u.value,x!==!0||y===null){const v=g+w*4,M=m.matrixWorldInverse;c.getNormalMatrix(M),(y===null||y.length<v)&&(y=new Float32Array(v));for(let E=0,b=g;E!==w;++E,b+=4)o.copy(p[E]).applyMatrix4(M,c),o.normal.toArray(y,b),y[b+3]=o.constant}u.value=y,u.needsUpdate=!0}return e.numPlanes=w,e.numIntersection=0,y}}const $r=4,N_=[.125,.215,.35,.446,.526,.582],Ds=20,wA=256,Da=new as,U_=new Ye;let Jd=null,jd=0,Kd=0,Qd=!1;const EA=new F;class Fp{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:c=EA}=s;Jd=this._renderer.getRenderTarget(),jd=this._renderer.getActiveCubeFace(),Kd=this._renderer.getActiveMipmapLevel(),Qd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const u=this._allocateTargets();return u.depthBuffer=!0,this._sceneToCubeUV(e,n,i,u,c),t>0&&this._blur(u,0,0,t),this._applyPMREM(u),this._cleanup(u),u}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=B_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=O_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Jd,jd,Kd),this._renderer.xr.enabled=Qd,e.scissorTest=!1,Po(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===cr||e.mapping===es?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Jd=this._renderer.getRenderTarget(),jd=this._renderer.getActiveCubeFace(),Kd=this._renderer.getActiveMipmapLevel(),Qd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Yt,minFilter:Yt,generateMipmaps:!1,type:ur,format:Nn,colorSpace:il,depthBuffer:!1},i=F_(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=F_(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=bA(s)),this._blurMaterial=AA(s,e,t),this._ggxMaterial=TA(s,e,t)}return i}_compileMaterial(e){const t=new an(new xt,e);this._renderer.compile(t,Da)}_sceneToCubeUV(e,t,n,i,s){const u=new hn(90,1,t,n),h=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],p=this._renderer,m=p.autoClear,g=p.toneMapping;p.getClearColor(U_),p.toneMapping=Ci,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(i),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new an(new Ys,new rs({name:"PMREM.Background",side:Wn,depthWrite:!1,depthTest:!1})));const w=this._backgroundBox,y=w.material;let v=!1;const M=e.background;M?M.isColor&&(y.color.copy(M),e.background=null,v=!0):(y.color.copy(U_),v=!0);for(let E=0;E<6;E++){const b=E%3;b===0?(u.up.set(0,h[E],0),u.position.set(s.x,s.y,s.z),u.lookAt(s.x+f[E],s.y,s.z)):b===1?(u.up.set(0,0,h[E]),u.position.set(s.x,s.y,s.z),u.lookAt(s.x,s.y+f[E],s.z)):(u.up.set(0,h[E],0),u.position.set(s.x,s.y,s.z),u.lookAt(s.x,s.y,s.z+f[E]));const L=this._cubeSize;Po(i,b*L,E>2?L:0,L,L),p.setRenderTarget(i),v&&p.render(w,u),p.render(e,u)}p.toneMapping=g,p.autoClear=m,e.background=M}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===cr||e.mapping===es;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=B_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=O_());const s=i?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const c=s.uniforms;c.envMap.value=e;const u=this._cubeSize;Po(t,0,0,3*u,2*u),n.setRenderTarget(t),n.render(o,Da)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,c=this._lodMeshes[n];c.material=o;const u=o.uniforms,h=n/(this._lodMeshes.length-1),f=t/(this._lodMeshes.length-1),p=Math.sqrt(h*h-f*f),m=0+h*1.25,g=p*m,{_lodMax:x}=this,w=this._sizeLods[n],y=3*w*(n>x-$r?n-x+$r:0),v=4*(this._cubeSize-w);u.envMap.value=e.texture,u.roughness.value=g,u.mipInt.value=x-t,Po(s,y,v,3*w,2*w),i.setRenderTarget(s),i.render(c,Da),u.envMap.value=s.texture,u.roughness.value=0,u.mipInt.value=x-n,Po(e,y,v,3*w,2*w),i.setRenderTarget(e),i.render(c,Da)}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,c){const u=this._renderer,h=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&rt("blur direction must be either latitudinal or longitudinal!");const f=3,p=this._lodMeshes[i];p.material=h;const m=h.uniforms,g=this._sizeLods[n]-1,x=isFinite(s)?Math.PI/(2*g):2*Math.PI/(2*Ds-1),w=s/x,y=isFinite(s)?1+Math.floor(f*w):Ds;y>Ds&&Oe(`sigmaRadians, ${s}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${Ds}`);const v=[];let M=0;for(let U=0;U<Ds;++U){const A=U/w,P=Math.exp(-A*A/2);v.push(P),U===0?M+=P:U<y&&(M+=2*P)}for(let U=0;U<v.length;U++)v[U]=v[U]/M;m.envMap.value=e.texture,m.samples.value=y,m.weights.value=v,m.latitudinal.value=o==="latitudinal",c&&(m.poleAxis.value=c);const{_lodMax:E}=this;m.dTheta.value=x,m.mipInt.value=E-n;const b=this._sizeLods[i],L=3*b*(i>E-$r?i-E+$r:0),R=4*(this._cubeSize-b);Po(t,L,R,3*b,2*b),u.setRenderTarget(t),u.render(p,Da)}}function bA(r){const e=[],t=[],n=[];let i=r;const s=r-$r+1+N_.length;for(let o=0;o<s;o++){const c=Math.pow(2,i);e.push(c);let u=1/c;o>r-$r?u=N_[o-r+$r-1]:o===0&&(u=0),t.push(u);const h=1/(c-2),f=-h,p=1+h,m=[f,f,p,f,p,p,f,f,p,p,f,p],g=6,x=6,w=3,y=2,v=1,M=new Float32Array(w*x*g),E=new Float32Array(y*x*g),b=new Float32Array(v*x*g);for(let R=0;R<g;R++){const U=R%3*2/3-1,A=R>2?0:-1,P=[U,A,0,U+2/3,A,0,U+2/3,A+1,0,U,A,0,U+2/3,A+1,0,U,A+1,0];M.set(P,w*x*R),E.set(m,y*x*R);const O=[R,R,R,R,R,R];b.set(O,v*x*R)}const L=new xt;L.setAttribute("position",new Gt(M,w)),L.setAttribute("uv",new Gt(E,y)),L.setAttribute("faceIndex",new Gt(b,v)),n.push(new an(L,null)),i>$r&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function F_(r,e,t){const n=new pi(r,e,t);return n.texture.mapping=Zo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Po(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function TA(r,e,t){return new mi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:wA,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ef(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:lr,depthTest:!1,depthWrite:!1})}function AA(r,e,t){const n=new Float32Array(Ds),i=new F(0,1,0);return new mi({name:"SphericalGaussianBlur",defines:{n:Ds,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ef(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:lr,depthTest:!1,depthWrite:!1})}function O_(){return new mi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ef(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:lr,depthTest:!1,depthWrite:!1})}function B_(){return new mi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ef(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:lr,depthTest:!1,depthWrite:!1})}function ef(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Dm extends pi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new xl(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Ys(5,5,5),s=new mi({name:"CubemapFromEquirect",uniforms:qo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Wn,blending:lr});s.uniforms.tEquirect.value=t;const o=new an(i,s),c=t.minFilter;return t.minFilter===or&&(t.minFilter=Yt),new hy(1,10,this).update(e,o),t.minFilter=c,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}function CA(r){let e=new WeakMap,t=new WeakMap,n=null;function i(m,g=!1){return m==null?null:g?o(m):s(m)}function s(m){if(m&&m.isTexture){const g=m.mapping;if(g===Va||g===Ha)if(e.has(m)){const x=e.get(m).texture;return c(x,m.mapping)}else{const x=m.image;if(x&&x.height>0){const w=new Dm(x.height);return w.fromEquirectangularTexture(r,m),e.set(m,w),m.addEventListener("dispose",h),c(w.texture,m.mapping)}else return null}}return m}function o(m){if(m&&m.isTexture){const g=m.mapping,x=g===Va||g===Ha,w=g===cr||g===es;if(x||w){let y=t.get(m);const v=y!==void 0?y.texture.pmremVersion:0;if(m.isRenderTargetTexture&&m.pmremVersion!==v)return n===null&&(n=new Fp(r)),y=x?n.fromEquirectangular(m,y):n.fromCubemap(m,y),y.texture.pmremVersion=m.pmremVersion,t.set(m,y),y.texture;if(y!==void 0)return y.texture;{const M=m.image;return x&&M&&M.height>0||w&&M&&u(M)?(n===null&&(n=new Fp(r)),y=x?n.fromEquirectangular(m):n.fromCubemap(m),y.texture.pmremVersion=m.pmremVersion,t.set(m,y),m.addEventListener("dispose",f),y.texture):null}}}return m}function c(m,g){return g===Va?m.mapping=cr:g===Ha&&(m.mapping=es),m}function u(m){let g=0;const x=6;for(let w=0;w<x;w++)m[w]!==void 0&&g++;return g===x}function h(m){const g=m.target;g.removeEventListener("dispose",h);const x=e.get(g);x!==void 0&&(e.delete(g),x.dispose())}function f(m){const g=m.target;g.removeEventListener("dispose",f);const x=t.get(g);x!==void 0&&(t.delete(g),x.dispose())}function p(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:p}}function RA(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&hh("WebGLRenderer: "+n+" extension not supported."),i}}}function PA(r,e,t,n){const i={},s=new WeakMap;function o(p){const m=p.target;m.index!==null&&e.remove(m.index);for(const x in m.attributes)e.remove(m.attributes[x]);m.removeEventListener("dispose",o),delete i[m.id];const g=s.get(m);g&&(e.remove(g),s.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,t.memory.geometries--}function c(p,m){return i[m.id]===!0||(m.addEventListener("dispose",o),i[m.id]=!0,t.memory.geometries++),m}function u(p){const m=p.attributes;for(const g in m)e.update(m[g],r.ARRAY_BUFFER)}function h(p){const m=[],g=p.index,x=p.attributes.position;let w=0;if(x===void 0)return;if(g!==null){const M=g.array;w=g.version;for(let E=0,b=M.length;E<b;E+=3){const L=M[E+0],R=M[E+1],U=M[E+2];m.push(L,R,R,U,U,L)}}else{const M=x.array;w=x.version;for(let E=0,b=M.length/3-1;E<b;E+=3){const L=E+0,R=E+1,U=E+2;m.push(L,R,R,U,U,L)}}const y=new(x.count>=65535?om:sm)(m,1);y.version=w;const v=s.get(p);v&&e.remove(v),s.set(p,y)}function f(p){const m=s.get(p);if(m){const g=p.index;g!==null&&m.version<g.version&&h(p)}else h(p);return s.get(p)}return{get:c,update:u,getWireframeAttribute:f}}function IA(r,e,t){let n;function i(p){n=p}let s,o;function c(p){s=p.type,o=p.bytesPerElement}function u(p,m){r.drawElements(n,m,s,p*o),t.update(m,n,1)}function h(p,m,g){g!==0&&(r.drawElementsInstanced(n,m,s,p*o,g),t.update(m,n,g))}function f(p,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,s,p,0,g);let w=0;for(let y=0;y<g;y++)w+=m[y];t.update(w,n,1)}this.setMode=i,this.setIndex=c,this.render=u,this.renderInstances=h,this.renderMultiDraw=f}function LA(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,c){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=c*(s/3);break;case r.LINES:t.lines+=c*(s/2);break;case r.LINE_STRIP:t.lines+=c*(s-1);break;case r.LINE_LOOP:t.lines+=c*s;break;case r.POINTS:t.points+=c*s;break;default:rt("WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function DA(r,e,t){const n=new WeakMap,i=new Rt;function s(o,c,u){const h=o.morphTargetInfluences,f=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,p=f!==void 0?f.length:0;let m=n.get(c);if(m===void 0||m.count!==p){let P=function(){U.dispose(),n.delete(c),c.removeEventListener("dispose",P)};m!==void 0&&m.texture.dispose();const g=c.morphAttributes.position!==void 0,x=c.morphAttributes.normal!==void 0,w=c.morphAttributes.color!==void 0,y=c.morphAttributes.position||[],v=c.morphAttributes.normal||[],M=c.morphAttributes.color||[];let E=0;g===!0&&(E=1),x===!0&&(E=2),w===!0&&(E=3);let b=c.attributes.position.count*E,L=1;b>e.maxTextureSize&&(L=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const R=new Float32Array(b*L*4*p),U=new Lh(R,b,L,p);U.type=Gn,U.needsUpdate=!0;const A=E*4;for(let O=0;O<p;O++){const D=y[O],V=v[O],K=M[O],te=b*L*4*O;for(let H=0;H<D.count;H++){const Z=H*A;g===!0&&(i.fromBufferAttribute(D,H),R[te+Z+0]=i.x,R[te+Z+1]=i.y,R[te+Z+2]=i.z,R[te+Z+3]=0),x===!0&&(i.fromBufferAttribute(V,H),R[te+Z+4]=i.x,R[te+Z+5]=i.y,R[te+Z+6]=i.z,R[te+Z+7]=0),w===!0&&(i.fromBufferAttribute(K,H),R[te+Z+8]=i.x,R[te+Z+9]=i.y,R[te+Z+10]=i.z,R[te+Z+11]=K.itemSize===4?i.w:1)}}m={count:p,texture:U,size:new pe(b,L)},n.set(c,m),c.addEventListener("dispose",P)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)u.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let g=0;for(let w=0;w<h.length;w++)g+=h[w];const x=c.morphTargetsRelative?1:1-g;u.getUniforms().setValue(r,"morphTargetBaseInfluence",x),u.getUniforms().setValue(r,"morphTargetInfluences",h)}u.getUniforms().setValue(r,"morphTargetsTexture",m.texture,t),u.getUniforms().setValue(r,"morphTargetsTextureSize",m.size)}return{update:s}}function NA(r,e,t,n,i){let s=new WeakMap;function o(h){const f=i.render.frame,p=h.geometry,m=e.get(h,p);if(s.get(m)!==f&&(e.update(m),s.set(m,f)),h.isInstancedMesh&&(h.hasEventListener("dispose",u)===!1&&h.addEventListener("dispose",u),s.get(h)!==f&&(t.update(h.instanceMatrix,r.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,r.ARRAY_BUFFER),s.set(h,f))),h.isSkinnedMesh){const g=h.skeleton;s.get(g)!==f&&(g.update(),s.set(g,f))}return m}function c(){s=new WeakMap}function u(h){const f=h.target;f.removeEventListener("dispose",u),n.releaseStatesOfObject(f),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:o,dispose:c}}const UA={[Gp]:"LINEAR_TONE_MAPPING",[Wp]:"REINHARD_TONE_MAPPING",[Xp]:"CINEON_TONE_MAPPING",[Sh]:"ACES_FILMIC_TONE_MAPPING",[Yp]:"AGX_TONE_MAPPING",[Zp]:"NEUTRAL_TONE_MAPPING",[qp]:"CUSTOM_TONE_MAPPING"};function FA(r,e,t,n,i){const s=new pi(e,t,{type:r,depthBuffer:n,stencilBuffer:i,depthTexture:n?new Xs(e,t):void 0}),o=new pi(e,t,{type:ur,depthBuffer:!1,stencilBuffer:!1}),c=new xt;c.setAttribute("position",new je([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new je([0,2,0,0,2,0],2));const u=new vm({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new an(c,u),f=new as(-1,1,1,-1,0,1);let p=null,m=null,g=!1,x,w=null,y=[],v=!1;this.setSize=function(M,E){s.setSize(M,E),o.setSize(M,E);for(let b=0;b<y.length;b++){const L=y[b];L.setSize&&L.setSize(M,E)}},this.setEffects=function(M){y=M,v=y.length>0&&y[0].isRenderPass===!0;const E=s.width,b=s.height;for(let L=0;L<y.length;L++){const R=y[L];R.setSize&&R.setSize(E,b)}},this.begin=function(M,E){if(g||M.toneMapping===Ci&&y.length===0)return!1;if(w=E,E!==null){const b=E.width,L=E.height;(s.width!==b||s.height!==L)&&this.setSize(b,L)}return v===!1&&M.setRenderTarget(s),x=M.toneMapping,M.toneMapping=Ci,!0},this.hasRenderPass=function(){return v},this.end=function(M,E){M.toneMapping=x,g=!0;let b=s,L=o;for(let R=0;R<y.length;R++){const U=y[R];if(U.enabled!==!1&&(U.render(M,L,b,E),U.needsSwap!==!1)){const A=b;b=L,L=A}}if(p!==M.outputColorSpace||m!==M.toneMapping){p=M.outputColorSpace,m=M.toneMapping,u.defines={},At.getTransfer(p)===Ht&&(u.defines.SRGB_TRANSFER="");const R=UA[m];R&&(u.defines[R]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=b.texture,M.setRenderTarget(w),M.render(h,f),w=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),o.dispose(),c.dispose(),u.dispose()}}const wy=new jt,Op=new Xs(1,1),Ey=new Lh,by=new Dh,Ty=new xl,z_=[],k_=[],V_=new Float32Array(16),H_=new Float32Array(9),G_=new Float32Array(4);function $o(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=z_[i];if(s===void 0&&(s=new Float32Array(i),z_[i]=s),e!==0){n.toArray(s,0);for(let o=1,c=0;o!==e;++o)c+=t,r[o].toArray(s,c)}return s}function gn(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function _n(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function tf(r,e){let t=k_[e];t===void 0&&(t=new Int32Array(e),k_[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function OA(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function BA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gn(t,e))return;r.uniform2fv(this.addr,e),_n(t,e)}}function zA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(gn(t,e))return;r.uniform3fv(this.addr,e),_n(t,e)}}function kA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gn(t,e))return;r.uniform4fv(this.addr,e),_n(t,e)}}function VA(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(gn(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),_n(t,e)}else{if(gn(t,n))return;G_.set(n),r.uniformMatrix2fv(this.addr,!1,G_),_n(t,n)}}function HA(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(gn(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),_n(t,e)}else{if(gn(t,n))return;H_.set(n),r.uniformMatrix3fv(this.addr,!1,H_),_n(t,n)}}function GA(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(gn(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),_n(t,e)}else{if(gn(t,n))return;V_.set(n),r.uniformMatrix4fv(this.addr,!1,V_),_n(t,n)}}function WA(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function XA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gn(t,e))return;r.uniform2iv(this.addr,e),_n(t,e)}}function qA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gn(t,e))return;r.uniform3iv(this.addr,e),_n(t,e)}}function YA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gn(t,e))return;r.uniform4iv(this.addr,e),_n(t,e)}}function ZA(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function JA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gn(t,e))return;r.uniform2uiv(this.addr,e),_n(t,e)}}function jA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gn(t,e))return;r.uniform3uiv(this.addr,e),_n(t,e)}}function KA(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gn(t,e))return;r.uniform4uiv(this.addr,e),_n(t,e)}}function QA(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Op.compareFunction=t.isReversedDepthBuffer()?Ih:Ph,s=Op):s=wy,t.setTexture2D(e||s,i)}function $A(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||by,i)}function eC(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Ty,i)}function tC(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Ey,i)}function nC(r){switch(r){case 5126:return OA;case 35664:return BA;case 35665:return zA;case 35666:return kA;case 35674:return VA;case 35675:return HA;case 35676:return GA;case 5124:case 35670:return WA;case 35667:case 35671:return XA;case 35668:case 35672:return qA;case 35669:case 35673:return YA;case 5125:return ZA;case 36294:return JA;case 36295:return jA;case 36296:return KA;case 35678:case 36198:case 36298:case 36306:case 35682:return QA;case 35679:case 36299:case 36307:return $A;case 35680:case 36300:case 36308:case 36293:return eC;case 36289:case 36303:case 36311:case 36292:return tC}}function iC(r,e){r.uniform1fv(this.addr,e)}function rC(r,e){const t=$o(e,this.size,2);r.uniform2fv(this.addr,t)}function sC(r,e){const t=$o(e,this.size,3);r.uniform3fv(this.addr,t)}function oC(r,e){const t=$o(e,this.size,4);r.uniform4fv(this.addr,t)}function aC(r,e){const t=$o(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function lC(r,e){const t=$o(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function cC(r,e){const t=$o(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function uC(r,e){r.uniform1iv(this.addr,e)}function hC(r,e){r.uniform2iv(this.addr,e)}function fC(r,e){r.uniform3iv(this.addr,e)}function dC(r,e){r.uniform4iv(this.addr,e)}function pC(r,e){r.uniform1uiv(this.addr,e)}function mC(r,e){r.uniform2uiv(this.addr,e)}function gC(r,e){r.uniform3uiv(this.addr,e)}function _C(r,e){r.uniform4uiv(this.addr,e)}function vC(r,e,t){const n=this.cache,i=e.length,s=tf(t,i);gn(n,s)||(r.uniform1iv(this.addr,s),_n(n,s));let o;this.type===r.SAMPLER_2D_SHADOW?o=Op:o=wy;for(let c=0;c!==i;++c)t.setTexture2D(e[c]||o,s[c])}function xC(r,e,t){const n=this.cache,i=e.length,s=tf(t,i);gn(n,s)||(r.uniform1iv(this.addr,s),_n(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||by,s[o])}function yC(r,e,t){const n=this.cache,i=e.length,s=tf(t,i);gn(n,s)||(r.uniform1iv(this.addr,s),_n(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Ty,s[o])}function SC(r,e,t){const n=this.cache,i=e.length,s=tf(t,i);gn(n,s)||(r.uniform1iv(this.addr,s),_n(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Ey,s[o])}function MC(r){switch(r){case 5126:return iC;case 35664:return rC;case 35665:return sC;case 35666:return oC;case 35674:return aC;case 35675:return lC;case 35676:return cC;case 5124:case 35670:return uC;case 35667:case 35671:return hC;case 35668:case 35672:return fC;case 35669:case 35673:return dC;case 5125:return pC;case 36294:return mC;case 36295:return gC;case 36296:return _C;case 35678:case 36198:case 36298:case 36306:case 35682:return vC;case 35679:case 36299:case 36307:return xC;case 35680:case 36300:case 36308:case 36293:return yC;case 36289:case 36303:case 36311:case 36292:return SC}}class wC{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=nC(t.type)}}class EC{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=MC(t.type)}}class bC{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const c=i[s];c.setValue(e,t[c.id],n)}}}const $d=/(\w+)(\])?(\[|\.)?/g;function W_(r,e){r.seq.push(e),r.map[e.id]=e}function TC(r,e,t){const n=r.name,i=n.length;for($d.lastIndex=0;;){const s=$d.exec(n),o=$d.lastIndex;let c=s[1];const u=s[2]==="]",h=s[3];if(u&&(c=c|0),h===void 0||h==="["&&o+2===i){W_(t,h===void 0?new wC(c,r,e):new EC(c,r,e));break}else{let p=t.map[c];p===void 0&&(p=new bC(c),W_(t,p)),t=p}}}class wu{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const c=e.getActiveUniform(t,o),u=e.getUniformLocation(t,c.name);TC(c,u,this)}const i=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(o):s.push(o);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const c=t[s],u=n[c.id];u.needsUpdate!==!1&&c.setValue(e,u.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function X_(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const AC=37297;let CC=0;function RC(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const c=o+1;n.push(`${c===e?">":" "} ${c}: ${t[o]}`)}return n.join(`
`)}const q_=new vt;function PC(r){At._getMatrix(q_,At.workingColorSpace,r);const e=`mat3( ${q_.elements.map(t=>t.toFixed(4))} )`;switch(At.getTransfer(r)){case rl:return[e,"LinearTransferOETF"];case Ht:return[e,"sRGBTransferOETF"];default:return Oe("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Y_(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const c=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+RC(r.getShaderSource(e),c)}else return s}function IC(r,e){const t=PC(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const LC={[Gp]:"Linear",[Wp]:"Reinhard",[Xp]:"Cineon",[Sh]:"ACESFilmic",[Yp]:"AgX",[Zp]:"Neutral",[qp]:"Custom"};function DC(r,e){const t=LC[e];return t===void 0?(Oe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const mu=new F;function NC(){At.getLuminanceCoefficients(mu);const r=mu.x.toFixed(4),e=mu.y.toFixed(4),t=mu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function UC(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(za).join(`
`)}function FC(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function OC(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let c=1;s.type===r.FLOAT_MAT2&&(c=2),s.type===r.FLOAT_MAT3&&(c=3),s.type===r.FLOAT_MAT4&&(c=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:c}}return t}function za(r){return r!==""}function Z_(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function J_(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const BC=/^[ \t]*#include +<([\w\d./]+)>/gm;function Bp(r){return r.replace(BC,kC)}const zC=new Map;function kC(r,e){let t=Et[e];if(t===void 0){const n=zC.get(e);if(n!==void 0)t=Et[n],Oe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Bp(t)}const VC=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function j_(r){return r.replace(VC,HC)}function HC(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function K_(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const GC={[zo]:"SHADOWMAP_TYPE_PCF",[Ns]:"SHADOWMAP_TYPE_VSM"};function WC(r){return GC[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const XC={[cr]:"ENVMAP_TYPE_CUBE",[es]:"ENVMAP_TYPE_CUBE",[Zo]:"ENVMAP_TYPE_CUBE_UV"};function qC(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":XC[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const YC={[es]:"ENVMAP_MODE_REFRACTION"};function ZC(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":YC[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const JC={[_l]:"ENVMAP_BLENDING_MULTIPLY",[nx]:"ENVMAP_BLENDING_MIX",[ix]:"ENVMAP_BLENDING_ADD"};function jC(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":JC[r.combine]||"ENVMAP_BLENDING_NONE"}function KC(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function QC(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,c=t.fragmentShader;const u=WC(t),h=qC(t),f=ZC(t),p=jC(t),m=KC(t),g=UC(t),x=FC(s),w=i.createProgram();let y,v,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(za).join(`
`),y.length>0&&(y+=`
`),v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(za).join(`
`),v.length>0&&(v+=`
`)):(y=[K_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(za).join(`
`),v=[K_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",t.envMap?"#define "+p:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ci?"#define TONE_MAPPING":"",t.toneMapping!==Ci?Et.tonemapping_pars_fragment:"",t.toneMapping!==Ci?DC("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Et.colorspace_pars_fragment,IC("linearToOutputTexel",t.outputColorSpace),NC(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(za).join(`
`)),o=Bp(o),o=Z_(o,t),o=J_(o,t),c=Bp(c),c=Z_(c,t),c=J_(c,t),o=j_(o),c=j_(c),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,y=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,v=["#define varying in",t.glslVersion===Ap?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ap?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const E=M+y+o,b=M+v+c,L=X_(i,i.VERTEX_SHADER,E),R=X_(i,i.FRAGMENT_SHADER,b);i.attachShader(w,L),i.attachShader(w,R),t.index0AttributeName!==void 0?i.bindAttribLocation(w,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(w,0,"position"),i.linkProgram(w);function U(D){if(r.debug.checkShaderErrors){const V=i.getProgramInfoLog(w)||"",K=i.getShaderInfoLog(L)||"",te=i.getShaderInfoLog(R)||"",H=V.trim(),Z=K.trim(),J=te.trim();let z=!0,W=!0;if(i.getProgramParameter(w,i.LINK_STATUS)===!1)if(z=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,w,L,R);else{const q=Y_(i,L,"vertex"),re=Y_(i,R,"fragment");rt("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(w,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+H+`
`+q+`
`+re)}else H!==""?Oe("WebGLProgram: Program Info Log:",H):(Z===""||J==="")&&(W=!1);W&&(D.diagnostics={runnable:z,programLog:H,vertexShader:{log:Z,prefix:y},fragmentShader:{log:J,prefix:v}})}i.deleteShader(L),i.deleteShader(R),A=new wu(i,w),P=OC(i,w)}let A;this.getUniforms=function(){return A===void 0&&U(this),A};let P;this.getAttributes=function(){return P===void 0&&U(this),P};let O=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=i.getProgramParameter(w,AC)),O},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(w),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=CC++,this.cacheKey=e,this.usedTimes=1,this.program=w,this.vertexShader=L,this.fragmentShader=R,this}let $C=0;class eR{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new tR(e),t.set(e,n)),n}}class tR{constructor(e){this.id=$C++,this.code=e,this.usedTimes=0}}function nR(r){return r===ts||r===$a||r===el}function iR(r,e,t,n,i,s){const o=new ks,c=new eR,u=new Set,h=[],f=new Map,p=n.logarithmicDepthBuffer;let m=n.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(A){return u.add(A),A===0?"uv":`uv${A}`}function w(A,P,O,D,V,K){const te=D.fog,H=V.geometry,Z=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?D.environment:null,J=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap,z=e.get(A.envMap||Z,J),W=z&&z.mapping===Zo?z.image.height:null,q=g[A.type];A.precision!==null&&(m=n.getMaxPrecision(A.precision),m!==A.precision&&Oe("WebGLProgram.getParameters:",A.precision,"not supported, using",m,"instead."));const re=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,he=re!==void 0?re.length:0;let Ie=0;H.morphAttributes.position!==void 0&&(Ie=1),H.morphAttributes.normal!==void 0&&(Ie=2),H.morphAttributes.color!==void 0&&(Ie=3);let nt,Qe,oe,we;if(q){const _t=Bi[q];nt=_t.vertexShader,Qe=_t.fragmentShader}else nt=A.vertexShader,Qe=A.fragmentShader,c.update(A),oe=c.getVertexShaderID(A),we=c.getFragmentShaderID(A);const Se=r.getRenderTarget(),$e=r.state.buffers.depth.getReversed(),Ke=V.isInstancedMesh===!0,Te=V.isBatchedMesh===!0,pt=!!A.map,Ze=!!A.matcap,de=!!z,xe=!!A.aoMap,me=!!A.lightMap,Ue=!!A.bumpMap,De=!!A.normalMap,at=!!A.displacementMap,k=!!A.emissiveMap,ft=!!A.metalnessMap,tt=!!A.roughnessMap,ct=A.anisotropy>0,ye=A.clearcoat>0,Pt=A.dispersion>0,N=A.iridescence>0,C=A.sheen>0,Q=A.transmission>0,ue=ct&&!!A.anisotropyMap,ge=ye&&!!A.clearcoatMap,Ee=ye&&!!A.clearcoatNormalMap,Pe=ye&&!!A.clearcoatRoughnessMap,ae=N&&!!A.iridescenceMap,fe=N&&!!A.iridescenceThicknessMap,Ve=C&&!!A.sheenColorMap,Je=C&&!!A.sheenRoughnessMap,Le=!!A.specularMap,Ce=!!A.specularColorMap,mt=!!A.specularIntensityMap,yt=Q&&!!A.transmissionMap,It=Q&&!!A.thicknessMap,G=!!A.gradientMap,Re=!!A.alphaMap,ce=A.alphaTest>0,Ge=!!A.alphaHash,Ne=!!A.extensions;let _e=Ci;A.toneMapped&&(Se===null||Se.isXRRenderTarget===!0)&&(_e=r.toneMapping);const it={shaderID:q,shaderType:A.type,shaderName:A.name,vertexShader:nt,fragmentShader:Qe,defines:A.defines,customVertexShaderID:oe,customFragmentShaderID:we,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:m,batching:Te,batchingColor:Te&&V._colorsTexture!==null,instancing:Ke,instancingColor:Ke&&V.instanceColor!==null,instancingMorph:Ke&&V.morphTexture!==null,outputColorSpace:Se===null?r.outputColorSpace:Se.isXRRenderTarget===!0?Se.texture.colorSpace:At.workingColorSpace,alphaToCoverage:!!A.alphaToCoverage,map:pt,matcap:Ze,envMap:de,envMapMode:de&&z.mapping,envMapCubeUVHeight:W,aoMap:xe,lightMap:me,bumpMap:Ue,normalMap:De,displacementMap:at,emissiveMap:k,normalMapObjectSpace:De&&A.normalMapType===cx,normalMapTangentSpace:De&&A.normalMapType===Pr,packedNormalMap:De&&A.normalMapType===Pr&&nR(A.normalMap.format),metalnessMap:ft,roughnessMap:tt,anisotropy:ct,anisotropyMap:ue,clearcoat:ye,clearcoatMap:ge,clearcoatNormalMap:Ee,clearcoatRoughnessMap:Pe,dispersion:Pt,iridescence:N,iridescenceMap:ae,iridescenceThicknessMap:fe,sheen:C,sheenColorMap:Ve,sheenRoughnessMap:Je,specularMap:Le,specularColorMap:Ce,specularIntensityMap:mt,transmission:Q,transmissionMap:yt,thicknessMap:It,gradientMap:G,opaque:A.transparent===!1&&A.blending===Bs&&A.alphaToCoverage===!1,alphaMap:Re,alphaTest:ce,alphaHash:Ge,combine:A.combine,mapUv:pt&&x(A.map.channel),aoMapUv:xe&&x(A.aoMap.channel),lightMapUv:me&&x(A.lightMap.channel),bumpMapUv:Ue&&x(A.bumpMap.channel),normalMapUv:De&&x(A.normalMap.channel),displacementMapUv:at&&x(A.displacementMap.channel),emissiveMapUv:k&&x(A.emissiveMap.channel),metalnessMapUv:ft&&x(A.metalnessMap.channel),roughnessMapUv:tt&&x(A.roughnessMap.channel),anisotropyMapUv:ue&&x(A.anisotropyMap.channel),clearcoatMapUv:ge&&x(A.clearcoatMap.channel),clearcoatNormalMapUv:Ee&&x(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pe&&x(A.clearcoatRoughnessMap.channel),iridescenceMapUv:ae&&x(A.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&x(A.iridescenceThicknessMap.channel),sheenColorMapUv:Ve&&x(A.sheenColorMap.channel),sheenRoughnessMapUv:Je&&x(A.sheenRoughnessMap.channel),specularMapUv:Le&&x(A.specularMap.channel),specularColorMapUv:Ce&&x(A.specularColorMap.channel),specularIntensityMapUv:mt&&x(A.specularIntensityMap.channel),transmissionMapUv:yt&&x(A.transmissionMap.channel),thicknessMapUv:It&&x(A.thicknessMap.channel),alphaMapUv:Re&&x(A.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(De||ct),vertexNormals:!!H.attributes.normal,vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!H.attributes.uv&&(pt||Re),fog:!!te,useFog:A.fog===!0,fogExp2:!!te&&te.isFogExp2,flatShading:A.wireframe===!1&&(A.flatShading===!0||H.attributes.normal===void 0&&De===!1&&(A.isMeshLambertMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isMeshPhysicalMaterial)),sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:$e,skinning:V.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:he,morphTextureStride:Ie,numDirLights:P.directional.length,numPointLights:P.point.length,numSpotLights:P.spot.length,numSpotLightMaps:P.spotLightMap.length,numRectAreaLights:P.rectArea.length,numHemiLights:P.hemi.length,numDirLightShadows:P.directionalShadowMap.length,numPointLightShadows:P.pointShadowMap.length,numSpotLightShadows:P.spotShadowMap.length,numSpotLightShadowsWithMaps:P.numSpotLightShadowsWithMaps,numLightProbes:P.numLightProbes,numLightProbeGrids:K.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:A.dithering,shadowMapEnabled:r.shadowMap.enabled&&O.length>0,shadowMapType:r.shadowMap.type,toneMapping:_e,decodeVideoTexture:pt&&A.map.isVideoTexture===!0&&At.getTransfer(A.map.colorSpace)===Ht,decodeVideoTextureEmissive:k&&A.emissiveMap.isVideoTexture===!0&&At.getTransfer(A.emissiveMap.colorSpace)===Ht,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===zi,flipSided:A.side===Wn,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:Ne&&A.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ne&&A.extensions.multiDraw===!0||Te)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return it.vertexUv1s=u.has(1),it.vertexUv2s=u.has(2),it.vertexUv3s=u.has(3),u.clear(),it}function y(A){const P=[];if(A.shaderID?P.push(A.shaderID):(P.push(A.customVertexShaderID),P.push(A.customFragmentShaderID)),A.defines!==void 0)for(const O in A.defines)P.push(O),P.push(A.defines[O]);return A.isRawShaderMaterial===!1&&(v(P,A),M(P,A),P.push(r.outputColorSpace)),P.push(A.customProgramCacheKey),P.join()}function v(A,P){A.push(P.precision),A.push(P.outputColorSpace),A.push(P.envMapMode),A.push(P.envMapCubeUVHeight),A.push(P.mapUv),A.push(P.alphaMapUv),A.push(P.lightMapUv),A.push(P.aoMapUv),A.push(P.bumpMapUv),A.push(P.normalMapUv),A.push(P.displacementMapUv),A.push(P.emissiveMapUv),A.push(P.metalnessMapUv),A.push(P.roughnessMapUv),A.push(P.anisotropyMapUv),A.push(P.clearcoatMapUv),A.push(P.clearcoatNormalMapUv),A.push(P.clearcoatRoughnessMapUv),A.push(P.iridescenceMapUv),A.push(P.iridescenceThicknessMapUv),A.push(P.sheenColorMapUv),A.push(P.sheenRoughnessMapUv),A.push(P.specularMapUv),A.push(P.specularColorMapUv),A.push(P.specularIntensityMapUv),A.push(P.transmissionMapUv),A.push(P.thicknessMapUv),A.push(P.combine),A.push(P.fogExp2),A.push(P.sizeAttenuation),A.push(P.morphTargetsCount),A.push(P.morphAttributeCount),A.push(P.numDirLights),A.push(P.numPointLights),A.push(P.numSpotLights),A.push(P.numSpotLightMaps),A.push(P.numHemiLights),A.push(P.numRectAreaLights),A.push(P.numDirLightShadows),A.push(P.numPointLightShadows),A.push(P.numSpotLightShadows),A.push(P.numSpotLightShadowsWithMaps),A.push(P.numLightProbes),A.push(P.shadowMapType),A.push(P.toneMapping),A.push(P.numClippingPlanes),A.push(P.numClipIntersection),A.push(P.depthPacking)}function M(A,P){o.disableAll(),P.instancing&&o.enable(0),P.instancingColor&&o.enable(1),P.instancingMorph&&o.enable(2),P.matcap&&o.enable(3),P.envMap&&o.enable(4),P.normalMapObjectSpace&&o.enable(5),P.normalMapTangentSpace&&o.enable(6),P.clearcoat&&o.enable(7),P.iridescence&&o.enable(8),P.alphaTest&&o.enable(9),P.vertexColors&&o.enable(10),P.vertexAlphas&&o.enable(11),P.vertexUv1s&&o.enable(12),P.vertexUv2s&&o.enable(13),P.vertexUv3s&&o.enable(14),P.vertexTangents&&o.enable(15),P.anisotropy&&o.enable(16),P.alphaHash&&o.enable(17),P.batching&&o.enable(18),P.dispersion&&o.enable(19),P.batchingColor&&o.enable(20),P.gradientMap&&o.enable(21),P.packedNormalMap&&o.enable(22),P.vertexNormals&&o.enable(23),A.push(o.mask),o.disableAll(),P.fog&&o.enable(0),P.useFog&&o.enable(1),P.flatShading&&o.enable(2),P.logarithmicDepthBuffer&&o.enable(3),P.reversedDepthBuffer&&o.enable(4),P.skinning&&o.enable(5),P.morphTargets&&o.enable(6),P.morphNormals&&o.enable(7),P.morphColors&&o.enable(8),P.premultipliedAlpha&&o.enable(9),P.shadowMapEnabled&&o.enable(10),P.doubleSided&&o.enable(11),P.flipSided&&o.enable(12),P.useDepthPacking&&o.enable(13),P.dithering&&o.enable(14),P.transmission&&o.enable(15),P.sheen&&o.enable(16),P.opaque&&o.enable(17),P.pointsUvs&&o.enable(18),P.decodeVideoTexture&&o.enable(19),P.decodeVideoTextureEmissive&&o.enable(20),P.alphaToCoverage&&o.enable(21),P.numLightProbeGrids>0&&o.enable(22),A.push(o.mask)}function E(A){const P=g[A.type];let O;if(P){const D=Bi[P];O=_h.clone(D.uniforms)}else O=A.uniforms;return O}function b(A,P){let O=f.get(P);return O!==void 0?++O.usedTimes:(O=new QC(r,P,A,i),h.push(O),f.set(P,O)),O}function L(A){if(--A.usedTimes===0){const P=h.indexOf(A);h[P]=h[h.length-1],h.pop(),f.delete(A.cacheKey),A.destroy()}}function R(A){c.remove(A)}function U(){c.dispose()}return{getParameters:w,getProgramCacheKey:y,getUniforms:E,acquireProgram:b,releaseProgram:L,releaseShaderCache:R,programs:h,dispose:U}}function rR(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let c=r.get(o);return c===void 0&&(c={},r.set(o,c)),c}function n(o){r.delete(o)}function i(o,c,u){r.get(o)[c]=u}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function sR(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function Q_(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function $_(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(m){let g=0;return m.isInstancedMesh&&(g+=2),m.isSkinnedMesh&&(g+=1),g}function c(m,g,x,w,y,v){let M=r[e];return M===void 0?(M={id:m.id,object:m,geometry:g,material:x,materialVariant:o(m),groupOrder:w,renderOrder:m.renderOrder,z:y,group:v},r[e]=M):(M.id=m.id,M.object=m,M.geometry=g,M.material=x,M.materialVariant=o(m),M.groupOrder=w,M.renderOrder=m.renderOrder,M.z=y,M.group=v),e++,M}function u(m,g,x,w,y,v){const M=c(m,g,x,w,y,v);x.transmission>0?n.push(M):x.transparent===!0?i.push(M):t.push(M)}function h(m,g,x,w,y,v){const M=c(m,g,x,w,y,v);x.transmission>0?n.unshift(M):x.transparent===!0?i.unshift(M):t.unshift(M)}function f(m,g){t.length>1&&t.sort(m||sR),n.length>1&&n.sort(g||Q_),i.length>1&&i.sort(g||Q_)}function p(){for(let m=e,g=r.length;m<g;m++){const x=r[m];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:u,unshift:h,finish:p,sort:f}}function oR(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new $_,r.set(n,[o])):i>=s.length?(o=new $_,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function aR(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new Ye};break;case"SpotLight":t={position:new F,direction:new F,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new F,halfWidth:new F,halfHeight:new F};break}return r[e.id]=t,t}}}function lR(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let cR=0;function uR(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function hR(r){const e=new aR,t=lR(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new F);const i=new F,s=new dt,o=new dt;function c(h){let f=0,p=0,m=0;for(let P=0;P<9;P++)n.probe[P].set(0,0,0);let g=0,x=0,w=0,y=0,v=0,M=0,E=0,b=0,L=0,R=0,U=0;h.sort(uR);for(let P=0,O=h.length;P<O;P++){const D=h[P],V=D.color,K=D.intensity,te=D.distance;let H=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===ts?H=D.shadow.map.texture:H=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)f+=V.r*K,p+=V.g*K,m+=V.b*K;else if(D.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(D.sh.coefficients[Z],K);U++}else if(D.isDirectionalLight){const Z=e.get(D);if(Z.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const J=D.shadow,z=t.get(D);z.shadowIntensity=J.intensity,z.shadowBias=J.bias,z.shadowNormalBias=J.normalBias,z.shadowRadius=J.radius,z.shadowMapSize=J.mapSize,n.directionalShadow[g]=z,n.directionalShadowMap[g]=H,n.directionalShadowMatrix[g]=D.shadow.matrix,M++}n.directional[g]=Z,g++}else if(D.isSpotLight){const Z=e.get(D);Z.position.setFromMatrixPosition(D.matrixWorld),Z.color.copy(V).multiplyScalar(K),Z.distance=te,Z.coneCos=Math.cos(D.angle),Z.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Z.decay=D.decay,n.spot[w]=Z;const J=D.shadow;if(D.map&&(n.spotLightMap[L]=D.map,L++,J.updateMatrices(D),D.castShadow&&R++),n.spotLightMatrix[w]=J.matrix,D.castShadow){const z=t.get(D);z.shadowIntensity=J.intensity,z.shadowBias=J.bias,z.shadowNormalBias=J.normalBias,z.shadowRadius=J.radius,z.shadowMapSize=J.mapSize,n.spotShadow[w]=z,n.spotShadowMap[w]=H,b++}w++}else if(D.isRectAreaLight){const Z=e.get(D);Z.color.copy(V).multiplyScalar(K),Z.halfWidth.set(D.width*.5,0,0),Z.halfHeight.set(0,D.height*.5,0),n.rectArea[y]=Z,y++}else if(D.isPointLight){const Z=e.get(D);if(Z.color.copy(D.color).multiplyScalar(D.intensity),Z.distance=D.distance,Z.decay=D.decay,D.castShadow){const J=D.shadow,z=t.get(D);z.shadowIntensity=J.intensity,z.shadowBias=J.bias,z.shadowNormalBias=J.normalBias,z.shadowRadius=J.radius,z.shadowMapSize=J.mapSize,z.shadowCameraNear=J.camera.near,z.shadowCameraFar=J.camera.far,n.pointShadow[x]=z,n.pointShadowMap[x]=H,n.pointShadowMatrix[x]=D.shadow.matrix,E++}n.point[x]=Z,x++}else if(D.isHemisphereLight){const Z=e.get(D);Z.skyColor.copy(D.color).multiplyScalar(K),Z.groundColor.copy(D.groundColor).multiplyScalar(K),n.hemi[v]=Z,v++}}y>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ze.LTC_FLOAT_1,n.rectAreaLTC2=ze.LTC_FLOAT_2):(n.rectAreaLTC1=ze.LTC_HALF_1,n.rectAreaLTC2=ze.LTC_HALF_2)),n.ambient[0]=f,n.ambient[1]=p,n.ambient[2]=m;const A=n.hash;(A.directionalLength!==g||A.pointLength!==x||A.spotLength!==w||A.rectAreaLength!==y||A.hemiLength!==v||A.numDirectionalShadows!==M||A.numPointShadows!==E||A.numSpotShadows!==b||A.numSpotMaps!==L||A.numLightProbes!==U)&&(n.directional.length=g,n.spot.length=w,n.rectArea.length=y,n.point.length=x,n.hemi.length=v,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=b+L-R,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=U,A.directionalLength=g,A.pointLength=x,A.spotLength=w,A.rectAreaLength=y,A.hemiLength=v,A.numDirectionalShadows=M,A.numPointShadows=E,A.numSpotShadows=b,A.numSpotMaps=L,A.numLightProbes=U,n.version=cR++)}function u(h,f){let p=0,m=0,g=0,x=0,w=0;const y=f.matrixWorldInverse;for(let v=0,M=h.length;v<M;v++){const E=h[v];if(E.isDirectionalLight){const b=n.directional[p];b.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(y),p++}else if(E.isSpotLight){const b=n.spot[g];b.position.setFromMatrixPosition(E.matrixWorld),b.position.applyMatrix4(y),b.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(y),g++}else if(E.isRectAreaLight){const b=n.rectArea[x];b.position.setFromMatrixPosition(E.matrixWorld),b.position.applyMatrix4(y),o.identity(),s.copy(E.matrixWorld),s.premultiply(y),o.extractRotation(s),b.halfWidth.set(E.width*.5,0,0),b.halfHeight.set(0,E.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),x++}else if(E.isPointLight){const b=n.point[m];b.position.setFromMatrixPosition(E.matrixWorld),b.position.applyMatrix4(y),m++}else if(E.isHemisphereLight){const b=n.hemi[w];b.direction.setFromMatrixPosition(E.matrixWorld),b.direction.transformDirection(y),w++}}}return{setup:c,setupView:u,state:n}}function ev(r){const e=new hR(r),t=[],n=[],i=[];function s(m){p.camera=m,t.length=0,n.length=0,i.length=0}function o(m){t.push(m)}function c(m){n.push(m)}function u(m){i.push(m)}function h(){e.setup(t)}function f(m){e.setupView(t,m)}const p={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:p,setupLights:h,setupLightsView:f,pushLight:o,pushShadow:c,pushLightProbeGrid:u}}function fR(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let c;return o===void 0?(c=new ev(r),e.set(i,[c])):s>=o.length?(c=new ev(r),o.push(c)):c=o[s],c}function n(){e=new WeakMap}return{get:t,dispose:n}}const dR=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pR=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,mR=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],gR=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],tv=new dt,Na=new F,ep=new F;function _R(r,e,t){let n=new jo;const i=new pe,s=new pe,o=new Rt,c=new ym,u=new Sm,h={},f=t.maxTextureSize,p={[Rr]:Wn,[Wn]:Rr,[zi]:zi},m=new mi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new pe},radius:{value:4}},vertexShader:dR,fragmentShader:pR}),g=m.clone();g.defines.HORIZONTAL_PASS=1;const x=new xt;x.setAttribute("position",new Gt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new an(x,m),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zo;let v=this.type;this.render=function(R,U,A){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||R.length===0)return;this.type===ka&&(Oe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=zo);const P=r.getRenderTarget(),O=r.getActiveCubeFace(),D=r.getActiveMipmapLevel(),V=r.state;V.setBlending(lr),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const K=v!==this.type;K&&U.traverse(function(te){te.material&&(Array.isArray(te.material)?te.material.forEach(H=>H.needsUpdate=!0):te.material.needsUpdate=!0)});for(let te=0,H=R.length;te<H;te++){const Z=R[te],J=Z.shadow;if(J===void 0){Oe("WebGLShadowMap:",Z,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;i.copy(J.mapSize);const z=J.getFrameExtents();i.multiply(z),s.copy(J.mapSize),(i.x>f||i.y>f)&&(i.x>f&&(s.x=Math.floor(f/z.x),i.x=s.x*z.x,J.mapSize.x=s.x),i.y>f&&(s.y=Math.floor(f/z.y),i.y=s.y*z.y,J.mapSize.y=s.y));const W=r.state.buffers.depth.getReversed();if(J.camera._reversedDepth=W,J.map===null||K===!0){if(J.map!==null&&(J.map.depthTexture!==null&&(J.map.depthTexture.dispose(),J.map.depthTexture=null),J.map.dispose()),this.type===Ns){if(Z.isPointLight){Oe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}J.map=new pi(i.x,i.y,{format:ts,type:ur,minFilter:Yt,magFilter:Yt,generateMipmaps:!1}),J.map.texture.name=Z.name+".shadowMap",J.map.depthTexture=new Xs(i.x,i.y,Gn),J.map.depthTexture.name=Z.name+".shadowMapDepth",J.map.depthTexture.format=hr,J.map.depthTexture.compareFunction=null,J.map.depthTexture.minFilter=on,J.map.depthTexture.magFilter=on}else Z.isPointLight?(J.map=new Dm(i.x),J.map.depthTexture=new Ix(i.x,Ri)):(J.map=new pi(i.x,i.y),J.map.depthTexture=new Xs(i.x,i.y,Ri)),J.map.depthTexture.name=Z.name+".shadowMap",J.map.depthTexture.format=hr,this.type===zo?(J.map.depthTexture.compareFunction=W?Ih:Ph,J.map.depthTexture.minFilter=Yt,J.map.depthTexture.magFilter=Yt):(J.map.depthTexture.compareFunction=null,J.map.depthTexture.minFilter=on,J.map.depthTexture.magFilter=on);J.camera.updateProjectionMatrix()}const q=J.map.isWebGLCubeRenderTarget?6:1;for(let re=0;re<q;re++){if(J.map.isWebGLCubeRenderTarget)r.setRenderTarget(J.map,re),r.clear();else{re===0&&(r.setRenderTarget(J.map),r.clear());const he=J.getViewport(re);o.set(s.x*he.x,s.y*he.y,s.x*he.z,s.y*he.w),V.viewport(o)}if(Z.isPointLight){const he=J.camera,Ie=J.matrix,nt=Z.distance||he.far;nt!==he.far&&(he.far=nt,he.updateProjectionMatrix()),Na.setFromMatrixPosition(Z.matrixWorld),he.position.copy(Na),ep.copy(he.position),ep.add(mR[re]),he.up.copy(gR[re]),he.lookAt(ep),he.updateMatrixWorld(),Ie.makeTranslation(-Na.x,-Na.y,-Na.z),tv.multiplyMatrices(he.projectionMatrix,he.matrixWorldInverse),J._frustum.setFromProjectionMatrix(tv,he.coordinateSystem,he.reversedDepth)}else J.updateMatrices(Z);n=J.getFrustum(),b(U,A,J.camera,Z,this.type)}J.isPointLightShadow!==!0&&this.type===Ns&&M(J,A),J.needsUpdate=!1}v=this.type,y.needsUpdate=!1,r.setRenderTarget(P,O,D)};function M(R,U){const A=e.update(w);m.defines.VSM_SAMPLES!==R.blurSamples&&(m.defines.VSM_SAMPLES=R.blurSamples,g.defines.VSM_SAMPLES=R.blurSamples,m.needsUpdate=!0,g.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new pi(i.x,i.y,{format:ts,type:ur})),m.uniforms.shadow_pass.value=R.map.depthTexture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,r.setRenderTarget(R.mapPass),r.clear(),r.renderBufferDirect(U,null,A,m,w,null),g.uniforms.shadow_pass.value=R.mapPass.texture,g.uniforms.resolution.value=R.mapSize,g.uniforms.radius.value=R.radius,r.setRenderTarget(R.map),r.clear(),r.renderBufferDirect(U,null,A,g,w,null)}function E(R,U,A,P){let O=null;const D=A.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(D!==void 0)O=D;else if(O=A.isPointLight===!0?u:c,r.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0||U.alphaToCoverage===!0){const V=O.uuid,K=U.uuid;let te=h[V];te===void 0&&(te={},h[V]=te);let H=te[K];H===void 0&&(H=O.clone(),te[K]=H,U.addEventListener("dispose",L)),O=H}if(O.visible=U.visible,O.wireframe=U.wireframe,P===Ns?O.side=U.shadowSide!==null?U.shadowSide:U.side:O.side=U.shadowSide!==null?U.shadowSide:p[U.side],O.alphaMap=U.alphaMap,O.alphaTest=U.alphaToCoverage===!0?.5:U.alphaTest,O.map=U.map,O.clipShadows=U.clipShadows,O.clippingPlanes=U.clippingPlanes,O.clipIntersection=U.clipIntersection,O.displacementMap=U.displacementMap,O.displacementScale=U.displacementScale,O.displacementBias=U.displacementBias,O.wireframeLinewidth=U.wireframeLinewidth,O.linewidth=U.linewidth,A.isPointLight===!0&&O.isMeshDistanceMaterial===!0){const V=r.properties.get(O);V.light=A}return O}function b(R,U,A,P,O){if(R.visible===!1)return;if(R.layers.test(U.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&O===Ns)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,R.matrixWorld);const K=e.update(R),te=R.material;if(Array.isArray(te)){const H=K.groups;for(let Z=0,J=H.length;Z<J;Z++){const z=H[Z],W=te[z.materialIndex];if(W&&W.visible){const q=E(R,W,P,O);R.onBeforeShadow(r,R,U,A,K,q,z),r.renderBufferDirect(A,null,K,q,R,z),R.onAfterShadow(r,R,U,A,K,q,z)}}}else if(te.visible){const H=E(R,te,P,O);R.onBeforeShadow(r,R,U,A,K,H,null),r.renderBufferDirect(A,null,K,H,R,null),R.onAfterShadow(r,R,U,A,K,H,null)}}const V=R.children;for(let K=0,te=V.length;K<te;K++)b(V[K],U,A,P,O)}function L(R){R.target.removeEventListener("dispose",L);for(const A in h){const P=h[A],O=R.target.uuid;O in P&&(P[O].dispose(),delete P[O])}}}function vR(r,e){function t(){let G=!1;const Re=new Rt;let ce=null;const Ge=new Rt(0,0,0,0);return{setMask:function(Ne){ce!==Ne&&!G&&(r.colorMask(Ne,Ne,Ne,Ne),ce=Ne)},setLocked:function(Ne){G=Ne},setClear:function(Ne,_e,it,_t,Kt){Kt===!0&&(Ne*=_t,_e*=_t,it*=_t),Re.set(Ne,_e,it,_t),Ge.equals(Re)===!1&&(r.clearColor(Ne,_e,it,_t),Ge.copy(Re))},reset:function(){G=!1,ce=null,Ge.set(-1,0,0,0)}}}function n(){let G=!1,Re=!1,ce=null,Ge=null,Ne=null;return{setReversed:function(_e){if(Re!==_e){const it=e.get("EXT_clip_control");_e?it.clipControlEXT(it.LOWER_LEFT_EXT,it.ZERO_TO_ONE_EXT):it.clipControlEXT(it.LOWER_LEFT_EXT,it.NEGATIVE_ONE_TO_ONE_EXT),Re=_e;const _t=Ne;Ne=null,this.setClear(_t)}},getReversed:function(){return Re},setTest:function(_e){_e?Se(r.DEPTH_TEST):$e(r.DEPTH_TEST)},setMask:function(_e){ce!==_e&&!G&&(r.depthMask(_e),ce=_e)},setFunc:function(_e){if(Re&&(_e=zM[_e]),Ge!==_e){switch(_e){case Au:r.depthFunc(r.NEVER);break;case Cu:r.depthFunc(r.ALWAYS);break;case Ru:r.depthFunc(r.LESS);break;case Gs:r.depthFunc(r.LEQUAL);break;case Pu:r.depthFunc(r.EQUAL);break;case Iu:r.depthFunc(r.GEQUAL);break;case Lu:r.depthFunc(r.GREATER);break;case Du:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Ge=_e}},setLocked:function(_e){G=_e},setClear:function(_e){Ne!==_e&&(Ne=_e,Re&&(_e=1-_e),r.clearDepth(_e))},reset:function(){G=!1,ce=null,Ge=null,Ne=null,Re=!1}}}function i(){let G=!1,Re=null,ce=null,Ge=null,Ne=null,_e=null,it=null,_t=null,Kt=null;return{setTest:function(kt){G||(kt?Se(r.STENCIL_TEST):$e(r.STENCIL_TEST))},setMask:function(kt){Re!==kt&&!G&&(r.stencilMask(kt),Re=kt)},setFunc:function(kt,Ii,ii){(ce!==kt||Ge!==Ii||Ne!==ii)&&(r.stencilFunc(kt,Ii,ii),ce=kt,Ge=Ii,Ne=ii)},setOp:function(kt,Ii,ii){(_e!==kt||it!==Ii||_t!==ii)&&(r.stencilOp(kt,Ii,ii),_e=kt,it=Ii,_t=ii)},setLocked:function(kt){G=kt},setClear:function(kt){Kt!==kt&&(r.clearStencil(kt),Kt=kt)},reset:function(){G=!1,Re=null,ce=null,Ge=null,Ne=null,_e=null,it=null,_t=null,Kt=null}}}const s=new t,o=new n,c=new i,u=new WeakMap,h=new WeakMap;let f={},p={},m={},g=new WeakMap,x=[],w=null,y=!1,v=null,M=null,E=null,b=null,L=null,R=null,U=null,A=new Ye(0,0,0),P=0,O=!1,D=null,V=null,K=null,te=null,H=null;const Z=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let J=!1,z=0;const W=r.getParameter(r.VERSION);W.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(W)[1]),J=z>=1):W.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),J=z>=2);let q=null,re={};const he=r.getParameter(r.SCISSOR_BOX),Ie=r.getParameter(r.VIEWPORT),nt=new Rt().fromArray(he),Qe=new Rt().fromArray(Ie);function oe(G,Re,ce,Ge){const Ne=new Uint8Array(4),_e=r.createTexture();r.bindTexture(G,_e),r.texParameteri(G,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(G,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let it=0;it<ce;it++)G===r.TEXTURE_3D||G===r.TEXTURE_2D_ARRAY?r.texImage3D(Re,0,r.RGBA,1,1,Ge,0,r.RGBA,r.UNSIGNED_BYTE,Ne):r.texImage2D(Re+it,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ne);return _e}const we={};we[r.TEXTURE_2D]=oe(r.TEXTURE_2D,r.TEXTURE_2D,1),we[r.TEXTURE_CUBE_MAP]=oe(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),we[r.TEXTURE_2D_ARRAY]=oe(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),we[r.TEXTURE_3D]=oe(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),c.setClear(0),Se(r.DEPTH_TEST),o.setFunc(Gs),Ue(!1),De(yp),Se(r.CULL_FACE),xe(lr);function Se(G){f[G]!==!0&&(r.enable(G),f[G]=!0)}function $e(G){f[G]!==!1&&(r.disable(G),f[G]=!1)}function Ke(G,Re){return m[G]!==Re?(r.bindFramebuffer(G,Re),m[G]=Re,G===r.DRAW_FRAMEBUFFER&&(m[r.FRAMEBUFFER]=Re),G===r.FRAMEBUFFER&&(m[r.DRAW_FRAMEBUFFER]=Re),!0):!1}function Te(G,Re){let ce=x,Ge=!1;if(G){ce=g.get(Re),ce===void 0&&(ce=[],g.set(Re,ce));const Ne=G.textures;if(ce.length!==Ne.length||ce[0]!==r.COLOR_ATTACHMENT0){for(let _e=0,it=Ne.length;_e<it;_e++)ce[_e]=r.COLOR_ATTACHMENT0+_e;ce.length=Ne.length,Ge=!0}}else ce[0]!==r.BACK&&(ce[0]=r.BACK,Ge=!0);Ge&&r.drawBuffers(ce)}function pt(G){return w!==G?(r.useProgram(G),w=G,!0):!1}const Ze={[jr]:r.FUNC_ADD,[zv]:r.FUNC_SUBTRACT,[kv]:r.FUNC_REVERSE_SUBTRACT};Ze[Vv]=r.MIN,Ze[Hv]=r.MAX;const de={[Gv]:r.ZERO,[Wv]:r.ONE,[Xv]:r.SRC_COLOR,[bu]:r.SRC_ALPHA,[Kv]:r.SRC_ALPHA_SATURATE,[Jv]:r.DST_COLOR,[Yv]:r.DST_ALPHA,[qv]:r.ONE_MINUS_SRC_COLOR,[Tu]:r.ONE_MINUS_SRC_ALPHA,[jv]:r.ONE_MINUS_DST_COLOR,[Zv]:r.ONE_MINUS_DST_ALPHA,[Qv]:r.CONSTANT_COLOR,[$v]:r.ONE_MINUS_CONSTANT_COLOR,[ex]:r.CONSTANT_ALPHA,[tx]:r.ONE_MINUS_CONSTANT_ALPHA};function xe(G,Re,ce,Ge,Ne,_e,it,_t,Kt,kt){if(G===lr){y===!0&&($e(r.BLEND),y=!1);return}if(y===!1&&(Se(r.BLEND),y=!0),G!==Bv){if(G!==v||kt!==O){if((M!==jr||L!==jr)&&(r.blendEquation(r.FUNC_ADD),M=jr,L=jr),kt)switch(G){case Bs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Sp:r.blendFunc(r.ONE,r.ONE);break;case Mp:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case wp:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:rt("WebGLState: Invalid blending: ",G);break}else switch(G){case Bs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Sp:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Mp:rt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case wp:rt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:rt("WebGLState: Invalid blending: ",G);break}E=null,b=null,R=null,U=null,A.set(0,0,0),P=0,v=G,O=kt}return}Ne=Ne||Re,_e=_e||ce,it=it||Ge,(Re!==M||Ne!==L)&&(r.blendEquationSeparate(Ze[Re],Ze[Ne]),M=Re,L=Ne),(ce!==E||Ge!==b||_e!==R||it!==U)&&(r.blendFuncSeparate(de[ce],de[Ge],de[_e],de[it]),E=ce,b=Ge,R=_e,U=it),(_t.equals(A)===!1||Kt!==P)&&(r.blendColor(_t.r,_t.g,_t.b,Kt),A.copy(_t),P=Kt),v=G,O=!1}function me(G,Re){G.side===zi?$e(r.CULL_FACE):Se(r.CULL_FACE);let ce=G.side===Wn;Re&&(ce=!ce),Ue(ce),G.blending===Bs&&G.transparent===!1?xe(lr):xe(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),o.setFunc(G.depthFunc),o.setTest(G.depthTest),o.setMask(G.depthWrite),s.setMask(G.colorWrite);const Ge=G.stencilWrite;c.setTest(Ge),Ge&&(c.setMask(G.stencilWriteMask),c.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),c.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),k(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?Se(r.SAMPLE_ALPHA_TO_COVERAGE):$e(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ue(G){D!==G&&(G?r.frontFace(r.CW):r.frontFace(r.CCW),D=G)}function De(G){G!==Uv?(Se(r.CULL_FACE),G!==V&&(G===yp?r.cullFace(r.BACK):G===Fv?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):$e(r.CULL_FACE),V=G}function at(G){G!==K&&(J&&r.lineWidth(G),K=G)}function k(G,Re,ce){G?(Se(r.POLYGON_OFFSET_FILL),(te!==Re||H!==ce)&&(te=Re,H=ce,o.getReversed()&&(Re=-Re),r.polygonOffset(Re,ce))):$e(r.POLYGON_OFFSET_FILL)}function ft(G){G?Se(r.SCISSOR_TEST):$e(r.SCISSOR_TEST)}function tt(G){G===void 0&&(G=r.TEXTURE0+Z-1),q!==G&&(r.activeTexture(G),q=G)}function ct(G,Re,ce){ce===void 0&&(q===null?ce=r.TEXTURE0+Z-1:ce=q);let Ge=re[ce];Ge===void 0&&(Ge={type:void 0,texture:void 0},re[ce]=Ge),(Ge.type!==G||Ge.texture!==Re)&&(q!==ce&&(r.activeTexture(ce),q=ce),r.bindTexture(G,Re||we[G]),Ge.type=G,Ge.texture=Re)}function ye(){const G=re[q];G!==void 0&&G.type!==void 0&&(r.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function Pt(){try{r.compressedTexImage2D(...arguments)}catch(G){rt("WebGLState:",G)}}function N(){try{r.compressedTexImage3D(...arguments)}catch(G){rt("WebGLState:",G)}}function C(){try{r.texSubImage2D(...arguments)}catch(G){rt("WebGLState:",G)}}function Q(){try{r.texSubImage3D(...arguments)}catch(G){rt("WebGLState:",G)}}function ue(){try{r.compressedTexSubImage2D(...arguments)}catch(G){rt("WebGLState:",G)}}function ge(){try{r.compressedTexSubImage3D(...arguments)}catch(G){rt("WebGLState:",G)}}function Ee(){try{r.texStorage2D(...arguments)}catch(G){rt("WebGLState:",G)}}function Pe(){try{r.texStorage3D(...arguments)}catch(G){rt("WebGLState:",G)}}function ae(){try{r.texImage2D(...arguments)}catch(G){rt("WebGLState:",G)}}function fe(){try{r.texImage3D(...arguments)}catch(G){rt("WebGLState:",G)}}function Ve(G){return p[G]!==void 0?p[G]:r.getParameter(G)}function Je(G,Re){p[G]!==Re&&(r.pixelStorei(G,Re),p[G]=Re)}function Le(G){nt.equals(G)===!1&&(r.scissor(G.x,G.y,G.z,G.w),nt.copy(G))}function Ce(G){Qe.equals(G)===!1&&(r.viewport(G.x,G.y,G.z,G.w),Qe.copy(G))}function mt(G,Re){let ce=h.get(Re);ce===void 0&&(ce=new WeakMap,h.set(Re,ce));let Ge=ce.get(G);Ge===void 0&&(Ge=r.getUniformBlockIndex(Re,G.name),ce.set(G,Ge))}function yt(G,Re){const Ge=h.get(Re).get(G);u.get(Re)!==Ge&&(r.uniformBlockBinding(Re,Ge,G.__bindingPointIndex),u.set(Re,Ge))}function It(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),f={},p={},q=null,re={},m={},g=new WeakMap,x=[],w=null,y=!1,v=null,M=null,E=null,b=null,L=null,R=null,U=null,A=new Ye(0,0,0),P=0,O=!1,D=null,V=null,K=null,te=null,H=null,nt.set(0,0,r.canvas.width,r.canvas.height),Qe.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),c.reset()}return{buffers:{color:s,depth:o,stencil:c},enable:Se,disable:$e,bindFramebuffer:Ke,drawBuffers:Te,useProgram:pt,setBlending:xe,setMaterial:me,setFlipSided:Ue,setCullFace:De,setLineWidth:at,setPolygonOffset:k,setScissorTest:ft,activeTexture:tt,bindTexture:ct,unbindTexture:ye,compressedTexImage2D:Pt,compressedTexImage3D:N,texImage2D:ae,texImage3D:fe,pixelStorei:Je,getParameter:Ve,updateUBOMapping:mt,uniformBlockBinding:yt,texStorage2D:Ee,texStorage3D:Pe,texSubImage2D:C,texSubImage3D:Q,compressedTexSubImage2D:ue,compressedTexSubImage3D:ge,scissor:Le,viewport:Ce,reset:It}}function xR(r,e,t,n,i,s,o){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new pe,f=new WeakMap,p=new Set;let m;const g=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(N,C){return x?new OffscreenCanvas(N,C):ol("canvas")}function y(N,C,Q){let ue=1;const ge=Pt(N);if((ge.width>Q||ge.height>Q)&&(ue=Q/Math.max(ge.width,ge.height)),ue<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const Ee=Math.floor(ue*ge.width),Pe=Math.floor(ue*ge.height);m===void 0&&(m=w(Ee,Pe));const ae=C?w(Ee,Pe):m;return ae.width=Ee,ae.height=Pe,ae.getContext("2d").drawImage(N,0,0,Ee,Pe),Oe("WebGLRenderer: Texture has been resized from ("+ge.width+"x"+ge.height+") to ("+Ee+"x"+Pe+")."),ae}else return"data"in N&&Oe("WebGLRenderer: Image in DataTexture is too big ("+ge.width+"x"+ge.height+")."),N;return N}function v(N){return N.generateMipmaps}function M(N){r.generateMipmap(N)}function E(N){return N.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?r.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function b(N,C,Q,ue,ge,Ee=!1){if(N!==null){if(r[N]!==void 0)return r[N];Oe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let Pe;ue&&(Pe=e.get("EXT_texture_norm16"),Pe||Oe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ae=C;if(C===r.RED&&(Q===r.FLOAT&&(ae=r.R32F),Q===r.HALF_FLOAT&&(ae=r.R16F),Q===r.UNSIGNED_BYTE&&(ae=r.R8),Q===r.UNSIGNED_SHORT&&Pe&&(ae=Pe.R16_EXT),Q===r.SHORT&&Pe&&(ae=Pe.R16_SNORM_EXT)),C===r.RED_INTEGER&&(Q===r.UNSIGNED_BYTE&&(ae=r.R8UI),Q===r.UNSIGNED_SHORT&&(ae=r.R16UI),Q===r.UNSIGNED_INT&&(ae=r.R32UI),Q===r.BYTE&&(ae=r.R8I),Q===r.SHORT&&(ae=r.R16I),Q===r.INT&&(ae=r.R32I)),C===r.RG&&(Q===r.FLOAT&&(ae=r.RG32F),Q===r.HALF_FLOAT&&(ae=r.RG16F),Q===r.UNSIGNED_BYTE&&(ae=r.RG8),Q===r.UNSIGNED_SHORT&&Pe&&(ae=Pe.RG16_EXT),Q===r.SHORT&&Pe&&(ae=Pe.RG16_SNORM_EXT)),C===r.RG_INTEGER&&(Q===r.UNSIGNED_BYTE&&(ae=r.RG8UI),Q===r.UNSIGNED_SHORT&&(ae=r.RG16UI),Q===r.UNSIGNED_INT&&(ae=r.RG32UI),Q===r.BYTE&&(ae=r.RG8I),Q===r.SHORT&&(ae=r.RG16I),Q===r.INT&&(ae=r.RG32I)),C===r.RGB_INTEGER&&(Q===r.UNSIGNED_BYTE&&(ae=r.RGB8UI),Q===r.UNSIGNED_SHORT&&(ae=r.RGB16UI),Q===r.UNSIGNED_INT&&(ae=r.RGB32UI),Q===r.BYTE&&(ae=r.RGB8I),Q===r.SHORT&&(ae=r.RGB16I),Q===r.INT&&(ae=r.RGB32I)),C===r.RGBA_INTEGER&&(Q===r.UNSIGNED_BYTE&&(ae=r.RGBA8UI),Q===r.UNSIGNED_SHORT&&(ae=r.RGBA16UI),Q===r.UNSIGNED_INT&&(ae=r.RGBA32UI),Q===r.BYTE&&(ae=r.RGBA8I),Q===r.SHORT&&(ae=r.RGBA16I),Q===r.INT&&(ae=r.RGBA32I)),C===r.RGB&&(Q===r.UNSIGNED_SHORT&&Pe&&(ae=Pe.RGB16_EXT),Q===r.SHORT&&Pe&&(ae=Pe.RGB16_SNORM_EXT),Q===r.UNSIGNED_INT_5_9_9_9_REV&&(ae=r.RGB9_E5),Q===r.UNSIGNED_INT_10F_11F_11F_REV&&(ae=r.R11F_G11F_B10F)),C===r.RGBA){const fe=Ee?rl:At.getTransfer(ge);Q===r.FLOAT&&(ae=r.RGBA32F),Q===r.HALF_FLOAT&&(ae=r.RGBA16F),Q===r.UNSIGNED_BYTE&&(ae=fe===Ht?r.SRGB8_ALPHA8:r.RGBA8),Q===r.UNSIGNED_SHORT&&Pe&&(ae=Pe.RGBA16_EXT),Q===r.SHORT&&Pe&&(ae=Pe.RGBA16_SNORM_EXT),Q===r.UNSIGNED_SHORT_4_4_4_4&&(ae=r.RGBA4),Q===r.UNSIGNED_SHORT_5_5_5_1&&(ae=r.RGB5_A1)}return(ae===r.R16F||ae===r.R32F||ae===r.RG16F||ae===r.RG32F||ae===r.RGBA16F||ae===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ae}function L(N,C){let Q;return N?C===null||C===Ri||C===Ho?Q=r.DEPTH24_STENCIL8:C===Gn?Q=r.DEPTH32F_STENCIL8:C===Vo&&(Q=r.DEPTH24_STENCIL8,Oe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===Ri||C===Ho?Q=r.DEPTH_COMPONENT24:C===Gn?Q=r.DEPTH_COMPONENT32F:C===Vo&&(Q=r.DEPTH_COMPONENT16),Q}function R(N,C){return v(N)===!0||N.isFramebufferTexture&&N.minFilter!==on&&N.minFilter!==Yt?Math.log2(Math.max(C.width,C.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?C.mipmaps.length:1}function U(N){const C=N.target;C.removeEventListener("dispose",U),P(C),C.isVideoTexture&&f.delete(C),C.isHTMLTexture&&p.delete(C)}function A(N){const C=N.target;C.removeEventListener("dispose",A),D(C)}function P(N){const C=n.get(N);if(C.__webglInit===void 0)return;const Q=N.source,ue=g.get(Q);if(ue){const ge=ue[C.__cacheKey];ge.usedTimes--,ge.usedTimes===0&&O(N),Object.keys(ue).length===0&&g.delete(Q)}n.remove(N)}function O(N){const C=n.get(N);r.deleteTexture(C.__webglTexture);const Q=N.source,ue=g.get(Q);delete ue[C.__cacheKey],o.memory.textures--}function D(N){const C=n.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),n.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let ue=0;ue<6;ue++){if(Array.isArray(C.__webglFramebuffer[ue]))for(let ge=0;ge<C.__webglFramebuffer[ue].length;ge++)r.deleteFramebuffer(C.__webglFramebuffer[ue][ge]);else r.deleteFramebuffer(C.__webglFramebuffer[ue]);C.__webglDepthbuffer&&r.deleteRenderbuffer(C.__webglDepthbuffer[ue])}else{if(Array.isArray(C.__webglFramebuffer))for(let ue=0;ue<C.__webglFramebuffer.length;ue++)r.deleteFramebuffer(C.__webglFramebuffer[ue]);else r.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&r.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&r.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let ue=0;ue<C.__webglColorRenderbuffer.length;ue++)C.__webglColorRenderbuffer[ue]&&r.deleteRenderbuffer(C.__webglColorRenderbuffer[ue]);C.__webglDepthRenderbuffer&&r.deleteRenderbuffer(C.__webglDepthRenderbuffer)}const Q=N.textures;for(let ue=0,ge=Q.length;ue<ge;ue++){const Ee=n.get(Q[ue]);Ee.__webglTexture&&(r.deleteTexture(Ee.__webglTexture),o.memory.textures--),n.remove(Q[ue])}n.remove(N)}let V=0;function K(){V=0}function te(){return V}function H(N){V=N}function Z(){const N=V;return N>=i.maxTextures&&Oe("WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+i.maxTextures),V+=1,N}function J(N){const C=[];return C.push(N.wrapS),C.push(N.wrapT),C.push(N.wrapR||0),C.push(N.magFilter),C.push(N.minFilter),C.push(N.anisotropy),C.push(N.internalFormat),C.push(N.format),C.push(N.type),C.push(N.generateMipmaps),C.push(N.premultiplyAlpha),C.push(N.flipY),C.push(N.unpackAlignment),C.push(N.colorSpace),C.join()}function z(N,C){const Q=n.get(N);if(N.isVideoTexture&&ct(N),N.isRenderTargetTexture===!1&&N.isExternalTexture!==!0&&N.version>0&&Q.__version!==N.version){const ue=N.image;if(ue===null)Oe("WebGLRenderer: Texture marked for update but no image data found.");else if(ue.complete===!1)Oe("WebGLRenderer: Texture marked for update but image is incomplete");else{$e(Q,N,C);return}}else N.isExternalTexture&&(Q.__webglTexture=N.sourceTexture?N.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,Q.__webglTexture,r.TEXTURE0+C)}function W(N,C){const Q=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&Q.__version!==N.version){$e(Q,N,C);return}else N.isExternalTexture&&(Q.__webglTexture=N.sourceTexture?N.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,Q.__webglTexture,r.TEXTURE0+C)}function q(N,C){const Q=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&Q.__version!==N.version){$e(Q,N,C);return}t.bindTexture(r.TEXTURE_3D,Q.__webglTexture,r.TEXTURE0+C)}function re(N,C){const Q=n.get(N);if(N.isCubeDepthTexture!==!0&&N.version>0&&Q.__version!==N.version){Ke(Q,N,C);return}t.bindTexture(r.TEXTURE_CUBE_MAP,Q.__webglTexture,r.TEXTURE0+C)}const he={[Ka]:r.REPEAT,[ti]:r.CLAMP_TO_EDGE,[Qa]:r.MIRRORED_REPEAT},Ie={[on]:r.NEAREST,[Jp]:r.NEAREST_MIPMAP_NEAREST,[Uo]:r.NEAREST_MIPMAP_LINEAR,[Yt]:r.LINEAR,[Ga]:r.LINEAR_MIPMAP_NEAREST,[or]:r.LINEAR_MIPMAP_LINEAR},nt={[ux]:r.NEVER,[mx]:r.ALWAYS,[hx]:r.LESS,[Ph]:r.LEQUAL,[fx]:r.EQUAL,[Ih]:r.GEQUAL,[dx]:r.GREATER,[px]:r.NOTEQUAL};function Qe(N,C){if(C.type===Gn&&e.has("OES_texture_float_linear")===!1&&(C.magFilter===Yt||C.magFilter===Ga||C.magFilter===Uo||C.magFilter===or||C.minFilter===Yt||C.minFilter===Ga||C.minFilter===Uo||C.minFilter===or)&&Oe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(N,r.TEXTURE_WRAP_S,he[C.wrapS]),r.texParameteri(N,r.TEXTURE_WRAP_T,he[C.wrapT]),(N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY)&&r.texParameteri(N,r.TEXTURE_WRAP_R,he[C.wrapR]),r.texParameteri(N,r.TEXTURE_MAG_FILTER,Ie[C.magFilter]),r.texParameteri(N,r.TEXTURE_MIN_FILTER,Ie[C.minFilter]),C.compareFunction&&(r.texParameteri(N,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(N,r.TEXTURE_COMPARE_FUNC,nt[C.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===on||C.minFilter!==Uo&&C.minFilter!==or||C.type===Gn&&e.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||n.get(C).__currentAnisotropy){const Q=e.get("EXT_texture_filter_anisotropic");r.texParameterf(N,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,i.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy}}}function oe(N,C){let Q=!1;N.__webglInit===void 0&&(N.__webglInit=!0,C.addEventListener("dispose",U));const ue=C.source;let ge=g.get(ue);ge===void 0&&(ge={},g.set(ue,ge));const Ee=J(C);if(Ee!==N.__cacheKey){ge[Ee]===void 0&&(ge[Ee]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,Q=!0),ge[Ee].usedTimes++;const Pe=ge[N.__cacheKey];Pe!==void 0&&(ge[N.__cacheKey].usedTimes--,Pe.usedTimes===0&&O(C)),N.__cacheKey=Ee,N.__webglTexture=ge[Ee].texture}return Q}function we(N,C,Q){return Math.floor(Math.floor(N/Q)/C)}function Se(N,C,Q,ue){const Ee=N.updateRanges;if(Ee.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,C.width,C.height,Q,ue,C.data);else{Ee.sort((Je,Le)=>Je.start-Le.start);let Pe=0;for(let Je=1;Je<Ee.length;Je++){const Le=Ee[Pe],Ce=Ee[Je],mt=Le.start+Le.count,yt=we(Ce.start,C.width,4),It=we(Le.start,C.width,4);Ce.start<=mt+1&&yt===It&&we(Ce.start+Ce.count-1,C.width,4)===yt?Le.count=Math.max(Le.count,Ce.start+Ce.count-Le.start):(++Pe,Ee[Pe]=Ce)}Ee.length=Pe+1;const ae=t.getParameter(r.UNPACK_ROW_LENGTH),fe=t.getParameter(r.UNPACK_SKIP_PIXELS),Ve=t.getParameter(r.UNPACK_SKIP_ROWS);t.pixelStorei(r.UNPACK_ROW_LENGTH,C.width);for(let Je=0,Le=Ee.length;Je<Le;Je++){const Ce=Ee[Je],mt=Math.floor(Ce.start/4),yt=Math.ceil(Ce.count/4),It=mt%C.width,G=Math.floor(mt/C.width),Re=yt,ce=1;t.pixelStorei(r.UNPACK_SKIP_PIXELS,It),t.pixelStorei(r.UNPACK_SKIP_ROWS,G),t.texSubImage2D(r.TEXTURE_2D,0,It,G,Re,ce,Q,ue,C.data)}N.clearUpdateRanges(),t.pixelStorei(r.UNPACK_ROW_LENGTH,ae),t.pixelStorei(r.UNPACK_SKIP_PIXELS,fe),t.pixelStorei(r.UNPACK_SKIP_ROWS,Ve)}}function $e(N,C,Q){let ue=r.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(ue=r.TEXTURE_2D_ARRAY),C.isData3DTexture&&(ue=r.TEXTURE_3D);const ge=oe(N,C),Ee=C.source;t.bindTexture(ue,N.__webglTexture,r.TEXTURE0+Q);const Pe=n.get(Ee);if(Ee.version!==Pe.__version||ge===!0){if(t.activeTexture(r.TEXTURE0+Q),(typeof ImageBitmap<"u"&&C.image instanceof ImageBitmap)===!1){const ce=At.getPrimaries(At.workingColorSpace),Ge=C.colorSpace===Tr?null:At.getPrimaries(C.colorSpace),Ne=C.colorSpace===Tr||ce===Ge?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,C.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne)}t.pixelStorei(r.UNPACK_ALIGNMENT,C.unpackAlignment);let fe=y(C.image,!1,i.maxTextureSize);fe=ye(C,fe);const Ve=s.convert(C.format,C.colorSpace),Je=s.convert(C.type);let Le=b(C.internalFormat,Ve,Je,C.normalized,C.colorSpace,C.isVideoTexture);Qe(ue,C);let Ce;const mt=C.mipmaps,yt=C.isVideoTexture!==!0,It=Pe.__version===void 0||ge===!0,G=Ee.dataReady,Re=R(C,fe);if(C.isDepthTexture)Le=L(C.format===Kr,C.type),It&&(yt?t.texStorage2D(r.TEXTURE_2D,1,Le,fe.width,fe.height):t.texImage2D(r.TEXTURE_2D,0,Le,fe.width,fe.height,0,Ve,Je,null));else if(C.isDataTexture)if(mt.length>0){yt&&It&&t.texStorage2D(r.TEXTURE_2D,Re,Le,mt[0].width,mt[0].height);for(let ce=0,Ge=mt.length;ce<Ge;ce++)Ce=mt[ce],yt?G&&t.texSubImage2D(r.TEXTURE_2D,ce,0,0,Ce.width,Ce.height,Ve,Je,Ce.data):t.texImage2D(r.TEXTURE_2D,ce,Le,Ce.width,Ce.height,0,Ve,Je,Ce.data);C.generateMipmaps=!1}else yt?(It&&t.texStorage2D(r.TEXTURE_2D,Re,Le,fe.width,fe.height),G&&Se(C,fe,Ve,Je)):t.texImage2D(r.TEXTURE_2D,0,Le,fe.width,fe.height,0,Ve,Je,fe.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){yt&&It&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Re,Le,mt[0].width,mt[0].height,fe.depth);for(let ce=0,Ge=mt.length;ce<Ge;ce++)if(Ce=mt[ce],C.format!==Nn)if(Ve!==null)if(yt){if(G)if(C.layerUpdates.size>0){const Ne=Up(Ce.width,Ce.height,C.format,C.type);for(const _e of C.layerUpdates){const it=Ce.data.subarray(_e*Ne/Ce.data.BYTES_PER_ELEMENT,(_e+1)*Ne/Ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ce,0,0,_e,Ce.width,Ce.height,1,Ve,it)}C.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ce,0,0,0,Ce.width,Ce.height,fe.depth,Ve,Ce.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ce,Le,Ce.width,Ce.height,fe.depth,0,Ce.data,0,0);else Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else yt?G&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,ce,0,0,0,Ce.width,Ce.height,fe.depth,Ve,Je,Ce.data):t.texImage3D(r.TEXTURE_2D_ARRAY,ce,Le,Ce.width,Ce.height,fe.depth,0,Ve,Je,Ce.data)}else{yt&&It&&t.texStorage2D(r.TEXTURE_2D,Re,Le,mt[0].width,mt[0].height);for(let ce=0,Ge=mt.length;ce<Ge;ce++)Ce=mt[ce],C.format!==Nn?Ve!==null?yt?G&&t.compressedTexSubImage2D(r.TEXTURE_2D,ce,0,0,Ce.width,Ce.height,Ve,Ce.data):t.compressedTexImage2D(r.TEXTURE_2D,ce,Le,Ce.width,Ce.height,0,Ce.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):yt?G&&t.texSubImage2D(r.TEXTURE_2D,ce,0,0,Ce.width,Ce.height,Ve,Je,Ce.data):t.texImage2D(r.TEXTURE_2D,ce,Le,Ce.width,Ce.height,0,Ve,Je,Ce.data)}else if(C.isDataArrayTexture)if(yt){if(It&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Re,Le,fe.width,fe.height,fe.depth),G)if(C.layerUpdates.size>0){const ce=Up(fe.width,fe.height,C.format,C.type);for(const Ge of C.layerUpdates){const Ne=fe.data.subarray(Ge*ce/fe.data.BYTES_PER_ELEMENT,(Ge+1)*ce/fe.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Ge,fe.width,fe.height,1,Ve,Je,Ne)}C.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,Ve,Je,fe.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Le,fe.width,fe.height,fe.depth,0,Ve,Je,fe.data);else if(C.isData3DTexture)yt?(It&&t.texStorage3D(r.TEXTURE_3D,Re,Le,fe.width,fe.height,fe.depth),G&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,Ve,Je,fe.data)):t.texImage3D(r.TEXTURE_3D,0,Le,fe.width,fe.height,fe.depth,0,Ve,Je,fe.data);else if(C.isFramebufferTexture){if(It)if(yt)t.texStorage2D(r.TEXTURE_2D,Re,Le,fe.width,fe.height);else{let ce=fe.width,Ge=fe.height;for(let Ne=0;Ne<Re;Ne++)t.texImage2D(r.TEXTURE_2D,Ne,Le,ce,Ge,0,Ve,Je,null),ce>>=1,Ge>>=1}}else if(C.isHTMLTexture){if("texElementImage2D"in r){const ce=r.canvas;if(ce.hasAttribute("layoutsubtree")||ce.setAttribute("layoutsubtree","true"),fe.parentNode!==ce){ce.appendChild(fe),p.add(C),ce.onpaint=_t=>{const Kt=_t.changedElements;for(const kt of p)Kt.includes(kt.image)&&(kt.needsUpdate=!0)},ce.requestPaint();return}const Ge=0,Ne=r.RGBA,_e=r.RGBA,it=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,Ge,Ne,_e,it,fe),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(mt.length>0){if(yt&&It){const ce=Pt(mt[0]);t.texStorage2D(r.TEXTURE_2D,Re,Le,ce.width,ce.height)}for(let ce=0,Ge=mt.length;ce<Ge;ce++)Ce=mt[ce],yt?G&&t.texSubImage2D(r.TEXTURE_2D,ce,0,0,Ve,Je,Ce):t.texImage2D(r.TEXTURE_2D,ce,Le,Ve,Je,Ce);C.generateMipmaps=!1}else if(yt){if(It){const ce=Pt(fe);t.texStorage2D(r.TEXTURE_2D,Re,Le,ce.width,ce.height)}G&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ve,Je,fe)}else t.texImage2D(r.TEXTURE_2D,0,Le,Ve,Je,fe);v(C)&&M(ue),Pe.__version=Ee.version,C.onUpdate&&C.onUpdate(C)}N.__version=C.version}function Ke(N,C,Q){if(C.image.length!==6)return;const ue=oe(N,C),ge=C.source;t.bindTexture(r.TEXTURE_CUBE_MAP,N.__webglTexture,r.TEXTURE0+Q);const Ee=n.get(ge);if(ge.version!==Ee.__version||ue===!0){t.activeTexture(r.TEXTURE0+Q);const Pe=At.getPrimaries(At.workingColorSpace),ae=C.colorSpace===Tr?null:At.getPrimaries(C.colorSpace),fe=C.colorSpace===Tr||Pe===ae?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,C.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),t.pixelStorei(r.UNPACK_ALIGNMENT,C.unpackAlignment),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);const Ve=C.isCompressedTexture||C.image[0].isCompressedTexture,Je=C.image[0]&&C.image[0].isDataTexture,Le=[];for(let _e=0;_e<6;_e++)!Ve&&!Je?Le[_e]=y(C.image[_e],!0,i.maxCubemapSize):Le[_e]=Je?C.image[_e].image:C.image[_e],Le[_e]=ye(C,Le[_e]);const Ce=Le[0],mt=s.convert(C.format,C.colorSpace),yt=s.convert(C.type),It=b(C.internalFormat,mt,yt,C.normalized,C.colorSpace),G=C.isVideoTexture!==!0,Re=Ee.__version===void 0||ue===!0,ce=ge.dataReady;let Ge=R(C,Ce);Qe(r.TEXTURE_CUBE_MAP,C);let Ne;if(Ve){G&&Re&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Ge,It,Ce.width,Ce.height);for(let _e=0;_e<6;_e++){Ne=Le[_e].mipmaps;for(let it=0;it<Ne.length;it++){const _t=Ne[it];C.format!==Nn?mt!==null?G?ce&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,it,0,0,_t.width,_t.height,mt,_t.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,it,It,_t.width,_t.height,0,_t.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):G?ce&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,it,0,0,_t.width,_t.height,mt,yt,_t.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,it,It,_t.width,_t.height,0,mt,yt,_t.data)}}}else{if(Ne=C.mipmaps,G&&Re){Ne.length>0&&Ge++;const _e=Pt(Le[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Ge,It,_e.width,_e.height)}for(let _e=0;_e<6;_e++)if(Je){G?ce&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,Le[_e].width,Le[_e].height,mt,yt,Le[_e].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,It,Le[_e].width,Le[_e].height,0,mt,yt,Le[_e].data);for(let it=0;it<Ne.length;it++){const Kt=Ne[it].image[_e].image;G?ce&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,it+1,0,0,Kt.width,Kt.height,mt,yt,Kt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,it+1,It,Kt.width,Kt.height,0,mt,yt,Kt.data)}}else{G?ce&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,mt,yt,Le[_e]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,It,mt,yt,Le[_e]);for(let it=0;it<Ne.length;it++){const _t=Ne[it];G?ce&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,it+1,0,0,mt,yt,_t.image[_e]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,it+1,It,mt,yt,_t.image[_e])}}}v(C)&&M(r.TEXTURE_CUBE_MAP),Ee.__version=ge.version,C.onUpdate&&C.onUpdate(C)}N.__version=C.version}function Te(N,C,Q,ue,ge,Ee){const Pe=s.convert(Q.format,Q.colorSpace),ae=s.convert(Q.type),fe=b(Q.internalFormat,Pe,ae,Q.normalized,Q.colorSpace),Ve=n.get(C),Je=n.get(Q);if(Je.__renderTarget=C,!Ve.__hasExternalTextures){const Le=Math.max(1,C.width>>Ee),Ce=Math.max(1,C.height>>Ee);ge===r.TEXTURE_3D||ge===r.TEXTURE_2D_ARRAY?t.texImage3D(ge,Ee,fe,Le,Ce,C.depth,0,Pe,ae,null):t.texImage2D(ge,Ee,fe,Le,Ce,0,Pe,ae,null)}t.bindFramebuffer(r.FRAMEBUFFER,N),tt(C)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ue,ge,Je.__webglTexture,0,ft(C)):(ge===r.TEXTURE_2D||ge>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ge<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ue,ge,Je.__webglTexture,Ee),t.bindFramebuffer(r.FRAMEBUFFER,null)}function pt(N,C,Q){if(r.bindRenderbuffer(r.RENDERBUFFER,N),C.depthBuffer){const ue=C.depthTexture,ge=ue&&ue.isDepthTexture?ue.type:null,Ee=L(C.stencilBuffer,ge),Pe=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;tt(C)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ft(C),Ee,C.width,C.height):Q?r.renderbufferStorageMultisample(r.RENDERBUFFER,ft(C),Ee,C.width,C.height):r.renderbufferStorage(r.RENDERBUFFER,Ee,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Pe,r.RENDERBUFFER,N)}else{const ue=C.textures;for(let ge=0;ge<ue.length;ge++){const Ee=ue[ge],Pe=s.convert(Ee.format,Ee.colorSpace),ae=s.convert(Ee.type),fe=b(Ee.internalFormat,Pe,ae,Ee.normalized,Ee.colorSpace);tt(C)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ft(C),fe,C.width,C.height):Q?r.renderbufferStorageMultisample(r.RENDERBUFFER,ft(C),fe,C.width,C.height):r.renderbufferStorage(r.RENDERBUFFER,fe,C.width,C.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ze(N,C,Q){const ue=C.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,N),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ge=n.get(C.depthTexture);if(ge.__renderTarget=C,(!ge.__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),ue){if(ge.__webglInit===void 0&&(ge.__webglInit=!0,C.depthTexture.addEventListener("dispose",U)),ge.__webglTexture===void 0){ge.__webglTexture=r.createTexture(),t.bindTexture(r.TEXTURE_CUBE_MAP,ge.__webglTexture),Qe(r.TEXTURE_CUBE_MAP,C.depthTexture);const Ve=s.convert(C.depthTexture.format),Je=s.convert(C.depthTexture.type);let Le;C.depthTexture.format===hr?Le=r.DEPTH_COMPONENT24:C.depthTexture.format===Kr&&(Le=r.DEPTH24_STENCIL8);for(let Ce=0;Ce<6;Ce++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,0,Le,C.width,C.height,0,Ve,Je,null)}}else z(C.depthTexture,0);const Ee=ge.__webglTexture,Pe=ft(C),ae=ue?r.TEXTURE_CUBE_MAP_POSITIVE_X+Q:r.TEXTURE_2D,fe=C.depthTexture.format===Kr?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(C.depthTexture.format===hr)tt(C)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,fe,ae,Ee,0,Pe):r.framebufferTexture2D(r.FRAMEBUFFER,fe,ae,Ee,0);else if(C.depthTexture.format===Kr)tt(C)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,fe,ae,Ee,0,Pe):r.framebufferTexture2D(r.FRAMEBUFFER,fe,ae,Ee,0);else throw new Error("Unknown depthTexture format")}function de(N){const C=n.get(N),Q=N.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==N.depthTexture){const ue=N.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),ue){const ge=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,ue.removeEventListener("dispose",ge)};ue.addEventListener("dispose",ge),C.__depthDisposeCallback=ge}C.__boundDepthTexture=ue}if(N.depthTexture&&!C.__autoAllocateDepthBuffer)if(Q)for(let ue=0;ue<6;ue++)Ze(C.__webglFramebuffer[ue],N,ue);else{const ue=N.texture.mipmaps;ue&&ue.length>0?Ze(C.__webglFramebuffer[0],N,0):Ze(C.__webglFramebuffer,N,0)}else if(Q){C.__webglDepthbuffer=[];for(let ue=0;ue<6;ue++)if(t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer[ue]),C.__webglDepthbuffer[ue]===void 0)C.__webglDepthbuffer[ue]=r.createRenderbuffer(),pt(C.__webglDepthbuffer[ue],N,!1);else{const ge=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ee=C.__webglDepthbuffer[ue];r.bindRenderbuffer(r.RENDERBUFFER,Ee),r.framebufferRenderbuffer(r.FRAMEBUFFER,ge,r.RENDERBUFFER,Ee)}}else{const ue=N.texture.mipmaps;if(ue&&ue.length>0?t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=r.createRenderbuffer(),pt(C.__webglDepthbuffer,N,!1);else{const ge=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ee=C.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Ee),r.framebufferRenderbuffer(r.FRAMEBUFFER,ge,r.RENDERBUFFER,Ee)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function xe(N,C,Q){const ue=n.get(N);C!==void 0&&Te(ue.__webglFramebuffer,N,N.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),Q!==void 0&&de(N)}function me(N){const C=N.texture,Q=n.get(N),ue=n.get(C);N.addEventListener("dispose",A);const ge=N.textures,Ee=N.isWebGLCubeRenderTarget===!0,Pe=ge.length>1;if(Pe||(ue.__webglTexture===void 0&&(ue.__webglTexture=r.createTexture()),ue.__version=C.version,o.memory.textures++),Ee){Q.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(C.mipmaps&&C.mipmaps.length>0){Q.__webglFramebuffer[ae]=[];for(let fe=0;fe<C.mipmaps.length;fe++)Q.__webglFramebuffer[ae][fe]=r.createFramebuffer()}else Q.__webglFramebuffer[ae]=r.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){Q.__webglFramebuffer=[];for(let ae=0;ae<C.mipmaps.length;ae++)Q.__webglFramebuffer[ae]=r.createFramebuffer()}else Q.__webglFramebuffer=r.createFramebuffer();if(Pe)for(let ae=0,fe=ge.length;ae<fe;ae++){const Ve=n.get(ge[ae]);Ve.__webglTexture===void 0&&(Ve.__webglTexture=r.createTexture(),o.memory.textures++)}if(N.samples>0&&tt(N)===!1){Q.__webglMultisampledFramebuffer=r.createFramebuffer(),Q.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,Q.__webglMultisampledFramebuffer);for(let ae=0;ae<ge.length;ae++){const fe=ge[ae];Q.__webglColorRenderbuffer[ae]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,Q.__webglColorRenderbuffer[ae]);const Ve=s.convert(fe.format,fe.colorSpace),Je=s.convert(fe.type),Le=b(fe.internalFormat,Ve,Je,fe.normalized,fe.colorSpace,N.isXRRenderTarget===!0),Ce=ft(N);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ce,Le,N.width,N.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ae,r.RENDERBUFFER,Q.__webglColorRenderbuffer[ae])}r.bindRenderbuffer(r.RENDERBUFFER,null),N.depthBuffer&&(Q.__webglDepthRenderbuffer=r.createRenderbuffer(),pt(Q.__webglDepthRenderbuffer,N,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Ee){t.bindTexture(r.TEXTURE_CUBE_MAP,ue.__webglTexture),Qe(r.TEXTURE_CUBE_MAP,C);for(let ae=0;ae<6;ae++)if(C.mipmaps&&C.mipmaps.length>0)for(let fe=0;fe<C.mipmaps.length;fe++)Te(Q.__webglFramebuffer[ae][fe],N,C,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,fe);else Te(Q.__webglFramebuffer[ae],N,C,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);v(C)&&M(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Pe){for(let ae=0,fe=ge.length;ae<fe;ae++){const Ve=ge[ae],Je=n.get(Ve);let Le=r.TEXTURE_2D;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(Le=N.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(Le,Je.__webglTexture),Qe(Le,Ve),Te(Q.__webglFramebuffer,N,Ve,r.COLOR_ATTACHMENT0+ae,Le,0),v(Ve)&&M(Le)}t.unbindTexture()}else{let ae=r.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(ae=N.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ae,ue.__webglTexture),Qe(ae,C),C.mipmaps&&C.mipmaps.length>0)for(let fe=0;fe<C.mipmaps.length;fe++)Te(Q.__webglFramebuffer[fe],N,C,r.COLOR_ATTACHMENT0,ae,fe);else Te(Q.__webglFramebuffer,N,C,r.COLOR_ATTACHMENT0,ae,0);v(C)&&M(ae),t.unbindTexture()}N.depthBuffer&&de(N)}function Ue(N){const C=N.textures;for(let Q=0,ue=C.length;Q<ue;Q++){const ge=C[Q];if(v(ge)){const Ee=E(N),Pe=n.get(ge).__webglTexture;t.bindTexture(Ee,Pe),M(Ee),t.unbindTexture()}}}const De=[],at=[];function k(N){if(N.samples>0){if(tt(N)===!1){const C=N.textures,Q=N.width,ue=N.height;let ge=r.COLOR_BUFFER_BIT;const Ee=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Pe=n.get(N),ae=C.length>1;if(ae)for(let Ve=0;Ve<C.length;Ve++)t.bindFramebuffer(r.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ve,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Pe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ve,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer);const fe=N.texture.mipmaps;fe&&fe.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let Ve=0;Ve<C.length;Ve++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(ge|=r.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(ge|=r.STENCIL_BUFFER_BIT)),ae){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Pe.__webglColorRenderbuffer[Ve]);const Je=n.get(C[Ve]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Je,0)}r.blitFramebuffer(0,0,Q,ue,0,0,Q,ue,ge,r.NEAREST),u===!0&&(De.length=0,at.length=0,De.push(r.COLOR_ATTACHMENT0+Ve),N.depthBuffer&&N.resolveDepthBuffer===!1&&(De.push(Ee),at.push(Ee),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,at)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,De))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ae)for(let Ve=0;Ve<C.length;Ve++){t.bindFramebuffer(r.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ve,r.RENDERBUFFER,Pe.__webglColorRenderbuffer[Ve]);const Je=n.get(C[Ve]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Pe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ve,r.TEXTURE_2D,Je,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&u){const C=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[C])}}}function ft(N){return Math.min(i.maxSamples,N.samples)}function tt(N){const C=n.get(N);return N.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function ct(N){const C=o.render.frame;f.get(N)!==C&&(f.set(N,C),N.update())}function ye(N,C){const Q=N.colorSpace,ue=N.format,ge=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||Q!==il&&Q!==Tr&&(At.getTransfer(Q)===Ht?(ue!==Nn||ge!==Vn)&&Oe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):rt("WebGLTextures: Unsupported texture color space:",Q)),C}function Pt(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(h.width=N.naturalWidth||N.width,h.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(h.width=N.displayWidth,h.height=N.displayHeight):(h.width=N.width,h.height=N.height),h}this.allocateTextureUnit=Z,this.resetTextureUnits=K,this.getTextureUnits=te,this.setTextureUnits=H,this.setTexture2D=z,this.setTexture2DArray=W,this.setTexture3D=q,this.setTextureCube=re,this.rebindTextures=xe,this.setupRenderTarget=me,this.updateRenderTargetMipmap=Ue,this.updateMultisampleRenderTarget=k,this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=tt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Ay(r,e){function t(n,i=Tr){let s;const o=At.getTransfer(i);if(n===Vn)return r.UNSIGNED_BYTE;if(n===Eh)return r.UNSIGNED_SHORT_4_4_4_4;if(n===bh)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Qp)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===$p)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===jp)return r.BYTE;if(n===Kp)return r.SHORT;if(n===Vo)return r.UNSIGNED_SHORT;if(n===wh)return r.INT;if(n===Ri)return r.UNSIGNED_INT;if(n===Gn)return r.FLOAT;if(n===ur)return r.HALF_FLOAT;if(n===em)return r.ALPHA;if(n===tm)return r.RGB;if(n===Nn)return r.RGBA;if(n===hr)return r.DEPTH_COMPONENT;if(n===Kr)return r.DEPTH_STENCIL;if(n===Th)return r.RED;if(n===vl)return r.RED_INTEGER;if(n===ts)return r.RG;if(n===Ah)return r.RG_INTEGER;if(n===Ch)return r.RGBA_INTEGER;if(n===Wa||n===Xa||n===qa||n===Ya)if(o===Ht)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Wa)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Xa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===qa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ya)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Wa)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Xa)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===qa)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ya)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Nu||n===Uu||n===Fu||n===Ou)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Nu)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Uu)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Fu)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ou)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Bu||n===zu||n===ku||n===Vu||n===Hu||n===$a||n===Gu)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Bu||n===zu)return o===Ht?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===ku)return o===Ht?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Vu)return s.COMPRESSED_R11_EAC;if(n===Hu)return s.COMPRESSED_SIGNED_R11_EAC;if(n===$a)return s.COMPRESSED_RG11_EAC;if(n===Gu)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Wu||n===Xu||n===qu||n===Yu||n===Zu||n===Ju||n===ju||n===Ku||n===Qu||n===$u||n===eh||n===th||n===nh||n===ih)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Wu)return o===Ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Xu)return o===Ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===qu)return o===Ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Yu)return o===Ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Zu)return o===Ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ju)return o===Ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ju)return o===Ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ku)return o===Ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Qu)return o===Ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===$u)return o===Ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===eh)return o===Ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===th)return o===Ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===nh)return o===Ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ih)return o===Ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===rh||n===sh||n===oh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===rh)return o===Ht?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===sh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===oh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ah||n===lh||n===el||n===ch)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===ah)return s.COMPRESSED_RED_RGTC1_EXT;if(n===lh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===el)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ch)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ho?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const yR=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,SR=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class MR{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new um(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new mi({vertexShader:yR,fragmentShader:SR,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new an(new Ko(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class wR extends Gi{constructor(e,t){super();const n=this;let i=null,s=1,o=null,c="local-floor",u=1,h=null,f=null,p=null,m=null,g=null,x=null;const w=typeof XRWebGLBinding<"u",y=new MR,v={},M=t.getContextAttributes();let E=null,b=null;const L=[],R=[],U=new pe;let A=null;const P=new hn;P.viewport=new Rt;const O=new hn;O.viewport=new Rt;const D=[P,O],V=new fy;let K=null,te=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(oe){let we=L[oe];return we===void 0&&(we=new Mu,L[oe]=we),we.getTargetRaySpace()},this.getControllerGrip=function(oe){let we=L[oe];return we===void 0&&(we=new Mu,L[oe]=we),we.getGripSpace()},this.getHand=function(oe){let we=L[oe];return we===void 0&&(we=new Mu,L[oe]=we),we.getHandSpace()};function H(oe){const we=R.indexOf(oe.inputSource);if(we===-1)return;const Se=L[we];Se!==void 0&&(Se.update(oe.inputSource,oe.frame,h||o),Se.dispatchEvent({type:oe.type,data:oe.inputSource}))}function Z(){i.removeEventListener("select",H),i.removeEventListener("selectstart",H),i.removeEventListener("selectend",H),i.removeEventListener("squeeze",H),i.removeEventListener("squeezestart",H),i.removeEventListener("squeezeend",H),i.removeEventListener("end",Z),i.removeEventListener("inputsourceschange",J);for(let oe=0;oe<L.length;oe++){const we=R[oe];we!==null&&(R[oe]=null,L[oe].disconnect(we))}K=null,te=null,y.reset();for(const oe in v)delete v[oe];e.setRenderTarget(E),g=null,m=null,p=null,i=null,b=null,Qe.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(U.width,U.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(oe){s=oe,n.isPresenting===!0&&Oe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(oe){c=oe,n.isPresenting===!0&&Oe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||o},this.setReferenceSpace=function(oe){h=oe},this.getBaseLayer=function(){return m!==null?m:g},this.getBinding=function(){return p===null&&w&&(p=new XRWebGLBinding(i,t)),p},this.getFrame=function(){return x},this.getSession=function(){return i},this.setSession=async function(oe){if(i=oe,i!==null){if(E=e.getRenderTarget(),i.addEventListener("select",H),i.addEventListener("selectstart",H),i.addEventListener("selectend",H),i.addEventListener("squeeze",H),i.addEventListener("squeezestart",H),i.addEventListener("squeezeend",H),i.addEventListener("end",Z),i.addEventListener("inputsourceschange",J),M.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(U),w&&"createProjectionLayer"in XRWebGLBinding.prototype){let Se=null,$e=null,Ke=null;M.depth&&(Ke=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Se=M.stencil?Kr:hr,$e=M.stencil?Ho:Ri);const Te={colorFormat:t.RGBA8,depthFormat:Ke,scaleFactor:s};p=this.getBinding(),m=p.createProjectionLayer(Te),i.updateRenderState({layers:[m]}),e.setPixelRatio(1),e.setSize(m.textureWidth,m.textureHeight,!1),b=new pi(m.textureWidth,m.textureHeight,{format:Nn,type:Vn,depthTexture:new Xs(m.textureWidth,m.textureHeight,$e,void 0,void 0,void 0,void 0,void 0,void 0,Se),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}else{const Se={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};g=new XRWebGLLayer(i,t,Se),i.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),b=new pi(g.framebufferWidth,g.framebufferHeight,{format:Nn,type:Vn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(u),h=null,o=await i.requestReferenceSpace(c),Qe.setContext(i),Qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function J(oe){for(let we=0;we<oe.removed.length;we++){const Se=oe.removed[we],$e=R.indexOf(Se);$e>=0&&(R[$e]=null,L[$e].disconnect(Se))}for(let we=0;we<oe.added.length;we++){const Se=oe.added[we];let $e=R.indexOf(Se);if($e===-1){for(let Te=0;Te<L.length;Te++)if(Te>=R.length){R.push(Se),$e=Te;break}else if(R[Te]===null){R[Te]=Se,$e=Te;break}if($e===-1)break}const Ke=L[$e];Ke&&Ke.connect(Se)}}const z=new F,W=new F;function q(oe,we,Se){z.setFromMatrixPosition(we.matrixWorld),W.setFromMatrixPosition(Se.matrixWorld);const $e=z.distanceTo(W),Ke=we.projectionMatrix.elements,Te=Se.projectionMatrix.elements,pt=Ke[14]/(Ke[10]-1),Ze=Ke[14]/(Ke[10]+1),de=(Ke[9]+1)/Ke[5],xe=(Ke[9]-1)/Ke[5],me=(Ke[8]-1)/Ke[0],Ue=(Te[8]+1)/Te[0],De=pt*me,at=pt*Ue,k=$e/(-me+Ue),ft=k*-me;if(we.matrixWorld.decompose(oe.position,oe.quaternion,oe.scale),oe.translateX(ft),oe.translateZ(k),oe.matrixWorld.compose(oe.position,oe.quaternion,oe.scale),oe.matrixWorldInverse.copy(oe.matrixWorld).invert(),Ke[10]===-1)oe.projectionMatrix.copy(we.projectionMatrix),oe.projectionMatrixInverse.copy(we.projectionMatrixInverse);else{const tt=pt+k,ct=Ze+k,ye=De-ft,Pt=at+($e-ft),N=de*Ze/ct*tt,C=xe*Ze/ct*tt;oe.projectionMatrix.makePerspective(ye,Pt,N,C,tt,ct),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert()}}function re(oe,we){we===null?oe.matrixWorld.copy(oe.matrix):oe.matrixWorld.multiplyMatrices(we.matrixWorld,oe.matrix),oe.matrixWorldInverse.copy(oe.matrixWorld).invert()}this.updateCamera=function(oe){if(i===null)return;let we=oe.near,Se=oe.far;y.texture!==null&&(y.depthNear>0&&(we=y.depthNear),y.depthFar>0&&(Se=y.depthFar)),V.near=O.near=P.near=we,V.far=O.far=P.far=Se,(K!==V.near||te!==V.far)&&(i.updateRenderState({depthNear:V.near,depthFar:V.far}),K=V.near,te=V.far),V.layers.mask=oe.layers.mask|6,P.layers.mask=V.layers.mask&-5,O.layers.mask=V.layers.mask&-3;const $e=oe.parent,Ke=V.cameras;re(V,$e);for(let Te=0;Te<Ke.length;Te++)re(Ke[Te],$e);Ke.length===2?q(V,P,O):V.projectionMatrix.copy(P.projectionMatrix),he(oe,V,$e)};function he(oe,we,Se){Se===null?oe.matrix.copy(we.matrixWorld):(oe.matrix.copy(Se.matrixWorld),oe.matrix.invert(),oe.matrix.multiply(we.matrixWorld)),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.updateMatrixWorld(!0),oe.projectionMatrix.copy(we.projectionMatrix),oe.projectionMatrixInverse.copy(we.projectionMatrixInverse),oe.isPerspectiveCamera&&(oe.fov=Go*2*Math.atan(1/oe.projectionMatrix.elements[5]),oe.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(m===null&&g===null))return u},this.setFoveation=function(oe){u=oe,m!==null&&(m.fixedFoveation=oe),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=oe)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(V)},this.getCameraTexture=function(oe){return v[oe]};let Ie=null;function nt(oe,we){if(f=we.getViewerPose(h||o),x=we,f!==null){const Se=f.views;g!==null&&(e.setRenderTargetFramebuffer(b,g.framebuffer),e.setRenderTarget(b));let $e=!1;Se.length!==V.cameras.length&&(V.cameras.length=0,$e=!0);for(let Ze=0;Ze<Se.length;Ze++){const de=Se[Ze];let xe=null;if(g!==null)xe=g.getViewport(de);else{const Ue=p.getViewSubImage(m,de);xe=Ue.viewport,Ze===0&&(e.setRenderTargetTextures(b,Ue.colorTexture,Ue.depthStencilTexture),e.setRenderTarget(b))}let me=D[Ze];me===void 0&&(me=new hn,me.layers.enable(Ze),me.viewport=new Rt,D[Ze]=me),me.matrix.fromArray(de.transform.matrix),me.matrix.decompose(me.position,me.quaternion,me.scale),me.projectionMatrix.fromArray(de.projectionMatrix),me.projectionMatrixInverse.copy(me.projectionMatrix).invert(),me.viewport.set(xe.x,xe.y,xe.width,xe.height),Ze===0&&(V.matrix.copy(me.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),$e===!0&&V.cameras.push(me)}const Ke=i.enabledFeatures;if(Ke&&Ke.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&w){p=n.getBinding();const Ze=p.getDepthInformation(Se[0]);Ze&&Ze.isValid&&Ze.texture&&y.init(Ze,i.renderState)}if(Ke&&Ke.includes("camera-access")&&w){e.state.unbindTexture(),p=n.getBinding();for(let Ze=0;Ze<Se.length;Ze++){const de=Se[Ze].camera;if(de){let xe=v[de];xe||(xe=new um,v[de]=xe);const me=p.getCameraImage(de);xe.sourceTexture=me}}}}for(let Se=0;Se<L.length;Se++){const $e=R[Se],Ke=L[Se];$e!==null&&Ke!==void 0&&Ke.update($e,we,h||o)}Ie&&Ie(oe,we),we.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:we}),x=null}const Qe=new Sy;Qe.setAnimationLoop(nt),this.setAnimationLoop=function(oe){Ie=oe},this.dispose=function(){}}}const ER=new dt,Cy=new vt;Cy.set(-1,0,0,0,1,0,0,0,1);function bR(r,e){function t(y,v){y.matrixAutoUpdate===!0&&y.updateMatrix(),v.value.copy(y.matrix)}function n(y,v){v.color.getRGB(y.fogColor.value,Gx(r)),v.isFog?(y.fogNear.value=v.near,y.fogFar.value=v.far):v.isFogExp2&&(y.fogDensity.value=v.density)}function i(y,v,M,E,b){v.isNodeMaterial?v.uniformsNeedUpdate=!1:v.isMeshBasicMaterial?s(y,v):v.isMeshLambertMaterial?(s(y,v),v.envMap&&(y.envMapIntensity.value=v.envMapIntensity)):v.isMeshToonMaterial?(s(y,v),p(y,v)):v.isMeshPhongMaterial?(s(y,v),f(y,v),v.envMap&&(y.envMapIntensity.value=v.envMapIntensity)):v.isMeshStandardMaterial?(s(y,v),m(y,v),v.isMeshPhysicalMaterial&&g(y,v,b)):v.isMeshMatcapMaterial?(s(y,v),x(y,v)):v.isMeshDepthMaterial?s(y,v):v.isMeshDistanceMaterial?(s(y,v),w(y,v)):v.isMeshNormalMaterial?s(y,v):v.isLineBasicMaterial?(o(y,v),v.isLineDashedMaterial&&c(y,v)):v.isPointsMaterial?u(y,v,M,E):v.isSpriteMaterial?h(y,v):v.isShadowMaterial?(y.color.value.copy(v.color),y.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function s(y,v){y.opacity.value=v.opacity,v.color&&y.diffuse.value.copy(v.color),v.emissive&&y.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(y.map.value=v.map,t(v.map,y.mapTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,t(v.alphaMap,y.alphaMapTransform)),v.bumpMap&&(y.bumpMap.value=v.bumpMap,t(v.bumpMap,y.bumpMapTransform),y.bumpScale.value=v.bumpScale,v.side===Wn&&(y.bumpScale.value*=-1)),v.normalMap&&(y.normalMap.value=v.normalMap,t(v.normalMap,y.normalMapTransform),y.normalScale.value.copy(v.normalScale),v.side===Wn&&y.normalScale.value.negate()),v.displacementMap&&(y.displacementMap.value=v.displacementMap,t(v.displacementMap,y.displacementMapTransform),y.displacementScale.value=v.displacementScale,y.displacementBias.value=v.displacementBias),v.emissiveMap&&(y.emissiveMap.value=v.emissiveMap,t(v.emissiveMap,y.emissiveMapTransform)),v.specularMap&&(y.specularMap.value=v.specularMap,t(v.specularMap,y.specularMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest);const M=e.get(v),E=M.envMap,b=M.envMapRotation;E&&(y.envMap.value=E,y.envMapRotation.value.setFromMatrix4(ER.makeRotationFromEuler(b)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&y.envMapRotation.value.premultiply(Cy),y.reflectivity.value=v.reflectivity,y.ior.value=v.ior,y.refractionRatio.value=v.refractionRatio),v.lightMap&&(y.lightMap.value=v.lightMap,y.lightMapIntensity.value=v.lightMapIntensity,t(v.lightMap,y.lightMapTransform)),v.aoMap&&(y.aoMap.value=v.aoMap,y.aoMapIntensity.value=v.aoMapIntensity,t(v.aoMap,y.aoMapTransform))}function o(y,v){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,v.map&&(y.map.value=v.map,t(v.map,y.mapTransform))}function c(y,v){y.dashSize.value=v.dashSize,y.totalSize.value=v.dashSize+v.gapSize,y.scale.value=v.scale}function u(y,v,M,E){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,y.size.value=v.size*M,y.scale.value=E*.5,v.map&&(y.map.value=v.map,t(v.map,y.uvTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,t(v.alphaMap,y.alphaMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest)}function h(y,v){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,y.rotation.value=v.rotation,v.map&&(y.map.value=v.map,t(v.map,y.mapTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,t(v.alphaMap,y.alphaMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest)}function f(y,v){y.specular.value.copy(v.specular),y.shininess.value=Math.max(v.shininess,1e-4)}function p(y,v){v.gradientMap&&(y.gradientMap.value=v.gradientMap)}function m(y,v){y.metalness.value=v.metalness,v.metalnessMap&&(y.metalnessMap.value=v.metalnessMap,t(v.metalnessMap,y.metalnessMapTransform)),y.roughness.value=v.roughness,v.roughnessMap&&(y.roughnessMap.value=v.roughnessMap,t(v.roughnessMap,y.roughnessMapTransform)),v.envMap&&(y.envMapIntensity.value=v.envMapIntensity)}function g(y,v,M){y.ior.value=v.ior,v.sheen>0&&(y.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),y.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(y.sheenColorMap.value=v.sheenColorMap,t(v.sheenColorMap,y.sheenColorMapTransform)),v.sheenRoughnessMap&&(y.sheenRoughnessMap.value=v.sheenRoughnessMap,t(v.sheenRoughnessMap,y.sheenRoughnessMapTransform))),v.clearcoat>0&&(y.clearcoat.value=v.clearcoat,y.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(y.clearcoatMap.value=v.clearcoatMap,t(v.clearcoatMap,y.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,t(v.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(y.clearcoatNormalMap.value=v.clearcoatNormalMap,t(v.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===Wn&&y.clearcoatNormalScale.value.negate())),v.dispersion>0&&(y.dispersion.value=v.dispersion),v.iridescence>0&&(y.iridescence.value=v.iridescence,y.iridescenceIOR.value=v.iridescenceIOR,y.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(y.iridescenceMap.value=v.iridescenceMap,t(v.iridescenceMap,y.iridescenceMapTransform)),v.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=v.iridescenceThicknessMap,t(v.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),v.transmission>0&&(y.transmission.value=v.transmission,y.transmissionSamplerMap.value=M.texture,y.transmissionSamplerSize.value.set(M.width,M.height),v.transmissionMap&&(y.transmissionMap.value=v.transmissionMap,t(v.transmissionMap,y.transmissionMapTransform)),y.thickness.value=v.thickness,v.thicknessMap&&(y.thicknessMap.value=v.thicknessMap,t(v.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=v.attenuationDistance,y.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(y.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(y.anisotropyMap.value=v.anisotropyMap,t(v.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=v.specularIntensity,y.specularColor.value.copy(v.specularColor),v.specularColorMap&&(y.specularColorMap.value=v.specularColorMap,t(v.specularColorMap,y.specularColorMapTransform)),v.specularIntensityMap&&(y.specularIntensityMap.value=v.specularIntensityMap,t(v.specularIntensityMap,y.specularIntensityMapTransform))}function x(y,v){v.matcap&&(y.matcap.value=v.matcap)}function w(y,v){const M=e.get(v).light;y.referencePosition.value.setFromMatrixPosition(M.matrixWorld),y.nearDistance.value=M.shadow.camera.near,y.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function TR(r,e,t,n){let i={},s={},o=[];const c=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function u(M,E){const b=E.program;n.uniformBlockBinding(M,b)}function h(M,E){let b=i[M.id];b===void 0&&(x(M),b=f(M),i[M.id]=b,M.addEventListener("dispose",y));const L=E.program;n.updateUBOMapping(M,L);const R=e.render.frame;s[M.id]!==R&&(m(M),s[M.id]=R)}function f(M){const E=p();M.__bindingPointIndex=E;const b=r.createBuffer(),L=M.__size,R=M.usage;return r.bindBuffer(r.UNIFORM_BUFFER,b),r.bufferData(r.UNIFORM_BUFFER,L,R),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,E,b),b}function p(){for(let M=0;M<c;M++)if(o.indexOf(M)===-1)return o.push(M),M;return rt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(M){const E=i[M.id],b=M.uniforms,L=M.__cache;r.bindBuffer(r.UNIFORM_BUFFER,E);for(let R=0,U=b.length;R<U;R++){const A=Array.isArray(b[R])?b[R]:[b[R]];for(let P=0,O=A.length;P<O;P++){const D=A[P];if(g(D,R,P,L)===!0){const V=D.__offset,K=Array.isArray(D.value)?D.value:[D.value];let te=0;for(let H=0;H<K.length;H++){const Z=K[H],J=w(Z);typeof Z=="number"||typeof Z=="boolean"?(D.__data[0]=Z,r.bufferSubData(r.UNIFORM_BUFFER,V+te,D.__data)):Z.isMatrix3?(D.__data[0]=Z.elements[0],D.__data[1]=Z.elements[1],D.__data[2]=Z.elements[2],D.__data[3]=0,D.__data[4]=Z.elements[3],D.__data[5]=Z.elements[4],D.__data[6]=Z.elements[5],D.__data[7]=0,D.__data[8]=Z.elements[6],D.__data[9]=Z.elements[7],D.__data[10]=Z.elements[8],D.__data[11]=0):ArrayBuffer.isView(Z)?D.__data.set(new Z.constructor(Z.buffer,Z.byteOffset,D.__data.length)):(Z.toArray(D.__data,te),te+=J.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,V,D.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function g(M,E,b,L){const R=M.value,U=E+"_"+b;if(L[U]===void 0)return typeof R=="number"||typeof R=="boolean"?L[U]=R:ArrayBuffer.isView(R)?L[U]=R.slice():L[U]=R.clone(),!0;{const A=L[U];if(typeof R=="number"||typeof R=="boolean"){if(A!==R)return L[U]=R,!0}else{if(ArrayBuffer.isView(R))return!0;if(A.equals(R)===!1)return A.copy(R),!0}}return!1}function x(M){const E=M.uniforms;let b=0;const L=16;for(let U=0,A=E.length;U<A;U++){const P=Array.isArray(E[U])?E[U]:[E[U]];for(let O=0,D=P.length;O<D;O++){const V=P[O],K=Array.isArray(V.value)?V.value:[V.value];for(let te=0,H=K.length;te<H;te++){const Z=K[te],J=w(Z),z=b%L,W=z%J.boundary,q=z+W;b+=W,q!==0&&L-q<J.storage&&(b+=L-q),V.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=b,b+=J.storage}}}const R=b%L;return R>0&&(b+=L-R),M.__size=b,M.__cache={},this}function w(M){const E={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(E.boundary=4,E.storage=4):M.isVector2?(E.boundary=8,E.storage=8):M.isVector3||M.isColor?(E.boundary=16,E.storage=12):M.isVector4?(E.boundary=16,E.storage=16):M.isMatrix3?(E.boundary=48,E.storage=48):M.isMatrix4?(E.boundary=64,E.storage=64):M.isTexture?Oe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(E.boundary=16,E.storage=M.byteLength):Oe("WebGLRenderer: Unsupported uniform value type.",M),E}function y(M){const E=M.target;E.removeEventListener("dispose",y);const b=o.indexOf(E.__bindingPointIndex);o.splice(b,1),r.deleteBuffer(i[E.id]),delete i[E.id],delete s[E.id]}function v(){for(const M in i)r.deleteBuffer(i[M]);o=[],i={},s={}}return{bind:u,update:h,dispose:v}}const AR=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let nr=null;function CR(){return nr===null&&(nr=new Vi(AR,16,16,ts,ur),nr.name="DFG_LUT",nr.minFilter=Yt,nr.magFilter=Yt,nr.wrapS=ti,nr.wrapT=ti,nr.generateMipmaps=!1,nr.needsUpdate=!0),nr}class Ry{constructor(e={}){const{canvas:t=_x(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:c=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:h=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:m=!1,outputBufferType:g=Vn}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=o;const w=g,y=new Set([Ch,Ah,vl]),v=new Set([Vn,Ri,Vo,Ho,Eh,bh]),M=new Uint32Array(4),E=new Int32Array(4),b=new F;let L=null,R=null;const U=[],A=[];let P=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ci,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const O=this;let D=!1,V=null;this._outputColorSpace=$n;let K=0,te=0,H=null,Z=-1,J=null;const z=new Rt,W=new Rt;let q=null;const re=new Ye(0);let he=0,Ie=t.width,nt=t.height,Qe=1,oe=null,we=null;const Se=new Rt(0,0,Ie,nt),$e=new Rt(0,0,Ie,nt);let Ke=!1;const Te=new jo;let pt=!1,Ze=!1;const de=new dt,xe=new F,me=new Rt,Ue={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let De=!1;function at(){return H===null?Qe:1}let k=n;function ft(I,Y){return t.getContext(I,Y)}try{const I={alpha:!0,depth:i,stencil:s,antialias:c,premultipliedAlpha:u,preserveDrawingBuffer:h,powerPreference:f,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${gl}`),t.addEventListener("webglcontextlost",_e,!1),t.addEventListener("webglcontextrestored",it,!1),t.addEventListener("webglcontextcreationerror",_t,!1),k===null){const Y="webgl2";if(k=ft(Y,I),k===null)throw ft(Y)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(I){throw rt("WebGLRenderer: "+I.message),I}let tt,ct,ye,Pt,N,C,Q,ue,ge,Ee,Pe,ae,fe,Ve,Je,Le,Ce,mt,yt,It,G,Re,ce;function Ge(){tt=new RA(k),tt.init(),G=new Ay(k,tt),ct=new SA(k,tt,e,G),ye=new vR(k,tt),ct.reversedDepthBuffer&&m&&ye.buffers.depth.setReversed(!0),Pt=new LA(k),N=new rR,C=new xR(k,tt,ye,N,ct,G,Pt),Q=new CA(O),ue=new FE(k),Re=new xA(k,ue),ge=new PA(k,ue,Pt,Re),Ee=new NA(k,ge,ue,Re,Pt),mt=new DA(k,ct,C),Je=new MA(N),Pe=new iR(O,Q,tt,ct,Re,Je),ae=new bR(O,N),fe=new oR,Ve=new fR(tt),Ce=new vA(O,Q,ye,Ee,x,u),Le=new _R(O,Ee,ct),ce=new TR(k,Pt,ct,ye),yt=new yA(k,tt,Pt),It=new IA(k,tt,Pt),Pt.programs=Pe.programs,O.capabilities=ct,O.extensions=tt,O.properties=N,O.renderLists=fe,O.shadowMap=Le,O.state=ye,O.info=Pt}Ge(),w!==Vn&&(P=new FA(w,t.width,t.height,i,s));const Ne=new wR(O,k);this.xr=Ne,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const I=tt.get("WEBGL_lose_context");I&&I.loseContext()},this.forceContextRestore=function(){const I=tt.get("WEBGL_lose_context");I&&I.restoreContext()},this.getPixelRatio=function(){return Qe},this.setPixelRatio=function(I){I!==void 0&&(Qe=I,this.setSize(Ie,nt,!1))},this.getSize=function(I){return I.set(Ie,nt)},this.setSize=function(I,Y,ie=!0){if(Ne.isPresenting){Oe("WebGLRenderer: Can't change size while VR device is presenting.");return}Ie=I,nt=Y,t.width=Math.floor(I*Qe),t.height=Math.floor(Y*Qe),ie===!0&&(t.style.width=I+"px",t.style.height=Y+"px"),P!==null&&P.setSize(t.width,t.height),this.setViewport(0,0,I,Y)},this.getDrawingBufferSize=function(I){return I.set(Ie*Qe,nt*Qe).floor()},this.setDrawingBufferSize=function(I,Y,ie){Ie=I,nt=Y,Qe=ie,t.width=Math.floor(I*ie),t.height=Math.floor(Y*ie),this.setViewport(0,0,I,Y)},this.setEffects=function(I){if(w===Vn){rt("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(I){for(let Y=0;Y<I.length;Y++)if(I[Y].isOutputPass===!0){Oe("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(I||[])},this.getCurrentViewport=function(I){return I.copy(z)},this.getViewport=function(I){return I.copy(Se)},this.setViewport=function(I,Y,ie,ee){I.isVector4?Se.set(I.x,I.y,I.z,I.w):Se.set(I,Y,ie,ee),ye.viewport(z.copy(Se).multiplyScalar(Qe).round())},this.getScissor=function(I){return I.copy($e)},this.setScissor=function(I,Y,ie,ee){I.isVector4?$e.set(I.x,I.y,I.z,I.w):$e.set(I,Y,ie,ee),ye.scissor(W.copy($e).multiplyScalar(Qe).round())},this.getScissorTest=function(){return Ke},this.setScissorTest=function(I){ye.setScissorTest(Ke=I)},this.setOpaqueSort=function(I){oe=I},this.setTransparentSort=function(I){we=I},this.getClearColor=function(I){return I.copy(Ce.getClearColor())},this.setClearColor=function(){Ce.setClearColor(...arguments)},this.getClearAlpha=function(){return Ce.getClearAlpha()},this.setClearAlpha=function(){Ce.setClearAlpha(...arguments)},this.clear=function(I=!0,Y=!0,ie=!0){let ee=0;if(I){let $=!1;if(H!==null){const ve=H.texture.format;$=y.has(ve)}if($){const ve=H.texture.type,Me=v.has(ve),Fe=Ce.getClearColor(),ke=Ce.getClearAlpha(),We=Fe.r,ut=Fe.g,gt=Fe.b;Me?(M[0]=We,M[1]=ut,M[2]=gt,M[3]=ke,k.clearBufferuiv(k.COLOR,0,M)):(E[0]=We,E[1]=ut,E[2]=gt,E[3]=ke,k.clearBufferiv(k.COLOR,0,E))}else ee|=k.COLOR_BUFFER_BIT}Y&&(ee|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ie&&(ee|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ee!==0&&k.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(I){I.setRenderer(this),V=I},this.dispose=function(){t.removeEventListener("webglcontextlost",_e,!1),t.removeEventListener("webglcontextrestored",it,!1),t.removeEventListener("webglcontextcreationerror",_t,!1),Ce.dispose(),fe.dispose(),Ve.dispose(),N.dispose(),Q.dispose(),Ee.dispose(),Re.dispose(),ce.dispose(),Pe.dispose(),Ne.dispose(),Ne.removeEventListener("sessionstart",Lr),Ne.removeEventListener("sessionend",Cl),dr.stop()};function _e(I){I.preventDefault(),al("WebGLRenderer: Context Lost."),D=!0}function it(){al("WebGLRenderer: Context Restored."),D=!1;const I=Pt.autoReset,Y=Le.enabled,ie=Le.autoUpdate,ee=Le.needsUpdate,$=Le.type;Ge(),Pt.autoReset=I,Le.enabled=Y,Le.autoUpdate=ie,Le.needsUpdate=ee,Le.type=$}function _t(I){rt("WebGLRenderer: A WebGL context could not be created. Reason: ",I.statusMessage)}function Kt(I){const Y=I.target;Y.removeEventListener("dispose",Kt),kt(Y)}function kt(I){Ii(I),N.remove(I)}function Ii(I){const Y=N.get(I).programs;Y!==void 0&&(Y.forEach(function(ie){Pe.releaseProgram(ie)}),I.isShaderMaterial&&Pe.releaseShaderCache(I))}this.renderBufferDirect=function(I,Y,ie,ee,$,ve){Y===null&&(Y=Ue);const Me=$.isMesh&&$.matrixWorld.determinant()<0,Fe=sf(I,Y,ie,ee,$);ye.setMaterial(ee,Me);let ke=ie.index,We=1;if(ee.wireframe===!0){if(ke=ge.getWireframeAttribute(ie),ke===void 0)return;We=2}const ut=ie.drawRange,gt=ie.attributes.position;let qe=ut.start*We,Lt=(ut.start+ut.count)*We;ve!==null&&(qe=Math.max(qe,ve.start*We),Lt=Math.min(Lt,(ve.start+ve.count)*We)),ke!==null?(qe=Math.max(qe,0),Lt=Math.min(Lt,ke.count)):gt!=null&&(qe=Math.max(qe,0),Lt=Math.min(Lt,gt.count));const Zt=Lt-qe;if(Zt<0||Zt===1/0)return;Re.setup($,ee,Fe,ie,ke);let Xt,Ut=yt;if(ke!==null&&(Xt=ue.get(ke),Ut=It,Ut.setIndex(Xt)),$.isMesh)ee.wireframe===!0?(ye.setLineWidth(ee.wireframeLinewidth*at()),Ut.setMode(k.LINES)):Ut.setMode(k.TRIANGLES);else if($.isLine){let fn=ee.linewidth;fn===void 0&&(fn=1),ye.setLineWidth(fn*at()),$.isLineSegments?Ut.setMode(k.LINES):$.isLineLoop?Ut.setMode(k.LINE_LOOP):Ut.setMode(k.LINE_STRIP)}else $.isPoints?Ut.setMode(k.POINTS):$.isSprite&&Ut.setMode(k.TRIANGLES);if($.isBatchedMesh)if(tt.get("WEBGL_multi_draw"))Ut.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const fn=$._multiDrawStarts,Be=$._multiDrawCounts,Un=$._multiDrawCount,Ct=ke?ue.get(ke).bytesPerElement:1,Yn=N.get(ee).currentProgram.getUniforms();for(let Fn=0;Fn<Un;Fn++)Yn.setValue(k,"_gl_DrawID",Fn),Ut.render(fn[Fn]/Ct,Be[Fn])}else if($.isInstancedMesh)Ut.renderInstances(qe,Zt,$.count);else if(ie.isInstancedBufferGeometry){const fn=ie._maxInstanceCount!==void 0?ie._maxInstanceCount:1/0,Be=Math.min(ie.instanceCount,fn);Ut.renderInstances(qe,Zt,Be)}else Ut.render(qe,Zt)};function ii(I,Y,ie){I.transparent===!0&&I.side===zi&&I.forceSinglePass===!1?(I.side=Wn,I.needsUpdate=!0,cs(I,Y,ie),I.side=Rr,I.needsUpdate=!0,cs(I,Y,ie),I.side=zi):cs(I,Y,ie)}this.compile=function(I,Y,ie=null){ie===null&&(ie=I),R=Ve.get(ie),R.init(Y),A.push(R),ie.traverseVisible(function($){$.isLight&&$.layers.test(Y.layers)&&(R.pushLight($),$.castShadow&&R.pushShadow($))}),I!==ie&&I.traverseVisible(function($){$.isLight&&$.layers.test(Y.layers)&&(R.pushLight($),$.castShadow&&R.pushShadow($))}),R.setupLights();const ee=new Set;return I.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const ve=$.material;if(ve)if(Array.isArray(ve))for(let Me=0;Me<ve.length;Me++){const Fe=ve[Me];ii(Fe,ie,$),ee.add(Fe)}else ii(ve,ie,$),ee.add(ve)}),R=A.pop(),ee},this.compileAsync=function(I,Y,ie=null){const ee=this.compile(I,Y,ie);return new Promise($=>{function ve(){if(ee.forEach(function(Me){N.get(Me).currentProgram.isReady()&&ee.delete(Me)}),ee.size===0){$(I);return}setTimeout(ve,10)}tt.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let ls=null;function nf(I){ls&&ls(I)}function Lr(){dr.stop()}function Cl(){dr.start()}const dr=new Sy;dr.setAnimationLoop(nf),typeof self<"u"&&dr.setContext(self),this.setAnimationLoop=function(I){ls=I,Ne.setAnimationLoop(I),I===null?dr.stop():dr.start()},Ne.addEventListener("sessionstart",Lr),Ne.addEventListener("sessionend",Cl),this.render=function(I,Y){if(Y!==void 0&&Y.isCamera!==!0){rt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;V!==null&&V.renderStart(I,Y);const ie=Ne.enabled===!0&&Ne.isPresenting===!0,ee=P!==null&&(H===null||ie)&&P.begin(O,H);if(I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),Ne.enabled===!0&&Ne.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(Ne.cameraAutoUpdate===!0&&Ne.updateCamera(Y),Y=Ne.getCamera()),I.isScene===!0&&I.onBeforeRender(O,I,Y,H),R=Ve.get(I,A.length),R.init(Y),R.state.textureUnits=C.getTextureUnits(),A.push(R),de.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),Te.setFromProjectionMatrix(de,hi,Y.reversedDepth),Ze=this.localClippingEnabled,pt=Je.init(this.clippingPlanes,Ze),L=fe.get(I,U.length),L.init(),U.push(L),Ne.enabled===!0&&Ne.isPresenting===!0){const Me=O.xr.getDepthSensingMesh();Me!==null&&ea(Me,Y,-1/0,O.sortObjects)}ea(I,Y,0,O.sortObjects),L.finish(),O.sortObjects===!0&&L.sort(oe,we),De=Ne.enabled===!1||Ne.isPresenting===!1||Ne.hasDepthSensing()===!1,De&&Ce.addToRenderList(L,I),this.info.render.frame++,pt===!0&&Je.beginShadows();const $=R.state.shadowsArray;if(Le.render($,I,Y),pt===!0&&Je.endShadows(),this.info.autoReset===!0&&this.info.reset(),(ee&&P.hasRenderPass())===!1){const Me=L.opaque,Fe=L.transmissive;if(R.setupLights(),Y.isArrayCamera){const ke=Y.cameras;if(Fe.length>0)for(let We=0,ut=ke.length;We<ut;We++){const gt=ke[We];Pl(Me,Fe,I,gt)}De&&Ce.render(I);for(let We=0,ut=ke.length;We<ut;We++){const gt=ke[We];Rl(L,I,gt,gt.viewport)}}else Fe.length>0&&Pl(Me,Fe,I,Y),De&&Ce.render(I),Rl(L,I,Y)}H!==null&&te===0&&(C.updateMultisampleRenderTarget(H),C.updateRenderTargetMipmap(H)),ee&&P.end(O),I.isScene===!0&&I.onAfterRender(O,I,Y),Re.resetDefaultState(),Z=-1,J=null,A.pop(),A.length>0?(R=A[A.length-1],C.setTextureUnits(R.state.textureUnits),pt===!0&&Je.setGlobalState(O.clippingPlanes,R.state.camera)):R=null,U.pop(),U.length>0?L=U[U.length-1]:L=null,V!==null&&V.renderEnd()};function ea(I,Y,ie,ee){if(I.visible===!1)return;if(I.layers.test(Y.layers)){if(I.isGroup)ie=I.renderOrder;else if(I.isLOD)I.autoUpdate===!0&&I.update(Y);else if(I.isLightProbeGrid)R.pushLightProbeGrid(I);else if(I.isLight)R.pushLight(I),I.castShadow&&R.pushShadow(I);else if(I.isSprite){if(!I.frustumCulled||Te.intersectsSprite(I)){ee&&me.setFromMatrixPosition(I.matrixWorld).applyMatrix4(de);const Me=Ee.update(I),Fe=I.material;Fe.visible&&L.push(I,Me,Fe,ie,me.z,null)}}else if((I.isMesh||I.isLine||I.isPoints)&&(!I.frustumCulled||Te.intersectsObject(I))){const Me=Ee.update(I),Fe=I.material;if(ee&&(I.boundingSphere!==void 0?(I.boundingSphere===null&&I.computeBoundingSphere(),me.copy(I.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),me.copy(Me.boundingSphere.center)),me.applyMatrix4(I.matrixWorld).applyMatrix4(de)),Array.isArray(Fe)){const ke=Me.groups;for(let We=0,ut=ke.length;We<ut;We++){const gt=ke[We],qe=Fe[gt.materialIndex];qe&&qe.visible&&L.push(I,Me,qe,ie,me.z,gt)}}else Fe.visible&&L.push(I,Me,Fe,ie,me.z,null)}}const ve=I.children;for(let Me=0,Fe=ve.length;Me<Fe;Me++)ea(ve[Me],Y,ie,ee)}function Rl(I,Y,ie,ee){const{opaque:$,transmissive:ve,transparent:Me}=I;R.setupLightsView(ie),pt===!0&&Je.setGlobalState(O.clippingPlanes,ie),ee&&ye.viewport(z.copy(ee)),$.length>0&&js($,Y,ie),ve.length>0&&js(ve,Y,ie),Me.length>0&&js(Me,Y,ie),ye.buffers.depth.setTest(!0),ye.buffers.depth.setMask(!0),ye.buffers.color.setMask(!0),ye.setPolygonOffset(!1)}function Pl(I,Y,ie,ee){if((ie.isScene===!0?ie.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[ee.id]===void 0){const qe=tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[ee.id]=new pi(1,1,{generateMipmaps:!0,type:qe?ur:Vn,minFilter:or,samples:Math.max(4,ct.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:At.workingColorSpace})}const ve=R.state.transmissionRenderTarget[ee.id],Me=ee.viewport||z;ve.setSize(Me.z*O.transmissionResolutionScale,Me.w*O.transmissionResolutionScale);const Fe=O.getRenderTarget(),ke=O.getActiveCubeFace(),We=O.getActiveMipmapLevel();O.setRenderTarget(ve),O.getClearColor(re),he=O.getClearAlpha(),he<1&&O.setClearColor(16777215,.5),O.clear(),De&&Ce.render(ie);const ut=O.toneMapping;O.toneMapping=Ci;const gt=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),R.setupLightsView(ee),pt===!0&&Je.setGlobalState(O.clippingPlanes,ee),js(I,ie,ee),C.updateMultisampleRenderTarget(ve),C.updateRenderTargetMipmap(ve),tt.has("WEBGL_multisampled_render_to_texture")===!1){let qe=!1;for(let Lt=0,Zt=Y.length;Lt<Zt;Lt++){const Xt=Y[Lt],{object:Ut,geometry:fn,material:Be,group:Un}=Xt;if(Be.side===zi&&Ut.layers.test(ee.layers)){const Ct=Be.side;Be.side=Wn,Be.needsUpdate=!0,Il(Ut,ie,ee,fn,Be,Un),Be.side=Ct,Be.needsUpdate=!0,qe=!0}}qe===!0&&(C.updateMultisampleRenderTarget(ve),C.updateRenderTargetMipmap(ve))}O.setRenderTarget(Fe,ke,We),O.setClearColor(re,he),gt!==void 0&&(ee.viewport=gt),O.toneMapping=ut}function js(I,Y,ie){const ee=Y.isScene===!0?Y.overrideMaterial:null;for(let $=0,ve=I.length;$<ve;$++){const Me=I[$],{object:Fe,geometry:ke,group:We}=Me;let ut=Me.material;ut.allowOverride===!0&&ee!==null&&(ut=ee),Fe.layers.test(ie.layers)&&Il(Fe,Y,ie,ke,ut,We)}}function Il(I,Y,ie,ee,$,ve){I.onBeforeRender(O,Y,ie,ee,$,ve),I.modelViewMatrix.multiplyMatrices(ie.matrixWorldInverse,I.matrixWorld),I.normalMatrix.getNormalMatrix(I.modelViewMatrix),$.onBeforeRender(O,Y,ie,ee,I,ve),$.transparent===!0&&$.side===zi&&$.forceSinglePass===!1?($.side=Wn,$.needsUpdate=!0,O.renderBufferDirect(ie,Y,ee,$,I,ve),$.side=Rr,$.needsUpdate=!0,O.renderBufferDirect(ie,Y,ee,$,I,ve),$.side=zi):O.renderBufferDirect(ie,Y,ee,$,I,ve),I.onAfterRender(O,Y,ie,ee,$,ve)}function cs(I,Y,ie){Y.isScene!==!0&&(Y=Ue);const ee=N.get(I),$=R.state.lights,ve=R.state.shadowsArray,Me=$.state.version,Fe=Pe.getParameters(I,$.state,ve,Y,ie,R.state.lightProbeGridArray),ke=Pe.getProgramCacheKey(Fe);let We=ee.programs;ee.environment=I.isMeshStandardMaterial||I.isMeshLambertMaterial||I.isMeshPhongMaterial?Y.environment:null,ee.fog=Y.fog;const ut=I.isMeshStandardMaterial||I.isMeshLambertMaterial&&!I.envMap||I.isMeshPhongMaterial&&!I.envMap;ee.envMap=Q.get(I.envMap||ee.environment,ut),ee.envMapRotation=ee.environment!==null&&I.envMap===null?Y.environmentRotation:I.envMapRotation,We===void 0&&(I.addEventListener("dispose",Kt),We=new Map,ee.programs=We);let gt=We.get(ke);if(gt!==void 0){if(ee.currentProgram===gt&&ee.lightsStateVersion===Me)return Dl(I,Fe),gt}else Fe.uniforms=Pe.getUniforms(I),V!==null&&I.isNodeMaterial&&V.build(I,ie,Fe),I.onBeforeCompile(Fe,O),gt=Pe.acquireProgram(Fe,ke),We.set(ke,gt),ee.uniforms=Fe.uniforms;const qe=ee.uniforms;return(!I.isShaderMaterial&&!I.isRawShaderMaterial||I.clipping===!0)&&(qe.clippingPlanes=Je.uniform),Dl(I,Fe),ee.needsLights=af(I),ee.lightsStateVersion=Me,ee.needsLights&&(qe.ambientLightColor.value=$.state.ambient,qe.lightProbe.value=$.state.probe,qe.directionalLights.value=$.state.directional,qe.directionalLightShadows.value=$.state.directionalShadow,qe.spotLights.value=$.state.spot,qe.spotLightShadows.value=$.state.spotShadow,qe.rectAreaLights.value=$.state.rectArea,qe.ltc_1.value=$.state.rectAreaLTC1,qe.ltc_2.value=$.state.rectAreaLTC2,qe.pointLights.value=$.state.point,qe.pointLightShadows.value=$.state.pointShadow,qe.hemisphereLights.value=$.state.hemi,qe.directionalShadowMatrix.value=$.state.directionalShadowMatrix,qe.spotLightMatrix.value=$.state.spotLightMatrix,qe.spotLightMap.value=$.state.spotLightMap,qe.pointShadowMatrix.value=$.state.pointShadowMatrix),ee.lightProbeGrid=R.state.lightProbeGridArray.length>0,ee.currentProgram=gt,ee.uniformsList=null,gt}function Ll(I){if(I.uniformsList===null){const Y=I.currentProgram.getUniforms();I.uniformsList=wu.seqWithValue(Y.seq,I.uniforms)}return I.uniformsList}function Dl(I,Y){const ie=N.get(I);ie.outputColorSpace=Y.outputColorSpace,ie.batching=Y.batching,ie.batchingColor=Y.batchingColor,ie.instancing=Y.instancing,ie.instancingColor=Y.instancingColor,ie.instancingMorph=Y.instancingMorph,ie.skinning=Y.skinning,ie.morphTargets=Y.morphTargets,ie.morphNormals=Y.morphNormals,ie.morphColors=Y.morphColors,ie.morphTargetsCount=Y.morphTargetsCount,ie.numClippingPlanes=Y.numClippingPlanes,ie.numIntersection=Y.numClipIntersection,ie.vertexAlphas=Y.vertexAlphas,ie.vertexTangents=Y.vertexTangents,ie.toneMapping=Y.toneMapping}function rf(I,Y){if(I.length===0)return null;if(I.length===1)return I[0].texture!==null?I[0]:null;b.setFromMatrixPosition(Y.matrixWorld);for(let ie=0,ee=I.length;ie<ee;ie++){const $=I[ie];if($.texture!==null&&$.boundingBox.containsPoint(b))return $}return null}function sf(I,Y,ie,ee,$){Y.isScene!==!0&&(Y=Ue),C.resetTextureUnits();const ve=Y.fog,Me=ee.isMeshStandardMaterial||ee.isMeshLambertMaterial||ee.isMeshPhongMaterial?Y.environment:null,Fe=H===null?O.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:At.workingColorSpace,ke=ee.isMeshStandardMaterial||ee.isMeshLambertMaterial&&!ee.envMap||ee.isMeshPhongMaterial&&!ee.envMap,We=Q.get(ee.envMap||Me,ke),ut=ee.vertexColors===!0&&!!ie.attributes.color&&ie.attributes.color.itemSize===4,gt=!!ie.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),qe=!!ie.morphAttributes.position,Lt=!!ie.morphAttributes.normal,Zt=!!ie.morphAttributes.color;let Xt=Ci;ee.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(Xt=O.toneMapping);const Ut=ie.morphAttributes.position||ie.morphAttributes.normal||ie.morphAttributes.color,fn=Ut!==void 0?Ut.length:0,Be=N.get(ee),Un=R.state.lights;if(pt===!0&&(Ze===!0||I!==J)){const Vt=I===J&&ee.id===Z;Je.setState(ee,I,Vt)}let Ct=!1;ee.version===Be.__version?(Be.needsLights&&Be.lightsStateVersion!==Un.state.version||Be.outputColorSpace!==Fe||$.isBatchedMesh&&Be.batching===!1||!$.isBatchedMesh&&Be.batching===!0||$.isBatchedMesh&&Be.batchingColor===!0&&$.colorTexture===null||$.isBatchedMesh&&Be.batchingColor===!1&&$.colorTexture!==null||$.isInstancedMesh&&Be.instancing===!1||!$.isInstancedMesh&&Be.instancing===!0||$.isSkinnedMesh&&Be.skinning===!1||!$.isSkinnedMesh&&Be.skinning===!0||$.isInstancedMesh&&Be.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Be.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Be.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Be.instancingMorph===!1&&$.morphTexture!==null||Be.envMap!==We||ee.fog===!0&&Be.fog!==ve||Be.numClippingPlanes!==void 0&&(Be.numClippingPlanes!==Je.numPlanes||Be.numIntersection!==Je.numIntersection)||Be.vertexAlphas!==ut||Be.vertexTangents!==gt||Be.morphTargets!==qe||Be.morphNormals!==Lt||Be.morphColors!==Zt||Be.toneMapping!==Xt||Be.morphTargetsCount!==fn||!!Be.lightProbeGrid!=R.state.lightProbeGridArray.length>0)&&(Ct=!0):(Ct=!0,Be.__version=ee.version);let Yn=Be.currentProgram;Ct===!0&&(Yn=cs(ee,Y,$),V&&ee.isNodeMaterial&&V.onUpdateProgram(ee,Yn,Be));let Fn=!1,ri=!1,gi=!1;const Ft=Yn.getUniforms(),Qt=Be.uniforms;if(ye.useProgram(Yn.program)&&(Fn=!0,ri=!0,gi=!0),ee.id!==Z&&(Z=ee.id,ri=!0),Be.needsLights){const Vt=rf(R.state.lightProbeGridArray,$);Be.lightProbeGrid!==Vt&&(Be.lightProbeGrid=Vt,ri=!0)}if(Fn||J!==I){ye.buffers.depth.getReversed()&&I.reversedDepth!==!0&&(I._reversedDepth=!0,I.updateProjectionMatrix()),Ft.setValue(k,"projectionMatrix",I.projectionMatrix),Ft.setValue(k,"viewMatrix",I.matrixWorldInverse);const _i=Ft.map.cameraPosition;_i!==void 0&&_i.setValue(k,xe.setFromMatrixPosition(I.matrixWorld)),ct.logarithmicDepthBuffer&&Ft.setValue(k,"logDepthBufFC",2/(Math.log(I.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&Ft.setValue(k,"isOrthographic",I.isOrthographicCamera===!0),J!==I&&(J=I,ri=!0,gi=!0)}if(Be.needsLights&&(Un.state.directionalShadowMap.length>0&&Ft.setValue(k,"directionalShadowMap",Un.state.directionalShadowMap,C),Un.state.spotShadowMap.length>0&&Ft.setValue(k,"spotShadowMap",Un.state.spotShadowMap,C),Un.state.pointShadowMap.length>0&&Ft.setValue(k,"pointShadowMap",Un.state.pointShadowMap,C)),$.isSkinnedMesh){Ft.setOptional(k,$,"bindMatrix"),Ft.setOptional(k,$,"bindMatrixInverse");const Vt=$.skeleton;Vt&&(Vt.boneTexture===null&&Vt.computeBoneTexture(),Ft.setValue(k,"boneTexture",Vt.boneTexture,C))}$.isBatchedMesh&&(Ft.setOptional(k,$,"batchingTexture"),Ft.setValue(k,"batchingTexture",$._matricesTexture,C),Ft.setOptional(k,$,"batchingIdTexture"),Ft.setValue(k,"batchingIdTexture",$._indirectTexture,C),Ft.setOptional(k,$,"batchingColorTexture"),$._colorsTexture!==null&&Ft.setValue(k,"batchingColorTexture",$._colorsTexture,C));const Xi=ie.morphAttributes;if((Xi.position!==void 0||Xi.normal!==void 0||Xi.color!==void 0)&&mt.update($,ie,Yn),(ri||Be.receiveShadow!==$.receiveShadow)&&(Be.receiveShadow=$.receiveShadow,Ft.setValue(k,"receiveShadow",$.receiveShadow)),(ee.isMeshStandardMaterial||ee.isMeshLambertMaterial||ee.isMeshPhongMaterial)&&ee.envMap===null&&Y.environment!==null&&(Qt.envMapIntensity.value=Y.environmentIntensity),Qt.dfgLUT!==void 0&&(Qt.dfgLUT.value=CR()),ri){if(Ft.setValue(k,"toneMappingExposure",O.toneMappingExposure),Be.needsLights&&of(Qt,gi),ve&&ee.fog===!0&&ae.refreshFogUniforms(Qt,ve),ae.refreshMaterialUniforms(Qt,ee,Qe,nt,R.state.transmissionRenderTarget[I.id]),Be.needsLights&&Be.lightProbeGrid){const Vt=Be.lightProbeGrid;Qt.probesSH.value=Vt.texture,Qt.probesMin.value.copy(Vt.boundingBox.min),Qt.probesMax.value.copy(Vt.boundingBox.max),Qt.probesResolution.value.copy(Vt.resolution)}wu.upload(k,Ll(Be),Qt,C)}if(ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(wu.upload(k,Ll(Be),Qt,C),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&Ft.setValue(k,"center",$.center),Ft.setValue(k,"modelViewMatrix",$.modelViewMatrix),Ft.setValue(k,"normalMatrix",$.normalMatrix),Ft.setValue(k,"modelMatrix",$.matrixWorld),ee.uniformsGroups!==void 0){const Vt=ee.uniformsGroups;for(let _i=0,vi=Vt.length;_i<vi;_i++){const Nl=Vt[_i];ce.update(Nl,Yn),ce.bind(Nl,Yn)}}return Yn}function of(I,Y){I.ambientLightColor.needsUpdate=Y,I.lightProbe.needsUpdate=Y,I.directionalLights.needsUpdate=Y,I.directionalLightShadows.needsUpdate=Y,I.pointLights.needsUpdate=Y,I.pointLightShadows.needsUpdate=Y,I.spotLights.needsUpdate=Y,I.spotLightShadows.needsUpdate=Y,I.rectAreaLights.needsUpdate=Y,I.hemisphereLights.needsUpdate=Y}function af(I){return I.isMeshLambertMaterial||I.isMeshToonMaterial||I.isMeshPhongMaterial||I.isMeshStandardMaterial||I.isShadowMaterial||I.isShaderMaterial&&I.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return te},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(I,Y,ie){const ee=N.get(I);ee.__autoAllocateDepthBuffer=I.resolveDepthBuffer===!1,ee.__autoAllocateDepthBuffer===!1&&(ee.__useRenderToTexture=!1),N.get(I.texture).__webglTexture=Y,N.get(I.depthTexture).__webglTexture=ee.__autoAllocateDepthBuffer?void 0:ie,ee.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(I,Y){const ie=N.get(I);ie.__webglFramebuffer=Y,ie.__useDefaultFramebuffer=Y===void 0};const ta=k.createFramebuffer();this.setRenderTarget=function(I,Y=0,ie=0){H=I,K=Y,te=ie;let ee=null,$=!1,ve=!1;if(I){const Fe=N.get(I);if(Fe.__useDefaultFramebuffer!==void 0){ye.bindFramebuffer(k.FRAMEBUFFER,Fe.__webglFramebuffer),z.copy(I.viewport),W.copy(I.scissor),q=I.scissorTest,ye.viewport(z),ye.scissor(W),ye.setScissorTest(q),Z=-1;return}else if(Fe.__webglFramebuffer===void 0)C.setupRenderTarget(I);else if(Fe.__hasExternalTextures)C.rebindTextures(I,N.get(I.texture).__webglTexture,N.get(I.depthTexture).__webglTexture);else if(I.depthBuffer){const ut=I.depthTexture;if(Fe.__boundDepthTexture!==ut){if(ut!==null&&N.has(ut)&&(I.width!==ut.image.width||I.height!==ut.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(I)}}const ke=I.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(ve=!0);const We=N.get(I).__webglFramebuffer;I.isWebGLCubeRenderTarget?(Array.isArray(We[Y])?ee=We[Y][ie]:ee=We[Y],$=!0):I.samples>0&&C.useMultisampledRTT(I)===!1?ee=N.get(I).__webglMultisampledFramebuffer:Array.isArray(We)?ee=We[ie]:ee=We,z.copy(I.viewport),W.copy(I.scissor),q=I.scissorTest}else z.copy(Se).multiplyScalar(Qe).floor(),W.copy($e).multiplyScalar(Qe).floor(),q=Ke;if(ie!==0&&(ee=ta),ye.bindFramebuffer(k.FRAMEBUFFER,ee)&&ye.drawBuffers(I,ee),ye.viewport(z),ye.scissor(W),ye.setScissorTest(q),$){const Fe=N.get(I.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Fe.__webglTexture,ie)}else if(ve){const Fe=Y;for(let ke=0;ke<I.textures.length;ke++){const We=N.get(I.textures[ke]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+ke,We.__webglTexture,ie,Fe)}}else if(I!==null&&ie!==0){const Fe=N.get(I.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Fe.__webglTexture,ie)}Z=-1},this.readRenderTargetPixels=function(I,Y,ie,ee,$,ve,Me,Fe=0){if(!(I&&I.isWebGLRenderTarget)){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=N.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&Me!==void 0&&(ke=ke[Me]),ke){ye.bindFramebuffer(k.FRAMEBUFFER,ke);try{const We=I.textures[Fe],ut=We.format,gt=We.type;if(I.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+Fe),!ct.textureFormatReadable(ut)){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ct.textureTypeReadable(gt)){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=I.width-ee&&ie>=0&&ie<=I.height-$&&k.readPixels(Y,ie,ee,$,G.convert(ut),G.convert(gt),ve)}finally{const We=H!==null?N.get(H).__webglFramebuffer:null;ye.bindFramebuffer(k.FRAMEBUFFER,We)}}},this.readRenderTargetPixelsAsync=async function(I,Y,ie,ee,$,ve,Me,Fe=0){if(!(I&&I.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=N.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&Me!==void 0&&(ke=ke[Me]),ke)if(Y>=0&&Y<=I.width-ee&&ie>=0&&ie<=I.height-$){ye.bindFramebuffer(k.FRAMEBUFFER,ke);const We=I.textures[Fe],ut=We.format,gt=We.type;if(I.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+Fe),!ct.textureFormatReadable(ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ct.textureTypeReadable(gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const qe=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,qe),k.bufferData(k.PIXEL_PACK_BUFFER,ve.byteLength,k.STREAM_READ),k.readPixels(Y,ie,ee,$,G.convert(ut),G.convert(gt),0);const Lt=H!==null?N.get(H).__webglFramebuffer:null;ye.bindFramebuffer(k.FRAMEBUFFER,Lt);const Zt=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await BM(k,Zt,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,qe),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,ve),k.deleteBuffer(qe),k.deleteSync(Zt),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(I,Y=null,ie=0){const ee=Math.pow(2,-ie),$=Math.floor(I.image.width*ee),ve=Math.floor(I.image.height*ee),Me=Y!==null?Y.x:0,Fe=Y!==null?Y.y:0;C.setTexture2D(I,0),k.copyTexSubImage2D(k.TEXTURE_2D,ie,0,0,Me,Fe,$,ve),ye.unbindTexture()};const us=k.createFramebuffer(),na=k.createFramebuffer();this.copyTextureToTexture=function(I,Y,ie=null,ee=null,$=0,ve=0){let Me,Fe,ke,We,ut,gt,qe,Lt,Zt;const Xt=I.isCompressedTexture?I.mipmaps[ve]:I.image;if(ie!==null)Me=ie.max.x-ie.min.x,Fe=ie.max.y-ie.min.y,ke=ie.isBox3?ie.max.z-ie.min.z:1,We=ie.min.x,ut=ie.min.y,gt=ie.isBox3?ie.min.z:0;else{const Qt=Math.pow(2,-$);Me=Math.floor(Xt.width*Qt),Fe=Math.floor(Xt.height*Qt),I.isDataArrayTexture?ke=Xt.depth:I.isData3DTexture?ke=Math.floor(Xt.depth*Qt):ke=1,We=0,ut=0,gt=0}ee!==null?(qe=ee.x,Lt=ee.y,Zt=ee.z):(qe=0,Lt=0,Zt=0);const Ut=G.convert(Y.format),fn=G.convert(Y.type);let Be;Y.isData3DTexture?(C.setTexture3D(Y,0),Be=k.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(C.setTexture2DArray(Y,0),Be=k.TEXTURE_2D_ARRAY):(C.setTexture2D(Y,0),Be=k.TEXTURE_2D),ye.activeTexture(k.TEXTURE0),ye.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,Y.flipY),ye.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),ye.pixelStorei(k.UNPACK_ALIGNMENT,Y.unpackAlignment);const Un=ye.getParameter(k.UNPACK_ROW_LENGTH),Ct=ye.getParameter(k.UNPACK_IMAGE_HEIGHT),Yn=ye.getParameter(k.UNPACK_SKIP_PIXELS),Fn=ye.getParameter(k.UNPACK_SKIP_ROWS),ri=ye.getParameter(k.UNPACK_SKIP_IMAGES);ye.pixelStorei(k.UNPACK_ROW_LENGTH,Xt.width),ye.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Xt.height),ye.pixelStorei(k.UNPACK_SKIP_PIXELS,We),ye.pixelStorei(k.UNPACK_SKIP_ROWS,ut),ye.pixelStorei(k.UNPACK_SKIP_IMAGES,gt);const gi=I.isDataArrayTexture||I.isData3DTexture,Ft=Y.isDataArrayTexture||Y.isData3DTexture;if(I.isDepthTexture){const Qt=N.get(I),Xi=N.get(Y),Vt=N.get(Qt.__renderTarget),_i=N.get(Xi.__renderTarget);ye.bindFramebuffer(k.READ_FRAMEBUFFER,Vt.__webglFramebuffer),ye.bindFramebuffer(k.DRAW_FRAMEBUFFER,_i.__webglFramebuffer);for(let vi=0;vi<ke;vi++)gi&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,N.get(I).__webglTexture,$,gt+vi),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,N.get(Y).__webglTexture,ve,Zt+vi)),k.blitFramebuffer(We,ut,Me,Fe,qe,Lt,Me,Fe,k.DEPTH_BUFFER_BIT,k.NEAREST);ye.bindFramebuffer(k.READ_FRAMEBUFFER,null),ye.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if($!==0||I.isRenderTargetTexture||N.has(I)){const Qt=N.get(I),Xi=N.get(Y);ye.bindFramebuffer(k.READ_FRAMEBUFFER,us),ye.bindFramebuffer(k.DRAW_FRAMEBUFFER,na);for(let Vt=0;Vt<ke;Vt++)gi?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Qt.__webglTexture,$,gt+Vt):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Qt.__webglTexture,$),Ft?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Xi.__webglTexture,ve,Zt+Vt):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Xi.__webglTexture,ve),$!==0?k.blitFramebuffer(We,ut,Me,Fe,qe,Lt,Me,Fe,k.COLOR_BUFFER_BIT,k.NEAREST):Ft?k.copyTexSubImage3D(Be,ve,qe,Lt,Zt+Vt,We,ut,Me,Fe):k.copyTexSubImage2D(Be,ve,qe,Lt,We,ut,Me,Fe);ye.bindFramebuffer(k.READ_FRAMEBUFFER,null),ye.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else Ft?I.isDataTexture||I.isData3DTexture?k.texSubImage3D(Be,ve,qe,Lt,Zt,Me,Fe,ke,Ut,fn,Xt.data):Y.isCompressedArrayTexture?k.compressedTexSubImage3D(Be,ve,qe,Lt,Zt,Me,Fe,ke,Ut,Xt.data):k.texSubImage3D(Be,ve,qe,Lt,Zt,Me,Fe,ke,Ut,fn,Xt):I.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,ve,qe,Lt,Me,Fe,Ut,fn,Xt.data):I.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,ve,qe,Lt,Xt.width,Xt.height,Ut,Xt.data):k.texSubImage2D(k.TEXTURE_2D,ve,qe,Lt,Me,Fe,Ut,fn,Xt);ye.pixelStorei(k.UNPACK_ROW_LENGTH,Un),ye.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Ct),ye.pixelStorei(k.UNPACK_SKIP_PIXELS,Yn),ye.pixelStorei(k.UNPACK_SKIP_ROWS,Fn),ye.pixelStorei(k.UNPACK_SKIP_IMAGES,ri),ve===0&&Y.generateMipmaps&&k.generateMipmap(Be),ye.unbindTexture()},this.initRenderTarget=function(I){N.get(I).__webglFramebuffer===void 0&&C.setupRenderTarget(I)},this.initTexture=function(I){I.isCubeTexture?C.setTextureCube(I,0):I.isData3DTexture?C.setTexture3D(I,0):I.isDataArrayTexture||I.isCompressedArrayTexture?C.setTexture2DArray(I,0):C.setTexture2D(I,0),ye.unbindTexture()},this.resetState=function(){K=0,te=0,H=null,ye.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=At._getDrawingBufferColorSpace(e),t.unpackColorSpace=At._getUnpackColorSpace()}}const RR=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:Sh,AddEquation:jr,AddOperation:ix,AdditiveAnimationBlendMode:nm,AdditiveBlending:Sp,AgXToneMapping:Yp,AlphaFormat:em,AlwaysCompare:mx,AlwaysDepth:Cu,AlwaysStencilFunc:Tp,AmbientLight:ay,AnimationAction:gy,AnimationClip:dl,AnimationLoader:Rw,AnimationMixer:sE,AnimationObjectGroup:iE,AnimationUtils:bw,ArcCurve:Dx,ArrayCamera:fy,ArrowHelper:AE,AttachedBindMode:Ep,Audio:py,AudioAnalyser:Yw,AudioContext:Rm,AudioListener:Ww,AudioLoader:kw,AxesHelper:CE,BackSide:Wn,BasicDepthPacking:lx,BasicShadowMap:Ov,BatchedMesh:Ax,BezierInterpolant:ey,Bone:lm,BooleanKeyframeTrack:Zs,Box2:fE,Box3:pn,Box3Helper:bE,BoxGeometry:Ys,BoxHelper:EE,BufferAttribute:Gt,BufferGeometry:xt,BufferGeometryLoader:uy,ByteType:jp,Cache:ar,Camera:bl,CameraHelper:wE,CanvasTexture:W1,CapsuleGeometry:kh,CatmullRomCurve3:Nx,CineonToneMapping:Xp,CircleGeometry:Vh,ClampToEdgeWrapping:ti,Clock:vy,Color:Ye,ColorKeyframeTrack:Em,ColorManagement:At,Compatibility:DM,CompressedArrayTexture:H1,CompressedCubeTexture:G1,CompressedTexture:zh,CompressedTextureLoader:Pw,ConeGeometry:Sl,ConstantAlphaFactor:ex,ConstantColorFactor:Qv,Controls:PE,CubeCamera:hy,CubeDepthTexture:Ix,CubeReflectionMapping:cr,CubeRefractionMapping:es,CubeTexture:xl,CubeTextureLoader:Iw,CubeUVReflectionMapping:Zo,CubicBezierCurve:fm,CubicBezierCurve3:Ux,CubicInterpolant:Qx,CullFaceBack:yp,CullFaceFront:Fv,CullFaceFrontBack:XS,CullFaceNone:Uv,Curve:Wi,CurvePath:Ox,CustomBlending:Bv,CustomToneMapping:qp,CylinderGeometry:yl,Cylindrical:hE,Data3DTexture:Dh,DataArrayTexture:Lh,DataTexture:Vi,DataTextureLoader:Lw,DataUtils:m1,DecrementStencilOp:uM,DecrementWrapStencilOp:fM,DefaultLoadingManager:ny,DepthFormat:hr,DepthStencilFormat:Kr,DepthTexture:Xs,DetachedBindMode:rx,DirectionalLight:oy,DirectionalLightHelper:ME,DiscreteInterpolant:$x,DodecahedronGeometry:Hh,DoubleSide:zi,DstAlphaFactor:Yv,DstColorFactor:Jv,DynamicCopyUsage:AM,DynamicDrawUsage:SM,DynamicReadUsage:EM,EdgesGeometry:Lx,EllipseCurve:Gh,EqualCompare:fx,EqualDepth:Pu,EqualStencilFunc:gM,EquirectangularReflectionMapping:Va,EquirectangularRefractionMapping:Ha,Euler:Hi,EventDispatcher:Gi,ExternalTexture:um,ExtrudeGeometry:Wh,FileLoader:Ir,Float16BufferAttribute:M1,Float32BufferAttribute:je,FloatType:Gn,Fog:Uh,FogExp2:Nh,FramebufferTexture:V1,FrontSide:Rr,Frustum:jo,FrustumArray:Bh,GLBufferAttribute:cE,GLSL1:RM,GLSL3:Ap,GreaterCompare:dx,GreaterDepth:Lu,GreaterEqualCompare:Ih,GreaterEqualDepth:Iu,GreaterEqualStencilFunc:yM,GreaterStencilFunc:vM,GridHelper:yE,Group:Oo,HTMLTexture:X1,HalfFloatType:ur,HemisphereLight:iy,HemisphereLightHelper:xE,IcosahedronGeometry:Xh,ImageBitmapLoader:zw,ImageLoader:pl,ImageUtils:yx,IncrementStencilOp:cM,IncrementWrapStencilOp:hM,InstancedBufferAttribute:Wo,InstancedBufferGeometry:Cm,InstancedInterleavedBuffer:vh,InstancedMesh:Tx,Int16BufferAttribute:y1,Int32BufferAttribute:S1,Int8BufferAttribute:_1,IntType:wh,InterleavedBuffer:Fh,InterleavedBufferAttribute:fi,Interpolant:Qo,InterpolateBezier:bp,InterpolateDiscrete:tl,InterpolateLinear:uh,InterpolateSmooth:Su,InterpolationSamplingMode:LM,InterpolationSamplingType:IM,InvertStencilOp:dM,KeepStencilOp:Ls,KeyframeTrack:Pi,LOD:Ex,LatheGeometry:qh,Layers:ks,LessCompare:hx,LessDepth:Ru,LessEqualCompare:Ph,LessEqualDepth:Gs,LessEqualStencilFunc:_M,LessStencilFunc:mM,Light:os,LightProbe:cy,Line:is,Line3:xy,LineBasicMaterial:qn,LineCurve:dm,LineCurve3:Fx,LineDashedMaterial:jx,LineLoop:Cx,LineSegments:fr,LinearFilter:Yt,LinearInterpolant:wm,LinearMipMapLinearFilter:jS,LinearMipMapNearestFilter:JS,LinearMipmapLinearFilter:or,LinearMipmapNearestFilter:Ga,LinearSRGBColorSpace:il,LinearToneMapping:Gp,LinearTransfer:rl,Loader:ni,LoaderUtils:Lp,LoadingManager:bm,LoopOnce:sx,LoopPingPong:ax,LoopRepeat:ox,MOUSE:GS,Material:Tn,MaterialBlending:qS,MaterialLoader:$h,MathUtils:xx,Matrix2:Np,Matrix3:vt,Matrix4:dt,MaxEquation:Hv,Mesh:an,MeshBasicMaterial:rs,MeshDepthMaterial:ym,MeshDistanceMaterial:Sm,MeshLambertMaterial:Zx,MeshMatcapMaterial:Jx,MeshNormalMaterial:Yx,MeshPhongMaterial:Xx,MeshPhysicalMaterial:Wx,MeshStandardMaterial:xm,MeshToonMaterial:qx,MinEquation:Vv,MirroredRepeatWrapping:Qa,MixOperation:nx,MultiplyBlending:wp,MultiplyOperation:_l,NearestFilter:on,NearestMipMapLinearFilter:ZS,NearestMipMapNearestFilter:YS,NearestMipmapLinearFilter:Uo,NearestMipmapNearestFilter:Jp,NeutralToneMapping:Zp,NeverCompare:ux,NeverDepth:Au,NeverStencilFunc:pM,NoBlending:lr,NoColorSpace:Tr,NoNormalPacking:rM,NoToneMapping:Ci,NormalAnimationBlendMode:Rh,NormalBlending:Bs,NormalGAPacking:oM,NormalRGPacking:sM,NotEqualCompare:px,NotEqualDepth:Du,NotEqualStencilFunc:xM,NumberKeyframeTrack:hl,Object3D:Nt,ObjectLoader:Ow,ObjectSpaceNormalMap:cx,OctahedronGeometry:Ml,OneFactor:Wv,OneMinusConstantAlphaFactor:tx,OneMinusConstantColorFactor:$v,OneMinusDstAlphaFactor:Zv,OneMinusDstColorFactor:jv,OneMinusSrcAlphaFactor:Tu,OneMinusSrcColorFactor:qv,OrthographicCamera:as,PCFShadowMap:zo,PCFSoftShadowMap:ka,PMREMGenerator:Fp,Path:gh,PerspectiveCamera:hn,Plane:Jr,PlaneGeometry:Ko,PlaneHelper:TE,PointLight:sy,PointLightHelper:_E,Points:Rx,PointsMaterial:cm,PolarGridHelper:SE,PolyhedronGeometry:ss,PositionalAudio:qw,PropertyBinding:Dt,PropertyMixer:my,QuadraticBezierCurve:pm,QuadraticBezierCurve3:mm,Quaternion:Xn,QuaternionKeyframeTrack:El,QuaternionLinearInterpolant:ty,R11_EAC_Format:Vu,RED_GREEN_RGTC2_Format:el,RED_RGTC1_Format:ah,REVISION:gl,RG11_EAC_Format:$a,RGBADepthPacking:tM,RGBAFormat:Nn,RGBAIntegerFormat:Ch,RGBA_ASTC_10x10_Format:th,RGBA_ASTC_10x5_Format:Qu,RGBA_ASTC_10x6_Format:$u,RGBA_ASTC_10x8_Format:eh,RGBA_ASTC_12x10_Format:nh,RGBA_ASTC_12x12_Format:ih,RGBA_ASTC_4x4_Format:Wu,RGBA_ASTC_5x4_Format:Xu,RGBA_ASTC_5x5_Format:qu,RGBA_ASTC_6x5_Format:Yu,RGBA_ASTC_6x6_Format:Zu,RGBA_ASTC_8x5_Format:Ju,RGBA_ASTC_8x6_Format:ju,RGBA_ASTC_8x8_Format:Ku,RGBA_BPTC_Format:rh,RGBA_ETC2_EAC_Format:ku,RGBA_PVRTC_2BPPV1_Format:Ou,RGBA_PVRTC_4BPPV1_Format:Fu,RGBA_S3TC_DXT1_Format:Xa,RGBA_S3TC_DXT3_Format:qa,RGBA_S3TC_DXT5_Format:Ya,RGBDepthPacking:nM,RGBFormat:tm,RGBIntegerFormat:KS,RGB_BPTC_SIGNED_Format:sh,RGB_BPTC_UNSIGNED_Format:oh,RGB_ETC1_Format:Bu,RGB_ETC2_Format:zu,RGB_PVRTC_2BPPV1_Format:Uu,RGB_PVRTC_4BPPV1_Format:Nu,RGB_S3TC_DXT1_Format:Wa,RGDepthPacking:iM,RGFormat:ts,RGIntegerFormat:Ah,RawShaderMaterial:vm,Ray:Jo,Raycaster:_y,RectAreaLight:ly,RedFormat:Th,RedIntegerFormat:vl,ReinhardToneMapping:Wp,RenderTarget:rm,RenderTarget3D:oE,RepeatWrapping:Ka,ReplaceStencilOp:lM,ReverseSubtractEquation:kv,RingGeometry:Yh,SIGNED_R11_EAC_Format:Hu,SIGNED_RED_GREEN_RGTC2_Format:ch,SIGNED_RED_RGTC1_Format:lh,SIGNED_RG11_EAC_Format:Gu,SRGBColorSpace:$n,SRGBTransfer:Ht,Scene:fh,ShaderChunk:Et,ShaderLib:Bi,ShaderMaterial:mi,ShadowMaterial:Hx,Shape:Vs,ShapeGeometry:Zh,ShapePath:RE,ShapeUtils:ki,ShortType:Kp,Skeleton:Oh,SkeletonHelper:gE,SkinnedMesh:bx,Source:Qr,Sphere:mn,SphereGeometry:wl,Spherical:uE,SphericalHarmonics3:Am,SplineCurve:gm,SpotLight:ry,SpotLightHelper:mE,Sprite:wx,SpriteMaterial:am,SrcAlphaFactor:bu,SrcAlphaSaturateFactor:Kv,SrcColorFactor:Xv,StaticCopyUsage:TM,StaticDrawUsage:sl,StaticReadUsage:wM,StereoCamera:Vw,StreamCopyUsage:CM,StreamDrawUsage:MM,StreamReadUsage:bM,StringKeyframeTrack:Js,SubtractEquation:zv,SubtractiveBlending:Mp,TOUCH:WS,TangentSpaceNormalMap:Pr,TetrahedronGeometry:Jh,Texture:jt,TextureLoader:Dw,TextureUtils:UE,Timer:dy,TimestampQuery:PM,TorusGeometry:jh,TorusKnotGeometry:Kh,Triangle:ei,TriangleFanDrawMode:eM,TriangleStripDrawMode:$S,TrianglesDrawMode:QS,TubeGeometry:Qh,UVMapping:Mh,Uint16BufferAttribute:sm,Uint32BufferAttribute:om,Uint8BufferAttribute:v1,Uint8ClampedBufferAttribute:x1,Uniform:Lm,UniformsGroup:lE,UniformsLib:ze,UniformsUtils:_h,UnsignedByteType:Vn,UnsignedInt101111Type:$p,UnsignedInt248Type:Ho,UnsignedInt5999Type:Qp,UnsignedIntType:Ri,UnsignedShort4444Type:Eh,UnsignedShort5551Type:bh,UnsignedShortType:Vo,VSMShadowMap:Ns,Vector2:pe,Vector3:F,Vector4:Rt,VectorKeyframeTrack:fl,VideoFrameTexture:k1,VideoTexture:Px,WebGL3DRenderTarget:o1,WebGLArrayRenderTarget:s1,WebGLCoordinateSystem:hi,WebGLCubeRenderTarget:Dm,WebGLRenderTarget:pi,WebGLRenderer:Ry,WebGLUtils:Ay,WebGPUCoordinateSystem:Ws,WebXRController:Mu,WireframeGeometry:_m,WrapAroundEnding:nl,ZeroCurvatureEnding:Us,ZeroFactor:Gv,ZeroSlopeEnding:Fs,ZeroStencilOp:aM,createCanvasElement:_x,error:rt,getConsoleFunction:OM,log:al,setConsoleFunction:FM,warn:Oe,warnOnce:hh},Symbol.toStringTag,{value:"Module"}));var tp={exports:{}},Zr={};var nv;function PR(){return nv||(nv=1,Zr.ConcurrentRoot=1,Zr.ContinuousEventPriority=4,Zr.DefaultEventPriority=16,Zr.DiscreteEventPriority=1,Zr.IdleEventPriority=536870912,Zr.LegacyRoot=0),Zr}var iv;function IR(){return iv||(iv=1,tp.exports=PR()),tp.exports}var Bo=IR();function LR(r){let e;const t=new Set,n=(h,f)=>{const p=typeof h=="function"?h(e):h;if(p!==e){const m=e;e=f?p:Object.assign({},e,p),t.forEach(g=>g(e,m))}},i=()=>e,s=(h,f=i,p=Object.is)=>{console.warn("[DEPRECATED] Please use `subscribeWithSelector` middleware");let m=f(e);function g(){const x=f(e);if(!p(m,x)){const w=m;h(m=x,w)}}return t.add(g),()=>t.delete(g)},u={setState:n,getState:i,subscribe:(h,f,p)=>f||p?s(h,f,p):(t.add(h),()=>t.delete(h)),destroy:()=>t.clear()};return e=r(n,i,u),u}const DR=typeof window>"u"||!window.navigator||/ServerSideRendering|^Deno\//.test(window.navigator.userAgent),rv=DR?be.useEffect:be.useLayoutEffect;function NR(r){const e=typeof r=="function"?LR(r):r,t=(n=e.getState,i=Object.is)=>{const[,s]=be.useReducer(y=>y+1,0),o=e.getState(),c=be.useRef(o),u=be.useRef(n),h=be.useRef(i),f=be.useRef(!1),p=be.useRef();p.current===void 0&&(p.current=n(o));let m,g=!1;(c.current!==o||u.current!==n||h.current!==i||f.current)&&(m=n(o),g=!i(p.current,m)),rv(()=>{g&&(p.current=m),c.current=o,u.current=n,h.current=i,f.current=!1});const x=be.useRef(o);rv(()=>{const y=()=>{try{const M=e.getState(),E=u.current(M);h.current(p.current,E)||(c.current=M,p.current=E,s())}catch{f.current=!0,s()}},v=e.subscribe(y);return e.getState()!==x.current&&y(),v},[]);const w=g?m:p.current;return be.useDebugValue(w),w};return Object.assign(t,e),t[Symbol.iterator]=function(){console.warn("[useStore, api] = create() is deprecated and will be removed in v4");const n=[t,e];return{next(){const i=n.length<=0;return{value:n.shift(),done:i}}}},t}var np={exports:{}},ip={exports:{}},rp={};var sv;function UR(){return sv||(sv=1,(function(r){function e(z,W){var q=z.length;z.push(W);e:for(;0<q;){var re=q-1>>>1,he=z[re];if(0<i(he,W))z[re]=W,z[q]=he,q=re;else break e}}function t(z){return z.length===0?null:z[0]}function n(z){if(z.length===0)return null;var W=z[0],q=z.pop();if(q!==W){z[0]=q;e:for(var re=0,he=z.length,Ie=he>>>1;re<Ie;){var nt=2*(re+1)-1,Qe=z[nt],oe=nt+1,we=z[oe];if(0>i(Qe,q))oe<he&&0>i(we,Qe)?(z[re]=we,z[oe]=q,re=oe):(z[re]=Qe,z[nt]=q,re=nt);else if(oe<he&&0>i(we,q))z[re]=we,z[oe]=q,re=oe;else break e}}return W}function i(z,W){var q=z.sortIndex-W.sortIndex;return q!==0?q:z.id-W.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;r.unstable_now=function(){return s.now()}}else{var o=Date,c=o.now();r.unstable_now=function(){return o.now()-c}}var u=[],h=[],f=1,p=null,m=3,g=!1,x=!1,w=!1,y=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,M=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function E(z){for(var W=t(h);W!==null;){if(W.callback===null)n(h);else if(W.startTime<=z)n(h),W.sortIndex=W.expirationTime,e(u,W);else break;W=t(h)}}function b(z){if(w=!1,E(z),!x)if(t(u)!==null)x=!0,Z(L);else{var W=t(h);W!==null&&J(b,W.startTime-z)}}function L(z,W){x=!1,w&&(w=!1,v(A),A=-1),g=!0;var q=m;try{for(E(W),p=t(u);p!==null&&(!(p.expirationTime>W)||z&&!D());){var re=p.callback;if(typeof re=="function"){p.callback=null,m=p.priorityLevel;var he=re(p.expirationTime<=W);W=r.unstable_now(),typeof he=="function"?p.callback=he:p===t(u)&&n(u),E(W)}else n(u);p=t(u)}if(p!==null)var Ie=!0;else{var nt=t(h);nt!==null&&J(b,nt.startTime-W),Ie=!1}return Ie}finally{p=null,m=q,g=!1}}var R=!1,U=null,A=-1,P=5,O=-1;function D(){return!(r.unstable_now()-O<P)}function V(){if(U!==null){var z=r.unstable_now();O=z;var W=!0;try{W=U(!0,z)}finally{W?K():(R=!1,U=null)}}else R=!1}var K;if(typeof M=="function")K=function(){M(V)};else if(typeof MessageChannel<"u"){var te=new MessageChannel,H=te.port2;te.port1.onmessage=V,K=function(){H.postMessage(null)}}else K=function(){y(V,0)};function Z(z){U=z,R||(R=!0,K())}function J(z,W){A=y(function(){z(r.unstable_now())},W)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(z){z.callback=null},r.unstable_continueExecution=function(){x||g||(x=!0,Z(L))},r.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<z?Math.floor(1e3/z):5},r.unstable_getCurrentPriorityLevel=function(){return m},r.unstable_getFirstCallbackNode=function(){return t(u)},r.unstable_next=function(z){switch(m){case 1:case 2:case 3:var W=3;break;default:W=m}var q=m;m=W;try{return z()}finally{m=q}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(z,W){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var q=m;m=z;try{return W()}finally{m=q}},r.unstable_scheduleCallback=function(z,W,q){var re=r.unstable_now();switch(typeof q=="object"&&q!==null?(q=q.delay,q=typeof q=="number"&&0<q?re+q:re):q=re,z){case 1:var he=-1;break;case 2:he=250;break;case 5:he=1073741823;break;case 4:he=1e4;break;default:he=5e3}return he=q+he,z={id:f++,callback:W,priorityLevel:z,startTime:q,expirationTime:he,sortIndex:-1},q>re?(z.sortIndex=q,e(h,z),t(u)===null&&z===t(h)&&(w?(v(A),A=-1):w=!0,J(b,q-re))):(z.sortIndex=he,e(u,z),x||g||(x=!0,Z(L))),z},r.unstable_shouldYield=D,r.unstable_wrapCallback=function(z){var W=m;return function(){var q=m;m=W;try{return z.apply(this,arguments)}finally{m=q}}}})(rp)),rp}var ov;function FR(){return ov||(ov=1,ip.exports=UR()),ip.exports}var sp,av;function OR(){return av||(av=1,sp=function(e){var t={},n=Dv(),i=FR(),s=Object.assign;function o(a){for(var l="https://reactjs.org/docs/error-decoder.html?invariant="+a,d=1;d<arguments.length;d++)l+="&args[]="+encodeURIComponent(arguments[d]);return"Minified React error #"+a+"; visit "+l+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var c=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,u=Symbol.for("react.element"),h=Symbol.for("react.portal"),f=Symbol.for("react.fragment"),p=Symbol.for("react.strict_mode"),m=Symbol.for("react.profiler"),g=Symbol.for("react.provider"),x=Symbol.for("react.context"),w=Symbol.for("react.forward_ref"),y=Symbol.for("react.suspense"),v=Symbol.for("react.suspense_list"),M=Symbol.for("react.memo"),E=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),L=Symbol.iterator;function R(a){return a===null||typeof a!="object"?null:(a=L&&a[L]||a["@@iterator"],typeof a=="function"?a:null)}function U(a){if(a==null)return null;if(typeof a=="function")return a.displayName||a.name||null;if(typeof a=="string")return a;switch(a){case f:return"Fragment";case h:return"Portal";case m:return"Profiler";case p:return"StrictMode";case y:return"Suspense";case v:return"SuspenseList"}if(typeof a=="object")switch(a.$$typeof){case x:return(a.displayName||"Context")+".Consumer";case g:return(a._context.displayName||"Context")+".Provider";case w:var l=a.render;return a=a.displayName,a||(a=l.displayName||l.name||"",a=a!==""?"ForwardRef("+a+")":"ForwardRef"),a;case M:return l=a.displayName||null,l!==null?l:U(a.type)||"Memo";case E:l=a._payload,a=a._init;try{return U(a(l))}catch{}}return null}function A(a){var l=a.type;switch(a.tag){case 24:return"Cache";case 9:return(l.displayName||"Context")+".Consumer";case 10:return(l._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return a=l.render,a=a.displayName||a.name||"",l.displayName||(a!==""?"ForwardRef("+a+")":"ForwardRef");case 7:return"Fragment";case 5:return l;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return U(l);case 8:return l===p?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof l=="function")return l.displayName||l.name||null;if(typeof l=="string")return l}return null}function P(a){var l=a,d=a;if(a.alternate)for(;l.return;)l=l.return;else{a=l;do l=a,(l.flags&4098)!==0&&(d=l.return),a=l.return;while(a)}return l.tag===3?d:null}function O(a){if(P(a)!==a)throw Error(o(188))}function D(a){var l=a.alternate;if(!l){if(l=P(a),l===null)throw Error(o(188));return l!==a?null:a}for(var d=a,_=l;;){var S=d.return;if(S===null)break;var T=S.alternate;if(T===null){if(_=S.return,_!==null){d=_;continue}break}if(S.child===T.child){for(T=S.child;T;){if(T===d)return O(S),a;if(T===_)return O(S),l;T=T.sibling}throw Error(o(188))}if(d.return!==_.return)d=S,_=T;else{for(var B=!1,X=S.child;X;){if(X===d){B=!0,d=S,_=T;break}if(X===_){B=!0,_=S,d=T;break}X=X.sibling}if(!B){for(X=T.child;X;){if(X===d){B=!0,d=T,_=S;break}if(X===_){B=!0,_=T,d=S;break}X=X.sibling}if(!B)throw Error(o(189))}}if(d.alternate!==_)throw Error(o(190))}if(d.tag!==3)throw Error(o(188));return d.stateNode.current===d?a:l}function V(a){return a=D(a),a!==null?K(a):null}function K(a){if(a.tag===5||a.tag===6)return a;for(a=a.child;a!==null;){var l=K(a);if(l!==null)return l;a=a.sibling}return null}function te(a){if(a.tag===5||a.tag===6)return a;for(a=a.child;a!==null;){if(a.tag!==4){var l=te(a);if(l!==null)return l}a=a.sibling}return null}var H=Array.isArray,Z=e.getPublicInstance,J=e.getRootHostContext,z=e.getChildHostContext,W=e.prepareForCommit,q=e.resetAfterCommit,re=e.createInstance,he=e.appendInitialChild,Ie=e.finalizeInitialChildren,nt=e.prepareUpdate,Qe=e.shouldSetTextContent,oe=e.createTextInstance,we=e.scheduleTimeout,Se=e.cancelTimeout,$e=e.noTimeout,Ke=e.isPrimaryRenderer,Te=e.supportsMutation,pt=e.supportsPersistence,Ze=e.supportsHydration,de=e.getInstanceFromNode,xe=e.preparePortalMount,me=e.getCurrentEventPriority,Ue=e.detachDeletedInstance,De=e.supportsMicrotasks,at=e.scheduleMicrotask,k=e.supportsTestSelectors,ft=e.findFiberRoot,tt=e.getBoundingRect,ct=e.getTextContent,ye=e.isHiddenSubtree,Pt=e.matchAccessibilityRole,N=e.setFocusIfFocusable,C=e.setupIntersectionObserver,Q=e.appendChild,ue=e.appendChildToContainer,ge=e.commitTextUpdate,Ee=e.commitMount,Pe=e.commitUpdate,ae=e.insertBefore,fe=e.insertInContainerBefore,Ve=e.removeChild,Je=e.removeChildFromContainer,Le=e.resetTextContent,Ce=e.hideInstance,mt=e.hideTextInstance,yt=e.unhideInstance,It=e.unhideTextInstance,G=e.clearContainer,Re=e.cloneInstance,ce=e.createContainerChildSet,Ge=e.appendChildToContainerChildSet,Ne=e.finalizeContainerChildren,_e=e.replaceContainerChildren,it=e.cloneHiddenInstance,_t=e.cloneHiddenTextInstance,Kt=e.canHydrateInstance,kt=e.canHydrateTextInstance,Ii=e.canHydrateSuspenseInstance,ii=e.isSuspenseInstancePending,ls=e.isSuspenseInstanceFallback,nf=e.registerSuspenseInstanceRetry,Lr=e.getNextHydratableSibling,Cl=e.getFirstHydratableChild,dr=e.getFirstHydratableChildWithinContainer,ea=e.getFirstHydratableChildWithinSuspenseInstance,Rl=e.hydrateInstance,Pl=e.hydrateTextInstance,js=e.hydrateSuspenseInstance,Il=e.getNextHydratableInstanceAfterSuspenseInstance,cs=e.commitHydratedContainer,Ll=e.commitHydratedSuspenseInstance,Dl=e.clearSuspenseBoundary,rf=e.clearSuspenseBoundaryFromContainer,sf=e.shouldDeleteUnhydratedTailInstances,of=e.didNotMatchHydratedContainerTextInstance,af=e.didNotMatchHydratedTextInstance,ta;function us(a){if(ta===void 0)try{throw Error()}catch(d){var l=d.stack.trim().match(/\n( *(at )?)/);ta=l&&l[1]||""}return`
`+ta+a}var na=!1;function I(a,l){if(!a||na)return"";na=!0;var d=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(l)if(l=function(){throw Error()},Object.defineProperty(l.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(l,[])}catch(Ae){var _=Ae}Reflect.construct(a,[],l)}else{try{l.call()}catch(Ae){_=Ae}a.call(l.prototype)}else{try{throw Error()}catch(Ae){_=Ae}a()}}catch(Ae){if(Ae&&_&&typeof Ae.stack=="string"){for(var S=Ae.stack.split(`
`),T=_.stack.split(`
`),B=S.length-1,X=T.length-1;1<=B&&0<=X&&S[B]!==T[X];)X--;for(;1<=B&&0<=X;B--,X--)if(S[B]!==T[X]){if(B!==1||X!==1)do if(B--,X--,0>X||S[B]!==T[X]){var le=`
`+S[B].replace(" at new "," at ");return a.displayName&&le.includes("<anonymous>")&&(le=le.replace("<anonymous>",a.displayName)),le}while(1<=B&&0<=X);break}}}finally{na=!1,Error.prepareStackTrace=d}return(a=a?a.displayName||a.name:"")?us(a):""}var Y=Object.prototype.hasOwnProperty,ie=[],ee=-1;function $(a){return{current:a}}function ve(a){0>ee||(a.current=ie[ee],ie[ee]=null,ee--)}function Me(a,l){ee++,ie[ee]=a.current,a.current=l}var Fe={},ke=$(Fe),We=$(!1),ut=Fe;function gt(a,l){var d=a.type.contextTypes;if(!d)return Fe;var _=a.stateNode;if(_&&_.__reactInternalMemoizedUnmaskedChildContext===l)return _.__reactInternalMemoizedMaskedChildContext;var S={},T;for(T in d)S[T]=l[T];return _&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=l,a.__reactInternalMemoizedMaskedChildContext=S),S}function qe(a){return a=a.childContextTypes,a!=null}function Lt(){ve(We),ve(ke)}function Zt(a,l,d){if(ke.current!==Fe)throw Error(o(168));Me(ke,l),Me(We,d)}function Xt(a,l,d){var _=a.stateNode;if(l=l.childContextTypes,typeof _.getChildContext!="function")return d;_=_.getChildContext();for(var S in _)if(!(S in l))throw Error(o(108,A(a)||"Unknown",S));return s({},d,_)}function Ut(a){return a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||Fe,ut=ke.current,Me(ke,a),Me(We,We.current),!0}function fn(a,l,d){var _=a.stateNode;if(!_)throw Error(o(169));d?(a=Xt(a,l,ut),_.__reactInternalMemoizedMergedChildContext=a,ve(We),ve(ke),Me(ke,a)):ve(We),Me(We,d)}var Be=Math.clz32?Math.clz32:Yn,Un=Math.log,Ct=Math.LN2;function Yn(a){return a>>>=0,a===0?32:31-(Un(a)/Ct|0)|0}var Fn=64,ri=4194304;function gi(a){switch(a&-a){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return a&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return a}}function Ft(a,l){var d=a.pendingLanes;if(d===0)return 0;var _=0,S=a.suspendedLanes,T=a.pingedLanes,B=d&268435455;if(B!==0){var X=B&~S;X!==0?_=gi(X):(T&=B,T!==0&&(_=gi(T)))}else B=d&~S,B!==0?_=gi(B):T!==0&&(_=gi(T));if(_===0)return 0;if(l!==0&&l!==_&&(l&S)===0&&(S=_&-_,T=l&-l,S>=T||S===16&&(T&4194240)!==0))return l;if((_&4)!==0&&(_|=d&16),l=a.entangledLanes,l!==0)for(a=a.entanglements,l&=_;0<l;)d=31-Be(l),S=1<<d,_|=a[d],l&=~S;return _}function Qt(a,l){switch(a){case 1:case 2:case 4:return l+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return l+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Xi(a,l){for(var d=a.suspendedLanes,_=a.pingedLanes,S=a.expirationTimes,T=a.pendingLanes;0<T;){var B=31-Be(T),X=1<<B,le=S[B];le===-1?((X&d)===0||(X&_)!==0)&&(S[B]=Qt(X,l)):le<=l&&(a.expiredLanes|=X),T&=~X}}function Vt(a){return a=a.pendingLanes&-1073741825,a!==0?a:a&1073741824?1073741824:0}function _i(a){for(var l=[],d=0;31>d;d++)l.push(a);return l}function vi(a,l,d){a.pendingLanes|=l,l!==536870912&&(a.suspendedLanes=0,a.pingedLanes=0),a=a.eventTimes,l=31-Be(l),a[l]=d}function Nl(a,l){var d=a.pendingLanes&~l;a.pendingLanes=l,a.suspendedLanes=0,a.pingedLanes=0,a.expiredLanes&=l,a.mutableReadLanes&=l,a.entangledLanes&=l,l=a.entanglements;var _=a.eventTimes;for(a=a.expirationTimes;0<d;){var S=31-Be(d),T=1<<S;l[S]=0,_[S]=-1,a[S]=-1,d&=~T}}function lf(a,l){var d=a.entangledLanes|=l;for(a=a.entanglements;d;){var _=31-Be(d),S=1<<_;S&l|a[_]&l&&(a[_]|=l),d&=~S}}var Ot=0;function Wm(a){return a&=-a,1<a?4<a?(a&268435455)!==0?16:536870912:4:1}var cf=i.unstable_scheduleCallback,Xm=i.unstable_cancelCallback,Qy=i.unstable_shouldYield,$y=i.unstable_requestPaint,vn=i.unstable_now,uf=i.unstable_ImmediatePriority,eS=i.unstable_UserBlockingPriority,hf=i.unstable_NormalPriority,tS=i.unstable_IdlePriority,Ul=null,qi=null;function nS(a){if(qi&&typeof qi.onCommitFiberRoot=="function")try{qi.onCommitFiberRoot(Ul,a,void 0,(a.current.flags&128)===128)}catch{}}function iS(a,l){return a===l&&(a!==0||1/a===1/l)||a!==a&&l!==l}var Yi=typeof Object.is=="function"?Object.is:iS,pr=null,Fl=!1,ff=!1;function qm(a){pr===null?pr=[a]:pr.push(a)}function rS(a){Fl=!0,qm(a)}function Zi(){if(!ff&&pr!==null){ff=!0;var a=0,l=Ot;try{var d=pr;for(Ot=1;a<d.length;a++){var _=d[a];do _=_(!0);while(_!==null)}pr=null,Fl=!1}catch(S){throw pr!==null&&(pr=pr.slice(a+1)),cf(uf,Zi),S}finally{Ot=l,ff=!1}}return null}var sS=c.ReactCurrentBatchConfig;function Ol(a,l){if(Yi(a,l))return!0;if(typeof a!="object"||a===null||typeof l!="object"||l===null)return!1;var d=Object.keys(a),_=Object.keys(l);if(d.length!==_.length)return!1;for(_=0;_<d.length;_++){var S=d[_];if(!Y.call(l,S)||!Yi(a[S],l[S]))return!1}return!0}function oS(a){switch(a.tag){case 5:return us(a.type);case 16:return us("Lazy");case 13:return us("Suspense");case 19:return us("SuspenseList");case 0:case 2:case 15:return a=I(a.type,!1),a;case 11:return a=I(a.type.render,!1),a;case 1:return a=I(a.type,!0),a;default:return""}}function Li(a,l){if(a&&a.defaultProps){l=s({},l),a=a.defaultProps;for(var d in a)l[d]===void 0&&(l[d]=a[d]);return l}return l}var Bl=$(null),zl=null,Ks=null,df=null;function pf(){df=Ks=zl=null}function Ym(a,l,d){Ke?(Me(Bl,l._currentValue),l._currentValue=d):(Me(Bl,l._currentValue2),l._currentValue2=d)}function mf(a){var l=Bl.current;ve(Bl),Ke?a._currentValue=l:a._currentValue2=l}function gf(a,l,d){for(;a!==null;){var _=a.alternate;if((a.childLanes&l)!==l?(a.childLanes|=l,_!==null&&(_.childLanes|=l)):_!==null&&(_.childLanes&l)!==l&&(_.childLanes|=l),a===d)break;a=a.return}}function Qs(a,l){zl=a,df=Ks=null,a=a.dependencies,a!==null&&a.firstContext!==null&&((a.lanes&l)!==0&&(ai=!0),a.firstContext=null)}function xi(a){var l=Ke?a._currentValue:a._currentValue2;if(df!==a)if(a={context:a,memoizedValue:l,next:null},Ks===null){if(zl===null)throw Error(o(308));Ks=a,zl.dependencies={lanes:0,firstContext:a}}else Ks=Ks.next=a;return l}var Ji=null,Dr=!1;function _f(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Zm(a,l){a=a.updateQueue,l.updateQueue===a&&(l.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function mr(a,l){return{eventTime:a,lane:l,tag:0,payload:null,callback:null,next:null}}function Nr(a,l){var d=a.updateQueue;d!==null&&(d=d.shared,ln!==null&&(a.mode&1)!==0&&(Tt&2)===0?(a=d.interleaved,a===null?(l.next=l,Ji===null?Ji=[d]:Ji.push(d)):(l.next=a.next,a.next=l),d.interleaved=l):(a=d.pending,a===null?l.next=l:(l.next=a.next,a.next=l),d.pending=l))}function kl(a,l,d){if(l=l.updateQueue,l!==null&&(l=l.shared,(d&4194240)!==0)){var _=l.lanes;_&=a.pendingLanes,d|=_,l.lanes=d,lf(a,d)}}function Jm(a,l){var d=a.updateQueue,_=a.alternate;if(_!==null&&(_=_.updateQueue,d===_)){var S=null,T=null;if(d=d.firstBaseUpdate,d!==null){do{var B={eventTime:d.eventTime,lane:d.lane,tag:d.tag,payload:d.payload,callback:d.callback,next:null};T===null?S=T=B:T=T.next=B,d=d.next}while(d!==null);T===null?S=T=l:T=T.next=l}else S=T=l;d={baseState:_.baseState,firstBaseUpdate:S,lastBaseUpdate:T,shared:_.shared,effects:_.effects},a.updateQueue=d;return}a=d.lastBaseUpdate,a===null?d.firstBaseUpdate=l:a.next=l,d.lastBaseUpdate=l}function Vl(a,l,d,_){var S=a.updateQueue;Dr=!1;var T=S.firstBaseUpdate,B=S.lastBaseUpdate,X=S.shared.pending;if(X!==null){S.shared.pending=null;var le=X,Ae=le.next;le.next=null,B===null?T=Ae:B.next=Ae,B=le;var et=a.alternate;et!==null&&(et=et.updateQueue,X=et.lastBaseUpdate,X!==B&&(X===null?et.firstBaseUpdate=Ae:X.next=Ae,et.lastBaseUpdate=le))}if(T!==null){var St=S.baseState;B=0,et=Ae=le=null,X=T;do{var lt=X.lane,Wt=X.eventTime;if((_&lt)===lt){et!==null&&(et=et.next={eventTime:Wt,lane:0,tag:X.tag,payload:X.payload,callback:X.callback,next:null});e:{var ot=a,Pn=X;switch(lt=l,Wt=d,Pn.tag){case 1:if(ot=Pn.payload,typeof ot=="function"){St=ot.call(Wt,St,lt);break e}St=ot;break e;case 3:ot.flags=ot.flags&-65537|128;case 0:if(ot=Pn.payload,lt=typeof ot=="function"?ot.call(Wt,St,lt):ot,lt==null)break e;St=s({},St,lt);break e;case 2:Dr=!0}}X.callback!==null&&X.lane!==0&&(a.flags|=64,lt=S.effects,lt===null?S.effects=[X]:lt.push(X))}else Wt={eventTime:Wt,lane:lt,tag:X.tag,payload:X.payload,callback:X.callback,next:null},et===null?(Ae=et=Wt,le=St):et=et.next=Wt,B|=lt;if(X=X.next,X===null){if(X=S.shared.pending,X===null)break;lt=X,X=lt.next,lt.next=null,S.lastBaseUpdate=lt,S.shared.pending=null}}while(!0);if(et===null&&(le=St),S.baseState=le,S.firstBaseUpdate=Ae,S.lastBaseUpdate=et,l=S.shared.interleaved,l!==null){S=l;do B|=S.lane,S=S.next;while(S!==l)}else T===null&&(S.shared.lanes=0);ao|=B,a.lanes=B,a.memoizedState=St}}function jm(a,l,d){if(a=l.effects,l.effects=null,a!==null)for(l=0;l<a.length;l++){var _=a[l],S=_.callback;if(S!==null){if(_.callback=null,_=d,typeof S!="function")throw Error(o(191,S));S.call(_)}}}var Km=new n.Component().refs;function vf(a,l,d,_){l=a.memoizedState,d=d(_,l),d=d==null?l:s({},l,d),a.memoizedState=d,a.lanes===0&&(a.updateQueue.baseState=d)}var Hl={isMounted:function(a){return(a=a._reactInternals)?P(a)===a:!1},enqueueSetState:function(a,l,d){a=a._reactInternals;var _=Bn(),S=Or(a),T=mr(_,S);T.payload=l,d!=null&&(T.callback=d),Nr(a,T),l=Ei(a,S,_),l!==null&&kl(l,a,S)},enqueueReplaceState:function(a,l,d){a=a._reactInternals;var _=Bn(),S=Or(a),T=mr(_,S);T.tag=1,T.payload=l,d!=null&&(T.callback=d),Nr(a,T),l=Ei(a,S,_),l!==null&&kl(l,a,S)},enqueueForceUpdate:function(a,l){a=a._reactInternals;var d=Bn(),_=Or(a),S=mr(d,_);S.tag=2,l!=null&&(S.callback=l),Nr(a,S),l=Ei(a,_,d),l!==null&&kl(l,a,_)}};function Qm(a,l,d,_,S,T,B){return a=a.stateNode,typeof a.shouldComponentUpdate=="function"?a.shouldComponentUpdate(_,T,B):l.prototype&&l.prototype.isPureReactComponent?!Ol(d,_)||!Ol(S,T):!0}function $m(a,l,d){var _=!1,S=Fe,T=l.contextType;return typeof T=="object"&&T!==null?T=xi(T):(S=qe(l)?ut:ke.current,_=l.contextTypes,T=(_=_!=null)?gt(a,S):Fe),l=new l(d,T),a.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,l.updater=Hl,a.stateNode=l,l._reactInternals=a,_&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=S,a.__reactInternalMemoizedMaskedChildContext=T),l}function eg(a,l,d,_){a=l.state,typeof l.componentWillReceiveProps=="function"&&l.componentWillReceiveProps(d,_),typeof l.UNSAFE_componentWillReceiveProps=="function"&&l.UNSAFE_componentWillReceiveProps(d,_),l.state!==a&&Hl.enqueueReplaceState(l,l.state,null)}function xf(a,l,d,_){var S=a.stateNode;S.props=d,S.state=a.memoizedState,S.refs=Km,_f(a);var T=l.contextType;typeof T=="object"&&T!==null?S.context=xi(T):(T=qe(l)?ut:ke.current,S.context=gt(a,T)),S.state=a.memoizedState,T=l.getDerivedStateFromProps,typeof T=="function"&&(vf(a,l,T,d),S.state=a.memoizedState),typeof l.getDerivedStateFromProps=="function"||typeof S.getSnapshotBeforeUpdate=="function"||typeof S.UNSAFE_componentWillMount!="function"&&typeof S.componentWillMount!="function"||(l=S.state,typeof S.componentWillMount=="function"&&S.componentWillMount(),typeof S.UNSAFE_componentWillMount=="function"&&S.UNSAFE_componentWillMount(),l!==S.state&&Hl.enqueueReplaceState(S,S.state,null),Vl(a,d,S,_),S.state=a.memoizedState),typeof S.componentDidMount=="function"&&(a.flags|=4194308)}var $s=[],eo=0,Gl=null,Wl=0,yi=[],Si=0,hs=null,gr=1,_r="";function fs(a,l){$s[eo++]=Wl,$s[eo++]=Gl,Gl=a,Wl=l}function tg(a,l,d){yi[Si++]=gr,yi[Si++]=_r,yi[Si++]=hs,hs=a;var _=gr;a=_r;var S=32-Be(_)-1;_&=~(1<<S),d+=1;var T=32-Be(l)+S;if(30<T){var B=S-S%5;T=(_&(1<<B)-1).toString(32),_>>=B,S-=B,gr=1<<32-Be(l)+S|d<<S|_,_r=T+a}else gr=1<<T|d<<S|_,_r=a}function yf(a){a.return!==null&&(fs(a,1),tg(a,1,0))}function Sf(a){for(;a===Gl;)Gl=$s[--eo],$s[eo]=null,Wl=$s[--eo],$s[eo]=null;for(;a===hs;)hs=yi[--Si],yi[Si]=null,_r=yi[--Si],yi[Si]=null,gr=yi[--Si],yi[Si]=null}var si=null,oi=null,Jt=!1,ia=!1,Di=null;function ng(a,l){var d=bi(5,null,null,0);d.elementType="DELETED",d.stateNode=l,d.return=a,l=a.deletions,l===null?(a.deletions=[d],a.flags|=16):l.push(d)}function ig(a,l){switch(a.tag){case 5:return l=Kt(l,a.type,a.pendingProps),l!==null?(a.stateNode=l,si=a,oi=Cl(l),!0):!1;case 6:return l=kt(l,a.pendingProps),l!==null?(a.stateNode=l,si=a,oi=null,!0):!1;case 13:if(l=Ii(l),l!==null){var d=hs!==null?{id:gr,overflow:_r}:null;return a.memoizedState={dehydrated:l,treeContext:d,retryLane:1073741824},d=bi(18,null,null,0),d.stateNode=l,d.return=a,a.child=d,si=a,oi=null,!0}return!1;default:return!1}}function Mf(a){return(a.mode&1)!==0&&(a.flags&128)===0}function wf(a){if(Jt){var l=oi;if(l){var d=l;if(!ig(a,l)){if(Mf(a))throw Error(o(418));l=Lr(d);var _=si;l&&ig(a,l)?ng(_,d):(a.flags=a.flags&-4097|2,Jt=!1,si=a)}}else{if(Mf(a))throw Error(o(418));a.flags=a.flags&-4097|2,Jt=!1,si=a}}}function rg(a){for(a=a.return;a!==null&&a.tag!==5&&a.tag!==3&&a.tag!==13;)a=a.return;si=a}function ra(a){if(!Ze||a!==si)return!1;if(!Jt)return rg(a),Jt=!0,!1;if(a.tag!==3&&(a.tag!==5||sf(a.type)&&!Qe(a.type,a.memoizedProps))){var l=oi;if(l){if(Mf(a)){for(a=oi;a;)a=Lr(a);throw Error(o(418))}for(;l;)ng(a,l),l=Lr(l)}}if(rg(a),a.tag===13){if(!Ze)throw Error(o(316));if(a=a.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(o(317));oi=Il(a)}else oi=si?Lr(a.stateNode):null;return!0}function to(){Ze&&(oi=si=null,ia=Jt=!1)}function Ef(a){Di===null?Di=[a]:Di.push(a)}function sa(a,l,d){if(a=d.ref,a!==null&&typeof a!="function"&&typeof a!="object"){if(d._owner){if(d=d._owner,d){if(d.tag!==1)throw Error(o(309));var _=d.stateNode}if(!_)throw Error(o(147,a));var S=_,T=""+a;return l!==null&&l.ref!==null&&typeof l.ref=="function"&&l.ref._stringRef===T?l.ref:(l=function(B){var X=S.refs;X===Km&&(X=S.refs={}),B===null?delete X[T]:X[T]=B},l._stringRef=T,l)}if(typeof a!="string")throw Error(o(284));if(!d._owner)throw Error(o(290,a))}return a}function Xl(a,l){throw a=Object.prototype.toString.call(l),Error(o(31,a==="[object Object]"?"object with keys {"+Object.keys(l).join(", ")+"}":a))}function sg(a){var l=a._init;return l(a._payload)}function og(a){function l(ne,j){if(a){var se=ne.deletions;se===null?(ne.deletions=[j],ne.flags|=16):se.push(j)}}function d(ne,j){if(!a)return null;for(;j!==null;)l(ne,j),j=j.sibling;return null}function _(ne,j){for(ne=new Map;j!==null;)j.key!==null?ne.set(j.key,j):ne.set(j.index,j),j=j.sibling;return ne}function S(ne,j){return ne=zr(ne,j),ne.index=0,ne.sibling=null,ne}function T(ne,j,se){return ne.index=se,a?(se=ne.alternate,se!==null?(se=se.index,se<j?(ne.flags|=2,j):se):(ne.flags|=2,j)):(ne.flags|=1048576,j)}function B(ne){return a&&ne.alternate===null&&(ne.flags|=2),ne}function X(ne,j,se,Xe){return j===null||j.tag!==6?(j=ad(se,ne.mode,Xe),j.return=ne,j):(j=S(j,se),j.return=ne,j)}function le(ne,j,se,Xe){var st=se.type;return st===f?et(ne,j,se.props.children,Xe,se.key):j!==null&&(j.elementType===st||typeof st=="object"&&st!==null&&st.$$typeof===E&&sg(st)===j.type)?(Xe=S(j,se.props),Xe.ref=sa(ne,j,se),Xe.return=ne,Xe):(Xe=Mc(se.type,se.key,se.props,null,ne.mode,Xe),Xe.ref=sa(ne,j,se),Xe.return=ne,Xe)}function Ae(ne,j,se,Xe){return j===null||j.tag!==4||j.stateNode.containerInfo!==se.containerInfo||j.stateNode.implementation!==se.implementation?(j=ld(se,ne.mode,Xe),j.return=ne,j):(j=S(j,se.children||[]),j.return=ne,j)}function et(ne,j,se,Xe,st){return j===null||j.tag!==7?(j=xs(se,ne.mode,Xe,st),j.return=ne,j):(j=S(j,se),j.return=ne,j)}function St(ne,j,se){if(typeof j=="string"&&j!==""||typeof j=="number")return j=ad(""+j,ne.mode,se),j.return=ne,j;if(typeof j=="object"&&j!==null){switch(j.$$typeof){case u:return se=Mc(j.type,j.key,j.props,null,ne.mode,se),se.ref=sa(ne,null,j),se.return=ne,se;case h:return j=ld(j,ne.mode,se),j.return=ne,j;case E:var Xe=j._init;return St(ne,Xe(j._payload),se)}if(H(j)||R(j))return j=xs(j,ne.mode,se,null),j.return=ne,j;Xl(ne,j)}return null}function lt(ne,j,se,Xe){var st=j!==null?j.key:null;if(typeof se=="string"&&se!==""||typeof se=="number")return st!==null?null:X(ne,j,""+se,Xe);if(typeof se=="object"&&se!==null){switch(se.$$typeof){case u:return se.key===st?le(ne,j,se,Xe):null;case h:return se.key===st?Ae(ne,j,se,Xe):null;case E:return st=se._init,lt(ne,j,st(se._payload),Xe)}if(H(se)||R(se))return st!==null?null:et(ne,j,se,Xe,null);Xl(ne,se)}return null}function Wt(ne,j,se,Xe,st){if(typeof Xe=="string"&&Xe!==""||typeof Xe=="number")return ne=ne.get(se)||null,X(j,ne,""+Xe,st);if(typeof Xe=="object"&&Xe!==null){switch(Xe.$$typeof){case u:return ne=ne.get(Xe.key===null?se:Xe.key)||null,le(j,ne,Xe,st);case h:return ne=ne.get(Xe.key===null?se:Xe.key)||null,Ae(j,ne,Xe,st);case E:var bt=Xe._init;return Wt(ne,j,se,bt(Xe._payload),st)}if(H(Xe)||R(Xe))return ne=ne.get(se)||null,et(j,ne,Xe,st,null);Xl(j,Xe)}return null}function ot(ne,j,se,Xe){for(var st=null,bt=null,Mt=j,Bt=j=0,yn=null;Mt!==null&&Bt<se.length;Bt++){Mt.index>Bt?(yn=Mt,Mt=null):yn=Mt.sibling;var zt=lt(ne,Mt,se[Bt],Xe);if(zt===null){Mt===null&&(Mt=yn);break}a&&Mt&&zt.alternate===null&&l(ne,Mt),j=T(zt,j,Bt),bt===null?st=zt:bt.sibling=zt,bt=zt,Mt=yn}if(Bt===se.length)return d(ne,Mt),Jt&&fs(ne,Bt),st;if(Mt===null){for(;Bt<se.length;Bt++)Mt=St(ne,se[Bt],Xe),Mt!==null&&(j=T(Mt,j,Bt),bt===null?st=Mt:bt.sibling=Mt,bt=Mt);return Jt&&fs(ne,Bt),st}for(Mt=_(ne,Mt);Bt<se.length;Bt++)yn=Wt(Mt,ne,Bt,se[Bt],Xe),yn!==null&&(a&&yn.alternate!==null&&Mt.delete(yn.key===null?Bt:yn.key),j=T(yn,j,Bt),bt===null?st=yn:bt.sibling=yn,bt=yn);return a&&Mt.forEach(function(kr){return l(ne,kr)}),Jt&&fs(ne,Bt),st}function Pn(ne,j,se,Xe){var st=R(se);if(typeof st!="function")throw Error(o(150));if(se=st.call(se),se==null)throw Error(o(151));for(var bt=st=null,Mt=j,Bt=j=0,yn=null,zt=se.next();Mt!==null&&!zt.done;Bt++,zt=se.next()){Mt.index>Bt?(yn=Mt,Mt=null):yn=Mt.sibling;var kr=lt(ne,Mt,zt.value,Xe);if(kr===null){Mt===null&&(Mt=yn);break}a&&Mt&&kr.alternate===null&&l(ne,Mt),j=T(kr,j,Bt),bt===null?st=kr:bt.sibling=kr,bt=kr,Mt=yn}if(zt.done)return d(ne,Mt),Jt&&fs(ne,Bt),st;if(Mt===null){for(;!zt.done;Bt++,zt=se.next())zt=St(ne,zt.value,Xe),zt!==null&&(j=T(zt,j,Bt),bt===null?st=zt:bt.sibling=zt,bt=zt);return Jt&&fs(ne,Bt),st}for(Mt=_(ne,Mt);!zt.done;Bt++,zt=se.next())zt=Wt(Mt,ne,Bt,zt.value,Xe),zt!==null&&(a&&zt.alternate!==null&&Mt.delete(zt.key===null?Bt:zt.key),j=T(zt,j,Bt),bt===null?st=zt:bt.sibling=zt,bt=zt);return a&&Mt.forEach(function(FS){return l(ne,FS)}),Jt&&fs(ne,Bt),st}function Ti(ne,j,se,Xe){if(typeof se=="object"&&se!==null&&se.type===f&&se.key===null&&(se=se.props.children),typeof se=="object"&&se!==null){switch(se.$$typeof){case u:e:{for(var st=se.key,bt=j;bt!==null;){if(bt.key===st){if(st=se.type,st===f){if(bt.tag===7){d(ne,bt.sibling),j=S(bt,se.props.children),j.return=ne,ne=j;break e}}else if(bt.elementType===st||typeof st=="object"&&st!==null&&st.$$typeof===E&&sg(st)===bt.type){d(ne,bt.sibling),j=S(bt,se.props),j.ref=sa(ne,bt,se),j.return=ne,ne=j;break e}d(ne,bt);break}else l(ne,bt);bt=bt.sibling}se.type===f?(j=xs(se.props.children,ne.mode,Xe,se.key),j.return=ne,ne=j):(Xe=Mc(se.type,se.key,se.props,null,ne.mode,Xe),Xe.ref=sa(ne,j,se),Xe.return=ne,ne=Xe)}return B(ne);case h:e:{for(bt=se.key;j!==null;){if(j.key===bt)if(j.tag===4&&j.stateNode.containerInfo===se.containerInfo&&j.stateNode.implementation===se.implementation){d(ne,j.sibling),j=S(j,se.children||[]),j.return=ne,ne=j;break e}else{d(ne,j);break}else l(ne,j);j=j.sibling}j=ld(se,ne.mode,Xe),j.return=ne,ne=j}return B(ne);case E:return bt=se._init,Ti(ne,j,bt(se._payload),Xe)}if(H(se))return ot(ne,j,se,Xe);if(R(se))return Pn(ne,j,se,Xe);Xl(ne,se)}return typeof se=="string"&&se!==""||typeof se=="number"?(se=""+se,j!==null&&j.tag===6?(d(ne,j.sibling),j=S(j,se),j.return=ne,ne=j):(d(ne,j),j=ad(se,ne.mode,Xe),j.return=ne,ne=j),B(ne)):d(ne,j)}return Ti}var no=og(!0),ag=og(!1),oa={},Mi=$(oa),aa=$(oa),io=$(oa);function ji(a){if(a===oa)throw Error(o(174));return a}function bf(a,l){Me(io,l),Me(aa,a),Me(Mi,oa),a=J(l),ve(Mi),Me(Mi,a)}function ro(){ve(Mi),ve(aa),ve(io)}function lg(a){var l=ji(io.current),d=ji(Mi.current);l=z(d,a.type,l),d!==l&&(Me(aa,a),Me(Mi,l))}function Tf(a){aa.current===a&&(ve(Mi),ve(aa))}var $t=$(0);function ql(a){for(var l=a;l!==null;){if(l.tag===13){var d=l.memoizedState;if(d!==null&&(d=d.dehydrated,d===null||ii(d)||ls(d)))return l}else if(l.tag===19&&l.memoizedProps.revealOrder!==void 0){if((l.flags&128)!==0)return l}else if(l.child!==null){l.child.return=l,l=l.child;continue}if(l===a)break;for(;l.sibling===null;){if(l.return===null||l.return===a)return null;l=l.return}l.sibling.return=l.return,l=l.sibling}return null}var Af=[];function Cf(){for(var a=0;a<Af.length;a++){var l=Af[a];Ke?l._workInProgressVersionPrimary=null:l._workInProgressVersionSecondary=null}Af.length=0}var Yl=c.ReactCurrentDispatcher,wi=c.ReactCurrentBatchConfig,so=0,tn=null,An=null,xn=null,Zl=!1,la=!1,ca=0,aS=0;function Cn(){throw Error(o(321))}function Rf(a,l){if(l===null)return!1;for(var d=0;d<l.length&&d<a.length;d++)if(!Yi(a[d],l[d]))return!1;return!0}function Pf(a,l,d,_,S,T){if(so=T,tn=l,l.memoizedState=null,l.updateQueue=null,l.lanes=0,Yl.current=a===null||a.memoizedState===null?hS:fS,a=d(_,S),la){T=0;do{if(la=!1,ca=0,25<=T)throw Error(o(301));T+=1,xn=An=null,l.updateQueue=null,Yl.current=dS,a=d(_,S)}while(la)}if(Yl.current=$l,l=An!==null&&An.next!==null,so=0,xn=An=tn=null,Zl=!1,l)throw Error(o(300));return a}function If(){var a=ca!==0;return ca=0,a}function vr(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return xn===null?tn.memoizedState=xn=a:xn=xn.next=a,xn}function Ki(){if(An===null){var a=tn.alternate;a=a!==null?a.memoizedState:null}else a=An.next;var l=xn===null?tn.memoizedState:xn.next;if(l!==null)xn=l,An=a;else{if(a===null)throw Error(o(310));An=a,a={memoizedState:An.memoizedState,baseState:An.baseState,baseQueue:An.baseQueue,queue:An.queue,next:null},xn===null?tn.memoizedState=xn=a:xn=xn.next=a}return xn}function ds(a,l){return typeof l=="function"?l(a):l}function Jl(a){var l=Ki(),d=l.queue;if(d===null)throw Error(o(311));d.lastRenderedReducer=a;var _=An,S=_.baseQueue,T=d.pending;if(T!==null){if(S!==null){var B=S.next;S.next=T.next,T.next=B}_.baseQueue=S=T,d.pending=null}if(S!==null){T=S.next,_=_.baseState;var X=B=null,le=null,Ae=T;do{var et=Ae.lane;if((so&et)===et)le!==null&&(le=le.next={lane:0,action:Ae.action,hasEagerState:Ae.hasEagerState,eagerState:Ae.eagerState,next:null}),_=Ae.hasEagerState?Ae.eagerState:a(_,Ae.action);else{var St={lane:et,action:Ae.action,hasEagerState:Ae.hasEagerState,eagerState:Ae.eagerState,next:null};le===null?(X=le=St,B=_):le=le.next=St,tn.lanes|=et,ao|=et}Ae=Ae.next}while(Ae!==null&&Ae!==T);le===null?B=_:le.next=X,Yi(_,l.memoizedState)||(ai=!0),l.memoizedState=_,l.baseState=B,l.baseQueue=le,d.lastRenderedState=_}if(a=d.interleaved,a!==null){S=a;do T=S.lane,tn.lanes|=T,ao|=T,S=S.next;while(S!==a)}else S===null&&(d.lanes=0);return[l.memoizedState,d.dispatch]}function jl(a){var l=Ki(),d=l.queue;if(d===null)throw Error(o(311));d.lastRenderedReducer=a;var _=d.dispatch,S=d.pending,T=l.memoizedState;if(S!==null){d.pending=null;var B=S=S.next;do T=a(T,B.action),B=B.next;while(B!==S);Yi(T,l.memoizedState)||(ai=!0),l.memoizedState=T,l.baseQueue===null&&(l.baseState=T),d.lastRenderedState=T}return[T,_]}function cg(){}function ug(a,l){var d=tn,_=Ki(),S=l(),T=!Yi(_.memoizedState,S);if(T&&(_.memoizedState=S,ai=!0),_=_.queue,ha(dg.bind(null,d,_,a),[a]),_.getSnapshot!==l||T||xn!==null&&xn.memoizedState.tag&1){if(d.flags|=2048,ua(9,fg.bind(null,d,_,S,l),void 0,null),ln===null)throw Error(o(349));(so&30)!==0||hg(d,l,S)}return S}function hg(a,l,d){a.flags|=16384,a={getSnapshot:l,value:d},l=tn.updateQueue,l===null?(l={lastEffect:null,stores:null},tn.updateQueue=l,l.stores=[a]):(d=l.stores,d===null?l.stores=[a]:d.push(a))}function fg(a,l,d,_){l.value=d,l.getSnapshot=_,pg(l)&&Ei(a,1,-1)}function dg(a,l,d){return d(function(){pg(l)&&Ei(a,1,-1)})}function pg(a){var l=a.getSnapshot;a=a.value;try{var d=l();return!Yi(a,d)}catch{return!0}}function Lf(a){var l=vr();return typeof a=="function"&&(a=a()),l.memoizedState=l.baseState=a,a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ds,lastRenderedState:a},l.queue=a,a=a.dispatch=uS.bind(null,tn,a),[l.memoizedState,a]}function ua(a,l,d,_){return a={tag:a,create:l,destroy:d,deps:_,next:null},l=tn.updateQueue,l===null?(l={lastEffect:null,stores:null},tn.updateQueue=l,l.lastEffect=a.next=a):(d=l.lastEffect,d===null?l.lastEffect=a.next=a:(_=d.next,d.next=a,a.next=_,l.lastEffect=a)),a}function mg(){return Ki().memoizedState}function Kl(a,l,d,_){var S=vr();tn.flags|=a,S.memoizedState=ua(1|l,d,void 0,_===void 0?null:_)}function Ql(a,l,d,_){var S=Ki();_=_===void 0?null:_;var T=void 0;if(An!==null){var B=An.memoizedState;if(T=B.destroy,_!==null&&Rf(_,B.deps)){S.memoizedState=ua(l,d,T,_);return}}tn.flags|=a,S.memoizedState=ua(1|l,d,T,_)}function Df(a,l){return Kl(8390656,8,a,l)}function ha(a,l){return Ql(2048,8,a,l)}function gg(a,l){return Ql(4,2,a,l)}function _g(a,l){return Ql(4,4,a,l)}function vg(a,l){if(typeof l=="function")return a=a(),l(a),function(){l(null)};if(l!=null)return a=a(),l.current=a,function(){l.current=null}}function xg(a,l,d){return d=d!=null?d.concat([a]):null,Ql(4,4,vg.bind(null,l,a),d)}function Nf(){}function yg(a,l){var d=Ki();l=l===void 0?null:l;var _=d.memoizedState;return _!==null&&l!==null&&Rf(l,_[1])?_[0]:(d.memoizedState=[a,l],a)}function Sg(a,l){var d=Ki();l=l===void 0?null:l;var _=d.memoizedState;return _!==null&&l!==null&&Rf(l,_[1])?_[0]:(a=a(),d.memoizedState=[a,l],a)}function lS(a,l){var d=Ot;Ot=d!==0&&4>d?d:4,a(!0);var _=wi.transition;wi.transition={};try{a(!1),l()}finally{Ot=d,wi.transition=_}}function Mg(){return Ki().memoizedState}function cS(a,l,d){var _=Or(a);d={lane:_,action:d,hasEagerState:!1,eagerState:null,next:null},wg(a)?Eg(l,d):(bg(a,l,d),d=Bn(),a=Ei(a,_,d),a!==null&&Tg(a,l,_))}function uS(a,l,d){var _=Or(a),S={lane:_,action:d,hasEagerState:!1,eagerState:null,next:null};if(wg(a))Eg(l,S);else{bg(a,l,S);var T=a.alternate;if(a.lanes===0&&(T===null||T.lanes===0)&&(T=l.lastRenderedReducer,T!==null))try{var B=l.lastRenderedState,X=T(B,d);if(S.hasEagerState=!0,S.eagerState=X,Yi(X,B))return}catch{}d=Bn(),a=Ei(a,_,d),a!==null&&Tg(a,l,_)}}function wg(a){var l=a.alternate;return a===tn||l!==null&&l===tn}function Eg(a,l){la=Zl=!0;var d=a.pending;d===null?l.next=l:(l.next=d.next,d.next=l),a.pending=l}function bg(a,l,d){ln!==null&&(a.mode&1)!==0&&(Tt&2)===0?(a=l.interleaved,a===null?(d.next=d,Ji===null?Ji=[l]:Ji.push(l)):(d.next=a.next,a.next=d),l.interleaved=d):(a=l.pending,a===null?d.next=d:(d.next=a.next,a.next=d),l.pending=d)}function Tg(a,l,d){if((d&4194240)!==0){var _=l.lanes;_&=a.pendingLanes,d|=_,l.lanes=d,lf(a,d)}}var $l={readContext:xi,useCallback:Cn,useContext:Cn,useEffect:Cn,useImperativeHandle:Cn,useInsertionEffect:Cn,useLayoutEffect:Cn,useMemo:Cn,useReducer:Cn,useRef:Cn,useState:Cn,useDebugValue:Cn,useDeferredValue:Cn,useTransition:Cn,useMutableSource:Cn,useSyncExternalStore:Cn,useId:Cn,unstable_isNewReconciler:!1},hS={readContext:xi,useCallback:function(a,l){return vr().memoizedState=[a,l===void 0?null:l],a},useContext:xi,useEffect:Df,useImperativeHandle:function(a,l,d){return d=d!=null?d.concat([a]):null,Kl(4194308,4,vg.bind(null,l,a),d)},useLayoutEffect:function(a,l){return Kl(4194308,4,a,l)},useInsertionEffect:function(a,l){return Kl(4,2,a,l)},useMemo:function(a,l){var d=vr();return l=l===void 0?null:l,a=a(),d.memoizedState=[a,l],a},useReducer:function(a,l,d){var _=vr();return l=d!==void 0?d(l):l,_.memoizedState=_.baseState=l,a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:a,lastRenderedState:l},_.queue=a,a=a.dispatch=cS.bind(null,tn,a),[_.memoizedState,a]},useRef:function(a){var l=vr();return a={current:a},l.memoizedState=a},useState:Lf,useDebugValue:Nf,useDeferredValue:function(a){var l=Lf(a),d=l[0],_=l[1];return Df(function(){var S=wi.transition;wi.transition={};try{_(a)}finally{wi.transition=S}},[a]),d},useTransition:function(){var a=Lf(!1),l=a[0];return a=lS.bind(null,a[1]),vr().memoizedState=a,[l,a]},useMutableSource:function(){},useSyncExternalStore:function(a,l,d){var _=tn,S=vr();if(Jt){if(d===void 0)throw Error(o(407));d=d()}else{if(d=l(),ln===null)throw Error(o(349));(so&30)!==0||hg(_,l,d)}S.memoizedState=d;var T={value:d,getSnapshot:l};return S.queue=T,Df(dg.bind(null,_,T,a),[a]),_.flags|=2048,ua(9,fg.bind(null,_,T,d,l),void 0,null),d},useId:function(){var a=vr(),l=ln.identifierPrefix;if(Jt){var d=_r,_=gr;d=(_&~(1<<32-Be(_)-1)).toString(32)+d,l=":"+l+"R"+d,d=ca++,0<d&&(l+="H"+d.toString(32)),l+=":"}else d=aS++,l=":"+l+"r"+d.toString(32)+":";return a.memoizedState=l},unstable_isNewReconciler:!1},fS={readContext:xi,useCallback:yg,useContext:xi,useEffect:ha,useImperativeHandle:xg,useInsertionEffect:gg,useLayoutEffect:_g,useMemo:Sg,useReducer:Jl,useRef:mg,useState:function(){return Jl(ds)},useDebugValue:Nf,useDeferredValue:function(a){var l=Jl(ds),d=l[0],_=l[1];return ha(function(){var S=wi.transition;wi.transition={};try{_(a)}finally{wi.transition=S}},[a]),d},useTransition:function(){var a=Jl(ds)[0],l=Ki().memoizedState;return[a,l]},useMutableSource:cg,useSyncExternalStore:ug,useId:Mg,unstable_isNewReconciler:!1},dS={readContext:xi,useCallback:yg,useContext:xi,useEffect:ha,useImperativeHandle:xg,useInsertionEffect:gg,useLayoutEffect:_g,useMemo:Sg,useReducer:jl,useRef:mg,useState:function(){return jl(ds)},useDebugValue:Nf,useDeferredValue:function(a){var l=jl(ds),d=l[0],_=l[1];return ha(function(){var S=wi.transition;wi.transition={};try{_(a)}finally{wi.transition=S}},[a]),d},useTransition:function(){var a=jl(ds)[0],l=Ki().memoizedState;return[a,l]},useMutableSource:cg,useSyncExternalStore:ug,useId:Mg,unstable_isNewReconciler:!1};function Uf(a,l){try{var d="",_=l;do d+=oS(_),_=_.return;while(_);var S=d}catch(T){S=`
Error generating stack: `+T.message+`
`+T.stack}return{value:a,source:l,stack:S}}function Ff(a,l){try{console.error(l.value)}catch(d){setTimeout(function(){throw d})}}var pS=typeof WeakMap=="function"?WeakMap:Map;function Ag(a,l,d){d=mr(-1,d),d.tag=3,d.payload={element:null};var _=l.value;return d.callback=function(){mc||(mc=!0,ed=_),Ff(a,l)},d}function Cg(a,l,d){d=mr(-1,d),d.tag=3;var _=a.type.getDerivedStateFromError;if(typeof _=="function"){var S=l.value;d.payload=function(){return _(S)},d.callback=function(){Ff(a,l)}}var T=a.stateNode;return T!==null&&typeof T.componentDidCatch=="function"&&(d.callback=function(){Ff(a,l),typeof _!="function"&&(Ur===null?Ur=new Set([this]):Ur.add(this));var B=l.stack;this.componentDidCatch(l.value,{componentStack:B!==null?B:""})}),d}function Rg(a,l,d){var _=a.pingCache;if(_===null){_=a.pingCache=new pS;var S=new Set;_.set(l,S)}else S=_.get(l),S===void 0&&(S=new Set,_.set(l,S));S.has(d)||(S.add(d),a=CS.bind(null,a,l,d),l.then(a,a))}function Pg(a){do{var l;if((l=a.tag===13)&&(l=a.memoizedState,l=l!==null?l.dehydrated!==null:!0),l)return a;a=a.return}while(a!==null);return null}function Ig(a,l,d,_,S){return(a.mode&1)===0?(a===l?a.flags|=65536:(a.flags|=128,d.flags|=131072,d.flags&=-52805,d.tag===1&&(d.alternate===null?d.tag=17:(l=mr(-1,1),l.tag=2,Nr(d,l))),d.lanes|=1),a):(a.flags|=65536,a.lanes=S,a)}function Qi(a){a.flags|=4}function Lg(a,l){if(a!==null&&a.child===l.child)return!0;if((l.flags&16)!==0)return!1;for(a=l.child;a!==null;){if((a.flags&12854)!==0||(a.subtreeFlags&12854)!==0)return!1;a=a.sibling}return!0}var fa,da,ec,tc;if(Te)fa=function(a,l){for(var d=l.child;d!==null;){if(d.tag===5||d.tag===6)he(a,d.stateNode);else if(d.tag!==4&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===l)break;for(;d.sibling===null;){if(d.return===null||d.return===l)return;d=d.return}d.sibling.return=d.return,d=d.sibling}},da=function(){},ec=function(a,l,d,_,S){if(a=a.memoizedProps,a!==_){var T=l.stateNode,B=ji(Mi.current);d=nt(T,d,a,_,S,B),(l.updateQueue=d)&&Qi(l)}},tc=function(a,l,d,_){d!==_&&Qi(l)};else if(pt){fa=function(a,l,d,_){for(var S=l.child;S!==null;){if(S.tag===5){var T=S.stateNode;d&&_&&(T=it(T,S.type,S.memoizedProps,S)),he(a,T)}else if(S.tag===6)T=S.stateNode,d&&_&&(T=_t(T,S.memoizedProps,S)),he(a,T);else if(S.tag!==4){if(S.tag===22&&S.memoizedState!==null)T=S.child,T!==null&&(T.return=S),fa(a,S,!0,!0);else if(S.child!==null){S.child.return=S,S=S.child;continue}}if(S===l)break;for(;S.sibling===null;){if(S.return===null||S.return===l)return;S=S.return}S.sibling.return=S.return,S=S.sibling}};var Dg=function(a,l,d,_){for(var S=l.child;S!==null;){if(S.tag===5){var T=S.stateNode;d&&_&&(T=it(T,S.type,S.memoizedProps,S)),Ge(a,T)}else if(S.tag===6)T=S.stateNode,d&&_&&(T=_t(T,S.memoizedProps,S)),Ge(a,T);else if(S.tag!==4){if(S.tag===22&&S.memoizedState!==null)T=S.child,T!==null&&(T.return=S),Dg(a,S,!0,!0);else if(S.child!==null){S.child.return=S,S=S.child;continue}}if(S===l)break;for(;S.sibling===null;){if(S.return===null||S.return===l)return;S=S.return}S.sibling.return=S.return,S=S.sibling}};da=function(a,l){var d=l.stateNode;if(!Lg(a,l)){a=d.containerInfo;var _=ce(a);Dg(_,l,!1,!1),d.pendingChildren=_,Qi(l),Ne(a,_)}},ec=function(a,l,d,_,S){var T=a.stateNode,B=a.memoizedProps;if((a=Lg(a,l))&&B===_)l.stateNode=T;else{var X=l.stateNode,le=ji(Mi.current),Ae=null;B!==_&&(Ae=nt(X,d,B,_,S,le)),a&&Ae===null?l.stateNode=T:(T=Re(T,Ae,d,B,_,l,a,X),Ie(T,d,_,S,le)&&Qi(l),l.stateNode=T,a?Qi(l):fa(T,l,!1,!1))}},tc=function(a,l,d,_){d!==_?(a=ji(io.current),d=ji(Mi.current),l.stateNode=oe(_,a,d,l),Qi(l)):l.stateNode=a.stateNode}}else da=function(){},ec=function(){},tc=function(){};function pa(a,l){if(!Jt)switch(a.tailMode){case"hidden":l=a.tail;for(var d=null;l!==null;)l.alternate!==null&&(d=l),l=l.sibling;d===null?a.tail=null:d.sibling=null;break;case"collapsed":d=a.tail;for(var _=null;d!==null;)d.alternate!==null&&(_=d),d=d.sibling;_===null?l||a.tail===null?a.tail=null:a.tail.sibling=null:_.sibling=null}}function Rn(a){var l=a.alternate!==null&&a.alternate.child===a.child,d=0,_=0;if(l)for(var S=a.child;S!==null;)d|=S.lanes|S.childLanes,_|=S.subtreeFlags&14680064,_|=S.flags&14680064,S.return=a,S=S.sibling;else for(S=a.child;S!==null;)d|=S.lanes|S.childLanes,_|=S.subtreeFlags,_|=S.flags,S.return=a,S=S.sibling;return a.subtreeFlags|=_,a.childLanes=d,l}function mS(a,l,d){var _=l.pendingProps;switch(Sf(l),l.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Rn(l),null;case 1:return qe(l.type)&&Lt(),Rn(l),null;case 3:return _=l.stateNode,ro(),ve(We),ve(ke),Cf(),_.pendingContext&&(_.context=_.pendingContext,_.pendingContext=null),(a===null||a.child===null)&&(ra(l)?Qi(l):a===null||a.memoizedState.isDehydrated&&(l.flags&256)===0||(l.flags|=1024,Di!==null&&(id(Di),Di=null))),da(a,l),Rn(l),null;case 5:Tf(l),d=ji(io.current);var S=l.type;if(a!==null&&l.stateNode!=null)ec(a,l,S,_,d),a.ref!==l.ref&&(l.flags|=512,l.flags|=2097152);else{if(!_){if(l.stateNode===null)throw Error(o(166));return Rn(l),null}if(a=ji(Mi.current),ra(l)){if(!Ze)throw Error(o(175));a=Rl(l.stateNode,l.type,l.memoizedProps,d,a,l,!ia),l.updateQueue=a,a!==null&&Qi(l)}else{var T=re(S,_,d,a,l);fa(T,l,!1,!1),l.stateNode=T,Ie(T,S,_,d,a)&&Qi(l)}l.ref!==null&&(l.flags|=512,l.flags|=2097152)}return Rn(l),null;case 6:if(a&&l.stateNode!=null)tc(a,l,a.memoizedProps,_);else{if(typeof _!="string"&&l.stateNode===null)throw Error(o(166));if(a=ji(io.current),d=ji(Mi.current),ra(l)){if(!Ze)throw Error(o(176));if(a=l.stateNode,_=l.memoizedProps,(d=Pl(a,_,l,!ia))&&(S=si,S!==null))switch(T=(S.mode&1)!==0,S.tag){case 3:of(S.stateNode.containerInfo,a,_,T);break;case 5:af(S.type,S.memoizedProps,S.stateNode,a,_,T)}d&&Qi(l)}else l.stateNode=oe(_,a,d,l)}return Rn(l),null;case 13:if(ve($t),_=l.memoizedState,Jt&&oi!==null&&(l.mode&1)!==0&&(l.flags&128)===0){for(a=oi;a;)a=Lr(a);return to(),l.flags|=98560,l}if(_!==null&&_.dehydrated!==null){if(_=ra(l),a===null){if(!_)throw Error(o(318));if(!Ze)throw Error(o(344));if(a=l.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(o(317));js(a,l)}else to(),(l.flags&128)===0&&(l.memoizedState=null),l.flags|=4;return Rn(l),null}return Di!==null&&(id(Di),Di=null),(l.flags&128)!==0?(l.lanes=d,l):(_=_!==null,d=!1,a===null?ra(l):d=a.memoizedState!==null,_&&!d&&(l.child.flags|=8192,(l.mode&1)!==0&&(a===null||($t.current&1)!==0?dn===0&&(dn=3):sd())),l.updateQueue!==null&&(l.flags|=4),Rn(l),null);case 4:return ro(),da(a,l),a===null&&xe(l.stateNode.containerInfo),Rn(l),null;case 10:return mf(l.type._context),Rn(l),null;case 17:return qe(l.type)&&Lt(),Rn(l),null;case 19:if(ve($t),S=l.memoizedState,S===null)return Rn(l),null;if(_=(l.flags&128)!==0,T=S.rendering,T===null)if(_)pa(S,!1);else{if(dn!==0||a!==null&&(a.flags&128)!==0)for(a=l.child;a!==null;){if(T=ql(a),T!==null){for(l.flags|=128,pa(S,!1),a=T.updateQueue,a!==null&&(l.updateQueue=a,l.flags|=4),l.subtreeFlags=0,a=d,_=l.child;_!==null;)d=_,S=a,d.flags&=14680066,T=d.alternate,T===null?(d.childLanes=0,d.lanes=S,d.child=null,d.subtreeFlags=0,d.memoizedProps=null,d.memoizedState=null,d.updateQueue=null,d.dependencies=null,d.stateNode=null):(d.childLanes=T.childLanes,d.lanes=T.lanes,d.child=T.child,d.subtreeFlags=0,d.deletions=null,d.memoizedProps=T.memoizedProps,d.memoizedState=T.memoizedState,d.updateQueue=T.updateQueue,d.type=T.type,S=T.dependencies,d.dependencies=S===null?null:{lanes:S.lanes,firstContext:S.firstContext}),_=_.sibling;return Me($t,$t.current&1|2),l.child}a=a.sibling}S.tail!==null&&vn()>$f&&(l.flags|=128,_=!0,pa(S,!1),l.lanes=4194304)}else{if(!_)if(a=ql(T),a!==null){if(l.flags|=128,_=!0,a=a.updateQueue,a!==null&&(l.updateQueue=a,l.flags|=4),pa(S,!0),S.tail===null&&S.tailMode==="hidden"&&!T.alternate&&!Jt)return Rn(l),null}else 2*vn()-S.renderingStartTime>$f&&d!==1073741824&&(l.flags|=128,_=!0,pa(S,!1),l.lanes=4194304);S.isBackwards?(T.sibling=l.child,l.child=T):(a=S.last,a!==null?a.sibling=T:l.child=T,S.last=T)}return S.tail!==null?(l=S.tail,S.rendering=l,S.tail=l.sibling,S.renderingStartTime=vn(),l.sibling=null,a=$t.current,Me($t,_?a&1|2:a&1),l):(Rn(l),null);case 22:case 23:return rd(),_=l.memoizedState!==null,a!==null&&a.memoizedState!==null!==_&&(l.flags|=8192),_&&(l.mode&1)!==0?(li&1073741824)!==0&&(Rn(l),Te&&l.subtreeFlags&6&&(l.flags|=8192)):Rn(l),null;case 24:return null;case 25:return null}throw Error(o(156,l.tag))}var gS=c.ReactCurrentOwner,ai=!1;function On(a,l,d,_){l.child=a===null?ag(l,null,d,_):no(l,a.child,d,_)}function Ng(a,l,d,_,S){d=d.render;var T=l.ref;return Qs(l,S),_=Pf(a,l,d,_,T,S),d=If(),a!==null&&!ai?(l.updateQueue=a.updateQueue,l.flags&=-2053,a.lanes&=~S,xr(a,l,S)):(Jt&&d&&yf(l),l.flags|=1,On(a,l,_,S),l.child)}function Ug(a,l,d,_,S){if(a===null){var T=d.type;return typeof T=="function"&&!od(T)&&T.defaultProps===void 0&&d.compare===null&&d.defaultProps===void 0?(l.tag=15,l.type=T,Fg(a,l,T,_,S)):(a=Mc(d.type,null,_,l,l.mode,S),a.ref=l.ref,a.return=l,l.child=a)}if(T=a.child,(a.lanes&S)===0){var B=T.memoizedProps;if(d=d.compare,d=d!==null?d:Ol,d(B,_)&&a.ref===l.ref)return xr(a,l,S)}return l.flags|=1,a=zr(T,_),a.ref=l.ref,a.return=l,l.child=a}function Fg(a,l,d,_,S){if(a!==null&&Ol(a.memoizedProps,_)&&a.ref===l.ref)if(ai=!1,(a.lanes&S)!==0)(a.flags&131072)!==0&&(ai=!0);else return l.lanes=a.lanes,xr(a,l,S);return Of(a,l,d,_,S)}function Og(a,l,d){var _=l.pendingProps,S=_.children,T=a!==null?a.memoizedState:null;if(_.mode==="hidden")if((l.mode&1)===0)l.memoizedState={baseLanes:0,cachePool:null},Me(oo,li),li|=d;else if((d&1073741824)!==0)l.memoizedState={baseLanes:0,cachePool:null},_=T!==null?T.baseLanes:d,Me(oo,li),li|=_;else return a=T!==null?T.baseLanes|d:d,l.lanes=l.childLanes=1073741824,l.memoizedState={baseLanes:a,cachePool:null},l.updateQueue=null,Me(oo,li),li|=a,null;else T!==null?(_=T.baseLanes|d,l.memoizedState=null):_=d,Me(oo,li),li|=_;return On(a,l,S,d),l.child}function Bg(a,l){var d=l.ref;(a===null&&d!==null||a!==null&&a.ref!==d)&&(l.flags|=512,l.flags|=2097152)}function Of(a,l,d,_,S){var T=qe(d)?ut:ke.current;return T=gt(l,T),Qs(l,S),d=Pf(a,l,d,_,T,S),_=If(),a!==null&&!ai?(l.updateQueue=a.updateQueue,l.flags&=-2053,a.lanes&=~S,xr(a,l,S)):(Jt&&_&&yf(l),l.flags|=1,On(a,l,d,S),l.child)}function zg(a,l,d,_,S){if(qe(d)){var T=!0;Ut(l)}else T=!1;if(Qs(l,S),l.stateNode===null)a!==null&&(a.alternate=null,l.alternate=null,l.flags|=2),$m(l,d,_),xf(l,d,_,S),_=!0;else if(a===null){var B=l.stateNode,X=l.memoizedProps;B.props=X;var le=B.context,Ae=d.contextType;typeof Ae=="object"&&Ae!==null?Ae=xi(Ae):(Ae=qe(d)?ut:ke.current,Ae=gt(l,Ae));var et=d.getDerivedStateFromProps,St=typeof et=="function"||typeof B.getSnapshotBeforeUpdate=="function";St||typeof B.UNSAFE_componentWillReceiveProps!="function"&&typeof B.componentWillReceiveProps!="function"||(X!==_||le!==Ae)&&eg(l,B,_,Ae),Dr=!1;var lt=l.memoizedState;B.state=lt,Vl(l,_,B,S),le=l.memoizedState,X!==_||lt!==le||We.current||Dr?(typeof et=="function"&&(vf(l,d,et,_),le=l.memoizedState),(X=Dr||Qm(l,d,X,_,lt,le,Ae))?(St||typeof B.UNSAFE_componentWillMount!="function"&&typeof B.componentWillMount!="function"||(typeof B.componentWillMount=="function"&&B.componentWillMount(),typeof B.UNSAFE_componentWillMount=="function"&&B.UNSAFE_componentWillMount()),typeof B.componentDidMount=="function"&&(l.flags|=4194308)):(typeof B.componentDidMount=="function"&&(l.flags|=4194308),l.memoizedProps=_,l.memoizedState=le),B.props=_,B.state=le,B.context=Ae,_=X):(typeof B.componentDidMount=="function"&&(l.flags|=4194308),_=!1)}else{B=l.stateNode,Zm(a,l),X=l.memoizedProps,Ae=l.type===l.elementType?X:Li(l.type,X),B.props=Ae,St=l.pendingProps,lt=B.context,le=d.contextType,typeof le=="object"&&le!==null?le=xi(le):(le=qe(d)?ut:ke.current,le=gt(l,le));var Wt=d.getDerivedStateFromProps;(et=typeof Wt=="function"||typeof B.getSnapshotBeforeUpdate=="function")||typeof B.UNSAFE_componentWillReceiveProps!="function"&&typeof B.componentWillReceiveProps!="function"||(X!==St||lt!==le)&&eg(l,B,_,le),Dr=!1,lt=l.memoizedState,B.state=lt,Vl(l,_,B,S);var ot=l.memoizedState;X!==St||lt!==ot||We.current||Dr?(typeof Wt=="function"&&(vf(l,d,Wt,_),ot=l.memoizedState),(Ae=Dr||Qm(l,d,Ae,_,lt,ot,le)||!1)?(et||typeof B.UNSAFE_componentWillUpdate!="function"&&typeof B.componentWillUpdate!="function"||(typeof B.componentWillUpdate=="function"&&B.componentWillUpdate(_,ot,le),typeof B.UNSAFE_componentWillUpdate=="function"&&B.UNSAFE_componentWillUpdate(_,ot,le)),typeof B.componentDidUpdate=="function"&&(l.flags|=4),typeof B.getSnapshotBeforeUpdate=="function"&&(l.flags|=1024)):(typeof B.componentDidUpdate!="function"||X===a.memoizedProps&&lt===a.memoizedState||(l.flags|=4),typeof B.getSnapshotBeforeUpdate!="function"||X===a.memoizedProps&&lt===a.memoizedState||(l.flags|=1024),l.memoizedProps=_,l.memoizedState=ot),B.props=_,B.state=ot,B.context=le,_=Ae):(typeof B.componentDidUpdate!="function"||X===a.memoizedProps&&lt===a.memoizedState||(l.flags|=4),typeof B.getSnapshotBeforeUpdate!="function"||X===a.memoizedProps&&lt===a.memoizedState||(l.flags|=1024),_=!1)}return Bf(a,l,d,_,T,S)}function Bf(a,l,d,_,S,T){Bg(a,l);var B=(l.flags&128)!==0;if(!_&&!B)return S&&fn(l,d,!1),xr(a,l,T);_=l.stateNode,gS.current=l;var X=B&&typeof d.getDerivedStateFromError!="function"?null:_.render();return l.flags|=1,a!==null&&B?(l.child=no(l,a.child,null,T),l.child=no(l,null,X,T)):On(a,l,X,T),l.memoizedState=_.state,S&&fn(l,d,!0),l.child}function kg(a){var l=a.stateNode;l.pendingContext?Zt(a,l.pendingContext,l.pendingContext!==l.context):l.context&&Zt(a,l.context,!1),bf(a,l.containerInfo)}function Vg(a,l,d,_,S){return to(),Ef(S),l.flags|=256,On(a,l,d,_),l.child}var nc={dehydrated:null,treeContext:null,retryLane:0};function ic(a){return{baseLanes:a,cachePool:null}}function Hg(a,l,d){var _=l.pendingProps,S=$t.current,T=!1,B=(l.flags&128)!==0,X;if((X=B)||(X=a!==null&&a.memoizedState===null?!1:(S&2)!==0),X?(T=!0,l.flags&=-129):(a===null||a.memoizedState!==null)&&(S|=1),Me($t,S&1),a===null)return wf(l),a=l.memoizedState,a!==null&&(a=a.dehydrated,a!==null)?((l.mode&1)===0?l.lanes=1:ls(a)?l.lanes=8:l.lanes=1073741824,null):(S=_.children,a=_.fallback,T?(_=l.mode,T=l.child,S={mode:"hidden",children:S},(_&1)===0&&T!==null?(T.childLanes=0,T.pendingProps=S):T=wc(S,_,0,null),a=xs(a,_,d,null),T.return=l,a.return=l,T.sibling=a,l.child=T,l.child.memoizedState=ic(d),l.memoizedState=nc,a):zf(l,S));if(S=a.memoizedState,S!==null){if(X=S.dehydrated,X!==null){if(B)return l.flags&256?(l.flags&=-257,rc(a,l,d,Error(o(422)))):l.memoizedState!==null?(l.child=a.child,l.flags|=128,null):(T=_.fallback,S=l.mode,_=wc({mode:"visible",children:_.children},S,0,null),T=xs(T,S,d,null),T.flags|=2,_.return=l,T.return=l,_.sibling=T,l.child=_,(l.mode&1)!==0&&no(l,a.child,null,d),l.child.memoizedState=ic(d),l.memoizedState=nc,T);if((l.mode&1)===0)l=rc(a,l,d,null);else if(ls(X))l=rc(a,l,d,Error(o(419)));else if(_=(d&a.childLanes)!==0,ai||_){if(_=ln,_!==null){switch(d&-d){case 4:T=2;break;case 16:T=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:T=32;break;case 536870912:T=268435456;break;default:T=0}_=(T&(_.suspendedLanes|d))!==0?0:T,_!==0&&_!==S.retryLane&&(S.retryLane=_,Ei(a,_,-1))}sd(),l=rc(a,l,d,Error(o(421)))}else ii(X)?(l.flags|=128,l.child=a.child,l=RS.bind(null,a),nf(X,l),l=null):(d=S.treeContext,Ze&&(oi=ea(X),si=l,Jt=!0,Di=null,ia=!1,d!==null&&(yi[Si++]=gr,yi[Si++]=_r,yi[Si++]=hs,gr=d.id,_r=d.overflow,hs=l)),l=zf(l,l.pendingProps.children),l.flags|=4096);return l}return T?(_=Wg(a,l,_.children,_.fallback,d),T=l.child,S=a.child.memoizedState,T.memoizedState=S===null?ic(d):{baseLanes:S.baseLanes|d,cachePool:null},T.childLanes=a.childLanes&~d,l.memoizedState=nc,_):(d=Gg(a,l,_.children,d),l.memoizedState=null,d)}return T?(_=Wg(a,l,_.children,_.fallback,d),T=l.child,S=a.child.memoizedState,T.memoizedState=S===null?ic(d):{baseLanes:S.baseLanes|d,cachePool:null},T.childLanes=a.childLanes&~d,l.memoizedState=nc,_):(d=Gg(a,l,_.children,d),l.memoizedState=null,d)}function zf(a,l){return l=wc({mode:"visible",children:l},a.mode,0,null),l.return=a,a.child=l}function Gg(a,l,d,_){var S=a.child;return a=S.sibling,d=zr(S,{mode:"visible",children:d}),(l.mode&1)===0&&(d.lanes=_),d.return=l,d.sibling=null,a!==null&&(_=l.deletions,_===null?(l.deletions=[a],l.flags|=16):_.push(a)),l.child=d}function Wg(a,l,d,_,S){var T=l.mode;a=a.child;var B=a.sibling,X={mode:"hidden",children:d};return(T&1)===0&&l.child!==a?(d=l.child,d.childLanes=0,d.pendingProps=X,l.deletions=null):(d=zr(a,X),d.subtreeFlags=a.subtreeFlags&14680064),B!==null?_=zr(B,_):(_=xs(_,T,S,null),_.flags|=2),_.return=l,d.return=l,d.sibling=_,l.child=d,_}function rc(a,l,d,_){return _!==null&&Ef(_),no(l,a.child,null,d),a=zf(l,l.pendingProps.children),a.flags|=2,l.memoizedState=null,a}function Xg(a,l,d){a.lanes|=l;var _=a.alternate;_!==null&&(_.lanes|=l),gf(a.return,l,d)}function kf(a,l,d,_,S){var T=a.memoizedState;T===null?a.memoizedState={isBackwards:l,rendering:null,renderingStartTime:0,last:_,tail:d,tailMode:S}:(T.isBackwards=l,T.rendering=null,T.renderingStartTime=0,T.last=_,T.tail=d,T.tailMode=S)}function qg(a,l,d){var _=l.pendingProps,S=_.revealOrder,T=_.tail;if(On(a,l,_.children,d),_=$t.current,(_&2)!==0)_=_&1|2,l.flags|=128;else{if(a!==null&&(a.flags&128)!==0)e:for(a=l.child;a!==null;){if(a.tag===13)a.memoizedState!==null&&Xg(a,d,l);else if(a.tag===19)Xg(a,d,l);else if(a.child!==null){a.child.return=a,a=a.child;continue}if(a===l)break e;for(;a.sibling===null;){if(a.return===null||a.return===l)break e;a=a.return}a.sibling.return=a.return,a=a.sibling}_&=1}if(Me($t,_),(l.mode&1)===0)l.memoizedState=null;else switch(S){case"forwards":for(d=l.child,S=null;d!==null;)a=d.alternate,a!==null&&ql(a)===null&&(S=d),d=d.sibling;d=S,d===null?(S=l.child,l.child=null):(S=d.sibling,d.sibling=null),kf(l,!1,S,d,T);break;case"backwards":for(d=null,S=l.child,l.child=null;S!==null;){if(a=S.alternate,a!==null&&ql(a)===null){l.child=S;break}a=S.sibling,S.sibling=d,d=S,S=a}kf(l,!0,d,null,T);break;case"together":kf(l,!1,null,null,void 0);break;default:l.memoizedState=null}return l.child}function xr(a,l,d){if(a!==null&&(l.dependencies=a.dependencies),ao|=l.lanes,(d&l.childLanes)===0)return null;if(a!==null&&l.child!==a.child)throw Error(o(153));if(l.child!==null){for(a=l.child,d=zr(a,a.pendingProps),l.child=d,d.return=l;a.sibling!==null;)a=a.sibling,d=d.sibling=zr(a,a.pendingProps),d.return=l;d.sibling=null}return l.child}function _S(a,l,d){switch(l.tag){case 3:kg(l),to();break;case 5:lg(l);break;case 1:qe(l.type)&&Ut(l);break;case 4:bf(l,l.stateNode.containerInfo);break;case 10:Ym(l,l.type._context,l.memoizedProps.value);break;case 13:var _=l.memoizedState;if(_!==null)return _.dehydrated!==null?(Me($t,$t.current&1),l.flags|=128,null):(d&l.child.childLanes)!==0?Hg(a,l,d):(Me($t,$t.current&1),a=xr(a,l,d),a!==null?a.sibling:null);Me($t,$t.current&1);break;case 19:if(_=(d&l.childLanes)!==0,(a.flags&128)!==0){if(_)return qg(a,l,d);l.flags|=128}var S=l.memoizedState;if(S!==null&&(S.rendering=null,S.tail=null,S.lastEffect=null),Me($t,$t.current),_)break;return null;case 22:case 23:return l.lanes=0,Og(a,l,d)}return xr(a,l,d)}function vS(a,l){switch(Sf(l),l.tag){case 1:return qe(l.type)&&Lt(),a=l.flags,a&65536?(l.flags=a&-65537|128,l):null;case 3:return ro(),ve(We),ve(ke),Cf(),a=l.flags,(a&65536)!==0&&(a&128)===0?(l.flags=a&-65537|128,l):null;case 5:return Tf(l),null;case 13:if(ve($t),a=l.memoizedState,a!==null&&a.dehydrated!==null){if(l.alternate===null)throw Error(o(340));to()}return a=l.flags,a&65536?(l.flags=a&-65537|128,l):null;case 19:return ve($t),null;case 4:return ro(),null;case 10:return mf(l.type._context),null;case 22:case 23:return rd(),null;case 24:return null;default:return null}}var sc=!1,ps=!1,xS=typeof WeakSet=="function"?WeakSet:Set,He=null;function oc(a,l){var d=a.ref;if(d!==null)if(typeof d=="function")try{d(null)}catch(_){jn(a,l,_)}else d.current=null}function Vf(a,l,d){try{d()}catch(_){jn(a,l,_)}}var Yg=!1;function yS(a,l){for(W(a.containerInfo),He=l;He!==null;)if(a=He,l=a.child,(a.subtreeFlags&1028)!==0&&l!==null)l.return=a,He=l;else for(;He!==null;){a=He;try{var d=a.alternate;if((a.flags&1024)!==0)switch(a.tag){case 0:case 11:case 15:break;case 1:if(d!==null){var _=d.memoizedProps,S=d.memoizedState,T=a.stateNode,B=T.getSnapshotBeforeUpdate(a.elementType===a.type?_:Li(a.type,_),S);T.__reactInternalSnapshotBeforeUpdate=B}break;case 3:Te&&G(a.stateNode.containerInfo);break;case 5:case 6:case 4:case 17:break;default:throw Error(o(163))}}catch(X){jn(a,a.return,X)}if(l=a.sibling,l!==null){l.return=a.return,He=l;break}He=a.return}return d=Yg,Yg=!1,d}function ms(a,l,d){var _=l.updateQueue;if(_=_!==null?_.lastEffect:null,_!==null){var S=_=_.next;do{if((S.tag&a)===a){var T=S.destroy;S.destroy=void 0,T!==void 0&&Vf(l,d,T)}S=S.next}while(S!==_)}}function ma(a,l){if(l=l.updateQueue,l=l!==null?l.lastEffect:null,l!==null){var d=l=l.next;do{if((d.tag&a)===a){var _=d.create;d.destroy=_()}d=d.next}while(d!==l)}}function Hf(a){var l=a.ref;if(l!==null){var d=a.stateNode;a.tag===5?a=Z(d):a=d,typeof l=="function"?l(a):l.current=a}}function Zg(a,l,d){if(qi&&typeof qi.onCommitFiberUnmount=="function")try{qi.onCommitFiberUnmount(Ul,l)}catch{}switch(l.tag){case 0:case 11:case 14:case 15:if(a=l.updateQueue,a!==null&&(a=a.lastEffect,a!==null)){var _=a=a.next;do{var S=_,T=S.destroy;S=S.tag,T!==void 0&&((S&2)!==0||(S&4)!==0)&&Vf(l,d,T),_=_.next}while(_!==a)}break;case 1:if(oc(l,d),a=l.stateNode,typeof a.componentWillUnmount=="function")try{a.props=l.memoizedProps,a.state=l.memoizedState,a.componentWillUnmount()}catch(B){jn(l,d,B)}break;case 5:oc(l,d);break;case 4:Te?e0(a,l,d):pt&&pt&&(l=l.stateNode.containerInfo,d=ce(l),_e(l,d))}}function Jg(a,l,d){for(var _=l;;)if(Zg(a,_,d),_.child===null||Te&&_.tag===4){if(_===l)break;for(;_.sibling===null;){if(_.return===null||_.return===l)return;_=_.return}_.sibling.return=_.return,_=_.sibling}else _.child.return=_,_=_.child}function jg(a){var l=a.alternate;l!==null&&(a.alternate=null,jg(l)),a.child=null,a.deletions=null,a.sibling=null,a.tag===5&&(l=a.stateNode,l!==null&&Ue(l)),a.stateNode=null,a.return=null,a.dependencies=null,a.memoizedProps=null,a.memoizedState=null,a.pendingProps=null,a.stateNode=null,a.updateQueue=null}function Kg(a){return a.tag===5||a.tag===3||a.tag===4}function Qg(a){e:for(;;){for(;a.sibling===null;){if(a.return===null||Kg(a.return))return null;a=a.return}for(a.sibling.return=a.return,a=a.sibling;a.tag!==5&&a.tag!==6&&a.tag!==18;){if(a.flags&2||a.child===null||a.tag===4)continue e;a.child.return=a,a=a.child}if(!(a.flags&2))return a.stateNode}}function $g(a){if(Te){e:{for(var l=a.return;l!==null;){if(Kg(l))break e;l=l.return}throw Error(o(160))}var d=l;switch(d.tag){case 5:l=d.stateNode,d.flags&32&&(Le(l),d.flags&=-33),d=Qg(a),Wf(a,d,l);break;case 3:case 4:l=d.stateNode.containerInfo,d=Qg(a),Gf(a,d,l);break;default:throw Error(o(161))}}}function Gf(a,l,d){var _=a.tag;if(_===5||_===6)a=a.stateNode,l?fe(d,a,l):ue(d,a);else if(_!==4&&(a=a.child,a!==null))for(Gf(a,l,d),a=a.sibling;a!==null;)Gf(a,l,d),a=a.sibling}function Wf(a,l,d){var _=a.tag;if(_===5||_===6)a=a.stateNode,l?ae(d,a,l):Q(d,a);else if(_!==4&&(a=a.child,a!==null))for(Wf(a,l,d),a=a.sibling;a!==null;)Wf(a,l,d),a=a.sibling}function e0(a,l,d){for(var _=l,S=!1,T,B;;){if(!S){S=_.return;e:for(;;){if(S===null)throw Error(o(160));switch(T=S.stateNode,S.tag){case 5:B=!1;break e;case 3:T=T.containerInfo,B=!0;break e;case 4:T=T.containerInfo,B=!0;break e}S=S.return}S=!0}if(_.tag===5||_.tag===6)Jg(a,_,d),B?Je(T,_.stateNode):Ve(T,_.stateNode);else if(_.tag===18)B?rf(T,_.stateNode):Dl(T,_.stateNode);else if(_.tag===4){if(_.child!==null){T=_.stateNode.containerInfo,B=!0,_.child.return=_,_=_.child;continue}}else if(Zg(a,_,d),_.child!==null){_.child.return=_,_=_.child;continue}if(_===l)break;for(;_.sibling===null;){if(_.return===null||_.return===l)return;_=_.return,_.tag===4&&(S=!1)}_.sibling.return=_.return,_=_.sibling}}function Xf(a,l){if(Te){switch(l.tag){case 0:case 11:case 14:case 15:ms(3,l,l.return),ma(3,l),ms(5,l,l.return);return;case 1:return;case 5:var d=l.stateNode;if(d!=null){var _=l.memoizedProps;a=a!==null?a.memoizedProps:_;var S=l.type,T=l.updateQueue;l.updateQueue=null,T!==null&&Pe(d,T,S,a,_,l)}return;case 6:if(l.stateNode===null)throw Error(o(162));d=l.memoizedProps,ge(l.stateNode,a!==null?a.memoizedProps:d,d);return;case 3:Ze&&a!==null&&a.memoizedState.isDehydrated&&cs(l.stateNode.containerInfo);return;case 12:return;case 13:ac(l);return;case 19:ac(l);return;case 17:return}throw Error(o(163))}switch(l.tag){case 0:case 11:case 14:case 15:ms(3,l,l.return),ma(3,l),ms(5,l,l.return);return;case 12:return;case 13:ac(l);return;case 19:ac(l);return;case 3:Ze&&a!==null&&a.memoizedState.isDehydrated&&cs(l.stateNode.containerInfo);break;case 22:case 23:return}e:if(pt){switch(l.tag){case 1:case 5:case 6:break e;case 3:case 4:l=l.stateNode,_e(l.containerInfo,l.pendingChildren);break e}throw Error(o(163))}}function ac(a){var l=a.updateQueue;if(l!==null){a.updateQueue=null;var d=a.stateNode;d===null&&(d=a.stateNode=new xS),l.forEach(function(_){var S=PS.bind(null,a,_);d.has(_)||(d.add(_),_.then(S,S))})}}function SS(a,l){for(He=l;He!==null;){l=He;var d=l.deletions;if(d!==null)for(var _=0;_<d.length;_++){var S=d[_];try{var T=a;Te?e0(T,S,l):Jg(T,S,l);var B=S.alternate;B!==null&&(B.return=null),S.return=null}catch(st){jn(S,l,st)}}if(d=l.child,(l.subtreeFlags&12854)!==0&&d!==null)d.return=l,He=d;else for(;He!==null;){l=He;try{var X=l.flags;if(X&32&&Te&&Le(l.stateNode),X&512){var le=l.alternate;if(le!==null){var Ae=le.ref;Ae!==null&&(typeof Ae=="function"?Ae(null):Ae.current=null)}}if(X&8192)switch(l.tag){case 13:if(l.memoizedState!==null){var et=l.alternate;(et===null||et.memoizedState===null)&&(Qf=vn())}break;case 22:var St=l.memoizedState!==null,lt=l.alternate,Wt=lt!==null&&lt.memoizedState!==null;if(d=l,Te){e:if(_=d,S=St,T=null,Te)for(var ot=_;;){if(ot.tag===5){if(T===null){T=ot;var Pn=ot.stateNode;S?Ce(Pn):yt(ot.stateNode,ot.memoizedProps)}}else if(ot.tag===6){if(T===null){var Ti=ot.stateNode;S?mt(Ti):It(Ti,ot.memoizedProps)}}else if((ot.tag!==22&&ot.tag!==23||ot.memoizedState===null||ot===_)&&ot.child!==null){ot.child.return=ot,ot=ot.child;continue}if(ot===_)break;for(;ot.sibling===null;){if(ot.return===null||ot.return===_)break e;T===ot&&(T=null),ot=ot.return}T===ot&&(T=null),ot.sibling.return=ot.return,ot=ot.sibling}}if(St&&!Wt&&(d.mode&1)!==0){He=d;for(var ne=d.child;ne!==null;){for(d=He=ne;He!==null;){_=He;var j=_.child;switch(_.tag){case 0:case 11:case 14:case 15:ms(4,_,_.return);break;case 1:oc(_,_.return);var se=_.stateNode;if(typeof se.componentWillUnmount=="function"){var Xe=_.return;try{se.props=_.memoizedProps,se.state=_.memoizedState,se.componentWillUnmount()}catch(st){jn(_,Xe,st)}}break;case 5:oc(_,_.return);break;case 22:if(_.memoizedState!==null){i0(d);continue}}j!==null?(j.return=_,He=j):i0(d)}ne=ne.sibling}}}switch(X&4102){case 2:$g(l),l.flags&=-3;break;case 6:$g(l),l.flags&=-3,Xf(l.alternate,l);break;case 4096:l.flags&=-4097;break;case 4100:l.flags&=-4097,Xf(l.alternate,l);break;case 4:Xf(l.alternate,l)}}catch(st){jn(l,l.return,st)}if(d=l.sibling,d!==null){d.return=l.return,He=d;break}He=l.return}}}function MS(a,l,d){He=a,t0(a)}function t0(a,l,d){for(var _=(a.mode&1)!==0;He!==null;){var S=He,T=S.child;if(S.tag===22&&_){var B=S.memoizedState!==null||sc;if(!B){var X=S.alternate,le=X!==null&&X.memoizedState!==null||ps;X=sc;var Ae=ps;if(sc=B,(ps=le)&&!Ae)for(He=S;He!==null;)B=He,le=B.child,B.tag===22&&B.memoizedState!==null?r0(S):le!==null?(le.return=B,He=le):r0(S);for(;T!==null;)He=T,t0(T),T=T.sibling;He=S,sc=X,ps=Ae}n0(a)}else(S.subtreeFlags&8772)!==0&&T!==null?(T.return=S,He=T):n0(a)}}function n0(a){for(;He!==null;){var l=He;if((l.flags&8772)!==0){var d=l.alternate;try{if((l.flags&8772)!==0)switch(l.tag){case 0:case 11:case 15:ps||ma(5,l);break;case 1:var _=l.stateNode;if(l.flags&4&&!ps)if(d===null)_.componentDidMount();else{var S=l.elementType===l.type?d.memoizedProps:Li(l.type,d.memoizedProps);_.componentDidUpdate(S,d.memoizedState,_.__reactInternalSnapshotBeforeUpdate)}var T=l.updateQueue;T!==null&&jm(l,T,_);break;case 3:var B=l.updateQueue;if(B!==null){if(d=null,l.child!==null)switch(l.child.tag){case 5:d=Z(l.child.stateNode);break;case 1:d=l.child.stateNode}jm(l,B,d)}break;case 5:var X=l.stateNode;d===null&&l.flags&4&&Ee(X,l.type,l.memoizedProps,l);break;case 6:break;case 4:break;case 12:break;case 13:if(Ze&&l.memoizedState===null){var le=l.alternate;if(le!==null){var Ae=le.memoizedState;if(Ae!==null){var et=Ae.dehydrated;et!==null&&Ll(et)}}}break;case 19:case 17:case 21:case 22:case 23:break;default:throw Error(o(163))}ps||l.flags&512&&Hf(l)}catch(St){jn(l,l.return,St)}}if(l===a){He=null;break}if(d=l.sibling,d!==null){d.return=l.return,He=d;break}He=l.return}}function i0(a){for(;He!==null;){var l=He;if(l===a){He=null;break}var d=l.sibling;if(d!==null){d.return=l.return,He=d;break}He=l.return}}function r0(a){for(;He!==null;){var l=He;try{switch(l.tag){case 0:case 11:case 15:var d=l.return;try{ma(4,l)}catch(le){jn(l,d,le)}break;case 1:var _=l.stateNode;if(typeof _.componentDidMount=="function"){var S=l.return;try{_.componentDidMount()}catch(le){jn(l,S,le)}}var T=l.return;try{Hf(l)}catch(le){jn(l,T,le)}break;case 5:var B=l.return;try{Hf(l)}catch(le){jn(l,B,le)}}}catch(le){jn(l,l.return,le)}if(l===a){He=null;break}var X=l.sibling;if(X!==null){X.return=l.return,He=X;break}He=l.return}}var lc=0,cc=1,uc=2,hc=3,fc=4;if(typeof Symbol=="function"&&Symbol.for){var ga=Symbol.for;lc=ga("selector.component"),cc=ga("selector.has_pseudo_class"),uc=ga("selector.role"),hc=ga("selector.test_id"),fc=ga("selector.text")}function qf(a){var l=de(a);if(l!=null){if(typeof l.memoizedProps["data-testname"]!="string")throw Error(o(364));return l}if(a=ft(a),a===null)throw Error(o(362));return a.stateNode.current}function Yf(a,l){switch(l.$$typeof){case lc:if(a.type===l.value)return!0;break;case cc:e:{l=l.value,a=[a,0];for(var d=0;d<a.length;){var _=a[d++],S=a[d++],T=l[S];if(_.tag!==5||!ye(_)){for(;T!=null&&Yf(_,T);)S++,T=l[S];if(S===l.length){l=!0;break e}else for(_=_.child;_!==null;)a.push(_,S),_=_.sibling}}l=!1}return l;case uc:if(a.tag===5&&Pt(a.stateNode,l.value))return!0;break;case fc:if((a.tag===5||a.tag===6)&&(a=ct(a),a!==null&&0<=a.indexOf(l.value)))return!0;break;case hc:if(a.tag===5&&(a=a.memoizedProps["data-testname"],typeof a=="string"&&a.toLowerCase()===l.value.toLowerCase()))return!0;break;default:throw Error(o(365))}return!1}function Zf(a){switch(a.$$typeof){case lc:return"<"+(U(a.value)||"Unknown")+">";case cc:return":has("+(Zf(a)||"")+")";case uc:return'[role="'+a.value+'"]';case fc:return'"'+a.value+'"';case hc:return'[data-testname="'+a.value+'"]';default:throw Error(o(365))}}function s0(a,l){var d=[];a=[a,0];for(var _=0;_<a.length;){var S=a[_++],T=a[_++],B=l[T];if(S.tag!==5||!ye(S)){for(;B!=null&&Yf(S,B);)T++,B=l[T];if(T===l.length)d.push(S);else for(S=S.child;S!==null;)a.push(S,T),S=S.sibling}}return d}function Jf(a,l){if(!k)throw Error(o(363));a=qf(a),a=s0(a,l),l=[],a=Array.from(a);for(var d=0;d<a.length;){var _=a[d++];if(_.tag===5)ye(_)||l.push(_.stateNode);else for(_=_.child;_!==null;)a.push(_),_=_.sibling}return l}var wS=Math.ceil,dc=c.ReactCurrentDispatcher,jf=c.ReactCurrentOwner,rn=c.ReactCurrentBatchConfig,Tt=0,ln=null,cn=null,Mn=0,li=0,oo=$(0),dn=0,_a=null,ao=0,pc=0,Kf=0,va=null,Zn=null,Qf=0,$f=1/0;function lo(){$f=vn()+500}var mc=!1,ed=null,Ur=null,gc=!1,Fr=null,_c=0,xa=0,td=null,vc=-1,xc=0;function Bn(){return(Tt&6)!==0?vn():vc!==-1?vc:vc=vn()}function Or(a){return(a.mode&1)===0?1:(Tt&2)!==0&&Mn!==0?Mn&-Mn:sS.transition!==null?(xc===0&&(a=Fn,Fn<<=1,(Fn&4194240)===0&&(Fn=64),xc=a),xc):(a=Ot,a!==0?a:me())}function Ei(a,l,d){if(50<xa)throw xa=0,td=null,Error(o(185));var _=yc(a,l);return _===null?null:(vi(_,l,d),((Tt&2)===0||_!==ln)&&(_===ln&&((Tt&2)===0&&(pc|=l),dn===4&&Br(_,Mn)),Jn(_,d),l===1&&Tt===0&&(a.mode&1)===0&&(lo(),Fl&&Zi())),_)}function yc(a,l){a.lanes|=l;var d=a.alternate;for(d!==null&&(d.lanes|=l),d=a,a=a.return;a!==null;)a.childLanes|=l,d=a.alternate,d!==null&&(d.childLanes|=l),d=a,a=a.return;return d.tag===3?d.stateNode:null}function Jn(a,l){var d=a.callbackNode;Xi(a,l);var _=Ft(a,a===ln?Mn:0);if(_===0)d!==null&&Xm(d),a.callbackNode=null,a.callbackPriority=0;else if(l=_&-_,a.callbackPriority!==l){if(d!=null&&Xm(d),l===1)a.tag===0?rS(a0.bind(null,a)):qm(a0.bind(null,a)),De?at(function(){Tt===0&&Zi()}):cf(uf,Zi),d=null;else{switch(Wm(_)){case 1:d=uf;break;case 4:d=eS;break;case 16:d=hf;break;case 536870912:d=tS;break;default:d=hf}d=g0(d,o0.bind(null,a))}a.callbackPriority=l,a.callbackNode=d}}function o0(a,l){if(vc=-1,xc=0,(Tt&6)!==0)throw Error(o(327));var d=a.callbackNode;if(vs()&&a.callbackNode!==d)return null;var _=Ft(a,a===ln?Mn:0);if(_===0)return null;if((_&30)!==0||(_&a.expiredLanes)!==0||l)l=Sc(a,_);else{l=_;var S=Tt;Tt|=2;var T=u0();(ln!==a||Mn!==l)&&(lo(),gs(a,l));do try{TS();break}catch(X){c0(a,X)}while(!0);pf(),dc.current=T,Tt=S,cn!==null?l=0:(ln=null,Mn=0,l=dn)}if(l!==0){if(l===2&&(S=Vt(a),S!==0&&(_=S,l=nd(a,S))),l===1)throw d=_a,gs(a,0),Br(a,_),Jn(a,vn()),d;if(l===6)Br(a,_);else{if(S=a.current.alternate,(_&30)===0&&!ES(S)&&(l=Sc(a,_),l===2&&(T=Vt(a),T!==0&&(_=T,l=nd(a,T))),l===1))throw d=_a,gs(a,0),Br(a,_),Jn(a,vn()),d;switch(a.finishedWork=S,a.finishedLanes=_,l){case 0:case 1:throw Error(o(345));case 2:_s(a,Zn);break;case 3:if(Br(a,_),(_&130023424)===_&&(l=Qf+500-vn(),10<l)){if(Ft(a,0)!==0)break;if(S=a.suspendedLanes,(S&_)!==_){Bn(),a.pingedLanes|=a.suspendedLanes&S;break}a.timeoutHandle=we(_s.bind(null,a,Zn),l);break}_s(a,Zn);break;case 4:if(Br(a,_),(_&4194240)===_)break;for(l=a.eventTimes,S=-1;0<_;){var B=31-Be(_);T=1<<B,B=l[B],B>S&&(S=B),_&=~T}if(_=S,_=vn()-_,_=(120>_?120:480>_?480:1080>_?1080:1920>_?1920:3e3>_?3e3:4320>_?4320:1960*wS(_/1960))-_,10<_){a.timeoutHandle=we(_s.bind(null,a,Zn),_);break}_s(a,Zn);break;case 5:_s(a,Zn);break;default:throw Error(o(329))}}}return Jn(a,vn()),a.callbackNode===d?o0.bind(null,a):null}function nd(a,l){var d=va;return a.current.memoizedState.isDehydrated&&(gs(a,l).flags|=256),a=Sc(a,l),a!==2&&(l=Zn,Zn=d,l!==null&&id(l)),a}function id(a){Zn===null?Zn=a:Zn.push.apply(Zn,a)}function ES(a){for(var l=a;;){if(l.flags&16384){var d=l.updateQueue;if(d!==null&&(d=d.stores,d!==null))for(var _=0;_<d.length;_++){var S=d[_],T=S.getSnapshot;S=S.value;try{if(!Yi(T(),S))return!1}catch{return!1}}}if(d=l.child,l.subtreeFlags&16384&&d!==null)d.return=l,l=d;else{if(l===a)break;for(;l.sibling===null;){if(l.return===null||l.return===a)return!0;l=l.return}l.sibling.return=l.return,l=l.sibling}}return!0}function Br(a,l){for(l&=~Kf,l&=~pc,a.suspendedLanes|=l,a.pingedLanes&=~l,a=a.expirationTimes;0<l;){var d=31-Be(l),_=1<<d;a[d]=-1,l&=~_}}function a0(a){if((Tt&6)!==0)throw Error(o(327));vs();var l=Ft(a,0);if((l&1)===0)return Jn(a,vn()),null;var d=Sc(a,l);if(a.tag!==0&&d===2){var _=Vt(a);_!==0&&(l=_,d=nd(a,_))}if(d===1)throw d=_a,gs(a,0),Br(a,l),Jn(a,vn()),d;if(d===6)throw Error(o(345));return a.finishedWork=a.current.alternate,a.finishedLanes=l,_s(a,Zn),Jn(a,vn()),null}function l0(a){Fr!==null&&Fr.tag===0&&(Tt&6)===0&&vs();var l=Tt;Tt|=1;var d=rn.transition,_=Ot;try{if(rn.transition=null,Ot=1,a)return a()}finally{Ot=_,rn.transition=d,Tt=l,(Tt&6)===0&&Zi()}}function rd(){li=oo.current,ve(oo)}function gs(a,l){a.finishedWork=null,a.finishedLanes=0;var d=a.timeoutHandle;if(d!==$e&&(a.timeoutHandle=$e,Se(d)),cn!==null)for(d=cn.return;d!==null;){var _=d;switch(Sf(_),_.tag){case 1:_=_.type.childContextTypes,_!=null&&Lt();break;case 3:ro(),ve(We),ve(ke),Cf();break;case 5:Tf(_);break;case 4:ro();break;case 13:ve($t);break;case 19:ve($t);break;case 10:mf(_.type._context);break;case 22:case 23:rd()}d=d.return}if(ln=a,cn=a=zr(a.current,null),Mn=li=l,dn=0,_a=null,Kf=pc=ao=0,Zn=va=null,Ji!==null){for(l=0;l<Ji.length;l++)if(d=Ji[l],_=d.interleaved,_!==null){d.interleaved=null;var S=_.next,T=d.pending;if(T!==null){var B=T.next;T.next=S,_.next=B}d.pending=_}Ji=null}return a}function c0(a,l){do{var d=cn;try{if(pf(),Yl.current=$l,Zl){for(var _=tn.memoizedState;_!==null;){var S=_.queue;S!==null&&(S.pending=null),_=_.next}Zl=!1}if(so=0,xn=An=tn=null,la=!1,ca=0,jf.current=null,d===null||d.return===null){dn=1,_a=l,cn=null;break}e:{var T=a,B=d.return,X=d,le=l;if(l=Mn,X.flags|=32768,le!==null&&typeof le=="object"&&typeof le.then=="function"){var Ae=le,et=X,St=et.tag;if((et.mode&1)===0&&(St===0||St===11||St===15)){var lt=et.alternate;lt?(et.updateQueue=lt.updateQueue,et.memoizedState=lt.memoizedState,et.lanes=lt.lanes):(et.updateQueue=null,et.memoizedState=null)}var Wt=Pg(B);if(Wt!==null){Wt.flags&=-257,Ig(Wt,B,X,T,l),Wt.mode&1&&Rg(T,Ae,l),l=Wt,le=Ae;var ot=l.updateQueue;if(ot===null){var Pn=new Set;Pn.add(le),l.updateQueue=Pn}else ot.add(le);break e}else{if((l&1)===0){Rg(T,Ae,l),sd();break e}le=Error(o(426))}}else if(Jt&&X.mode&1){var Ti=Pg(B);if(Ti!==null){(Ti.flags&65536)===0&&(Ti.flags|=256),Ig(Ti,B,X,T,l),Ef(le);break e}}T=le,dn!==4&&(dn=2),va===null?va=[T]:va.push(T),le=Uf(le,X),X=B;do{switch(X.tag){case 3:X.flags|=65536,l&=-l,X.lanes|=l;var ne=Ag(X,le,l);Jm(X,ne);break e;case 1:T=le;var j=X.type,se=X.stateNode;if((X.flags&128)===0&&(typeof j.getDerivedStateFromError=="function"||se!==null&&typeof se.componentDidCatch=="function"&&(Ur===null||!Ur.has(se)))){X.flags|=65536,l&=-l,X.lanes|=l;var Xe=Cg(X,T,l);Jm(X,Xe);break e}}X=X.return}while(X!==null)}f0(d)}catch(st){l=st,cn===d&&d!==null&&(cn=d=d.return);continue}break}while(!0)}function u0(){var a=dc.current;return dc.current=$l,a===null?$l:a}function sd(){(dn===0||dn===3||dn===2)&&(dn=4),ln===null||(ao&268435455)===0&&(pc&268435455)===0||Br(ln,Mn)}function Sc(a,l){var d=Tt;Tt|=2;var _=u0();ln===a&&Mn===l||gs(a,l);do try{bS();break}catch(S){c0(a,S)}while(!0);if(pf(),Tt=d,dc.current=_,cn!==null)throw Error(o(261));return ln=null,Mn=0,dn}function bS(){for(;cn!==null;)h0(cn)}function TS(){for(;cn!==null&&!Qy();)h0(cn)}function h0(a){var l=m0(a.alternate,a,li);a.memoizedProps=a.pendingProps,l===null?f0(a):cn=l,jf.current=null}function f0(a){var l=a;do{var d=l.alternate;if(a=l.return,(l.flags&32768)===0){if(d=mS(d,l,li),d!==null){cn=d;return}}else{if(d=vS(d,l),d!==null){d.flags&=32767,cn=d;return}if(a!==null)a.flags|=32768,a.subtreeFlags=0,a.deletions=null;else{dn=6,cn=null;return}}if(l=l.sibling,l!==null){cn=l;return}cn=l=a}while(l!==null);dn===0&&(dn=5)}function _s(a,l){var d=Ot,_=rn.transition;try{rn.transition=null,Ot=1,AS(a,l,d)}finally{rn.transition=_,Ot=d}return null}function AS(a,l,d){do vs();while(Fr!==null);if((Tt&6)!==0)throw Error(o(327));var _=a.finishedWork,S=a.finishedLanes;if(_===null)return null;if(a.finishedWork=null,a.finishedLanes=0,_===a.current)throw Error(o(177));a.callbackNode=null,a.callbackPriority=0;var T=_.lanes|_.childLanes;if(Nl(a,T),a===ln&&(cn=ln=null,Mn=0),(_.subtreeFlags&2064)===0&&(_.flags&2064)===0||gc||(gc=!0,g0(hf,function(){return vs(),null})),T=(_.flags&15990)!==0,(_.subtreeFlags&15990)!==0||T){T=rn.transition,rn.transition=null;var B=Ot;Ot=1;var X=Tt;Tt|=4,jf.current=null,yS(a,_),SS(a,_),q(a.containerInfo),a.current=_,MS(_),$y(),Tt=X,Ot=B,rn.transition=T}else a.current=_;if(gc&&(gc=!1,Fr=a,_c=S),T=a.pendingLanes,T===0&&(Ur=null),nS(_.stateNode),Jn(a,vn()),l!==null)for(d=a.onRecoverableError,_=0;_<l.length;_++)d(l[_]);if(mc)throw mc=!1,a=ed,ed=null,a;return(_c&1)!==0&&a.tag!==0&&vs(),T=a.pendingLanes,(T&1)!==0?a===td?xa++:(xa=0,td=a):xa=0,Zi(),null}function vs(){if(Fr!==null){var a=Wm(_c),l=rn.transition,d=Ot;try{if(rn.transition=null,Ot=16>a?16:a,Fr===null)var _=!1;else{if(a=Fr,Fr=null,_c=0,(Tt&6)!==0)throw Error(o(331));var S=Tt;for(Tt|=4,He=a.current;He!==null;){var T=He,B=T.child;if((He.flags&16)!==0){var X=T.deletions;if(X!==null){for(var le=0;le<X.length;le++){var Ae=X[le];for(He=Ae;He!==null;){var et=He;switch(et.tag){case 0:case 11:case 15:ms(8,et,T)}var St=et.child;if(St!==null)St.return=et,He=St;else for(;He!==null;){et=He;var lt=et.sibling,Wt=et.return;if(jg(et),et===Ae){He=null;break}if(lt!==null){lt.return=Wt,He=lt;break}He=Wt}}}var ot=T.alternate;if(ot!==null){var Pn=ot.child;if(Pn!==null){ot.child=null;do{var Ti=Pn.sibling;Pn.sibling=null,Pn=Ti}while(Pn!==null)}}He=T}}if((T.subtreeFlags&2064)!==0&&B!==null)B.return=T,He=B;else e:for(;He!==null;){if(T=He,(T.flags&2048)!==0)switch(T.tag){case 0:case 11:case 15:ms(9,T,T.return)}var ne=T.sibling;if(ne!==null){ne.return=T.return,He=ne;break e}He=T.return}}var j=a.current;for(He=j;He!==null;){B=He;var se=B.child;if((B.subtreeFlags&2064)!==0&&se!==null)se.return=B,He=se;else e:for(B=j;He!==null;){if(X=He,(X.flags&2048)!==0)try{switch(X.tag){case 0:case 11:case 15:ma(9,X)}}catch(st){jn(X,X.return,st)}if(X===B){He=null;break e}var Xe=X.sibling;if(Xe!==null){Xe.return=X.return,He=Xe;break e}He=X.return}}if(Tt=S,Zi(),qi&&typeof qi.onPostCommitFiberRoot=="function")try{qi.onPostCommitFiberRoot(Ul,a)}catch{}_=!0}return _}finally{Ot=d,rn.transition=l}}return!1}function d0(a,l,d){l=Uf(d,l),l=Ag(a,l,1),Nr(a,l),l=Bn(),a=yc(a,1),a!==null&&(vi(a,1,l),Jn(a,l))}function jn(a,l,d){if(a.tag===3)d0(a,a,d);else for(;l!==null;){if(l.tag===3){d0(l,a,d);break}else if(l.tag===1){var _=l.stateNode;if(typeof l.type.getDerivedStateFromError=="function"||typeof _.componentDidCatch=="function"&&(Ur===null||!Ur.has(_))){a=Uf(d,a),a=Cg(l,a,1),Nr(l,a),a=Bn(),l=yc(l,1),l!==null&&(vi(l,1,a),Jn(l,a));break}}l=l.return}}function CS(a,l,d){var _=a.pingCache;_!==null&&_.delete(l),l=Bn(),a.pingedLanes|=a.suspendedLanes&d,ln===a&&(Mn&d)===d&&(dn===4||dn===3&&(Mn&130023424)===Mn&&500>vn()-Qf?gs(a,0):Kf|=d),Jn(a,l)}function p0(a,l){l===0&&((a.mode&1)===0?l=1:(l=ri,ri<<=1,(ri&130023424)===0&&(ri=4194304)));var d=Bn();a=yc(a,l),a!==null&&(vi(a,l,d),Jn(a,d))}function RS(a){var l=a.memoizedState,d=0;l!==null&&(d=l.retryLane),p0(a,d)}function PS(a,l){var d=0;switch(a.tag){case 13:var _=a.stateNode,S=a.memoizedState;S!==null&&(d=S.retryLane);break;case 19:_=a.stateNode;break;default:throw Error(o(314))}_!==null&&_.delete(l),p0(a,d)}var m0;m0=function(a,l,d){if(a!==null)if(a.memoizedProps!==l.pendingProps||We.current)ai=!0;else{if((a.lanes&d)===0&&(l.flags&128)===0)return ai=!1,_S(a,l,d);ai=(a.flags&131072)!==0}else ai=!1,Jt&&(l.flags&1048576)!==0&&tg(l,Wl,l.index);switch(l.lanes=0,l.tag){case 2:var _=l.type;a!==null&&(a.alternate=null,l.alternate=null,l.flags|=2),a=l.pendingProps;var S=gt(l,ke.current);Qs(l,d),S=Pf(null,l,_,a,S,d);var T=If();return l.flags|=1,typeof S=="object"&&S!==null&&typeof S.render=="function"&&S.$$typeof===void 0?(l.tag=1,l.memoizedState=null,l.updateQueue=null,qe(_)?(T=!0,Ut(l)):T=!1,l.memoizedState=S.state!==null&&S.state!==void 0?S.state:null,_f(l),S.updater=Hl,l.stateNode=S,S._reactInternals=l,xf(l,_,a,d),l=Bf(null,l,_,!0,T,d)):(l.tag=0,Jt&&T&&yf(l),On(null,l,S,d),l=l.child),l;case 16:_=l.elementType;e:{switch(a!==null&&(a.alternate=null,l.alternate=null,l.flags|=2),a=l.pendingProps,S=_._init,_=S(_._payload),l.type=_,S=l.tag=LS(_),a=Li(_,a),S){case 0:l=Of(null,l,_,a,d);break e;case 1:l=zg(null,l,_,a,d);break e;case 11:l=Ng(null,l,_,a,d);break e;case 14:l=Ug(null,l,_,Li(_.type,a),d);break e}throw Error(o(306,_,""))}return l;case 0:return _=l.type,S=l.pendingProps,S=l.elementType===_?S:Li(_,S),Of(a,l,_,S,d);case 1:return _=l.type,S=l.pendingProps,S=l.elementType===_?S:Li(_,S),zg(a,l,_,S,d);case 3:e:{if(kg(l),a===null)throw Error(o(387));_=l.pendingProps,T=l.memoizedState,S=T.element,Zm(a,l),Vl(l,_,null,d);var B=l.memoizedState;if(_=B.element,Ze&&T.isDehydrated)if(T={element:_,isDehydrated:!1,cache:B.cache,transitions:B.transitions},l.updateQueue.baseState=T,l.memoizedState=T,l.flags&256){S=Error(o(423)),l=Vg(a,l,_,d,S);break e}else if(_!==S){S=Error(o(424)),l=Vg(a,l,_,d,S);break e}else for(Ze&&(oi=dr(l.stateNode.containerInfo),si=l,Jt=!0,Di=null,ia=!1),d=ag(l,null,_,d),l.child=d;d;)d.flags=d.flags&-3|4096,d=d.sibling;else{if(to(),_===S){l=xr(a,l,d);break e}On(a,l,_,d)}l=l.child}return l;case 5:return lg(l),a===null&&wf(l),_=l.type,S=l.pendingProps,T=a!==null?a.memoizedProps:null,B=S.children,Qe(_,S)?B=null:T!==null&&Qe(_,T)&&(l.flags|=32),Bg(a,l),On(a,l,B,d),l.child;case 6:return a===null&&wf(l),null;case 13:return Hg(a,l,d);case 4:return bf(l,l.stateNode.containerInfo),_=l.pendingProps,a===null?l.child=no(l,null,_,d):On(a,l,_,d),l.child;case 11:return _=l.type,S=l.pendingProps,S=l.elementType===_?S:Li(_,S),Ng(a,l,_,S,d);case 7:return On(a,l,l.pendingProps,d),l.child;case 8:return On(a,l,l.pendingProps.children,d),l.child;case 12:return On(a,l,l.pendingProps.children,d),l.child;case 10:e:{if(_=l.type._context,S=l.pendingProps,T=l.memoizedProps,B=S.value,Ym(l,_,B),T!==null)if(Yi(T.value,B)){if(T.children===S.children&&!We.current){l=xr(a,l,d);break e}}else for(T=l.child,T!==null&&(T.return=l);T!==null;){var X=T.dependencies;if(X!==null){B=T.child;for(var le=X.firstContext;le!==null;){if(le.context===_){if(T.tag===1){le=mr(-1,d&-d),le.tag=2;var Ae=T.updateQueue;if(Ae!==null){Ae=Ae.shared;var et=Ae.pending;et===null?le.next=le:(le.next=et.next,et.next=le),Ae.pending=le}}T.lanes|=d,le=T.alternate,le!==null&&(le.lanes|=d),gf(T.return,d,l),X.lanes|=d;break}le=le.next}}else if(T.tag===10)B=T.type===l.type?null:T.child;else if(T.tag===18){if(B=T.return,B===null)throw Error(o(341));B.lanes|=d,X=B.alternate,X!==null&&(X.lanes|=d),gf(B,d,l),B=T.sibling}else B=T.child;if(B!==null)B.return=T;else for(B=T;B!==null;){if(B===l){B=null;break}if(T=B.sibling,T!==null){T.return=B.return,B=T;break}B=B.return}T=B}On(a,l,S.children,d),l=l.child}return l;case 9:return S=l.type,_=l.pendingProps.children,Qs(l,d),S=xi(S),_=_(S),l.flags|=1,On(a,l,_,d),l.child;case 14:return _=l.type,S=Li(_,l.pendingProps),S=Li(_.type,S),Ug(a,l,_,S,d);case 15:return Fg(a,l,l.type,l.pendingProps,d);case 17:return _=l.type,S=l.pendingProps,S=l.elementType===_?S:Li(_,S),a!==null&&(a.alternate=null,l.alternate=null,l.flags|=2),l.tag=1,qe(_)?(a=!0,Ut(l)):a=!1,Qs(l,d),$m(l,_,S),xf(l,_,S,d),Bf(null,l,_,!0,a,d);case 19:return qg(a,l,d);case 22:return Og(a,l,d)}throw Error(o(156,l.tag))};function g0(a,l){return cf(a,l)}function IS(a,l,d,_){this.tag=a,this.key=d,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=l,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=_,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function bi(a,l,d,_){return new IS(a,l,d,_)}function od(a){return a=a.prototype,!(!a||!a.isReactComponent)}function LS(a){if(typeof a=="function")return od(a)?1:0;if(a!=null){if(a=a.$$typeof,a===w)return 11;if(a===M)return 14}return 2}function zr(a,l){var d=a.alternate;return d===null?(d=bi(a.tag,l,a.key,a.mode),d.elementType=a.elementType,d.type=a.type,d.stateNode=a.stateNode,d.alternate=a,a.alternate=d):(d.pendingProps=l,d.type=a.type,d.flags=0,d.subtreeFlags=0,d.deletions=null),d.flags=a.flags&14680064,d.childLanes=a.childLanes,d.lanes=a.lanes,d.child=a.child,d.memoizedProps=a.memoizedProps,d.memoizedState=a.memoizedState,d.updateQueue=a.updateQueue,l=a.dependencies,d.dependencies=l===null?null:{lanes:l.lanes,firstContext:l.firstContext},d.sibling=a.sibling,d.index=a.index,d.ref=a.ref,d}function Mc(a,l,d,_,S,T){var B=2;if(_=a,typeof a=="function")od(a)&&(B=1);else if(typeof a=="string")B=5;else e:switch(a){case f:return xs(d.children,S,T,l);case p:B=8,S|=8;break;case m:return a=bi(12,d,l,S|2),a.elementType=m,a.lanes=T,a;case y:return a=bi(13,d,l,S),a.elementType=y,a.lanes=T,a;case v:return a=bi(19,d,l,S),a.elementType=v,a.lanes=T,a;case b:return wc(d,S,T,l);default:if(typeof a=="object"&&a!==null)switch(a.$$typeof){case g:B=10;break e;case x:B=9;break e;case w:B=11;break e;case M:B=14;break e;case E:B=16,_=null;break e}throw Error(o(130,a==null?a:typeof a,""))}return l=bi(B,d,l,S),l.elementType=a,l.type=_,l.lanes=T,l}function xs(a,l,d,_){return a=bi(7,a,_,l),a.lanes=d,a}function wc(a,l,d,_){return a=bi(22,a,_,l),a.elementType=b,a.lanes=d,a.stateNode={},a}function ad(a,l,d){return a=bi(6,a,null,l),a.lanes=d,a}function ld(a,l,d){return l=bi(4,a.children!==null?a.children:[],a.key,l),l.lanes=d,l.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation},l}function DS(a,l,d,_,S){this.tag=l,this.containerInfo=a,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=$e,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=_i(0),this.expirationTimes=_i(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=_i(0),this.identifierPrefix=_,this.onRecoverableError=S,Ze&&(this.mutableSourceEagerHydrationData=null)}function _0(a,l,d,_,S,T,B,X,le){return a=new DS(a,l,d,X,le),l===1?(l=1,T===!0&&(l|=8)):l=0,T=bi(3,null,null,l),a.current=T,T.stateNode=a,T.memoizedState={element:_,isDehydrated:d,cache:null,transitions:null},_f(T),a}function v0(a){if(!a)return Fe;a=a._reactInternals;e:{if(P(a)!==a||a.tag!==1)throw Error(o(170));var l=a;do{switch(l.tag){case 3:l=l.stateNode.context;break e;case 1:if(qe(l.type)){l=l.stateNode.__reactInternalMemoizedMergedChildContext;break e}}l=l.return}while(l!==null);throw Error(o(171))}if(a.tag===1){var d=a.type;if(qe(d))return Xt(a,d,l)}return l}function x0(a){var l=a._reactInternals;if(l===void 0)throw typeof a.render=="function"?Error(o(188)):(a=Object.keys(a).join(","),Error(o(268,a)));return a=V(l),a===null?null:a.stateNode}function y0(a,l){if(a=a.memoizedState,a!==null&&a.dehydrated!==null){var d=a.retryLane;a.retryLane=d!==0&&d<l?d:l}}function cd(a,l){y0(a,l),(a=a.alternate)&&y0(a,l)}function NS(a){return a=V(a),a===null?null:a.stateNode}function US(){return null}return t.attemptContinuousHydration=function(a){if(a.tag===13){var l=Bn();Ei(a,134217728,l),cd(a,134217728)}},t.attemptHydrationAtCurrentPriority=function(a){if(a.tag===13){var l=Bn(),d=Or(a);Ei(a,d,l),cd(a,d)}},t.attemptSynchronousHydration=function(a){switch(a.tag){case 3:var l=a.stateNode;if(l.current.memoizedState.isDehydrated){var d=gi(l.pendingLanes);d!==0&&(lf(l,d|1),Jn(l,vn()),(Tt&6)===0&&(lo(),Zi()))}break;case 13:var _=Bn();l0(function(){return Ei(a,1,_)}),cd(a,1)}},t.batchedUpdates=function(a,l){var d=Tt;Tt|=1;try{return a(l)}finally{Tt=d,Tt===0&&(lo(),Fl&&Zi())}},t.createComponentSelector=function(a){return{$$typeof:lc,value:a}},t.createContainer=function(a,l,d,_,S,T,B){return _0(a,l,!1,null,d,_,S,T,B)},t.createHasPseudoClassSelector=function(a){return{$$typeof:cc,value:a}},t.createHydrationContainer=function(a,l,d,_,S,T,B,X,le){return a=_0(d,_,!0,a,S,T,B,X,le),a.context=v0(null),d=a.current,_=Bn(),S=Or(d),T=mr(_,S),T.callback=l??null,Nr(d,T),a.current.lanes=S,vi(a,S,_),Jn(a,_),a},t.createPortal=function(a,l,d){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:h,key:_==null?null:""+_,children:a,containerInfo:l,implementation:d}},t.createRoleSelector=function(a){return{$$typeof:uc,value:a}},t.createTestNameSelector=function(a){return{$$typeof:hc,value:a}},t.createTextSelector=function(a){return{$$typeof:fc,value:a}},t.deferredUpdates=function(a){var l=Ot,d=rn.transition;try{return rn.transition=null,Ot=16,a()}finally{Ot=l,rn.transition=d}},t.discreteUpdates=function(a,l,d,_,S){var T=Ot,B=rn.transition;try{return rn.transition=null,Ot=1,a(l,d,_,S)}finally{Ot=T,rn.transition=B,Tt===0&&lo()}},t.findAllNodes=Jf,t.findBoundingRects=function(a,l){if(!k)throw Error(o(363));l=Jf(a,l),a=[];for(var d=0;d<l.length;d++)a.push(tt(l[d]));for(l=a.length-1;0<l;l--){d=a[l];for(var _=d.x,S=_+d.width,T=d.y,B=T+d.height,X=l-1;0<=X;X--)if(l!==X){var le=a[X],Ae=le.x,et=Ae+le.width,St=le.y,lt=St+le.height;if(_>=Ae&&T>=St&&S<=et&&B<=lt){a.splice(l,1);break}else if(_!==Ae||d.width!==le.width||lt<T||St>B){if(!(T!==St||d.height!==le.height||et<_||Ae>S)){Ae>_&&(le.width+=Ae-_,le.x=_),et<S&&(le.width=S-Ae),a.splice(l,1);break}}else{St>T&&(le.height+=St-T,le.y=T),lt<B&&(le.height=B-St),a.splice(l,1);break}}}return a},t.findHostInstance=x0,t.findHostInstanceWithNoPortals=function(a){return a=D(a),a=a!==null?te(a):null,a===null?null:a.stateNode},t.findHostInstanceWithWarning=function(a){return x0(a)},t.flushControlled=function(a){var l=Tt;Tt|=1;var d=rn.transition,_=Ot;try{rn.transition=null,Ot=1,a()}finally{Ot=_,rn.transition=d,Tt=l,Tt===0&&(lo(),Zi())}},t.flushPassiveEffects=vs,t.flushSync=l0,t.focusWithin=function(a,l){if(!k)throw Error(o(363));for(a=qf(a),l=s0(a,l),l=Array.from(l),a=0;a<l.length;){var d=l[a++];if(!ye(d)){if(d.tag===5&&N(d.stateNode))return!0;for(d=d.child;d!==null;)l.push(d),d=d.sibling}}return!1},t.getCurrentUpdatePriority=function(){return Ot},t.getFindAllNodesFailureDescription=function(a,l){if(!k)throw Error(o(363));var d=0,_=[];a=[qf(a),0];for(var S=0;S<a.length;){var T=a[S++],B=a[S++],X=l[B];if((T.tag!==5||!ye(T))&&(Yf(T,X)&&(_.push(Zf(X)),B++,B>d&&(d=B)),B<l.length))for(T=T.child;T!==null;)a.push(T,B),T=T.sibling}if(d<l.length){for(a=[];d<l.length;d++)a.push(Zf(l[d]));return`findAllNodes was able to match part of the selector:
  `+(_.join(" > ")+`

No matching component was found for:
  `)+a.join(" > ")}return null},t.getPublicRootInstance=function(a){return a=a.current,a.child?a.child.tag===5?Z(a.child.stateNode):a.child.stateNode:null},t.injectIntoDevTools=function(a){if(a={bundleType:a.bundleType,version:a.version,rendererPackageName:a.rendererPackageName,rendererConfig:a.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:c.ReactCurrentDispatcher,findHostInstanceByFiber:NS,findFiberByHostInstance:a.findFiberByHostInstance||US,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.0.0-fc46dba67-20220329"},typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u")a=!1;else{var l=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(l.isDisabled||!l.supportsFiber)a=!0;else{try{Ul=l.inject(a),qi=l}catch{}a=!!l.checkDCE}}return a},t.isAlreadyRendering=function(){return!1},t.observeVisibleRects=function(a,l,d,_){if(!k)throw Error(o(363));a=Jf(a,l);var S=C(a,d,_).disconnect;return{disconnect:function(){S()}}},t.registerMutableSourceForHydration=function(a,l){var d=l._getVersion;d=d(l._source),a.mutableSourceEagerHydrationData==null?a.mutableSourceEagerHydrationData=[l,d]:a.mutableSourceEagerHydrationData.push(l,d)},t.runWithPriority=function(a,l){var d=Ot;try{return Ot=a,l()}finally{Ot=d}},t.shouldError=function(){return null},t.shouldSuspend=function(){return!1},t.updateContainer=function(a,l,d,_){var S=l.current,T=Bn(),B=Or(S);return d=v0(d),l.context===null?l.context=d:l.pendingContext=d,l=mr(T,B),l.payload={element:a},_=_===void 0?null:_,_!==null&&(l.callback=_),Nr(S,l),a=Ei(S,B,T),a!==null&&kl(a,S,B),B},t}),sp}var lv;function BR(){return lv||(lv=1,np.exports=OR()),np.exports}var zR=BR();const kR=Hp(zR);var op={exports:{}},ap={};var cv;function VR(){return cv||(cv=1,(function(r){function e(z,W){var q=z.length;z.push(W);e:for(;0<q;){var re=q-1>>>1,he=z[re];if(0<i(he,W))z[re]=W,z[q]=he,q=re;else break e}}function t(z){return z.length===0?null:z[0]}function n(z){if(z.length===0)return null;var W=z[0],q=z.pop();if(q!==W){z[0]=q;e:for(var re=0,he=z.length,Ie=he>>>1;re<Ie;){var nt=2*(re+1)-1,Qe=z[nt],oe=nt+1,we=z[oe];if(0>i(Qe,q))oe<he&&0>i(we,Qe)?(z[re]=we,z[oe]=q,re=oe):(z[re]=Qe,z[nt]=q,re=nt);else if(oe<he&&0>i(we,q))z[re]=we,z[oe]=q,re=oe;else break e}}return W}function i(z,W){var q=z.sortIndex-W.sortIndex;return q!==0?q:z.id-W.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;r.unstable_now=function(){return s.now()}}else{var o=Date,c=o.now();r.unstable_now=function(){return o.now()-c}}var u=[],h=[],f=1,p=null,m=3,g=!1,x=!1,w=!1,y=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,M=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function E(z){for(var W=t(h);W!==null;){if(W.callback===null)n(h);else if(W.startTime<=z)n(h),W.sortIndex=W.expirationTime,e(u,W);else break;W=t(h)}}function b(z){if(w=!1,E(z),!x)if(t(u)!==null)x=!0,Z(L);else{var W=t(h);W!==null&&J(b,W.startTime-z)}}function L(z,W){x=!1,w&&(w=!1,v(A),A=-1),g=!0;var q=m;try{for(E(W),p=t(u);p!==null&&(!(p.expirationTime>W)||z&&!D());){var re=p.callback;if(typeof re=="function"){p.callback=null,m=p.priorityLevel;var he=re(p.expirationTime<=W);W=r.unstable_now(),typeof he=="function"?p.callback=he:p===t(u)&&n(u),E(W)}else n(u);p=t(u)}if(p!==null)var Ie=!0;else{var nt=t(h);nt!==null&&J(b,nt.startTime-W),Ie=!1}return Ie}finally{p=null,m=q,g=!1}}var R=!1,U=null,A=-1,P=5,O=-1;function D(){return!(r.unstable_now()-O<P)}function V(){if(U!==null){var z=r.unstable_now();O=z;var W=!0;try{W=U(!0,z)}finally{W?K():(R=!1,U=null)}}else R=!1}var K;if(typeof M=="function")K=function(){M(V)};else if(typeof MessageChannel<"u"){var te=new MessageChannel,H=te.port2;te.port1.onmessage=V,K=function(){H.postMessage(null)}}else K=function(){y(V,0)};function Z(z){U=z,R||(R=!0,K())}function J(z,W){A=y(function(){z(r.unstable_now())},W)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(z){z.callback=null},r.unstable_continueExecution=function(){x||g||(x=!0,Z(L))},r.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<z?Math.floor(1e3/z):5},r.unstable_getCurrentPriorityLevel=function(){return m},r.unstable_getFirstCallbackNode=function(){return t(u)},r.unstable_next=function(z){switch(m){case 1:case 2:case 3:var W=3;break;default:W=m}var q=m;m=W;try{return z()}finally{m=q}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(z,W){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var q=m;m=z;try{return W()}finally{m=q}},r.unstable_scheduleCallback=function(z,W,q){var re=r.unstable_now();switch(typeof q=="object"&&q!==null?(q=q.delay,q=typeof q=="number"&&0<q?re+q:re):q=re,z){case 1:var he=-1;break;case 2:he=250;break;case 5:he=1073741823;break;case 4:he=1e4;break;default:he=5e3}return he=q+he,z={id:f++,callback:W,priorityLevel:z,startTime:q,expirationTime:he,sortIndex:-1},q>re?(z.sortIndex=q,e(h,z),t(u)===null&&z===t(h)&&(w?(v(A),A=-1):w=!0,J(b,q-re))):(z.sortIndex=he,e(u,z),x||g||(x=!0,Z(L))),z},r.unstable_shouldYield=D,r.unstable_wrapCallback=function(z){var W=m;return function(){var q=m;m=W;try{return z.apply(this,arguments)}finally{m=q}}}})(ap)),ap}var uv;function HR(){return uv||(uv=1,op.exports=VR()),op.exports}var hv=HR();const Nm={},GR=r=>{Object.assign(Nm,r)};function WR(r,e){function t(f,{args:p=[],attach:m,...g},x){let w=`${f[0].toUpperCase()}${f.slice(1)}`,y;if(f==="primitive"){if(g.object===void 0)throw new Error("R3F: Primitives without 'object' are invalid!");const v=g.object;y=Do(v,{type:f,root:x,attach:m,primitive:!0})}else{const v=Nm[w];if(!v)throw new Error(`R3F: ${w} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`);if(!Array.isArray(p))throw new Error("R3F: The args prop must be an array!");y=Do(new v(...p),{type:f,root:x,attach:m,memoizedProps:{args:p}})}return y.__r3f.attach===void 0&&(y instanceof xt?y.__r3f.attach="geometry":y instanceof Tn&&(y.__r3f.attach="material")),w!=="inject"&&up(y,g),y}function n(f,p){let m=!1;if(p){var g,x;(g=p.__r3f)!=null&&g.attach?cp(f,p,p.__r3f.attach):p.isObject3D&&f.isObject3D&&(f.add(p),m=!0),m||(x=f.__r3f)==null||x.objects.push(p),p.__r3f||Do(p,{}),p.__r3f.parent=f,kp(p),No(p)}}function i(f,p,m){let g=!1;if(p){var x,w;if((x=p.__r3f)!=null&&x.attach)cp(f,p,p.__r3f.attach);else if(p.isObject3D&&f.isObject3D){p.parent=f,p.dispatchEvent({type:"added"}),f.dispatchEvent({type:"childadded",child:p});const y=f.children.filter(M=>M!==p),v=y.indexOf(m);f.children=[...y.slice(0,v),p,...y.slice(v)],g=!0}g||(w=f.__r3f)==null||w.objects.push(p),p.__r3f||Do(p,{}),p.__r3f.parent=f,kp(p),No(p)}}function s(f,p,m=!1){f&&[...f].forEach(g=>o(p,g,m))}function o(f,p,m){if(p){var g,x,w;if(p.__r3f&&(p.__r3f.parent=null),(g=f.__r3f)!=null&&g.objects&&(f.__r3f.objects=f.__r3f.objects.filter(b=>b!==p)),(x=p.__r3f)!=null&&x.attach)gv(f,p,p.__r3f.attach);else if(p.isObject3D&&f.isObject3D){var y;f.remove(p),(y=p.__r3f)!=null&&y.root&&KR(Eu(p),p)}const M=(w=p.__r3f)==null?void 0:w.primitive,E=!M&&(m===void 0?p.dispose!==null:m);if(!M){var v;s((v=p.__r3f)==null?void 0:v.objects,p,E),s(p.children,p,E)}if(delete p.__r3f,E&&p.dispose&&p.type!=="Scene"){const b=()=>{try{p.dispose()}catch{}};typeof IS_REACT_ACT_ENVIRONMENT>"u"?hv.unstable_scheduleCallback(hv.unstable_IdlePriority,b):b()}No(f)}}function c(f,p,m,g){var x;const w=(x=f.__r3f)==null?void 0:x.parent;if(!w)return;const y=t(p,m,f.__r3f.root);if(f.children){for(const v of f.children)v.__r3f&&n(y,v);f.children=f.children.filter(v=>!v.__r3f)}f.__r3f.objects.forEach(v=>n(y,v)),f.__r3f.objects=[],f.__r3f.autoRemovedBeforeAppend||o(w,f),y.parent&&(y.__r3f.autoRemovedBeforeAppend=!0),n(w,y),y.raycast&&y.__r3f.eventCount&&Eu(y).getState().internal.interaction.push(y),[g,g.alternate].forEach(v=>{v!==null&&(v.stateNode=y,v.ref&&(typeof v.ref=="function"?v.ref(y):v.ref.current=y))})}const u=()=>{};return{reconciler:kR({createInstance:t,removeChild:o,appendChild:n,appendInitialChild:n,insertBefore:i,supportsMutation:!0,isPrimaryRenderer:!1,supportsPersistence:!1,supportsHydration:!1,noTimeout:-1,appendChildToContainer:(f,p)=>{if(!p)return;const m=f.getState().scene;m.__r3f&&(m.__r3f.root=f,n(m,p))},removeChildFromContainer:(f,p)=>{p&&o(f.getState().scene,p)},insertInContainerBefore:(f,p,m)=>{if(!p||!m)return;const g=f.getState().scene;g.__r3f&&i(g,p,m)},getRootHostContext:()=>null,getChildHostContext:f=>f,finalizeInitialChildren(f){var p;return!!((p=f?.__r3f)!=null?p:{}).handlers},prepareUpdate(f,p,m,g){var x;if(((x=f?.__r3f)!=null?x:{}).primitive&&g.object&&g.object!==f)return[!0];{const{args:y=[],children:v,...M}=g,{args:E=[],children:b,...L}=m;if(!Array.isArray(y))throw new Error("R3F: the args prop must be an array!");if(y.some((U,A)=>U!==E[A]))return[!0];const R=Fy(f,M,L,!0);return R.changes.length?[!1,R]:null}},commitUpdate(f,[p,m],g,x,w,y){p?c(f,g,w,y):up(f,m)},commitMount(f,p,m,g){var x;const w=(x=f.__r3f)!=null?x:{};f.raycast&&w.handlers&&w.eventCount&&Eu(f).getState().internal.interaction.push(f)},getPublicInstance:f=>f,prepareForCommit:()=>null,preparePortalMount:f=>Do(f.getState().scene),resetAfterCommit:()=>{},shouldSetTextContent:()=>!1,clearContainer:()=>!1,hideInstance(f){var p;const{attach:m,parent:g}=(p=f.__r3f)!=null?p:{};m&&g&&gv(g,f,m),f.isObject3D&&(f.visible=!1),No(f)},unhideInstance(f,p){var m;const{attach:g,parent:x}=(m=f.__r3f)!=null?m:{};g&&x&&cp(x,f,g),(f.isObject3D&&p.visible==null||p.visible)&&(f.visible=!0),No(f)},createTextInstance:u,hideTextInstance:u,unhideTextInstance:u,getCurrentEventPriority:()=>e?e():Bo.DefaultEventPriority,beforeActiveInstanceBlur:()=>{},afterActiveInstanceBlur:()=>{},detachDeletedInstance:()=>{},now:typeof performance<"u"&&qt.fun(performance.now)?performance.now:qt.fun(Date.now)?Date.now:()=>0,scheduleTimeout:qt.fun(setTimeout)?setTimeout:void 0,cancelTimeout:qt.fun(clearTimeout)?clearTimeout:void 0}),applyProps:up}}var fv,dv;const lp=r=>"colorSpace"in r||"outputColorSpace"in r,Py=()=>{var r;return(r=Nm.ColorManagement)!=null?r:null},Iy=r=>r&&r.isOrthographicCamera,XR=r=>r&&r.hasOwnProperty("current"),Tl=typeof window<"u"&&((fv=window.document)!=null&&fv.createElement||((dv=window.navigator)==null?void 0:dv.product)==="ReactNative")?be.useLayoutEffect:be.useEffect;function Ly(r){const e=be.useRef(r);return Tl(()=>{e.current=r},[r]),e}function qR({set:r}){return Tl(()=>(r(new Promise(()=>null)),()=>r(!1)),[r]),null}class Dy extends be.Component{constructor(...e){super(...e),this.state={error:!1}}componentDidCatch(e){this.props.set(e)}render(){return this.state.error?null:this.props.children}}Dy.getDerivedStateFromError=()=>({error:!0});const Ny="__default",pv=new Map,YR=r=>r&&!!r.memoized&&!!r.changes;function Uy(r){var e;const t=typeof window<"u"?(e=window.devicePixelRatio)!=null?e:2:1;return Array.isArray(r)?Math.min(Math.max(r[0],t),r[1]):r}const Ua=r=>{var e;return(e=r.__r3f)==null?void 0:e.root.getState()};function Eu(r){let e=r.__r3f.root;for(;e.getState().previousRoot;)e=e.getState().previousRoot;return e}const qt={obj:r=>r===Object(r)&&!qt.arr(r)&&typeof r!="function",fun:r=>typeof r=="function",str:r=>typeof r=="string",num:r=>typeof r=="number",boo:r=>typeof r=="boolean",und:r=>r===void 0,arr:r=>Array.isArray(r),equ(r,e,{arrays:t="shallow",objects:n="reference",strict:i=!0}={}){if(typeof r!=typeof e||!!r!=!!e)return!1;if(qt.str(r)||qt.num(r)||qt.boo(r))return r===e;const s=qt.obj(r);if(s&&n==="reference")return r===e;const o=qt.arr(r);if(o&&t==="reference")return r===e;if((o||s)&&r===e)return!0;let c;for(c in r)if(!(c in e))return!1;if(s&&t==="shallow"&&n==="shallow"){for(c in i?e:r)if(!qt.equ(r[c],e[c],{strict:i,objects:"reference"}))return!1}else for(c in i?e:r)if(r[c]!==e[c])return!1;if(qt.und(c)){if(o&&r.length===0&&e.length===0||s&&Object.keys(r).length===0&&Object.keys(e).length===0)return!0;if(r!==e)return!1}return!0}};function ZR(r){r.dispose&&r.type!=="Scene"&&r.dispose();for(const e in r)e.dispose==null||e.dispose(),delete r[e]}function Do(r,e){const t=r;return t.__r3f={type:"",root:null,previousAttach:null,memoizedProps:{},eventCount:0,handlers:{},objects:[],parent:null,...e},r}function zp(r,e){let t=r;if(e.includes("-")){const n=e.split("-"),i=n.pop();return t=n.reduce((s,o)=>s[o],r),{target:t,key:i}}else return{target:t,key:e}}const mv=/-\d+$/;function cp(r,e,t){if(qt.str(t)){if(mv.test(t)){const s=t.replace(mv,""),{target:o,key:c}=zp(r,s);Array.isArray(o[c])||(o[c]=[])}const{target:n,key:i}=zp(r,t);e.__r3f.previousAttach=n[i],n[i]=e}else e.__r3f.previousAttach=t(r,e)}function gv(r,e,t){var n,i;if(qt.str(t)){const{target:s,key:o}=zp(r,t),c=e.__r3f.previousAttach;c===void 0?delete s[o]:s[o]=c}else(n=e.__r3f)==null||n.previousAttach==null||n.previousAttach(r,e);(i=e.__r3f)==null||delete i.previousAttach}function Fy(r,{children:e,key:t,ref:n,...i},{children:s,key:o,ref:c,...u}={},h=!1){const f=r.__r3f,p=Object.entries(i),m=[];if(h){const x=Object.keys(u);for(let w=0;w<x.length;w++)i.hasOwnProperty(x[w])||p.unshift([x[w],Ny+"remove"])}p.forEach(([x,w])=>{var y;if((y=r.__r3f)!=null&&y.primitive&&x==="object"||qt.equ(w,u[x]))return;if(/^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/.test(x))return m.push([x,w,!0,[]]);let v=[];x.includes("-")&&(v=x.split("-")),m.push([x,w,!1,v]);for(const M in i){const E=i[M];M.startsWith(`${x}-`)&&m.push([M,E,!1,M.split("-")])}});const g={...i};return f!=null&&f.memoizedProps&&f!=null&&f.memoizedProps.args&&(g.args=f.memoizedProps.args),f!=null&&f.memoizedProps&&f!=null&&f.memoizedProps.attach&&(g.attach=f.memoizedProps.attach),{memoized:g,changes:m}}function up(r,e){var t;const n=r.__r3f,i=n?.root,s=i==null||i.getState==null?void 0:i.getState(),{memoized:o,changes:c}=YR(e)?e:Fy(r,e),u=n?.eventCount;r.__r3f&&(r.__r3f.memoizedProps=o);for(let f=0;f<c.length;f++){let[p,m,g,x]=c[f];if(lp(r)){const M="srgb",E="srgb-linear";p==="encoding"?(p="colorSpace",m=m===3001?M:E):p==="outputEncoding"&&(p="outputColorSpace",m=m===3001?M:E)}let w=r,y=w[p];if(x.length&&(y=x.reduce((v,M)=>v[M],r),!(y&&y.set))){const[v,...M]=x.reverse();w=M.reverse().reduce((E,b)=>E[b],r),p=v}if(m===Ny+"remove")if(w.constructor){let v=pv.get(w.constructor);v||(v=new w.constructor,pv.set(w.constructor,v)),m=v[p]}else m=0;if(g&&n)m?n.handlers[p]=m:delete n.handlers[p],n.eventCount=Object.keys(n.handlers).length;else if(y&&y.set&&(y.copy||y instanceof ks)){if(Array.isArray(m))y.fromArray?y.fromArray(m):y.set(...m);else if(y.copy&&m&&m.constructor&&y.constructor===m.constructor)y.copy(m);else if(m!==void 0){const v=y instanceof Ye;!v&&y.setScalar?y.setScalar(m):y instanceof ks&&m instanceof ks?y.mask=m.mask:y.set(m),!Py()&&s&&!s.linear&&v&&y.convertSRGBToLinear()}}else if(w[p]=m,w[p]instanceof jt&&w[p].format===Nn&&w[p].type===Vn&&s){const v=w[p];lp(v)&&lp(s.gl)?v.colorSpace=s.gl.outputColorSpace:v.encoding=s.gl.outputEncoding}No(r)}if(n&&n.parent&&r.raycast&&u!==n.eventCount){const f=Eu(r).getState().internal,p=f.interaction.indexOf(r);p>-1&&f.interaction.splice(p,1),n.eventCount&&f.interaction.push(r)}return!(c.length===1&&c[0][0]==="onUpdate")&&c.length&&(t=r.__r3f)!=null&&t.parent&&kp(r),r}function No(r){var e,t;const n=(e=r.__r3f)==null||(t=e.root)==null||t.getState==null?void 0:t.getState();n&&n.internal.frames===0&&n.invalidate()}function kp(r){r.onUpdate==null||r.onUpdate(r)}function JR(r,e){r.manual||(Iy(r)?(r.left=e.width/-2,r.right=e.width/2,r.top=e.height/2,r.bottom=e.height/-2):r.aspect=e.width/e.height,r.updateProjectionMatrix(),r.updateMatrixWorld())}function gu(r){return(r.eventObject||r.object).uuid+"/"+r.index+r.instanceId}function jR(){var r;const e=typeof self<"u"&&self||typeof window<"u"&&window;if(!e)return Bo.DefaultEventPriority;switch((r=e.event)==null?void 0:r.type){case"click":case"contextmenu":case"dblclick":case"pointercancel":case"pointerdown":case"pointerup":return Bo.DiscreteEventPriority;case"pointermove":case"pointerout":case"pointerover":case"pointerenter":case"pointerleave":case"wheel":return Bo.ContinuousEventPriority;default:return Bo.DefaultEventPriority}}function Oy(r,e,t,n){const i=t.get(e);i&&(t.delete(e),t.size===0&&(r.delete(n),i.target.releasePointerCapture(n)))}function KR(r,e){const{internal:t}=r.getState();t.interaction=t.interaction.filter(n=>n!==e),t.initialHits=t.initialHits.filter(n=>n!==e),t.hovered.forEach((n,i)=>{(n.eventObject===e||n.object===e)&&t.hovered.delete(i)}),t.capturedMap.forEach((n,i)=>{Oy(t.capturedMap,e,n,i)})}function QR(r){function e(u){const{internal:h}=r.getState(),f=u.offsetX-h.initialClick[0],p=u.offsetY-h.initialClick[1];return Math.round(Math.sqrt(f*f+p*p))}function t(u){return u.filter(h=>["Move","Over","Enter","Out","Leave"].some(f=>{var p;return(p=h.__r3f)==null?void 0:p.handlers["onPointer"+f]}))}function n(u,h){const f=r.getState(),p=new Set,m=[],g=h?h(f.internal.interaction):f.internal.interaction;for(let v=0;v<g.length;v++){const M=Ua(g[v]);M&&(M.raycaster.camera=void 0)}f.previousRoot||f.events.compute==null||f.events.compute(u,f);function x(v){const M=Ua(v);if(!M||!M.events.enabled||M.raycaster.camera===null)return[];if(M.raycaster.camera===void 0){var E;M.events.compute==null||M.events.compute(u,M,(E=M.previousRoot)==null?void 0:E.getState()),M.raycaster.camera===void 0&&(M.raycaster.camera=null)}return M.raycaster.camera?M.raycaster.intersectObject(v,!0):[]}let w=g.flatMap(x).sort((v,M)=>{const E=Ua(v.object),b=Ua(M.object);return!E||!b?v.distance-M.distance:b.events.priority-E.events.priority||v.distance-M.distance}).filter(v=>{const M=gu(v);return p.has(M)?!1:(p.add(M),!0)});f.events.filter&&(w=f.events.filter(w,f));for(const v of w){let M=v.object;for(;M;){var y;(y=M.__r3f)!=null&&y.eventCount&&m.push({...v,eventObject:M}),M=M.parent}}if("pointerId"in u&&f.internal.capturedMap.has(u.pointerId))for(let v of f.internal.capturedMap.get(u.pointerId).values())p.has(gu(v.intersection))||m.push(v.intersection);return m}function i(u,h,f,p){const m=r.getState();if(u.length){const g={stopped:!1};for(const x of u){const w=Ua(x.object)||m,{raycaster:y,pointer:v,camera:M,internal:E}=w,b=new F(v.x,v.y,0).unproject(M),L=O=>{var D,V;return(D=(V=E.capturedMap.get(O))==null?void 0:V.has(x.eventObject))!=null?D:!1},R=O=>{const D={intersection:x,target:h.target};E.capturedMap.has(O)?E.capturedMap.get(O).set(x.eventObject,D):E.capturedMap.set(O,new Map([[x.eventObject,D]])),h.target.setPointerCapture(O)},U=O=>{const D=E.capturedMap.get(O);D&&Oy(E.capturedMap,x.eventObject,D,O)};let A={};for(let O in h){let D=h[O];typeof D!="function"&&(A[O]=D)}let P={...x,...A,pointer:v,intersections:u,stopped:g.stopped,delta:f,unprojectedPoint:b,ray:y.ray,camera:M,stopPropagation(){const O="pointerId"in h&&E.capturedMap.get(h.pointerId);if((!O||O.has(x.eventObject))&&(P.stopped=g.stopped=!0,E.hovered.size&&Array.from(E.hovered.values()).find(D=>D.eventObject===x.eventObject))){const D=u.slice(0,u.indexOf(x));s([...D,x])}},target:{hasPointerCapture:L,setPointerCapture:R,releasePointerCapture:U},currentTarget:{hasPointerCapture:L,setPointerCapture:R,releasePointerCapture:U},nativeEvent:h};if(p(P),g.stopped===!0)break}}return u}function s(u){const{internal:h}=r.getState();for(const f of h.hovered.values())if(!u.length||!u.find(p=>p.object===f.object&&p.index===f.index&&p.instanceId===f.instanceId)){const m=f.eventObject.__r3f,g=m?.handlers;if(h.hovered.delete(gu(f)),m!=null&&m.eventCount){const x={...f,intersections:u};g.onPointerOut==null||g.onPointerOut(x),g.onPointerLeave==null||g.onPointerLeave(x)}}}function o(u,h){for(let f=0;f<h.length;f++){const p=h[f].__r3f;p==null||p.handlers.onPointerMissed==null||p.handlers.onPointerMissed(u)}}function c(u){switch(u){case"onPointerLeave":case"onPointerCancel":return()=>s([]);case"onLostPointerCapture":return h=>{const{internal:f}=r.getState();"pointerId"in h&&f.capturedMap.has(h.pointerId)&&requestAnimationFrame(()=>{f.capturedMap.has(h.pointerId)&&(f.capturedMap.delete(h.pointerId),s([]))})}}return function(f){const{onPointerMissed:p,internal:m}=r.getState();m.lastEvent.current=f;const g=u==="onPointerMove",x=u==="onClick"||u==="onContextMenu"||u==="onDoubleClick",y=n(f,g?t:void 0),v=x?e(f):0;u==="onPointerDown"&&(m.initialClick=[f.offsetX,f.offsetY],m.initialHits=y.map(E=>E.eventObject)),x&&!y.length&&v<=2&&(o(f,m.interaction),p&&p(f)),g&&s(y);function M(E){const b=E.eventObject,L=b.__r3f,R=L?.handlers;if(L!=null&&L.eventCount)if(g){if(R.onPointerOver||R.onPointerEnter||R.onPointerOut||R.onPointerLeave){const U=gu(E),A=m.hovered.get(U);A?A.stopped&&E.stopPropagation():(m.hovered.set(U,E),R.onPointerOver==null||R.onPointerOver(E),R.onPointerEnter==null||R.onPointerEnter(E))}R.onPointerMove==null||R.onPointerMove(E)}else{const U=R[u];U?(!x||m.initialHits.includes(b))&&(o(f,m.interaction.filter(A=>!m.initialHits.includes(A))),U(E)):x&&m.initialHits.includes(b)&&o(f,m.interaction.filter(A=>!m.initialHits.includes(A)))}}i(y,f,v,M)}}return{handlePointer:c}}const By=r=>!!(r!=null&&r.render),zy=be.createContext(null),$R=(r,e)=>{const t=NR((c,u)=>{const h=new F,f=new F,p=new F;function m(v=u().camera,M=f,E=u().size){const{width:b,height:L,top:R,left:U}=E,A=b/L;M instanceof F?p.copy(M):p.set(...M);const P=v.getWorldPosition(h).distanceTo(p);if(Iy(v))return{width:b/v.zoom,height:L/v.zoom,top:R,left:U,factor:1,distance:P,aspect:A};{const O=v.fov*Math.PI/180,D=2*Math.tan(O/2)*P,V=D*(b/L);return{width:V,height:D,top:R,left:U,factor:b/V,distance:P,aspect:A}}}let g;const x=v=>c(M=>({performance:{...M.performance,current:v}})),w=new pe;return{set:c,get:u,gl:null,camera:null,raycaster:null,events:{priority:1,enabled:!0,connected:!1},xr:null,scene:null,invalidate:(v=1)=>r(u(),v),advance:(v,M)=>e(v,M,u()),legacy:!1,linear:!1,flat:!1,controls:null,clock:new vy,pointer:w,mouse:w,frameloop:"always",onPointerMissed:void 0,performance:{current:1,min:.5,max:1,debounce:200,regress:()=>{const v=u();g&&clearTimeout(g),v.performance.current!==v.performance.min&&x(v.performance.min),g=setTimeout(()=>x(u().performance.max),v.performance.debounce)}},size:{width:0,height:0,top:0,left:0,updateStyle:!1},viewport:{initialDpr:0,dpr:0,width:0,height:0,top:0,left:0,aspect:0,distance:0,factor:0,getCurrentViewport:m},setEvents:v=>c(M=>({...M,events:{...M.events,...v}})),setSize:(v,M,E,b,L)=>{const R=u().camera,U={width:v,height:M,top:b||0,left:L||0,updateStyle:E};c(A=>({size:U,viewport:{...A.viewport,...m(R,f,U)}}))},setDpr:v=>c(M=>{const E=Uy(v);return{viewport:{...M.viewport,dpr:E,initialDpr:M.viewport.initialDpr||E}}}),setFrameloop:(v="always")=>{const M=u().clock;M.stop(),M.elapsedTime=0,v!=="never"&&(M.start(),M.elapsedTime=0),c(()=>({frameloop:v}))},previousRoot:void 0,internal:{active:!1,priority:0,frames:0,lastEvent:be.createRef(),interaction:[],hovered:new Map,subscribers:[],initialClick:[0,0],initialHits:[],capturedMap:new Map,subscribe:(v,M,E)=>{const b=u().internal;return b.priority=b.priority+(M>0?1:0),b.subscribers.push({ref:v,priority:M,store:E}),b.subscribers=b.subscribers.sort((L,R)=>L.priority-R.priority),()=>{const L=u().internal;L!=null&&L.subscribers&&(L.priority=L.priority-(M>0?1:0),L.subscribers=L.subscribers.filter(R=>R.ref!==v))}}}}}),n=t.getState();let i=n.size,s=n.viewport.dpr,o=n.camera;return t.subscribe(()=>{const{camera:c,size:u,viewport:h,gl:f,set:p}=t.getState();if(u.width!==i.width||u.height!==i.height||h.dpr!==s){var m;i=u,s=h.dpr,JR(c,u),f.setPixelRatio(h.dpr);const g=(m=u.updateStyle)!=null?m:typeof HTMLCanvasElement<"u"&&f.domElement instanceof HTMLCanvasElement;f.setSize(u.width,u.height,g)}c!==o&&(o=c,p(g=>({viewport:{...g.viewport,...g.viewport.getCurrentViewport(c)}})))}),t.subscribe(c=>r(c)),t};let _u,eP=new Set,tP=new Set,nP=new Set;function hp(r,e){if(r.size)for(const{callback:t}of r.values())t(e)}function Fa(r,e){switch(r){case"before":return hp(eP,e);case"after":return hp(tP,e);case"tail":return hp(nP,e)}}let fp,dp;function pp(r,e,t){let n=e.clock.getDelta();for(e.frameloop==="never"&&typeof r=="number"&&(n=r-e.clock.elapsedTime,e.clock.oldTime=e.clock.elapsedTime,e.clock.elapsedTime=r),fp=e.internal.subscribers,_u=0;_u<fp.length;_u++)dp=fp[_u],dp.ref.current(dp.store.getState(),n,t);return!e.internal.priority&&e.gl.render&&e.gl.render(e.scene,e.camera),e.internal.frames=Math.max(0,e.internal.frames-1),e.frameloop==="always"?1:e.internal.frames}function iP(r){let e=!1,t=!1,n,i,s;function o(h){i=requestAnimationFrame(o),e=!0,n=0,Fa("before",h),t=!0;for(const p of r.values()){var f;s=p.store.getState(),s.internal.active&&(s.frameloop==="always"||s.internal.frames>0)&&!((f=s.gl.xr)!=null&&f.isPresenting)&&(n+=pp(h,s))}if(t=!1,Fa("after",h),n===0)return Fa("tail",h),e=!1,cancelAnimationFrame(i)}function c(h,f=1){var p;if(!h)return r.forEach(m=>c(m.store.getState(),f));(p=h.gl.xr)!=null&&p.isPresenting||!h.internal.active||h.frameloop==="never"||(f>1?h.internal.frames=Math.min(60,h.internal.frames+f):t?h.internal.frames=2:h.internal.frames=1,e||(e=!0,requestAnimationFrame(o)))}function u(h,f=!0,p,m){if(f&&Fa("before",h),p)pp(h,p,m);else for(const g of r.values())pp(h,g.store.getState());f&&Fa("after",h)}return{loop:o,invalidate:c,advance:u}}function ky(){const r=be.useContext(zy);if(!r)throw new Error("R3F: Hooks can only be used within the Canvas component!");return r}function Vy(r=t=>t,e){return ky()(r,e)}function rP(r,e=0){const t=ky(),n=t.getState().internal.subscribe,i=Ly(r);return Tl(()=>n(i,e,t),[e,n,t]),null}const Yo=new Map,{invalidate:_v,advance:vv}=iP(Yo),{reconciler:xh,applyProps:Io}=WR(Yo,jR),Lo={objects:"shallow",strict:!1},sP=(r,e)=>{const t=typeof r=="function"?r(e):r;return By(t)?t:new Ry({powerPreference:"high-performance",canvas:e,antialias:!0,alpha:!0,...r})};function oP(r,e){const t=typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement;if(e){const{width:n,height:i,top:s,left:o,updateStyle:c=t}=e;return{width:n,height:i,top:s,left:o,updateStyle:c}}else if(typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement&&r.parentElement){const{width:n,height:i,top:s,left:o}=r.parentElement.getBoundingClientRect();return{width:n,height:i,top:s,left:o,updateStyle:t}}else if(typeof OffscreenCanvas<"u"&&r instanceof OffscreenCanvas)return{width:r.width,height:r.height,top:0,left:0,updateStyle:t};return{width:0,height:0,top:0,left:0}}function aP(r){const e=Yo.get(r),t=e?.fiber,n=e?.store;e&&console.warn("R3F.createRoot should only be called once!");const i=typeof reportError=="function"?reportError:console.error,s=n||$R(_v,vv),o=t||xh.createContainer(s,Bo.ConcurrentRoot,null,!1,null,"",i,null);e||Yo.set(r,{fiber:o,store:s});let c,u=!1,h;return{configure(f={}){let{gl:p,size:m,scene:g,events:x,onCreated:w,shadows:y=!1,linear:v=!1,flat:M=!1,legacy:E=!1,orthographic:b=!1,frameloop:L="always",dpr:R=[1,2],performance:U,raycaster:A,camera:P,onPointerMissed:O}=f,D=s.getState(),V=D.gl;D.gl||D.set({gl:V=sP(p,r)});let K=D.raycaster;K||D.set({raycaster:K=new _y});const{params:te,...H}=A||{};if(qt.equ(H,K,Lo)||Io(K,{...H}),qt.equ(te,K.params,Lo)||Io(K,{params:{...K.params,...te}}),!D.camera||D.camera===h&&!qt.equ(h,P,Lo)){h=P;const q=P instanceof bl,re=q?P:b?new as(0,0,0,0,.1,1e3):new hn(75,0,.1,1e3);q||(re.position.z=5,P&&(Io(re,P),("aspect"in P||"left"in P||"right"in P||"bottom"in P||"top"in P)&&(re.manual=!0,re.updateProjectionMatrix())),!D.camera&&!(P!=null&&P.rotation)&&re.lookAt(0,0,0)),D.set({camera:re}),K.camera=re}if(!D.scene){let q;g instanceof fh?q=g:(q=new fh,g&&Io(q,g)),D.set({scene:Do(q)})}if(!D.xr){var Z;const q=(Ie,nt)=>{const Qe=s.getState();Qe.frameloop!=="never"&&vv(Ie,!0,Qe,nt)},re=()=>{const Ie=s.getState();Ie.gl.xr.enabled=Ie.gl.xr.isPresenting,Ie.gl.xr.setAnimationLoop(Ie.gl.xr.isPresenting?q:null),Ie.gl.xr.isPresenting||_v(Ie)},he={connect(){const Ie=s.getState().gl;Ie.xr.addEventListener("sessionstart",re),Ie.xr.addEventListener("sessionend",re)},disconnect(){const Ie=s.getState().gl;Ie.xr.removeEventListener("sessionstart",re),Ie.xr.removeEventListener("sessionend",re)}};typeof((Z=V.xr)==null?void 0:Z.addEventListener)=="function"&&he.connect(),D.set({xr:he})}if(V.shadowMap){const q=V.shadowMap.enabled,re=V.shadowMap.type;if(V.shadowMap.enabled=!!y,qt.boo(y))V.shadowMap.type=ka;else if(qt.str(y)){var J;const he={basic:Ov,percentage:zo,soft:ka,variance:Ns};V.shadowMap.type=(J=he[y])!=null?J:ka}else qt.obj(y)&&Object.assign(V.shadowMap,y);(q!==V.shadowMap.enabled||re!==V.shadowMap.type)&&(V.shadowMap.needsUpdate=!0)}const z=Py();z&&("enabled"in z?z.enabled=!E:"legacyMode"in z&&(z.legacyMode=E)),u||Io(V,{outputEncoding:v?3e3:3001,toneMapping:M?Ci:Sh}),D.legacy!==E&&D.set(()=>({legacy:E})),D.linear!==v&&D.set(()=>({linear:v})),D.flat!==M&&D.set(()=>({flat:M})),p&&!qt.fun(p)&&!By(p)&&!qt.equ(p,V,Lo)&&Io(V,p),x&&!D.events.handlers&&D.set({events:x(s)});const W=oP(r,m);return qt.equ(W,D.size,Lo)||D.setSize(W.width,W.height,W.updateStyle,W.top,W.left),R&&D.viewport.dpr!==Uy(R)&&D.setDpr(R),D.frameloop!==L&&D.setFrameloop(L),D.onPointerMissed||D.set({onPointerMissed:O}),U&&!qt.equ(U,D.performance,Lo)&&D.set(q=>({performance:{...q.performance,...U}})),c=w,u=!0,this},render(f){return u||this.configure(),xh.updateContainer(Oi.jsx(lP,{store:s,children:f,onCreated:c,rootElement:r}),o,null,()=>{}),s},unmount(){Hy(r)}}}function lP({store:r,children:e,onCreated:t,rootElement:n}){return Tl(()=>{const i=r.getState();i.set(s=>({internal:{...s.internal,active:!0}})),t&&t(i),r.getState().events.connected||i.events.connect==null||i.events.connect(n)},[]),Oi.jsx(zy.Provider,{value:r,children:e})}function Hy(r,e){const t=Yo.get(r),n=t?.fiber;if(n){const i=t?.store.getState();i&&(i.internal.active=!1),xh.updateContainer(null,n,null,()=>{i&&setTimeout(()=>{try{var s,o,c,u;i.events.disconnect==null||i.events.disconnect(),(s=i.gl)==null||(o=s.renderLists)==null||o.dispose==null||o.dispose(),(c=i.gl)==null||c.forceContextLoss==null||c.forceContextLoss(),(u=i.gl)!=null&&u.xr&&i.xr.disconnect(),ZR(i),Yo.delete(r)}catch{}},500)})}}xh.injectIntoDevTools({bundleType:0,rendererPackageName:"@react-three/fiber",version:be.version});const mp={onClick:["click",!1],onContextMenu:["contextmenu",!1],onDoubleClick:["dblclick",!1],onWheel:["wheel",!0],onPointerDown:["pointerdown",!0],onPointerUp:["pointerup",!0],onPointerLeave:["pointerleave",!0],onPointerMove:["pointermove",!0],onPointerCancel:["pointercancel",!0],onLostPointerCapture:["lostpointercapture",!0]};function cP(r){const{handlePointer:e}=QR(r);return{priority:1,enabled:!0,compute(t,n,i){n.pointer.set(t.offsetX/n.size.width*2-1,-(t.offsetY/n.size.height)*2+1),n.raycaster.setFromCamera(n.pointer,n.camera)},connected:void 0,handlers:Object.keys(mp).reduce((t,n)=>({...t,[n]:e(n)}),{}),update:()=>{var t;const{events:n,internal:i}=r.getState();(t=i.lastEvent)!=null&&t.current&&n.handlers&&n.handlers.onPointerMove(i.lastEvent.current)},connect:t=>{var n;const{set:i,events:s}=r.getState();s.disconnect==null||s.disconnect(),i(o=>({events:{...o.events,connected:t}})),Object.entries((n=s.handlers)!=null?n:[]).forEach(([o,c])=>{const[u,h]=mp[o];t.addEventListener(u,c,{passive:h})})},disconnect:()=>{const{set:t,events:n}=r.getState();if(n.connected){var i;Object.entries((i=n.handlers)!=null?i:[]).forEach(([s,o])=>{if(n&&n.connected instanceof HTMLElement){const[c]=mp[s];n.connected.removeEventListener(c,o)}}),t(s=>({events:{...s.events,connected:void 0}}))}}}}var gp,xv;function uP(){if(xv)return gp;xv=1;function r(e,t,n){var i,s,o,c,u;t==null&&(t=100);function h(){var p=Date.now()-c;p<t&&p>=0?i=setTimeout(h,t-p):(i=null,n||(u=e.apply(o,s),o=s=null))}var f=function(){o=this,s=arguments,c=Date.now();var p=n&&!i;return i||(i=setTimeout(h,t)),p&&(u=e.apply(o,s),o=s=null),u};return f.clear=function(){i&&(clearTimeout(i),i=null)},f.flush=function(){i&&(u=e.apply(o,s),o=s=null,clearTimeout(i),i=null)},f}return r.debounce=r,gp=r,gp}var hP=uP();const yv=Hp(hP);var fP=Object.defineProperty,dP=Object.defineProperties,pP=Object.getOwnPropertyDescriptors,Sv=Object.getOwnPropertySymbols,mP=Object.prototype.hasOwnProperty,gP=Object.prototype.propertyIsEnumerable,Mv=(r,e,t)=>e in r?fP(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,wv=(r,e)=>{for(var t in e||(e={}))mP.call(e,t)&&Mv(r,t,e[t]);if(Sv)for(var t of Sv(e))gP.call(e,t)&&Mv(r,t,e[t]);return r},_P=(r,e)=>dP(r,pP(e)),Ev,bv;typeof window<"u"&&((Ev=window.document)!=null&&Ev.createElement||((bv=window.navigator)==null?void 0:bv.product)==="ReactNative")?be.useLayoutEffect:be.useEffect;function Gy(r,e,t){if(!r)return;if(t(r)===!0)return r;let n=r.child;for(;n;){const i=Gy(n,e,t);if(i)return i;n=n.sibling}}function Wy(r){try{return Object.defineProperties(r,{_currentRenderer:{get(){return null},set(){}},_currentRenderer2:{get(){return null},set(){}}})}catch{return r}}const Tv=console.error;console.error=function(){const r=[...arguments].join("");if(r?.startsWith("Warning:")&&r.includes("useContext")){console.error=Tv;return}return Tv.apply(this,arguments)};const Um=Wy(be.createContext(null));class Xy extends be.Component{render(){return be.createElement(Um.Provider,{value:this._reactInternals},this.props.children)}}function vP(){const r=be.useContext(Um);if(r===null)throw new Error("its-fine: useFiber must be called within a <FiberProvider />!");const e=be.useId();return be.useMemo(()=>{for(const n of[r,r?.alternate]){if(!n)continue;const i=Gy(n,!1,s=>{let o=s.memoizedState;for(;o;){if(o.memoizedState===e)return!0;o=o.next}});if(i)return i}},[r,e])}function xP(){const r=vP(),[e]=be.useState(()=>new Map);e.clear();let t=r;for(;t;){if(t.type&&typeof t.type=="object"){const i=t.type._context===void 0&&t.type.Provider===t.type?t.type:t.type._context;i&&i!==Um&&!e.has(i)&&e.set(i,be.useContext(Wy(i)))}t=t.return}return e}function yP(){const r=xP();return be.useMemo(()=>Array.from(r.keys()).reduce((e,t)=>n=>be.createElement(e,null,be.createElement(t.Provider,_P(wv({},n),{value:r.get(t)}))),e=>be.createElement(Xy,wv({},e))),[r])}function SP({debounce:r,scroll:e,polyfill:t,offsetSize:n}={debounce:0,scroll:!1,offsetSize:!1}){const i=t||typeof window<"u"&&window.ResizeObserver,[s,o]=be.useState({left:0,top:0,width:0,height:0,bottom:0,right:0,x:0,y:0});if(!i)return s.width=1280,s.height=800,[()=>{},s,()=>{}];const c=be.useRef({element:null,scrollContainers:null,resizeObserver:null,lastBounds:s,orientationHandler:null}),u=r?typeof r=="number"?r:r.scroll:null,h=r?typeof r=="number"?r:r.resize:null,f=be.useRef(!1);be.useEffect(()=>(f.current=!0,()=>{f.current=!1}));const[p,m,g]=be.useMemo(()=>{const v=()=>{if(!c.current.element)return;const{left:M,top:E,width:b,height:L,bottom:R,right:U,x:A,y:P}=c.current.element.getBoundingClientRect(),O={left:M,top:E,width:b,height:L,bottom:R,right:U,x:A,y:P};c.current.element instanceof HTMLElement&&n&&(O.height=c.current.element.offsetHeight,O.width=c.current.element.offsetWidth),Object.freeze(O),f.current&&!bP(c.current.lastBounds,O)&&o(c.current.lastBounds=O)};return[v,h?yv(v,h):v,u?yv(v,u):v]},[o,n,u,h]);function x(){c.current.scrollContainers&&(c.current.scrollContainers.forEach(v=>v.removeEventListener("scroll",g,!0)),c.current.scrollContainers=null),c.current.resizeObserver&&(c.current.resizeObserver.disconnect(),c.current.resizeObserver=null),c.current.orientationHandler&&("orientation"in screen&&"removeEventListener"in screen.orientation?screen.orientation.removeEventListener("change",c.current.orientationHandler):"onorientationchange"in window&&window.removeEventListener("orientationchange",c.current.orientationHandler))}function w(){var v;c.current.element&&(c.current.resizeObserver=new i(m),(v=c.current.resizeObserver)==null||v.observe(c.current.element),e&&c.current.scrollContainers&&c.current.scrollContainers.forEach(M=>M.addEventListener("scroll",g,{capture:!0,passive:!0})),c.current.orientationHandler=()=>{g()},"orientation"in screen&&"addEventListener"in screen.orientation?screen.orientation.addEventListener("change",c.current.orientationHandler):"onorientationchange"in window&&window.addEventListener("orientationchange",c.current.orientationHandler))}const y=v=>{!v||v===c.current.element||(x(),c.current.element=v,c.current.scrollContainers=qy(v),w())};return wP(g,!!e),MP(m),be.useEffect(()=>{x(),w()},[e,g,m]),be.useEffect(()=>x,[]),[y,s,p]}function MP(r){be.useEffect(()=>{const e=r;return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}},[r])}function wP(r,e){be.useEffect(()=>{if(e){const t=r;return window.addEventListener("scroll",t,{capture:!0,passive:!0}),()=>{window.removeEventListener("scroll",t,!0)}}},[r,e])}function qy(r){const e=[];if(!r||r===document.body)return e;const{overflow:t,overflowX:n,overflowY:i}=window.getComputedStyle(r);return[t,n,i].some(s=>s==="auto"||s==="scroll")&&e.push(r),[...e,...qy(r.parentElement)]}const EP=["x","y","top","bottom","left","right","width","height"],bP=(r,e)=>EP.every(t=>r[t]===e[t]),TP=be.forwardRef(function({children:e,fallback:t,resize:n,style:i,gl:s,events:o=cP,eventSource:c,eventPrefix:u,shadows:h,linear:f,flat:p,legacy:m,orthographic:g,frameloop:x,dpr:w,performance:y,raycaster:v,camera:M,scene:E,onPointerMissed:b,onCreated:L,...R},U){be.useMemo(()=>GR(RR),[]);const A=yP(),[P,O]=SP({scroll:!0,debounce:{scroll:50,resize:0},...n}),D=be.useRef(null),V=be.useRef(null);be.useImperativeHandle(U,()=>D.current);const K=Ly(b),[te,H]=be.useState(!1),[Z,J]=be.useState(!1);if(te)throw te;if(Z)throw Z;const z=be.useRef(null);Tl(()=>{const q=D.current;O.width>0&&O.height>0&&q&&(z.current||(z.current=aP(q)),z.current.configure({gl:s,events:o,shadows:h,linear:f,flat:p,legacy:m,orthographic:g,frameloop:x,dpr:w,performance:y,raycaster:v,camera:M,scene:E,size:O,onPointerMissed:(...re)=>K.current==null?void 0:K.current(...re),onCreated:re=>{re.events.connect==null||re.events.connect(c?XR(c)?c.current:c:V.current),u&&re.setEvents({compute:(he,Ie)=>{const nt=he[u+"X"],Qe=he[u+"Y"];Ie.pointer.set(nt/Ie.size.width*2-1,-(Qe/Ie.size.height)*2+1),Ie.raycaster.setFromCamera(Ie.pointer,Ie.camera)}}),L?.(re)}}),z.current.render(Oi.jsx(A,{children:Oi.jsx(Dy,{set:J,children:Oi.jsx(be.Suspense,{fallback:Oi.jsx(qR,{set:H}),children:e})})})))}),be.useEffect(()=>{const q=D.current;if(q)return()=>Hy(q)},[]);const W=c?"none":"auto";return Oi.jsx("div",{ref:V,style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",pointerEvents:W,...i},...R,children:Oi.jsx("div",{ref:P,style:{width:"100%",height:"100%"},children:Oi.jsx("canvas",{ref:D,style:{display:"block"},children:t})})})}),GP=be.forwardRef(function(e,t){return Oi.jsx(Xy,{children:Oi.jsx(TP,{...e,ref:t})})});function ml(){return ml=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var n in t)({}).hasOwnProperty.call(t,n)&&(r[n]=t[n])}return r},ml.apply(null,arguments)}const Al=new F,Fm=new F,AP=new F,Av=new pe;function CP(r,e,t){const n=Al.setFromMatrixPosition(r.matrixWorld);n.project(e);const i=t.width/2,s=t.height/2;return[n.x*i+i,-(n.y*s)+s]}function RP(r,e){const t=Al.setFromMatrixPosition(r.matrixWorld),n=Fm.setFromMatrixPosition(e.matrixWorld),i=t.sub(n),s=e.getWorldDirection(AP);return i.angleTo(s)>Math.PI/2}function PP(r,e,t,n){const i=Al.setFromMatrixPosition(r.matrixWorld),s=i.clone();s.project(e),Av.set(s.x,s.y),t.setFromCamera(Av,e);const o=t.intersectObjects(n,!0);if(o.length){const c=o[0].distance;return i.distanceTo(t.ray.origin)<c}return!0}function IP(r,e){if(e instanceof as)return e.zoom;if(e instanceof hn){const t=Al.setFromMatrixPosition(r.matrixWorld),n=Fm.setFromMatrixPosition(e.matrixWorld),i=e.fov*Math.PI/180,s=t.distanceTo(n);return 1/(2*Math.tan(i/2)*s)}else return 1}function LP(r,e,t){if(e instanceof hn||e instanceof as){const n=Al.setFromMatrixPosition(r.matrixWorld),i=Fm.setFromMatrixPosition(e.matrixWorld),s=n.distanceTo(i),o=(t[1]-t[0])/(e.far-e.near),c=t[1]-o*e.far;return Math.round(o*s+c)}}const Vp=r=>Math.abs(r)<1e-10?0:r;function Yy(r,e,t=""){let n="matrix3d(";for(let i=0;i!==16;i++)n+=Vp(e[i]*r.elements[i])+(i!==15?",":")");return t+n}const DP=(r=>e=>Yy(e,r))([1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1]),NP=(r=>(e,t)=>Yy(e,r(t),"translate(-50%,-50%)"))(r=>[1/r,1/r,1/r,1,-1/r,-1/r,-1/r,-1,1/r,1/r,1/r,1,1,1,1,1]);function UP(r){return r&&typeof r=="object"&&"current"in r}const WP=be.forwardRef(({children:r,eps:e=.001,style:t,className:n,prepend:i,center:s,fullscreen:o,portal:c,distanceFactor:u,sprite:h=!1,transform:f=!1,occlude:p,onOcclude:m,castShadow:g,receiveShadow:x,material:w,geometry:y,zIndexRange:v=[16777271,0],calculatePosition:M=CP,as:E="div",wrapperClass:b,pointerEvents:L="auto",...R},U)=>{const{gl:A,camera:P,scene:O,size:D,raycaster:V,events:K,viewport:te}=Vy(),[H]=be.useState(()=>document.createElement(E)),Z=be.useRef(),J=be.useRef(null),z=be.useRef(0),W=be.useRef([0,0]),q=be.useRef(null),re=be.useRef(null),he=c?.current||K.connected||A.domElement.parentNode,Ie=be.useRef(null),nt=be.useRef(!1),Qe=be.useMemo(()=>p&&p!=="blending"||Array.isArray(p)&&p.length&&UP(p[0]),[p]);be.useLayoutEffect(()=>{const Ke=A.domElement;p&&p==="blending"?(Ke.style.zIndex=`${Math.floor(v[0]/2)}`,Ke.style.position="absolute",Ke.style.pointerEvents="none"):(Ke.style.zIndex=null,Ke.style.position=null,Ke.style.pointerEvents=null)},[p]),be.useLayoutEffect(()=>{if(J.current){const Ke=Z.current=Nv.createRoot(H);if(O.updateMatrixWorld(),f)H.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{const Te=M(J.current,P,D);H.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${Te[0]}px,${Te[1]}px,0);transform-origin:0 0;`}return he&&(i?he.prepend(H):he.appendChild(H)),()=>{he&&he.removeChild(H),Ke.unmount()}}},[he,f]),be.useLayoutEffect(()=>{b&&(H.className=b)},[b]);const oe=be.useMemo(()=>f?{position:"absolute",top:0,left:0,width:D.width,height:D.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:s?"translate3d(-50%,-50%,0)":"none",...o&&{top:-D.height/2,left:-D.width/2,width:D.width,height:D.height},...t},[t,s,o,D,f]),we=be.useMemo(()=>({position:"absolute",pointerEvents:L}),[L]);be.useLayoutEffect(()=>{if(nt.current=!1,f){var Ke;(Ke=Z.current)==null||Ke.render(be.createElement("div",{ref:q,style:oe},be.createElement("div",{ref:re,style:we},be.createElement("div",{ref:U,className:n,style:t,children:r}))))}else{var Te;(Te=Z.current)==null||Te.render(be.createElement("div",{ref:U,style:oe,className:n,children:r}))}});const Se=be.useRef(!0);rP(Ke=>{if(J.current){P.updateMatrixWorld(),J.current.updateWorldMatrix(!0,!1);const Te=f?W.current:M(J.current,P,D);if(f||Math.abs(z.current-P.zoom)>e||Math.abs(W.current[0]-Te[0])>e||Math.abs(W.current[1]-Te[1])>e){const pt=RP(J.current,P);let Ze=!1;Qe&&(Array.isArray(p)?Ze=p.map(Ue=>Ue.current):p!=="blending"&&(Ze=[O]));const de=Se.current;if(Ze){const Ue=PP(J.current,P,V,Ze);Se.current=Ue&&!pt}else Se.current=!pt;de!==Se.current&&(m?m(!Se.current):H.style.display=Se.current?"block":"none");const xe=Math.floor(v[0]/2),me=p?Qe?[v[0],xe]:[xe-1,0]:v;if(H.style.zIndex=`${LP(J.current,P,me)}`,f){const[Ue,De]=[D.width/2,D.height/2],at=P.projectionMatrix.elements[5]*De,{isOrthographicCamera:k,top:ft,left:tt,bottom:ct,right:ye}=P,Pt=DP(P.matrixWorldInverse),N=k?`scale(${at})translate(${Vp(-(ye+tt)/2)}px,${Vp((ft+ct)/2)}px)`:`translateZ(${at}px)`;let C=J.current.matrixWorld;h&&(C=P.matrixWorldInverse.clone().transpose().copyPosition(C).scale(J.current.scale),C.elements[3]=C.elements[7]=C.elements[11]=0,C.elements[15]=1),H.style.width=D.width+"px",H.style.height=D.height+"px",H.style.perspective=k?"":`${at}px`,q.current&&re.current&&(q.current.style.transform=`${N}${Pt}translate(${Ue}px,${De}px)`,re.current.style.transform=NP(C,1/((u||10)/400)))}else{const Ue=u===void 0?1:IP(J.current,P)*u;H.style.transform=`translate3d(${Te[0]}px,${Te[1]}px,0) scale(${Ue})`}W.current=Te,z.current=P.zoom}}if(!Qe&&Ie.current&&!nt.current)if(f){if(q.current){const Te=q.current.children[0];if(Te!=null&&Te.clientWidth&&Te!=null&&Te.clientHeight){const{isOrthographicCamera:pt}=P;if(pt||y)R.scale&&(Array.isArray(R.scale)?R.scale instanceof F?Ie.current.scale.copy(R.scale.clone().divideScalar(1)):Ie.current.scale.set(1/R.scale[0],1/R.scale[1],1/R.scale[2]):Ie.current.scale.setScalar(1/R.scale));else{const Ze=(u||10)/400,de=Te.clientWidth*Ze,xe=Te.clientHeight*Ze;Ie.current.scale.set(de,xe,1)}nt.current=!0}}}else{const Te=H.children[0];if(Te!=null&&Te.clientWidth&&Te!=null&&Te.clientHeight){const pt=1/te.factor,Ze=Te.clientWidth*pt,de=Te.clientHeight*pt;Ie.current.scale.set(Ze,de,1),nt.current=!0}Ie.current.lookAt(Ke.camera.position)}});const $e=be.useMemo(()=>({vertexShader:f?void 0:`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,fragmentShader:`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `}),[f]);return be.createElement("group",ml({},R,{ref:J}),p&&!Qe&&be.createElement("mesh",{castShadow:g,receiveShadow:x,ref:Ie},y||be.createElement("planeGeometry",null),w||be.createElement("shaderMaterial",{side:zi,vertexShader:$e.vertexShader,fragmentShader:$e.fragmentShader})))}),Zy=parseInt(gl.replace(/\D+/g,"")),Jy=Zy>=125?"uv1":"uv2",Cv=new pn,vu=new F;class Om extends Cm{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new je(e,3)),this.setAttribute("uv",new je(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new vh(t,6,1);return this.setAttribute("instanceStart",new fi(n,3,0)),this.setAttribute("instanceEnd",new fi(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));const i=new vh(n,t*2,1);return this.setAttribute("instanceColorStart",new fi(i,t,0)),this.setAttribute("instanceColorEnd",new fi(i,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new _m(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new pn);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Cv.setFromBufferAttribute(t),this.boundingBox.union(Cv))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mn),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)vu.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(vu)),vu.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(vu));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}class jy extends Om{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e,t=3){const n=e.length-t,i=new Float32Array(2*n);if(t===3)for(let s=0;s<n;s+=t)i[2*s]=e[s],i[2*s+1]=e[s+1],i[2*s+2]=e[s+2],i[2*s+3]=e[s+3],i[2*s+4]=e[s+4],i[2*s+5]=e[s+5];else for(let s=0;s<n;s+=t)i[2*s]=e[s],i[2*s+1]=e[s+1],i[2*s+2]=e[s+2],i[2*s+3]=e[s+3],i[2*s+4]=e[s+4],i[2*s+5]=e[s+5],i[2*s+6]=e[s+6],i[2*s+7]=e[s+7];return super.setColors(i,t),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class Bm extends mi{constructor(e){super({type:"LineMaterial",uniforms:_h.clone(_h.merge([ze.common,ze.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new pe(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${Zy>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(t){this.uniforms.diffuse.value=t}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(t){this.uniforms.linewidth.value=t}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(t){!!t!="USE_DASH"in this.defines&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(t){this.uniforms.dashScale.value=t}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(t){this.uniforms.dashSize.value=t}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(t){this.uniforms.dashOffset.value=t}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(t){this.uniforms.gapSize.value=t}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(t){this.uniforms.opacity.value=t}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(t){this.uniforms.resolution.value.copy(t)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(t){!!t!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),t===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}const _p=new Rt,Rv=new F,Pv=new F,wn=new Rt,En=new Rt,ir=new Rt,vp=new F,xp=new dt,bn=new xy,Iv=new F,xu=new pn,yu=new mn,rr=new Rt;let sr,Hs;function Lv(r,e,t){return rr.set(0,0,-e,1).applyMatrix4(r.projectionMatrix),rr.multiplyScalar(1/rr.w),rr.x=Hs/t.width,rr.y=Hs/t.height,rr.applyMatrix4(r.projectionMatrixInverse),rr.multiplyScalar(1/rr.w),Math.abs(Math.max(rr.x,rr.y))}function FP(r,e){const t=r.matrixWorld,n=r.geometry,i=n.attributes.instanceStart,s=n.attributes.instanceEnd,o=Math.min(n.instanceCount,i.count);for(let c=0,u=o;c<u;c++){bn.start.fromBufferAttribute(i,c),bn.end.fromBufferAttribute(s,c),bn.applyMatrix4(t);const h=new F,f=new F;sr.distanceSqToSegment(bn.start,bn.end,f,h),f.distanceTo(h)<Hs*.5&&e.push({point:f,pointOnLine:h,distance:sr.origin.distanceTo(f),object:r,face:null,faceIndex:c,uv:null,[Jy]:null})}}function OP(r,e,t){const n=e.projectionMatrix,s=r.material.resolution,o=r.matrixWorld,c=r.geometry,u=c.attributes.instanceStart,h=c.attributes.instanceEnd,f=Math.min(c.instanceCount,u.count),p=-e.near;sr.at(1,ir),ir.w=1,ir.applyMatrix4(e.matrixWorldInverse),ir.applyMatrix4(n),ir.multiplyScalar(1/ir.w),ir.x*=s.x/2,ir.y*=s.y/2,ir.z=0,vp.copy(ir),xp.multiplyMatrices(e.matrixWorldInverse,o);for(let m=0,g=f;m<g;m++){if(wn.fromBufferAttribute(u,m),En.fromBufferAttribute(h,m),wn.w=1,En.w=1,wn.applyMatrix4(xp),En.applyMatrix4(xp),wn.z>p&&En.z>p)continue;if(wn.z>p){const E=wn.z-En.z,b=(wn.z-p)/E;wn.lerp(En,b)}else if(En.z>p){const E=En.z-wn.z,b=(En.z-p)/E;En.lerp(wn,b)}wn.applyMatrix4(n),En.applyMatrix4(n),wn.multiplyScalar(1/wn.w),En.multiplyScalar(1/En.w),wn.x*=s.x/2,wn.y*=s.y/2,En.x*=s.x/2,En.y*=s.y/2,bn.start.copy(wn),bn.start.z=0,bn.end.copy(En),bn.end.z=0;const w=bn.closestPointToPointParameter(vp,!0);bn.at(w,Iv);const y=xx.lerp(wn.z,En.z,w),v=y>=-1&&y<=1,M=vp.distanceTo(Iv)<Hs*.5;if(v&&M){bn.start.fromBufferAttribute(u,m),bn.end.fromBufferAttribute(h,m),bn.start.applyMatrix4(o),bn.end.applyMatrix4(o);const E=new F,b=new F;sr.distanceSqToSegment(bn.start,bn.end,b,E),t.push({point:b,pointOnLine:E,distance:sr.origin.distanceTo(b),object:r,face:null,faceIndex:m,uv:null,[Jy]:null})}}}class Ky extends an{constructor(e=new Om,t=new Bm({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let o=0,c=0,u=t.count;o<u;o++,c+=2)Rv.fromBufferAttribute(t,o),Pv.fromBufferAttribute(n,o),i[c]=c===0?0:i[c-1],i[c+1]=i[c]+Rv.distanceTo(Pv);const s=new vh(i,2,1);return e.setAttribute("instanceDistanceStart",new fi(s,1,0)),e.setAttribute("instanceDistanceEnd",new fi(s,1,1)),this}raycast(e,t){const n=this.material.worldUnits,i=e.camera;i===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=e.params.Line2!==void 0&&e.params.Line2.threshold||0;sr=e.ray;const o=this.matrixWorld,c=this.geometry,u=this.material;Hs=u.linewidth+s,c.boundingSphere===null&&c.computeBoundingSphere(),yu.copy(c.boundingSphere).applyMatrix4(o);let h;if(n)h=Hs*.5;else{const p=Math.max(i.near,yu.distanceToPoint(sr.origin));h=Lv(i,p,u.resolution)}if(yu.radius+=h,sr.intersectsSphere(yu)===!1)return;c.boundingBox===null&&c.computeBoundingBox(),xu.copy(c.boundingBox).applyMatrix4(o);let f;if(n)f=Hs*.5;else{const p=Math.max(i.near,xu.distanceToPoint(sr.origin));f=Lv(i,p,u.resolution)}xu.expandByScalar(f),sr.intersectsBox(xu)!==!1&&(n?FP(this,t):OP(this,i,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(_p),this.material.uniforms.resolution.value.set(_p.z,_p.w))}}class BP extends Ky{constructor(e=new jy,t=new Bm({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const XP=be.forwardRef(function({points:e,color:t=16777215,vertexColors:n,linewidth:i,lineWidth:s,segments:o,dashed:c,...u},h){var f,p;const m=Vy(v=>v.size),g=be.useMemo(()=>o?new Ky:new BP,[o]),[x]=be.useState(()=>new Bm),w=(n==null||(f=n[0])==null?void 0:f.length)===4?4:3,y=be.useMemo(()=>{const v=o?new Om:new jy,M=e.map(E=>{const b=Array.isArray(E);return E instanceof F||E instanceof Rt?[E.x,E.y,E.z]:E instanceof pe?[E.x,E.y,0]:b&&E.length===3?[E[0],E[1],E[2]]:b&&E.length===2?[E[0],E[1],0]:E});if(v.setPositions(M.flat()),n){t=16777215;const E=n.map(b=>b instanceof Ye?b.toArray():b);v.setColors(E.flat(),w)}return v},[e,o,n,w]);return be.useLayoutEffect(()=>{g.computeLineDistances()},[e,g]),be.useLayoutEffect(()=>{c?x.defines.USE_DASH="":delete x.defines.USE_DASH,x.needsUpdate=!0},[c,x]),be.useEffect(()=>()=>{y.dispose(),x.dispose()},[y]),be.createElement("primitive",ml({object:g,ref:h},u),be.createElement("primitive",{object:y,attach:"geometry"}),be.createElement("primitive",ml({object:x,attach:"material",color:t,vertexColors:!!n,resolution:[m.width,m.height],linewidth:(p=i??s)!==null&&p!==void 0?p:1,dashed:c,transparent:w===4},u)))});export{Sp as A,xt as B,GP as C,Hi as E,WP as H,Xh as I,XP as L,xx as M,mm as Q,kP as R,F as V,VP as _,Oi as j,rP as u};
