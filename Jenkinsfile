pipeline {
  agent any

  tools {
    nodejs 'NodeJS_20' // Use the exact name configured in Jenkins: Manage Jenkins > Global Tool Configuration
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
        echo '📝 Generating final HTML report...'
        bat 'npx marge cypress\\reports\\mochawesome\\mochawesome.json --reportDir cypress\\reports\\mochawesome --reportFilename index.html'
      }
    }

    stage('Archive HTML Report') {
      steps {
        echo '📁 Archiving final HTML report...'
        archiveArtifacts artifacts: 'cypress/reports/mochawesome/index.html', allowEmptyArchive: false
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
