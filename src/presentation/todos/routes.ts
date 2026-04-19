import { Router } from "express";
import { TodoController } from "./controller";
import {Request, Response} from 'express'

//* Rutas solo Todos
export class TodoRoutes {

    static get routes(): Router {
        
        const router = Router();
        const todoController = new TodoController();
        
        //router.get('/api/todos',(req, res)=>todoController.getTodos(req,res))
        // Se envia solo la referencia
        router.get('/', todoController.getTodos);  
        router.get('/:id', todoController.getTodosById);
        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodo);

        return router;
    }
}