const fs = require('fs');

const jsdom = require('jsdom');

const {
  JSDOM,
} = jsdom;

const path = __dirname;

const pathNode = require('path');

const showdown = require('showdown');
const fetch = require('fetch')

const fetchUrl = fetch.fetchUrl;

const colors = require('colors');

const index = (fileIndex) => {
    console.log("fileIndex ARGV", fileIndex)

    let validate = false;
    let stats = false;

    validate = process.argv.includes("--validate");
    stats = process.argv.includes("--stats");

    console.log("validate", validate)
    console.log("stadistica", stats)

    // buscar el archivo .md
    const prueba = (condition) => {
        console.log("condicionnn", condition)
        fs.readdir(path, (error, files) => {
            files.forEach((file) => {
              if (file.includes('.md')) {
                //  console.log('files', file);
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
                    //   console.log(myHtml);
                    const getStatus = (url) => {
                      return new Promise((resolve, reject) => {
                        fetchUrl(url, (error, meta) => {
                          if (error) {
                            reject(error);
                          } else {
                            resolve(meta.status);
                            // console.log(meta)
                          }
                        })
                      })
                    };
                    // Truncar texto
                    const only50Caracteres = (text) => {
                      if (text.length > 50) {
                        const text50 = text.slice(0, 50);
                        return text50;
                      } else {
                        return text;
                      }
                    }

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
                        const caracter50 = only50Caracteres(textContent)
                        if (condition === "--validate") {
                          getStatus(link)
                            .then(res => {
                              console.log('----------'.blue);
                              console.log('text:'.blue, caracter50);
                              console.log('href:'.blue, link);
                              // console.log('file:'.blue, pathTwo);
                              console.log('OK ✔'.green, res);
                            })
                            .catch(err => {
                              console.log('----------'.red);
                              //console.log('text:'.red, caracter50);
                              // console.log('href:'.red, link);
                              //   console.log('file:'.red, pathTwo);
                              console.log('error X'.red, err.code, 'error');
                            })
                        }
                      }
                    });
                    if (condition === '--stats') {
                      console.log('suma total', addTotal);
                      console.log("link rotos")
                      console.log("links unicos")
                    }

                    const addBroken = 0;
                    const estadisticas = test.forEach((element) => {
                        if (element.href.includes('http')) {
                          if (condition === "--validate --stats") {
                            getStatus(link)
                              .catch(err => {
                                addBroken = 1 + addBroken;
                              });
                          };
                        }); console.log("link rotos", addBroken); console.log('suma total', addTotal);
                    }
                  }
                });
            });
          }

          switch (validate, stats) {

            console.log("entro a los Dos ")
            const condition = "--validate --stats"
            prueba(condition)
          } else if (stats === true) {
            // stats = true;
            const condition = "--stats";
            prueba(condition)
            console.log('estadistica')

          } else if (validate === true) {
            // validate = true;
            const condition = "--validate"
            console.log('validandooo');
            prueba(condition)
          } else {
            console.log("helpsssss")
          }

          // console.log("salio de la cosa ")
          // console.log(fileIndex)
          // Aroja solo files .md
          // console.log('esta es la path', path);
        };

        module.exports = {
          index
        };
