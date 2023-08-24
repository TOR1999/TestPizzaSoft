import React from "react";
import InputMask from "react-input-mask";
import { Input } from "antd";

export const MaskInput = ({ mask, value, onChange, ...props }) => (
  <InputMask mask={mask} value={value} onChange={onChange} {...props}>
    {(inputProps) => <Input {...inputProps} />}
  </InputMask>
);
