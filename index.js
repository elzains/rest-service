const express = require("express")
const app = express()
const port = 8000
const bodyParser = require("body-parser")
const db = require("./connection")
const response = require("./response")

app.set("view engine", "ejs")
app.set("views", "views")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  next();
});

app.get("/", (req, res) => {
  res.send('Landing Page Untuk Dokumentasi API')
})

// ENDPOINT FOR LIST
app.get("/list", (req, res) => {
  const sql = "SELECT * FROM list"
  db.query(sql, (err, fields) => {
    if (err) throw err
    response(200, fields, "success", res)
  })
})

// ENDPOINT DETAIL
app.get("/detail/:id", (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM list WHERE id = ${id}`
  db.query(sql, (err, fields) => {
    if (err) throw err
    response(200, fields, "success", res)
  })
})

// ENDPOINT DASHBOARD
db.connect((err) => {
  if (err) throw err

  // GET DATA
  app.get("/dashboard", (req, res) => {
    const sql = "SELECT * FROM list"
    db.query(sql, (err, result) => {
      const list = JSON.parse(JSON.stringify(result))
      res.render("dashboard", { list: list, title: "Selamat Datang di Backend Restozain" })
    })
  })

  // INSERT DATA
  app.post("/push", (req, res) => {
    const insertSql = `INSERT INTO list (name, description, picture, city, rating) VALUES ('${req.body.name}', '${req.body.description}', '${req.body.picture}', '${req.body.city}', '${req.body.rating}')`
    db.query(insertSql, (err, result) => {
      if (err) throw err
      res.redirect("/dashboard")
    })
  })
})

app.listen(port, () => {
  console.log(`Server Berjalan di Port ${port}`)
})
