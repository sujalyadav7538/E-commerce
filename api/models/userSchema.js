import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 ,max:5}
});

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    useremail: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartItems: {
      type: [CartItemSchema],
      required: false,
      default:[]
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User;
