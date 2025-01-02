import sendEmail from '../config/sendEmail.js'
import UserModel from '../models/user.model.js'
// import verifyEmailTemplate from '../utils/verifyEmailTemplate.js'
import bcryptjs from 'bcryptjs'
import generateAccessToken from '../utils/generateAccessToken.js'
import generateRefreshToken from '../utils/generateRefreshToken.js'

export async function registerUserController(req, res) {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Provide email, name, password",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email })

        if (user) {
            return res.json({
                message: "Already registered email",
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const payload = {
            name,
            email,
            password: hashPassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const verifyEmailTemplate = ({ name, url }) => `
            <h1>Hello ${name}</h1>
            <p>Please verify your email by clicking the link below:</p>
            <a href="${url}">Verify Email</a>
        `;

        // const VerifyEmailUrl = `http://example.com/verify-email?token=${newUser._id}`

        const VerifyEmailUrl = `$(process.env.FRONTEND_URL)/verify-email?code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify email from Betarbazar",
            html: verifyEmailTemplate({
                name,
                url: VerifyEmailUrl
            })
        })

        return res.status(201).json({
            message: "User registered successfully",
            error: false,
            success: true,
            data : save
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: true,
            success: false
        })
    }
}

export async function verifyEmailController(req, res) {
    try {
        const { code } = req.query

        // if (!code) {
        //     return res.status(400).json({
        //         message: "Provide code",
        //         error: true,
        //         success: false
        //     })
        // }

        const user = await UserModel.findById(code)

        if (!user) {
            return res.status(400).json({
                message: "Invalid code",
                error: true,
                success: false
            })
        }

        const updateUser = await UserModel.updateOne({ _id: code }, { verify_email : true })

        return res.status(200).json({
            message: "Email verified successfully",
            error: false,
            success: true
        })

        user.isVerified = true
        await user.save()

        return res.status(200).json({
            message: "Email verified successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: true,
            success: false
        })
    }
}

//Login Controller
export async function loginController(req, res) {
    try {
        const { email, password } = req.body

        const user = await UserModel.findOne({ email })

        if(!user){
            return res.status(404).json({
                message: "User not registered",
                error: true,
                success: false
            })
        }

       if(user.status !== 'Active'){
        return res.status(404).json({
            message: "User not active",
            error: true,
            success: false
        })  
       }

       const checkPassword = await bcryptjs.compare(password, user.password)

       if(!checkPassword){
        return res.status(404).json({
            message: "Password not matched",
            error: true,
            success: false
        })  
       }

       const accesstoken = await generateAccessToken(user._id)
       const refreshToken = await generateRefreshToken(user._id)

       res.cookie('refreshtoken', refreshToken, {
           httpOnly: true})

    } catch (error) {
        
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//Logout Controller
export async function logoutController(req, res) {}