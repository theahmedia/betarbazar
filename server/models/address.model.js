import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
    address_line : {
        type : String,
        default : ""
    },
    city : {
        type : String,
        default : ""
    },
    postcode : {
        type : Number,
        default : null
    },
    phone : {
        type : Number,
        default: null
    },
    status : {
        type : Boolean,
        default : true
    }
}, {
    timestamps : true
})

const AddressModel = mongoose.model("address", addressSchema)


export default AddressModel