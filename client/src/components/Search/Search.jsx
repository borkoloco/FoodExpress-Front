
import { useDispatch, useSelector } from "react-redux";
import { setInput,getMenus } from '../../redux/action/action'
import { useEffect } from "react";


export const Search = () => {

  const input = useSelector((state) => state.input);
  const distpatch = useDispatch();


  const handleChange = ( event ) => {
    const { value } = event.target;
    distpatch(setInput(value))
    distpatch(getMenus(input))
  }

  useEffect(() => {
    if (input.length === 0){
        distpatch(getMenus(input))
    }
  }, [input])
  

  return (
    <form className="d-flex" role="search">
      <input
        className="form-control "
        type="search"
        placeholder="Buscar"
        aria-label="Search"
        onChange={handleChange}
        value={input}
      />
    </form>
  );
};
