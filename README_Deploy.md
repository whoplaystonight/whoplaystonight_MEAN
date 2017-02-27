PASOS A SEGUIR PARA INSTALAR APLICACION EN VPS

##Node
descargar en https://nodejs.org/es/
descomprimir en /opt
tar -C /opt -Jxvf archivo.tar.xz
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


##Contact
Put your SENDGRID APIKEY in src/server/.env like this:
SENDGRID_API_KEY='YOUR API KEY'

##Facebook and twitter
Put this info en .env after sengrid api key
FACEBOOK_CLIENT_ID='1839022376365731'
FACEBOOK_CLIENT_SECRET='ca0cd5c294acd3848a04804f864ae7ed'
FACEBOOK_CALLBACK_URL='http://localhost:8001/api/auth/facebook/callback'
TWITTER_CLIENT_ID='VXHPUwMBneLkzmgWBSZs1mLiF'
TWITTER_CLIENT_SECRET='O1H9NH68tnTYhq7pMFk0WfVRhivwAGqUcRLb06Y0lERH1xfhou'
TWITTER_CALLBACK_URL='http://127.0.0.1:8001/api/auth/twitter/callback'


TEST AUTODEPLOY__3