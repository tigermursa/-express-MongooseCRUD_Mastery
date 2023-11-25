/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserService } from './user.service';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    //validating using zod
    const zodValidatedUserData = userValidationSchema.parse(userData);

    const result = await UserService.createUserIntoDB(zodValidatedUserData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getSingleUsersFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 404,
        description: error.message || 'Something went wrong',
      },
    });
  }
};

const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { userId } = req.params;

    //validating using zod
    const zodValidatedUserData = userValidationSchema.parse(userData);

    const result = await UserService.updateUserInfoFromDB(
      Number(userId),
      zodValidatedUserData,
    );

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.deleteUserFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 404,
        description: error.message || 'Something went wrong',
      },
    });
  }
};

const addNewProductOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const productData = req.body;
    const result = await UserService.addNewProductOrderIntoDB(
      Number(userId),
      productData,
    );

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 404,
        description: error.message || 'Something went wrong',
      },
    });
  }
};

const getSingleUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getSingleUserOrdersFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 404,
        description: error.message || 'Something went wrong',
      },
    });
  }
};

const getSingleUserOrdersTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getSingleUserOrdersTotalPriceFromDB(
      Number(userId),
    );

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result || { totalPrice: 0 },
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 404,
        description: error.message || 'Something went wrong',
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUserInfo,
  deleteUser,
  addNewProductOrder,
  getSingleUserOrders,
  getSingleUserOrdersTotalPrice,
};