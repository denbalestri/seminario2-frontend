import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchGroup from '../../components/SearchGroups';
import GroupCard from '../../components/GroupCard';
import MainLayout from '../../components/Layout';
import Paper from '@material-ui/core/Paper';
import ContentGroup from '../../components/ContentGroup';
import ModalCreateGroup from '../../components/ModalCreateGroup';
import { SERVIDOR } from '../../constants/URIs';
import { notification } from 'antd';
import statuses from '../../constants/Notification';

const postItemsGroup = [
  {
    avatar: '../../images/person5.jpg',
    firstName: 'Nicolas',
    lastName: 'Fuentes',
    userType: 1,
    post:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently',
  },
  {
    avatar: '../../images/person8.jpg',
    firstName: 'Ana',
    lastName: 'Luz',
    userType: 1,
    post:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently',
  },
  {
    avatar: '../../images/person9.jpg',
    firstName: 'Eduardo',
    lastName: 'Carrozo',
    userType: 2,
    post:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently',
  },
  {
    avatar: '../../images/person4.jpg',
    firstName: 'Angela',
    userType: 2,
    lastName: 'Barro',
    post:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently',
  },
];

const groupsItems = [
  {
    image: '../../images/escritor.jpg',
    genre: 'Romantico, Terror, Suspenso',
    literaryTypes: 'Cuentos, Novelas, Cuentos Cortos',
    title: 'Escritores Aficionados',
  },
  {
    image: '../../images/corrector.jpg',
    genre: 'Romantico, Terror, Suspenso',
    literaryTypes: 'Cuentos, Novelas, Cuentos Cortos',
    title: 'Escritores amantes de las novelas Romanticas',
  },
  {
    image: '../../images/smpbooks2.jpg',
    genre: 'Romantico, Terror, Suspenso',
    literaryTypes: 'Cuentos, Novelas, Cuentos Cortos',
    title: 'Novelas de suspenso y terror',
  },
  {
    image: '../../images/escritor.jpg',
    genre: 'Romantico, Terror, Suspenso',
    literaryTypes: 'Cuentos, Novelas, Cuentos Cortos',
    title: 'Escritores y Poesias',
  },
  {
    image: '../../images/escritor.jpg',
    genre: 'Romantico, Terror, Suspenso',
    literaryTypes: 'Cuentos, Novelas, Cuentos Cortos',
    title: 'Literatura moderna ',
  },
  {
    image: '../../images/escritor.jpg',
    genre: 'Romantico, Terror, Suspenso',
    literaryTypes: 'Cuentos, Novelas, Cuentos Cortos',
    title: 'Cuentos y Novelas infantiles',
  },
  {
    image: '../../images/escritor.jpg',
    genre: 'Romantico, Terror, Suspenso',
    literaryTypes: 'Cuentos, Novelas, Cuentos Cortos',
    title: 'Poesias romanticas',
  },
  {
    image: '../../images/escritor.jpg',
    genre: 'Romantico, Terror, Suspenso',
    literaryTypes: 'Cuentos, Novelas, Cuentos Cortos',
    title: 'Novelas romanticas',
  },
];

const openNotification = type => {
  notification[type]({
    message: statuses.statusesProfessional[type].message,
    description: statuses.statusesProfessional[type].description,
  });
};

const Groups = () => {
  const [titleGroup, setTitleGroup] = useState('');
  const [postItems, setPostItems] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const user = useSelector(state => state.user.user);
  useEffect(() => {
    //first render set for default first group
    setTitleGroup('Escritores amantes de las novelas Romanticas');
    setPostItems(postItemsGroup);
  }, []);

  const onClickCard = title => {
    setSelectedCard(title);
    //send to backend id group and it will return post items and title group
  };
  const onClickCreateGroup = () => {
    setVisibleModal(true);
  };

  const onCancelModal = () => {
    setVisibleModal(false);
  };

  const onSubmitCreateGroup = form => {
    const body = JSON.stringify({
      descripcion: form.description,
      nombreUsuarioOwner: user.username,
      nombreGrupo: form.titleGroup,
      genero: form.genre,
      avatar: '',
      tipoLiteratura: form.literaryTypes,
    });
    fetch(SERVIDOR.CREARGRUPO_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })
      .then(response => {
        if (response.status === 200) {
          openNotification('success');
        } else {
          openNotification('error');
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false);
        setVisibleModal(false);
      });
  };
  return (
    <MainLayout>
      <article style={{ display: 'flex', height: '100%' }}>
        <Paper elevation={3} style={{ width: '29vw' }}>
          <SearchGroup onClickCreateGroup={onClickCreateGroup} />
          <aside style={{ overflowY: 'scroll', height: 800 }}>
            {groupsItems.map((group, index) => {
              return (
                <GroupCard
                  key={index}
                  image={group.image}
                  title={group.title}
                  genre={group.genre}
                  literaryTypes={group.literaryTypes}
                  onClickCard={onClickCard}
                  selected={group.title === selectedCard}
                />
              );
            })}
          </aside>
        </Paper>
        <aside style={{ width: '100%', overflowY: 'scroll' }}>
          {postItems.length > 0 ? (
            <ContentGroup postItems={postItems} titleGroup={titleGroup} />
          ) : (
            ''
          )}
        </aside>
        <section>
          <ModalCreateGroup
            visible={visibleModal}
            onCancel={onCancelModal}
            onSubmit={onSubmitCreateGroup}
            loading={loading}
          />
        </section>
      </article>
    </MainLayout>
  );
};

export default Groups;
