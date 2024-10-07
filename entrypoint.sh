#!/bin/sh

# Start the Docker daemon in the background
dockerd &

# Wait until the Docker daemon is ready
while (! docker stats --no-stream ); do
    echo "Waiting for Docker to launch..."
    sleep 1
done

# Navigate to the directory containing your Docker Compose file
cd /app

# Run Docker Compose
DOCKER_BUILDKIT=0 docker-compose -f __declare__/docker-compose.yml up clickhouse --build
