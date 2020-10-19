import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true
    },
    rolePermissions: [{
        permissionKey: {
            type: String,
            required: true
        }}
    ],
    status: {
        type: String,
        enum: ['enable', 'disable'],
        default: 'enable'
    }
},{
    collection: "Roles",
    timestamps: true
})

schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });

export const Roles = mongoose.model('Roles', schema)