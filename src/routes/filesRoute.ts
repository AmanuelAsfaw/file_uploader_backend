import { Request, Response, Router } from 'express'
import * as fileController from '../controllers/fileController'

const filesRouter = Router()

filesRouter.get('/', async (req: Request, res: Response) => {  
  const result = await fileController.getAll()  
  return res.status(200).send({
    success: true,
    data: Array.isArray(result)? result: [] 
  })
})

filesRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const result = await fileController.deleteById(id)  
  return res.status(200).send(result)

})

filesRouter.post('/', async (req: Request, res: Response) => {
  console.log(req.files);
  
  if(!req.files){
    return res.status(404).send({
      success: false,
      message: 'File not found'
    })
  }
  const file  = req.files.file;
  if(!Array.isArray(file)){
    const payload = {
      id: undefined,
      name: file.name,
      size: file.size,
      createdAt : undefined}
      
    const result = await fileController.create(payload)  
    if(result.success){
      try
      {
        file.mv('./uploads/' + file.name)        
      }
      catch{
        if(result.data !== null){
          fileController.deleteById(result.data.id)
        }
        return res.status(500).send({
          success: false,
          message: 'Faild on file Save.'
        }) 
      }
    }
    return res.status(200).send(result)    
  }
  return res.status(500).send({
    success: false,
    message: ''
  })
})

export default filesRouter