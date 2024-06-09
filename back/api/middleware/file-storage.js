const multer = require('multer');

module.exports = (req,res,next)=>{

	const storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, './uploads/')
		},
		filename: function (req, file, cb) {
			cb(null, Date.now() + file.originalname)
		}
	})

	const fileFilter = (req, file, cb) => {
		//reject
		if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
			cb(null, true)
		}else{
			cb(null, false)
		}
	}

	const upload = multer({

		storage: storage,
		limits: {
			fileSize: 1024 * 1024 * 5
		},
		fileFilter : fileFilter
	}).single('postImage');


	upload(req,res,async (err) => {

		console.log(err)
		if(err){
			console.log(req.body)
		}
		next(err)
	})

	next()
}
