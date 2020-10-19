import { string } from '@hapi/joi'
import { extend } from 'joi'
import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: "text"
    },
    password: {
        type: String,
        required: true
    },
    roleId: {
        type: mongoose.Types.ObjectId
    },
    employeeId: {
        type: mongoose.Types.ObjectId
    },
    status: {
        type: String,
        enum: ['normal', 'locked' ,'delete'],
        default: 'normal'
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    collection: "Account",
    timestamps: true
})

schema.virtual("roleInfo", {
  ref: "Role",
  localField: "roleId",
  foreignField: "_id",
  justOne: true,
})

schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });

export const Account = mongoose.model('Account', schema)