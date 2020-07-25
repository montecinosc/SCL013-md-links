/*module.exports = () => {
  // ...
};*/

const fs = require('fs');
const  jsdom  =  require ( "jsdom" ) ; 
const  {  JSDOM  }  =  jsdom ;
const colors = require('colors');

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

  const dom = new JSDOM(myHtml);
  const test = dom.window.document.querySelector('p').textContent;
  console.log(test)
  
  });
