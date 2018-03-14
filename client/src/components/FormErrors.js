import React from 'react';

export const FormErrors = ({ formErrors }) =>
  <div>
    {Object.keys(formErrors).map((formErrorField) => {
      return (
        formErrors[formErrorField].map((error, i) => {
          return (
            <p key={i}>{formErrorField} {error}</p>
          )
        })
      )
    })}
  </div>
