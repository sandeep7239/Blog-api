const express=require('express');
const router=express.Router();
const Blog=require('../models/blog');
const mongoose=require('mongoose');
const cloudinary=require('cloudinary').v2;  // import {v2 as cloudinary} from 'cloudinary';
const checkAuth=require('../middleware/checkAuth');

cloudinary.config({ 
  cloud_name: 'dhogfpnzg', 
  api_key: '737817651778449', 
  api_secret: 'aEUKPgvYBP7VeNRY3z1J-wl36cU' 
});

router.post('/',checkAuth,(req,res)=>{
    console.log(req.body);
    const file=req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
        console.log(result);
        const blog=new Blog({
            _id:new mongoose.Types.ObjectId(),
            title:req.body.title,
            description:req.body.description,
            author:req.body.author,
            category:req.body.category,
            photo:result.url
        })
        blog.save()
        .then((result)=>{
            res.status(200).json({
                message:'Blog is created successfully',
                blog:result
            });
        })
        .catch((err)=>{
            res.status(500).json({
                message:'Blog is not created',
                error:err
            });
        });
    });
    });

//get request
router.get('/',(req,res)=>{
    console.log("Get data Fetched Successfully");
    Blog.find()
    .then((result)=>{
        res.status(200).json({
            message:'Blog list is fetched successfully',
            fetchedData:result
        });
    })
    .catch((err)=>{
        res.status(500).json({
            message:'Error occured while fetching blog list',
            error:err
        });
    });
});

//get request by category

router.get('/category/:category',(req,res)=>{
    Blog.find({category:req.params.category})
    .then((result)=>{
        res.status(200).json({
            message:'Blog is fetched successfully through category',
            fetchedData:result
        });
    })
    .catch((err)=>{
        res.status(500).json({
            message:'Error occured while fetching blog through category',
            error:err
        });
    });
});

//get request by author

router.get('/author/:author',(req,res)=>{
    Blog.find({author:req.params.author})
    .then((result)=>{
        res.status(200).json({
            message:'Blog is fetched successfully through author',
            fetchedData:result
        });
    })
    .then((err)=>{
        res.status(500).json({
            message:'Error occured while fetching blog through author',
            error:err
        });
    });
});

//get request by id
router.get('/:id',(req,res)=>{
    Blog.findById(req.params.id)
    .then((result)=>{
        res.status(200).json({
            message:'Blog is fetched successfully through id',
            fetchedData:result
        });
    })
    .catch((err)=>{
        res.status(500).json({
            message:'Error occured while fetching blog through id',
            error:err
        });
    });
})

//delete request
router.delete('/:id',checkAuth,(req,res)=>{
      const idToDelete=req.params.id;
      Blog.findByIdAndRemove(idToDelete)
      .then((result)=>{
        res.status(200).json({
            message:'Blog is deleted successfully',
            deletedData:result
        });
      })
      .catch((err)=>{
        res.status(500).json({
            message:'Error occured while deleting blog',
            error:err
        });
      });
});
//put request
router.put('/:id',checkAuth,(req,res)=>{
    const file=req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
        Blog.findOneAndUpdate({_id:req.params.id},{
            $set:{
                title:req.body.title,
                description:req.body.description,
                author:req.body.author,
                category:req.body.category,
                photo:result.url
            }
        })
        .then((result)=>{
            res.status(200).json({
                message:'Blog is updated successfully',
                updatedData:result
            });
        })
        .catch((err)=>{
            res.status(500).json({
                message:'Error occured while updating blog',
                error:err
            });
        });
    });

})
//delete the photo from cloudinary
router.delete('',(req,res)=>{
    const imageUrl=req.query.imageUrl;
    const urlArray=imageUrl.split('/');
    const image=urlArray[urlArray.length-1];
    const imageName=image.split('.')[0];
    console.log(imageName);
    Blog.findOneAndUpdate(req.query.id)
    .then((result)=>{
        cloudinary.uploader.destroy(imageName,(err,data)=>{
                  console.log(data);
        });
        res.status(200).json({
            message:'Photo is deleted successfully',
            deletedData:result
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:'Error occured while deleting photo',
            error:TypeError
        });
    });
});


module.exports=router;