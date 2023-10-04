import { Request } from 'express'
import formidable, { File } from 'formidable'
import fs from 'fs'
import path from 'path'
import { UPLOAD_IMAGES_TEMP_DIR, UPLOAD_VIDEOS_DIR, UPLOAD_VIDEOS_TEMP_DIR } from '~/constants/dir'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'

export const initFolder = () => {
  ;[UPLOAD_IMAGES_TEMP_DIR, UPLOAD_VIDEOS_TEMP_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true // tạo folder nested
      })
    }
  })
}

export const handleUploadImage = async (req: Request) => {
  const form = formidable({
    uploadDir: UPLOAD_IMAGES_TEMP_DIR,
    maxFiles: 4,
    keepExtensions: true,
    maxFieldsSize: 300 * 1024,
    maxTotalFileSize: 300 * 1024 * 4,
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

  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      // console.log(fields, files)
      if (err) {
        return reject(err)
      }
      if (!files.image) {
        return reject(new Error('File is empty'))
      }
      resolve(files.image)
    })
  })
}

export const handleUploadVideo = async (req: Request) => {
  const form = formidable({
    uploadDir: UPLOAD_VIDEOS_DIR,
    maxFiles: 1,
    keepExtensions: true,
    maxFieldsSize: 500 * 1024 * 1024,
    filter: function ({ name, originalFilename, mimetype }) {
      const isValid = name === 'video' && Boolean(mimetype?.includes('mp4') || mimetype?.includes('quicktime'))
      if (!isValid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }

      return isValid
    }
  })

  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      // console.log(fields, files)
      if (err) {
        console.log('vo day')
        return reject(err)
      }
      if (!files.video) {
        return reject(new Error('File is empty'))
      }
      resolve(files.video)
    })
  })
}

export const getNameFromFullName = (fullName: string) => {
  const nameArr = fullName.split('.')
  nameArr.pop()
  return nameArr.join('')
}
