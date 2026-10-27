import fs from "node:fs";
import {HEXAGRAMS,COUNT,REGULAR_LINE_COUNT,SPECIAL_LINE_COUNT,TEXT_UNIT_COUNT,TRIGRAMS,SECTIONS,WING_GLOSSES,wingGlossByNumber,byNumber,byBits,changeLine,oppositeOf,reversedOf} from "../data/index.js";
let passed=0,failed=0;
function assert(ok,label){if(ok)passed++;else{failed++;console.error("FAIL "+label)}}
assert(COUNT===64,"64 hexagrams");
assert(REGULAR_LINE_COUNT===384,"384 canonical line entries");
assert(SPECIAL_LINE_COUNT===2,"2 special Qian/Kun line entries");
assert(TEXT_UNIT_COUNT===450,"64 judgments and 386 line texts");
assert(TRIGRAMS.length===8,"eight trigrams");
assert(Object.keys(WING_GLOSSES).length===64,"64 licensed Yi Zhuan explanation sets");
assert(new Set(TRIGRAMS.map(t=>t.bits)).size===8,"eight unique trigram patterns");
assert(SECTIONS.length===2&&SECTIONS[0].end===30&&SECTIONS[1].start===31&&SECTIONS[1].end===64,"upper/lower classics division");
assert(new Set(HEXAGRAMS.map(h=>h.bits)).size===64,"unique six-line patterns");
assert(new Set(HEXAGRAMS.map(h=>h.number)).size===64,"unique King Wen numbers");
assert(byNumber(1).bits==="111111"&&byNumber(2).bits==="000000","Qian/Kun binary structure");
assert(byNumber(11).bits==="111000"&&byNumber(12).bits==="000111","Tai/Pi binary structure");
assert(byNumber(1).image.includes("自强不息"),"Daxiang remains separate");
assert(byNumber(2).image.includes("厚德载物"),"Kun Daxiang remains separate");
assert(byNumber(1).specials.length===1&&byNumber(1).specials[0].label==="用九","Qian special");
assert(byNumber(2).specials.length===1&&byNumber(2).specials[0].label==="用六","Kun special");
for(let i=0;i<64;i++){
 const h=HEXAGRAMS[i],n=i+1;
 assert(h.number===n,"King Wen order "+n);
 assert(h.symbol===String.fromCodePoint(0x4dc0+i),"Unicode symbol "+n);
 assert(/^[01]{6}$/.test(h.bits),"binary pattern "+n);
 assert(byBits(h.bits)===h,"binary lookup "+n);
 assert(h.bits.slice(0,3)===TRIGRAMS.find(t=>t.name===h.lower)?.bits,"lower trigram bits "+n);
 assert(h.bits.slice(3,6)===TRIGRAMS.find(t=>t.name===h.upper)?.bits,"upper trigram bits "+n);
 assert(h.judgment.trim().length>1&&h.judgmentGloss.trim().length>5,"judgment with study gloss "+n);
 assert(h.tuan.trim().length>7&&h.image.trim().length>6,"complete Tuan and Daxiang "+n);
 assert(h.lines.length===6,"exact six lines "+n);
 assert(h.lines[0].label.startsWith("初")&&h.lines[5].label.startsWith("上"),"six positions bottom-to-top "+n);
 assert(h.lines.every((line,j)=>line.index===j+1&&line.text&&line.smallImage&&line.gloss),"all Yaoci and Xiaoxiang aligned "+n);
 assert(/^https:\/\/zh\.wikisource\.org\//.test(h.sourceUrl)&&/^\d+$/.test(h.sourceRevision),"per-hexagram source revision "+n);
 assert(h.specials.length===(n<=2?1:0),"specials only at Qian and Kun "+n);
 const wing=wingGlossByNumber(n);
 assert(Boolean(wing?.tuan&&wing?.image),"licensed Tuan and Daxiang glosses "+n);
 assert(wing?.small?.length===6&&wing.small.every(x=>x.length>1),"all six Xiaoxiang glosses "+n);
 assert(oppositeOf(oppositeOf(h)).number===n,"complement involution "+n);
 assert(reversedOf(reversedOf(h)).number===n,"reversal involution "+n);
 for(let j=1;j<=6;j++){
  const changed=changeLine(h,j);
  assert(changed&&changeLine(changed,j).number===n,"single-line involution "+n+":"+j);
  assert([...h.bits].filter((bit,k)=>changed.bits[k]!==bit).length===1,"single-line change exactness "+n+":"+j);
 }
}
assert(oppositeOf(byNumber(1)).number===2,"Qian complementary Kun");
assert(reversedOf(byNumber(11)).number===12,"Tai reciprocal Pi");
const paths=["README.md","SKILL.md","AGENTS.md","CONTENT-ATTRIBUTION.md","LICENSE","index.html","styles.css","app.js","prompts/codex-opencode.md",".agents/skills/zhouyi-wisdom/SKILL.md","references/decision-framework.md","references/quotation-guide.md","docs/README.md","docs/TEXTUAL-SOURCES.md","docs/READING-INTERACTION.md","scripts/build.mjs","data/index.js","data/wings-gloss.js","data/hexagrams-01-16.js","data/hexagrams-17-32.js","data/hexagrams-33-48.js","data/hexagrams-49-64.js",".github/workflows/ci.yml",".github/workflows/pages.yml","assets/favicon.svg","assets/og-cover.svg"];
for(const path of paths)assert(fs.existsSync(path),"required "+path);
const html=fs.readFileSync("index.html","utf8"),js=fs.readFileSync("app.js","utf8"),css=fs.readFileSync("styles.css","utf8");
const ids=[...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);
assert(ids.length===new Set(ids).size,"unique HTML ids");
for(const name of ["hex-grid","search","readings","six-lines","relation-symbol","relation-name","relation-caption","open-relation","tuan-text","image-text","small-image-list","read-count","collapse-all","font-minus","font-plus","theme-toggle","hex-nav","prev","next","bookmark","copy-link","opposite","reversed"]){
 assert(ids.includes(name),"HTML id "+name);
 assert(js.includes('"'+name+'"'),"JS id "+name);
}
assert(js.includes("translation.hidden=true"),"all translations initially hidden");
assert(js.includes('"aria-expanded"'),"accessible show/hide state");
assert(js.includes('"aria-controls"'),"independent meaning id relationships");
assert(js.includes("renderReadings(h)"),"chapter render hides all explanations");
assert(js.includes("wingGlossByNumber(h.number)"),"Yi Zhuan modern explanations are displayed by source layer");
assert(js.includes("createWingMeaning(")&&js.includes("meaning.hidden=true"),"Yi Zhuan glosses independently concealed");
assert(js.includes("changeLine(h,pos)"),"line buttons wire exact change computation");
assert(!js.includes("innerHTML"),"user source is never injected as raw HTML");
assert(css.includes(".reading-card")&&css.includes(".translation"),"vertical line style");
assert(!html.includes("reader-columns"),"not a left/right original/translation layout");
assert(html.includes('<details class="wings">'),"Ten Wings layer separated from original Yi Jing");
assert(html.includes('src="./app.js"'),"relative GitHub Pages path");
console.log("PASS "+passed+"/"+(passed+failed)+" assertions: "+COUNT+" hexagrams, "+REGULAR_LINE_COUNT+" regular lines, "+SPECIAL_LINE_COUNT+" extra texts.");
if(failed)process.exitCode=1;
