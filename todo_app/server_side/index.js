const express=require('express')
const todo_model=require('./models/todo')
const cors=require('cors')
const app=express()


app.use(express.json());
app.use(cors())




app.post('/add', async (req,res)=>{
    const task=req.body.todo
    try{
 await todo_model.create({
        todo:task
    })
      res.json({ message: 'Task added successfully' });
    }
   catch(err){
    console.error();
    
   }
})

app.get('/display', async (req,res)=>{

    try{
       todos= await todo_model.find()
      res.json(todos)
    }
    catch(err){
      console.log(err)
    }

})

app.delete('/delete/:id', async(req,res)=>{
  try{
 const id = req.params.id
  await todo_model.findByIdAndDelete(id);
  const todos=await todo_model.find()
  res.json(todos)
  }
 catch(err){
  console.log(err)
 }
})
app.listen(3000)
