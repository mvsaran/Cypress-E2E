pipeline {
    agent any

    environment {
        // Example: set your environment variables here if needed
        CYPRESS_BASE_URL = 'https://www.saucedemo.com'
    }

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                bat 'npx cypress run'
            }
        }

        stage('Merge Mochawesome JSON') {
            steps {
                // Make sure output folder exists
                bat 'mkdir cypress\\reports\\mochawesome'
                // Merge all .json files from .jsons folder to single mochawesome.json
                bat 'npx mochawesome-merge cypress/reports/html/.jsons/*.json > cypress/reports/mochawesome/mochawesome.json'
            }
        }

        stage('Generate HTML Report') {
            steps {
                bat 'npx marge cypress/reports/mochawesome/mochawesome.json --reportDir cypress/reports/mochawesome'
            }
        }

        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'cypress/reports/mochawesome/**', fingerprint: true
            }
        }
    }

    post {
        always {
            junit '**/cypress/reports/mochawesome/*.xml'
        }
        success {
            echo '✅ Pipeline completed successfully.'
        }
        failure {
            echo '❌ Pipeline failed. Please check logs.'
        }
    }
}
