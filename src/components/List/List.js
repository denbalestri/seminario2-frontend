import React, { useState } from 'react';
import { FileTwoTone, UserOutlined } from '@ant-design/icons';
import { List, Avatar, Space, Rate } from 'antd';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import Paper from '@material-ui/core/Paper';
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
  const user = useSelector(state => state.user.user);
  const titleText = 'Devolución del profesional';

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

  return (
    <Paper style={{ marginTop: 40, marginRight: 20, marginLeft: 20 }}>
      <List.Item
        key={title}
        style={{ width: '40vw', marginLeft: 20 }}
        actions={[
          <IconText
            icon={FileTwoTone}
            text="Descargar obra"
            key="list-vertical-star-o"
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
          {titleText}
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
          <Rate allowHalf onChange={onSubmit} value={rating} />
        </section>
      </List.Item>
    </Paper>
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
      itemLayout="vertical"
      size="large"
      grid={{ gutter: 20, column: 1 }}
      dataSource={listRevisedWorks}
      renderItem={(item, index) => <ListItem key={index} {...item} />}
      {...othersProps}
    />
  );
};

export default WorkToReviseList;
