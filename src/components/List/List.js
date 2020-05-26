import React, { useState } from 'react';
import { MessageOutlined, FileTwoTone, UserOutlined } from '@ant-design/icons';
import { List, Avatar, Space } from 'antd';
import Button from '../../components/Button';
import Comment from '../../components/Comment';
import Rating from '../../components/Rating';
const IconText = ({ icon, text, onClick }) => (
  <Space>
    <Button onClick={onClick}>
      {React.createElement(icon)}
      {text}
    </Button>
  </Space>
);

const ListItem = ({ title, href, description, content, avatar }) => {
  const [openComments, setOpenComments] = useState(false);
  const textFeedback = 'Enviar devoluci\u00F3n';
  const onClickComment = () => {
    setOpenComments(!openComments);
  };

  const onCancel = () => {
    setOpenComments(false);
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
          onClick={onClickComment}
        />,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar icon={<UserOutlined />} src={avatar} size={100} />}
        title={<a href={href}>{title}</a>}
        description={description}
      />
      {content}
      {openComments && (
        <section>
          <Comment onCancel={onCancel} avatar={avatar} datetime={Date.now()} />
          <Rating />
        </section>
      )}
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
