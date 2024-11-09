const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',     
    required: true
  },
  name: {
    type: String,
    required: true
  },
 
razorpay_payment_id:{
  type:String,
  },

  price: {
    type: Number,
    required: true
  },
  brand: {
    type: String,
    required: false
  },
  // Add other fields as needed for product details
}, { _id: false });

// Order Item Schema
const orderItemSchema = new Schema({
  productId: {
    type: productSchema,
    
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    
  },
  price: {
    type: Number,
    required: true,
  },
  
}, { _id: false });

// Order Schema
const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  razorpay_order_id:{
    type:String,
    required:true
    
    },
  items: [orderItemSchema],
  shippingAddress: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      //required: true,
    },
    postalCode: {
      type: String,
     // required: true,
    },
    country: {
      type: String,
     // required: true,
    },
  },
  // paymentMethod: {
  //   type: String,
  //   enum: ['credit_card', 'paypal', 'stripe', 'cod'], // Add more methods as needed
  //   required: true,
  //   default:'cod'
  // },
  paymentResult: {
    razorpay_payment_id: String,
    paymentStatus:{
      type:String,
      enum:['paid','not-paid'],
      required:true,
      default:'not-paid',
      },
    paidAt: String,
    paymentMethod: {
    type: String,
    enum: ['credit_card', 'paypal', 'stripe', 'cod'], // Add more methods as needed
    required: true,
    default:'cod'
  },
  },
  
  
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  // isPaid: {
  //   type: Boolean,
  //   required: true,
  //   default: false,
  // },
  // paidAt: {
  //   type: Date,
  // },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

// Middleware to auto-update timestamps
orderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Order', orderSchema);
