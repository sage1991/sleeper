container_id=$(docker ps -aqf "name=sleeper-mongo")

if [ -n "$container_id" ]; then
  docker rm -f "$container_id"
fi

docker run -d \
  --name sleeper-mongo \
  -p 27017:27017 \
  sleeper-mongo:latest
