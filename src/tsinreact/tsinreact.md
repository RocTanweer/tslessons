### Comprehensive Guide: TypeScript with React

Integrating TypeScript with React can significantly improve your development experience by catching errors early, providing better documentation, and enhancing IDE support. Below, you'll find comprehensive lessons, tips, and techniques for effectively using TypeScript in React projects, along with practical code examples.

---

#### 1. **TypeScript with React Components**

##### **1.1 Functional Components**

Functional components are the preferred way to write React components in TypeScript.

**Defining Props:**

```typescript
interface GreetingProps {
  name: string;
  age?: number; // Optional prop
}

const Greeting: React.FC<GreetingProps> = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>Age: {age}</p>}
    </div>
  );
};
```

**Usage:**

```typescript
<Greeting name="John" />
<Greeting name="Jane" age={30} />
```

##### **1.2 Class Components**

Although less common, you can also define class components with TypeScript.

**Defining Props and State:**

```typescript
interface CounterProps {
  initialCount: number;
}

interface CounterState {
  count: number;
}

class Counter extends React.Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);
    this.state = { count: props.initialCount };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}
```

**Usage:**

```typescript
<Counter initialCount={0} />
```

---

#### 2. **Typing Event Handlers**

Properly typing event handlers ensures type safety and improves readability.

**Typing Form Events:**

```typescript
const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value);
};

return <input type="text" onChange={handleInputChange} />;
```

**Typing Button Click Events:**

```typescript
const handleClick = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  console.log("Button clicked");
};

return <button onClick={handleClick}>Click me</button>;
```

---

#### 3. **Using Hooks with TypeScript**

##### **3.1 useState**

**Typing State:**

```typescript
const [count, setCount] = React.useState<number>(0);

setCount(count + 1);
```

**Typing State with Generics:**

```typescript
const [items, setItems] = React.useState<Array<string>>([]);

setItems([...items, "New item"]);
```

##### **3.2 useReducer**

**Typing Reducer and State:**

```typescript
interface State {
  count: number;
}

type Action = { type: "increment" } | { type: "decrement" };

const initialState: State = { count: 0 };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const [state, dispatch] = React.useReducer(reducer, initialState);

dispatch({ type: "increment" });
```

##### **3.3 useRef**

**Typing References:**

```typescript
const inputRef = React.useRef<HTMLInputElement>(null);

const focusInput = () => {
  inputRef.current?.focus();
};

return <input ref={inputRef} />;
```

---

#### 4. **Typing Context**

**Creating a Context:**

```typescript
interface AuthContextType {
  user: string;
  login: () => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);
```

**Providing Context:**

```typescript
const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<string>("");

  const login = () => setUser("JohnDoe");
  const logout = () => setUser("");

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

**Consuming Context:**

```typescript
const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <p>User: {user}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

---

#### 5. **Typing Higher-Order Components (HOCs)**

**Defining an HOC:**

```typescript
interface WithLoadingProps {
  loading: boolean;
}

const withLoading =
  <P extends object>(
    Component: React.ComponentType<P>
  ): React.FC<P & WithLoadingProps> =>
  ({ loading, ...props }) => {
    if (loading) {
      return <div>Loading...</div>;
    }
    return <Component {...(props as P)} />;
  };

// Usage with a component
interface DataProps {
  data: string;
}

const DataComponent: React.FC<DataProps> = ({ data }) => <div>{data}</div>;

const DataWithLoading = withLoading(DataComponent);

// Render
<DataWithLoading loading={true} data="Sample Data" />;
```

---

#### 6. **Typing Styled Components**

Styled-components is a popular library for writing CSS in JS.

**Installing Dependencies:**

```sh
npm install styled-components @types/styled-components
```

**Defining and Using Styled Components:**

```typescript
import styled from "styled-components";

interface ButtonProps {
  primary?: boolean;
}

const Button = styled.button<ButtonProps>`
  background: ${(props) => (props.primary ? "blue" : "gray")};
  color: white;
  padding: 10px;
`;

return <Button primary>Click me</Button>;
```

---

#### 7. **Handling External Data**

**Fetching and Typing API Responses:**

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("/api/users");
  const data: User[] = await response.json();
  return data;
};

React.useEffect(() => {
  fetchUsers().then((users) => {
    console.log(users);
  });
}, []);
```

---

#### 8. **Advanced Tips and Techniques**

##### **8.1 Default Props**

**Defining Default Props:**

```typescript
interface GreetingProps {
  name: string;
  age?: number;
}

const Greeting: React.FC<GreetingProps> = ({ name, age }) => (
  <div>
    <h1>Hello, {name}!</h1>
    {age && <p>Age: {age}</p>}
  </div>
);

Greeting.defaultProps = {
  age: 30,
};

// Usage
<Greeting name="John" />;
```

##### **8.2 Union Types and Conditional Rendering**

**Using Union Types:**

```typescript
interface LoadingState {
  type: "loading";
}

interface ErrorState {
  type: "error";
  message: string;
}

interface DataState<T> {
  type: "data";
  data: T;
}

type FetchState<T> = LoadingState | ErrorState | DataState<T>;

const DataComponent: React.FC<{ state: FetchState<string> }> = ({ state }) => {
  switch (state.type) {
    case "loading":
      return <div>Loading...</div>;
    case "error":
      return <div>Error: {state.message}</div>;
    case "data":
      return <div>Data: {state.data}</div>;
  }
};
```

##### **8.3 Handling Complex State with useReducer**

**Using useReducer for Complex State:**

```typescript
interface State {
  count: number;
  text: string;
}

type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "setText"; text: string };

const initialState: State = { count: 0, text: "" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "setText":
      return { ...state, text: action.text };
    default:
      return state;
  }
};

const Component: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <input
        value={state.text}
        onChange={(e) => dispatch({ type: "setText", text: e.target.value })}
      />
    </div>
  );
};
```
