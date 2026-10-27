import {HEXAGRAMS,COUNT,REGULAR_LINE_COUNT,SPECIAL_LINE_COUNT,SECTIONS,TRIGRAMS,byNumber,wingGlossByNumber,changeLine,oppositeOf,reversedOf} from "./data/index.js";
const $=id=>document.getElementById(id);
const el=(tag,cls,text)=>{
 const node=document.createElement(tag);
 if(cls)node.className=cls;
 if(text!==undefined)node.textContent=text;
 return node;
};
const pref={
 get(k,fallback){try{return JSON.parse(localStorage.getItem("zhouyi:"+k))??fallback}catch{return fallback}},
 set(k,v){try{localStorage.setItem("zhouyi:"+k,JSON.stringify(v))}catch{/* Reading works without storage */}}
};
const hashNumber=()=>{const m=location.hash.match(/^#hex-(\d+)$/);return m?Number(m[1]):null};
const isValid=n=>Number.isInteger(n)&&n>=1&&n<=COUNT;
const last=pref.get("last",1);
const state={
 number:isValid(hashNumber())?hashNumber():isValid(last)?last:1,
 scope:"all",
 search:"",
 saved:Array.isArray(pref.get("saved",[]))?pref.get("saved",[]):[],
 font:Math.min(30,Math.max(16,Number(pref.get("font",20))||20)),
 relation:null,
 selectedLine:null
};
let toastTimer;
function notice(text){
 const box=$("toast");box.textContent=text;box.classList.add("on");
 clearTimeout(toastTimer);toastTimer=setTimeout(()=>box.classList.remove("on"),2000);
}
function setTheme(next){
 document.documentElement.dataset.theme=next;pref.set("theme",next);
 $("theme-toggle").setAttribute("aria-label",next==="silk"?"切换夜读":"切换宣纸日读");
 document.querySelector('meta[name="theme-color"]').content=next==="silk"?"#ede9da":"#13282b";
}
setTheme(pref.get("theme","silk")==="night"?"night":"silk");
$("theme-toggle").addEventListener("click",()=>setTheme(document.documentElement.dataset.theme==="silk"?"night":"silk"));
const trigram=name=>TRIGRAMS.find(t=>t.name===name);
const scrollStyle=()=>matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth";
function filtered(){
 const q=state.search.trim().toLocaleLowerCase("zh-CN");
 return HEXAGRAMS.filter(h=>{
  if(state.scope==="first"&&h.number>30)return false;
  if(state.scope==="second"&&h.number<=30)return false;
  if(state.scope==="saved"&&!state.saved.includes(h.number))return false;
  if(!q)return true;
  return [h.name,h.fullName,h.upper,h.lower,h.judgment,h.tuan,h.image,h.judgmentGloss,...h.lines.flatMap(y=>[y.text,y.gloss,y.smallImage])].join(" ").toLocaleLowerCase("zh-CN").includes(q);
 });
}
function renderGrid(){
 const results=filtered();
 $("result-count").textContent=results.length+" / 64 卦";
 $("no-result").hidden=results.length>0;
 const frag=document.createDocumentFragment();
 for(const h of results){
  const button=el("button","hex-card");button.type="button";
  button.setAttribute("aria-label","研读第"+h.number+"卦 "+h.fullName);
  button.append(el("span","number",String(h.number).padStart(2,"0")+(state.saved.includes(h.number)?" ★":"")),el("span","symbol",h.symbol),el("strong",null,h.name),el("small",null,h.fullName));
  button.addEventListener("click",()=>visit(h.number,true));
  frag.append(button);
 }
 $("hex-grid").replaceChildren(frag);
}
function renderSidebar(){
 const frag=document.createDocumentFragment();
 for(const h of HEXAGRAMS){
  const item=el("button","nav-hex"+(h.number===state.number?" active":""));item.type="button";
  if(h.number===state.number)item.setAttribute("aria-current","location");
  item.append(el("span",null,String(h.number).padStart(2,"0")),el("span",null,h.name),el("span",null,h.symbol));
  item.addEventListener("click",()=>visit(h.number,false));
  frag.append(item);
 }
 $("hex-nav").replaceChildren(frag);
 $("sidebar-progress").textContent=String(state.number).padStart(2,"0")+" / 64";
}
function activeDiagram(line){
 for(const b of $("six-lines").querySelectorAll("button"))b.setAttribute("aria-pressed",String(Number(b.dataset.line)===line));
}
function setRelation(related,description,line){
 state.relation=related;state.selectedLine=line;
 $("relation-symbol").textContent=related.symbol;
 $("relation-name").textContent=related.name+" · 第"+related.number+"卦";
 $("relation-caption").textContent=description;
 activeDiagram(line);
}
function renderDiagram(h){
 const frag=document.createDocumentFragment();
 for(let pos=6;pos>=1;pos--){
  const yang=h.bits[pos-1]==="1";
  const button=el("button","diagram-line");button.type="button";button.dataset.line=String(pos);
  button.setAttribute("aria-label","翻转"+(pos===6?"上":pos===1?"初":String(pos))+"爻，查看卦象变化");
  button.setAttribute("aria-pressed","false");
  button.append(el("span",null,pos===6?"上爻":pos===1?"初爻":pos+"爻"));
  const graphic=el("span","diagram-mark"+(yang?" yang":" yin"));
  graphic.append(el("span"),...(yang?[]:[el("span")]));
  button.append(graphic);
  button.addEventListener("click",()=>setRelation(changeLine(h,pos),"第"+pos+"爻阴阳翻转 · 仅展示结构",pos));
  frag.append(button);
 }
 $("six-lines").replaceChildren(frag);
 $("trigram-caption").textContent="下"+h.lower+" "+trigram(h.lower).glyph+" · 上"+h.upper+" "+trigram(h.upper).glyph;
 setRelation(oppositeOf(h),"错卦 · 六爻全部阴阳互换",null);
}
function countRevealed(){
 const all=$("readings").querySelectorAll(".reveal-button").length;
 const shown=$("readings").querySelectorAll('.reveal-button[aria-expanded="true"]').length;
 $("read-count").textContent="已揭晓 "+shown+" / "+all+" 条";
}
function toggleCard(button,interpretation){
 const show=button.getAttribute("aria-expanded")==="false";
 button.setAttribute("aria-expanded",String(show));
 button.setAttribute("aria-label",(show?"收起":"揭晓")+"本条现代白话导读");
 button.querySelector(".button-label").textContent=show?"收起此条白话":"轻触见义";
 button.querySelector(".reveal-seal").textContent=show?"收":"译";
 interpretation.hidden=!show;
 button.closest(".reading-card").classList.toggle("open",show);
 countRevealed();
}
function readingCard(h,id,type,label,text,gloss){
 const card=el("article","reading-card");card.setAttribute("role","listitem");
 const header=el("div","card-heading");
 header.append(el("span",null,type+" / "+label),el("span",null,h.number+" · "+h.name));
 const original=el("p","original",text);
 const button=el("button","reveal-button");button.type="button";
 const translationId="translation-"+h.number+"-"+id;
 button.setAttribute("aria-expanded","false");
 button.setAttribute("aria-controls",translationId);
 button.setAttribute("aria-label","揭晓"+label+"现代白话导读");
 button.append(el("span","button-label","轻触见义"),el("span","reveal-seal","译"));
 const translation=el("div","translation");translation.id=translationId;translation.hidden=true;
 translation.append(el("small",null,"现代白话 · 编辑性学习释读"),el("p",null,gloss));
 button.addEventListener("click",()=>toggleCard(button,translation));
 card.append(header,original,button,translation);
 return card;
}
function renderReadings(h){
 const frag=document.createDocumentFragment();
 frag.append(readingCard(h,"gua","卦辞","全卦",h.judgment,h.judgmentGloss));
 for(const line of h.lines)frag.append(readingCard(h,"line-"+line.index,"爻辞",line.label,line.text,line.gloss));
 for(const [i,special] of h.specials.entries())frag.append(readingCard(h,"extra-"+i,"特殊经辞",special.label,special.text,special.gloss));
 $("readings").replaceChildren(frag);countRevealed();
}
function createWingMeaning(h,kind,index,gloss){
 const button=el("button","wing-reveal","轻触见译 ＋");
 button.type="button";
 const id="wing-translation-"+h.number+"-"+kind+"-"+index;
 button.setAttribute("aria-expanded","false");
 button.setAttribute("aria-controls",id);
 button.setAttribute("aria-label","揭晓本条易传现代释读");
 const meaning=el("div","wing-translation");
 meaning.id=id;meaning.hidden=true;
 meaning.append(el("small",null,"现代白话导读 · CC BY-SA 4.0"),el("p",null,gloss));
 button.addEventListener("click",()=>{
  const opened=button.getAttribute("aria-expanded")==="false";
  button.setAttribute("aria-expanded",String(opened));
  button.setAttribute("aria-label",opened?"收起本条现代释读":"揭晓本条易传现代释读");
  button.textContent=opened?"收起此条译文 −":"轻触见译 ＋";
  meaning.hidden=!opened;
 });
 return [button,meaning];
}
function renderWings(h){
 const gloss=wingGlossByNumber(h.number);
 if(!gloss)throw new Error("No modern Wing explanations found for hexagram "+h.number);
 for(const [kind,text,meaning] of [["tuan",h.tuan,gloss.tuan],["image",h.image,gloss.image]]){
  const original=$(kind+"-text");original.textContent=text;
  const parent=original.parentElement;
  parent.querySelectorAll(".wing-reveal,.wing-translation").forEach(node=>node.remove());
  parent.append(...createWingMeaning(h,kind,"main",meaning));
 }
 const frag=document.createDocumentFragment();
 h.lines.forEach((line,index)=>{
  const li=el("li");
  li.setAttribute("aria-label",line.label+"小象传");
  li.append(el("p","wing-original",line.smallImage),...createWingMeaning(h,"small",index+1,gloss.small[index]));
  frag.append(li);
 });
 $("small-image-list").replaceChildren(frag);
 document.querySelector(".wings").open=false;
}
function renderReader(){
 const h=byNumber(state.number);
 const section=state.number<=30?"上经":"下经";
 $("reader-section").textContent=section+" · "+String(h.number).padStart(2,"0");
 $("hex-kicker").textContent=section+" · 第"+h.number+"卦";
 $("hex-heading").textContent=h.name;
 $("hex-fullname").textContent=h.fullName;
 $("intro-symbol").textContent=h.symbol;
 $("prev").disabled=h.number===1;
 $("next").disabled=h.number===64;
 $("prev-name").textContent=h.number>1?byNumber(h.number-1).name:"已是卷首";
 $("next-name").textContent=h.number<64?byNumber(h.number+1).name:"已是卷末";
 const saved=state.saved.includes(h.number);
 $("bookmark").textContent=saved?"★ 已收藏此卦":"☆ 收藏此卦";
 $("bookmark").setAttribute("aria-pressed",String(saved));
 $("original-source").href=h.sourceUrl;
 document.documentElement.style.setProperty("--reading-font",state.font+"px");
 renderDiagram(h);renderReadings(h);renderWings(h);renderSidebar();
}
function visit(n,scrollToReader){
 if(!isValid(n))return;
 state.number=n;renderReader();pref.set("last",n);
 history.replaceState(null,"","#hex-"+n);
 const destination=scrollToReader?$("reader"):$("hex-kicker");
 destination.scrollIntoView({behavior:scrollStyle(),block:"start"});
}
$("search").addEventListener("input",e=>{state.search=e.target.value;renderGrid()});
document.querySelectorAll(".filter").forEach(button=>button.addEventListener("click",()=>{
 state.scope=button.dataset.scope;
 document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===button));
 renderGrid();
}));
$("collapse-all").addEventListener("click",()=>{
 for(const button of $("readings").querySelectorAll('.reveal-button[aria-expanded="true"]')){
  toggleCard(button,document.getElementById(button.getAttribute("aria-controls")));
 }
});
$("font-plus").addEventListener("click",()=>{
 state.font=Math.min(30,state.font+2);pref.set("font",state.font);
 document.documentElement.style.setProperty("--reading-font",state.font+"px");
});
$("font-minus").addEventListener("click",()=>{
 state.font=Math.max(16,state.font-2);pref.set("font",state.font);
 document.documentElement.style.setProperty("--reading-font",state.font+"px");
});
$("opposite").addEventListener("click",()=>setRelation(oppositeOf(byNumber(state.number)),"错卦 · 阴阳全反",null));
$("reversed").addEventListener("click",()=>setRelation(reversedOf(byNumber(state.number)),"综卦 · 六爻次序反转",null));
$("open-relation").addEventListener("click",()=>{if(state.relation)visit(state.relation.number,false)});
$("prev").addEventListener("click",()=>visit(state.number-1,false));
$("next").addEventListener("click",()=>visit(state.number+1,false));
$("bookmark").addEventListener("click",()=>{
 state.saved=state.saved.includes(state.number)?state.saved.filter(n=>n!==state.number):[...state.saved,state.number];
 pref.set("saved",state.saved);
 const saved=state.saved.includes(state.number);
 $("bookmark").textContent=saved?"★ 已收藏此卦":"☆ 收藏此卦";
 $("bookmark").setAttribute("aria-pressed",String(saved));
 renderGrid();notice(saved?"已收藏此卦":"已取消收藏");
});
$("copy-link").addEventListener("click",async()=>{
 const url=new URL("#hex-"+state.number,location.href).href;
 try{await navigator.clipboard.writeText(url);notice("本卦链接已复制")}
 catch{notice("请复制浏览器地址栏链接")}
});
window.addEventListener("hashchange",()=>{const n=hashNumber();if(isValid(n)){state.number=n;renderReader();pref.set("last",n);$("reader").scrollIntoView({behavior:"auto"})}});
window.addEventListener("keydown",event=>{
 if(event.key==="/"&&!["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName)){
  event.preventDefault();$("search").focus();
 }
});
let scrollQueued=false;
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;$("progress").style.width=(max?Math.min(100,scrollY/max*100):0)+"%";scrollQueued=false}
window.addEventListener("scroll",()=>{
 if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateProgress)}
},{passive:true});
if("IntersectionObserver"in window){
 const obs=new IntersectionObserver(es=>{for(const e of es)if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target)}},{threshold:.08});
 document.querySelectorAll(".appear").forEach(x=>obs.observe(x));
}else document.querySelectorAll(".appear").forEach(x=>x.classList.add("visible"));
renderGrid();renderReader();updateProgress();
if(isValid(hashNumber()))requestAnimationFrame(()=>$("reader").scrollIntoView({behavior:"auto"}));
