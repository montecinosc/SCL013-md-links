/*module.exports = () => {
  // ...
};*/

const fs = require('fs');
const  jsdom  =  require ( "jsdom" ) ; 
const  {  JSDOM  }  =  jsdom ;
const ruta = __dirname;


//Aroja solo archivos .md
fs.readdir(ruta, (error, archivos) => {
  archivos.forEach(archivo => {
  if (archivo.includes(".md")) {
  console.log("archivos", archivo)

//Lectura RaedMe markdown 
fs.readFile('README.md','utf8', (err, data)=> {
    if(err){
        console.log("NOO un archivo .md")
    }else
    {
        //console.log(data.toString())
    }

  //Convertir Markdown a HTML
  const showdown  = require('showdown'),
  converter = new showdown.Converter(),
  text      = data.toString(),
  html      = converter.makeHtml(text);
 
 // Pasa el ReadMe a HTML
  const myHtml = html;
  //console.log(myHtml)

  //Leer el archivo HTML y sacar text, link y file
  const rutaDos = `${ruta}/${archivo}`;
  const dom = new JSDOM(myHtml);
  const test = dom.window.document.querySelectorAll('a');
  test.forEach(element => {
  console.log("----------------------")
  console.log(element.textContent)
  console.log(element.href)
  console.log(rutaDos)

});
  
  });
}
})
})
  console.log("esta es la ruta", ruta)
