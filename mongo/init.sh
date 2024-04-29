#!/bin/bash

docker build . -t mongo-cs
docker run --name mongodb -d -p 27017:27017 mongo-cs