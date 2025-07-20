pipeline {
  agent any

  tools {
    nodejs 'NodeJS_20' // Replace with your NodeJS tool name in Jenkins Global Tools
  }

  environment {
    CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress"
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/mvsaran/Cypress-E2E.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Run Cypress Tests') {
      steps {
        sh 'npx cypress run'
      }
    }

    stage('Merge Mochawesome JSON') {
      steps {
        sh 'npx mochawesome-merge cypress/reports/mochawesome/*.json > cypress/reports/mochawesome/mochawesome.json'
      }
    }

    stage('Generate HTML Report') {
      steps {
        sh 'npx marge cypress/reports/mochawesome/mochawesome.json -f report -o cypress/reports/mochawesome'
      }
    }

    stage('Archive Reports') {
      steps {
        archiveArtifacts artifacts: 'cypress/reports/mochawesome/**', allowEmptyArchive: true
      }
    }
  }

  post {
    always {
      echo 'Pipeline finished.'
      publishHTML(target: [
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'cypress/reports/mochawesome',
        reportFiles: 'report.html',
        reportName: 'Mochawesome Report'
      ])
    }
  }
}
