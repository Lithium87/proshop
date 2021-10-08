import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const authUser = asyncHandler (async (req, res) => {
  const {email, password} = req.body;

  const user = User.findOne ({email});
  const passwordOK = await user.matchPassword (password);

  if (user && passwordOK) {
    res.json ({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken (user._id),
    });
  } else {
    res.status (401);
    throw new Error ('Invalid email or password');
  }
});

export {authUser};
