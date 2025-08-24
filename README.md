# Hello World - Node.js Application
This repository contains the source code for a basic web server built with Node.js and Express. It is containerized using a Dockerfile and includes a CI pipeline for automated builds and testing.

## 🚀 Project Overview
The primary goal of this repository is to house the application logic and the Continuous Integration (CI) pipeline responsible for producing a deployable artifact (a Docker image). This project is designed to be one half of a modern GitOps workflow. The deployment of the application is managed in a separate GitOps repository, which declaratively defines the desired state of the application in a Kubernetes cluster.

## Repositories
This project is split into two distinct repositories to separate application concerns from deployment concerns:

- Application Repository (this-repo): Contains the source code for the Node.js and Express web server, a Dockerfile for containerization, and a GitHub Actions workflow that automates testing and image building.

- [GitOps Repository](https://github.com/lisazevedo/gitops): Contains all the Kubernetes YAML manifests (Deployment, Service, etc.) required to run the application. A GitOps operator (ArgoCD) monitors this repository. Changes to the application's deployment (e.g., updating the image tag) are made here via pull requests.

## ⚙️ How It Works
A developer pushes new code to this application repository (hello-world-node).

A CI pipeline, triggered by the push, runs tests to validate the code.

If tests pass, the pipeline builds a new Docker image and pushes it to a container registry (GitHub Container Registry) with a unique tag (like the Git commit SHA).

To deploy the new version, a developer creates a pull request in the GitOps repository to update the Kubernetes Deployment manifest with the new image tag.

Once the PR is merged in the GitOps repository, the GitOps tool detects the change in the main branch.

The GitOps tool automatically applies the new manifest to the Kubernetes cluster, pulling the new image and updating the application to the new version.