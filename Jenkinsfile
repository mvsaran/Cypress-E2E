pipeline {
  agent any

  tools {
    nodejs 'NodeJS_20'  // adjust for your Node tool name in Jenkins
  }

  stages {
    stage('Install Dependencies') {
      steps {
        bat 'npm ci'
      }
    }

    stage('Run Cypress Tests') {
      steps {
        bat 'npx cypress run'
      }
    }

    stage('Verify JSON Reports') {
      steps {
        echo '🔍 Checking JSON output...'
        bat 'dir cypress\\reports\\mochawesome\\json'
      }
    }

    stage('Merge Mochawesome JSON Reports') {
      steps {
        echo '🔗 Merging JSON reports...'
        bat 'npx mochawesome-merge cypress\\reports\\mochawesome\\json\\*.json > cypress\\reports\\mochawesome\\mochawesome.json'
      }
    }

    stage('Generate HTML Report') {
      steps {
        echo '📊 Generating final HTML report...'
        bat 'npx marge cypress\\reports\\mochawesome\\mochawesome.json --reportDir cypress\\reports\\mochawesome\\html --reportFilename index.html'
      }
    }

    stage('Archive HTML Report') {
      steps {
        archiveArtifacts artifacts: 'cypress/reports/mochawesome/html/**', fingerprint: true
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
