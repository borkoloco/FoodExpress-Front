import React, { useEffect, useState } from "react";
import Style from "./Home.module.css";
import Cards from "../../components/Menus/Cards/Cards";
import { Search } from "../../../ui/components/Search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMenu,
  getSpecialties,
  getTypesOfFood,
  filters,
  orderMenu,
} from "../../../redux/actions/action";
import { Loading } from "../../../ui/components/Loading/Loading";


function Home() {
  const dispatch = useDispatch();
  const allMenu = useSelector((state) => state.allMenu);
  const filterGlobalState = useSelector((state) => state.filterGlobalState)
  const allSpecialties = useSelector((state) => state.allSpecialties);
  const allTypesOfFood = useSelector((state) => state.allTypesOfFood);
  const [localFilter, setLocalFilter] = useState({
    specialties: "",
    types: "",
    availability: "",
  });

  const [force, setForce] = useState(true);
  useEffect(() => {
    setForce(!force);
  }, [allMenu]);

  useEffect(() => {
    if (allMenu.length === 0) {
      dispatch(getAllMenu());
    }
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
  const filteredMenu = allMenu.filter(menu => menu.available);
  return (
    <div className={`${Style.bigDiv} ${Style.background_home}`}>
      <div className={Style.barDiv}>
        <div className={`accordion ${Style.accordion}`} id="accordionExample">
          <div className={`accordion-item ${Style.accordionItem}`}>
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Filter
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body"><Search /></div>
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

              <div className="accordion-body">
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
              </div>
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
        </div>
      </div>

      <div className={Style.cardsDiv}>
        {filteredMenu && allMenu.length > 0 ? (
          <Cards props={filteredMenu} />
        ) : (
          <Loading/>
        )}
      </div>
      
    </div>

  );
}

export default Home;

