
import { useState } from "react";


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


//   const onResetForm = () => {
//     setFormState(initialForm);
//   }

  return {
    formState,
    onInputChange,
    errors,
  };
};


const validate = (inputForm) => {
    const errors = {};

// Validar el formato del username
const usernamePattern = /^[a-zA-Z0-9]{5,}$/;
  if (inputForm.username && !usernamePattern.test(inputForm.username)) {
    errors.username = 'Mínimo 5 caracteres';
  }

  // Validar el formato del email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (inputForm.email && !emailPattern.test(inputForm.email)) {
    errors.email = 'Email no válido';
  }

  // Validar el formato de la contraseña
  const passwordPattern = /^.{5,}$/;
  if (inputForm.password && !passwordPattern.test(inputForm.password)) {
    errors.password =
      'Mínimo 5 caracteres';
  }
  // const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  // if (inputForm.password && !passwordPattern.test(inputForm.password)) {
  //   errors.password =
  //     'Incluye mayúsculas, letras y números';
  // }

  

  return errors;
}