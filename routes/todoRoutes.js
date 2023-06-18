import { getTodos,createTodo,getTodo,updateTodo,deleteTodo} from '../controller/todoController.js';


const todoRoutes = (app) =>{
  
    app.route('/todos')
    .get(getTodos)
    .post(createTodo);


     
    app.route('/todos/:id')
    .put(updateTodo)
    .get(getTodo)
    .delete(deleteTodo);


};


export default todoRoutes;