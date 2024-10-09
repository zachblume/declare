#!/bin/sh

# Edit the Docker daemon configuration
mkdir -p /etc/docker
tee /etc/docker/daemon.json > /dev/null <<EOF
{
  "data-root": "/data"
}
EOF

# If the Docker daemon is running, stop it
if [ -f /var/run/docker.pid ]; then
  rm /var/run/docker.pid
fi

# Start the Docker daemon
dockerd &
DOCKERD_PID=$!

# Wait for the Docker daemon to start
sleep 5

# Check if the Docker daemon is running
if ps -p $DOCKERD_PID > /dev/null; then
  # Start Docker Compose services
  docker compose -f __declare__/docker-compose.yml up
else
  echo "Failed to start Docker daemon"
  exit 1
fi