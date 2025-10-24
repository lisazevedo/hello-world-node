# Node.js "Hello World" with a DevSecOps CI/CD Pipeline

This repository contains a simple Node.js and Express web application, but its primary purpose is to demonstrate a robust, secure, and automated CI/CD pipeline built with GitHub Actions. It showcases modern DevSecOps principles, from code quality and security scanning to building hardened container images and deploying them securely.

## Repositories
This project is split into two distinct repositories to separate application concerns from deployment concerns:

- Application Repository (this-repo).

- [GitOps Repository](https://github.com/lisazevedo/gitops): Contains all the Kubernetes YAML manifests (Deployment, Service, etc.) and Terraform files, equired to run the application. A GitOps operator monitors this repository. Changes to the application's deployment (e.g., updating the image tag) are made here via pull requests.

## 🚀 DevSecOps Workflow Overview

This project implements a comprehensive CI/CD pipeline that automates the build, test, and deployment lifecycle. Security is integrated into every step, following the "shift-left" principle.

The pipeline is triggered on every `push` and `pull_request` to the `main` branch. Here’s a breakdown of the stages:

### CI-Pipeline

1.  **Lint & Test (`lint-and-test`)**:
    *   **Static Code Analysis**: Runs ESLint to enforce code style and catch common errors before they become bugs.
    *   **Unit & Integration Testing**: Executes a Jest test suite to validate application logic and ensure new changes don't break existing functionality.
    *   **Reproducible Builds**: Uses `npm ci` to install dependencies from the `package-lock.json` file, ensuring that the exact same dependency versions are used in CI as in local development.

2.  **Build & Push Secure Image (`build-and-push`)**:
    *   **Build Hardened Docker Image**: Constructs a production-ready Docker image using a multi-stage build process.
    *   **Push to Registry**: Tags the image with Git metadata (branch, semver tag) and pushes it to the GitHub Container Registry (GHCR).

3.  **Deploy to AWS (`deploy`)**:
    *   **Secure AWS Authentication**: Authenticates with AWS using a short-lived OIDC token instead of storing long-lived access keys.
    *   **Automated Deployment**: Uses AWS Systems Manager (SSM) to run a deployment script on a target EC2 instance, demonstrating a secure "push-based" deployment model.

---

## 🛡️ Key Security Practices (The "Sec" in DevSecOps)

Security is not an afterthought in this project; it's a core part of the automated workflow.

### 1. Secure Software Supply Chain

*   **Dependency Pinning**: `npm ci` and `package-lock.json` ensure that every build uses the exact same versions of dependencies, preventing unexpected changes or malicious packages from being introduced.
*   **Static Analysis (SAST)**: ESLint is used for static analysis to maintain code quality and prevent common security anti-patterns in JavaScript.

### 2. Hardened Container Images

The `Dockerfile` is optimized for security and performance:

*   **Multi-Stage Builds**: A `builder` stage is used to install `devDependencies` and build the application. The final `production` image only copies the necessary application code and `node_modules`, discarding the build tools and development dependencies. This significantly reduces the image size and attack surface.
*   **Distroless Base Image**: The final image is built `FROM gcr.io/distroless/nodejs20-debian12`. Distroless images are incredibly minimal—they do not contain a package manager, shell, or other standard Linux utilities. This drastically minimizes the potential vulnerabilities and provides a very small attack surface.
*   **Principle of Least Privilege**: The `.dockerignore` file prevents secrets, local configuration, and Git history from being included in the Docker build context, ensuring only necessary files are part of the image.

### 3. Secure CI/CD and Deployment

*   **Secretless Authentication with OIDC**: The deployment job authenticates with AWS using **OpenID Connect (OIDC)**. GitHub Actions provides a short-lived OIDC token to AWS, which then grants temporary credentials to the workflow via an IAM Role. This modern approach completely eliminates the need to store long-lived `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as repository secrets.
*   **Branch Protection**: The `main` branch can be protected to require that all changes come through pull requests and that the `lint-and-test` job must pass before merging. This prevents broken or untested code from being deployed.

---

## ⚙️ How to Run Locally

### Prerequisites

*   Node.js (v20 or later)
*   Docker

### Installation & Testing

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/lisazevedo/hello-world-node.git
    cd hello-world-node
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run tests:**
    ```bash
    npm test
    ```

4.  **Run the application:**
    ```bash
    node app.js
    # App will be running at http://localhost:3000
    ```

### Building and Running with Docker

1.  **Build the Docker image:**
    ```bash
    docker build -t hello-world-node .
    ```

2.  **Run the container:**
    ```bash
    docker run -p 3000:3000 -d hello-world-node
    ```

3.  **Access the application:**
    Open your browser and navigate to `http://localhost:3000`. You should see "Hello World!".