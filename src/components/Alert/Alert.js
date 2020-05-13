/** @format */

import React from "react";
import { Alert } from "antd";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
const UI_Alert = ({ message, type, showIcon, closable, ...othersProps }) => {
  return (
    <Alert
      message={message}
      type={type}
      showIcon={showIcon}
      closable={closable}
      {...othersProps}
    />
  );
};

UI_Alert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  showIcon: PropTypes.bool,
  closable: PropTypes.bool,
};

UI_Alert.defaultProps = {
  type: "success",
  showIcon: true,
  closable: true,
};

export default UI_Alert;
