import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join as JoinPath } from 'path';
import generate from './generate.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
 
const pages = generate(
	index => {
		return `meower-scratch-backup/${index}.html`
	},
	JSON.parse(
		fs.readFileSync("dump.json"))
)

// Writing the files 
const outDir = __dirname

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir)
}

pages.forEach(async (page, index) => {
   const fp = JoinPath(outDir, `${index}.html`);
   fs.writeFileSync(fp, page);

});

fs.copyFileSync(JoinPath(outDir, "0.html"), JoinPath(outDir, "index.html"));
