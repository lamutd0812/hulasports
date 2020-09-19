const Product = require('../model/product');
const Category = require('../model/category');
const Brand = require('../model/brand');
const Tag = require('../model/tag');
const ProductTag = require('../model/product-tag');
const Cart = require('../model/cart');
const Order = require('../model/order');
const Payment = require('../model/payment');
const PaymentMethod = require('../model/payment-method');
const Shipment = require('../model/shipment');
const ShipmentInfor = require('../model/shipment-infor');
const ShipmentMethod = require('../model/shipment-method');

const ITEMS_PER_PAGE = 6;

//#region PRODUCTS
exports.getAllProducts = async (req, res) => {
    const page = +req.query.page || 1;
    let totalItems;
    try {
        totalItems = await Product.find().countDocuments();

        const products = await Product.find()
            .populate('categoryId brandId')
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);

        res.status(200).json({
            products: products,
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            hasPrevPage: page > 1,
            nextPage: page + 1,
            prevPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId).populate('categoryId brandId');

        const productTags = await ProductTag.find({ productId: productId });
        const tags = productTags.map(async pt => {
            const tag = await Tag.findById(pt.tagId);
            return tag;
        });
        const allTags = await Promise.all(tags); // phải gộp các promise do tags trả về

        res.status(200).json({
            product: product,
            tags: allTags
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getProductsByCategory = async (req, res) => {
    const categoryId = req.params.id;
    const page = +req.query.page || 1;
    let totalItems;
    try {
        totalItems = await Product.find({ categoryId: categoryId }).countDocuments();

        const products = await Product.find({ categoryId: categoryId })
            .populate('categoryId brandId')
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);

        res.status(200).json({
            products: products,
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            hasPrevPage: page > 1,
            nextPage: page + 1,
            prevPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getProductsByTag = async (req, res) => {
    const tagId = req.params.id;
    const page = +req.query.page || 1;
    let totalItems;
    try {
        totalItems = await ProductTag.find({ tagId: tagId }).countDocuments();

        const productTags = await ProductTag.find({ tagId: tagId })
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);;

        const products = productTags.map(async pt => {
            const product = await Product.findById(pt.productId).populate('categoryId brandId');
            return product
        });
        const productsByTag = await Promise.all(products);

        res.status(200).json({
            products: productsByTag,
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            hasPrevPage: page > 1,
            nextPage: page + 1,
            prevPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
        });
    } catch (err) {
        console.log(err);
    }
};

exports.addProduct = async (req, res) => {
    try {
        const product = new Product(req.body.product);
        const newProduct = await product.save();

        // add tags
        req.body.tags.forEach(async (tagName) => {
            let tag = await Tag.findOne({ name: tagName });
            if (!tag) {
                tag = new Tag({ name: tagName });
                await tag.save();
            }

            const productTag = new ProductTag({
                productId: newProduct._id,
                tagId: tag._id
            });
            await productTag.save();
        });

        res.status(200).json({ newProduct: newProduct });
    } catch (err) {
        console.log(err);
    }
};

exports.updateProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        res.status(200).json({ updatedProduct: updatedProduct });
    } catch (err) {
        console.log(err);
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ deletedProduct: deletedProduct });
    } catch (err) {
        console.log(err);
    }
};
//#endregion

//#region CATEGORIES
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories: categories });
    } catch (err) {
        console.log(err);
    }
};

exports.getCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.findById(categoryId);
        res.status(200).json({ category: category });
    } catch (err) {
        console.log(err);
    }
};

exports.addCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        const newCategory = await category.save();
        res.status(200).json({ newCategory: newCategory });
    } catch (err) {
        console.log(err);
    }
};

exports.updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, { new: true });
        res.status(200).json({ updatedCategory: updatedCategory });
    } catch (err) {
        console.log(err);
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({ deletedCategory: deletedCategory });
    } catch (err) {
        console.log(err);
    }
};
//#endregion

//#region TAGS
exports.getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json({ tags: tags });
    } catch (err) {
        console.log(err);
    }
};

