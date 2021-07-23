module.exports = (app) => {

    app.get('/', (req, res) => 
        res.render('index')
    )
    app.get('/singleQuote', (req, res) => 
        res.render('single-quote')
    )
    app.get('/singleQuote', (req, res) => 
        res.render('index')
    )
    
}