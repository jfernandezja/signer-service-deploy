#!/bin/bash

docker build -t juancarlosfernandez/oauth-service:master services/oauth-service
docker build -t juancarlosfernandez/signer-service:master services/signer-service

docker push juancarlosfernandez/oauth-service:master
docker push juancarlosfernandez/signer-service:master

kubectl patch deployment signer-service -p "{\"spec\":{\"template\":{\"metadata\":{\"labels\":{\"date\":\"`date +'%s'`\"}}}}}"