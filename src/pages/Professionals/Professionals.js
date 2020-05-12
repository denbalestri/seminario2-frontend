/** @format */

import React, { useEffect, useState } from "react";
import MainLayout from "../../components/Layout";
import ProfessionalCard from "../../components/ProfessionalCard";
import { useSelector } from "react-redux";

const professionalsList = [
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
  const [professionals, setProfessionals] = useState([]);
  const professionalsSearched = useSelector((state) => state.professionals);

  useEffect(() => {
    setProfessionals(professionalsSearched);
  }, [professionalsSearched]);

  useEffect(() => {
    setProfessionals(professionalsList);
  }, []);
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
