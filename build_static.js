import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join as JoinPath } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
 

const data = JSON.parse(
  fs.readFileSync("dump.json"));
const css = fs.readFileSync("style_text.html")

let html= css
// Showier: scratch styles
// WlodekM: bootstrap real
// WlodekM: noo it's white mode 
// Showier: still black :)
// WlodekM: it's *now* black, it was white
// WlodekM: i hate white...
''
let pages = [];
html += `<h1> ${data[0]["topic"]["title"]} </h1>`

data.forEach((post, index) => {
  html += `<h3> ${post.username} </h3> <br/>`
  html += `<div> ${post.content.html} </div>`
  html += "<hr \\>"

  if ((index % 10) == 0) {
    html += `<a href="/?p=${pages.length + 2}"> Next page </a>`
    pages.push(html);
    html = css;

  }

})

pages.push(html) 


// Writing the files 
const outDir = JoinPath(__dirname, "/out/")

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir)
}

pages.forEach((page, index) => {
   const fp = JoinPath(outDir, `${index}.html`);
   fs.writeFileSync(fp, page);

})

fs.writeFileSync(JoinPath(outDir, "dump.json"), JSON.stringify(data)); 
fs.copyFileSync(JoinPath(__dirname, "styles.css"),JoinPath(outDir, "styles.css")) 
