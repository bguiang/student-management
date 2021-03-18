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
	
### Running Maven Profiles for Jib (defined in pom.xml). Replaces the above commands
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
		