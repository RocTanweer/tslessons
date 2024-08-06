### Functions in TypeScript

Functions in TypeScript are a fundamental building block of any application, allowing you to define reusable blocks of code. TypeScript enhances JavaScript functions with strong typing, making your code more predictable and easier to debug. This comprehensive note covers the basics, advanced features, and real-world use cases of functions in TypeScript.

#### 1. **Basic Function Syntax**

Functions in TypeScript are similar to JavaScript but can include type annotations for parameters and return types.

```typescript
function greet(name: string): string {
  return `Hello, ${name}`;
}

const message = greet("Alice");
console.log(message); // Hello, Alice
```

#### 2. **Optional and Default Parameters**

Parameters can be optional or have default values.

**Optional Parameters:**

```typescript
function greet(name: string, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}`;
}

console.log(greet("Alice")); // Hello, Alice
console.log(greet("Alice", "Hi")); // Hi, Alice
```

**Default Parameters:**

```typescript
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}`;
}

console.log(greet("Alice")); // Hello, Alice
console.log(greet("Alice", "Hi")); // Hi, Alice
```

#### 3. **Rest Parameters**

Rest parameters allow you to pass an arbitrary number of arguments to a function.

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
```

#### 4. **Function Overloading**

TypeScript allows you to define multiple signatures for a function. This is useful when a function can be called with different sets of parameters.

```typescript
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
  return a + b;
}

console.log(add(1, 2)); // 3
console.log(add("Hello, ", "World")); // Hello, World
```

#### 5. **Arrow Functions**

Arrow functions provide a shorter syntax for writing functions and automatically bind `this` to the surrounding context.

```typescript
const greet = (name: string): string => `Hello, ${name}`;

console.log(greet("Alice")); // Hello, Alice
```

#### 6. **Function Types**

You can define types for functions, ensuring that variables adhere to specific function signatures.

```typescript
type GreetFunction = (name: string) => string;

const greet: GreetFunction = (name) => `Hello, ${name}`;

console.log(greet("Alice")); // Hello, Alice
```

#### 7. **Higher-Order Functions**

Higher-order functions are functions that take other functions as arguments or return functions.

```typescript
function createGreeter(greeting: string): (name: string) => string {
  return (name: string) => `${greeting}, ${name}`;
}

const greet = createGreeter("Hello");
console.log(greet("Alice")); // Hello, Alice
```

#### 8. **Asynchronous Functions**

Asynchronous functions return `Promise` objects, allowing you to write asynchronous code more easily.

```typescript
async function fetchData(url: string): Promise<any> {
  const response = await fetch(url);
  return response.json();
}

fetchData("https://api.example.com/data")
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

#### 9. **Void and Never Types**

- **`void`**: Used for functions that do not return a value.
- **`never`**: Used for functions that never return, such as functions that always throw an error.

```typescript
function logMessage(message: string): void {
  console.log(message);
}

function throwError(message: string): never {
  throw new Error(message);
}

logMessage("This is a log message");
// throwError("This is an error message");
```

### Real-World Use Cases

#### 1. **Utility Functions**

Common utility functions like sorting, filtering, or transforming data are essential in many applications.

```typescript
function filter<T>(arr: T[], predicate: (value: T) => boolean): T[] {
  return arr.filter(predicate);
}

const numbers = [1, 2, 3, 4, 5];
const evenNumbers = filter(numbers, (num) => num % 2 === 0);

console.log(evenNumbers); // [2, 4]
```

#### 2. **Event Handlers**

In web development, functions are often used as event handlers to respond to user actions.

```typescript
function handleClick(event: MouseEvent): void {
  console.log("Button clicked", event);
}

const button = document.querySelector("button");
button?.addEventListener("click", handleClick);
```

#### 3. **APIs and Data Fetching**

Functions are used to encapsulate logic for interacting with APIs and handling asynchronous data fetching.

```typescript
async function fetchUserData(userId: string): Promise<User> {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}

fetchUserData("123")
  .then((user) => console.log(user))
  .catch((error) => console.error(error));
```

#### 4. **Form Validation**

Functions can be used to validate form input, ensuring that data is in the correct format before submission.

```typescript
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

console.log(validateEmail("test@example.com")); // true
console.log(validateEmail("invalid-email")); // false
```

#### 5. **State Management**

In frameworks like React, functions are used extensively to manage state and side effects.

```typescript
import { useState } from "react";

function Counter(): JSX.Element {
  const [count, setCount] = useState(0);

  const increment = (): void => setCount(count + 1);
  const decrement = (): void => setCount(count - 1);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
```

### Summary

- **Basic Function Syntax**: Define functions with type annotations for parameters and return types.
- **Optional and Default Parameters**: Use `?` for optional parameters and assign default values.
- **Rest Parameters**: Handle variable number of arguments with `...`.
- **Function Overloading**: Define multiple signatures for a function.
- **Arrow Functions**: Provide a shorter syntax and automatic `this` binding.
- **Function Types**: Define specific function signatures for variables.
- **Higher-Order Functions**: Functions that take or return other functions.
- **Asynchronous Functions**: Use `async` and `await` for asynchronous operations.
- **Void and Never Types**: For functions that do not return or never return.
