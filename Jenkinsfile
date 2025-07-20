pipeline {
  agent any

  environment {
    CYPRESS_baseUrl = "https://www.saucedemo.com/"
  }

  stages {

    stage('Install Dependencies') {
      steps {
        echo "📦 Installing dependencies..."
        bat 'npm ci'
      }
    }

    stage('Run Cypress Tests') {
      steps {
        echo "🚀 Running Cypress tests with Mochawesome Reporter..."
        bat 'npx cypress run --reporter cypress-mochawesome-reporter'
      }
    }

    stage('Verify Reports') {
      steps {
        echo "🔍 Verifying that JSON reports exist..."
        bat 'dir cypress\\reports\\html\\.jsons'
      }
    }

    stage('Merge Reports') {
      steps {
        echo "🔗 Merging Mochawesome JSON files..."
        bat 'if not exist cypress\\reports\\mochawesome mkdir cypress\\reports\\mochawesome'
        bat 'npx mochawesome-merge cypress/reports/html/.jsons/*.json > cypress/reports/mochawesome/mochawesome.json'
      }
    }

    stage('Generate HTML Report') {
      steps {
        echo "📝 Generating HTML report from merged JSON..."
        bat 'npx marge cypress/reports/mochawesome/mochawesome.json --reportDir cypress/reports/mochawesome --inline'
      }
    }

    stage('Archive Report') {
      steps {
        echo "📂 Archiving the HTML report..."
        archiveArtifacts artifacts: 'cypress/reports/mochawesome/*.html', allowEmptyArchive: false
      }
    }

  }

  post {
    always {
      echo "✅ Pipeline completed (always block)."
    }
    success {
      echo "🎉 Pipeline succeeded!"
    }
    failure {
      echo "❌ Pipeline failed. Please check logs."
    }
  }
}
