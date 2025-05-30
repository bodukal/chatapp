pipeline {
    agent any

    environment {
        CHAT_APP_SERVER = "ec2-user@54.156.114.207"
        APP_DIR = "/home/ec2-user/chatapp"
        CREDENTIAL_ID = "ec2-deploy-key"
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/bodukal/chatapp.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Deploy to Server') {
            steps {
                sshagent (credentials: ['ec2-deploy-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no $CHAT_APP_SERVER '
                            cd $APP_DIR &&
                            git pull origin main &&
                            npm install &&
                            pm2 restart chatapp || pm2 start app.js --name chatapp
                        '
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed!'
        }
    }
}

