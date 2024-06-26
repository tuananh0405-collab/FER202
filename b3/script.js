function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i == 0) return false;
  }
  return true;
}
let a = [1, 9, 5, 7, 13, 0, 45];
let b = a.filter(isPrime);
console.log(b);
