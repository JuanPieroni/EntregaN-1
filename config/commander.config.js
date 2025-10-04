import { Command } from "commander"

const program = new Command()

program
    .option("-d", "Variable para debug", false)
    .option("-p, --port <number>", "Puerto del servidor", "8080")
    .option("-m, --mode <mode>", "Modo de ejecución", "developer")

program.parse()

console.log("Opciones:")
console.log(program.opts())

console.log("Argumentos:")
console.log(program.args)
