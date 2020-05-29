import React from 'react';
import MainProfessional from '../../components/MainProfessional';
import MainLayout from '../../components/Layout';
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
  {
    nombre: 'Angela',
    apellido: 'Luz',
    nombreUsuario: 'srico',
    avatar: '../../../images/person6.jpg',
    genero: { descripcion: 'Terror, Aventuras' },
    id: 4,
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
    id: 4,
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
    id: 4,
    quantityReviews: 80,
    description:
      'Mi nombre es Mariana Perez y mi especializacion es las novelas de Aventuras. Escribo desde los 10 a\u00F1os. Soy profesor en la UBA en la catedra de literatura contempora\u00F1ea.',
  },
];
const Main = () => {
  const classes = useStyles();
  return (
    <MainLayout>
      <p className={classes.title}>Encontrá tu profesional ideal</p>
      <section style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {professionalsList.map((professional, index) => {
          return (
            <MainProfessional
              professional={`${professional.nombre} ${professional.apellido}`}
              avatar={professional.avatar}
            />
          );
        })}
      </section>
    </MainLayout>
  );
};

export default Main;
