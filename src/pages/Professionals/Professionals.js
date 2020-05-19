import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/Layout';
import ProfessionalCard from '../../components/ProfessionalCard';
import { useSelector } from 'react-redux';

const professionalsList = [
  {
    nombre: 'Eduardo',
    apellido: 'Lopez',
    username: 'EduardoLopez',
    avatar: '',
    genero: { descripcion: 'Romantico' },
    id: 1,
  },
  {
    nombre: 'Silvia',
    apellido: 'Carrozo',
    username: 'SilviaCarrozo',
    avatar: '',
    genero: { descripcion: 'Poesia' },
    id: 2,
  },
  {
    nombre: 'Nicolas',
    apellido: 'Fuentes',
    username: 'NicolasFuentes',
    avatar: '',
    genero: { descripcion: 'Poesia' },
    id: 3,
  },
];

const Professionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const professionalsSearched = useSelector(state => state.professionals);

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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '100%',
        }}
      >
        {professionals.map((professional, index) => {
          const professionalCardProps = {
            professional: `${professional.nombre} ${professional.apellido}`,
            key: index,
            userProfessional: professional.nombreUsuario,
            description: `Experto en el genero: ${professional.genero.descripcion}`,
          };

          return <ProfessionalCard {...professionalCardProps} />;
        })}
      </section>
    </MainLayout>
  );
};

export default Professionals;
