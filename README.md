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
##  Vistas

- `GET` `/` → Home  
- `GET` `/register` → Registro  
- `GET` `/login` → Login  
- `GET` `/profile` → Perfil (**protegido**)  
- `GET` `/products` → Productos (**protegido**)  
- `GET` `/carts` → Lista carritos  
- `GET` `/cart/:cid` → Carrito específico  

---

##  API Sessions

- `POST` `/api/sessions/register` → Registro API  
- `POST` `/api/sessions/login` → Login API  
- `POST` `/api/sessions/logout` → Logout API  
- `GET` `/api/sessions/current` → Usuario actual (**OBLIGATORIO**)  

---

##  API Products

- `GET` `/api/products` → Listar productos  
- `GET` `/api/products/:pid` → Producto específico  
- `POST` `/api/products` → Crear producto  
- `PUT` `/api/products/:pid` → Actualizar producto  
- `DELETE` `/api/products/:pid` → Eliminar producto  

---

##  API Carts

- `GET` `/api/carts` → Listar carritos  
- `POST` `/api/carts` → Crear carrito  
- `GET` `/api/carts/:cid` → Carrito específico  
- `PUT` `/api/carts/:cid` → Actualizar carrito completo  
- `DELETE` `/api/carts/:cid` → Eliminar carrito  
- `POST` `/api/carts/:cid/product/:pid` → Agregar producto al carrito  
- `PUT` `/api/carts/:cid/product/:pid` → Actualizar cantidad de producto  
- `DELETE` `/api/carts/:cid/product/:pid` → Eliminar producto del carrito  
- `GET` `/api/carts/:cid/detalle` → Detalle con aggregation  

---

📖 **Desarrollado por:** *Juan Pablo Pieroni*  
📚 **Curso:** Backend II - Coderhouse
