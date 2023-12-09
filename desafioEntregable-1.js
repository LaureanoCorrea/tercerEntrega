const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      // Si hay un error al leer el archivo (por ejemplo, si es la primera vez), inicializa el array de productos vacío.
      this.products = [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data, 'utf-8');
  }

  validateProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      return 'Todos los campos son obligatorios';
    }
    return null;
  }

  addProduct(product) {
    const productValidation = this.validateProduct(product);
    if (productValidation) {
      return productValidation;
    }

    const noRepetatCode = this.products.find((prod) => prod.code === product.code);
    if (noRepetatCode) {
      return 'Ya existe un producto con ese código';
    }

    const newProduct = {
      ...product,
      id: this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1,
    };
    this.products.push(newProduct);

    this.saveProducts(); 

    return 'Producto agregado correctamente';
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((prod) => prod.id === id);
    if (!product) {
      return 'Producto no encontrado';
    }
    return product;
  }
}


const products = new ProductManager('./data.json');
console.log(products.addProduct({ title: 'Producto 1', description: 'Descripcion del producto 1', price: 19.99, thumbnail: 'ruta/imagen1.jpg', code: 'ABC123', stock: 50 }));
console.log(products.addProduct({ title: 'Producto 1', description: 'Descripcion del producto 1', price: 19.99, thumbnail: 'ruta/imagen1.jpg', code: 'ABC123', stock: 50 }));
console.log(products.addProduct({ title: 'Producto 2', description: 'Descripcion del producto 2', price: 59.99, thumbnail: 'ruta/imagen2.jpg', code: 'ABC125', stock: 80 }));
console.log(products.addProduct({ title: 'Producto 3', description: 'Descripcion del producto 3', price: 59.99, thumbnail: 'ruta/imagen3.jpg', code: 'ABC127' }));
console.log(products.getProducts());
console.log(products.getProductById(19));
