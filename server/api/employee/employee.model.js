import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    gender: {
        type: String,
        enum: ["Nam", "Nữ", "Khác"]
    },
    dateOfBirth: {
        type: Date
    },
    academicLevel: {
        type: String
    },
    nation: {
        type: String
    },
    identityNumber: {
        type: String
    },
    address: {
        type: String
    },
    homeTown: {
        type: String
    },
    phone: {
        type: String
    },
    dateToWork: {
        type: Date
    },
    dateOfContract: {
        type: Date
    },
    note: {
        type: String
    },
    status: {
        type: String,
        enum: ["normal", "locked", "delete"],
        default: "normal"
    },
    departmentId: {
        type: mongoose.Types.ObjectId
    }
},{
    collection: 'Employee',
    timestamps: true
})

schema.virtual("departmentInfo", {
  ref: "Department",
  localField: "departmentId",
  foreignField: "_id",
  justOne: true,
})

export const Employee = mongoose.model('Employee', schema)