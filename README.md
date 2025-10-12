### 1. Clonar el repositorio

```bash
git clone -b refactoring https://github.com/JuanPieroni/EntregaN-1.git
cd EntregaN-1
```

```bash
npm install
```

El proyecto soporta 3 modos de ejecución:

**Modo Production:**

```bash
npm run prod
```

Usa `.env.production` - MongoDB Atlas  

**Modo Development :**

```bash
npm run dev
```

Usa `.env.development` - MongoDB Local PORT 3000

**Modo Testing:**

```bash
npm run test
```

Usa `.env.testing` - MongoDB Local (Testing)

### 4. Acceder a la aplicación

Abrir en el navegador: `http://localhost:8080`

---

## 📝 Notas

-   Los archivos `.env` ya están incluidos en el repositorio
-   El proyecto se ejecuta en el puerto `8080`
-   Credenciales de prueba disponibles en la aplicación

📖 **Desarrollado por:** Juan Pablo Pieroni  
📚 **Curso:** Backend II - Coderhouse
