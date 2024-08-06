### Ambient Declarations in TypeScript

Ambient declarations in TypeScript are a mechanism used to describe the shape of external libraries or code that TypeScript cannot directly infer the types of. They help TypeScript understand the types and structures of external code, such as JavaScript libraries, that are not written in TypeScript.

---

#### 1. **Introduction to Ambient Declarations**

Ambient declarations allow you to declare types and interfaces for code that exists outside of your TypeScript project. This is crucial when working with external libraries or integrating with legacy code that doesn’t include type definitions.

##### **Purpose**

- **Type Definition**: Provide TypeScript with information about the shape and types of existing JavaScript code.
- **Interoperability**: Enable TypeScript to interact with external libraries and APIs.

#### 2. **Ambient Declarations Overview**

Ambient declarations are typically found in `.d.ts` files (declaration files), which contain type information but no executable code. These files are used to define the shape of external modules, libraries, or global variables.

##### **Syntax**

Ambient declarations use the `declare` keyword to indicate that the actual implementation exists elsewhere.

```typescript
declare function externalFunction(param: string): void;
declare const externalVariable: number;
declare class ExternalClass {
  method(param: string): void;
}
```

#### 3. **Types of Ambient Declarations**

1. **Global Variable Declarations**

   Define types for global variables that are available throughout the project.

   ```typescript
   // globals.d.ts
   declare const MY_GLOBAL: string;
   ```

   ```typescript
   console.log(MY_GLOBAL); // TypeScript understands MY_GLOBAL is a string
   ```

2. **Function Declarations**

   Specify the types for functions that are globally available or from external libraries.

   ```typescript
   // functions.d.ts
   declare function myFunction(param1: number, param2: string): boolean;
   ```

   ```typescript
   const result = myFunction(42, "example"); // TypeScript understands the function signature
   ```

3. **Class Declarations**

   Describe the structure of classes that are available globally or from external libraries.

   ```typescript
   // classes.d.ts
   declare class MyClass {
     constructor(name: string);
     myMethod(value: number): void;
   }
   ```

   ```typescript
   const obj = new MyClass("example");
   obj.myMethod(42);
   ```

4. **Module Declarations**

   Define types for modules or libraries that are imported into your project.

   ```typescript
   // module.d.ts
   declare module "my-module" {
     export function myFunction(param: string): void;
   }
   ```

   ```typescript
   import { myFunction } from "my-module";
   myFunction("example");
   ```

5. **Namespace Declarations**

   Declare types for namespaces, providing type information for objects and methods within them.

   ```typescript
   // namespace.d.ts
   declare namespace MyNamespace {
     function myFunction(param: number): void;
     const myConstant: string;
   }
   ```

   ```typescript
   MyNamespace.myFunction(42);
   console.log(MyNamespace.myConstant);
   ```

#### 4. **Creating and Using Declaration Files**

1. **Creating Declaration Files**

   Create `.d.ts` files to describe the types of external code or libraries. Place them in a directory where TypeScript can find them, such as a `types` or `@types` directory.

   ```typescript
   // my-library.d.ts
   declare module "my-library" {
     export function libraryFunction(param: string): void;
   }
   ```

2. **Configuring TypeScript**

   Ensure TypeScript is configured to include your declaration files. This is typically managed with the `typeRoots` or `files` option in `tsconfig.json`.

   ```json
   {
     "compilerOptions": {
       "typeRoots": ["./node_modules/@types", "./types"]
     }
   }
   ```

3. **Using Declaration Files**

   Import or use the types declared in your `.d.ts` files as if they were part of your TypeScript code.

   ```typescript
   import { libraryFunction } from "my-library";
   libraryFunction("example");
   ```

#### 5. **Declaration Merging**

TypeScript allows for declaration merging, where multiple ambient declarations can be combined to form a single type.

##### **Example**

```typescript
// module1.d.ts
declare module "my-module" {
  export interface MyInterface {
    property1: string;
  }
}

// module2.d.ts
declare module "my-module" {
  export interface MyInterface {
    property2: number;
  }
}
```

In this example, the `MyInterface` type from `"my-module"` will include both `property1` and `property2` after merging.

#### 6. **Real-World Use Cases**

**1. Integrating with JavaScript Libraries**

Ambient declarations are essential for integrating TypeScript with popular JavaScript libraries that don’t provide their own type definitions.

```typescript
// lodash.d.ts
declare module "lodash" {
  export function debounce(func: Function, wait: number): Function;
}
```

**2. Working with External APIs**

When using APIs or third-party services, ambient declarations help TypeScript understand the API structure and types.

```typescript
// api.d.ts
declare module "api-service" {
  export function fetchData(url: string): Promise<any>;
}
```

**3. Enhancing Legacy Codebases**

Ambient declarations allow TypeScript to provide type information for existing JavaScript codebases that are not TypeScript-compatible.

```typescript
// legacy.d.ts
declare function legacyFunction(param: string): void;
```

#### 7. **Limitations and Considerations**

- **No Implementation**: `.d.ts` files provide type information but do not include any implementation code.
- **Global Pollution**: Be cautious when declaring global variables to avoid polluting the global namespace and causing conflicts.
- **Maintenance**: Keep declaration files updated to match changes in the external code or libraries they describe.

### Summary

- **Ambient Declarations**:

  - Describe the shape and types of external code.
  - Used in `.d.ts` files to provide TypeScript with type information for JavaScript code.

- **Types of Declarations**:

  - Global Variables
  - Functions
  - Classes
  - Modules
  - Namespaces

- **Creating and Using Declaration Files**:

  - Create `.d.ts` files for external code.
  - Configure TypeScript to include these files.

- **Declaration Merging**:

  - Combine multiple declarations into a single type.

- **Real-World Use Cases**:
  - Integrating JavaScript libraries
  - Working with external APIs
  - Enhancing legacy codebases
