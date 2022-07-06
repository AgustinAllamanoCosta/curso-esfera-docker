docker run -it --rm -t -d --name wiremock-local -v log-jboss-fuse:/sgc/jbossFuse/data/log wiremock/wiremock:2.33.1 

docker run -it --rm -t -d --name postgres-local -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:alpine

