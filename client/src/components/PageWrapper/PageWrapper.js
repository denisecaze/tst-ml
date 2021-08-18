import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/Logo_ML.png";
import search from "../../assets/ic_Search.png";
import "../../App.css";

const PageWrapper = () => {
  const [searchItems, setSearchItems] = useState([]);
  console.log("searchItems: ", searchItems);

  const handleSearch = async () => {
    const query = "mesa";
    const { data } = await axios.get("/api/items", {
      params: { q: query },
    });
    setSearchItems(data);
  };

  const fetchItemData = async () => {
    const id = "MLB1191972200";
    const { data } = await axios.get(`/api/items/${id}`);
    console.log("data: ", data);
  };

  useEffect(() => {
    fetchItemData();
  }, []);

  return (
    <>
      <div className="search-wrapper">
        <img src={logo} alt="" aria-hidden className="logo" />
        <input
          type="text"
          placeholder="Nunca dejes de buscar"
          className="input-field"
        />
        <button type="button" className="search-button" onClick={handleSearch}>
          <img src={search} alt="" aria-hidden className="logo" />
        </button>
      </div>
      <div>
        {/* eslint-disable-next-line array-callback-return */}
        {searchItems?.map((elem) => (
          <button
            type="button"
            key={elem.items.title}
            onClick={() => console.log("clicou no item")}
          >
            {elem.items.title}
          </button>
        ))}
      </div>
    </>
  );
};

export default PageWrapper;
