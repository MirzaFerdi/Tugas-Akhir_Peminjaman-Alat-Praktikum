import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage, Field } from "formik";

const FormField = ({ formType, formName, labelText, ...props }) => {  
  return (
    <React.Fragment>
      <div className="relative mb-1">
        <Field
          type={formType}
          autoComplete="off"
          required
          name={formName}
          id={`floating-outlined-${formName}`}
          className="block px-2.5 pb-2.5 pt-3 lg:pt-4 w-full text-sm bg-white text-gray-600 tracking-widest bg-transparent rounded-md border-2 border-blue-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-300 peer"
          placeholder=" "          
          {...props}
        />
        <label
          htmlFor={`floating-outlined-${formName}`}
          className="tracking-wider cursor-text absolute text-xs lg:text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-inherit px-2 peer-focus:px-2 bg-white peer-focus:bg-white peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          {labelText}
        </label>
      </div>
      <div className="text-xs tracking-wide text-red-500">
        <ErrorMessage name={formName} />
      </div>
    </React.Fragment>
  );
};

FormField.propTypes = {
  formName: PropTypes.any,
  formType: PropTypes.any,
  labelText: PropTypes.any,
  onChange: PropTypes.func,
};

export default FormField;
