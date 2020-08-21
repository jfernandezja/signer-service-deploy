#!/bin/bash
eksctl create cluster -f eks-service.yaml
kubectl apply -f ../kubernetes/deployment.yaml
kubectl apply -f ../kubernetes/service.yaml
kubectl get services