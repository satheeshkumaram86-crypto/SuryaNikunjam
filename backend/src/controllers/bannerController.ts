import { Request, Response } from "express";
import Banner from "../models/Banner";
import cloudinary from "../config/cloudinary";


// Create Banner
export const createBanner = async (
  req: Request,
  res: Response
) => {
  try {

    let image = "";

    if (req.file) {

      const file =
        req.file as Express.Multer.File;

      const result =
        await cloudinary.uploader.upload(
          file.path,
          {
            folder:
            "surya-nikunjam/banners",
          }
        );

      image = result.secure_url;
    }


    const banner =
      await Banner.create({

        title: req.body.title,

        subtitle: req.body.subtitle,

        description:
          req.body.description,

        image,

        buttonText:
          req.body.buttonText,

        buttonLink:
          req.body.buttonLink,

        order:
          Number(req.body.order) || 0,

        isActive:
          req.body.isActive === "true" ||
          req.body.isActive === true,

      });


    res.status(201).json({
      success:true,
      message:
      "Banner created successfully",
      banner,
    });


  } catch(error:any){

    console.error(error);

    res.status(500).json({
      success:false,
      message:
      error?.message ||
      "Server Error",
    });

  }
};




// Get All Banners
export const getAllBanners = async (
 req:Request,
 res:Response
)=>{

try{

 const banners =
 await Banner.find()
 .sort({
   order:1
 });


 res.status(200).json({
  success:true,
  count:banners.length,
  banners,
 });


}catch(error:any){

 console.error(error);

 res.status(500).json({
  success:false,
  message:
  error?.message ||
  "Failed to fetch banners",
 });

}

};




// Public banners
export const getPublicBanners = async (
 req:Request,
 res:Response
)=>{

try{

 const banners =
 await Banner.find({
  isActive:true,
 })
 .sort({
  order:1
 });


 res.status(200).json({
  success:true,
  banners,
 });


}catch(error:any){

 console.error(error);

 res.status(500).json({
  success:false,
  message:
  error?.message ||
  "Failed to fetch banners",
 });

}

};




// Get Single Banner
export const getBannerById = async (
 req:Request,
 res:Response
)=>{

try{

 const banner =
 await Banner.findById(
  req.params.id
 );


 if(!banner){

  return res.status(404).json({
   success:false,
   message:
   "Banner not found",
  });

 }


 res.status(200).json({
  success:true,
  banner,
 });


}catch(error:any){

 console.error(error);

 res.status(500).json({
  success:false,
  message:
  error?.message ||
  "Server Error",
 });

}

};




// Update Banner
export const updateBanner = async (
 req:Request,
 res:Response
)=>{

try{


 const banner =
 await Banner.findById(
  req.params.id
 );


 if(!banner){

  return res.status(404).json({
   success:false,
   message:
   "Banner not found",
  });

 }



 banner.title =
 req.body.title;


 banner.subtitle =
 req.body.subtitle;


 banner.description =
 req.body.description;


 banner.buttonText =
 req.body.buttonText;


 banner.buttonLink =
 req.body.buttonLink;


 banner.order =
 Number(req.body.order) || 0;


 banner.isActive =
 req.body.isActive === "true" ||
 req.body.isActive === true;




 // New image uploaded

 if(req.file){


  // Delete old Cloudinary image

  if(banner.image){

    try{

      const parts =
      banner.image.split("/");


      const filename =
      parts[parts.length - 1];


      const publicId =
      "surya-nikunjam/banners/" +
      filename.split(".")[0];


      await cloudinary.uploader.destroy(
        publicId
      );


    }catch(err){

      console.log(
       "Old banner image delete failed"
      );

    }

  }



  const file =
  req.file as Express.Multer.File;



  const result =
  await cloudinary.uploader.upload(
    file.path,
    {
      folder:
      "surya-nikunjam/banners",
    }
  );


  banner.image =
  result.secure_url;

 }



 await banner.save();



 res.status(200).json({

  success:true,

  message:
  "Banner updated successfully",

  banner,

 });


}catch(error:any){

 console.error(error);


 res.status(500).json({

  success:false,

  message:
  error?.message ||
  "Server Error",

 });


}

};





// Delete Banner
export const deleteBanner = async (
 req:Request,
 res:Response
)=>{

try{


 const banner =
 await Banner.findById(
  req.params.id
 );


 if(!banner){

  return res.status(404).json({
   success:false,
   message:
   "Banner not found",
  });

 }



 if(banner.image){

  try{

    const parts =
    banner.image.split("/");


    const filename =
    parts[parts.length - 1];


    const publicId =
    "surya-nikunjam/banners/" +
    filename.split(".")[0];


    await cloudinary.uploader.destroy(
      publicId
    );


  }catch(err){

    console.log(
      "Cloudinary delete failed"
    );

  }

 }



 await banner.deleteOne();



 res.status(200).json({

  success:true,

  message:
  "Banner deleted successfully",

 });


}catch(error:any){

 console.error(error);


 res.status(500).json({

  success:false,

  message:
  error?.message ||
  "Server Error",

 });

}

};





// Toggle Banner Status
export const toggleBannerStatus = async (
 req:Request,
 res:Response
)=>{

try{


 const banner =
 await Banner.findById(
  req.params.id
 );


 if(!banner){

  return res.status(404).json({
   success:false,
   message:
   "Banner not found",
  });

 }



 banner.isActive =
 !banner.isActive;


 await banner.save();



 res.json({

  success:true,

  message:
  "Status updated",

  isActive:
  banner.isActive,

 });


}catch(error:any){

 console.error(error);


 res.status(500).json({

  success:false,

  message:
  error?.message ||
  "Server Error",

 });

}

};