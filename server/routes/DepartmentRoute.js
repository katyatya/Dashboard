import { Router } from 'express'
import { departmentsController } from '../controllers/index.js'
const router = new Router()

router.get('/', departmentsController.getAll)
router.get('/:id', departmentsController.getOne)
router.delete('/:id', departmentsController.deleteOne)
router.post('/', departmentsController.createOne)

export default router
