pipeline {
  agent any
  stages {
    stage('Clone') {
      steps {
        git 'https://github.com/hvnhi/webapp-api.git'
        checkout([$class: 'GitSCM', branches: [[name: '*/dev']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/hvnhi/webapp-api.git']]])
      }
    }
    stage('Checkout') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: '*/dev']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/hvnhi/webapp-api.git']]])
      }
    }
  }
}