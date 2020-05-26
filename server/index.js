const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const readFile = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, contents) => {
    if (err) return reject(err)
    resolve(contents)
  })
})

const writeFile = (path, contents) => new Promise((resolve, reject) => {
  fs.writeFile(path, contents, 'utf8', (err) => {
    if (err) return reject(err)
    resolve()
  })
})

app.use(cors())
app.use(express.json())

const todosPath = path.resolve(__dirname, '../todos.json')

app.post('/todos/update', async (req, res) => {
  await writeFile(todosPath, JSON.stringify(req.body.todos, null, 2))
  res.send("todos")
})

app.get('/todos/update', async (req, res) => {
  const todos = JSON.parse(await readFile(todosPath))
  res.send({ todos })
})

app.listen(3000, () => { console.log('server listening on port 3000') })