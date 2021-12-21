import bcrypt from "bcryptjs";
const userData = {
  users: [
    {
      name: "wale",
      email: "wale@gmail.com",
      password: bcrypt.hashSync("235689"),
      isAdmin: true,
    },
    {
      name: "bola",
      email: "bola@gmail.com",
      password: bcrypt.hashSync("235689"),
      isAdmin: false,
    },
  ],
};
export default userData;
