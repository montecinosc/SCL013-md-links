const fs = require('fs');

const jsdom = require('jsdom');

const {
  JSDOM,
} = jsdom;

const path = __dirname;

const pathNode = require('path');

const showdown = require('showdown');

// Aroja solo files .md
fs.readdir(path, (error, files) => {
  files.forEach((file) => {
    if (file.includes('.md')) {
      console.log('files', file);

      // Lectura RaedMe markdown;
      fs.readFile('README.md', 'utf8', (err, data) => {
        if (err) {
          console.log('Don´t file .md');
        } else {
          // console.log(data.toString());
        }
        // Convertir Markdown a HTML;
        const converter = new showdown.Converter();
        const text = data.toString();
        const html = converter.makeHtml(text);

        // Pasa el ReadMe a HTML;
        const myHtml = html;
        // console.log(myHtml);

        // Leer el file HTML y sacar text, link y file;
        const pathTwo = `${path}${pathNode.sep}${file}`;
        const dom = new JSDOM(myHtml);
        const test = dom.window.document.querySelectorAll('a');
        let addTotal = 0;
        test.forEach((element) => {
          addTotal = 1 + addTotal;
          console.log('----------------------');
          console.log(element.textContent);
          console.log(element.href);
          console.log(pathTwo);
        });
        console.log('suma total', addTotal);
      });
    }
  });
});
console.log('esta es la path', path);
