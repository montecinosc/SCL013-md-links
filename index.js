/*module.exports = () => {
  // ...
};*/

const fs = require('fs');
const  jsdom  =  require ( "jsdom" ) ; 
const  {  JSDOM  }  =  jsdom ;
const path = __dirname;
const pathNode = require('path');

// Aroja solo files .md
fs.readdir(path, (error, files) => {
  files.forEach(file => {
  if (file.includes(".md")) {
  console.log("files", file)

// Lectura RaedMe markdown 
fs.readFile('README.md','utf8', (err, data)=> {
    if(err){
        console.log("Don´t file .md")
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

  //Leer el file HTML y sacar text, link y file
  const pathTwo = `${path}${pathNode.sep}${file}`;
  const dom = new JSDOM(myHtml);
  const test = dom.window.document.querySelectorAll('a');
  let add = 0;
  test.forEach(element => {
  addTotal = add + 1
  console.log("----------------------")
  console.log(element.textContent)
  console.log(element.href)
  console.log(pathTwo)


});
console.log("suma total", suma)
  });
}
})
})
  console.log("esta es la path", path)
  

  
  
