/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ProfesionalCard from '../../components/ProfessionalCard';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { SERVIDOR } from '../../constants/URIs';
import Search from '../../components/Search';
import MainLayout from '../../components/Layout';
import useStyles from './styles';

const professionalsList = [
  {
    nombreProfesional: 'Maria',
    apellidoProfesional: 'Lopez',
    nombreUsuario: 'gnegri',
    avatar: '../../../images/person2.jpg',
    generoExperto: 'Romantico',
    id: 1,
    quantityReviews: 30,
    description:
      'Mi nombre es Maria Lopez y doy clases de literatura moderna en la UBA. Tengo 15 a\u00F1os de experienza en el campo, soy coordinadora de talleres online y presencial',
  },
  {
    nombreProfesional: 'Silvia',
    apellidoProfesional: 'Carrozo',
    nombreUsuario: 'gnegri',
    avatar: '../../../images/person.jpg',
    generoExperto: 'Poesia',
    id: 2,
    quantityReviews: 10,
    description:
      'Hola! Mi nombre es Silvia y soy experta en Poesia. Hace 10 a\u00F1os que trabajo en talleres dirigiendolas. Tambien escribi ensayos sobre novelas Argentinas',
  },
  {
    nombreProfesional: 'Nicolas',
    apellidoProfesional: 'Fuentes',
    nombreUsuario: 'gnegri',
    avatar: '../../../images/person3.jpg',
    generoExperto: 'Poesia',
    id: 3,
    quantityReviews: 120,
    description:
      'Mi nombre es Nicolas y mi especializacion es la Poesia. Escribo desde los 10 a\u00F1os. Soy profesor en la UBA en la catedra de literatura contempora\u00F1ea.',
  },
  {
    nombreProfesional: 'Angela',
    apellidoProfesional: 'Luz',
    nombreUsuario: 'gnegri',
    avatar: '../../../images/person6.jpg',
    generoExperto: { descripcion: 'Terror, Aventuras' },
    id: 4,
    quantityReviews: 80,
    description:
      'Mi nombre es Angela Luz y mi especializacion es las novelas de Terror y Aventuras. Escribo desde los 10 a\u00F1os. Soy profesor en la UBA en la catedra de literatura contempora\u00F1ea.',
  },
  {
    nombreProfesional: 'Eduardo',
    apellidoProfesional: 'Lopez',
    nombreUsuario: 'gnegri',
    avatar: '../../../images/person9.jpg',
    generoExperto: 'Aventuras',
    id: 4,
    quantityReviews: 80,
    description:
      'Mi nombre es Eduardo Lopez y mi especializacion es las novelas de Aventuras. Escribo desde los 10 a\u00F1os. Soy profesor en la UBA en la catedra de literatura contempora\u00F1ea.',
  },
  {
    nombreProfesional: 'Mariana',
    apellidoProfesional: 'Perez',
    nombreUsuario: 'gnegri',
    avatar: '../../../images/person8.jpg',
    generoExperto: 'Aventuras',
    id: 4,
    quantityReviews: 80,
    description:
      'Mi nombre es Mariana Perez y mi especializacion es las novelas de Aventuras. Escribo desde los 10 a\u00F1os. Soy profesor en la UBA en la catedra de literatura contempora\u00F1ea.',
  },
];
const Professionals = () => {
  const classes = useStyles();
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(false);
  const professionalsSearched = useSelector(
    state => state.professionals.professionals
  );

  useEffect(() => {
    if (!professionalsSearched.error) {
      setProfessionals(professionalsSearched);
    }
  }, [professionalsSearched]);

  useEffect(() => {
    getProfessionals();
  }, []);

  const getProfessionals = () => {
    fetch(SERVIDOR.USUARIOSPROFESIONALES, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        const professionals = response;
        if (!professionals.error) {
          setProfessionals(professionals);
        }
      })
      .catch(error => console.log(error));
  };

  const onClickSearch = ({ genre, rating }) => {
    fetch(SERVIDOR.BUSCARPROFESIONAL(genre, rating), {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        const professionals = response;
        if (!professionals.error) {
          setProfessionals(professionals);
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <MainLayout>
      <section className={classes.search}>
        <Search onClickSearch={onClickSearch} />
      </section>
      <section className={classes.section}>
        {professionals.length ? (
          professionals.map((professional, index) => {
            const professionalCardProps = {
              professional: `${professional.nombreProfesional} ${professional.apellidoProfesional}`,
              key: index,
              rating: professional.rating,
              quantityReviews: professional.obrasCorregidas,
              avatar: professional.avatar,
              userProfessional: professional.nombreUsuario,
              description: `Lectura profesional: ${professional.generoExperto}`,
              descriptionProfessional: professional.descripcion,
              initials: `${professional.nombreProfesional.charAt(
                0
              )}${professional.apellidoProfesional.charAt(0)}`,
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
              Oh no! No se encontraron correctores disponibles!
            </p>
          </>
        )}
      </section>
    </MainLayout>
  );
};

export default Professionals;
