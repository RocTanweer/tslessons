### Enums in TypeScript

Enums in TypeScript provide a way to define a set of named constants. They are useful for representing a collection of related values in a more readable and maintainable way. This comprehensive note covers the different types of enums, their features, and real-world use cases.

#### 1. **Basic Enum Syntax**

An enum is defined using the `enum` keyword. By default, enums in TypeScript are numeric.

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let move: Direction = Direction.Up;
console.log(move); // 0
```

#### 2. **Numeric Enums**

By default, the first member of an enum has the value `0`, and the values for subsequent members are incremented by 1. You can also assign specific numeric values to members.

```typescript
enum Status {
  Active = 1,
  Inactive,
  Pending,
}

console.log(Status.Active); // 1
console.log(Status.Inactive); // 2
console.log(Status.Pending); // 3
```

#### 3. **String Enums**

String enums are similar to numeric enums, but each member is initialized with a string value.

```typescript
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}

console.log(Color.Red); // RED
console.log(Color.Green); // GREEN
console.log(Color.Blue); // BLUE
```

#### 4. **Heterogeneous Enums**

Heterogeneous enums contain both string and numeric values, although this practice is generally discouraged because it can lead to confusion.

```typescript
enum MixedEnum {
  No = 0,
  Yes = "YES",
}

console.log(MixedEnum.No); // 0
console.log(MixedEnum.Yes); // YES
```

#### 5. **Computed and Constant Members**

Enum members can be either constant or computed. Constant members are initialized with constant values, whereas computed members are evaluated at runtime.

```typescript
enum FileAccess {
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  Computed = "123".length,
}

console.log(FileAccess.None); // 0
console.log(FileAccess.Read); // 2
console.log(FileAccess.Write); // 4
console.log(FileAccess.ReadWrite); // 6
console.log(FileAccess.Computed); // 3
```

#### 6. **Reverse Mapping**

Numeric enums support reverse mapping, which allows you to map from a value to its name.

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let directionName: string = Direction[0];
console.log(directionName); // Up
```

#### 7. **Const Enums**

Const enums are a way to define enums that are inlined at compile time, which can result in smaller code output.

```typescript
const enum Month {
  January,
  February,
  March,
}

let month: Month = Month.January;
console.log(month); // 0
```

#### 8. **Ambient Enums**

Ambient enums are used to describe the shape of enums that are defined elsewhere, such as in a library.

```typescript
declare enum ExternalEnum {
  A = 1,
  B,
  C = 2,
}
```

### Real-World Use Cases

#### 1. **State Management**

Enums are commonly used to manage state in an application, making the code more readable and maintainable.

```typescript
enum AppState {
  Loading,
  Loaded,
  Error,
}

function handleAppState(state: AppState) {
  switch (state) {
    case AppState.Loading:
      console.log("App is loading");
      break;
    case AppState.Loaded:
      console.log("App is loaded");
      break;
    case AppState.Error:
      console.log("App encountered an error");
      break;
  }
}

handleAppState(AppState.Loading); // App is loading
```

#### 2. **API Response Handling**

Enums can represent different types of API responses, making it easier to handle them in a structured way.

```typescript
enum ResponseStatus {
  Success = "SUCCESS",
  Failure = "FAILURE",
  Pending = "PENDING",
}

function handleResponse(status: ResponseStatus) {
  if (status === ResponseStatus.Success) {
    console.log("Request was successful");
  } else if (status === ResponseStatus.Failure) {
    console.log("Request failed");
  } else {
    console.log("Request is pending");
  }
}

handleResponse(ResponseStatus.Success); // Request was successful
```

#### 3. **Role-Based Access Control**

Enums can be used to define user roles and manage access control in an application.

```typescript
enum UserRole {
  Admin,
  Editor,
  Viewer,
}

function checkAccess(role: UserRole) {
  if (role === UserRole.Admin) {
    console.log("Full access granted");
  } else if (role === UserRole.Editor) {
    console.log("Edit access granted");
  } else {
    console.log("View only access");
  }
}

checkAccess(UserRole.Editor); // Edit access granted
```

#### 4. **Form Handling**

Enums can help in managing form states and field validation.

```typescript
enum FormStatus {
  Valid,
  Invalid,
  Pending,
}

function validateForm(status: FormStatus) {
  if (status === FormStatus.Valid) {
    console.log("Form is valid");
  } else if (status === FormStatus.Invalid) {
    console.log("Form is invalid");
  } else {
    console.log("Form validation is pending");
  }
}

validateForm(FormStatus.Pending); // Form validation is pending
```

### Summary

- **Basic Enum Syntax**: Define a set of named constants.
- **Numeric Enums**: Default numeric values starting from 0, can assign specific values.
- **String Enums**: Each member initialized with a string value.
- **Heterogeneous Enums**: Combination of string and numeric values.
- **Computed and Constant Members**: Constant values and runtime-evaluated values.
- **Reverse Mapping**: Map from a value to its name.
- **Const Enums**: Inlined at compile time for smaller code output.
- **Ambient Enums**: Describe the shape of enums defined elsewhere.
