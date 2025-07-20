pipeline {
    agent any

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
                bat 'if not exist cypress\\reports\\mochawesome mkdir cypress\\reports\\mochawesome'
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
            echo '✅ Pipeline always block ran.'
        }
        success {
            echo '✅ Pipeline completed successfully.'
        }
        failure {
            echo '❌ Pipeline failed. Please check logs.'
        }
    }
}
