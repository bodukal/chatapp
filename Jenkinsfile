pipeline {
    agent any

    environment {
        ANSIBLE_HOST_KEY_CHECKING = 'False'
        PRIVATE_KEY_PATH = '/home/jenkins/.ssh/saturday.pem'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'git@github.com:bodukal/chatapp.git', branch: 'main'
            }
        }

        stage('Run Ansible Playbook') {
            steps {
                sh '''
                    cd chatapp-ansible
                    ansible-playbook -i inventory.ini setup.yml --private-key=${PRIVATE_KEY_PATH}
                '''
            }
        }
    }

    post {
        failure {
            echo 'Deployment failed!'
        }
        success {
            echo 'Deployment successful!'
        }
    }
}
