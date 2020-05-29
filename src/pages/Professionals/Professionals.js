import React, { useEffect, useState, Fragment } from 'react';
import ProfesionalCard from '../../components/ProfessionalCard';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { SERVIDOR } from '../../constants/URIs';
import Search from '../../components/Search';
import useStyles from './styles';

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
  const [loading, setLoading] = useState(false);
  const professionalsSearched = useSelector(state => state.professionals);
  const classes = useStyles();

  useEffect(() => {
    setProfessionals(professionalsSearched);
  }, [professionalsSearched]);

  useEffect(() => {
    setProfessionals(professionalsList);
  }, []);

  const onSearch = debounce(professional => {
    if (professional === '') return;
    setLoading(true);
    fetch(SERVIDOR.SEARCHPROFESSIONAL_URL(professional), {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        const professionals = response;
        setProfessionals(professionals);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, 500);

  const onClickSearch = () => {};

  return (
    <>
      <p
        style={{
          fontSize: 40,
          marginTop: 30,
          fontFamily: 'Pangolin, cursive',
        }}
      >
        Encontrá tu profesional ideal
      </p>
      <Search onClickSearch={onClickSearch} />
      <section
        style={{
          display: 'flex',
          flexFlow: 'wrap',
        }}
      >
        {professionals.length ? (
          professionals.map((professional, index) => {
            const professionalCardProps = {
              professional: `${professional.nombre} ${professional.apellido}`,
              key: index,
              quantityReviews: professional.quantityReviews,
              avatar: professional.avatar,
              userProfessional: professional.nombreUsuario,
              description: `Lectura profesional: ${professional.genero.descripcion}`,
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
              Oh no! No se encontraron correctores disponibles!
            </p>
          </>
        )}
      </section>
    </>
  );
};

export default Professionals;
