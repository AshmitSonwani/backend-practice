import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import jwt from "jsonwebtoken"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import mongoose from "mongoose"
import { User } from "../models/user.models.js"

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        
        user.refreshToken = refreshToken

        await user.save({validateBeforeSave:false})
        
        return {accessToken, generateRefreshToken}

    } catch (error) {
        throw new apiError(500, "Something went wrong while generating access and refresh token ")
    }
}

const registerUser= asyncHandler (async (req, res) => {
    // Get user details from frontend
    // validation - not empty
    // Check user exists or not: email, username
    // check for images and avatar
    // upload them to cloudinary , avatar 
    // create user object , create entry in database
    // rmove password and refreshtoken from the response
    // check for user creation
    // return response

    const {fullname, username , email , password} = req.body

    if (
        [fullname,username, email, password].some((field) => field?.trim() === "")
    ){
        throw new apiError(400, "All entries are required")
    }

    const existedUser= await User.findOne({
        $or: [{username},{email}]
    })

    if (existedUser){
        throw new apiError(409, "User already existed")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;

    let coverImageLocalPath;

    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if(!avatarLocalPath){
        throw new apiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new apiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || '',
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-refreshToken -password"
    )

    // if(!coverImage){
    //     throw new apiError(400, "Cover Image file is required")
    // }

    if(!createdUser){
        throw new apiError(500, "Some error occured while registering the user")
    }

    return res.status(201).json(
        new apiResponse(200, createdUser, "User Registered succesfully")
    )

})

export {registerUser}