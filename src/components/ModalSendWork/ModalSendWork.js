import React, { useState, useEffect } from "react";
import { Modal, Upload, Input } from "antd";
import { UploadOutlined, ReadOutlined } from "@ant-design/icons";
import isEmpty from "lodash/isEmpty";
import Button from "../../components/Button";

const ModalSendWork = ({
  visible,
  loading,
  professional,
  onCancel,
  onSendWork,
}) => {
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState({});
  const [nameWork, setNameWork] = useState("");

  useEffect(() => {
    setFile({});
    setFileList([]);
  }, [visible]);

  const onLocalSendWork = () => {
    const work = {
      nameWork,
      file,
    };
    onSendWork(work);
  };

  const handleChange = (info) => {
    setFile(info.file);
    setFileList(info.fileList.slice(-1));
  };

  const uploadProps = {
    name: "obra",
    customRequest: ({ onSuccess }) => setTimeout(() => onSuccess("ok"), 0),
    fileList,
    onChange: handleChange,
  };

  useEffect(() => {
    setNameWork("");
  }, [visible]);

  const onChangeNameWork = (e) => {
    const nameWork = e.target.value;
    setNameWork(nameWork);
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title={`Enviar obra a ${professional}`}
      footer={[
        <Button type="" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button
          type="primary"
          loading={loading}
          onClick={onLocalSendWork}
          disabled={isEmpty(file)}
        >
          Enviar
        </Button>,
      ]}
    >
      <Input
        placeholder="Nombre de la obra..."
        prefix={<ReadOutlined />}
        value={nameWork}
        style={{ marginTop: 10, width: 300 }}
        onChange={onChangeNameWork}
      />
      <section style={{ marginTop: 20 }}>
        <Upload {...uploadProps} onChange={handleChange}>
          <Button type="">
            <UploadOutlined /> Elegir archivo
          </Button>
        </Upload>
      </section>
    </Modal>
  );
};

export default ModalSendWork;
