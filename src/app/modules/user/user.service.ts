import { TOrder, TUser } from './user.interface';
import { User } from './user.model';
//will make all services here
const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }

  const result = await User.create(userData);
  const { password, ...resultWithOutPassword } = result.toObject();

  return resultWithOutPassword;
};

const getAllUsersFromDB = async () => {
  const result = await User.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 },
  );
  return result;
};

const getSingleUsersFromDB = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found!');
  }
  const result = await User.findOne(
    { userId: userId },
    {
      userId: 1,
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      isActive: 1,
      hobbies: 1,
      address: 1,
      _id: 0,
    },
  );
  return result;
};

const updateUserInfoFromDB = async (userId: number, userData: TUser) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found!');
  }

  const encryptedPassword = await User.passwordEncryption(userData.password);
  userData.password = encryptedPassword;

  const result = await User.updateOne(
    { userId: userId },
    {
      ...userData,
    },
  );
  return result;
};

const deleteUserFromDB = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found!');
  }
  const result = await User.deleteOne({ userId: userId });
  return result;
};

//orders
const addNewProductOrderIntoDB = async (
  userId: number,
  productData: TOrder,
) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found!');
  }

  const result = await User.updateOne(
    { userId: userId },
    {
      $push: {
        orders: { ...productData },
      },
    },
  );

  return result;
};

const getSingleUserOrdersFromDB = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found!');
  }
  const result = await User.findOne(
    { userId: userId },
    {
      orders: 1,
      _id: 0,
    },
  );
  return result;
};

const getSingleUserOrdersTotalPriceFromDB = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found!');
  }
  const result = await User.aggregate([
    {
      $match: {
        userId: userId,
      },
    },
    {
      $unwind: '$orders',
    },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalPrice: 1,
      },
    },
  ]);

  return result[0];
};




export const UserService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUsersFromDB,
  deleteUserFromDB,
  addNewProductOrderIntoDB,
  getSingleUserOrdersFromDB,
  getSingleUserOrdersTotalPriceFromDB,
  updateUserInfoFromDB,
};