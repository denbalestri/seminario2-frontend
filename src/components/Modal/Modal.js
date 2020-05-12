/** @format */

import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import Button from "../../components/Button";
import { Input } from "antd";

const { TextArea } = Input;

const UI_Modal = ({ visible, loading, autor, onCancel, onSendMenssage }) => {
  const [feedback, setFeedback] = useState("");

  const onLocalSendMessage = () => {
    onSendMenssage(feedback);
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
      title={`Enviar mensaje a ${autor}`}
      footer={[
        <Button type="" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button type="primary" loading={loading} onClick={onLocalSendMessage}>
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
    </Modal>
  );
};

export default UI_Modal;
