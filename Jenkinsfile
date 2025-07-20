pipeline {
  agent any

  tools {
    nodejs 'NodeJS_20'
  }

  stages {
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
        publishHTML([reportDir: 'cypress/reports/mochawesome', reportFiles: 'report.html', reportName: 'Mochawesome Report'])
      }
    }
  }
}
