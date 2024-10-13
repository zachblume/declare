#!/bin/bash

# Initialize the Airflow database
airflow db upgrade

# Create an admin user (you can adjust the username and password)
airflow users create \
    --username admin \
    --firstname Admin \
    --lastname User \
    --role Admin \
    --email admin@example.com \
    --password admin

# Start the scheduler in the background
airflow scheduler &

# Start the webserver
exec airflow webserver
