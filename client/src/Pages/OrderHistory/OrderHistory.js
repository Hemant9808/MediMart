
import { Header } from 'antd/es/layout/layout';
import React from 'react';
import NavBar from '../../Components/Home/NavBar/NavBar';
const orders = [
  {
    shippingAddress: {
      address: "knv",
      city: "vkms",
      postalCode: "vkdsnf",
      country: "kvs"
    },
    paymentMethod: "cod",
    shippingPrice: 0,
    totalPrice: 540,
    isPaid: false,
    isDelivered: false,
    orderStatus: "pending",
    _id: "6712acc447b5c35e48e494bb",
    user: "66e1571fec83ee3a88bc728a",
    items: [
      {
        productId: {
          _id: "66d75f97c73c720e007ef1d7",
          name: "Paracetamol 500mg",
          price: 5.99,
          brand: "Medico"
        },
        price: 5000,
        quantity: 6
      },
      {
        productId: {
          _id: "66e704a6a3fe040078968858",
          name: "Paracetamol 500mg",
          price: 5.99,
          brand: "Medico"
        },
        price: 5.99,
        quantity: 4
      },
      {
        productId: {
          _id: "66e704daa3fe040078968864",
          name: "Paracetamol 500mg",
          price: 5.99,
          brand: "Medico"
        },
        price: 5.99,
        quantity: 1
      },
      {
        productId: null,
        price: 540,
        quantity: 1
      }
    ],
    createdAt: "2024-10-18T18:45:24.672Z",
    updatedAt: "2024-10-18T18:45:24.678Z",
    __v: 0
  },
  {
    shippingAddress: {
      address: "dcmwe",
      city: "anything",
      postalCode: "anything",
      country: "anything"
    },
    paymentMethod: "cod",
    shippingPrice: 0,
    totalPrice: 540,
    isPaid: false,
    isDelivered: false,
    orderStatus: "pending",
    _id: "6712acfb47b5c35e48e494be",
    user: "66e1571fec83ee3a88bc728a",
    items: [
      {
        productId: {
          _id: "66d75f97c73c720e007ef1d7",
          name: "Paracetamol 500mg",
          price: 5.99,
          brand: "Medico"
        },
        price: 5000,
        quantity: 6
      },
      {
        productId: {
          _id: "66e704a6a3fe040078968858",
          name: "Paracetamol 500mg",
          price: 5.99,
          brand: "Medico"
        },
        price: 5.99,
        quantity: 4
      },
      {
        productId: {
          _id: "66e704daa3fe040078968864",
          name: "Paracetamol 500mg",
          price: 5.99,
          brand: "Medico"
        },
        price: 5.99,
        quantity: 1
      },
      {
        productId: null,
        price: 540,
        quantity: 1
      }
    ],
    createdAt: "2024-10-18T18:46:19.489Z",
    updatedAt: "2024-10-18T18:46:19.492Z",
    __v: 0
  },
  {
    shippingAddress: {
      address: "Gamma 2 Gr Noida",
      city: "Gamma 2",
      postalCode: "201310",
      country: "   India"
    },
    paymentMethod: "cod",
    shippingPrice: 0,
    totalPrice: 540,
    isPaid: false,
    isDelivered: false,
    orderStatus: "pending",
    _id: "6712af4a47b5c35e48e494c1",
    user: "66e1571fec83ee3a88bc728a",
    items: [
      {
        productId: {
          _id: "66d75f97c73c720e007ef1d7",
          name: "Paracetamol 500mg",
          price: 5.99,
          brand: "Medico"
        },
        price: 5000,
        quantity: 6
      },
      {
        productId: {
          _id: "66e704a6a3fe040078968858",
          name: "Paracetamol 500mg",
          price: 5.99,
          brand: "Medico"
        },
        price: 5.99,
        quantity: 4
      },
      {
        productId: {
          _id: "66e704daa3fe040078968864",
          name: "Paracetamol 500mg",
          price: 5.99,
          brand: "Medico"
        },
        price: 5.99,
        quantity: 1
      },
      {
        productId: null,
        price: 540,
        quantity: 1
      }
    ],
    createdAt: "2024-10-18T18:56:10.450Z",
    updatedAt: "2024-10-18T18:56:10.453Z",
    __v: 0
  }
];
const OrderHistory = () => {
  console.log("orders",orders);
  
  return (
    <div className="container mx-auto p-4">
   
                <NavBar />
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Order History</h1>
      {orders?.length === 0 ? (
        <p className="text-gray-600">No previous orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-lg p-4 mb-6 hover:shadow-xl transition-shadow"
          >
            <div className="md:flex md:justify-between">
              <div>
                {/* <h2 className="text-lg font-bold text-gray-700">
                  Order ID: {order._id}
                </h2> */}
                <p className="text-gray-600">
                  Placed on: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  Status: <span className="font-semibold capitalize">{order.orderStatus}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">
                  <span className="font-semibold">Total: </span>${order.totalPrice}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Payment Method: </span>{order.paymentMethod.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-gray-700 mb-2">Items:</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-100 rounded-lg overflow-hidden">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Product</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Brand</th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-600">Price</th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-600">Quantity</th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-600">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {item.productId ? item.productId.name : 'Unknown Product'}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {item.productId ? item.productId.brand : 'N/A'}
                        </td>
                        <td className="px-4 py-2 text-sm text-right text-gray-700">${item.price}</td>
                        <td className="px-4 py-2 text-sm text-right text-gray-700">{item.quantity}</td>
                        <td className="px-4 py-2 text-sm text-right text-gray-700">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-gray-700">Shipping Information:</h4>
              <p className="text-gray-600">{order.shippingAddress.address}, {order.shippingAddress.city}</p>
              <p className="text-gray-600">
                Postal Code: {order.shippingAddress.postalCode}, Country: {order.shippingAddress.country}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
