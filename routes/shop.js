const express = require('express');
const shopController = require('../controllers/shop');
const checkAuth = require('../middlewares/check-auth');

const router = express.Router();

// products
router.get('/products', shopController.getAllProducts);
router.get('/products/:id', shopController.getProductById);
router.get('/products/category/:id', shopController.getProductsByCategory);
router.get('/products/tag/:id', shopController.getProductsByTag);
router.post('/products', checkAuth, shopController.addProduct);
router.put('/products/:id', checkAuth, shopController.updateProduct);
router.delete('/products/:id', checkAuth, shopController.deleteProduct);

// category
router.get('/categories', shopController.getAllCategories);
router.get('/categories/:id', shopController.getCategoryById);
router.post('/categories', checkAuth, shopController.addCategory);
router.put('/categories/:id', checkAuth, shopController.updateCategory);
router.delete('/categories/:id', checkAuth, shopController.deleteCategory);

// brand
router.get('/brands', shopController.getAllBrands);
router.get('/brands/:id', shopController.getBrandById);
router.post('/brands', checkAuth, shopController.addBrand);
router.put('/brands/:id', checkAuth, shopController.updateBrand);
router.delete('/brands/:id', checkAuth, shopController.deleteBrand);

// tag
router.get('/tags', shopController.getAllTags);
router.get('/tags/:id', shopController.getTagById);
router.post('/tags', shopController.addTag);
router.put('/tags/:id', shopController.updateTag);
router.delete('/tags/:id', shopController.deleteTag);

// payment method
router.get('/payment-methods', shopController.getAllPaymentMethods);
router.get('/payment-methods/:id', shopController.getPaymentMethodById);
router.post('/payment-methods', shopController.addPaymentMethod);
router.put('/payment-methods/:id', shopController.updatePaymentMethod);
router.delete('/payment-methods/:id', shopController.deletePaymentMethod);

// shipment method
router.get('/shipment-methods', shopController.getAllShipmentMethods);
router.get('/shipment-methods/:id', shopController.getShipmentMethodById);
router.post('/shipment-methods', shopController.addShipmentMethod);
router.put('/shipment-methods/:id', shopController.updateShipmentMethod);
router.delete('/shipment-methods/:id', shopController.deleteShipmentMethod);

//cart
router.get('/cart/:userId', checkAuth, shopController.getCart);
router.post('/cart', checkAuth, shopController.addToCart);
router.put('/cart', checkAuth, shopController.updateCart)
router.put('/cart/remove-item', checkAuth, shopController.removeCartItem);
router.put('/cart/empty', checkAuth, shopController.emptyCart);

// checkout
router.get('/checkout', checkAuth, shopController.getCheckout);
router.post('/checkout', checkAuth, shopController.postCheckout);

// orders
router.get('/orders/:userId', checkAuth, shopController.getOrders);
router.get('/order/:id',checkAuth, shopController.getOrderById);

module.exports = router;