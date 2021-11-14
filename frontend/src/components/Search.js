import { useDispatch } from "react-redux";
import { searchTask } from "../Redux/todo/actions";

const Search = () => {
  const dispatch = useDispatch();

  const handleSearch = (val) => {
    dispatch(searchTask(val));
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search here.."
          onChange={(e) => {
            handleSearch(e.currentTarget.value);
          }}
          className="search-task form-control"
        />
      </div>
    </>
  );
};

export default Search;
