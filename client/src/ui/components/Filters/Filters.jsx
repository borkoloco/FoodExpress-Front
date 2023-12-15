import { useEffect, useState } from "react";
import { Search } from "../Search/Search";
import Style from "./Filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  filters,
  getSpecialties,
  getTypesOfFood,
  orderMenu,
} from "../../../redux/actions/action";

export const Filters = ({ responsive = false }) => {
  const dispatch = useDispatch();
  const filterGlobalState = useSelector((state) => state.filterGlobalState);
  const allSpecialties = useSelector((state) => state.allSpecialties);
  const allTypesOfFood = useSelector((state) => state.allTypesOfFood);
  const [localFilter, setLocalFilter] = useState({
    specialties: "",
    types: "",
    availability: "",
  });

  useEffect(() => {
    if (allSpecialties.length === 0) {
      dispatch(getSpecialties());
    }

    if (allTypesOfFood.length === 0) {
      dispatch(getTypesOfFood());
    }
  }, []);
  const handleFilters = (element) => {
    const name = element.target.name;
    let value = element.target.value;

    setLocalFilter({
      ...localFilter,
      [name]: value,
    });

    dispatch(filters({ ...localFilter, [name]: value }));
  };
  const handleOrder = (element) => {
    dispatch(orderMenu(element.target.value));
  };

  return (
    <>
      {
        !responsive ? (<div className={`accordion ${Style.accordion}`} id="accordionExample">
          <div className={`accordion-item `}>
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Filters
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <Search />
              </div>
              <div className="accordion-body">
                <p>Specialties</p>
                <select
                  className="form-select form-select-sm"
                  aria-label="Small select example"
                  name="specialties"
                  defaultValue={filterGlobalState.specialties}
                  onChange={(el) => handleFilters(el)}
                >
                  <option value="all">All</option>
                  {allSpecialties &&
                    allSpecialties.map((special, index) => {
                      return (
                        <option value={special.name} key={index}>
                          {special.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="accordion-body">
                <p>Types</p>
                <select
                  className="form-select form-select-sm"
                  aria-label="Small select example"
                  name="types"
                  defaultValue={filterGlobalState.typesOfFood}
                  onChange={(el) => handleFilters(el)}
                >
                  <option value="all">All</option>
                  {allTypesOfFood &&
                    allTypesOfFood.map((typeFood, index) => {
                      return (
                        <option value={typeFood.name} key={index}>
                          {typeFood.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              {/* <div className="accordion-body">
              <p>Availables</p>
              <select
                className="form-select form-select-sm"
                aria-label="Small select example"
                name="availability"
                onChange={(el) => handleFilters(el)}
                defaultValue={filterGlobalState.availability}
              >
                <option value="all">All</option>
                <option value={1}>Available</option>
                <option value={0}>No Available</option>
              </select>
            </div> */}
              <div className="accordion-body">
                <p>Order by:</p>
                <select
                  className="form-select form-select-sm"
                  aria-label="Small select example"
                  onChange={(el) => handleOrder(el)}
                >
                  <option value="nameUp">AZ</option>
                  <option value="nameDown">ZA</option>
                  <option value="priceUp">Price &uarr;</option>
                  <option value="priceDown">Price &darr;</option>
                </select>
              </div>
            </div>
          </div>
        </div>) : (<div className={`filters-row ${Style.containerFilters}`}>
          <div className={`filter-item ${Style.filter}`}>
            <Search />
          </div>
          <div className={`filter-item ${Style.filter}`}>
            <select
              className={`form-select form-select-sm ${Style.select}`}
              aria-label="Specialties"
              name="specialties"
              defaultValue={filterGlobalState.specialties}
              onChange={(el) => handleFilters(el)}
            >
              <option value="all">All specialties</option>
              {allSpecialties &&
                allSpecialties.map((special, index) => (
                  <option value={special.name} key={index}>
                    {special.name}
                  </option>
                ))}
            </select>
          </div>
          <div className={`filter-item ${Style.filter}`}>
            <select
              className={`form-select form-select-sm ${Style.select}`}
              aria-label="Types of Food"
              name="types"
              defaultValue={filterGlobalState.typesOfFood}
              onChange={(el) => handleFilters(el)}
            >
              <option value="all">All types</option>
              {allTypesOfFood &&
                allTypesOfFood.map((typeFood, index) => (
                  <option value={typeFood.name} key={index}>
                    {typeFood.name}
                  </option>
                ))}
            </select>
          </div>
          {/* <div className={`filter-item ${Style.filter}`}>
          <select
            className={`form-select form-select-sm ${Style.select}`}
            aria-label="Availability"
            name="availability"
            onChange={(el) => handleFilters(el)}
            defaultValue={filterGlobalState.availability}
          >
            <option value="all">All</option>
            <option value={1}>Available</option>
            <option value={0}>No Available</option>
          </select>
        </div> */}
          <div className={`filter-item ${Style.filter}`}>
            <select
              className={`form-select form-select-sm ${Style.select}`}
              aria-label="Order"
              onChange={(el) => handleOrder(el)}
            >
              <option value="nameUp">AZ</option>
              <option value="nameDown">ZA</option>
              <option value="priceUp">Price &uarr;</option>
              <option value="priceDown">Price &darr;</option>
            </select>
          </div>
        </div>)
      }

    </>
  );
};
