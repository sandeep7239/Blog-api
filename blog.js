const mongoose = require('mongoose');
const blogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true

    },
    author: {
        type: String,
        required: true

    },
    category:{
        type:String,
        required:true,
    },
    photo: String
},
    { timestamps: true }
)
module.exports = mongoose.model('blog', blogSchema);