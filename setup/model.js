const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
    },
    groupKey: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: [
      {
        name: {
          type: String,
          required: true,
        },
        key: {
          type: String,
          required: true,
          unique: true,
        },
        dependOn: [],
      },
    ],
  },
  {
    collection: "Permissions",
  }
)

mongoose.model("Permissions", schema)

const roleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
    },
    rolePermissions: [
      {
        permissionKey: {
          type: String,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["enable", "disable"],
      default: "enable",
    },
  },
  {
    collection: "Roles",
  }
)

mongoose.model("Roles", roleSchema)

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roleId: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    employeeId: {
      type: mongoose.SchemaTypes.ObjectId,
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
  },
  {
    collection: "Account",
  }
)

mongoose.model("Account", adminSchema)