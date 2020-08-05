const fs = require('fs');

const jsdom = require('jsdom');

const {
  JSDOM,
} = jsdom;

const path = __dirname;

const pathNode = require('path');

const showdown = require('showdown');

const fetchUrl = require('fetch').fetchUrl;

const colors = require('colors');

const index = (fileIndex) => {
  let validate = false;
  let stats = false;

  validate = fileIndex.includes('--validate');
  stats = fileIndex.includes('--stats');

  const prueba = (condition) => {
    // Aroja solo files .md
    fs.readdir(path, (error, files) => {
      files.forEach((file) => {
        if (file.includes('.md')) {
          // console.log('files', file);

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
            //  console.log(myHtml);
            const getStatus = (url) => {
              return new Promise((resolve, reject) => {
                fetchUrl(url, (error, meta, body) => {
                  if (error) {
                    if (error.code === 'ENOTFOUND') {
                      //  console.log(error);
                      reject(400);
                    }
                  } else {
                    resolve(meta.status);
                    // console.log(meta)
                  }
                });
              });
            };
            const getErrores = (url) => {
              return new Promise((resolve, reject) => {
                fetchUrl(url, (error, meta, body) => {
                  if (error) {
                    if (error.code) {
                      resolve(400);
                    }
                  } else {
                    reject(meta.status);
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
            let arregloLink = [];
            let unique = [];
            test.forEach((element) => {
              if (element.href.includes('http')) {
                addTotal = 1 + addTotal;
                const link = element.href;
                const textContent = element.textContent;
                const caracter50 = truncateText(textContent);
                arregloLink.push(link);
                unique = [...new Set(arregloLink.map((element) => element))].length;

                // condicion para ingresar a la validacion
                if (condition === '--validate') {
                  getStatus(link)
                    .then((res) => {
                      console.log('----------'.blue);
                      console.log('text:'.blue, caracter50);
                      console.log('href:'.blue, link);
                      console.log('file:'.blue, pathTwo);
                      console.log('OK ✔'.green, res);
                    })
                    .catch((err) => {
                      console.log('----------'.red);
                      console.log('text:'.red, caracter50);
                      console.log('href:'.red, link);
                      console.log('file:'.red, pathTwo);
                      console.log('error X'.red, err, 'error');
                    });
                }
              }
            });
            // condicion para ingresar a las estadisticas
            if (condition === '--stats') {
              console.log('Total:', addTotal);
              console.log("Unique:", unique);
              console.log("----------------------".rainbow)
            }
            // condicion para mostrar la validacion y estadisticas
            if (condition === '--validate --stats') {
              console.log('Total:'.blue, addTotal);
              console.log("Unique".blue, unique);
              Promise.all(arregloLink.map(urls => getErrores(urls).catch(error => garbage(error))))
                .then(result => {
                  if (result.filter(Boolean)) {
                    console.log("Broken:".blue, result.filter(Boolean).length);
                    console.log("----------------------".rainbow)
                  }
                })
            }
          });
        }
      });
    });
  };
  if (validate === true && stats === false) {
    console.log('Validate'.bold);
    const valor = '--validate';
    prueba(valor);
  } else if (stats === true && validate === false) {
    console.log('Stats'.bold);
    const estadistica = '--stats';
    prueba(estadistica);
  } else if (validate === true && stats === true) {
    console.log('Validate and Stats'.bold);
    const ambos = '--validate --stats';
    prueba(ambos);
  } else {
    console.log("Do you need a Help".yellow.bold)
    console.log('Para ver validación incorpore --validate');
    console.log('Para ver estadistica incorpore --stats');
  }
};

const garbage = (error) => {
  let pruebaDos = error;
}
module.exports = {
  index,
};
