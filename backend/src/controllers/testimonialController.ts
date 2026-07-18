import { Request, Response } from "express";
import Testimonial from "../models/Testimonial";
import cloudinary from "../config/cloudinary";


// ===============================
// Get All Testimonials
// ===============================
export const getTestimonials = async (
  req: Request,
  res: Response
) => {
  try {

    const testimonials =
      await Testimonial.find().sort({
        order: 1,
        createdAt: -1,
      });


    res.status(200).json({
      success: true,
      testimonials,
    });


  } catch (error: any) {

    console.error(error);

    res.status(500).json({
      success:false,
      message:
        error?.message ||
        "Failed to fetch testimonials.",
    });

  }
};



// ===============================
// Get Single Testimonial
// ===============================
export const getTestimonialById = async (
  req: Request,
  res: Response
) => {

  try {

    const testimonial =
      await Testimonial.findById(
        req.params.id
      );


    if(!testimonial){
      return res.status(404).json({
        success:false,
        message:"Testimonial not found.",
      });
    }


    res.status(200).json({
      success:true,
      testimonial,
    });


  } catch(error:any){

    console.error(error);

    res.status(500).json({
      success:false,
      message:
        error?.message ||
        "Failed to fetch testimonial.",
    });

  }
};



// ===============================
// Create Testimonial
// ===============================
export const createTestimonial = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      name,
      designation,
      message,
      rating,
      featured,
      order,
      isActive,
    } = req.body;



    let image = "";


    // Upload image to Cloudinary
    if(req.file){

      const file =
        req.file as Express.Multer.File;


      const result =
        await cloudinary.uploader.upload(
          file.path,
          {
            folder:
            "surya-nikunjam/testimonials",
          }
        );


      image = result.secure_url;

    }



    const testimonial =
      await Testimonial.create({

        name,

        designation,

        message,

        rating:
          rating
          ? Number(rating)
          : 0,


        featured:
          featured === "true" ||
          featured === true,


        order:
          order
          ? Number(order)
          : 0,


        isActive:
          isActive === "true" ||
          isActive === true,


        image,

      });



    res.status(201).json({
      success:true,
      message:
      "Testimonial created successfully.",
      testimonial,
    });



  } catch(error:any){

    console.error(error);

    res.status(500).json({
      success:false,
      message:
        error?.message ||
        "Failed to create testimonial.",
    });

  }

};




// ===============================
// Update Testimonial
// ===============================
export const updateTestimonial = async (
  req: Request,
  res: Response
) => {


  try {


    const testimonial =
      await Testimonial.findById(
        req.params.id
      );


    if(!testimonial){

      return res.status(404).json({
        success:false,
        message:
        "Testimonial not found.",
      });

    }



    testimonial.name =
      req.body.name;


    testimonial.designation =
      req.body.designation;


    testimonial.message =
      req.body.message;


    testimonial.rating =
      Number(req.body.rating);



    testimonial.featured =
      req.body.featured === "true" ||
      req.body.featured === true;



    testimonial.order =
      Number(req.body.order);



    testimonial.isActive =
      req.body.isActive === "true" ||
      req.body.isActive === true;




    // If new image uploaded
    if(req.file){


      // Delete old Cloudinary image

      if(testimonial.image){

        try{

          const parts =
            testimonial.image.split("/");


          const filename =
            parts[parts.length - 1];


          const publicId =
            "surya-nikunjam/testimonials/" +
            filename.split(".")[0];


          await cloudinary.uploader.destroy(
            publicId
          );


        }catch(err){

          console.log(
            "Old testimonial image delete failed"
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
            "surya-nikunjam/testimonials",
          }
        );


      testimonial.image =
        result.secure_url;

    }



    await testimonial.save();



    res.status(200).json({
      success:true,
      message:
      "Testimonial updated successfully.",
      testimonial,
    });



  } catch(error:any){

    console.error(error);


    res.status(500).json({
      success:false,
      message:
        error?.message ||
        "Failed to update testimonial.",
    });

  }

};




// ===============================
// Delete Testimonial
// ===============================
export const deleteTestimonial = async (
  req: Request,
  res: Response
) => {


  try {


    const testimonial =
      await Testimonial.findById(
        req.params.id
      );


    if(!testimonial){

      return res.status(404).json({
        success:false,
        message:
        "Testimonial not found.",
      });

    }



    // Delete Cloudinary image

    if(testimonial.image){

      try{

        const parts =
          testimonial.image.split("/");


        const filename =
          parts[parts.length - 1];


        const publicId =
          "surya-nikunjam/testimonials/" +
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



    await testimonial.deleteOne();



    res.status(200).json({
      success:true,
      message:
      "Testimonial deleted successfully.",
    });



  } catch(error:any){


    console.error(error);


    res.status(500).json({
      success:false,
      message:
        error?.message ||
        "Failed to delete testimonial.",
    });


  }

};




// ===============================
// Toggle Status
// ===============================
export const toggleTestimonialStatus =
async (
 req:Request,
 res:Response
)=>{

try{


 const testimonial =
 await Testimonial.findById(
  req.params.id
 );


 if(!testimonial){

  return res.status(404).json({
   success:false,
   message:
   "Testimonial not found.",
  });

 }


 testimonial.isActive =
 !testimonial.isActive;


 await testimonial.save();



 res.status(200).json({

  success:true,

  message:
  "Status updated successfully.",

  testimonial,

 });


}catch(error:any){


 console.error(error);


 res.status(500).json({

  success:false,

  message:
  error?.message ||
  "Failed to update status.",

 });


}

};