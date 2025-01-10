import {Router } from 'express'

import multer from 'multer'

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'

import { isAuthenticated } from './middlewares/isAuthenticated'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
import { CreateProductController } from './controllers/product/CreateProductController'

import { ListByCategoryController } from './controllers/product/ListByCategoryController'

import uploadConfig from './config/multer'
import { CreateOrderController } from './controllers/order/CreateOrderController'
import { RemoveOrderController } from './controllers/order/RemoveOrderController'
import { AddItemController } from './controllers/order/AddItemController'
import { RemoveItemController } from './controllers/order/RemoveItemController'
import { SendOrderController } from './controllers/order/SendOrderController'
import { ListOrdersController } from './controllers/order/ListOrdersContreller'
import { DetailOrderController } from './controllers/order/DetailOrderController'
import { FinishOrderController } from './controllers/order/FinishOrderController'

const router = Router()

const upload = multer(uploadConfig.upload("./tmp"))

//---rotas users----
router.post('/users', isAuthenticated, new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/userinfo', isAuthenticated, new  DetailUserController().handle)

//---rotas category----
router.post('/categories', isAuthenticated, new CreateCategoryController().handle)
router.get('/listcategories', isAuthenticated, new ListCategoryController().handle)

//---rotas products----
//router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.post('/product', isAuthenticated, new CreateProductController().handle)
router.get('/categoryproducts', isAuthenticated, new ListByCategoryController().handle)

//----rotas orders---
router.post('/orders', isAuthenticated, new CreateOrderController().handle)
router.delete('/deleteorder', isAuthenticated, new RemoveOrderController().handle)
router.post('/orderadd', isAuthenticated, new AddItemController().handle)
router.delete('/deleteorderitem', isAuthenticated, new RemoveItemController().handle)
router.put('/ordersend', isAuthenticated, new SendOrderController().handle)
router.get('/ordersok', isAuthenticated, new ListOrdersController().handle)
router.get('/orderdetail', isAuthenticated, new DetailOrderController().handle)
router.put('/orderfinish', isAuthenticated, new FinishOrderController().handle)

export { router }