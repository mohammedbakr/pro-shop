import fs from 'fs'

const deleteFile = (filePath) => {
  console.log(filePath.slice(1))
  fs.unlink(filePath.slice(1), (err) => {
    if (err) throw err
  })
}

export default deleteFile
