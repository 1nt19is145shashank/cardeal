const mongoose=require('mongoose');
var solddetail=new mongoose.Schema({
    car_name:{
        type:String
        
    },
    make_year:{
        type:String
    },
    price:{
        type:String
    },
    reg_year:{
        type:String

    },
    fuel:{
        type:String
    },
    km_driven:{
        type:String
    },
    engine:{
        type:String

    },
    no_of_owners:{
        type:String
    },
    rto:{
        type:String
    },
    insurance:{
        type:String
    },
    car_img:{
        type:String
    },
    buyer_name:{
        type:String

    },
    buyermail:{
        type:String
    },
    phno:{
        type:String
    },
    address:{
        type:String

    },
    address2:{
        type:String
    },
    city:
    {
        type:String
    },
    pin:{
        type:String
    },
    mode_of_payment:{
        type:String
    },
    cid:{
        type:String
    }
});
var buyer_details=new mongoose.Schema({
    buyer_name:{
        type:String

    },
    buyermail:{
        type:String
    },
    phno:{
        type:String
    },
    address:{
        type:String

    },
    address2:{
        type:String
    },
    city:
    {
        type:String
    },
    pin:{
        type:String
    },
    mode_of_payment:{
        type:String
    },
    cid:{
        type:String
    }
});
var sell_schema=new mongoose.Schema({
    car_name:{
        type:String

    },
    make_year:{
        type:String
    },
    price:{
        type:String
    },
    reg_year:{
        type:String

    },
    fuel:{
        type:String
    },
    km_driven:{
        type:String
    },
    engine:{
        type:String

    },
    no_of_owners:{
        type:String
    },
    rto:{
        type:String
    },
    insurance:{
        type:String
    },
    car_img:{
        type:String
    },
    status:
    {
        type:String
    },
    cid:{
        type:String
    }
});
var admin_schema=new mongoose.Schema({
    uname:{
        type:String

    },
    password:{
        type:String
    }});

mongoose.model("solddetail",solddetail);
mongoose.model("carbuyer",buyer_details);
mongoose.model("carsell",sell_schema);
mongoose.model("admin",admin_schema);