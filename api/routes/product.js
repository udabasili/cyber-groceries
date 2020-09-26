const express = require('express');
const {
	format
} = require('util');
const router  = express.Router()
const {
	celebrate,
	Joi
} = require('celebrate');
const Service = require('../../services/');
const {storage, bucketRef} = require('../../loaders/firebase');
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
});

var cpUpload = upload.fields([{
	name: 'imageUrl',
	maxCount: 1
}, {
	name: 'productData',
	maxCount: 8
}])


router.post(
  "/add-product",
  cpUpload,
	async (req, res, next) => {
		try {
			const image = req.files.imageUrl[0]
			let productData = JSON.parse(req.body.productData)
			const blob = storage.file(image.originalname);
			const blobWriter = blob.createWriteStream({
				metadata: {
					contentType: image.mimetype,
				},
			});
			blobWriter.on('error', (err) => next(err));
			blobWriter.on('finish', async () => {
				// Assembling public URL for accessing the file via HTTP
				await storage.file(image.originalname).makePublic()

				const publicUrl = format(
					`https://storage.googleapis.com/${storage.name}/${blob.name}`
				);
				productData.imageUrl = publicUrl

				const ProductService = new Service.ProductService(productData);
				const products = await ProductService.addProduct()
					return res.status(200).json({
						status: 200,
						message: products
					})
				
	
			});

			blobWriter.end(image.buffer);

			
		} catch (error) {
				return next({
					message: error.message,
					status: error.status
			})
      }
  }
);

router.delete(
	"/delete-product/:itemId",
	async (req, res, next) => {
		try {
			const ProductService = new Service.ProductService(null, req.params.itemId);
			const products = await ProductService.removeProduct()
			return res.status(200).json({
				status: 200,
				message: products
			})
		} catch (error) {
			return next({
				message: error.message,
				status: error.status
			})
		}
	}
);


router.put(
  "/edit-product/:itemId",
	cpUpload,
	async (req, res, next) => {
		try {
			const image = req.files.imageUrl[0]
			let productData = JSON.parse(req.body.productData)
			const blob = storage.file(image.originalname);
			const blobWriter = blob.createWriteStream({
				metadata: {
					contentType: image.mimetype,
				},
			});
			blobWriter.on('error', (err) => next(err));
			blobWriter.on('finish', async () => {
				// Assembling public URL for accessing the file via HTTP
				await storage.file(image.originalname).makePublic()

				const publicUrl = format(
					`https://storage.googleapis.com/${storage.name}/${blob.name}`
				);
				productData.imageUrl = publicUrl
				const ProductService = new Service.ProductService(productData, req.params.itemId);
				const products = await ProductService.editProduct()
				return res.status(200).json({
					status: 200,
					message: products
				})
			})
			blobWriter.end(image.buffer);
			
		} catch (error) {
				return next({
					message: error.message,
					status: error.status
			})
      }
  }
);
router.put(
  "/edit-product-with-url/:itemId",
	celebrate({
		body: Joi.object({
			name: Joi.string().required(),
			price: Joi.number().required(),
			strain: Joi.string().required(),
			type: Joi.string().required(),
			category: Joi.string().required(),
			quantity: Joi.number().required(),
			imageUrl: Joi.string().required()
		}),
	}),
	async (req, res, next) => {
		try {
		const ProductService = new Service.ProductService(req.body, req.params.itemId);
		const products = await ProductService.editProduct()
		return res.status(200).json({
			status: 200,
			message: products
		})
		} catch (error) {
			return next({
				message: error.message,
				status: error.status
			})
		}
	}
);




module.exports = router