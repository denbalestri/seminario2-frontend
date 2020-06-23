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
import { isEmpty } from 'lodash';

const openNotification = type => {
  notification[type]({
    message: statuses.statusesGroups[type].message,
    description: statuses.statusesGroups[type].description,
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
    fetch(SERVIDOR.TOP_10_GRUPOS_URL, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => response.json())
      .then(groups => {
        if (!groups.error) {
          console.log('GRUPOS', groups);
          setGroups(
            groups.map(group => {
              return {
                image: '../../images/escritor.jpg',
                genre: group.tipoGenero,
                literaryType: group.tipoLiteratura,
                title: group.nombreGrupo,
                idGrupo: group.idGrupo,
                description: group.descripcion,
              };
            })
          );
        } else {
          setGroups([]);
        }
      });
  }, []);

  const onClickCard = title => {
    const group = groups.find(group => group.title === title);
    setSelectedGroup(group);
    const { idGrupo } = group;
    fetch(SERVIDOR.PUBLICACIONES_GRUPO_URL(idGrupo, user.username), {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => response.json())
      .then(posts => {
        console.log('POSTS', posts);
        if (!posts.error) {
          setPostItems(
            posts.map(post => {
              return {
                avatar: '../../images/person5.jpg',
                firstName: post.nombrePublica,
                lastName: post.apellidoPublica,
                userType: 1,
                date: post.fecha,
                post: post.comentario,
                document: post.documento,
              };
            })
          );
        } else {
          setPostItems([]);
        }
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
              image: '../../images/escritor.jpg',
              genre: group.tipoGenero,
              literaryType: group.tipoLiteratura,
              title: group.nombreGrupo,
              idGrupo: group.idGrupo,
              description: group.descripcion,
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
      genero: form.genre,
      avatar: '',
      tipoLiteratura: form.literaryType,
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
      <article style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
        <Paper
          elevation={3}
          style={{ minWidth: 400, display: 'flex', flexDirection: 'column' }}
        >
          <SearchGroup
            onClickCreateGroup={onClickCreateGroup}
            onClickSearchGroup={onClickSearchGroup}
          />
          <aside style={{ overflowY: 'scroll', flexGrow: 1 }}>
            {groups.map((group, index) => {
              return (
                <GroupCard
                  key={index}
                  image={group.image}
                  title={group.title}
                  genre={group.genre}
                  literaryType={group.literaryType}
                  onClickCard={onClickCard}
                  selected={group.title === selectedGroup.title}
                />
              );
            })}
          </aside>
        </Paper>
        <aside style={{ width: '100%', overflowY: 'scroll' }}>
          {isEmpty(selectedGroup) ? (
            ''
          ) : (
            <ContentGroup
              postItems={postItems}
              titleGroup={selectedGroup.title}
              descriptionGroup={selectedGroup.description}
              genreGroup={selectedGroup.genre}
              literaryType={selectedGroup.literaryType}
              idGroup={selectedGroup.idGrupo}
            />
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
