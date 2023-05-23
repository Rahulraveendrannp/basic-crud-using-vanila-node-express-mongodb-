const fs = require('fs');
const file="./data.json";
const fileContents = fs.readFileSync(file,'utf-8');
const data = JSON.parse(fileContents);

class Controller {
    
    async getTodos() {
        
        return new Promise((resolve, _) => resolve(data));
    }

    
    async getTodo(id) {
        return new Promise((resolve, reject) => {
            
            let todo = data.find((todo) => todo.id === parseInt(id));
            if (todo) {
                
                resolve(todo);
            } else {  
                reject(`Todo with id ${id} not found `);
            }
        });
    }

   
    async createTodo(todo) {
        return new Promise((resolve, _) => {
           
            let newTodo = {
                id: data.length+1,
                ...todo,
            };
            console.log(newTodo);
            data.push(newTodo);
      fs.writeFileSync(file,JSON.stringify(data));
            resolve(newTodo);
        });
    }

    async updateTodo(id) {
        return new Promise((resolve, reject) => {
            let todo = data.find((todo) => todo.id === parseInt(id));
            if (!todo) {
                reject(`No todo with id ${id} found`);
            }
            else{

                
                data[id-1].completed=true;
                resolve(data);
            }
            
        });
    }


    async deleteTodo(id) {
        return new Promise((resolve, reject) => {
            let todo = data.find((todo) => todo.id === parseInt(id));
            if (!todo) {
                reject(`No todo with id ${id} found`);
            }
            else{
                let index=parseInt(id)-1;
              data.splice(index,1)
              fs.writeFileSync(file,JSON.stringify(data));
              resolve(data)
            }
            
        });
    }
}
module.exports = Controller;