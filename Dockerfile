# Use the official Docker-in-Docker image as the base
FROM docker:dind

# Install necessary packages for Docker Compose
RUN apk add --no-cache \
    py-pip \
    python3-dev \
    libffi-dev \
    openssl-dev \
    gcc \
    libc-dev \
    make \
    curl

# Install Docker Compose
RUN curl -SL https://github.com/docker/compose/releases/download/v2.29.6/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose

# Change working directory
WORKDIR /app

# Copy everything including your Docker Compose configuration into the container
COPY . .

# # Copy the entrypoint script into the container
RUN chmod +x entrypoint.sh

# # Set the entrypoint to your script
ENTRYPOINT ["/app/entrypoint.sh"]
