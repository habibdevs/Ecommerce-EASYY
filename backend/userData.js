import bcrypt from 'bcryptjs'
let userData =[
    {
        name:"Habib",
        email:"hrshorif@gmail.com",
        password:bcrypt.hashSync("12121212"),
        isAdmin:true
    },
    {
        name:"Shaon",
        email:"shaon@gmail.com",
        password:bcrypt.hashSync("12121212"),
        isAdmin:false
    },
]

export default userData