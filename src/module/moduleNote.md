### Modules in TypeScript

Modules are a key feature in TypeScript (and JavaScript) that allow you to organize code into self-contained units. They help in managing dependencies, promoting code reuse, and improving maintainability by separating concerns. This comprehensive note covers the basics, syntax, types, and real-world use cases of modules in TypeScript.

---

#### 1. **Basics of Modules**

Modules in TypeScript (and JavaScript) are files and any values, functions, classes, or interfaces defined in them. Each file is considered a module, and variables, functions, classes, etc., defined in a module are scoped to that module unless explicitly exported.

##### **Module Syntax**

- **Export**: Make components available to other modules.
- **Import**: Include components from other modules.

```typescript
// Exporting from a module
export const pi = 3.14;
export function calculateCircumference(diameter: number): number {
  return diameter * pi;
}

// Importing in another module
import { pi, calculateCircumference } from "./circle";
console.log(calculateCircumference(10)); // 31.4
```

#### 2. **Exporting**

TypeScript supports several ways to export components from a module.

##### **Named Exports**

Named exports allow you to export multiple components from a module. Each export is referenced by its name.

```typescript
// Named exports
export const name = "Alice";
export function greet() {
  console.log("Hello, " + name);
}
```

##### **Default Exports**

Default exports are used to export a single value from a module. They do not require curly braces during import.

```typescript
// Default export
export default function greet() {
  console.log("Hello, World");
}

// Importing default export
import greet from "./greet";
greet(); // Hello, World
```

##### **Re-exports**

Re-exports allow you to export components from other modules without importing them first.

```typescript
// Re-exporting
export { pi, calculateCircumference } from "./circle";
```

##### **Export All**

Export all components from another module.

```typescript
// Export all
export * from "./circle";
```

#### 3. **Importing**

TypeScript provides multiple ways to import components from modules.

##### **Named Imports**

Import specific components by their names.

```typescript
import { pi, calculateCircumference } from "./circle";
```

##### **Default Imports**

Import a default export without curly braces.

```typescript
import greet from "./greet";
```

##### **Import All as Namespace**

Import all components as a single object.

```typescript
import * as Circle from "./circle";
console.log(Circle.pi); // 3.14
```

##### **Combining Import and Export**

You can combine import and export in a single statement.

```typescript
export { pi, calculateCircumference } from "./circle";
```

#### 4. **Types of Modules**

There are two main module systems in TypeScript: ES Modules and CommonJS.

##### **ES Modules**

ES Modules (ECMAScript Modules) are the standardized module system for JavaScript, used in modern JavaScript development.

```typescript
// circle.ts (ES Module)
export const pi = 3.14;
export function calculateCircumference(diameter: number): number {
  return diameter * pi;
}

// main.ts (ES Module)
import { pi, calculateCircumference } from "./circle";
console.log(calculateCircumference(10)); // 31.4
```

##### **CommonJS Modules**

CommonJS is a module system used primarily in Node.js.

```typescript
// circle.js (CommonJS Module)
exports.pi = 3.14;
exports.calculateCircumference = function (diameter) {
  return diameter * exports.pi;
};

// main.js (CommonJS Module)
const circle = require("./circle");
console.log(circle.calculateCircumference(10)); // 31.4
```

##### **AMD (Asynchronous Module Definition)**

AMD is a module system used in browser environments, particularly with libraries like RequireJS.

```javascript
// circle.js (AMD Module)
define(["require", "exports"], function (require, exports) {
  exports.pi = 3.14;
  exports.calculateCircumference = function (diameter) {
    return diameter * exports.pi;
  };
});

// main.js (AMD Module)
require(["./circle"], function (circle) {
  console.log(circle.calculateCircumference(10)); // 31.4
});
```

##### **UMD (Universal Module Definition)**

UMD is a module system that aims to support both CommonJS and AMD environments.

```javascript
// circle.js (UMD Module)
(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory(); // CommonJS
  } else if (typeof define === "function" && define.amd) {
    define(factory); // AMD
  } else {
    window.circle = factory(); // Browser
  }
})(function () {
  const pi = 3.14;
  function calculateCircumference(diameter) {
    return diameter * pi;
  }
  return { pi, calculateCircumference };
});
```

#### 5. **Module Resolution**

Module resolution is the process by which TypeScript determines what an import refers to. TypeScript supports two module resolution strategies: Classic and Node.

##### **Classic**

The Classic module resolution strategy mimics the behavior of the TypeScript compiler before Node.js support was added.

```typescript
// Classic resolution example
import { someFunc } from "./moduleA"; // Resolves to './moduleA.ts'
```

##### **Node**

The Node module resolution strategy mimics the Node.js module resolution mechanism.

```typescript
// Node resolution example
import { someFunc } from "moduleA"; // Resolves to 'node_modules/moduleA/index.ts' or similar
```

##### **Path Mapping**

Path mapping allows you to define custom module resolution paths.

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@app/*": ["src/app/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}

// Import using path mapping
import { someUtil } from '@utils/someUtil';
```

#### 6. **Real-World Use Cases**

**1. Organizing Code in a Large Project**:

Modularize your codebase by separating different features into their own modules.

```typescript
// user.ts
export interface User {
  id: number;
  name: string;
}

// userService.ts
import { User } from "./user";

export function getUser(id: number): User {
  return { id, name: "Alice" };
}

// app.ts
import { getUser } from "./userService";

const user = getUser(1);
console.log(user.name); // Alice
```

**2. Shared Utility Functions**:

Create a utilities module to hold common functions.

```typescript
// utils.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

// app.ts
import { add, subtract } from "./utils";

console.log(add(5, 3)); // 8
console.log(subtract(5, 3)); // 2
```

**3. Using Third-Party Modules**:

Import and use third-party modules in your TypeScript project.

```typescript
// Install a third-party module
// npm install lodash

// Import and use lodash in a TypeScript file
import _ from "lodash";

const array = [1, 2, 3, 4];
const reversedArray = _.reverse(array.slice());
console.log(reversedArray); // [4, 3, 2, 1]
```

**4. Configuring Paths for Clean Imports**:

Use path mapping in `tsconfig.json` for cleaner import statements.

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@models/*": ["src/models/*"],
      "@services/*": ["src/services/*"]
    }
  }
}

// Import using path mapping
import { User } from '@models/user';
import { getUser } from '@services/userService';
```

### Summary

- **Modules**:

  - Organize code into self-contained units.
  - Manage dependencies and promote code reuse.

- **Exporting and Importing**:

  - Named exports, default exports, re-exports, and export all.
  - Named imports, default imports, and import all as a namespace.

- **Module Types**:

  - ES Modules: Standardized module system for modern JavaScript.
  - CommonJS: Used primarily in Node.js.
  - AMD: Used in browser environments.
  - UMD: Supports both CommonJS and AMD environments.

- **Module Resolution**:

  - Classic and Node resolution strategies.
  - Path mapping for custom module resolution.

- **Real-World Use Cases**:
  - Organizing code in large projects.
  - Shared utility functions.
  - Using third-party modules.
  - Configuring paths for clean imports.
