// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     phone: { type: String, required: true, unique: true },
//     email: { 
//       type: String, 
//       unique: true, 
//       sparse: true,
//       default: null,
//       validate: {
//         validator: function(v) {
//           return v === null || v.length > 0;
//         },
//         message: 'Email cannot be an empty string'
//       }
//     },
//     password: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("User", userSchema);
import mongoose from "mongoose";
import pkg from "validator";
import bcrypt from "bcryptjs";  

const { trim } = pkg;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 50, trim: true },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /^\d{11}$/.test(value); // Ensures exactly 11 digits
        },
        message: "Phone number must be exactly 11 digits",
      },
    },
    photo: { type: String, default: "default-profile.png" }, // Use a default image instead of null
    email: {
      type: String,
      unique: true,
      sparse: true, 
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return !value || pkg.isEmail(value); // Validate only if provided
        },
        message: "Invalid email format",
      },
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "editor", "customer"],
      default: "customer",
    },
    deliveryLocation: { type: String, required: false }, // ✅ Optional in backend
    invoices: { type: [String], default: [] }, // Store invoice URLs
  },
  { timestamps: true }
);

// ✅ Fix: Prevent Double Hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Hash only when modified
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// ✅ Fix: Secure Password Comparison
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// const User = mongoose.model("User", userSchema);
// export default User;
export default mongoose.model("User", userSchema);

