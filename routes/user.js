import express from 'express'
import { deleteUserDataById, getAllUserData, getSingleId, staffUser, updateUserById } from '../Controllers/user.js'
import { isAuthencated } from '../Middlewares/Auth.js'

const router = express.Router()
// Middleware token yehi check karega
// router.use(isAuthencated)

// Create user from route se 
router.post('/staff', staffUser)
// Gell all data
router.get('/all', getAllUserData)
// get single by id
router.get('/:id', getSingleId)
// user Update user data
router.put('/update/:id', updateUserById)
// Delete user id by data
router.delete('/delete/:id',deleteUserDataById)


export default router;
