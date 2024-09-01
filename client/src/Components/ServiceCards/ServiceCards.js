import React from "react";
import { NavLink } from 'react-router-dom';


const services = [
  // {
  //   title: "Pharmacy Near Me",
  //   subtitle: "FIND STORE",
  //   icon: "https://images.apollo247.in/pub/media/store_icon_image.png?tr=w-120,q-100,f-webp,c-at_max", 
  //   bgColor: "bg-blue-50",
  // },
  {
    title: "Get 15% off on Medicines",
    subtitle: "UPLOAD NOW",
    icon: "https://images.apollo247.in/images/ui_revamp_orderviaprescription.svg?tr=w-120,q-100,f-webp,c-at_max", 
    bgColor: "bg-green-50",
  },
  {
    title: "Hospital Visit",
    subtitle: "PRE-BOOK",
    icon: "https://images.apollo247.in/images/ui_revamp_hospitalVisit.svg?tr=w-120,q-100,f-webp,c-at_max", 
    bgColor: "bg-purple-50",
  },
  {
    title: "Video Consult",
    subtitle: "IN 15 MIN",
    icon: "https://images.apollo247.in/images/ui_revamp_video_consult.svg?tr=w-120,q-100,f-webp,c-at_max", 
    bgColor: "bg-yellow-50",
  },
  {
    title: "Lab Tests",
    subtitle: "AT HOME",
    icon: "https://images.apollo247.in/images/ui_revamp_labtest.svg?tr=w-120,q-100,f-webp,c-at_max", 
    bgColor: "bg-pink-50",
  },
];

const ServiceCard = ({ service }) => {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg shadow-md ${service.bgColor} hover:shadow-lg transition-shadow`}
    >``
      <div className="flex items-center space-x-3">
      <img className="text-4xl" alt="" src={service.icon} />
      <NavLink
              to="https://www.google.co.in"
              className="cardAnchorStyle yv"
            >
              <div>
          <h3 className="text-lg font-semibold">{service.title}</h3>
          <p className="text-sm text-gray-600">{service.subtitle}</p>
        </div>
            </NavLink>
        
      </div>
      <span className="text-xl text-gray-500">&gt;</span>
    </div>
  );
};

const ServiceCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 m-5">
      {services.map((service, index) => (
        <ServiceCard key={index} service={service} />
      ))}
    </div>
  );
};

export default ServiceCards;
