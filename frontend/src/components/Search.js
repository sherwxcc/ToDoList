import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Search = () => {
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search here.."
          className="search-task form-control"
        />
      </div>
    </>
  );
};

export default Search;
