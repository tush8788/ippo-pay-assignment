const passport=require('passport');
const localStretegy=require('passport-local').Strategy;
const CustomerDB=require('../models/customer');
const EmployeeDB=require('../models/employee');

passport.use(new localStretegy({
    usernameField:"email",
    passReqToCallback:true
},async function(req,email,password,done){
    // console.log(email," ",password," ",req.body);
    try{
        //for employee
        let user;
        if(req.body.isEmployee=='true'){
            user=await EmployeeDB.findOne({email:email});
        }
        else{
            user=await CustomerDB.findOne({email:email});
        }

        // console.log(user)

        // console.log(password)

        if(!user || user.password != password){
            console.log('username or password not match');
            return done(null,false);
        }

        return done(null,user);
    }
    catch(err){
        console.log(err);
        done(err);
    }
}))

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser(async(id,done)=>{
    try{
        let user=await CustomerDB.findById(id);
        if(!user){
            user=await EmployeeDB.findById(id);
        }

        return done(null,user);
    }
    catch(err){
        console.log(err);
        return done(err);
    }
})

passport.checkAuthentication=(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect("back");
}

passport.setAuthenticationUser=(req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;