### Type Inference in TypeScript

Type inference in TypeScript is the ability of the TypeScript compiler to automatically determine the types of variables, function return types, and other expressions based on the context in which they are used. This feature reduces the need for explicit type annotations, making the code cleaner and easier to read without sacrificing type safety.

#### 1. **Variable Type Inference**

When you declare a variable and assign it a value, TypeScript infers the type based on the assigned value.

```typescript
let message = "Hello, TypeScript"; // Type inferred as string
let count = 42; // Type inferred as number
let isActive = true; // Type inferred as boolean

// Example
message = "New message"; // Valid
// message = 100; // Error: Type 'number' is not assignable to type 'string'
```

#### 2. **Function Return Type Inference**

TypeScript infers the return type of a function based on the return statements inside the function.

```typescript
function add(a: number, b: number) {
  return a + b; // Return type inferred as number
}

let result = add(5, 10); // Type inferred as number

// Example
// result = "result"; // Error: Type 'string' is not assignable to type 'number'
```

#### 3. **Contextual Typing**

TypeScript uses the context in which a variable or function is used to infer types. This is especially useful in functions with callbacks and event handlers.

```typescript
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((num) => {
  console.log(num * 2); // Type of num inferred as number
});

// Example
// numbers.forEach((num: string) => { // Error: Argument of type 'number' is not assignable to parameter of type 'string'
//   console.log(num.toUpperCase());
// });
```

#### 4. **Best Common Type**

When inferring the type of an array with multiple types, TypeScript uses the best common type among the elements.

```typescript
let mixedArray = [1, "two", 3, "four"]; // Type inferred as (string | number)[]

mixedArray.push(5); // Valid
// mixedArray.push(true); // Error: Argument of type 'boolean' is not assignable to parameter of type 'string | number'
```

#### 5. **Type Inference with Generics**

When using generics, TypeScript can infer the type of the generic parameter based on the argument passed.

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity("Hello"); // Type inferred as string
let output2 = identity(42); // Type inferred as number

// Example
// let output3 = identity<string>(42); // Error: Argument of type '42' is not assignable to parameter of type 'string'
```

#### 6. **Type Inference in Object Literals**

TypeScript infers the type of properties in object literals.

```typescript
let person = {
  name: "Alice",
  age: 30,
  isStudent: false,
};

// Type inferred as { name: string; age: number; isStudent: boolean; }
person.name = "Bob"; // Valid
// person.age = "thirty"; // Error: Type 'string' is not assignable to type 'number'
```

#### 7. **Function Parameter Type Inference**

TypeScript can infer the types of parameters based on default values and destructuring.

```typescript
function greet(name = "Guest") {
  return `Hello, ${name}`; // Type of name inferred as string
}

console.log(greet()); // Hello, Guest
console.log(greet("Alice")); // Hello, Alice

// Example
// console.log(greet(42)); // Error: Argument of type 'number' is not assignable to parameter of type 'string'
```

#### 8. **Complex Type Inference**

TypeScript can infer complex types, such as return types of functions that return objects or other functions.

```typescript
function createUser(name: string, age: number) {
  return {
    name,
    age,
    isAdult: age >= 18,
  };
}

let user = createUser("Alice", 25); // Type inferred as { name: string; age: number; isAdult: boolean; }

console.log(user.isAdult); // true

// Example
// user.isAdult = "yes"; // Error: Type 'string' is not assignable to type 'boolean'
```

### Real-World Use Cases

#### 1. **Simplifying Code without Sacrificing Type Safety**

Type inference allows you to write clean and concise code without explicit type annotations while still benefiting from TypeScript's type checking.

```typescript
let prices = [10, 20, 30]; // Type inferred as number[]

let total = prices.reduce((sum, price) => sum + price, 0); // Type inferred as number

console.log(total); // 60
```

#### 2. **Improving Code Readability and Maintainability**

By leveraging type inference, you can focus on the logic rather than verbose type annotations, making the code more readable and maintainable.

```typescript
function multiply(a: number, b: number) {
  return a * b; // Return type inferred as number
}

let product = multiply(5, 4); // Type inferred as number

console.log(product); // 20
```

#### 3. **Efficient Type Safety in Complex Applications**

Type inference ensures type safety in large and complex applications, reducing the need for explicit type annotations and minimizing errors.

```typescript
const fetchData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data; // Type inferred from the response
};

fetchData("https://api.example.com/data")
  .then((data) => {
    console.log(data); // Type inferred based on the API response
  })
  .catch((error) => {
    console.error(error);
  });
```

### Summary

- **Variable Type Inference**: Infers types based on the assigned value.
- **Function Return Type Inference**: Infers return types based on the function's return statements.
- **Contextual Typing**: Infers types based on the context in which variables and functions are used.
- **Best Common Type**: Determines the common type among elements in an array.
- **Type Inference with Generics**: Infers generic types based on the arguments passed.
- **Type Inference in Object Literals**: Infers the types of object properties.
- **Function Parameter Type Inference**: Infers parameter types based on default values and destructuring.
- **Complex Type Inference**: Infers types for complex expressions, such as functions returning objects or other functions.
