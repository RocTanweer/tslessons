interface Greet {
  (name: string): string;
}

// This works
// const greet: Greet = (name) => {
//   return `Hello, ${name}!`;
// };

// This also works
const greet: Greet = function (name) {
  return `Hello, ${name}!`;
};

interface A {
  p1: string;
  p2: number;
}

interface B {
  p1: string;
}

export function interfacePractice() {
  console.log(greet("Tanweer"));

  const obj: A & B = { p1: "property 1", p2: 2 }; // this is fine
  // Intersection mean to satisfy all the types involved (A and B)
  console.log(obj);
}
