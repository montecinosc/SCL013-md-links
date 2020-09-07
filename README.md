# Markdown Links
![--logo](https://ibb.co/09qmtGn)
## Índice

* [1. Definición del producto](#1-definicion-del-producto)
* [2. Diagrama de flujo](#2-diagrama-de-flujo)
* [3. Instalación librería](#2-instalacion-libreria)

***

## 1. Definición del producto 
 
Markdown es un lenguaje de marcado muy popular en plataformas que manejan texto planos, tales como GitHub, foros, blogs, entre otros y es muy común encontrarlo por ejemplo en archivos 'README.md'.

Estos archivos suelen contener links los cuales en ocasiones pueden estar rotos o ser no válidos, es por ello que como desarrolladoras se nos pidio crear una librería la cual permitiera leer los archivos markdown como por ejemplo un README.md y verificar sus link, para de esta forma validarlos y ver la cantidad de ellos que contiene el directorio. 

## 2. Diagrama de Flujo :straight_ruler: 

![Diagrama de Flujo](http://imgfz.com/i/JI3Xaos.png)

## 3. Instalación librería. :wrench: 

* Para instalar nuestra librería necesitas tener:

- Node.js
- npm


## Pasos a seguir :memo: 

1.- Instalar librería

npm i md-links-life

2.- Importarla 

const mdLink = require("md-links-life")

3- En la terminal llamamos a 

node index.js 

## 4- Ejecutar comandos 
* Luego de incorporar la libreria a tu proyecto , tienes que escribir en consola 
  node index.js `--validate` , el cual te enviara la validacion de los link que se encuentran en tu README.md,el cual puede lanzar 400(error) y 200(ok):

![--validate](http://imgfz.com/i/0j62DfM.png)

* Para ver las estadísticas de tus link debes incorporar node index.js `--stats`, el cual lanzara los estados links total y links unicos : 

![--stats](http://imgfz.com/i/0vZ1Kuc.png)

* Al incorporar `--stats` y `--validate` se obtienen estadísticas y validación , el cual lanzara links total,links unicos y links rotos:

![--validateStats](http://imgfz.com/i/tCSExTn.png)

## 5-Construido con :star: 

* colors
* jsdom
* showdown

## 6-Autores md-link-life :pencil2:

* Lilibeth Gaete
* Fernanda Montecinos

