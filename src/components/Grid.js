import * as React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  TextField,
  InputAdornment
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
export default function MediaCard() {
  const [cartItems, SetCart] = useState([]);
  const [search, setSearch] = useState("");

  const CartData = async () => {
    const res = await axios.get(
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
    );
    let rest = await res;
    SetCart(rest.data);
  };
  useEffect(() => {
    CartData();
    let itemsList = [];
    localStorage.setItem("productsList", JSON.stringify(itemsList));
  }, []);

  if (!cartItems) return null;
  function handleCheckBox(e) {
    return setSearch(e.target.value);
  }
  function handleAddToCart(price, name, quantity, id) {
    let items = { price, name, quantity, id };
    let itemsList = [];

    const getCarStorage = localStorage.getItem("productsList");
    if (getCarStorage) {
      itemsList = JSON.parse(localStorage.getItem("productsList"));
      itemsList.push(items);
      localStorage.setItem("productsList", JSON.stringify(itemsList));
    } else {
      itemsList.push(items);
      localStorage.setItem("productsList", JSON.stringify(itemsList));
    }
    alert("Item added to Cart");
  }
  const filterView = (
    <Grid
      item
      lg={4}
      md={6}
      xs={12}
      display={{ xs: "block", md: "none", lg: "none" }}
    >
      <div className="sidepannel">
        <FormGroup>
          COLOR
          <FormControlLabel
            control={<Checkbox />}
            value="Red"
            label="Red"
            onChange={handleCheckBox}
          />
          <FormControlLabel
            control={<Checkbox />}
            value="Blue"
            label="Blue"
            onChange={handleCheckBox}
          />
          <FormControlLabel
            control={<Checkbox />}
            value="Green"
            label="Green"
            onChange={handleCheckBox}
          />
          GENDER
          <FormControlLabel
            control={<Checkbox />}
            value="Men"
            label="Men"
            onChange={handleCheckBox}
          />
          <FormControlLabel
            control={<Checkbox />}
            value="Women"
            label="Women"
            onChange={handleCheckBox}
          />
          Price
          <FormControlLabel
            control={<Checkbox />}
            value="250"
            label="0-Rs250"
            onChange={handleCheckBox}
          />
          <FormControlLabel
            control={<Checkbox />}
            value="450"
            label="Rs251-450"
            onChange={handleCheckBox}
          />
          <FormControlLabel
            control={<Checkbox />}
            value="450"
            label="Rs450"
            onChange={handleCheckBox}
          />
          TYPE
          <FormControlLabel
            control={<Checkbox />}
            value="Polo"
            label="Polo"
            onClick={handleCheckBox}
          />
          <FormControlLabel
            control={<Checkbox />}
            value="Hoodie"
            label="Hoodie"
            onClick={handleCheckBox}
          />
          <FormControlLabel
            control={<Checkbox />}
            value="Basic"
            label="Basic"
            onClick={handleCheckBox}
          />
        </FormGroup>
      </div>
    </Grid>
  );
  return (
    <>
      <Header filterApply={filterView} />
      <Grid container spacing={2}>
        <Grid
          item
          lg={4}
          md={6}
          xs={12}
          display={{ xs: "none", md: "block", lg: "block" }}
        >
          <div className="sidepannel">
            <FormGroup>
              COLOR
              <FormControlLabel
                control={<Checkbox />}
                value="Red"
                label="Red"
                onChange={handleCheckBox}
              />
              <FormControlLabel
                control={<Checkbox />}
                value="Blue"
                label="Blue"
                onChange={handleCheckBox}
              />
              <FormControlLabel
                control={<Checkbox />}
                value="Green"
                label="Green"
                onChange={handleCheckBox}
              />
              GENDER
              <FormControlLabel
                control={<Checkbox />}
                value="Men"
                label="Men"
                onChange={handleCheckBox}
              />
              <FormControlLabel
                control={<Checkbox />}
                value="Women"
                label="Women"
                onChange={handleCheckBox}
              />
              Price
              <FormControlLabel
                control={<Checkbox />}
                value="250"
                label="0-Rs250"
                onChange={handleCheckBox}
              />
              <FormControlLabel
                control={<Checkbox />}
                value="450"
                label="Rs251-450"
                onChange={handleCheckBox}
              />
              <FormControlLabel
                control={<Checkbox />}
                value="450"
                label="Rs450"
                onChange={handleCheckBox}
              />
              TYPE
              <FormControlLabel
                control={<Checkbox />}
                value="Polo"
                label="Polo"
                onClick={handleCheckBox}
              />
              <FormControlLabel
                control={<Checkbox />}
                value="Hoodie"
                label="Hoodie"
                onClick={handleCheckBox}
              />
              <FormControlLabel
                control={<Checkbox />}
                value="Basic"
                label="Basic"
                onClick={handleCheckBox}
              />
            </FormGroup>
          </div>
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <>
            <TextField
              onChange={handleCheckBox}
              className="search-mobile"
              size="small"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search color="primary" />
                  </InputAdornment>
                )
              }}
              placeholder="Search for items/categories"
              name="search"
            />

            <Grid container spacing={2}>
              {cartItems
                .filter((item) => {
                  if (!isNaN(search)) {
                    if (search === "") return item;
                    else return item.price <= search;
                  } else {
                    if (search === "") {
                      return item;
                    } else {
                      if (!item.name.includes(search))
                        return item.gender.includes(search);
                      else {
                        if (!item.gender.includes(search))
                          return item.name.includes(search);
                        else return item.gender.includes(search);
                      }
                    }
                  }
                })
                .map((product) => (
                  <Grid item xs={12} md={6} lg={4} key={product.id}>
                    <Card>
                      <CardMedia
                        component="img"
                        image={product.imageURL}
                        alt="some"
                      />
                      <CardContent>
                        <Typography color="black" variant="subtitle">
                          {product.name}
                        </Typography>
                        <Typography
                          color="black"
                          fontWeight="bold"
                          variant="h6"
                        >
                          ${product.price}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          name="add to cart"
                          role="button"
                          className="button"
                          variant="contained"
                          fullWidth
                          onClick={() =>
                            handleAddToCart(
                              product.price,
                              product.name,
                              product.quantity,
                              product.id
                            )
                          }
                        >
                          ADD TO CART
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </>
        </Grid>
      </Grid>
    </>
  );
}