exports.getTagById = async (req, res) => {
    const tagId = req.params.id;
    try {
        const tag = await Tag.findById(tagId);
        res.status(200).json({ tag: tag });
    } catch (err) {
        console.log(err);
    }
};

exports.addTag = async (req, res) => {
    try {
        const tag = new Tag(req.body);
        const newTag = await tag.save();
        res.status(200).json({ newTag: newTag });
    } catch (err) {
        console.log(err);
    }
};

exports.updateTag = async (req, res) => {
    const tagId = req.params.id;
    try {
        const updatedTag = await Tag.findByIdAndUpdate(tagId, req.body, { new: true });
        res.status(200).json({ updatedCategory: updatedCategory });
    } catch (err) {
        console.log(err);
    }
};

exports.deleteTag = async (req, res) => {
    try {
        const deletedTag = await Tag.findByIdAndDelete(req.params.id);
        res.status(200).json({ deletedTag: deletedTag });
    } catch (err) {
        console.log(err);
    }
};
//#endregion

//#region BRANDS
exports.getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json({ brands: brands });
    } catch (err) {
        console.log(err);
    }
};

exports.getBrandById = async (req, res) => {
    const brandId = req.params.id;
    try {
        const brand = await Brand.findById(brandId);
        res.status(200).json({ brand: brand });
    } catch (err) {
        console.log(err);
    }
};

exports.addBrand = async (req, res) => {
    try {
        const brand = new Brand(req.body);
        const newBrand = await brand.save();
        res.status(200).json({ newBrand: newBrand });
    } catch (err) {
        console.log(err);
    }
};

exports.updateBrand = async (req, res) => {
    const brandId = req.params.id;
    try {
        const updatedBrand = await Brand.findByIdAndUpdate(brandId, req.body, { new: true });
        res.status(200).json({ updatedBrand: updatedBrand });
    } catch (err) {
        console.log(err);
    }
};

exports.deleteBrand = async (req, res) => {
    try {
        const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
        res.status(200).json({ deletedBrand: deletedBrand });
    } catch (err) {
        console.log(err);
    }
};
//#endregion

//#region PAYMENT METHODS
exports.getAllPaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await PaymentMethod.find();
        res.status(200).json({ paymentMethods: paymentMethods });
    } catch (err) {
        console.log(err);
    }
};

exports.getPaymentMethodById = async (req, res) => {
    const pmId = req.params.id;
    try {
        const paymentMethod = await PaymentMethod.findById(pmId);
        res.status(200).json({ paymentMethod: paymentMethod });
    } catch (err) {
        console.log(err);
    }
};

exports.addPaymentMethod = async (req, res) => {
    try {
        const pm = new PaymentMethod(req.body);
        const newPaymentMethod = await pm.save();
        res.status(200).json({ newPaymentMethod: newPaymentMethod });
    } catch (err) {
        console.log(err);
    }
};

exports.updatePaymentMethod = async (req, res) => {
    const pmId = req.params.id;
    try {
        const updatedPaymentMethod = await PaymentMethod.findByIdAndUpdate(pmId, req.body, { new: true });
        res.status(200).json({ updatedPaymentMethod: updatedPaymentMethod });
    } catch (err) {
        console.log(err);
    }
};

exports.deletePaymentMethod = async (req, res) => {
    try {
        const deletedPaymentMethod = await PaymentMethod.findByIdAndDelete(req.params.id);
        res.status(200).json({ deletedPaymentMethod: deletedPaymentMethod });
    } catch (err) {
        console.log(err);
    }
};
//#endregion

//#region SHIPMENT METHODS
exports.getAllShipmentMethods = async (req, res) => {
    try {
        const shipmentMethods = await ShipmentMethod.find();
        res.status(200).json({ shipmentMethods: shipmentMethods });
    } catch (err) {
        console.log(err);
    }
};

exports.getShipmentMethodById = async (req, res) => {
    const smId = req.params.id;
    try {
        const shipmentMethod = await ShipmentMethod.findById(smId);
        res.status(200).json({ shipmentMethod: shipmentMethod });
    } catch (err) {
        console.log(err);
    }
};

