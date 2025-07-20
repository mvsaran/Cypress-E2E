pipeline {
    agent any

    tools {
        nodejs 'NodeJS_20'      // ✅ Match your Jenkins NodeJS tool name exactly
        allure 'allure'    // ✅ Match your Jenkins Allure Commandline tool name exactly
    }

    stages {

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                bat 'npm ci'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo '🚀 Running Cypress tests with Allure...'
                bat 'npx cypress run --env allure=true'
            }
        }

        stage('Generate Allure Report') {
            steps {
                echo '📝 Generating Allure report...'
                bat 'npx allure generate allure-results --clean -o allure-report'
            }
        }

        stage('Publish Allure Report') {
            steps {
                echo '📊 Publishing Allure report to Jenkins...'
                allure includeProperties: false,
                       jdk: '',
                       results: [[path: 'allure-results']]
            }
        }
    }

    post {
        always {
            echo '✅ Pipeline completed.'
        }
    }
}
