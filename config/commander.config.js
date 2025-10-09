import { program } from "commander"

program
    .name("Proyecto Final Backend II")
    .description("E-commerce con Node.js y MongoDB")
    .option("-m, --mode <mode>", "Modo de ejecución", "dev")
    .option("-p, --port <number>", "Puerto del servidor", "8080")
    .option("-d,  --debug", "Variable para debug", false)
    .option("-a, --atlas <boolean>", "Usar MongoDB Atlas", false)

    .parse()

    export default program


/* console.log(program.name())
console.log(program.description())
console.log(program.opts().port)
console.log("Opciones:")
console.log(program.opts())

console.log("Argumentos:")
console.log(program.args) */

 
