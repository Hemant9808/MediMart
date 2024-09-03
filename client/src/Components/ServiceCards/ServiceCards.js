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
    bgColor: "bg-[#E9FAEE]",
    subtitleColor: "text-[#12403E]",
  },
  {
    title: "Hospital Visit",
    subtitle: "PRE-BOOK",
    icon: "https://images.apollo247.in/images/ui_revamp_hospitalVisit.svg?tr=w-120,q-100,f-webp,c-at_max", 
    bgColor: "bg-[#FFF3D6]",
    subtitleColor: "text-[5C3F04]",
  },
  {
    title: "Video Consult",
    subtitle: "IN 15 MIN",
    icon: "https://images.apollo247.in/images/ui_revamp_video_consult.svg?tr=w-120,q-100,f-webp,c-at_max", 
    bgColor: "bg-[#FCEDF2]",
    subtitleColor: "text-[#832541]",
  },
  {
    title: "Lab Tests",
    subtitle: "AT HOME",
    icon: "https://images.apollo247.in/images/ui_revamp_labtest.svg?tr=w-120,q-100,f-webp,c-at_max", 
    bgColor: "bg-[#F1EDFD]",
    subtitleColor: "text-[#3F267C]",
  },
];

const ServiceCard = ({ service }) => {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg shadow-md ${service.bgColor} hover:shadow-lg transition-shadow cursor-pointer`}
    >
      <div className="flex items-center space-x-6">
      <img className="w-10 h-10" alt="" src={service.icon} />
      <NavLink
              to="https://www.google.co.in"
              className="cardAnchorStyle yv"
            >
              <div>
          <h3 className="text-lg font-semibold">{service.title}</h3>
          <p className={`text-xs ${service.subtitleColor} `}>{service.subtitle}</p>
        </div>
            </NavLink>
        
      </div>
      <span className="text-xl text-black font-medium">&gt;</span>
    </div>
  );
};

const ServiceCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 sm:px-12 md:px-24 lg:px-8 mx-auto pt-16 lg:max-w-screen-xl">
      {services.map((service, index) => (
        <ServiceCard key={index} service={service} />
      ))}
    </div>
  );
};

export default ServiceCards;
