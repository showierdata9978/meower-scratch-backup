import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join as JoinPath } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const app = express();
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
    html += `<a href="/?p=${pages.length + 1}"> Next page </a>`
    pages.push(html);
    html = css;

  }

})

pages.push(html);

app.get('/', (req, res) => {
  return res.send(pages[req.query.p ? parseInt(req.query.p, 10) : 0]);
});

app.get('/styles.css', (req, res) => {
  console.log("styles")
  return res.sendFile(JoinPath(__dirname, "/styles.css"));
})

app.listen(3000, () => {
  console.log('server started');
});
//I'm also fakefurry so if you see FakeFurry join, it's me - WlodekM 
// alr - showier 
