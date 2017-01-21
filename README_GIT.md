En este documento vamos a definir los pasos a seguir para mantener un flujo de
trabajo correcto con GIT, el sistema de control de versiones empleado.

  Paso 1: CLONAR REPOSITORIO REMOTO A LOCAL

    Clonar el repositorio remoto ejecutando en la terminal abierta en el directorio
    donde queramos crear el repositorio local o proyecto:

            git clone https://github.com/whoplaystonight/whoplaystonight_MEAN.git

    Con esto nos habremos bajado la rama master del proyecto.


  Paso 2: CREAR BRANCH O RAMA

    Para preservar la rama master, cada colaborador se creará una rama de desarrollo,
    a la que le asignará el nombre del colaborador.

                        git checkout -b Sergio

    Esta será la rama de desarrollo de cada colaborador, en la que implementará
    sus avances. En principio es una rama local, que habrá que subirla al repositorio
    remoto con:

                      git push -u origin Sergio

    Ahora que ya tenemos la rama en local y remoto, cada cambio que realicemos en local
    lo reflejaremos en remoto con los commits y push correspondientes.

    Para comprobar en que rama nos encontramos ejecutar:

                                git branch


  Paso 3: FUNDIR RAMAS PROPIAS CON LA RAMA MASTER

    Una vez terminado y comprobado el desarrollo en curso, es hora de fundirlo con
    la rama master.El primer paso es situarnos en la rama master y a continuación
    añadir los cambios de la rama propia a la rama master. Esto lo haremos ejecutando
    estas dos ordenes:

    Para situarnos en master:

                                git checkout master.

    Para añadir los cambios de la rama propia con la rama master:

                                git merge Sergio

    Esta accion no nos añadirá los cambios de master a la rama propia, solo los
    de la rama propia sobre master.

  Paso 4: SUBIR CAMBIOS AL REPOSITORIO REMOTO

    Los ultimos cambios realizados se han hecho en el repositorio local.
    Ahora es el momento de subirlos al repositorio remoto. Situados en la rama
    master ejecutamos:

                            git push -u origin master

    A partir de aqui pueden pasar dos cosas:

      1.-Que el repositorio remoto master no haya sufrido cambios por parte de
      algún otro colaborador, entoces el push se realizará correctamente.

      2.- Que el repositorio remoto haya sugrido cambios por parte de algun otro
      colaborador. Entonces se nos informará del conflicto. Lo normal es que se
      solucione ejecutando:

                              git pull

      Si con el git pull se nos informa de conflictos, habrá que resolverlos
      entrando en los ficheros afectados y borrando el codigo que no deseemos
      mantener. El codigo añadido por nosotros se encontrara entre <<<<<HEAD y
      =====. Entre ====== y >>>>>>>> tendremos el codigo descargado de remoto.
      Borraremos el que proceda y una vez borrado, haremos git add . para añadir los
      archivo modificados y el commit correspondiente.

      Con esto habremos fusionado los últimos cambios del master remoto al master local
      Ahora ejecutaremos de nuevo:


                              git push -u origin master

      Y habremos subido los ultimos cambios de nuestro master local (que ya
      contiene los cambios de nuestra rama propia local) al master remoto.


      PASO 4: FUNDIR RAMA MASTER CON RAMA PROPIA

      El último paso a realizar, solo en el caso de que queramos continuar
      trabajando con ella, es sincronizar los cambios de nuestra rama
      propia local con la rama master local( que acabamos de sincronizar con la
      master remota). Para ello, nos situamos en la rama propia con:

                            git checkout Sergio

      Y haremos un merge con la rama master local:


                            git merge master

      Subiendo a continuación los cambios a la rama propia remota:

                            git push -u origin Sergio


      Siguiendoe estos 4 pasos conseguiremos tener sincronizadas las 4 ramas
      (master local,rama local, master remoto y rama remota).
