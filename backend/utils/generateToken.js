import jwt from 'jsonwebtoken'

// id will be the payload
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

export default generateToken