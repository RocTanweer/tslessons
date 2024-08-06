### Basic Types in TypeScript

TypeScript provides a set of basic types that can be used to describe the shape of data and enforce type safety in your programs. These basic types are foundational for writing TypeScript code and include the following:

#### 1. **Boolean**

Represents a logical value that can be either `true` or `false`.

```typescript
let isActive: boolean = true;
```

#### 2. **Number**

Represents numeric values. TypeScript does not differentiate between integers and floating-point numbers; they are all treated as `number`.

```typescript
let age: number = 30;
let temperature: number = 98.6;
```

#### 3. **String**

Represents a sequence of characters. TypeScript supports single quotes, double quotes, and template literals.

```typescript
let name: string = "Alice";
let greeting: string = `Hello, ${name}!`;
```

#### 4. **Array**

Represents a collection of elements of the same type. Arrays can be defined using the `type[]` syntax or the `Array<type>` generic.

```typescript
let numbers: number[] = [1, 2, 3];
let fruits: Array<string> = ["apple", "banana", "cherry"];
```

#### 5. **Tuple**

Represents an array with a fixed number of elements where each element can have a different type. Tuples are useful for defining a set structure.

```typescript
let user: [string, number] = ["Alice", 30];
```

#### 6. **Enum**

Represents a set of named constants. Enums can be numeric or string-based.

```typescript
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

let move: Direction = Direction.Up;
```

#### 7. **Any**

Represents any value and disables type checking for that value. It should be used sparingly as it bypasses TypeScript's type safety.

```typescript
let anything: any = "Could be anything";
anything = 42; // No error
```

#### 8. **Unknown**

Represents a value that is unknown. Unlike `any`, `unknown` requires you to perform some type checking before performing operations on the value.

```typescript
let value: unknown = "This could be any type";

if (typeof value === "string") {
  console.log(value.toUpperCase()); // Safe to use string methods
}
```

#### 9. **Void**

Represents the absence of a value. It is typically used for functions that do not return a value.

```typescript
function logMessage(message: string): void {
  console.log(message);
}
```

#### 10. **Null and Undefined**

Represent the absence of a value. By default, `null` and `undefined` are distinct types. You can enable strict checking to enforce explicit checks.

```typescript
let notDefined: undefined = undefined;
let emptyValue: null = null;
```

#### 11. **Never**

Represents values that never occur. It is used for functions that never return, such as those that throw exceptions or have infinite loops.

```typescript
function throwError(message: string): never {
  throw new Error(message);
}
```

### Summary

- **Boolean**: `boolean`
- **Number**: `number`
- **String**: `string`
- **Array**: `number[]` or `Array<number>`
- **Tuple**: `[string, number]`
- **Enum**: `enum Direction { Up, Down }`
- **Any**: `any`
- **Unknown**: `unknown`
- **Void**: `void`
- **Null and Undefined**: `null`, `undefined`
- **Never**: `never`

These basic types form the foundation of TypeScript and allow you to write type-safe code, reducing the likelihood of runtime errors.
