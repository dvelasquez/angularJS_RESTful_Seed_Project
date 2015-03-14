# Proyecto Semilla: __AngularJS__ + __API .NET__  (_Swagger Doc's_)

El principal objetivo de este proyecto es entregar una plantilla semilla que se usará como base para cualquier proyecto a realizar en __AngularJS__ sobre un navegador web de escritorio, para lograr optimizar los tiempos y reducir la brecha de error en las tareas repetitivas que deben ser ejecutadas constantemente dentro del ciclo de vida de un proyecto. 

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Requerimientos:

   * SQL Server 2008 o Superior (Recomendado 2012)
   * Microsoft .NET 5.0
---------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Componentes:

1. API
      * [RESTful Protocol](https://msdn.microsoft.com/en-us/library/dd203052.aspx)
      * C#
      * [Swagger 2.0 Specification](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md),[Implementation](https://github.com/domaindrivendev/Swashbuckle)
      * Karma Framework
      * [Json Web Token](http://angular-tips.com/blog/2014/05/json-web-tokens-introduction/) , [RFC](http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html)

 2. Web
      * [AngularJS](https://angularjs.org/)
      * [Material Design](https://material.angularjs.org/#/)

 3. Móvil
      * [Ionic Framework](http://ionicframework.com/)
      * [AngularJS](https://angularjs.org/)
      * [Phonegap](http://phonegap.com/)
---------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Instalando las Dependencias  para el Ambiente de Desarrollo:

_(Omitir este paso si ya has configurado previamente un ambiente de desarrollo para otro proyecto)._

Antes de comenzar a configurar el ambiente de desarrollo son necesarias las siguientes dependencias (En ese orden):

* [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git): Control de versiones de para nuestro proyecto... solo con esa descripción basta...

* [Node.js](https://nodejs.org/): Administrador de paquetes , y contiene las funcionalidades mas importante para la optimización de los tiempos de desarrollo. (Descargar desde el [enlace](https://nodejs.org/))


* [Grunt](http://gruntjs.com/): Nuestro principal caballito de batalla en la __automatización de los procesos__ monótonos como la reducción , unificación y ofuscación de archivos, así como también la de proveernos en una sola linea la configuración y creación del servidor web que usaremos para el desarrollo.
```
#!Node.js
    npm install -g grunt-cli
```

* [Bower](http://bower.io/): El administrador de paquetes de nuestra aplicación web  __AngularJS__ , y que nos permitirá administrar las librerías (__bundles__) que necesitemos usar en la creación de nuestra aplicación , (google-map, angular-material,angular-ui-route, etc..). 
_(Con este módulo  ya no necesitaremos buscar los componentes o librerías externas para nuestro sitio)_
```
#!Node.js
    npm install -g bower
```

__Nota__: Estos comandos deben ser usados bajo el comando sudo (for OSX, *nix, BSD etc) o desde una linea de comandos como Administrator (Windows) para instalar __Grunt__ & __Bower__ globalmente

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Configurando el ambiente de desarrollo

Una vez instaladas las dependencias bases para nuestra plantilla, podemos comenzar a configurar un ambiente de desarrollo para el proyecto a desarrollar.

Comenzaremos Clonando este repositorio en un directorio 



---------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Direcciones de la  API y Documentación (_Swagger_ Specification)

#  | Url
------------------------------ | ---------------------------------------------------------------------------------
API Url                          | _$(ProjectUrl)_ **/v1**
Swagger API doc's       | _$(ProjectUrl)_ **/swagger/**
Swagger Specification  | _$(ProjectUrl)_ **/swagger/docs/v1**

__$(ProjectUrl)__\* : _Dirección Url donde se publicara el sistema_