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

* Remove running container
	* `docker rm -f {container name}`
	
* Login to Docker Hub
	* `docker login`
	
* Create docker image from existing Maven Build through Jib then upload to dockerhub (must be logged in). 2nd Opt if there's no maven build yet
	* `./mvwn jib:build -Djib.to.image={dockerUsername}/{repositoryName}:{Tag i.e. v1, v2, latest}`
	* `./mvwn clean install jib:build -Djib.to.image={dockerUsername}/{repositoryName}:{Tag i.e. v1, v2, latest}`
	* ex: `./mvwn clean install jib:build -Djib.to.image=bguiang/my-project:v1`
	
