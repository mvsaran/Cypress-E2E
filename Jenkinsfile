pipeline {
  agent any

  tools {
    nodejs 'NodeJS_20'
    allure 'allure'  // <- This must match your Jenkins Allure Commandline tool name!
  }

  stages {
    stage('Install Dependencies') {
      steps {
        echo '📦 Installing dependencies...'
        bat 'npm install'
      }
    }

    stage('Run Cypress Tests') {
      steps {
        echo '🚀 Running Cypress tests with Allure...'
        bat 'npx cypress run'
      }
    }

    stage('Generate Allure Report') {
      steps {
        echo '📝 Generating Allure report...'
        bat '''
          if not exist allure-report mkdir allure-report
          allure generate cypress\\reports\\allure-results -o allure-report --clean
        '''
      }
    }

    stage('Publish Allure Report in Jenkins') {
      steps {
        echo '📊 Publishing Allure report to Jenkins...'
        allure([
          includeProperties: false,
          jdk: '',
          results: [[path: 'cypress/reports/allure-results']],
          reportBuildPolicy: 'ALWAYS'
        ])
      }
    }
  }

  post {
    always {
      echo '✅ Pipeline completed.'
    }
    failure {
      echo '❌ Pipeline failed. Check logs!'
    }
  }
}
