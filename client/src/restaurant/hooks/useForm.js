
import { useEffect, useState } from "react";


export const useForm = (initialForm = {}) => {
  
  const [formState, setFormState] = useState(initialForm);
  const [errors, setErrors] = useState(initialForm);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    setErrors(validate({
        ...formState,
        [name]: value,
    }));
  };

  useEffect(() => {
    setErrors(validate({
      ...formState,
  }))
  
  }, [])
  


//   const onResetForm = () => {
//     setFormState(initialForm);
//   }

  return {
    formState,
    setFormState,
    onInputChange,
    errors,
  };
};


const validate = (inputForm) => {
  const errors = {};

  if ('nameUser' in inputForm) {
    const usernamePattern = /^[a-zA-Z0-9]{5,}$/;
    if (inputForm.nameUser.trim() === '') {
      errors.nameUser = 'Ingrese un nombre';
    } else if (!usernamePattern.test(inputForm.nameUser)) {
      errors.nameUser = 'Mínimo 5 caracteres';
    }
  }

  if ('email' in inputForm) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (inputForm.email.trim() === '') {
      errors.email = 'Ingrese un email';
    } else if (!emailPattern.test(inputForm.email)) {
      errors.email = 'Email no válido';
    }
  }

  if ('password' in inputForm) {
    const passwordPattern = /^.{5,}$/;
    if (inputForm.password.trim() === '') {
      errors.password = 'Ingrese una password';
    } else if (!passwordPattern.test(inputForm.password)) {
      errors.password = 'Mínimo 5 caracteres';
    }
  }

 
  if ('address' in inputForm) {
    const addressRegex = /^(?![\d\W]+$)[\w\d\s#,\/-]+$/;
    if (inputForm.address.trim() === '') {
      errors.address = 'Enter an address';
    } else if (!addressRegex.test(inputForm.address)) {
      errors.address = 'Incorrect format';
    }
  }

  return errors;
};