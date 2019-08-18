
const express = require('express')
const multer  = require('multer')
const cors = require('cors')
const upload = multer({ dest: 'uploads/' })
const p = require('path')

const app = express()

// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By",' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });


app.get('/',(req,res) => {
  res.send('hello, this is a test')
})

app.options('/upload', cors())


// 单文件上传
// app.post('/upload', cors(), upload.single('file'), function (req, res, next) {
//   res.json({key: req.file.filename})
// })

// 多文件上传
app.post('/upload', cors(), upload.array('files', 12), function (req, res, next) {
  console.log(req.files)
  // res.json({key: req.file.filename})
  res.send(JSON.stringify(req.files.map((item) => item.filename)));
})


app.get('/preview/:key', cors(), function(req, res, next){
  res.sendFile(`uploads/${req.params.key}`, {
    root: __dirname,
    headers:{
      'Content-Type': 'image/jpeg',
    },
  }, (error)=>{
    if(error){
      res.status(404).send('Not found')
    }
  })
})
// Heroku的端口号是随机给的，因此我们不能直接写3000；
let port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
