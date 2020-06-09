import React, { useState } from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import moment from 'moment';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value, onCancel }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="cancel"
        onClick={onCancel}
        type=""
        style={{ marginRight: 10 }}
      >
        Cancelar
      </Button>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Enviar comentario
      </Button>
    </Form.Item>
  </div>
);

const UI_Comment = ({ onCancel, onSubmit }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const handleChange = e => {
    const comment = e.target.value;
    setComment(comment);
  };

  const onLocalSubmit = () => {
    //next data is not sent to backend yet
    setComments([
      {
        author: 'Nicolas Fuentes',
        avatar: '',
        content: <p>{comment}</p>,
        datetime: moment().fromNow(),
      },
      ...comments,
    ]);

    onSubmit();
  };
  return (
    <div>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={<Avatar icon={<UserOutlined />} alt="usuario" />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={onLocalSubmit}
            onCancel={onCancel}
            value={comment}
          />
        }
      />
    </div>
  );
};

export default UI_Comment;
