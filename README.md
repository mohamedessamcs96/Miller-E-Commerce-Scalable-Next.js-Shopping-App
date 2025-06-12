
---



#  Miller E-commerce App

A modern and responsive e-commerce web application built with **Next.js**, integrated with **PostgreSQL** as a backend database, and containerized using **Docker**. The app features product browsing, a shopping cart, and a clean UI built with **Tailwind CSS**.

---

##  Features

-  Server-side rendered with Next.js for fast performance
-  Responsive UI using Tailwind CSS
-  PostgreSQL database via Prisma ORM
-  Product listing and cart system
-  JWT-based authentication
-  Dockerized for easy deployment

---


---

##  Running the Project

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/miller-ecommerce.git
cd miller-ecommerce
````

### 2. Set up Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://youruser:yourpass@localhost:5432/millerdb"
JWT_SECRET=your_jwt_secret
```

> For Docker builds, you can also pass these via `docker-compose.yaml`.

---

##  Run with Docker

### Build and Run the Containers:

```bash
docker-compose up --build
```

This will:

* Start the Next.js app on `http://localhost:3000`
* Launch a PostgreSQL database container

---

##  Prisma Commands

To apply migrations:

```bash
npx prisma migrate dev
```

To generate Prisma client:

```bash
npx prisma generate
```

---

##  Preview

![App Screenshot](public/images/mainimage.jpg)

---

##  Author

* **Mohamed Essam**
* GitHub: [@mohamedessamcs96](https://github.com/mohamedessamcs96)

---

