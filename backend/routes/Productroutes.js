const express=require("express");
const{ getALLProducts,createProduct, updateProduct, deleteProduct, getproductDetails} = require("../controllers/productcontroller");
const { isAuthenticatedUser ,authorisedRoles} = require("../middleware/auth");

const router=express.Router();


router.route("/products").get(isAuthenticatedUser,authorisedRoles("admin") ,getALLProducts)

router.route("/products/new").post(isAuthenticatedUser,createProduct)

router.route("/products/:id").put(isAuthenticatedUser,updateProduct)
router.route("/products/:id").delete(isAuthenticatedUser,deleteProduct)
router.route("/products/:id").get(getproductDetails)
module.exports=router
