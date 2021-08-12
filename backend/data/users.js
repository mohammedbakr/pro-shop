import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    // hashSync cuz hash is an async requires promise resolve
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'john@gmail.com',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'Jane Doe',
    email: 'jane@gmail.com',
    password: bcrypt.hashSync('123456', 10)
  }
]

export default users
