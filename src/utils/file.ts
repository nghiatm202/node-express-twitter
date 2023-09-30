import { Request } from 'express'
import formidable, { File } from 'formidable'
import fs from 'fs'
import path from 'path'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'

export const initFolder = () => {
  const uploadFolderPath = path.resolve('uploads')
  if (!fs.existsSync(uploadFolderPath)) {
    fs.mkdirSync(uploadFolderPath, {
      recursive: true // tạo folder nested
    })
  }
}

export const handleUploadSingleImage = async (req: Request) => {
  const form = formidable({
    uploadDir: path.resolve('uploads'),
    maxFiles: 1,
    keepExtensions: true,
    maxFieldsSize: 300 * 1024,
    filter: function ({ name, originalFilename, mimetype }) {
      const isValid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!isValid) {
        form.emit(
          'error' as any,
          new ErrorWithStatus({
            message: 'File type is not valid',
            status: HTTP_STATUS.UNSUPPORTED_MEDIA_TYPE
          }) as any
        )
      }
      return true
    }
  })

  return new Promise<File>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      // console.log(fields, files)
      if (err) {
        return reject(err)
      }
      if (!files.image) {
        return reject(new Error('File is empty'))
      }
      resolve(files.image[0])
    })
  })
}
