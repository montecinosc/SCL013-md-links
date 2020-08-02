const fs = require('fs');

const jsdom = require('jsdom');

const {
  JSDOM,
} = jsdom;

const path = __dirname;

const pathNode = require('path');

const showdown = require('showdown');

const fetch = require('fetch');

const fetchUrl = fetch.fetchUrl;

const colors = require('colors');

const index = (fileIndex) => {
  const prueba = () => {
    // Aroja solo files .md
    fs.readdir(path, (error, files) => {
      files.forEach((file) => {
        if (file.includes('.md')) {
          console.log('files', file);

          // Lectura RaedMe markdown;
          fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
              console.log('Don´t file .md');
            } else {
              // console.log(data.toString());
            }
            // Convertir Markdown a HTML;
            const text = data.toString();
            const converter = new showdown.Converter();
            const html = converter.makeHtml(text);

            // Pasa el ReadMe a HTML;
            const myHtml = html;
            console.log(myHtml);
            const getStatus = (url) => {
              return new Promise((resolve, reject) => {
                fetchUrl(url, (error, meta) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(meta.status);
                    // console.log(meta)
                  }
                });
              });
            };

            // Truncar texto
            const truncateText = (text) => {
              if (text.length > 50) {
                const textFifty = text.slice(0, 50);
                return textFifty;
              } else {
                return text;
              }
            };

            // Leer el file HTML y sacar text, link y file;
            const pathTwo = `${path}${pathNode.sep}${file}`;
            const dom = new JSDOM(myHtml);
            const test = dom.window.document.querySelectorAll('a');
            let addTotal = 0;
            test.forEach((element) => {
              if (element.href.includes('http')) {
                addTotal = 1 + addTotal;
                const link = element.href;
                const textContent = element.textContent;
                const caracter50 = truncateText(textContent);

                getStatus(link)
                  .then((res) => {
                    console.log('----------'.blue);
                    console.log('text:'.blue, caracter50);
                    console.log('href:'.blue, link);
                    console.log('file:'.blue, pathTwo);
                    console.log('OK ✔'.green, res);
                  })
                  .catch(() => {
                    console.log('----------'.red);
                    console.log('text:'.red, caracter50);
                    console.log('href:'.red, link);
                    console.log('file:'.red, pathTwo);
                    console.log('error X'.red, err.code, 'error');
                  });
              }
            });
            console.log('suma total', addTotal);
          });
        }
      });
    });
    console.log('esta es la path', path);
  };
  if (fileIndex === '--validate') {
    console.log('esta validando');
    prueba(fileIndex);
  } else if (fileIndex === '--state') {
    prueba(fileIndex);
    console.log('estadistica');
  } else {
    console.log('Mal escrito,vuelve a escribir');
  }
  console.log('salio de la condicion');

  // Aroja solo files .md
  console.log('esta es la path', path);
};

module.exports = {
  index,
};
