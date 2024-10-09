# syntax = docker/dockerfile:experimental
FROM ubuntu:22.04

# # Add Docker's official GPG key:
# RUN apt-get update
# RUN apt-get install ca-certificates curl -y
# RUN install -m 0755 -d /etc/apt/keyrings
# RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
# RUN chmod a+r /etc/apt/keyrings/docker.asc

# # Add the repository to Apt sources:
# RUN echo \
#     "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
#     $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
#     tee /etc/apt/sources.list.d/docker.list > /dev/null
# RUN apt-get update

# RUN apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

# Copy your docker-compose.yml
COPY __declare__/docker-compose.yml /app/__declare__/docker-compose.yml
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Expose port 8080
EXPOSE 5731

# # First, stand up the docker daemon
# RUN dockerd &
# RUN sleep 5

# # Docker compose pull
# WORKDIR /app/__declare__/
# RUN --security=insecure sh -c "dockerd & sleep 5 && docker compose pull"

WORKDIR /app
ENTRYPOINT ["/app/entrypoint.sh"]
