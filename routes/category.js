const express=require('express');
const router=express.Router();
const Category=require('../models/category');
const mongoose=require('mongoose');

//add new category
router.post('/',(req,res)=>{
    console.log(req.body);
    const category=new Category({
           _id:new mongoose.Types.ObjectId(),
           name:req.body.name
    })
    category.save()
    .then((result)=>{
        res.status(200).json({
            message:"Category is added successfully",
            categoryList:result
        });
    })
    .catch((err)=>{
        res.status(500).json({
            message:"Error occured while adding category",
            error:err
        });
    });
});
//get method
router.get('/',(req,res)=>{
 Category.find()
 .then((result)=>{
    res.status(200).json({
        message:"Category list is fetched successfully",
        fetchedData:result
    });
 })
 .catch((err)=>{
    res.status(500).json({
        message:"Error occured while fetching category list",
        error:err
    });
 });
});
//get by id
router.get('/:id',(req,res)=>{
    Category.findById(req.params.id)
    .then((result)=>{
        res.status(200).json({
            message:"Category is fetched successfully by id",
            fetchedData:result
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:"Error occured while fetching category",
            error:err
        })
    })
});
//delete category
router.delete('/:id',(req,res)=>{
    console.log(req.params.id) 
    Category.findByIdAndRemove({_id:req.params.id})
    .then((result)=>{
        res.status(200).json({
            message:"Category is deleted successfully",
            deletedList:result
        });
    })
    .catch((err)=>{
        res.status(500).json({
            message:"Error occured while deleting category",
            error:err
        });
    });
});

module.exports=router;