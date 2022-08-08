const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncerror");
const Apifeatures = require("../utils/apifeatures");

//create product--admin

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}
)

//get all product  
exports.getALLProducts = catchAsyncErrors(async (req, res) => {
    const resultPerPage = 5;
    const productCount=Product.countDocuments()
    const apifeature = new Apifeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)
    const products = await apifeature.query // Product.find()
    res.status(200).json({
        success: true,
        products
    })
}
)



//get product details

exports.getproductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }
    res.status(200).json({
        success: true,
        product,
        productCount
    })

}
)





// update product --admin


exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
}
)

//Delete product


exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }

    await product.remove();
    res.status(200).json({
        success: true,
        message: "product deleted successfully"
    })
}
)