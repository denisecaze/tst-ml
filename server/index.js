const express = require("express");
const axios = require("axios");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

app.get("/api/items", async (req, res) => {
  const response = await axios.get(
    `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}`
  );

  const categories = [];
  const dataToSend = [];
  response.data.available_filters.map(({ values }) =>
    values.map(({ name }) => categories.push(name))
  );
  // eslint-disable-next-line array-callback-return
  response.data.results.map((elem) => {
    const { condition, id, thumbnail, prices, title, shipping } = elem;
    const author = {
      lastname: "beleza", // consertar
      name: "xuxu", // consertar
    };

    const items = {
      condition,
      freeShipping: shipping.free_shipping,
      id,
      picture: thumbnail,
      price: {
        amount: prices.prices[0].amount,
        currency: prices.prices[0].currency_id,
        decimals: 0, // consertar
      },
      title,
    };
    dataToSend.push({ author, items, categories });
  });

  return res.json(dataToSend);
});

app.get("/api/items/:id", async (req, res) => {
  const response = await axios.get(
    `https://api.mercadolibre.com/items/${req.params.id}`
  );

  const { data } = response;
  const {
    condition,
    currency_id: currency,
    id,
    price: amount,
    shipping,
    sold_quantity: soldQuantity,
    thumbnail: picture,
    title,
  } = data;
  const dataToSend = {
    author: {
      lastname: "beleza", // consertar
      name: "xuxu", // consertar
    },
    condition,
    description: "lalalala", // consertar
    freeShipping: shipping.free_shipping,
    id,
    picture,
    price: {
      amount,
      currency,
      decimals: 0, // consertar
    },
    soldQuantity,
    title,
  };
  return res.json(dataToSend);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
