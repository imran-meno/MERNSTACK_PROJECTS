const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/todoschema')

const ToDoSchema=mongoose.Schema({
    todo:String,
   completed: {
  type: Boolean,
  default: false
}

})
module.exports = mongoose.model('Todo', ToDoSchema);
