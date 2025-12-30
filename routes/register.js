import express from 'express'
import { userLogin, userRegister } from '../Controllers/register.js'

userRegister
const router = express.Router()

// User Register ke liye 
router.post('/register', userRegister)

// User Login 
router.post('/login', userLogin)




export default router