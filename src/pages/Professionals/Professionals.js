import React, { useEffect, useState, Fragment } from 'react';
import ProfesionalCard from '../../components/ProfessionalCard';
import { useSelector } from 'react-redux';

const professionalsList = [
  {
    nombre: 'Maria',
    apellido: 'Lopez',
    nombreUsuario: 'srico',
    avatar: '../../../images/person2.jpg',
    genero: { descripcion: 'Romantico' },
    id: 1,
    quantityReviews: 30,
    description:
      'Mi nombre es Maria Lopez y doy clases de literatura moderna en la UBA. Tengo 15 a\u00F1os de experienza en el campo, soy coordinadora de talleres online y presencial',
  },
  {
    nombre: 'Silvia',
    apellido: 'Carrozo',
    nombreUsuario: 'srico',
    avatar: '../../../images/person.jpg',
    genero: { descripcion: 'Poesia' },
    id: 2,
    quantityReviews: 10,
    description:
      'Hola! Mi nombre es Silvia y soy experta en Poesia. Hace 10 a\u00F1os que trabajo en talleres dirigiendolas. Tambien escribi ensayos sobre novelas Argentinas',
  },
  {
    nombre: 'Nicolas',
    apellido: 'Fuentes',
    nombreUsuario: 'srico',
    avatar: '../../../images/person3.jpg',
    genero: { descripcion: 'Poesia' },
    id: 3,
    quantityReviews: 120,
    description:
      'Mi nombre es Nicolas y mi especializacion es la Poesia. Escribo desde los 10 a\u00F1os. Soy profesor en la UBA en la catedra de literatura contempora\u00F1ea.',
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
    <Fragment>
      <p
        style={{
          fontSize: 40,
          marginTop: 30,
          fontFamily: 'Pangolin, cursive',
        }}
      >
        Encontra tu profesional ideal
      </p>
      <section style={{ display: 'flex', flexWrap: 'wrap' }}>
        {professionals.length ? (
          professionals.map((professional, index) => {
            const professionalCardProps = {
              professional: `${professional.nombre} ${professional.apellido}`,
              key: index,
              quantityReviews: professional.quantityReviews,
              avatar: professional.avatar,
              userProfessional: professional.nombreUsuario,
              description: `Experto en el genero: ${professional.genero.descripcion}`,
              descriptionProfessional: professional.description,
              initials: `${professional.nombre.charAt(
                0
              )}${professional.apellido.charAt(0)}`,
            };

            return <ProfesionalCard {...professionalCardProps} />;
          })
        ) : (
          <>
            <p
              style={{
                fontSize: 30,
                marginTop: 50,
                fontFamily: 'Pangolin, cursive',
              }}
            >
              Oh no! No se encontraron profesionales disponibles!
            </p>
            <img
              style={{
                marginTop: -80,
                width: 400,
                height: 600,
              }}
              src="../../../images/professional.gif"
              alt="noProfessionalsFound"
            />
          </>
        )}
      </section>
    </Fragment>
  );
};

export default Professionals;
