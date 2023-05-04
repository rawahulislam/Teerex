import React from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";

import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

export default function Header(props) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Box className="header">
        <div onClick={() => navigate("/")}>
          <Button>TeeRex Store</Button>
          <button onClick={() => setShow(!show)}>Filter</button>
        </div>
        <div onClick={() => navigate("/cart")}>
          <ShoppingCartRoundedIcon />
        </div>
      </Box>
      {props.Searcher}
      {show && props.filterApply}
    </>
  );
}
