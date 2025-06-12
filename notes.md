
---

###  **1. Project Setup**

```bash
npx create-next-app@latest ecommerce-app
cd ecommerce-app
```

* Installed core libraries:

```bash
npm install tailwindcss @headlessui/react axios react-hook-form react-toastify
```

* Switched to Node.js version 20:

```bash
rm -rf node_modules package-lock.json
nvm install 20
nvm use 20
```

* Created a TypeScript-based Next.js app with ESLint:

```bash
npx create-next-app@latest my-project --typescript --eslint --app
```

---

###  **2. Styling Setup (Tailwind)**

* Installed TailwindCSS & PostCSS plugins:

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

* Configured Tailwind in `postcss.config.js`:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

* Imported Tailwind in your CSS:

```css
@import "tailwindcss";
```

* Started the dev server:

```bash
npm run dev
```

---

###  **3. Backend & Auth Setup**

* Installed authentication and security packages:

```bash
npm install bcrypt jsonwebtoken bcryptjs next-auth
```

* Created upload folder:

```bash
mkdir -p public/uploads
```

---

###  **4. Prisma & Database Tools**

```bash
npx prisma studio
```

* Used Prisma with Docker to manage PostgreSQL database and data models.

---

###  **5. Installed UI & Motion Libraries**

```bash
npm install @heroicons/react
npm install @next-auth/prisma-adapter
npm install framer-motion
```

---

###  **6. Example API Flow**

* Typical form flow:

```txt
[Frontend Form (pages)] → [POST /api/checkout] → [router.push('/success')]
```

---

###  **7. React Core Concepts **

####  **Props vs State**

* **Props**: Read-only, passed from parent to child.
* **State**: Internal, mutable, updates UI when changed.

#### 🔹 **React Hooks**

* **State Hook** (`useState`, `useReducer`): Manage internal values.
* **Context Hook** (`useContext`): Share data between components without props.
* **Ref Hook** (`useRef`): Store mutable data without causing re-renders.
* **Effect Hook** (`useEffect`): Sync with external systems (like APIs).

---

Let me know if you want this as a Markdown doc or post version too!
