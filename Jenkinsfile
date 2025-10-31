pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                bat 'docker build -t backend-image ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                bat 'docker build -t frontend-image ./frontend'
            }
        }

        stage('Docker Compose Up') {
            steps {
                bat 'docker-compose up -d --build'
            }
        }

        stage('Verify Containers') {
            steps {
                bat 'docker ps'
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
