const {validationResult} = require('express-validator');
const {hasedPassword, createToken, comparePassword} = require('../servicies/authServicies');

const userModel = require('../models/User');



//@route POST /api/register
//@access public
//@description create user and return a token

module.exports.register = async (req, res) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
       const {name, email, password} = req.body;
       try{
        const emailExist = await userModel.findOne({email});

        
        if(!emailExist){
            //authServicies.js
           const hashed = await hasedPassword(password);
           const user = await userModel.create({
                name, 
                email,
                password: hashed
                
           });

           //authServicies.js   create token
           const token = createToken({id: user._id, name: user.name});
           return res.status(201).json({msg: 'your account has been created',
            token });
        }else{

            //email already taken
            return res.status(401).json({errors: [{msg: `${email} is already taken!!!`}]});
        }

       }catch(error){
        console.log(error.message);
        return res.status(500).json("server internal error");
       }
    }else{
        //validations failed
       return res.status(400).json({errors: errors.array()})
    }
}


//@route POST /api/login
//@access public
//@description login user and return a token

module.exports.login = async (req, res) => {
    const {email, password} = req.body;

    const errors = validationResult(req);

    if(errors.isEmpty()) {
        try{

            const user = await userModel.findOne({email});
            if (user){

                //authServicies.js
                //for compare password
                if(await comparePassword(password, user.password)){

                     
                    // authServicies.js  == get token
                    const token = createToken({id: user._id, name: user.name});
                    if(user.admin) {
                        return res.status(201). json({token, admin: true});
                    }else{
                        return res.status(201). json({token, admin: false});
                    }
                }else{
                    res.status(401).json({errors: [{msg: 'password not matched!!'}]})
                }

            }else{
                return res.status(401).json({errors: [{'msg':`${email} is not found` }]})
            }

        }catch(error) {
            console.log(error.message);
            return res.status(500).json('server internal error!!');
        }

    }else{
        //validation failed
        return res.status(401).json({errors: errors.array()});
    }


}
