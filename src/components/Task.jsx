import React, { Component } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CardMedia from "@mui/material/CardMedia";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const Task = ({ prods, onAddCart, onDecrementCart }) => {
  // const { prods, onAddCart, onDecrementCart } = this.props;
  const showAddToCart = (prod) => {
    if (prod.qty === 0) {
      return (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container justifyContent="space-evenly">
            <Grid item>
              <Button onClick={() => onAddCart(prod.id)} variant="contained">
                Add to cart
              </Button>
            </Grid>
          </Grid>
        </Box>
      );
    } else {
      return (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container justifyContent="space-evenly">
            <Grid item>
              <Button
                onClick={() => onDecrementCart(prod.id)}
                variant="contained"
              >
                <RemoveIcon color="action" />
              </Button>
            </Grid>

            {prod.qty}
            <Grid item>
              <Button onClick={() => onAddCart(prod.id)} variant="contained">
                <AddIcon color="action" />
              </Button>
            </Grid>
          </Grid>
        </Box>
      );
    }
  };
  return (
    <>
      {/* End hero unit */}
      {prods.map((prod) => (
        // Enterprise card is full width at sm breakpoint
        <Grid
          item
          key={prod.id}
          xs={12}
          sm={prod.title === "Enterprise" ? 12 : 6}
          md={4}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia sx={{ height: 140 }} image={prod.image} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {prod.title.length <= 30
                  ? prod.title
                  : prod.title.substr(0, 30) + "..."}
                {/* {prod.title} */}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {prod.category}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "baseline",
                  mb: 2,
                }}
              >
                <Typography component="h2" variant="h3" color="text.primary">
                  ${prod.price}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  .00
                </Typography>
              </Box>
              <Typography
                variant="h12"
                align="center"
                color="text.secondary"
                component="p"
                maxLength="10"
              >
                {prod.description.length <= 50
                  ? prod.description
                  : prod.description.substr(0, 50) + "..."}
              </Typography>
            </CardContent>
            <CardActions>{showAddToCart(prod)}</CardActions>
          </Card>
          {/*  */}
        </Grid>
      ))}
    </>
  );
};

export default Task;
