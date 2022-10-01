import React from "react";
import { Form } from "react-bootstrap";

const InputWithLabel = ({
  name,
  value,
  label,
  required = false,
  type = "text",
  placeholder,
  handleChange,
}) => {
  return (
    <Form.Group className="mb-4" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        size="lg"
        type={type}
        name={name}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </Form.Group>
  );
};

export default InputWithLabel;
