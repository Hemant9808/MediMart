const Cart = require("../models/CartModel");

const calculateCartTotal = (items) => {
  console.log("inside function items", items);

  let totalItems = 0;
  let totalPrice = 0;

  items.forEach((item) => {
    totalItems = item.quantity;
    totalPrice = item.price * item.quantity;
    console.log("inside funtion", item.quantity, item.price);
  });

  return { totalItems, totalPrice };
};

const addToCart = async (req, res) => {
  console.log("entered");

  try {
    let { productId, quantity, price } = req.body;
    const userId = req.user._id;
    console.log("userId", req.user._id);

    var cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "price name images brand"
    );    console.log("cart found or not");

    if (cart) {
      console.log("cart found");

      const existingItemIndex = cart.items.findIndex((item) =>
        item.productId.equals(productId)
      );
      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity = quantity;
      } else {
        console.log("pushing items", productId, price, quantity);

        cart.items.push({
          productId,
          price,
          quantity,
        });
        console.log("new cart after item pushed", cart);
      }
    } else {
      console.log("cart not found");

      cart = new Cart({
        userId,
        items: [
          {
            productId,
            price,
            quantity,
          },
        ],
      });
      console.log("new cart", cart);
    }
    console.log("calculete");

    console.log(cart.items);

    const { totalItems, totalPrice } = calculateCartTotal(cart.items);
    console.log("kfmskf", totalItems, totalPrice);

    cart.totalItems = totalItems;
    cart.totalPrice = totalPrice;
    console.log("update cart", cart);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

getUserCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "price name images brand"
    );
    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

removeItemFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;
  console.log("productId",productId);
 
  try {
    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "price name images brand"
    );    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    cart.items = cart.items.filter((item) => !item.productId.equals(productId));

    if (cart.items.length === 0) {
      await Cart.deleteOne({ userId });
      return res.status(200).json({ message: "Cart is empty now." });
    }

    const { totalItems, totalPrice } = calculateCartTotal(cart.items);
    cart.totalItems = totalItems;
    cart.totalPrice = totalPrice;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addToCart, removeItemFromCart, getUserCart };
