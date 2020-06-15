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

const openNotification = type => {
  notification[type]({
    message: statuses.statusesProfessional[type].message,
    description: statuses.statusesProfessional[type].description,
  });
};

const Groups = () => {
  const [selectedGroup, setSelectedGroup] = useState({});
  const [postItems, setPostItems] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    //first render set for default first group
  }, []);

  const onClickCard = title => {
    const group = groups.find(group => group.title === title);
    setSelectedGroup(group);
    const { id } = group;
    fetch(SERVIDOR.PUBLICACIONES_GRUPO_URL(id), {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => response.json())
      .then(posts => {
        setPostItems(
          posts.map(post => {
            return {
              avatar: '../../images/person5.jpg',
              firstName: post.usuarioPublica,
              lastName: 'Fuentes',
              userType: 1,
              date: post.fecha,
              post: post.comentario,
              document: post.documento,
            };
          })
        );
      });
  };

  const onClickCreateGroup = () => {
    setVisibleModal(true);
  };

  const onCancelModal = () => {
    setVisibleModal(false);
  };

  const onClickSearchGroup = name => {
    fetch(SERVIDOR.BUSCAR_GRUPO_URL(name), {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => response.json())
      .then(groups =>
        setGroups(
          groups.map(group => {
            return {
              image: group.avatar,
              genre: group.tipoGenero,
              literaryTypes: group.tipoLiteratura,
              title: group.nombreGrupo,
              idGrupo: group.idGrupo,
            };
          })
        )
      );
  };

  const onSubmitCreateGroup = form => {
    const body = JSON.stringify({
      descripcion: form.description,
      nombreUsuarioOwner: user.username,
      nombreGrupo: form.titleGroup,
      genero: form.genres,
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
          <SearchGroup
            onClickCreateGroup={onClickCreateGroup}
            onClickSearchGroup={onClickSearchGroup}
          />
          <aside style={{ overflowY: 'scroll', height: 800 }}>
            {groups.map((group, index) => {
              return (
                <GroupCard
                  key={index}
                  image={group.image}
                  title={group.title}
                  genre={group.genre}
                  literaryTypes={group.literaryTypes}
                  onClickCard={onClickCard}
                  selected={group.title === selectedGroup.title}
                />
              );
            })}
          </aside>
        </Paper>
        <aside style={{ width: '100%', overflowY: 'scroll' }}>
          {postItems.length > 0 ? (
            <ContentGroup
              postItems={postItems}
              titleGroup={selectedGroup.title}
              idGrupo={selectedGroup.idGrupo}
            />
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
