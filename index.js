const express=require('express');
const app=express();
const path=require('path');
const{v4:uuid}=require('uuid')
const methodOverride=require('method-override');
app.use(methodOverride('_method'))

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.set('views',path.join(__dirname,'/views'));
app.use(express.static(__dirname+'/public'));
app.use(express.static(path.join(__dirname+'/public')));

let tasks=[
    {
        id:uuid(),
        task:'Get up early'
    },
    {
        id:uuid(),
        task:'Water the plants'
    },
    {
        id:uuid(),
        task:'Eat healthy foods'
    },
    {
        id:uuid(),
        task:'Exercise every day'
    }
]


app.get('/todolist',(req,res)=>{
    res.render('todolist',{tasks})
})

app.post('/todolist',(req,res)=>{
   console.log(req.body);
   const {task}=req.body;
   tasks.push({task,id:uuid()});
   res.render('todolist',{tasks})  
});

app.get('/todolist/:id',(req,res)=>{
    const{id}=req.params;
    const task=tasks.find(c=>c.id===id);
    res.render('show',{task})
})

app.patch('/todolist/:id',(req,res)=>{
    const{id}=req.params;
    const foundTask=tasks.find(c=>c.id===id);
    const newTask=req.body.updatedTask
    foundTask.task=newTask;
    res.redirect('/todolist')

})

app.delete('/todolist/:id',(req,res)=>{
    const{id}=req.params;
    tasks=tasks.filter(t=>t.id!==id)
    res.redirect('/todolist')
})


app.listen(3200,()=>{
    console.log("Listening on port 3200");
})