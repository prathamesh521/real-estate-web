const mongoose = require('mongoose');
const slugify = require('slugify'); // For generating slugs

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    slug: {
        type: String,
        unique: true,
        index: true,
    },
    description: {
        type: String,
        required: [true, 'Please enter product description']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [5, 'Product price cannot exceed 5 characters'],
        default: 0.0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    category: {
        type: String,
        ref: 'Category',
        required: [true, 'Please select a category for this product']
    },
    images: [
        {
          type: String,
          required: [true, "Please add at least one image"], // Ensure this matches with your data
        },
      ],
}, {
    timestamps: true
});

// Function to generate a unique slug
async function generateUniqueSlug(name) {
    const baseSlug = slugify(name, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    // Check if slug exists
    while (await mongoose.models.Product.exists({ slug })) {
        slug = `${baseSlug}-${count++}`;
    }

    return slug;
}

productSchema.pre('save', async function(next) {
    if (this.isModified('name')) {
        this.slug = await generateUniqueSlug(this.name);
    }
    next();
});

module.exports = mongoose.model('Product', productSchema);
