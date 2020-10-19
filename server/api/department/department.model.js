import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: "text"
    },
    status: {
        type: String,
        enum: ["normal", "locked","delete"],
        default: "normal"
    }
}, {
    collection: "Department",
    timestamps: true
})

export const Department = mongoose.model('Department', schema)