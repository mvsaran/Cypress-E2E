pipeline {
    agent any

    tools {
        nodejs "NodeJS_20"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

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
                bat 'mkdir cypress\\reports\\mochawesome'
                bat 'move cypress\\reports\\html\\.jsons\\mochawesome.json cypress\\reports\\mochawesome\\'
                bat 'npx mochawesome-merge cypress/reports/mochawesome/*.json > cypress/reports/mochawesome/mochawesome.json'
            }
        }

        stage('Generate HTML Report') {
            steps {
                bat 'npx marge cypress/reports/mochawesome/mochawesome.json -f mochawesome-report -o cypress/reports/mochawesome'
            }
        }

        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'cypress/reports/mochawesome/*.html', allowEmptyArchive: true
            }
        }
    }
}
