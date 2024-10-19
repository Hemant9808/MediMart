// import { Fragment, useState } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import {  XIcon } from '@heroicons/react/outline'
// import Footer from '../../Components/Home/Footer/Footer'
// import Header from '../../Components/Home/NavBar/Header'
// import NavBar from '../../Components/Home/NavBar/NavBar'

// const orders = [
//   {
//     id: 1,
//     date: 'July 12, 2021',
//     datetime: '2021-07-12',
//     status: 'out-for-delivery',
//     productName: 'Kicks Carrier',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-01.jpg',
//     imageAlt: 'Black fabric shoe bag with zipper around 3 sides, holding pair of white sneakers.',
//   },
//   {
//     id: 2,
//     date: 'June 21, 2021',
//     datetime: '2021-06-21',
//     status: 'delivered',
//     productName: 'Micro Backpack',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-02.jpg',
//     imageAlt: 'Light grey canvas backpack with black handle, zipper, and edge details.',
//   },
//   {
//     id: 3,
//     date: 'June 6, 2021',
//     datetime: '2021-06-06',
//     status: 'cancelled',
//     productName: 'Drawtop Canister',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-03.jpg',
//     imageAlt: 'Orange canvas cylindrical bag with drawstring top, front zipper pouch, and black shoulder strap.',
//   },
//   {
//     id: 4,
//     date: 'May 24, 2021',
//     datetime: '2021-05-24',
//     status: 'delivered',
//     productName: 'High Wall Tote',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-04.jpg',
//     imageAlt: 'White canvas tote bag with black drawstring liner and white handle.',
//   },
//   // More orders...
// ]


// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// const OrderHistory = () => {
//     const [open, setOpen] = useState(false)

//     return (
//         <div className="bg-white">
//             <Header />
//             <NavBar />
//         {/* Mobile menu */}
//         <Transition.Root show={open} as={Fragment}>
//           <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
//             <Transition.Child
//               as={Fragment}
//               enter="transition-opacity ease-linear duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="transition-opacity ease-linear duration-300"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
//             </Transition.Child>
  
//             <Transition.Child
//               as={Fragment}
//               enter="transition ease-in-out duration-300 transform"
//               enterFrom="-translate-x-full"
//               enterTo="translate-x-0"
//               leave="transition ease-in-out duration-300 transform"
//               leaveFrom="translate-x-0"
//               leaveTo="-translate-x-full"
//             >
//               <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
//                 <div className="px-4 pt-5 pb-2 flex">
//                   <button
//                     type="button"
//                     className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
//                     onClick={() => setOpen(false)}
//                   >
//                     <span className="sr-only">Close menu</span>
//                     <XIcon className="h-6 w-6" aria-hidden="true" />
//                   </button>
//                 </div>
  
//                 <div className="border-t border-gray-200 py-6 px-4">
//                   <a href="#" className="-m-2 p-2 flex items-center">
//                     <img
//                       src="https://tailwindui.com/img/flags/flag-canada.svg"
//                       alt=""
//                       className="w-5 h-auto block flex-shrink-0"
//                     />
//                     <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
//                     <span className="sr-only">, change currency</span>
//                   </a>
//                 </div>
//               </div>
//             </Transition.Child>
//           </Dialog>
//         </Transition.Root>
  
//         <main
//           className="max-w-2xl mx-auto py-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
//           aria-labelledby="order-history-heading"
//         >
//           <div className="max-w-xl">
//             <h1 id="order-history-heading" className="text-3xl font-extrabold tracking-tight text-gray-900">
//               Order history
//             </h1>
//             <p className="mt-2 text-sm text-gray-500">
//               Check the status of recent orders, manage returns, and discover similar products.
//             </p>
//           </div>
  
//           <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
//             {orders.map((order) => (
//               <div key={order.id} className="group relative">
//                 <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75">
//                   <img src={order.imageSrc} alt={order.imageAlt} className="object-center object-cover" />
//                 </div>
//                 <h3 className="mt-4 text-sm text-gray-500">
//                   <a href={order.href}>
//                     <span className="absolute inset-0" />
//                     {order.productName}
//                   </a>
//                 </h3>
//                 <p className="mt-1 text-lg font-medium">
//                   {order.status === 'delivered' ? (
//                     <span className="text-gray-900">
//                       Delivered on <time dateTime={order.datetime}>{order.date}</time>
//                     </span>
//                   ) : order.status === 'out-for-delivery' ? (
//                     <span className="text-indigo-600">Out for delivery</span>
//                   ) : order.status === 'cancelled' ? (
//                     <span className="text-gray-500">Cancelled</span>
//                   ) : null}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </main>
//         <Footer></Footer>
//       </div>
//     );
// };

// export default OrderHistory;




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
