const DBConnection = require('../configs/DBConnection')
const jwt = require('jsonwebtoken')

const refreshToken = async(req,res) =>{
    try{
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) return res.sendStatus(401)
        const user = await DBConnection.findAll({
            where:{
                refresh_token: refreshToken
            }
        })
        if(!user[0]) return res.sendStatus(403)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded)=>{
            if(err) return res.sendStatus(403)
            const userId = user[0].id
            const fullName = user[0].fullname
            const email = user[0].email
            const accessToken = jwt.sign({userId, fullname, email}, process.env.ACCESS_TOKEN_SECRET)
                expiresIn: '15s'
        })
        res.json({accessToken})
    }
    catch(error){
        console.log(error)
    }
}