import React from "react";
import Select from "react-select";
import { customStyles } from "./constants/customStyles";
import { languageOptions } from "./constants/languageOptions";

const LanguagesDropdown = ({ onSelectChange,value}) => {
  return (
    <Select
      placeholder={`Filter By Category`}
      options={languageOptions}
      styles={customStyles}
      value={value}
      onChange={onSelectChange}
    />
  );
};

export default LanguagesDropdown;
