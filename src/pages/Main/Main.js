import React from 'react';
import MainProfessional from '../../components/MainProfessional';
import MainLayout from '../../components/Layout';
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
    rating: 5,
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
    rating: 2,
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
    rating: 5,
    quantityReviews: 120,
    description:
      'Mi nombre es Nicolas y mi especializacion es la Poesia. Escribo desde los 10 a\u00F1os. Soy profesor en la UBA en la catedra de literatura contempora\u00F1ea.',
  },
  {
    nombre: 'Angela',
    apellido: 'Luz',
    nombreUsuario: 'srico',
    avatar: '../../../images/person6.jpg',
    genero: { descripcion: 'Terror, Aventuras' },
    id: 4,
    rating: 4,
    quantityReviews: 80,
    description:
      'Mi nombre es Angela Luz y mi especializacion es las novelas de Terror y Aventuras. Escribo desde los 10 a\u00F1os. Soy profesor en la UBA en la catedra de literatura contempora\u00F1ea.',
  },
  {
    nombre: 'Eduardo',
    apellido: 'Lopez',
    nombreUsuario: 'srico',
    avatar: '../../../images/person9.jpg',
    genero: { descripcion: 'Aventuras' },
    id: 5,
    rating: 4.5,
    quantityReviews: 80,
    description:
      'Mi nombre es Eduardo Lopez y mi especializacion es las novelas de Aventuras. Escribo desde los 10 a\u00F1os. Soy profesor en la UBA en la catedra de literatura contempora\u00F1ea.',
  },
  {
    nombre: 'Mariana',
    apellido: 'Perez',
    nombreUsuario: 'srico',
    avatar: '../../../images/person8.jpg',
    genero: { descripcion: 'Aventuras' },
    id: 6,
    rating: 5,
    quantityReviews: 80,
    description:
      'Mi nombre es Mariana Perez y mi especializacion es las novelas de Aventuras. Escribo desde los 10 a\u00F1os. Soy profesor en la UBA en la catedra de literatura contempora\u00F1ea.',
  },
  {
    nombre: 'Mario',
    apellido: 'Enverz',
    nombreUsuario: 'srico',
    avatar: '../../../images/person10.jpg',
    genero: { descripcion: 'Aventuras' },
    id: 7,
    rating: 5,
    quantityReviews: 80,
    description:
      'Mi nombre es Mariana Perez y mi especializacion es las novelas de Aventuras. Escribo desde los 10 a\u00F1os. Soy profesor en la UBA en la catedra de literatura contempora\u00F1ea.',
  },
  {
    nombre: 'Lucas',
    apellido: 'Sebera',
    nombreUsuario: 'srico',
    avatar: '../../../images/person11.jpg',
    genero: { descripcion: 'Aventuras' },
    id: 8,
    rating: 5,
    quantityReviews: 80,
    description:
      'Mi nombre es Mariana Perez y mi especializacion es las novelas de Aventuras. Escribo desde los 10 a\u00F1os. Soy profesor en la UBA en la catedra de literatura contempora\u00F1ea.',
  },
  {
    nombre: 'Catalina',
    apellido: 'Perez',
    nombreUsuario: 'srico',
    avatar: '../../../images/person12.jpg',
    genero: { descripcion: 'Aventuras' },
    id: 9,
    rating: 5,
    quantityReviews: 80,
    description:
      'Mi nombre es Mariana Perez y mi especializacion es las novelas de Aventuras. Escribo desde los 10 a\u00F1os. Soy profesor en la UBA en la catedra de literatura contempora\u00F1ea.',
  },
];
const Main = () => {
  const classes = useStyles();
  const onClickSearch = () => {};
  return (
    <MainLayout>
      <p className={classes.title}>Encontrá tu profesional ideal</p>
      <section className={classes.search}>
        {' '}
        <Search onClickSearch={onClickSearch} />
      </section>
      <section className={classes.containerMain}>
        {professionalsList.map((professional, index) => {
          return (
            <MainProfessional
              professional={`${professional.nombre} ${professional.apellido}`}
              avatar={professional.avatar}
              rating={professional.rating}
            />
          );
        })}
      </section>
    </MainLayout>
  );
};

export default Main;
