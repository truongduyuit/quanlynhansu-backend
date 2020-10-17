require("dotenv").config()
const mongoose = require('mongoose')
const fs = require("fs")
const data = require("./permission.json").data
const bcrypt = require("bcrypt")
require("./model")

async function connectMongoose() {
  if (process.argv.length <= 2) {
    console.log("must have params: [dev, staging, production]")
    return;
  }
  try {
    const env = process.argv[2]

    let dbString = process.env.MONGODB_URI_DEV
    if (env.toString() === "production") {
      dbString = process.env.MONGODB_URI
    } else if (env.toString() === "staging") {
      dbString = process.env.MONGODB_URI_STAGING
    }

    mongoose.connect(
      dbString,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
      () => {
        console.log("connecting to mongoose...")
      }
    )
  } catch (error) {
    console.log("connect mongoose fail: ", error)
  }
}

async function setupAdminAccountAndPermission(){
    try {
        let adminRole = {
            roleName: "admin",
            rolePermissions: [],
            status: "enable",
        }

        let permissionKeys = `export const PermissionKeys = {
    `
        await mongoose.model("Permissions").deleteMany({});
        for (let i = 0; i < data.length; i++) {
        const newData = await mongoose.model("Permissions").findOneAndUpdate(
            {
                groupKey: data[i].groupKey,
            },
            data[i],
            {
                new: true,
                upsert: true,
            }
        )
        for (let j = 0; j < newData.permissions.length; j++) {
                permissionKeys += `${newData.permissions[j].key} = "${newData.permissions[j].key}",\n`;
                adminRole.rolePermissions.push({
                    permissionKey: newData.permissions[j].key,
                });
            }
        }
        permissionKeys += `}`

        const role = await mongoose.model("Roles").findOneAndUpdate(
        {
            roleName: adminRole.roleName,
        },
        adminRole,
        {
            upsert: true,
            new: true,
        }
        );

        let adminAccount = await mongoose.model("Account").findOne({
            username: "admin",
        });
        if (!adminAccount) {
            const hash = await bcrypt.hash("admin123", 10);
            adminAccount = await mongoose.model("Account").create({
                username: "admin",
                password: hash,
                role: role._id,
            });
        } else {
            adminAccount.role = role._id;
            await adminAccount.save()
        }
        console.log("create adminAccount: ", {
            username: "admin",
            password: "admin"
        }, " success !");

        fs.writeFile(
            `server/const/permissions.js`,
            permissionKeys,
            { encoding: "utf-8" },
            (error) => {
                if (error) console.log("Setup permission error: ", error)
                console.log("setup permission success !")
            }
        );
    } catch (error) {
        console.log("config permission error")
        console.log(error)
    }
}

async function main() {
    await connectMongoose()
    await setupAdminAccountAndPermission()
}

main()