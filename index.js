const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/clientes/edit/:id', (req, res) => {
    const id = req.params.id

    const query = `SELECT * FROM clientes WHERE ?? = ?`
    const data = ['id', id]

    pool.query(query, data, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        const cliente = data[0]

        res.render('editcliente', { cliente })
    })
})

app.get('/clientes/novo', (req, res) => {
    res.render('addcliente')
})

app.get('/clientes/:id', (req, res) => {
    const id = req.params.id

    const query = `SELECT * FROM clientes WHERE ?? = ?`
    const data = ['id', id]

    pool.query(query, data, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        const cliente = data[0]

        res.render('clienteinfo', { cliente })
    })
})

app.get('/clientes', (req, res) => {
    const query = "SELECT * FROM clientes"

    pool.query(query, (err, data) => {
        if (err) {
            console.log(err)
        }

        const clientes = data
        res.render('clientes', {clientes})
    })
})

app.get('/clientes/remove/:id', (req, res) => {
    const id = req.params.id

    const query = `DELETE FROM clientes WHERE ?? = ?`
    const data = ['id', id]
    
    pool.query(query, data, err => {
        if (err) {
            console.log(err)
            return
        }

        res.redirect('/clientes')

    })
})

app.post('/clientes/insert', (req, res) => {
    const name = req.body.name
    const address = req.body.address
    const email = req.body.email
    const tel = req.body.tel
    console.log(typeof(tel))
    console.log(tel)

    const query = `INSERT INTO clientes (??, ??, ??, ??) VALUES (?, ?, ?, ?)`
    const data = ['name', 'address', 'tel', 'email', name, address, tel, email]

    pool.query(query, data, err => {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/')
    })

})

app.post('/clientes/updatecliente', (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const address = req.body.address
    const email = req.body.email
    const tel = req.body.tel

    const query = `UPDATE clientes SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`
    const data = ['name', name, 'address', address, 'email', email, 'tel', tel, 'id', id]

    pool.query(query, data, err => {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/clientes')
    })

})

app.get('/', (req, res) => {
    res.render('home')
})


// server
app.listen(3000)