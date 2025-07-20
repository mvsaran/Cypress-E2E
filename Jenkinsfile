pipeline {
  agent any

  tools {
    nodejs 'NodeJS_20' // your configured NodeJS tool name
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
        bat 'npx mochawesome-merge cypress/reports/mochawesome/*.json > cypress/reports/mochawesome/mochawesome.json'
      }
    }

    stage('Generate HTML Report') {
      steps {
        bat 'npx marge cypress/reports/mochawesome/mochawesome.json -f report -o cypress/reports/mochawesome'
      }
    }

    stage('Archive Reports') {
      steps {
        publishHTML([
          allowMissing: false,
          alwaysLinkToLastBuild: true,
          keepAll: true,
          reportDir: 'cypress/reports/mochawesome',
          reportFiles: 'report.html',
          reportName: 'Mochawesome Report'
        ])
      }
    }
  }
}
