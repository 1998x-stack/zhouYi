import A from "./hexagrams-01-16.js";
import B from "./hexagrams-17-32.js";
import C from "./hexagrams-33-48.js";
import D from "./hexagrams-49-64.js";

/** 周易古籍原文 + CC BY-SA 4.0 第三方现代导读。逐卦来源修订号见 records，详见 CONTENT-ATTRIBUTION.md。 */
export const HEXAGRAMS=Object.freeze([...A,...B,...C,...D]);
export const COUNT=HEXAGRAMS.length;
export const REGULAR_LINE_COUNT=HEXAGRAMS.reduce((n,h)=>n+h.lines.length,0);
export const SPECIAL_LINE_COUNT=HEXAGRAMS.reduce((n,h)=>n+h.specials.length,0);
export const TEXT_UNIT_COUNT=COUNT+REGULAR_LINE_COUNT+SPECIAL_LINE_COUNT;
export const TRIGRAMS=Object.freeze([
 {name:"乾",glyph:"☰",nature:"天",bits:"111",reading:"健"},
 {name:"兑",glyph:"☱",nature:"泽",bits:"110",reading:"悦"},
 {name:"离",glyph:"☲",nature:"火",bits:"101",reading:"丽"},
 {name:"震",glyph:"☳",nature:"雷",bits:"100",reading:"动"},
 {name:"巽",glyph:"☴",nature:"风",bits:"011",reading:"入"},
 {name:"坎",glyph:"☵",nature:"水",bits:"010",reading:"险"},
 {name:"艮",glyph:"☶",nature:"山",bits:"001",reading:"止"},
 {name:"坤",glyph:"☷",nature:"地",bits:"000",reading:"顺"}
]);
export const SECTIONS=Object.freeze([
 {key:"first",name:"上经",start:1,end:30},
 {key:"second",name:"下经",start:31,end:64}
]);
const BY_BITS=new Map(HEXAGRAMS.map(h=>[h.bits,h]));
export const byNumber=n=>HEXAGRAMS[Number(n)-1]??null;
export const byBits=bits=>BY_BITS.get(bits)??null;
/** 下爻在字符串索引0，上爻在索引5，6位只含0和1。 */
export function changeLine(hexOrBits,lineIndex){
 const bits=typeof hexOrBits==="string"?hexOrBits:hexOrBits?.bits;
 if(!/^[01]{6}$/.test(bits)||!Number.isInteger(lineIndex)||lineIndex<1||lineIndex>6)throw new RangeError("hexagram and line position must be valid");
 const chars=bits.split("");
 chars[lineIndex-1]=chars[lineIndex-1]==="1"?"0":"1";
 return byBits(chars.join(""));
}
export function oppositeOf(hexOrBits){
 const bits=typeof hexOrBits==="string"?hexOrBits:hexOrBits?.bits;
 if(!/^[01]{6}$/.test(bits))throw new RangeError("invalid hexagram");
 return byBits([...bits].map(c=>c==="1"?"0":"1").join(""));
}
export function reversedOf(hexOrBits){
 const bits=typeof hexOrBits==="string"?hexOrBits:hexOrBits?.bits;
 if(!/^[01]{6}$/.test(bits))throw new RangeError("invalid hexagram");
 return byBits([...bits].reverse().join(""));
}
export const sourceNote="64卦原典来自维基文库逐卦电子本；现代卦爻白话导读来自DaviRain-Su/classic_system（CC BY-SA 4.0）。";
