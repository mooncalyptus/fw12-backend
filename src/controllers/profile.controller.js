const errorHandler = require("../helpers/errorHandler.helpers")
const {selectUserById, editUser} = require("../models/users.model")


exports.readProfile = async (req, res) => {
  try{
    const user = await selectUserById(req.userData.id)
    if(user){
      return res.status(200).json({
        success: true,
        message: "Profile User",
        results: user,
      })
    } else {
      return res.status(400).json({
        success: false,
        message: "User not Found",
      })
    }
  } catch (error) {
    return errorHandler(error, res)
  }
}