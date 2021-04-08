# student-management

### Jib and Docker Commands

* Show all containers (local)
	* docker image ls

* Create docker image from existing Maven Build through Jib (local). 2nd Opt if there's no build yet
	* `./mvwn jib:dockerBuild -Djib.to.image={repositoryName}:{Tag i.e. v1, v2, latest}`
	* `./mvwn clean install jib:dockerBuild -Djib.to.image={repositoryName}:{Tag i.e. v1, v2, latest}`
	* ex: `./mvwn clean install jib:dockerBuild -Djib.to.image=fullstack:v1`
	
* Run the Application in docker container (local)
	* `docker run --name {container name you want to use} -p {yourPort}:{container's port} {repository}:{tag}`
	* ex: `docker run --name fullstack -p 3000:8080`
	* note: Port 3000 (localhost:3000) in your machine points to the container's port 8080 where the fullstack app is hosted

* Show all containers running (local)
	* `docker ps -a`

* Remove docker image (local)
	* `docker image rm {image name}:{tag}
	
* Remove running container
	* `docker rm -f {container name}`
	
* Login to Docker Hub
	* `docker login`
	
* Create docker image from existing Maven Build through Jib then upload to dockerhub (must be logged in). 2nd Opt if there's no maven build yet
	* `./mvwn jib:build -Djib.to.image={dockerUsername}/{repositoryName}:{Tag i.e. v1, v2, latest}`
	* `./mvwn clean install jib:build -Djib.to.image={dockerUsername}/{repositoryName}:{Tag i.e. v1, v2, latest}`
	* ex: `./mvwn clean install jib:build -Djib.to.image=bguiang/my-project:v1`
	
### Running Maven Profiles for Jib (defined in pom.xml). Replaces the above commands for building and uploading the image to dockerhub
* Build docker image and upload to dockerhub with custom tag and latest tag
	* `./mvnw clean install -P build-frontend -P jib-push-to-dockerhub -Dapp.image.tag=1`
	* The `-P` refers to profile
	* The `build-frontend` profile is active by default
		* It installs both Node and NPM on the src/frontend (the react frontend) using the **frontend-maven-plugin** and runs `npm install` to install npm packages and then `npm run build` to build the react project
		* Then it copies the react build files into the Maven project's src/target/classes/static using the **maven-resources-plugin**
	* The `jib-push-to-dockerhub` is not active by default
		* It creates the docker image using the **jib-maven-plugin** to the defined docker repository path twice. First with a custom tag and another with the "latest" tag
	* The `-Dapp.image.tag` argument is the custom tag (see pom.xml app.image.tag)
* Build docker image locally with custom tag and latest tag
	* `./mvnw clean install -P build-frontend -P jib-push-to-local -Dapp.image.tag=1`
	* The `-P` refers to profile
	* The `build-frontend` profile is active by default
		* It installs both Node and NPM on the src/frontend (the react frontend) using the **frontend-maven-plugin** and runs `npm install` to install npm packages and then `npm run build` to build the react project
		* Then it copies the react build files into the Maven project's src/target/classes/static using the **maven-resources-plugin**
	* The `jib-push-to-local` is not active by default
		* It creates the docker image using the **jib-maven-plugin** to the defined docker repository path twice. First with a custom tag and another with the "latest" tag
	* The `-Dapp.image.tag` argument is the custom tag (see pom.xml app.image.tag)
		
### Running Postgres DB on Docker container
* See https://hub.docker.com/_/postgres
* Create a docker network called "db". This network will communicate with the postgres docker container and a container using psql
	* `docker network create {network name}`
	* ex: `docker network create db`
* Create a docker container for Postgres db and save data to local machine (volume)
	* first create a local folder where the volume will be saved (mounted)
	* run the following command inside this folder
		* `docker run --name {container_name} -p {host_port}:{container_port} --network={network_name} -v "$PWD:/var/lib/postgresql/data" -e POSTGRES_PASSWORD={db_password} -d postgres:{tag}`
		* ex: `docker run --name db -p 5432:5432 --network=db -v "$PWD:/var/lib/postgresql/data" -e POSTGRES_PASSWORD=password -d postgres:alpine`
		* This will populate the $PWD folder which is the current folder with the database data
		* $PWD does not work on windows so just open the mounting folder and copy its path and paste it in place of $PWD
* To delete a network
	* `docker network rm {network name}`
	* ex: `docker network rm db`
* Connecting to Postgres db using PSQL Container
	* `docker run -it --rm --network={network_name} postgres:{tag} psql -h {postgres_container_name} -U {postgres_user}`
	* ex: `docker run -it --rm --network=db postgres:alpine psql -h db -U postgres`
	* The `--rm` command terminates the PSQL container after quitting
	* The PSQL Container has to communicate with the Postgres Container using the same network
### Using AWS RDS
* Go to elastic beanstalk and go configuration
* Edit and create the database
* Create a second application properties file and name it application-dev.properties
* On the Run Configurations when running locally, add an environment variable "SPRING_PROFILES_ACTIVE" and set the value to "dev"
	* the value needs to match the application-{value}.properties file name
	* this will run the app using the application-dev.properties file instead of the default properties file
* Set up a Security Group for RDS
	* Go to the RDS section on AWS and click the database created for your beanstalk
	* Go to the active VPC Security Group
	* Go to the Inbound rules tab