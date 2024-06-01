import { Router } from 'express';
import multer from 'multer';
import {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} from '../controllers/productController';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/products', upload.array('images', 5), addProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.put('/products/:id', upload.array('images', 5), updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/search', searchProducts);

export default router;
