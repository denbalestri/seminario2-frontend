import React from "react";
import { Select } from "antd";
const { Option } = Select;
const UI_Select = ({ placeholder, optionItems, valueSelected, onChange }) => {
  const onLocalChange = (value) => {
    onChange(value);
  };
  return (
    <Select
      placeholder={placeholder}
      onChange={onLocalChange}
      allowClear
      value={valueSelected}
    >
      {optionItems.map((item, index) => {
        return (
          <Option value={item} key={index}>
            {item}
          </Option>
        );
      })}
    </Select>
  );
};

export default UI_Select;
