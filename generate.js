import fs from "fs";
import fetch from "node-fetch";

/** 
	Generates the HTML for the pages based of the dumped data from the fourms.
	* @param {function} genURL - A function that takes the page number and returns the URL for that page.
	* @param {object} data - The data from the fourms.
	* @returns {string[]} - An array of HTML pages.
*/
export default async function generate(genURL, data) {
  const css = fs.readFileSync("style_text.html");
  let cashe = {};

  let html = css;
  let pages = [];

  let true_page = 0;
  html += `<h1> ${data[0]["topic"]["title"]} </h1>`;

  for (let index = 0; index < data.length; index++) {
    //console.log("post " + index);
    let post = data[index];
    let user;

    // get user id, so we can get their profile picture from the scratch upload bucket
    try {
      if (cashe[post.username] === undefined) {
        cashe[post.username] = await (
          await fetch(
            `https://trampoline.turbowarp.org/proxy/users/${post.username}/`
          )
        ).json();
        await new Promise(
          (resolve, reject) => setTimeout(() => resolve()),
          500
        ); // rate limit
      }

      user = cashe[post.username];
    } catch (err) {
      console.error("Failed to fetch " + post.username);
      user = {
        id: "0",
      };
      cashe[post.username] = user;
    }

    html += ` <img src="https://cdn2.scratch.mit.edu/get_image/user/${
      user.id !== undefined ? user.id : 0
    }_60x60.png?v=" style="padding-left: 5px/>`;

    html += `<h3 style="display: inline-block"> ${post.username} </h3> <br/>`;
    html += `<div> ${post.content.html} </div>`;
    html += "<hr \\>";

    // paginate every few posts
    if (index % 10 == 0) {
      true_page++;

      let effect_html = "";
      let effectOffset = 9; // Maximum offset value

      let effect_tracker = -effectOffset;

      let OldestButtonPage = true_page - effectOffset;
      let NewestButtonPage = true_page + effectOffset;

      if (OldestButtonPage < 0) {
        OldestButtonPage = 0;
        effect_tracker = 0;
      }

      if (pages.length !== 0) {
        effect_html += `<br /><div style="display: inline-block"><button onclick="window.location.href = '/${genURL(
          true_page - 1
        )}'"> &lt;&lt; </button>`;
      } else {
        effect_html += `<br /><div style="display: inline-block">`;
      }

      for (let i = OldestButtonPage; i <= NewestButtonPage; i++) {
        if (effect_tracker === 0) {
          effect_html += `<button disabled>${effect_tracker}</button>`;
        } else {
          effect_html += `<button onclick="window.location.href = '/${genURL(
            true_page + effect_tracker
          )}'">${effect_tracker}</button>`;
        }
        effect_tracker++;
      }

      effect_html += `<button onclick="window.location.href = '/${genURL(
        true_page + 1
      )}'"> &gt;&gt; </button></div>`;

      html += effect_html;

      pages.push(html);
      html = css + effect_html + "<br />";
      console.log("page " + pages.length);
      console.log("true pages: " + true_page);
    }
  }

  pages.push(html);
  return pages;
}
