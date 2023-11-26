import React from "react";

import FormCategoriesSpecial from "./FormCategoriesSpecial";
import FormCategories from "./FormCategories";

function FormABMcategory() {
  return (
    <div className="d-flex flex-column align-items-center">
      {/* <h1>Modifica tus categorías</h1> */}
      <FormCategories />
      <br />
      <FormCategoriesSpecial />
      <br />
    </div>
  );
}

export default FormABMcategory;
