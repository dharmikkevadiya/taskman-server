const { model, Schema } = require("mongoose");
const jwt = require("jsonwebtoken");
const { genPasswordHash, checkPassword } = require("../helper/helper");
const { JWT_SECRET } = require("../config");
const { UserStatus, UserRole } = require("../helper/constant");

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.NOT_APPROVED,
      required: true,
    },
    phone: { type: String },
    city: { type: String },
    address: { type: String },
    lastLoginTime: { type: Date },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

UserSchema.static(
  "register",
  async ({ firstName, lastName, phone, email, password }) => {
    const passwordHash = await genPasswordHash(password);

    let newUser = await new User({
      firstName,
      lastName,
      phone,
      email,
      password: passwordHash,
    }).save();

    newUser = JSON.parse(JSON.stringify(newUser));
    delete newUser.password;

    return newUser;
  }
);

//Generate Token
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET, { expiresIn: "7d" });
  return token;
};

let User = new model("User", UserSchema);
module.exports = User;
