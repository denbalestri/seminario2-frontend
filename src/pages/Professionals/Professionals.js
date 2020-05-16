/** @format */

import React from "react";
import MainLayout from "../../components/Layout";
import ProfessionalCard from "../../components/ProfessionalCard";

const professionals = [
  {
    firstName: "Eduardo",
    lastName: "Lopez",
    username: "srico",
    avatar: "",
    description: "Experto en Novelas Romanticas",
    id: 1,
  },
  {
    firstName: "Silvia",
    lastName: "Carrozo",
    username: "srico",
    avatar: "",
    description: "Experto en Poesia",
    id: 2,
  },
  {
    firstName: "Nicolas",
    lastName: "Fuentes",
    username: "srico",
    avatar: "",
    description: "Experto en Novelas",
    id: 3,
  },
];

const Professionals = (props) => {
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
            ...professional,
          };

          return <ProfessionalCard {...professionalCardProps} />;
        })}
      </section>
    </MainLayout>
  );
};

export default Professionals;
