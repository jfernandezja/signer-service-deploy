#!/bin/bash
eksctl scale nodegroup --cluster=eks-signer-service --nodes=$1 --name=signer-nodegroup