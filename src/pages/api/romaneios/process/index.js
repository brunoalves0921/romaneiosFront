import multer from 'multer'
import api from '@/utils/api'

const upload = multer()

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      upload.single('romaneio')(req, res, async (err) => {
        if (err) {
          console.log(err)
          return res.status(400).json({ message: 'Error uploading file' })
        }

        if (!req.file) {
          return res.status(400).json({ message: 'No file provided' })
        }

        const formData = new FormData()
        formData.append('romaneio', new Blob([req.file.buffer]), {type: req.file.mimetype})

        const response = await api.post('/romaneios/process', formData, {
          headers: {
            ...req.headers,
          },
          responseType: 'stream'
        })

        res.status(200)
        Object.keys(response.headers).forEach(key => {
          res.setHeader(key, response.headers[key])
        })
        response.data.pipe(res)
      })
    } catch (error) {
      res.status(error.response.status).send(error.response.data)
    
    }
  } else {
    res.status(404).json({ message: 'Not found' })
  }
}
