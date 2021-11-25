const express = require('express')
const session = require('express-session')

// Setup
const app = express()

// Configuração do jsonparse e bodyparse
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Configuração EJS
app.set('view engine', 'ejs')
// definindo o caminho da views ejs
app.set('views', './app/views')

// Configuração arquivos estáticos
app.use(express.static('./app/public'))

// Configuração express-session
// https://passwordsgenerator.net/pt/
app.use(session({
    secret: '58.$ZnarQS=STD5z', // chave de seguraçã usada na assinatura dos identificadores de sessão (o ID é armazenado em um cookie e também na memória do servidor)
    resave: false,              // Otimiza para que a sessão não seja salva novamente a cada requisição  
    saveUninitialized: false    // Otimiza o uso do armazenamento no servidor, evitando armazenar sessões não inicializadas
}))

module.exports = app