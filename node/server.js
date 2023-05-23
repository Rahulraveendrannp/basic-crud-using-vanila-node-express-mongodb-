const http =require('http');
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended:true}))
const Todo = require("./controller");
const { getReqData } = require("./utils");
const fs=require('fs');

let html=fs.readFileSync('./index.html',"utf-8");
let proHtml=fs.readFileSync('./product.html',"utf-8");
let addHtml=fs.readFileSync('./add.html',"utf-8");
let updateHtml=fs.readFileSync('./update.html',"utf-8");


const PORT = process.env.PORT || 5000;
const server = http.createServer(async (req, res) => {

    if (req.url === "/api/todos" && req.method === "GET") {
   

        let todos = await new Todo().getTodos();
        

        let proHtmlArray=todos.map((prod)=>{
            let output=proHtml.replace('{{%Title%}}',prod.title);
            output=output.replace('{{%Description%}}',prod.description);
            output=output.replace('{{%Completion%}}',prod.completed);
            output=output.replace('{{%id%}}',prod.id);
            output=output.replace('{{%did%}}',prod.id);
            return output;
        })
      let finalOutputHtml=html.replace('{{%content%}}',proHtmlArray.join(''))
        // proHtmlArray=JSON.stringify(proHtmlArray)

        console.log(proHtmlArray.join(''));
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(finalOutputHtml); 
    }
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET") {
        try {
             const id = req.url.split("/")[3];
            const todo = await new Todo().getTodo(id);

            let output=updateHtml.replace('{{%Title%}}',todo.title);
            output=output.replace('{{%Description%}}',todo.description);
            output=output.replace('{{%Completion%}}',todo.completed);
            output=output.replace('{{%id%}}',todo.id);
            output=output.replace('{{%did%}}',todo.id);

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(output); 
            
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }

    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "DELETE") {
        try {
            const id = req.url.split("/")[3];
      
            let todos = await new Todo().deleteTodo(id);
           console.log(todos);
            let proHtmlArray=todos.map((prod)=>{
                let output=proHtml.replace('{{%Title%}}',prod.title);
                output=output.replace('{{%Description%}}',prod.description);
                output=output.replace('{{%Completion%}}',prod.completed);
                output=output.replace('{{%id%}}',prod.id);
                output=output.replace('{{%did%}}',prod.id);
                return output;
            })
          let finalOutputHtml=html.replace('{{%content%}}',proHtmlArray.join(''))
            
    
            console.log(finalOutputHtml);
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(finalOutputHtml);
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }

    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "PUT") {
        try {
            
            const id = req.url.split("/")[3];
            
            let todos = await new Todo().updateTodo(id);
            

            let proHtmlArray=todos.map((prod)=>{
                let output=proHtml.replace('{{%Title%}}',prod.title);
                output=output.replace('{{%Description%}}',prod.description);
                output=output.replace('{{%Completion%}}',prod.completed);
                output=output.replace('{{%id%}}',prod.id);
                output=output.replace('{{%did%}}',prod.id);
                return output;
            })
          let finalOutputHtml=html.replace('{{%content%}}',proHtmlArray.join(''))
            
    
            console.log(finalOutputHtml);
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(finalOutputHtml); 
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));  
        }
    }

    else if (req.url === "/api/todos/add" && req.method === "POST") {
     
        
        let todo_data = await getReqData(req);
       
        let todo = await new Todo().createTodo(todo_data);
           
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(addHtml); 
    }
    else if (req.url === "/api/todos/add" && req.method === "GET") {
    
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(addHtml); 
        
    }


    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});