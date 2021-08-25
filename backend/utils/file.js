import fs from 'fs'

const deleteFile = (filePath) => {
  fs.unlink(filePath.slice(1), (err) => {
    if (err) throw err
  })
}

export default deleteFile
