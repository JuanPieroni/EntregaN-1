 import fs from "fs";

function generarCodigoSimple() {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numeros = "0123456789";
    let codigo = "";
    for (let i = 0; i < 4; i++) codigo += letras[Math.floor(Math.random() * letras.length)];
    for (let i = 0; i < 4; i++) codigo += numeros[Math.floor(Math.random() * numeros.length)];
    return codigo;
}

function generarProductos(cantidad = 2500) {
    const adjectives = [
        "Fresco", "Delicioso", "Orgánico", "Natural", "Exquisito", "Nutritivo", "Rico", "Saludable", "Premium", "Ligero",
        "Artesanal", "Dulce", "Crujiente", "Jugoso", "Refrescante", "Proteico", "Bajo en grasa", "Bajo en azúcar", "Sin gluten", "Vegano",
        "Cremoso", "Suave", "Refrigerado", "Caliente", "Enlatado", "Deshidratado", "Congelado", "Infusión", "Energético", "Gourmet"
    ];

    const itemsPorCategoria = {
        "Frutas": ["Manzana", "Banana", "Naranja", "Uva", "Pera", "Kiwi", "Sandía", "Melón"],
        "Lácteos": ["Leche", "Yogur", "Queso", "Mantequilla", "Crema", "Helado"],
        "Panadería": ["Pan", "Bizcocho", "Galleta", "Muffin", "Croissant", "Tarta"],
        "Bebidas": ["Jugo", "Agua", "Café", "Té", "Refresco", "Smoothie"],
        "Snacks": ["Galleta", "Chocolate", "Snack salado", "Frutos secos", "Barra de cereal"],
        "Cereales": ["Avena", "Cereal integral", "Granola", "Muesli"],
        "Dulces": ["Chocolate", "Caramelos", "Gominolas", "Turrón"],
        "Carnes": ["Carne de res", "Pollo", "Pescado", "Cerdo"]
    };

    const actions = [
        "perfecto para desayunos", "ideal para meriendas", "apto para toda la familia", "rico en vitaminas", "bajo en calorías",
        "sabor intenso y natural", "fácil de preparar", "listo para consumir", "hecho con ingredientes selectos", "sin conservantes",
        "excelente fuente de proteínas", "ideal para cocinar", "versátil y nutritivo", "para disfrutar en cualquier momento", "sabor auténtico",
        "textura crujiente", "suave y cremoso", "aroma irresistible", "apto para dietas especiales", "fresco del día"
    ];

    const categories = Object.keys(itemsPorCategoria);

    function randomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    const productos = [];

    for (let i = 0; i < cantidad; i++) {
        const category = randomElement(categories);
        const item = randomElement(itemsPorCategoria[category]);
        const title = `${randomElement(adjectives)} ${item}`;
        const description = `${randomElement(actions)}. Ideal para ${category}.`;
        const price = Math.floor(Math.random() * (1500 - 10 + 1)) + 10; // entero entre 10 y 2500
        const stock = Math.floor(Math.random() * 1000) + 1; // stock entre 1 y 100
        const code = generarCodigoSimple();

        productos.push({
            title,
            description,
            price,
            stock,
            code,
            category
        });
    }

    fs.writeFileSync("productos.json", JSON.stringify(productos, null, 2));
    console.log(`Se generaron ${cantidad} productos en productos.json`);
}

generarProductos();
