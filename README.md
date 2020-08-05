# Markdown Links

## Índice

* [1. Definición del producto](#1-definicion-del-producto)
* [2. Diagrama de flujo](#2-diagrama-de-flujo)
* [3. Instalación librería](#2-instalacion-libreria)

***

## 1. Definición del producto 
 
Markdown es un lenguaje de mercado muy popular en plataformas que manejan texto planos, tales como GitHub, foros, blogs, entre otros y es muy común encontrarlo por ejemplo en archivos 'README.md'.

Estos archivos suelen contener links los cuales en ocasiones pueden estar rotos o ser no válidos, es por ello que como desarrolladoras se nos pidio crear una librería la cual permitiera leer los archivos README.md y verificar sus link, para de esta forma validarlos y ver la cantidad de ellos que contiene el directorio. 

## 2. Diagrama de Flujo 

![Diagrama de Flujo](http://imgfz.com/i/aFLSNtj.jpeg)

## 3. Instalación librería.

* Para instalar nuestra librería necesitas tener:

- Node.js
- npm

## Pasos a seguir

1.- Instalar libreria

npm i md-links-life

2.- Importarla 

const mdLink = require("md-links-life")

3- Ejecutar comandos 

* Para ver si los link funcionan debes validarlos, para ello incorporar `--validate`: 

![--validate](http://imgfz.com/i/fDdAuve.png)

* Para ver las estadísticas de tus link debes incorporar `--stats` : 

![--stats](http://imgfz.com/i/M1aTCiF.png)

* Al incorporar `--stats` y `--validate` se obtienen estadísticas de la validación.

![--validateStats](http://imgfz.com/i/MxdTvRy.png)



