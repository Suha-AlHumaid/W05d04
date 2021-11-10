const e = require("express");
const express = require("express");
const app = express();
// app.use(express.json())
const fs = require("fs");
const PORT = 5000;
app.use(express.json());
// const movies =[
//     { id:0 , name:"HI0", isFav: false, isDeleted:true},
//     { id:1 , name:"HI1", isFav: false, isDeleted:false},
//     { id:2 , name:"HI2", isFav: true, isDeleted:false},
//     { id:3 , name:"HI3", isFav: false, isDeleted:false},
//     { id:4 , name:"HI4", isFav: true, isDeleted:false}
// ]

//   write movies To File "data.json"
const writeToFile = (movies) => {
  fs.writeFile("./data.json", JSON.stringify(movies), () => {
    console.log("Added to file successfully");
  });
};

// Extra fs.appendFile( path, data[, options], callback )
// const appenedToFile = (elem) => {
//   fs.appendFile("./data.json", JSON.stringify(elem), () => {
//     console.log("Added to file successfully");
//   });
// };

//get all movies
app.get("/allMovies", (req, res) => {
  fs.readFile("./data.json", (err, data) => {
    const movies = JSON.parse(data.toString());
    res.status(200).json(movies);
  });
});

// 1: Get All Movies = isDEleted = false
app.get("/movies", (req, res) => {
  fs.readFile("./data.json", function (err, data) {
    const movies = JSON.parse(data.toString());
    const found = movies.filter((elem) => elem.isDeleted === false);
    res.status(200).json(found);
  });
});

// 2: Search by id
app.get("/searchById/:id", (req, res) => {
  fs.readFile("./data.json", function (err, data) {
    const movies = JSON.parse(data.toString());
    const { id } = req.params;
    const arr = movies.find((elem) => elem.id == id);

    if (arr) {
      res.status(200).json(arr);
    } else {
      res.status(404).json("Task is not found");
    }
  });
});

// 3: Create new movie
// app.post("/create", (req, res) => {
//   fs.readFile("./data.json", function (err, data) {
//     const movies = JSON.parse(data.toString());
//     const { name, isFav, isDeleted } = req.body;
//     const newId = movies.length - 1;
//     const newtask = { newId, name, isFav, isDeleted };
//     movies.push(newtask);
//     writeToFile(movies);
//     res.status(201).json(newtask);
//   });
// });

app.post("/create", (req, res) => {
  fs.readFile("./data.json", function (err, data) {
    const movies = JSON.parse(data.toString());
    const { name, isFav, isDeleted } = req.body;
    const newId = movies.length - 1;
    const newtask = { newId, name, isFav, isDeleted };
    movies.push(newtask);
    appenedToFile(newtask);
    res.status(201).json(newtask);
  });
});

// 4: Update movie by id
app.put("/updateByID/:id", (req, res) => {
  fs.readFile("./data.json", function (err, data) {
    const movies = JSON.parse(data.toString());
    const id = req.params.id;
    const { name } = req.body;
    console.log(name);
    movies.forEach((elem) => {
      if (elem.id === Number(id)) {
        elem.name = name;
      }
    });
  });
  res.status(200).json(movies);
  writeToFile(movies);
});

// 5: Soft deleted movie by id
app.put("/softDeleteByID/:id", (req, res) => {
  fs.readFile("./data.json", function (err, data) {
    const movies = JSON.parse(data.toString());
    const { id } = req.params;
    movies.forEach((elem) => {
      if (elem.id == Number(id)) {
        elem.isDeleted = true;

        console.log(movies);
      }
    });
    writeToFile(movies);
    res.status(200).json(movies);
  });
});

// 6: Get All Movies = isFav = false
app.get("/favorite", (req, res) => {
  fs.readFile("./data.json", function (err, data) {
    const movies = JSON.parse(data.toString());
    const found = movies.filter((elem) => elem.isFav === true);
    if (found) {
      res.status(200).json(found);
    }
  });
});

// 7: Data from file & write to file
////////////////////////////////////////////////////
app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
