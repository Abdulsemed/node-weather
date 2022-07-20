const path = require("path")
const express =require('express');
const hbs = require("hbs");
const forecast=require("./utils/forecast");
const geocode=require("./utils/geocode");

console.log(__dirname);
console.log(path.join(__dirname,'../public'));

const app = express();
const publicPath=path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const port = process.env.PORT|| 3000

hbs.registerPartials(partialsPath);
app.set("view engine","hbs")
app.set("views",viewsPath)
app.use(express.static(publicPath));

app.get('',(req,resp)=>{
    resp.render("index",{
        title:"weather app",
        name:"bebe"
    })
})
app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About page",
        name:"bebe"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        message:"what can i help",
        name:"bebe"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"address is not provided"
        })
    }
    console.log(req.query.address);
    geocode(req.query.address,(error,{latitude,longitude,label:location}={})=>{
        if(error){
            return res.send({error})
        }else{
            forecast(latitude,longitude,(error,forcastRes)=>{
                if(error){
                    return res.send({
                        error:err
                    })
                }else{
                    res.send({
                        forecast:forcastRes,
                        location,
                        address:req.query.address
                    })
                }
            })
            
        }
    })
   
})

app.get("/products",(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"Enter the keyword to search"
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})

app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"404 page",
        name:"bebe",
        errmessage:"Help text not found"
    });
})
app.get("*",(req,res)=>{
    res.render('404',{
        title:"404 page",
        name:"bebe",
        errmessage:"page not found"
    });
})
app.listen(port,()=>{
    console.log("server is up on "+port);
})

// app.get('/help',(req,resp)=>{
//     resp.send([{
//         name:"bebe",
//         age:21
//     },
//     {
//         name:"sarah",
//         age:22
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send("<h1>about page</h1>");
// })