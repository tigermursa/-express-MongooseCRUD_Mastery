import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
//users here
router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getSingleUser);
router.put('/:userId', UserController.updateUserInfo);

router.delete('/:userId', UserController.deleteUser);
//orders
router.put('/:userId/orders', UserController.addNewProductOrder);
router.get('/:userId/orders', UserController.getSingleUserOrders)
router.get('/:userId/orders/total-price',UserController.getSingleUserOrdersTotalPrice)
export default router;