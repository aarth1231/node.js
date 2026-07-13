import { generateRandomNumber, celsiusToFahrenheit } from "./utils.js";
import { getPosts } from "./type_to_module.js";

console.log(`random number: ${generateRandomNumber()}`);
console.log(`celsius to fahrenheit: ${celsiusToFahrenheit(5)}`);
console.log(getPosts());
