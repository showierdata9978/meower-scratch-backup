import fs from 'fs';

export default function generate(genURL, data) {
	const css = fs.readFileSync("style_text.html")
	
	let html= css
	let pages = [];
	
	html += `<h1> ${data[0]["topic"]["title"]} </h1>`
		
	data.forEach((post, index) => {
     html += `<h3> ${post.username} </h3> <br/>`
     html += `<div> ${post.content.html} </div>`
     html += "<hr \\>"

     if ((index % 10) == 0) {
       html += `<a href="/${genURL(pages.length + 1)}"> Next page </a>`
       pages.push(html);
       html = css;
		 }
	})
	pages.push(html) 
	return pages
}