// dependências
/* 
npm install init
npm install express
npm install ejs
npm install nodemon
npm install pg
npm install express-session
*/

const app = require('./config/server')

// Importação do Mockup
// const noticias = require('./mockup')
const db = require('./config/dbConnection')

// Definindo a porta da aplicação
const port = process.env.PORT || 3000 

// Rota responsável pela página inicial
app.get('/', async (req, res) => {

    // Deburar os IDS de sessão
    // console.log(req.session.id)

    // Consulta SQL
    var result = await db.query('SELECT * FROM noticias ORDER BY id_noticia DESC LIMIT 3')

    // Passando dados para o template
    res.render('home/index', {noticias: result.rows, title: 'Home'})
})

// Rota resposável pelo recurso notícia
app.get('/noticia', async (req, res) => {
    // recupera id noticia por get
    var id = req.query.id

    let result = await db.query('SELECT * FROM noticias WHERE id_noticia = $1', [id])
    //console.log(result.rows)
    res.render('noticias/noticia', {noticia : result.rows[0], title: 'Notícia'})

})

// Rota responsável pelo recurso /noticias
app.get('/noticias', async (req, res) => {

    var result = await db.query('SELECT * FROM noticias ORDER BY id_noticia DESC')
    res.render('noticias/noticias', {noticias : result.rows, title: 'Notícias'})
    
})

// Rota responsável pelo recurso /admin
app.get('/admin', (req, res) => {

    if (req.session.autorizado) {
        res.render('admin/form_add_noticia', {title: 'Admin', autorizado: req.session.autorizado})
    } else {
        res.render('admin/login', {title: 'Login'})
    }
})

// Rota responsável por salvar as noticias
app.post('/admin/salvar-noticia', async (req, res) => {
    // recupera informações passadas por POST
    let { titulo, conteudo } = req.body

    //console.log(noticia)
    await db.query('INSERT INTO noticias(titulo, conteudo) VALUES($1, $2)', [titulo, conteudo], (err, result) => {
        res.redirect('/noticias')
    })

})

// Rota responsável por autenticar o usuário
app.post('/admin/autenticar', (req, res) => {
    // recupera informações passadas por POST
    const {usuario, senha} = req.body

    if (usuario === 'root' && senha === 'cellep1234') {
        req.session.autorizado = true
    }
    
    res.redirect('/admin')

})

// Rota responsável pela saida do usuário
app.get('/admin/sair', (req, res) => {

    req.session.destroy((err) => {})
    res.redirect('/admin')

})

app.listen(port, () => {
    console.log('Servidor rodando com Express')
})