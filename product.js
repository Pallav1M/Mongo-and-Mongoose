const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })

    // add the following lines from "https://mongoosejs.com/docs/index.html"
    // const db = mongoose.connection
    // db.on('error', console.error.bind(console, 'connection error:'));
    // db.once('open', function () {
    //     console.log("connection open!!!")
    // });
    .then(() => {
        console.log("Connections open!!!!");
    })
    .catch(err => {
        console.log("oh no, error!!!")
        console.log(err)
    })
// https://mongoosejs.com/docs/schematypes.html - All Schema Types
const productSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true,
            maxlength: 20
        },
        price:
        {
            type: Number,
            required: true,
            min: [0, "Price must be positive"]
        },
        onSale:
        {
            type: Boolean,
            default: false
        },
        categories: [String],
        qty:
        {
            online:
            {
                type: Number,
                default: 0
            },
            inStore:
            {
                type: Number,
                default: 0
            }
        },
        size:
        {
            type: String,
            enum: ["S", "M", "L"]
        }
    }
);

// MODEL INSTANCE METHOD

// productSchema.methods.greet = function () {
//     console.log("hello, hi!");
//     console.log(` - from ${this.name}`)
// }
productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}
// SETTING ALL ITEMS TO BE ON SALE, AND PRICE OF ZERO
productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 })
}

const Product = mongoose.model('Product', productSchema);

// const findProduct = async () => {
//     const foundProduct = await Product.findOne({ name: "Tire Pump" });
//     foundProduct.onSale = !foundProduct.onSale
//     foundProduct.save()
// }

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: "Tire Pump" });
    console.log(foundProduct)
    await foundProduct.toggleOnSale();
    console.log(foundProduct)
    await foundProduct.addCategory("Outdoors");
    console.log(foundProduct)
}

Product.fireSale().then(res => console.log(res))

// findProduct();

const bike = new Product({ name: "Tire Pump", price: 20, categories: ["Cycling"] })
// MONGOOSE VALIDATION ERRORS
// const bike = new Product({ name: "Cycling Jersey", price: 28.50, categories: ["Cycling"], size: 'XS' })
bike.save()
    .then(data => {
        console.log("It worked!")
        console.log(data);
    })
    .catch(err => {
        console.log("Oh no, error!")
        console.log(err)
    })

// DEFAULT
// node product.js
// Connections open!!!!
// It worked!
// {
//   qty: { online: 0, inStore: 0 },
//   onSale: false,
//   categories: [ 'Cycling', 'Safety' ],
//   _id: 5fc697d4d9cd7e084ffba23e,
//   name: 'Helmet',
//   price: 100,
//   __v: 0
// }

// TO FIND AND UPDATE THE PRICE
// Product.findOneAndUpdate({ name: "Tire Pump" }, { price: 100 }, { new: true })
//     .then(data => {
//         console.log("It worked!")
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("Oh no, error!")
//         console.log(err)
//     })

// TO FIND AND UPDATE THE PRICE USING RUN VALIDATOR 
// runValidators: if true, runs update validators on this command.Update validators validate the update operation against the model's schema.)
// Product.findOneAndUpdate({ name: "Tire Pump" }, { price: -19.99 }, { new: true, runValidators: true })
//     .then(data => {
//         console.log("It worked!")
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("Oh no, error!")
//         console.log(err)
//     })


