/** @format */

import React from "react";
import MainLayout from "../../components/Layout";
import { notification } from "antd";
import statusesMappings from "../../constants/Notification";
import ProfessionalCard from "../../components/ProfessionalCard";

const professionals = [
  {
    firstName: "Eduardo",
    lastName: "Lopez",
    username: "EduardoLopez",
    avatar: "",
    description: "Experto en Novelas Romanticas",
    id: 1,
  },
  {
    firstName: "Silvia",
    lastName: "Carrozo",
    username: "SilviaCarrozo",
    avatar: "",
    description: "Experto en Poesia",
    id: 2,
  },
  {
    firstName: "Nicolas",
    lastName: "Fuentes",
    username: "NicolasFuentes",
    avatar: "",
    description: "Experto en Novelas",
    id: 3,
  },
];

const Professionals = (props) => {
  const openNotification = (type) => {
    notification[type]({
      message: statusesMappings[type].message,
      description: statusesMappings[type].description,
    });
  };

  return (
    <MainLayout>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          height: "100%",
        }}
      >
        {professionals.map((professional, index) => {
          const professionalCardProps = {
            key: index,
            openNotification,
            ...professional,
          };

          return <ProfessionalCard {...professionalCardProps} />;
        })}
      </section>
    </MainLayout>
  );
};

export default Professionals;
