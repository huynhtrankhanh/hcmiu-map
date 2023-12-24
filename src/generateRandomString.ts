export function generateRandomString() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let randomString = "";

  // Create a typed array to store random values
  const randomValuesArray = new Uint8Array(32);

  // Use crypto.getRandomValues to fill the array with random values
  crypto.getRandomValues(randomValuesArray);

  // Map each random value to a character in the alphabet
  randomValuesArray.forEach((value) => {
    const index = Math.floor((value / 255) * alphabet.length);
    randomString += alphabet[index];
  });

  return randomString;
}
