const CustomerDB=require('../models/customer');

//sigin in page
module.exports.SignInPage=function(req,res){
    return res.render('customerSignin',{
        title:"Customer Signin"
    })
}

//new saving account page
module.exports.NewSavingAccount=function(req,res){
    return res.render('CustomerSavingAccount',{
        title:"New Account"
    })
}

//new test account page
module.exports.TestAccount=function(req,res){
    return res.render('CustomerTestAccount',{
        title:"New Account"
    })
}

//create saving account
module.exports.createSavingAccount=async function(req,res){
    // console.log(req.body);
    try{
        // password and confirm password not match
        if(req.body.password != req.body.confirmpassword){
            console.log("Password and confirm passwprd not Match");
            return res.redirect('back');
        }
        // find customer already exist in db
        let customer=await CustomerDB.findOne({email:req.body.email});
        // let customer=await CustomerDB.aggregate({ 
        //     "$match":{
        //         email:req.body.email
        //        }
        //     }
        //      );
        req.body.isSaving=true;
        console.log(req.body);

            if(!customer){
                let customer=await CustomerDB.create(req.body);
                console.log(customer);
                return res.redirect('/customer/signin');
            }
            else{
                console.log("Customer already exist");
            }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

//create test account
module.exports.createTestAccount=function(req,res){
    console.log(req.body);
    
}