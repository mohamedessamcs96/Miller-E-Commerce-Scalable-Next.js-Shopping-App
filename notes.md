npx create-next-app@latest ecommerce-app
cd ecommerce-app
npm install tailwindcss @headlessui/react axios react-hook-form react-toastify


rm -rf node_modules package-lock.json

nvm install 20
nvm use 20



npx create-next-app@latest my-project --typescript --eslint --app
cd my-project
npm install tailwindcss @tailwindcss/postcss postcss

const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
@import "tailwindcss";
npm run dev



npm install bcrypt jsonwebtoken
npm install bcryptjs
npm install next-auth
mkdir -p public/uploads



we learned that props refer to attributes from parent components. In the end, props represent "read-only" data that are immutable.

A component's state, on the other hand, represents mutable data that ultimately affects what is rendered on the page. State is managed internally by the component itself and is meant to change over time, commonly due to user input (e.g., clicking on a button on the page).

Once your state changes,your UI will automatically update accordingly.



State Hooks 
State lets a component “remember” information like user input. For example, a form component can use state to store the input value, while an image gallery component can use state to store the selected image index.

To add state to a component, use one of these Hooks:

useState declares a state variable that you can update directly.
useReducer declares a state variable with the update logic inside a reducer function.
function ImageGallery() {
  const [index, setIndex] = useState(0);
  // ...
Context Hooks 
Context lets a component receive information from distant parents without passing it as props. For example, your app’s top-level component can pass the current UI theme to all components below, no matter how deep.

useContext reads and subscribes to a context.
function Button() {
  const theme = useContext(ThemeContext);
  // ...
Ref Hooks 
Refs let a component hold some information that isn’t used for rendering, like a DOM node or a timeout ID. Unlike with state, updating a ref does not re-render your component. Refs are an “escape hatch” from the React paradigm. They are useful when you need to work with non-React systems, such as the built-in browser APIs.

useRef declares a ref. You can hold any value in it, but most often it’s used to hold a DOM node.
useImperativeHandle lets you customize the ref exposed by your component. This is rarely used.
function Form() {
  const inputRef = useRef(null);
  // ...
Effect Hooks 
Effects let a component connect to and synchronize with external systems. This includes dealing with network, browser DOM, animations, widgets written using a different UI library, and other non-React code.

useEffect connects a component to an external system.
function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
  // ...
Effects are an “escape hatch” from the React paradigm. Don’t use Effects to orchestrate the data flow of your application. If you’re not interacting with an external system, you might not need an Effect.

There are two rarely used variations of useEffect with differences in timing:

useLayoutEffect fires before the browser repaints the screen. You can measure layout here.
useInsertionEffect fires before React makes changes to the DOM. Libraries can insert dynamic CSS here.



npx prisma studio
