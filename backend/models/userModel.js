import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
	{
		name     : {
			type     : String,
			required : true
		},
		email    : {
			type     : String,
			required : true,
			unique   : true
		},
		password : {
			type     : String,
			required : true
		},
		isAdmin  : {
			type     : Boolean,
			required : true,
			default  : false
		}
	},
	// create createdAt and updatedAt fields automatically
	{
		timestamps : true
	}
)

// middleware that hooks into save (create) method      to hash password when user signs up/registers
userSchema.pre('save', async function(next) {
  // only run hash middleware if there is a modified (or newly created) password so if user updates name or email, it doesn't generate new pw hash which would make their old pw not work
  if (!this.isModified('password')) {
    next()
  }

  // create a salt
  const salt = await bcrypt.genSalt(10)

  // update password of User instance to be a hashed version of that password
  this.password = await bcrypt.hash(this.password, salt)
})

// create a method we can access with an instantiated User (this) to match plaintext password from login form to hashed pw in db 
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
