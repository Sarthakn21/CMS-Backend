import User from "../models/user.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//function to register new user
//method : Post
//api-url: http://localhost:5000/api/users/register
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role)
      throw new ApiError(400, "All feilds are required for registering");

    const existingUser = await User.findOne({
      $and: [{ username }, { role }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = new User({ username, email, password, role });
    await user.save();

    const registeredUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!registeredUser) throw new ApiError(500, "Unable to register user");
    // res.status(201).json({ message: "User registered successfully", user });
    return res
      .status(201)
      .json(
        new ApiResponse(200, registeredUser, "User registered successfully")
      );
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
    next(error);
  }
};

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Unable to generate Access and refresh token");
  }
};

//function to login user and generate jwt tokens
//method : Post
//api-url: http://localhost:5000/api/users/login
const loginUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role)
      throw new ApiError(400, "All feilds are required");

    const user = await User.findOne({ username });

    // console.log("User Retrieved:", user);
    // Checking if the username exists
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    if (user.role !== role)
      throw new ApiError(404, "You are not assigned for this role");

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) throw new ApiError(409, "Incorrect Password");

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
      })
      .json(new ApiResponse(200, loggedInUser, "User Logged in successfully"));
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
};

//function to delete user by its id
//method : Delete
//api-url: http://localhost:5000/api/users/delete/:id
const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(404, "User not found");
      // res.status(404).json("user not found");
    }
    await user.deleteOne();

    res.status(200).json(new ApiResponse(200, "User deleted successfully"));
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password -refreshToken");

    res.status(200).json(new ApiResponse(200, users, "All user fetched"));
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
};
export { registerUser, loginUser, deleteById, getAllUser };