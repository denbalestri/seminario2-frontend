import React, { useState } from 'react';
import { MessageOutlined, FileTwoTone, UserOutlined } from '@ant-design/icons';
import { List, Avatar, Space } from 'antd';
import Button from '../../components/Button';
import Comment from '../../components/Comment';

const IconText = ({ icon, text, onClick }) => (
  <Space>
    <Button onClick={onClick}>
      {React.createElement(icon)}
      {text}
    </Button>
  </Space>
);

const ListItem = ({ title, href, description, content }) => {
  const [openComments, setOpenComments] = useState(false);

  const onClickComment = () => {
    setOpenComments(!openComments);
  };

  const onCancel = () => {
    setOpenComments(false);
  };

  return (
    <List.Item
      key={title}
      actions={[
        <IconText
          icon={FileTwoTone}
          text="Archivo"
          key="list-vertical-star-o"
        />,
        <IconText
          icon={MessageOutlined}
          text="Comentar"
          key="list-vertical-message"
          onClick={onClickComment}
        />,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar icon={<UserOutlined />} />}
        title={<a href={href}>{title}</a>}
        description={description}
      />
      {content}
      {openComments && <Comment onCancel={onCancel} />}
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
