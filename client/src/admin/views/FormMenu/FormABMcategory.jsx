import React from "react";

import FormCategoriesSpecial from "./FormCategoriesSpecial";
import FormCategories from "./FormCategories";

function FormABMcategory() {
  return (
    <div>
      <h1>Modifica tus categorías</h1>
      <br />
      <FormCategories />
      <br />
      <FormCategoriesSpecial />
    </div>
  );
}

export default FormABMcategory;
