const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const store = async (req,res)=>{
    const {username, password} = req.body;
    const found = await User.findOne({ username:username });
    if(found){
        return res.json({status:'username telah dipakai'})
    }
    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({
        username:username,
        password:hashed,
        role:'normal'
    })
    newUser.save((err,data)=>{
        if(err) res.send({status:err});
        res.json({
            status:'berhasil menambahkan user'
        })
    });

};

const login = async (req,res)=>{
    const {username, password} = req.body;
    User.findOne({username},(err,data)=>{
        if(err) res.json({status:err})
        // console.log(data); unutk mengecek data
        bcrypt.compare(password, data.password, (err,result)=>{
            if(!result){
                return res.json({status:'passwordnya salah'});
            }
            
            const token = jwt.sign({
                id:data._id, 
                username:data.username,
                role:data.role
            }, 'secret_key',{expiresIn:'1h'})
            return res.status(200).json({ data, token})
        })
    });
};




module.exports = {store, login};