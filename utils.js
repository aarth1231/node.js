export function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1; // random number between 1-100
}

export function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}
