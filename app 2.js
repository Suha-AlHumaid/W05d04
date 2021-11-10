
const express = require("express"); //to create express app
const app = express(); //envo express
const PORT = 5000; //set port best praktise in capital letter
app.use(express.json()) //Json data

const movies =[
    { id:0 , name:"HI0", isFav: false, isDeleted:false},
    { id:1 , name:"HI1", isFav: false, isDeleted:false},
    { id:2 , name:"HI2", isFav: false, isDeleted:false},
    { id:3 , name:"HI3", isFav: false, isDeleted:false},
    { id:4 , name:"HI4", isFav: false, isDeleted:false}
]
// 1: Get All Movies = isDEleted = false
app.get("/movies", (req, res) => {

    movies.forEach((elem)=>{
        if (elem.isDeleted === false)
        {
            res.status(200).json(elem)
        }
    }) 
    res.status(404).json("There is no data to show");
});

  // 2: Search by id
  app.get("/movieById/:id", (req, res) => {
    const { id } = req.query;
    const found = movies.find((elem) => {
      return elem.id === Number(id);
    });
    if (found) {
      res.status(200).json(found);
    } else {
      res.status(404).json("Task is not found");
    }
  });


// 3: Create new movie
app.post("/create", (req, res) => {
    const { name, isComplete ,id} = req.body;
    movies.push({ id ,name, isFav, isDeleted });
    res.status(201),
    res.json({ id ,name, isFav, isDeleted });
  });

  // 4: Update movie by id
app.put("/updateByID/:id/:name",(req,res)=>{
    const id = req.params.id;
    const name =req.params.name;
    movies.forEach((elem)=>{
        if(elem.id === Number(id)){
            elem.name =name
            res.status(200).json(movies);
        }
    })   
    res.status(404).json("Task is not found");
})
  // 5: Soft deleted movie by id
  app.put("/softDele/:name/:newName",(req,res)=>{
    const name =req.params.name;
    const newName = req.params.newName;
    toDos.forEach((elem)=>{
        if(elem.name === name){
            elem.name =newName 
        }
    })   
    res.status(200);
    res.json(toDos);
})


////////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`server is running ${PORT}`);
  });