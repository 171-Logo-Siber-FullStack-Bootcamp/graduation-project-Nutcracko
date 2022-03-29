//search controller
//importing elastic search client
const client = require("../config/elasticsearch");

//posts product to elasticsearch
const elasticPost = async (product) => {
  await client.index({
    index: "product",
    document: {
      p_id: product.p_id,
      name: product.name,
      description: product.description,
      category: product.category,
      image: product.image,
      price: product.price,
      seller: product.seller,
      stockexists: product.stockexists,
    },
  });

  await client.indices.refresh({ index: "product" });

  return;
};

//searches products by searchterm
const elasticSearch = async (searchterm) => {
  const results = await client.search({
    index: "product",
    body: {
      query: {
        match: {
          name: searchterm,
        },
      },
    },
  });

  return results.hits.hits;
};

//filters by category
const elasticFilter = async (categoryname) => {
  const results = await client.search({
    index: "product",
    body: {
      query: {
        match: {
          category: categoryname,
        },
      },
    },
  });

  return results.hits.hits;
};

module.exports = { elasticPost, elasticFilter, elasticSearch };
