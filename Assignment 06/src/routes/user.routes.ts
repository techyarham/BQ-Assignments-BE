import {getAllUsers,createUser,getUserById,updateUser, deleteUser, login}from '../controllers/user.controller'
import {Router} from 'express';
import { authenticate } from '../middlewares/authenticate';
const router = Router();
router.post("/login",login)
router.get("/",authenticate,getAllUsers);
router.post("/",createUser);
router.get("/:id",authenticate,getUserById);
router.put("/:id",authenticate,updateUser);
router.delete("/:id",authenticate,deleteUser);
export default router;
