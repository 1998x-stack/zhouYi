import fs from "node:fs";import path from "node:path";
const out=path.resolve("dist");
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
for(const file of ["index.html","styles.css","app.js",".nojekyll"])fs.copyFileSync(file,path.join(out,file));
for(const dir of ["data","assets"])fs.cpSync(dir,path.join(out,dir),{recursive:true});
for(const file of ["index.html","styles.css","app.js","assets/favicon.svg","assets/og-cover.svg","data/index.js","data/hexagrams-01-16.js","data/hexagrams-49-64.js"])
 if(!fs.existsSync(path.join(out,file)))throw Error("missing build asset "+file);
console.log("Static Pages site compiled to dist/");
