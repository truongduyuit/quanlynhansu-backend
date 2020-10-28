import mongoose from 'mongoose'

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
        dependOn: []
      },
    ],
  },
  {
    collection: "Permissions",
  }
);

schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });

export const Permissions = mongoose.model('Permissions', schema)