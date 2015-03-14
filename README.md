# Proyecto Semilla: __AngularJS__ + __API .NET__  (_Swagger Doc's_)

El principal objetivo de este proyecto es entregar una plantilla semilla que se usará como base para cualquier proyecto a realizar en __AngularJS__ sobre un navegador web de escritorio, para lograr optimizar los tiempos y reducir la brecha de error en las tareas repetitivas que deben ser ejecutadas constantemente dentro del ciclo de vida de un proyecto. 

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

1. API

      * [SQL Server 2008](http://www.microsoft.com/es-cl/download/details.aspx?id=29062): Motor de base de datos , que usará la API Restful.

      * [Microsoft .NET 4.5](http://www.microsoft.com/es-cl/download/details.aspx?id=30653): Framework de Trabajo .NET y principal dependencia para el ambiente de desarrollo (Visual Studio).

2. Web
      * [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git): Control de versiones de para nuestro proyecto... solo con esa descripción basta...

      * [Node.js](https://nodejs.org/): Administrador de paquetes , y contiene las funcionalidades mas importante para la optimización de los tiempos de desarrollo. (Descargar desde el [enlace](https://nodejs.org/))

      * [Grunt](http://gruntjs.com/): Nuestro principal caballito de batalla en la __automatización de los procesos__ monótonos como la reducción , unificación y ofuscación de archivos, así como también la de proveernos en una sola linea la configuración y creación del servidor web que usaremos para el desarrollo.

      * [Bower](http://bower.io/): El administrador de tareas de nuestra aplicación web  __AngularJS__ , y que nos permitirá administrar las librerías (__bundles__) que necesitemos usar en la creación de nuestra aplicación , _(google-map, angular-material,angular-ui-route, etc., en resumen ya no necesitaremos buscar los componentes o librerías externas nunca mas)_
```shell
#Instalamos Grunt de forma global
npm install -g grunt-cli

#Hacemos lo mismo con Bower
npm install -g bower

#Vemos si existe alguna actualización de los paquetes de nodeJS
npm update

#Vemos si existe alguna actualización de los paquetes de Bower
bower update
```

__Nota__: Estos comandos deben ser usados bajo la función sudo (for OSX, *nix, BSD etc) o desde una linea de comandos como Administrator (Windows) para instalar __Grunt__ & __Bower__ globalmente

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Configurando el ambiente de desarrollo:

Una vez instaladas las dependencias bases para nuestra plantilla, podemos comenzar a configurar un ambiente de desarrollo para el proyecto a desarrollar.

Comenzaremos Clonando este repositorio en el repositorio del nuevo proyecto (repositorio del nuevo proyecto):

```shell
# Hacemos una copia simple del repositorio (Make a bare clone of the repository)
git clone --bare https://dmunozgaete@bitbucket.org/valentysarquitectura/angularjs_web_seedproject.git

# Enviamos el contenido clonado en el nuevo repositorio (Mirror-push to the new repository)
cd angularjs_web_seedproject.git
git push --mirror https://dmunozgaete@bitbucket.org/valentysarquitectura/{nuevo-repositorio}.git

# Limpiamos eliminando la copia simple del directorio (Remove our temporary local repository)
cd ..
rm -rf https://dmunozgaete@bitbucket.org/valentysarquitectura/angularjs_web_seedproject.git
```

Ahora que tenemos nuestro proyecto clonado en el repositorio de git (bitbucket) , comencemos configurando una rama local para nuestro desarrollo:

```shell
# Creamos una carpeta que contendrá nuestro repositorio
mkdir /direccion/del/proyecto

# Localizamos nuestro terminal en la carpeta del proyecto
cd/direccion/del/proyecto

# Iniciamos Git en la dirección que contendrá nuestro nuevo repositorio
git init

# Añadimos la referencia remota
git remote add origin https://dmunozgaete@bitbucket.org/valentysarquitectura/{nuevo-repositorio}.git

# Descargamos el contenido de la rama a nuestra maquina
git pull

# Finalmente, establecemos la rama con la cual trabajaremos
git checkout master
```
---------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Ejecutando nuestro ambiente de desarollo:


```shell
# Localizamos nuestro terminal en la carpeta del proyecto
cd/direccion/del/proyecto/

# Nos dirigimos al sitio web
cd Web/

# Finalmente levantamos el servidor web
grunt lift
```
---------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Direcciones de la  API y Documentación (_Swagger_ Specification)

#  | Url
------------------------------ | ---------------------------------------------------------------------------------
API Url                          | _$(ProjectUrl)_ **/v1**
Swagger API doc's       | _$(ProjectUrl)_ **/swagger/**
Swagger Specification  | _$(ProjectUrl)_ **/swagger/docs/v1**

__$(ProjectUrl)__\* : _Dirección Url donde se publicara el sistema_