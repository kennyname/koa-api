const router = require('koa-router')()
const multer = require('koa-multer');
const ProductController = require('../controllers/product')

var storage = multer.diskStorage({  
  destination: function (req, file, cb) {  
    cb(null, '../../uploads/')  
  },  
  //修改文件名称  
  filename: function (req, file, cb) {  
    var fileFormat = (file.originalname).split(".");  
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);  
  }  
})  
//加载配置  
var upload = multer({ storage: storage });  

const routers = router
  .get("/", ProductController.get_products)
  .get("/:product_id", ProductController.get_product)
  .post("/", upload.single('productImage'), ProductController.create_product)

module.exports = routers

