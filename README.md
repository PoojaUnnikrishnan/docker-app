To run this repository locally:

Step 1 : git clone < repository code url >
Step 2 : npm i
Step 3 : npm start

After cloning the repository with the help of package.json file you can install all the modules which I have used to build the application. And then to run the react app we use npm start. At this point your react app will be running in port 3000.

Secondly we have fhir server used to pull and push patient details. To run this you have docker-compose.yaml file present in repository which will help to run it locally.

Step 1 : Install docker and do the initial setup
Step 2 : docker-compose up

Note : For first time users of docker, After running the above command it will take a while to connect.If all goes well, you'll have a FHIR server running on port 8080.The base URL will be
http://localhost:8080/fhir by default.

**Cheers**
