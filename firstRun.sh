#!/bin/bash

docker-compose run web npm install
docker-compose up -d --build
docker-compose logs -f
