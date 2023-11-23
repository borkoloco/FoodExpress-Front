
import { useDispatch, useSelector } from "react-redux";
import { setInput,getMenusByName } from '../../../redux/actions/action'
import { useEffect } from "react";


export const Search = () => {

  const input = useSelector((state) => state.input);
  const distpatch = useDispatch();


  const handleChange = ( event ) => {
    const { value } = event.target;
    distpatch(setInput(value));
    distpatch(getMenusByName(input));
  }
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      distpatch(getMenusByName(input));
    }
  };

  useEffect(() => {
    if (input.length === 0){
        distpatch(getMenusByName(input));
    }
  }, [input])
  

  return (
    <div className="d-flex" role="search">
      <input
        className="form-control "
        type="search"
        placeholder="Buscar"
        aria-label="Search"
        onChange={handleChange}
        onKeyUp={handleKeyPress}
        value={input}
        // name="name"
      />
    </div>
  );
};
