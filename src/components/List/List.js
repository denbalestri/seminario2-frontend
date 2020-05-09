/** @format */

import React, { Fragment } from "react";
import { List, Avatar, Space } from "antd";
import Button from "../../components/Button";
import Comment from "../../components/Comment";
import { MessageOutlined, FileTwoTone } from "@ant-design/icons";

const IconText = ({ icon, text, onClick }) => (
  <Space>
    <Button onClick={onClick}>
      {React.createElement(icon)}
      {text}
    </Button>
  </Space>
);

const UI_List = ({
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
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={listRevisedWorks}
      renderItem={(item) => (
        <Fragment>
          <List.Item
            key={item.title}
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
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        </Fragment>
      )}
    />
  );
};

export default UI_List;