exports.addShipmentMethod = async (req, res) => {
    try {
        const sm = new ShipmentMethod(req.body);
        const newShipmentMethod = await sm.save();
        res.status(200).json({ newShipmentMethod: newShipmentMethod });
    } catch (err) {
        console.log(err);
    }
};

exports.updateShipmentMethod = async (req, res) => {
    const smId = req.params.id;
    try {
        const updatedShipmentMethod = await ShipmentMethod.findByIdAndUpdate(smId, req.body, { new: true });
        res.status(200).json({ updatedShipmentMethod: updatedShipmentMethod });
    } catch (err) {
        console.log(err);
    }
};

exports.deleteShipmentMethod = async (req, res) => {
    try {
        const deletedShipmentMethod = await ShipmentMethod.findByIdAndDelete(req.params.id);
        res.status(200).json({ deletedShipmentMethod: deletedShipmentMethod });
    } catch (err) {
        console.log(err);
    }
};
//#endregion

//#region CARTS
exports.getCart = async (req, res) => {
    const userId = req.params.userId;
    try {
        let cart = await Cart.findOne({ userId: userId }).populate('items.productId');
        if (!cart) {
            cart = createNewCart(userId);
        }
        const cartItems = getCartItems(cart);
        const totalPrice = getTotalPrice(cart);
        res.status(200).json({
            cartItems: cartItems,
            totalPrice: totalPrice
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.addToCart = async (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const qty = req.body.quantity;
    const size = req.body.size;
    try {
        let cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            cart = createNewCart(userId);
        }

        const cartItemIndex = cart.items.findIndex(item => {
            return item.productId.toString() === productId.toString()
                && item.size === size;
        });

        let newQuantity = 1;
        const updatedCartItems = [...cart.items];
        if (cartItemIndex >= 0) {
            newQuantity = updatedCartItems[cartItemIndex].quantity + +qty;
            updatedCartItems[cartItemIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({
                productId: productId,
                quantity: qty,
                size: size
            })
        }

        cart.items = updatedCartItems;
        const savedCart = await cart.save();
        const updatedCart = await savedCart.populate('items.productId').execPopulate();

        res.status(200).json({
            cartItems: getCartItems(updatedCart),
            totalPrice: getTotalPrice(updatedCart)
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.updateCart = async (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const qty = req.body.quantity;
    const size = req.body.size;
    try {
        let cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            cart = createNewCart(userId);
        }

        const cartItemIndex = cart.items.findIndex(item => {
            return item.productId.toString() === productId.toString()
                && item.size === size;
        });

        const updatedCartItems = [...cart.items];
        updatedCartItems[cartItemIndex].quantity = qty;

        cart.items = updatedCartItems;
        const savedCart = await cart.save();
        const updatedCart = await savedCart.populate('items.productId').execPopulate();

        res.status(200).json({
            cartItems: getCartItems(updatedCart),
            totalPrice: getTotalPrice(updatedCart)
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.removeCartItem = async (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const size = req.body.size;
    try {
        let cart = await Cart.findOne({ userId: userId });

        const updatedCartItems = cart.items.filter(item => {
            return item.productId.toString() !== productId.toString()
                || item.size !== size;
        });

        cart.items = updatedCartItems;
        const savedCart = await cart.save();
        const updatedCart = await savedCart.populate('items.productId').execPopulate();

        res.status(200).json({
            cartItems: getCartItems(updatedCart),
            totalPrice: getTotalPrice(updatedCart)
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.emptyCart = async (req, res) => {
    const userId = req.body.userId;
    try {
        let cart = await Cart.findOne({ userId: userId });
        cart.items = [];
        await cart.save();
        res.status(200).json({
            cartItems: [],
            totalPrice: 0
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};
//#endregion

//#region CHECKOUT
exports.getCheckout = async (req, res) => {
    const userId = req.body.userId;
    try {
        // send User Infor to Client

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.postCheckout = async (req, res) => {
    const userId = req.body.userId;
    const fullname = req.body.fullname;
    const address = req.body.address;
    const phone = req.body.phone;
    const message = req.body.message;

    const paymentMethodId = req.body.paymentMethodId;
    const shipmentMethodId = req.body.shipmentMethodId;

    try {
        const cart = await Cart.findOne({ userId: userId }).populate('items.productId');
        const cartItems = cart.items.map(item => {
            return {
                productId: item.productId._id,
                productTitle: item.productId.title,
                productImage: item.productId.images[0],
                price: ((1 - item.productId.discount / 100) * item.productId.price).toFixed(2),
                quantity: item.quantity,
                size: item.size
            }
        });
        const totalPrice = getTotalPrice(cart);

        const order = new Order({
            userId: userId,
            createdAt: Date.now(),
            items: cartItems,
            totalPrice: totalPrice,
            status: "Đã tiếp nhận"
        });
        const createdOrder = await order.save();

        // PAYMENT STATUS: Chua xu ly !!!!
        const payment = new Payment({
            amount: totalPrice,
            status: true,
            orderId: createdOrder._id,
            paymentMethodId: paymentMethodId
        });
        const createdPayment = await payment.save();

        const shipment = new Shipment({
            orderId: createdOrder._id,
            shipmentMethodId: shipmentMethodId,
            status: []
        });
        const createdShipment = await shipment.save();

        const shipmentInfor = new ShipmentInfor({
            fullname: fullname,
            address: address,
            phone: phone,
            message: message,
            shipmentId: createdShipment._id
        });
        const createdShipmentInfor = await shipmentInfor.save();

        // empty user's cart after create order: handle in front end
        cart.items = [];
        await cart.save();

        res.status(200).json({
            message: 'Đặt hàng thành công!',
            orderId: createdOrder._id
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};
//#endregion

//#region ORDERS
exports.getOrders = async (req, res) => {
    const userId = req.params.userId;
    try {
        const orders = await Order.find({ userId: userId }).sort({ createdAt: -1 });
        res.status(200).json({
            orders: orders
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.getOrderById = async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await Order.findById(orderId).populate('items');

        const payment = await Payment.findOne({ orderId: orderId });
        const paymentMethod = await PaymentMethod.findById(payment.paymentMethodId);

        const shipment = await Shipment.findOne({ orderId: orderId });
        const shipmentMethod = await ShipmentMethod.findById(shipment.shipmentMethodId);
        const shipmentInfor = await ShipmentInfor.findOne({ shipmentId: shipment._id });

        res.status(200).json({
            order: order,
            payment: payment,
            paymentMethod: paymentMethod.name,
            shipment: shipment,
            shipmentMethod: shipmentMethod.name,
            shipmentInfor: shipmentInfor
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};
//#endregion

//#region HELPER FUNCTIONS
// create cart
const createNewCart = async (userId) => {
    let newCart = null;
    try {
        const cart = new Cart({
            userId: userId,
            items: []
        });
        newCart = await cart.save();
    } catch (err) {
        console.log(err);
    }
    return newCart;
};

// get cart items
const getCartItems = (cart) => {
    let cartItems = [];
    if (cart.items) {
        cartItems = cart.items.map(item => {
            return {
                //product: { ...item.productId._doc };
                product: {
                    _id: item.productId._id,
                    title: item.productId.title,
                    images: item.productId.images,
                    price: item.productId.price,
                    discount: item.productId.discount
                },
                quantity: item.quantity,
                size: item.size
            }
        });
    }
    return cartItems;
};

// get cart total price
const getTotalPrice = (cart) => {
    let totalPrice = 0;
    if (cart.items) {
        cart.items.forEach(item => {
            // const product = { ...item.productId._doc };
            const product = {
                price: item.productId.price,
                discount: item.productId.discount
            };
            const quantity = item.quantity;
            totalPrice += (1 - product.discount / 100) * product.price * quantity;
        });
    }
    return totalPrice.toFixed(2);
}
//#endregion
