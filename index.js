const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost:27017/car_buy",(error)=>{
    if(!error)
    {
        console.log("sucess")
    }
    else{
        console.log("fail");
    }
})
const express=require("express")
const app=express();
const hbs=require("hbs");
const path=require('path');

const multer=require('multer')

const storage=multer.diskStorage({
    destination:function(request,file,callback){
        callback(null,'./public/uplods/images')
    },


    filename:function(request,file,callback){
        callback(null,Date.now()+file.originalname);
    },
})


const upload=multer({
    storage:storage,
    limits:{
        fieldSize:1024*1024*3,
    }
}
)



const express_handler=require("express-handlebars");
const bodypar=require("body-parser");
app.use(bodypar.urlencoded({extended :true}));

app.set("views",path.join(__dirname,"/views/"));
const control=require("./modules")
const sold_detail=mongoose.model("solddetail");
const car_buyer=mongoose.model("carbuyer");
const car_sell=mongoose.model("carsell");
const admin=mongoose.model("admin");

app.set("view engine","hbs");
app.use("/carsell",(req,res)=>{
    res.render("carsell")
})

//app.use("/admin_log",(req,res)=>{
//admin.insertMany([{uname:"shashank",password:"shashank"},{uname:"vishwanath",password:"vishwa"},{uname:"bharath",password:"tpbarath"}])
//console.log("admin rached")
//})



app.use("/login",(req,res)=>{
    res.render("adminlogin")
})
app.post("/check",(req,res)=>{
   
    let data10=req.body
    let pass=data10.pass
    let uname=data10.text
    let c=1;
    admin.find((err,docs)=>{
        for(const data11 of docs)
        {
            c++;
            if(data11.uname==uname && data11.password==pass)
            {
                res.redirect("/solddetail")
                //res.send("<h1 welcome shashank</h1>")
                console.log(data11.uname+" "+data11.password)
                break;
            }
            if(c==3)
            {
                res.redirect("/carbuy")
            }

        }
       
    })
    
   
    

})


const pathers = require('path');

app.use(express.static(pathers.join(__dirname,'public')));


app.post("/del",(req,res)=>{

   res.render("delete")


})
app.post("/del2",(req,res)=>{
    let data2=req.body
    console.log(data2.text)
    sold_detail.remove({cid:data2.text}, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });
      car_sell.remove({cid:data2.text}, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });

      
    res.send("<center><h1 style=color:red;>CAR REMOVED</h1>")

})

app.use("/carbuy",(req,res)=>{

    car_sell.find((err,docs)=>{
        if(!err)
        {
        console.log("teneter display");
        //res.render("front");
        console.log(docs)
        res.render("buy",{data1:docs})
        }
        else
        {
            res.send("error");
        }
      });})
      app.post("/buy",(req,res)=>{
        res.render("buyer_details")
      })
      app.post("/buydetail",(req,res)=>{
        res.render("buyer_details")
      })





      app.post("/detailstore",(req,res)=>{
        var data5=req.body
        var c2=new car_buyer()
        c2.buyer_name=data5.bname
        c2.buyermail=data5.bmail
        c2.phno=data5.phno
        c2.address=data5.addr
        c2.address2=data5.addr2 
        c2.city=data5.city
        c2.pin=data5.pin
        c2.mode_of_payment=data5.mod
        c2.cid=data5.cid
        c2.save()
        var c3=new sold_detail()
        c3.buyer_name=data5.bname
        c3.buyermail=data5.bmail
        c3.phno=data5.phno
        c3.address=data5.addr
        c3.address2=data5.addr2 
        c3.city=data5.city
        c3.pin=data5.pin
        c3.mode_of_payment=data5.mod
        c3.cid=data5.cid
        var data9=car_sell.find({cid:data5.cid})
        c3.car_name=data9.cname
c3.make_year=data9.year
c3.price=data9.price
c3.reg_year=data9.reg
c3.fuel=data9.fuel
c3.km_driven=data9.kmd
c3.engine=data9.engine
c3.no_of_owners=data9.nfo
c3.rto=data9.rto
c3.insurance=data9.insu
c3.car_img=data9.cimage
c3.status=data9.status
c3.save()
        res.send("<h1 style=color:red; ><center>CONGRATULATIONS ON YOUR NEW CAR</center></h1>")
      })
      app.use("/solddetail",(req,res)=>{
        sold_detail.find((err,docs)=>{
            if(!err)
            {
            console.log("teneter display");
            //res.render("front");
            console.log(docs)
            res.render("solddetails",{data8:docs})
            }
            else
            {
                res.send("error");
            }
          });})
app.post("/sell",upload.single('cimage'),(req,res)=>{
    var data3=req.body
    var c1=new car_sell();
c1.car_name=data3.cname
c1.make_year=data3.year
c1.price=data3.price
c1.reg_year=data3.reg
c1.fuel=data3.fuel
c1.km_driven=data3.kmd
c1.engine=data3.engine
c1.no_of_owners=data3.nfo
c1.rto=data3.rto
c1.insurance=data3.insu
c1.car_img=req.file.filename
c1.status=data3.status
c1.cid=data3.cid
c1.save();
console.log("created");
    res.render("home");1
})
app.use("/",(req,res)=>{
    console.log("reached")
    res.render("home")
})
app.listen("4000",()=>{
    console.log("server started");
})
const carbuy=require("./modules");