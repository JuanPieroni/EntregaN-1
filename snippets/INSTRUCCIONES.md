# 📝 Guía de Instalación de Snippets

## ¿Qué son estos archivos?

Son plantillas de código que te permiten escribir código más rápido. Escribes un atajo corto, presionas `Tab`, y se expande al código completo.

---

## 🚀 Cómo Instalar en VS Code

### Método 1: Copiar y Pegar (Recomendado)

1. **Abrir configuración de snippets:**
   - Presiona `Ctrl + Shift + P`
   - Escribe: `Configure User Snippets`
   - Selecciona el lenguaje correspondiente

2. **Para cada archivo:**

   **JavaScript/Node.js:**
   - Selecciona: `javascript.json`
   - Copia TODO el contenido de `nodejs-snippets.json`
   - Pégalo dentro de las llaves `{}`

   **React (JavaScript React):**
   - Selecciona: `javascriptreact.json`
   - Copia TODO el contenido de `react-snippets.json`
   - Pégalo dentro de las llaves `{}`

   **HTML:**
   - Selecciona: `html.json`
   - Copia TODO el contenido de `html-snippets.json`
   - Pégalo dentro de las llaves `{}`

   **CSS:**
   - Selecciona: `css.json`
   - Copia TODO el contenido de `css-snippets.json`
   - Pégalo dentro de las llaves `{}`

3. **Guardar y listo!** Los snippets ya están disponibles.

---

## 📚 Snippets Incluidos

### **Node.js/Express Backend** (nodejs-snippets.json)

| Atajo | Descripción | Qué hace |
|-------|-------------|----------|
| `expRoute` | Ruta Express completa | Crea una ruta con try-catch y manejo de errores |
| `expController` | Controlador Express | Función async con manejo de errores estándar |
| `expMiddleware` | Middleware Express | Middleware con next() y error handling |
| `mongoModel` | Modelo Mongoose | Schema completo con timestamps |
| `jwtVerify` | Verificar JWT | Middleware para autenticación con JWT |
| `mongoConnect` | Conexión MongoDB | Función de conexión a MongoDB |
| `expServer` | Servidor Express | Setup completo con middlewares |
| `mfind` | Mongoose find | Query de búsqueda |
| `mcreate` | Mongoose create | Crear documento |
| `mupdate` | Mongoose update | Actualizar documento |
| `mdelete` | Mongoose delete | Eliminar documento |

### **React** (react-snippets.json)

| Atajo | Descripción | Qué hace |
|-------|-------------|----------|
| `rfc` | React Component | Componente funcional completo |
| `rafce` | Arrow Function Component | Componente con arrow function |
| `ust` | useState | Hook de estado |
| `uef` | useEffect | Hook de efecto |
| `uctx` | useContext | Hook de contexto |
| `rctx` | React Context | Context completo con Provider |
| `fetchData` | Fetch con hooks | Fetch con loading y error states |
| `handleSubmit` | Handle Submit | Manejador de formularios |
| `map` | Map en JSX | Renderizar arrays |
| `cond` | Renderizado condicional | Conditional rendering |

### **JavaScript Vanilla** (javascript-snippets.json)

| Atajo | Descripción | Qué hace |
|-------|-------------|----------|
| `af` | Arrow Function | Función flecha |
| `aaf` | Async Arrow Function | Función async con try-catch |
| `fetch` | Fetch API | Fetch con then/catch |
| `afetch` | Async Fetch | Fetch con async/await |
| `map` | Array map | Mapear array |
| `filter` | Array filter | Filtrar array |
| `qs` | querySelector | Seleccionar elemento DOM |
| `ael` | addEventListener | Agregar event listener |
| `lss` | localStorage Set | Guardar en localStorage |
| `lsg` | localStorage Get | Obtener de localStorage |

### **HTML** (html-snippets.json)

| Atajo | Descripción | Qué hace |
|-------|-------------|----------|
| `html5` | HTML5 Template | Estructura HTML completa |
| `form` | Formulario | Form con validación |
| `input` | Input | Campo de entrada |
| `btn` | Button | Botón HTML |
| `card` | Card | Componente card |
| `nav` | Navegación | Nav con lista |
| `table` | Tabla | Tabla HTML completa |

### **CSS** (css-snippets.json)

| Atajo | Descripción | Qué hace |
|-------|-------------|----------|
| `flex` | Flexbox | Container flexbox completo |
| `grid` | CSS Grid | Grid container |
| `media` | Media Query | Responsive breakpoint |
| `center` | Centrar | Centrar con position absolute |
| `shadow` | Box Shadow | Sombra de caja |
| `anim` | Animation | Animación con keyframes |
| `btnstyle` | Button Style | Estilo de botón con hover |
| `cardstyle` | Card Style | Estilo de card con hover |
| `gradient` | Gradient | Gradiente lineal |

---

## 💡 Cómo Usar los Snippets

1. **Escribe el atajo** (ej: `rfc`)
2. **Presiona `Tab`**
3. **El código se expande automáticamente**
4. **Usa `Tab` para moverte entre los campos editables**

### Ejemplo:

```javascript
// Escribes: expRoute + Tab
// Se expande a:

router.get('/path', middlewares, async (req, res) => {
    try {
        const { params } = req.body;
        
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
```

---

## 🎯 Tips

- **$0** = Posición final del cursor
- **$1, $2, $3** = Posiciones editables (usa Tab para moverte)
- **${1:default}** = Campo con valor por defecto
- **${1|option1,option2|}** = Campo con opciones (usa flechas para elegir)

---

## ✅ Verificar Instalación

1. Abre un archivo `.js`, `.jsx`, `.html` o `.css`
2. Escribe un atajo (ej: `rfc`)
3. Presiona `Tab`
4. Si se expande, ¡funciona! 🎉

---

**Creado por:** Juan Pablo Pieroni  
**Proyecto:** Backend II - Coderhouse
