const errorHandler = (error, res) => {
  console.log(error)
  if(
    error.message.includes(' unique constraint "users_email_unique"') ||
    error.message.includes(`"users_email_key"`)
  ){
    return res.status(400).json({
      success: false,
      message: "Email already used",
    });
  }
  if(error.message.includes("notfound_code_request")){
    return res.status(400).json({
      succes: false,
      message: "Request not found"
    })
  }
  if (
    error.message.includes(' unique constraint "users_phonenumber_unique"') ||
    error.message.includes(`users_phoneNumber_key`)
  ) {
    return res.status(400).json({
      success: false,
      message: "Phone number already used",
    });
  }
  if (error.message.includes("Cannot read property 'id' of undefined")) {
    return res.status(400).json({
      success: false,
      message: "Email not registered",
    });
  }
  if (error.message.includes("Request not found")) {
    return res.status(400).json({
      success: false,
      message: "Code or email isn't correct",
    });
  }
  return res.status(500).json({
    succes: false,
    message: "Something happend in our backend",
    error: error,
  });
}

module.exports = errorHandler;