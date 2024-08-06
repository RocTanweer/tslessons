### Generics in TypeScript

Generics in TypeScript provide a way to create reusable components that can work with a variety of types, ensuring type safety and flexibility. They allow you to define functions, classes, and interfaces that can operate on different types without sacrificing type safety. This comprehensive note covers the basics, advanced features, and real-world use cases of generics in TypeScript.

#### 1. **Basic Syntax**

Generics are defined using angle brackets (`<T>`) where `T` is a placeholder for the type that will be specified later.

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("Hello, TypeScript");
let output2 = identity<number>(42);
```

In this example, `T` is a type variable that gets replaced with the actual type when the function is called.

#### 2. **Generic Functions**

Generic functions are functions that can work with any data type.

```typescript
function echo<T>(arg: T): T {
  return arg;
}

console.log(echo<string>("Hello")); // "Hello"
console.log(echo<number>(123)); // 123
```

#### 3. **Generic Classes**

Generic classes are classes that can work with a variety of types.

```typescript
class Box<T> {
  contents: T;

  constructor(contents: T) {
    this.contents = contents;
  }

  getContents(): T {
    return this.contents;
  }
}

let stringBox = new Box<string>("Hello, TypeScript");
console.log(stringBox.getContents()); // "Hello, TypeScript"

let numberBox = new Box<number>(123);
console.log(numberBox.getContents()); // 123
```

#### 4. **Generic Interfaces**

Generic interfaces allow you to define a contract that can work with various types.

```typescript
interface Pair<T, U> {
  first: T;
  second: U;
}

let stringNumberPair: Pair<string, number> = { first: "Alice", second: 42 };
let numberBooleanPair: Pair<number, boolean> = { first: 1, second: true };
```

#### 5. **Generic Constraints**

Generic constraints allow you to specify that a generic type must conform to a certain type or interface.

```typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): void {
  console.log(arg.length);
}

logLength({ length: 10, value: "Hello" }); // 10
// logLength(42); // Error: Argument of type 'number' is not assignable to parameter of type 'Lengthwise'
```

#### 6. **Default Generic Types**

You can provide default types for generics to make them optional.

```typescript
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}

let stringArray = createArray(3, "Hello");
let numberArray = createArray<number>(3, 42);
```

#### 7. **Using Multiple Type Variables**

You can define multiple type variables in generics.

```typescript
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

let mixedPair = pair<string, number>("Hello", 42);
console.log(mixedPair); // ["Hello", 42]
```

#### 8. **Generic Utility Types**

TypeScript provides several built-in utility types that use generics to facilitate common type transformations.

- **Partial**: Makes all properties of a type optional.

```typescript
interface User {
  id: number;
  name: string;
}

type PartialUser = Partial<User>;

let user: PartialUser = { id: 1 };
```

- **Readonly**: Makes all properties of a type readonly.

```typescript
type ReadonlyUser = Readonly<User>;

let user: ReadonlyUser = { id: 1, name: "Alice" };
// user.id = 2; // Error: Cannot assign to 'id' because it is a read-only property.
```

- **Record**: Constructs an object type with a set of properties of a specified type.

```typescript
type StringRecord = Record<string, number>;

let scores: StringRecord = { Alice: 90, Bob: 85 };
```

#### 9. **Real-World Use Cases**

**1. Generic Data Structures**:

```typescript
class Stack<T> {
  private items: T[] = [];

  push(item: T) {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

let numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
console.log(numberStack.pop()); // 20
console.log(numberStack.pop()); // 10

let stringStack = new Stack<string>();
stringStack.push("Hello");
stringStack.push("World");
console.log(stringStack.pop()); // "World"
console.log(stringStack.pop()); // "Hello"
```

**2. Generic Utility Functions**:

```typescript
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

let person = { name: "Alice" };
let job = { title: "Developer" };

let employee = merge(person, job);
console.log(employee); // { name: "Alice", title: "Developer" }
```

**3. Generic React Components**:

```typescript
import React from "react";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>;
}

const stringList = (
  <List items={["Alice", "Bob"]} renderItem={(item) => <li>{item}</li>} />
);
const numberList = (
  <List items={[1, 2, 3]} renderItem={(item) => <li>{item}</li>} />
);
```

**4. Generic API Response Handling**:

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
}

async function fetchApi<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  const data = await response.json();
  return { data, status: response.status };
}

interface User {
  id: number;
  name: string;
}

fetchApi<User[]>("https://api.example.com/users").then((response) => {
  console.log(response.data);
});
```

### Summary

- **Basic Syntax**: Use `<T>` to define generics.
- **Generic Functions**: Functions that can operate on any type.
- **Generic Classes**: Classes that can work with various types.
- **Generic Interfaces**: Interfaces that can define contracts for various types.
- **Generic Constraints**: Restrict generics to types that meet certain criteria.
- **Default Generic Types**: Provide default types for generics.
- **Multiple Type Variables**: Use multiple generics in a single declaration.
- **Generic Utility Types**: Built-in types like `Partial`, `Readonly`, and `Record` that facilitate common type transformations.
- **Real-World Use Cases**: Implement generic data structures, utility functions, React components, and API response handling.
