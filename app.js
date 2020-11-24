const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const dataMahasiswa = [
  {
    id: 1,
    name: "Andi",
    semester: 3,
    jurusan: "Teknik Sipil"
  },
  {
    id: 2,
    name: "Budi",
    semester: 5,
    jurusan: "Teknik Informatika"
  },
  {
    id: 3,
    name: "Cici",
    semester: 3,
    jurusan: "Teknik Sipil"
  },
  {
    id: 4,
    name: "Dedi",
    semester: 7,
    jurusan: "Teknik Mesin"
  },
  {
    id: 5,
    name: "Edo",
    semester: 1,
    jurusan: "Teknik Informatika"
  }
]

// Get
// Biasanya digunakan untuk get data
app.get("/mahasiswa", function(req, res){
  res.status(200).json({
    success: true,
    message: "Get mahasiswa succeed",
    error: "",
    result: dataMahasiswa
  })
})

// Post
// Biasanya digunakan untuk input data
app.post("/mahasiswa", function(req, res){
  const nama = req.body.nama
  const semester = req.body.semester
  const jurusan = req.body.jurusan

  if(nama){
    dataMahasiswa.push({
      nama: nama,
      semester: semester,
      jurusan: jurusan
    })

    res.status(200).json({
      success: true,
      message: "Post mahasiswa succeed",
      error: "",
      result: dataMahasiswa
    })
  }else{
    res.status(400).json({
      success: false,
      message: "Post mahasiswa failed",
      error: "Nama is required!",
      result: null
    })
  }
})

// PUT
// Biasanya digunakan untuk edit data
app.put("/mahasiswa", function(req, res){
  const id = req.body.id
  const nama = req.body.nama
  const semester = req.body.semester
  const jurusan = req.body.jurusan

  const indexData = dataMahasiswa.findIndex(function(data){
    return data.id === id
  })

  if(indexData === -1){
    // Artinya error / id nya ga ada di database
    res.status(400).json({
      success: false,
      message: "Put request is failed",
      error: "ID is not found!",
      result: null
    })
  } else {
    // Hapus data
    dataMahasiswa.splice(indexData, 1, {
      id: id,
      nama: nama,
      semester: semester,
      jurusan: jurusan
    })

    res.status(200).json({
      success: true,
      message: "Edit mahasiswa succeed",
      error: "",
      result: dataMahasiswa
    })
  }
})

// DELETE
// Biasanya digunakan untuk delete data
app.delete("/mahasiswa", function(req, res){
  const id = req.body.id

  console.log(typeof id)

  const indexData = dataMahasiswa.findIndex(function(data){
    return data.id === id
  })

  if(indexData === -1){
    // Artinya error / id nya ga ada di database
    res.status(400).json({
      success: false,
      message: "Delete request is failed",
      error: "ID is not found!",
      result: null
    })
  } else {
    // Hapus data
    dataMahasiswa.splice(indexData, 1)

    res.status(200).json({
      success: true,
      message: "Delete mahasiswa succeed",
      error: "",
      result: dataMahasiswa
    })
  }
})

// CRUD
// Create, Read, Update, Delete



app.listen(5000, function(){
  console.log("Server is listening on port 5000")
})