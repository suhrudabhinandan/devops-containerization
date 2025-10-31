pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = 'yourdockerhubusername/devops-containerization'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/<your-username>/<your-repo>.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    sh 'docker build -t backend-image ./backend'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    sh 'docker build -t frontend-image ./frontend'
                }
            }
        }

        stage('Docker Compose Up') {
            steps {
                script {
                    sh 'docker-compose up -d --build'
                }
            }
        }

        stage('Verify Containers') {
            steps {
                script {
                    sh 'docker ps'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Build Failed.'
        }
    }
}

