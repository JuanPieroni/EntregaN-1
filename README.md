 
## 📁 Estructura del Proyecto
```
📁 Entrega_1/
├── 📁 config/
│   ├── 📁 db/
│   │   └── connect.config.js
│   └── passport.config.js
├── 📁 controllers/
│   └── aggregation.controller.js
├── 📁 managers/
│   ├── base.manager.js
│   ├── carts.manager.js
│   ├── products.manager.js
│   └── users.manager.js
├── 📁 middlewares/
│   └── auth.middleware.js
├── 📁 models/
│   ├── cart.model.js
│   ├── product.model.js
│   └── user.model.js
├── 📁 public/
│   └── 📁 fonts/
├── 📁 routes/
│   ├── carts.routes.js
│   ├── products.routes.js
│   ├── sessions.routes.js
│   └── views.routes.js
├── 📁 utils/
│   ├── auth.utils.js
│   ├── generarProductos.js
│   └── subirProductos.js
├── 📁 views/
│   ├── 📁 layouts/
│   │   └── main.hbs
│   ├── cart.hbs
│   ├── carts.hbs
│   ├── home.hbs
│   ├── index.hbs
│   ├── login.hbs
│   ├── products.hbs
│   ├── profile.hbs
│   └── register.hbs
├── .gitignore
├── app.js
├── package.json
└── package-lock.json

 


  ```
## vistas

``GET`` http://localhost:8080/                    # Home
``GET`` http://localhost:8080/register            # Registro
``GET`` http://localhost:8080/login               # Login
``GET`` http://localhost:8080/profile             # Perfil (protegido)
``GET`` http://localhost:8080/products            # Productos (protegido)
``GET`` http://localhost:8080/carts               # Lista carritos
``GET`` http://localhost:8080/cart/:cid           # Carrito específico

## api/sessions

``POST`` http://localhost:8080/api/sessions/register    # Registro API
``POST`` http://localhost:8080/api/sessions/login       # Login API
``POST`` http://localhost:8080/api/sessions/logout      # Logout API
``GET``  http://localhost:8080/api/sessions/current     # Usuario actual (OBLIGATORIO)

##  api/products

``GET``    http://localhost:8080/api/products           # Listar productos
``GET``    http://localhost:8080/api/products/:pid      # Producto específico
``POST``   http://localhost:8080/api/products           # Crear producto
``PUT``    http://localhost:8080/api/products/:pid      # Actualizar producto
``DELETE`` http://localhost:8080/api/products/:pid      # Eliminar producto
 
 
## api/carts  

``GET``    http://localhost:8080/api/carts                      # Listar carritos
``POST``   http://localhost:8080/api/carts                      # Crear carrito
``GET``    http://localhost:8080/api/carts/:cid                 # Carrito específico
``PUT``    http://localhost:8080/api/carts/:cid                 # Actualizar carrito completo
``DELETE`` http://localhost:8080/api/carts/:cid                 # Eliminar carrito
``POST``   http://localhost:8080/api/carts/:cid/product/:pid    # Agregar producto al carrito
``PUT``    http://localhost:8080/api/carts/:cid/product/:pid    # Actualizar cantidad de producto
``DELETE`` http://localhost:8080/api/carts/:cid/product/:pid    # Eliminar producto del carrito
``GET``    http://localhost:8080/api/carts/:cid/detalle         # Detalle con aggregation


 
 

**Desarrollado por:** [Juan Pablo Pieroni]  
**Curso:** Backend II - Coderhouse  
