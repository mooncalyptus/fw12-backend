exports.readAllUsers = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'List data of users on /users'
  })
}

exports.createUser = (req, res)=> {
  return res.status(200).json({
    success: true,
    message: 'User created successfully'
  })
}

exports.updateUser = (req, res)=> {
  return res.status(200).json({
    success: true,
    message: 'User updated successfully'
  })
}

exports.deleteUsers = (req,res)=> {
  return res.status(200).json({
    success: true,
    message: 'User deleted successfully'
  })
}