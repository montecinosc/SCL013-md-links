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
  console.log("Esto es lo que recibe", fileIndex)

  let validate = false;
  let stats = false;

  validate = fileIndex.includes("--validate");
  stats = fileIndex.includes("--stats");

  const prueba = (condition) => {
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
            // console.log(myHtml);
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

                if (condition === "--validate") {
                  getStatus(link)
                    .then((res) => {
                      console.log('----------'.blue);
                      console.log('text:'.blue, caracter50);
                      console.log('href:'.blue, link);
                      console.log('file:'.blue, pathTwo);
                      console.log('OK ✔'.green, res);
                    })
                    .catch(() => {
                      console.log("este es mi", addBroken)
                      console.log('----------'.red);
                      console.log('text:'.red, caracter50);
                      console.log('href:'.red, link);
                      console.log('file:'.red, pathTwo);
                      console.log('error X'.red, err.code, 'error');
                    });
                };
              }
            });
            if (condition === "--stats") {
              console.log('suma total', addTotal);
            } else(condition === "--validate --stats")
            console.log('Cantidad Link', addTotal);
          });
        }
      });
    });
    console.log('esta es la path', path);
  };
  if (validate === true && stats === false) {
    console.log('esta validando');
    const valor = "--validate"
    prueba(valor);
  } else if (stats === true && validate === false) {
    console.log('estadistica');
    const estadistica = "--stats"
    prueba(estadistica);
  } else if (validate === true && stats === true) {
    console.log("funciona??")
    const ambos = "--validate --stats"
    prueba(ambos)
  } else {
    console.log('Para ver validación incorpore --validate');
    console.log('Para ver estadistica incorpore --stats');
  }



  //console.log('salio de la condicion');

  // Aroja solo files .md
  //console.log('esta es la path', path);

};

module.exports = {
  index,
};
