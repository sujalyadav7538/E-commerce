import cloudinary from 'cloudinary';
import fs from 'fs';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })
          
// 

 const uploadOnCloud = async (req,res,next) => {
    const localFilePath=req.files.product_image;
    // console.log(process.env.CLOUDINARY_API_KEY,process.env.CLOUDINARY_NAME)
    try {
        if (!localFilePath) return null
        console.log(localFilePath)
        //upload the file on cloudinary
        let imageUrls=[]
        for(let i=0;i<localFilePath.length;i++){
            const response = await cloudinary.v2.uploader.upload(localFilePath[i].path, {
                resource_type: "auto"
            })
            imageUrls.push(response.url)
            // fs.unlink(localFilePath[i].path)
        }
        res.status(200).json(imageUrls);  
    } catch (error) {
        // fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        console.log(error)
        next(error);
    }
  }

  export default uploadOnCloud;

