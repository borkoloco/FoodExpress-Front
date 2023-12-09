
import { useDispatch, useSelector } from "react-redux";
import { setInput, getMenusByName } from '../../../redux/actions/action'
import style from "./Search.module.css"

export const Search = () => {

  const input = useSelector((state) => state.input);
  const distpatch = useDispatch();


  const handleChange = (event) => {
    const { value } = event.target;
    distpatch(setInput(value));
    distpatch(getMenusByName(value));
  }
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      distpatch(getMenusByName(input));
    }
  };




  return (
    <div role="search">
      <input
        className={`form-control ${style.search} `}
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={handleChange}
        onKeyUp={handleKeyPress}
        value={input}
      // name="name"
      />
    </div>
  );
};
