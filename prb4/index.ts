function sum_to_n_iterative(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

function sum_to_n_recursive(n: number): number {
  if (n <= 1) {
    return n;
  }
  return n + sum_to_n_recursive(n - 1);
}

function sum_to_n_formula(n: number): number {
  return (n * (n + 1)) / 2;
}
