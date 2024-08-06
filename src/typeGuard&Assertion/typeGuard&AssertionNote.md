### Type Guards and Type Assertions in TypeScript

Type guards and type assertions are powerful features in TypeScript that help you work with different types in a type-safe manner. They enable you to refine types during runtime checks and to override the compiler's inferred types. This comprehensive note covers the key concepts, syntax, and practical use cases of type guards and type assertions.

---

#### 1. **Type Guards**

Type guards are expressions that perform runtime checks to narrow down the type of a variable within a block of code. They help ensure that the correct type is being used and provide a way to handle different types safely.

##### **Built-in Type Guards**

1. **`typeof` Operator**:

The `typeof` operator is used to check the type of a variable at runtime.

```typescript
function isString(value: any): value is string {
  return typeof value === "string";
}

function print(value: string | number) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // value is treated as string
  } else {
    console.log(value.toFixed(2)); // value is treated as number
  }
}
```

2. **`instanceof` Operator**:

The `instanceof` operator checks if an object is an instance of a particular class or constructor function.

```typescript
class Dog {
  bark() {}
}

class Cat {
  meow() {}
}

function speak(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // animal is treated as Dog
  } else {
    animal.meow(); // animal is treated as Cat
  }
}
```

##### **Custom Type Guards**

Custom type guards are functions that return a type predicate (`value is Type`). This helps the TypeScript compiler understand the type within a specific context.

```typescript
interface Bird {
  fly(): void;
}

interface Fish {
  swim(): void;
}

function isBird(animal: Bird | Fish): animal is Bird {
  return (animal as Bird).fly !== undefined;
}

function move(animal: Bird | Fish) {
  if (isBird(animal)) {
    animal.fly(); // animal is treated as Bird
  } else {
    animal.swim(); // animal is treated as Fish
  }
}
```

##### **Discriminated Unions**

Discriminated unions use a common property (discriminant) to distinguish between different types in a union. This is a common pattern for simplifying type guards.

```typescript
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
  }
}

const myCircle: Shape = { kind: "circle", radius: 5 };
const mySquare: Shape = { kind: "square", sideLength: 10 };

console.log(area(myCircle)); // 78.53981633974483
console.log(area(mySquare)); // 100
```

#### 2. **Type Assertions**

Type assertions allow you to override the type inferred by TypeScript. This is useful when you have more information about a value's type than the compiler can infer.

##### **Syntax**

1. **Angle-Bracket Syntax**:

```typescript
let someValue: any = "Hello, TypeScript";
let strLength: number = (<string>someValue).length;
```

2. **`as` Syntax**:

```typescript
let someValue: any = "Hello, TypeScript";
let strLength: number = (someValue as string).length;
```

##### **Use Cases for Type Assertions**

1. **DOM Manipulation**:

```typescript
const inputElement = document.getElementById("user-input") as HTMLInputElement;
inputElement.value = "Hello, World!";
```

2. **Handling `any` Type**:

```typescript
function process(value: any) {
  if ((value as string).toUpperCase) {
    console.log((value as string).toUpperCase());
  }
}
```

3. **Calling Functions on Union Types**:

```typescript
type FishOrBird = Fish | Bird;

function move(animal: FishOrBird) {
  if ((animal as Fish).swim) {
    (animal as Fish).swim();
  } else {
    (animal as Bird).fly();
  }
}
```

##### **Limitations of Type Assertions**

- **No Runtime Type Checking**: Type assertions do not perform any runtime checks. They only instruct the TypeScript compiler to treat a value as a specific type.
- **Potential for Errors**: Incorrect type assertions can lead to runtime errors. Use them judiciously and ensure that your assumptions about the type are correct.

#### 3. **Combining Type Guards and Type Assertions**

In some scenarios, you might need to use both type guards and type assertions to ensure type safety.

```typescript
interface Admin {
  name: string;
  privileges: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

type UnknownEmployee = Admin | Employee;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}

const emp1: Admin = { name: "Alice", privileges: ["create-server"] };
const emp2: Employee = { name: "Bob", startDate: new Date() };

printEmployeeInformation(emp1); // Name: Alice, Privileges: ["create-server"]
printEmployeeInformation(emp2); // Name: Bob, Start Date: current date
```

#### 4. **Real-World Use Cases**

**1. API Response Handling**:

When dealing with API responses, type guards can help ensure that you handle different response types correctly.

```typescript
type ApiResponse = SuccessResponse | ErrorResponse;

interface SuccessResponse {
  status: "success";
  data: any;
}

interface ErrorResponse {
  status: "error";
  error: string;
}

function handleApiResponse(response: ApiResponse) {
  if (response.status === "success") {
    console.log("Data:", response.data);
  } else {
    console.log("Error:", response.error);
  }
}

const successResponse: ApiResponse = {
  status: "success",
  data: { id: 1, name: "Alice" },
};
const errorResponse: ApiResponse = { status: "error", error: "Not found" };

handleApiResponse(successResponse); // Data: { id: 1, name: "Alice" }
handleApiResponse(errorResponse); // Error: Not found
```

**2. Form Handling in React**:

Type assertions can be useful when working with form elements in React.

```typescript
import React, { useRef } from "react";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      console.log(inputRef.current.value);
    }
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Log Input</button>
    </div>
  );
}

export default App;
```

**3. Working with Third-Party Libraries**:

When working with third-party libraries that don't have TypeScript types, type assertions can help you integrate them safely.

```typescript
declare const someLibrary: any;

someLibrary.initialize({
  onSuccess: (data: any) => {
    const user = data as User;
    console.log(user.name);
  },
  onError: (error: any) => {
    console.error(error);
  },
});
```

### Summary

- **Type Guards**:
  - Use built-in type guards (`typeof`, `instanceof`) for runtime checks.
  - Create custom type guards with type predicates (`value is Type`).
  - Discriminated unions simplify type checking with a common property.
- **Type Assertions**:

  - Override the compiler's inferred type using angle-bracket syntax or `as` syntax.
  - Useful for DOM manipulation, handling `any` type, and calling functions on union types.
  - Ensure assumptions about the type are correct to avoid runtime errors.

- **Combining Type Guards and Type Assertions**:

  - Use both to ensure type safety in complex scenarios.

- **Real-World Use Cases**:
  - API response handling, form handling in React, and integrating third-party libraries.
