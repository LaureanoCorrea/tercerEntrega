const express = require('express');
const ProductManager = require('./productManager'); 
const app = express();
const products = new ProductManager('./data.json')

app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    await products.loadProducts(); 

    if (limit) {
      const limitedProducts = products.getProducts().slice(0, parseInt(limit, 10));
      res.json(limitedProducts);
    } else {
      res.json(products.getProducts());
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    console.log('Requested PID:', pid);
    await products.loadProducts();  

    const product = products.getProductById(parseInt(pid, 10));

    console.log('All Products:', products.getProducts());

    if (!product) {
        res.status(404).json({ error: 'Producto no encontrado' });
      } else {
        res.json(product);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  });

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Escuchando el puerto ${PORT}`);
});
