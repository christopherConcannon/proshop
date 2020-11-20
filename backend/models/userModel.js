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

// create a method we can access with an instantiated User (this)
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
