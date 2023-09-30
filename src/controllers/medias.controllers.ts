import { Request, Response } from 'express'
import formidable from 'formidable'
import path from 'path'
import { handleUploadSingleImage } from '~/utils/file'

export const uploadSingleImageController = async (req: Request, res: Response) => {
  const result = await handleUploadSingleImage(req)

  return res.json({
    result
  })
}
