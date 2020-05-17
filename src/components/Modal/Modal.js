import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Button from "../../components/Button";
import { Input } from "antd";
import Rating from "../Rating";
const { TextArea } = Input;

const UI_Modal = ({ visible, loading, autor, onCancel, onSendFeedback }) => {
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState("");

  const onLocalSendFeedback = () => {
    const feedbackList = {
      message: feedback,
      file,
    };
    onSendFeedback(feedbackList);
  };

  const handleChange = (info) => {
    setFile(info.file);
    setFileList(info.fileList.slice(-1));
  };

  const uploadProps = {
    name: "obra-corregida",
    customRequest: ({ onSuccess }) => setTimeout(() => onSuccess("ok"), 0),
    fileList,
    onChange: handleChange,
  };

  useEffect(() => {
    setFeedback("");
  }, [visible]);

  const onChange = (e) => {
    const feedback = e.target.value;
    setFeedback(feedback);
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title={`Enviar mensaje a ${autor}`}
      footer={[
        <Button type="" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button
          type="primary"
          loading={loading}
          onClick={onLocalSendFeedback}
          disabled={!feedback}
        >
          Enviar
        </Button>,
      ]}
    >
      <TextArea
        placeholder="Escriba aqui su devolucion de la obra literaria..."
        value={feedback}
        onChange={onChange}
        autoSize={{ minRows: 2, maxRows: 6 }}
      />
      <Rating />
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

export default UI_Modal;
