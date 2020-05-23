import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/Layout';
import ProfessionalCard from '../../components/ProfessionalCard';
import { useSelector } from 'react-redux';

const professionalsList = [
  {
    nombre: 'Maria',
    apellido: 'Lopez',
    nombreUsuario: 'srico',
    avatar: '../../../images/person2.jpg',
    genero: { descripcion: 'Romantico' },
    id: 1,
  },
  {
    nombre: 'Silvia',
    apellido: 'Carrozo',
    nombreUsuario: 'srico',
    avatar: '../../../images/person.jpg',
    genero: { descripcion: 'Poesia' },
    id: 2,
  },
  {
    nombre: 'Nicolas',
    apellido: 'Fuentes',
    nombreUsuario: 'srico',
    avatar: '../../../images/person3.jpg',
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
            avatar: professional.avatar,
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
