PASOS A SEGUIR PARA INSTALAR APLICACION EN VPS

##Node
descargar en https://nodejs.org/es/
descomprimir en /opt
cd /usr/local/bin/
sudo ln -s /opt/node-v6.9.4-linux-x64/bin/node node
sudo ln -s /opt/node-v6.9.4-linux-x64/bin/npm npm
npm install -g bower gulp nodemon
whereis gulp
cd /usr/local/bin/
sudo ln -s /opt/node-v6.9.4-linux-x64/bin/bower bower
sudo ln -s /opt/node-v6.9.4-linux-x64/bin/gulp gulp
sudo ln -s /opt/node-v6.9.4-linux-x64/bin/nodemon nodemon
Ejecutar el gulp como root ante cualquier problema
// En caso de desastre borrar
whereis npm
whereis node
borrarlos todos
