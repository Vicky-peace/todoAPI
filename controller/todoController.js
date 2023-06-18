import sql from 'mssql';
import config from '../db/config.js';

// get all todos

export const getTodos = async (req,res) =>{
    try{
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query('SELECT * FROM todoData');
        res.status(200).json(result.recordset);


    }catch (error){
         res.status(201).json({error: 'an error occurred'});
    }finally{
              sql.close();
    }
};

// Create a todo
// // Create a new todo
export const createTodo = async (req, res) => {
    try {
        const { description } = req.body;
        let pool = await sql.connect(config.sql);
         await pool.request()
            .input("description", sql.VarChar, description) // Insert the description into the SQL query
            .query("insert into todoData (description) values (@description)"); // Execute the SQL query
        res.status(201).json({ message: 'Todo created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the todo' });
    } finally {
        sql.close();   // Close the SQL connection
    }
};

// get a todos
// export const getTodos = async (req,res) =>{
//     res.send("Todo Created");
// }


//get all todo
export const getTodo = async (req,res) =>{
    try{
       
        const {id} = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
        .input("id", sql.Int, id)
        .query("SELECT * FROM todoData WHERE id = @id"); // Execute the SQL query

        !result.recordset[0] ? res.status(404).json({ message: 'Todo not found' })   :
        res.status(200).json(result.recordset[0]);
    }catch (error){
            res.status(500).json({error: 'An error occurred while retrieving the todo'});
    } finally{
        sql.close();
    }
}

// update a todo
export const updateTodo = async (req,res) =>{
    try{
         const {id} = req.params;
         const {description} = req.body;
         let pool = await sql.connect(config.sql);
         await pool.request()
         .input ('id', sql.Int, id)
         .input('description', sql.VarChar, description)
         .query("UPDATE todoData SET description = @description WHERE id = @id"); // Execute the SQL query

        res.status(200).json({ message: 'Todo updated successfully' });
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'An error occurred while updating the todo'});
    } finally{
        sql.close();
    }
}

// delete a todo
export const deleteTodo = async (req,res) =>{
    try{
         
        const {id} = req.params;
        let pool = await sql.connect(config.sql);
        await pool.request()
        .input('id', sql.Int, id)
        .query("DELETE FROM todoData WHERE id = @id"); // Execute the SQL
        res.status(200).json({ message: 'Todo deleted successfully' });
    }catch(error){
   res.status(500).json({error: 'An error occurred while deleting the todo'});
    }finally{
        sql.close();
    }
}