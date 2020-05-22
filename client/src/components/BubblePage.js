import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getColors = () => {
    axiosWithAuth()
      .get("/api/colors")
      .then(res => {
        setColorList(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getColors();
  }, []);

  return (
    <>
      {isLoading && <h2>Loading Color Data...</h2>}
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
