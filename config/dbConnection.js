const { Pool } = require('pg')

const client = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://etkuurukaacnff:dc066d59ad45e025d108787dd8e8b23988adbbd6aa2091b7e173256c05f65de8@ec2-23-21-4-7.compute-1.amazonaws.com:5432/d5vban95kvakth',
    ssl: {
        rejectUnauthorized: false
    }
})

// Teste de conexão
// async function connectTeste() {

//     const res = await client.query('SELECT $1::text as message', ['Olá Mundo'], (err, result) => {
//         console.log(result.rows[0].message)
//     })
    
// }
// connectTeste()

module.exports = client