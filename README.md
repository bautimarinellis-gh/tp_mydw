# E-commerce Backend API

## Documentación de APIs

### Autenticación

#### POST `/api/usuarios/register`

Registra un nuevo usuario en el sistema.

**Body:**

```json
{
  "nombre": "Pedro",
  "apellido": "Pompiyo",
  "email": "ppompiyo@gmail.com",
  "edad": 74,
  "password": "password123"
}
```

**Respuesta:**

```json
{
  "nombre": "Pedro",
  "apellido": "Pompiyo",
  "email": "ppompiyo@gmail.com",
  "edad": 74,
  "password": "$2b$10$rV2nM8A2uRoR.oV5GTjxnuY05mLqyqQZ5KjuxsLfQjIpfKd5UUNNK",
  "_id": "68d972ce41aea24d770b1693",
  "__v": 0
}
```

#### POST `/api/usuarios/login`

Inicia sesión y obtiene tokens de autenticación.

**Body:**

```json
{
  "email": "juan@ejemplo.com",
  "password": "password123"
}
```

**Respuesta:**

```json
{
  "message": "Login exitoso",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "68d877b0bfb179554a04c7e8",
    "email": "bautimarinelli100@gmail.com"
  }
}
```

**Nota:** Los tokens también se envían automáticamente como cookies HTTP-only para mayor seguridad.

#### POST `/api/usuarios/logout`

Cierra la sesión del usuario.

**Respuesta:**

```json
{
  "message": "Logout exitoso"
}
```

### Productos

#### GET `/api/productos`

Obtiene todos los productos disponibles.

**Respuesta:**

```json
[
  {
    "_id": "68d877b0bfb179554a04c7e9",
    "code": "LAP001",
    "nombre": "Laptop Gaming ASUS ROG",
    "precio": 120000,
    "descripcion": "Laptop gaming de alta gama con procesador Intel i7, 16GB RAM, GPU RTX 4060",
    "stock": 10
  }
]
```

#### POST `/api/productos`

Crea un nuevo producto (requiere autenticación).

**Body:**

```json
{
  "code": "MON002",
  "nombre": "Monitor Samsung 27\" 4K",
  "precio": 85000,
  "descripcion": "Monitor profesional de 27 pulgadas con resolución 4K UHD, panel IPS, 99% sRGB",
  "stock": 15
}
```

#### GET `/api/productos/:id`

Obtiene un producto específico por ID.

#### PUT `/api/productos/:id`

Actualiza un producto existente (requiere autenticación).

#### DELETE `/api/productos/:id`

Elimina un producto (requiere autenticación).

### Carrito de Compras

#### POST `/api/detalles/`

Agrega un producto al carrito temporal (requiere autenticación).

**Body:**

```json
{
  "producto": "LAP001",
  "cantidad": 1,
  "subtotal": 120000
}
```

**Respuesta:**

```json
{
  "message": "Detalle agregado al pedido temporal",
  "detalle": {
    "producto": "LAP001",
    "cantidad": 1,
    "subtotal": 120000
  },
  "totalDetalles": 1
}
```

#### GET `/api/detalles/`

Obtiene todos los detalles del carrito temporal (requiere autenticación).

**Respuesta:**

```json
{
  "detalles": [
    {
      "producto": "LAP001",
      "cantidad": 1,
      "subtotal": 120000
    },
    {
      "producto": "MON002",
      "cantidad": 2,
      "subtotal": 170000
    }
  ],
  "total": 2
}
```

#### DELETE `/api/detalles/:index`

Elimina un detalle específico del carrito por índice (requiere autenticación).

#### DELETE `/api/detalles/`

Limpia todo el carrito temporal (requiere autenticación).

### Pedidos

#### POST `/api/pedidos/`

Crea un nuevo pedido con los detalles del carrito temporal (requiere autenticación).

**Body:**

```json
{
  "usuario": "68d877b0bfb179554a04c7e8",
  "fecha": "2024-01-15T10:30:00.000Z",
  "total": 290000
}
```

**Respuesta:**

```json
{
  "message": "Pedido creado exitosamente",
  "pedido": {
    "_id": "68d877b0bfb179554a04c7ea",
    "usuario": "68d877b0bfb179554a04c7e8",
    "fecha": "2024-01-15T10:30:00.000Z",
    "total": 290000,
    "detalles": [
      {
        "producto": "68d877b0bfb179554a04c7e9",
        "cantidad": 1,
        "subtotal": 120000
      }
    ]
  }
}
```

#### GET `/api/pedidos/`

Obtiene todos los pedidos del usuario autenticado.

#### GET `/api/pedidos/:id`

Obtiene un pedido específico del usuario autenticado.

#### DELETE `/api/pedidos/:id`
