const {createUsers, deleteUsers, getAllUsers, updateUsers, selectUserById} = require('../models/users.model')
const errorHandler = require('../helpers/errorHandler.helpers')
exports.getAllUsers = async (req, res) => {
  try{
    const allUsers = await getAllUsers()
    res.status(200).json({
      success: true,
      message: "All Users retrieved successfully",
      results: allUsers,
    })
  } catch (error) {
    if (error) return errorHandler(error, res)
  }
}

// exports.readUser = (req, res) => {
//   console.log(req.params.id)
//   return res.status(200).json({
//     success: true,
//     message: "Detail users"
//   })
// }

exports.createUsers = async (req, res) => {
  try{
    const users = await createUsers(req.body)
    res.status(200).json({
      success: true,
      message: "Users created successfully",
      results: users,
    })
  } catch (error){
    if (error) return errorHandler(error, res)
  }
}

exports.updateUsers = async (req, res) => {
  try{
    const users = await updateUsers(
      req.body,
      req.params.id,
    )
    res.status(200).json({
      success: true,
      message: "Users updated successfully",
      results: users,
    })
  } catch (error) {
    if (error) return errorHandler(error, res)
  }
}

// exports.deleteUsers = (req,res)=> {
//   removeUser(req.params.id, (err, data)=> {
//     if(err){
//       console.log(err)
//       return res.status(500).json({
//         success: false,
//         message: 'Something happen in our backend',
//       })
//     }
//     return res.status(200).json({
//       success: true,
//       message: "Data deleted successfully"
//     })
//   })
// }

exports.deleteUsers = async (req, res) => {
  try{
    const users = await deleteUsers(req.params.id)
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      results: users,
    })
  } catch (error) {
    if (error) return errorHandler(error, res)
  }
}

exports.getUserById = async (req, res) => {
  try{
    const Users = await selectUserById(req.params.id)
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      results: Users,
    })
  } catch (error) {
    if (error) return errorHandler(error, res)
  }
}