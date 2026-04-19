import {Request, Response} from 'express'

//* 

const todos = [
  { id: 1, text: 'buy milk', completedAt: new Date() },
  { id: 2, text: 'buy apple', completedAt: null      },
  { id: 3, text: 'buy pan', completedAt: new Date()  },
]

export class TodoController {

    //* No es estatico Porque vamos a inyectar
    //* repositorio implementar casos de usos

    public  getTodos = (req:Request, res:Response) => {
       return res.json(todos);       
    }

    public getTodosById = (req:Request, res:Response) => {
        const  id  = +req.params.id; // + convierte el srting en numero        
        const todo = todos.find(todo => todo.id === id );

        ( todo ) //* Ternario
           ? res.json(todo)
           : res.status(404).json({error : `TODO with id ${id} not found`})
    }    


    public  createTodo = (req:Request, res:Response) => {
       
        // Hay que decirle al POST como quiero la serializacion
        // como va a venir la info. es la que espero
        const { text } = req.body;

        console.log(req.body)

        // Si el texto no viene 
        if( !text )  res.status(400).json({error : `text property is requiered!`})
        
        const newTodo =  {
            id: todos.length + 1,
            text : text, 
            completedAt : null
        }
        todos.push(newTodo)
        res.json( newTodo );       
    }    

    public updateTodo = (req:Request, res:Response) => {

        console.log('public updateTodo')

        const id = +req.params.id // convertir id en numero        
        if(isNaN(id)) return res.status(400).json({error : `ID argument is not number !`});

        const todo = todos.find(todo => todo.id === id );  
        
        if(!todo) return res.status(404).json({error : `Todo with id ${id} not found!`});

        const { text, completedAt } = req.body;
        
        //if(!text) return res.status(400).json({error : `Text property is required!`});
        //* todo text va hacer igual al texto siempre y cuando vengaun valor
        //* de lo contrario todo text va hacer igual a rq.body
        todo.text = text || req.body;        

        ( completedAt === 'null')
        ? todo.completedAt = null
        : todo.completedAt = new Date(completedAt || todo.completedAt)

        
        // //! pasa por referncia
        // todos.forEach((todo, index) => {
        //     if (todo.id===id){
        //         todos[index] = todo;
        //     }            
        // });

        todo.text = text;
        return res.status(200).json(todo);    

    }

    public deleteTodo = (req:Request, res:Response) => {

        const id = +req.params.id // convertir id en numero        
        
        if( todos.length === 0 ) return res.status(400).json({error : `Array is Empty !`});

        if(isNaN(id)) return res.status(400).json({error : `ID argument is not number !`});
        
        const todo = todos.find(todo => todo.id === id );          
        
        if(!todo) return res.status(404).json({error : `Todo with id ${id} not found!`});

       // Sobreescribimos el arreglo eliminando el objeto
       // todos = todos.filter(todo => todo.id !== id);

        todos.splice(todos.indexOf(todo),1);
        
        return res.status(200).json(todo);    
//        return res.status(200).json(`Todo with id ${id} has deleted!` );    


        
    }


}

//https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
// Informational responses (100 – 199)
// Successful responses (200 – 299)
// Redirection messages (300 – 399)
// Client error responses (400 – 499)
// Server error responses (500 – 599)