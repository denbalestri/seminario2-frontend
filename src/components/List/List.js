import React, { useState } from 'react';
import { MessageOutlined, FileTwoTone, UserOutlined } from '@ant-design/icons';
import { List, Avatar, Space } from 'antd';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import Comment from '../../components/Comment';
import Rating from '@material-ui/lab/Rating';
import { SERVIDOR } from '../../constants/URIs';
const IconText = ({ icon, text, onClick }) => (
  <Space>
    <Button onClick={onClick}>
      {React.createElement(icon)}
      {text}
    </Button>
  </Space>
);

const ListItem = ({
  title,
  href,
  description,
  content,
  avatar,
  usernameProfessional,
}) => {
  const [rating, setRating] = useState(0);
  const textFeedback = 'Enviar devoluci\u00F3n';
  const user = useSelector(state => state.user.user);

  const onSubmit = () => {
    const body = JSON.stringify({
      nombreUsuarioAutor: user.username,
      nombreUsuarioProfesional: usernameProfessional,
      puntuacion: rating.toString(),
      comentario: '',
    });
    fetch(SERVIDOR.DEVOLUCIONPROFESIONAL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    }).catch(error => console.log(error));
  };

  const onChangeRating = (event, rating) => {
    setRating(rating);
  };
  return (
    <List.Item
      key={title}
      style={{ width: '80vw' }}
      actions={[
        <IconText
          icon={FileTwoTone}
          text="Descargar obra"
          key="list-vertical-star-o"
        />,
        <IconText
          icon={MessageOutlined}
          text={textFeedback}
          key="list-vertical-message"
          onClick={onSubmit}
        />,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar icon={<UserOutlined />} src={avatar} size={100} />}
        title={<a href={href}>{title}</a>}
        description={description}
      />
      <p
        style={{
          fontSize: 17,
          fontFamily: 'Ubuntu',
        }}
      >
        Devolucion del profesional
      </p>
      {content}

      <section style={{ display: 'flex', marginTop: 15 }}>
        <p
          style={{
            fontSize: 17,
            fontFamily: 'Ubuntu',
            marginRight: 10,
          }}
        >
          Opinar
        </p>
        <Rating
          name="half-rating-read"
          defaultValue={0}
          precision={0.5}
          onChange={onChangeRating}
          value={rating}
        />
      </section>
    </List.Item>
  );
};

const WorkToReviseList = ({
  listRevisedWorks,
  openComments,
  onClickComment,
  ...othersProps
}) => {
  return (
    <List
      {...othersProps}
      itemLayout="vertical"
      size="large"
      dataSource={listRevisedWorks}
      renderItem={(item, index) => <ListItem key={index} {...item} />}
    />
  );
};

export default WorkToReviseList;
