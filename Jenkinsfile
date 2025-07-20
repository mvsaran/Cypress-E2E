pipeline {
  agent any

  stages {
    stage('Install Dependencies') {
      steps {
        echo '📦 Installing Node dependencies...'
        bat 'npm ci'
      }
    }

    stage('Run Cypress Tests') {
      steps {
        echo '🚀 Running Cypress tests...'
        bat 'npx cypress run'
      }
    }

    stage('Verify JSON Reports') {
      steps {
        echo '🔍 Verifying that JSON reports exist...'
        bat 'dir cypress\\reports\\mochawesome\\json'
      }
    }

    stage('Merge Mochawesome JSON Reports') {
      steps {
        echo '🔗 Merging JSON reports into mochawesome.json...'
        bat '''
          if not exist cypress\\reports\\mochawesome mkdir cypress\\reports\\mochawesome
          npx mochawesome-merge cypress\\reports\\mochawesome\\json\\*.json > cypress\\reports\\mochawesome\\mochawesome.json
        '''
      }
    }

    stage('Generate HTML Report') {
      steps {
        echo '📝 Generating final HTML report from mochawesome.json...'
        bat 'npx marge cypress\\reports\\mochawesome\\mochawesome.json --reportDir=cypress\\reports\\mochawesome\\html'
      }
    }

    stage('Archive HTML Report') {
      steps {
        echo '📂 Archiving HTML report for download...'
        archiveArtifacts artifacts: 'cypress/reports/mochawesome/html/**', allowEmptyArchive: false
      }
    }
  }

  post {
    always {
      echo '✅ Pipeline completed (always block).'
    }
    success {
      echo '🎉 Pipeline succeeded!'
    }
    failure {
      echo '❌ Pipeline failed. Please check the logs!'
    }
  }
}
