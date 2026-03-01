# Tienda SV - Guía de Configuración

## 🚀 Inicio Rápido

### 1. Configurar Supabase

1. Crea una cuenta gratuita en [https://supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a **SQL Editor** y ejecuta el archivo `supabase/schema.sql` completo
4. En **Settings > API**, copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
cp .env.example .env.local
```

Edita `.env.local` y agrega tus credenciales de Supabase.

### 3. Instalar Dependencias

```bash
npm install
```

### 4. Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

---

## 👤 Crear Usuario Administrador

Después de ejecutar el esquema de base de datos:

1. Registra una cuenta normal desde la interfaz
2. Ve a tu dashboard de Supabase → **Table Editor** → **profiles**
3. Encuentra tu usuario y cambia el campo `role` de `customer` a `admin`
4. Ahora puedes acceder a `/admin`

---

## 📦 Estructura del Proyecto

```
tienda-sv/
├── app/
│   ├── (auth)/          # Páginas de autenticación
│   │   ├── login/
│   │   └── register/
│   ├── admin/           # Panel de administración
│   │   ├── productos/
│   │   ├── pedidos/
│   │   └── layout.tsx
│   ├── productos/       # Catálogo público
│   ├── page.tsx         # Homepage
│   └── layout.tsx       # Layout principal
├── components/
│   └── ui/              # Componentes reutilizables
├── lib/
│   ├── supabase/        # Clientes de Supabase
│   └── store/           # Estado global (Zustand)
├── supabase/
│   └── schema.sql       # Esquema de base de datos
└── public/
    └── manifest.json    # Configuración PWA
```

---

## 🎨 Características Implementadas

### ✅ Autenticación
- Login y registro de usuarios
- Protección de rutas con middleware
- Roles (customer/admin)

### ✅ Productos
- Listado de productos con filtros
- Búsqueda
- Categorías
- Imágenes múltiples

### ✅ Admin Panel
- Dashboard con estadísticas
- Gestión de productos (CRUD)
- Vista de pedidos
- Gestión de clientes

### ✅ UI/UX Premium
- Diseño glassmorphic
- Dark mode automático
- Animaciones micro-interactivas
- Responsive (móvil, tablet, desktop)
- PWA instalable

### ✅ Carrito de Compras
- Gestión de carrito con Zustand
- Persistencia en localStorage
- Cálculo de totales

---

## 🔐 Seguridad

La aplicación implementa múltiples capas de seguridad:

1. **Row Level Security (RLS)**: Los usuarios solo pueden ver sus propios datos
2. **Middleware**: Protege rutas admin y de cliente
3. **Validación**: Tanto en frontend como en base de datos
4. **Autenticación JWT**: Manejada por Supabase

---

## 🚀 Próximos Pasos

Para completar la implementación:

1. **Integrar PayU** para pagos (requiere cuenta de PayU)
2. **Crear formulario de productos** en admin
3. **Implementar checkout** completo
4. **Agregar gestión de pedidos** para clientes
5. **Configurar Storage** de Supabase para imágenes
6. **Deploy a Vercel**

---

## 📱 PWA (Aplicación Instalable)

La aplicación ya está configurada como PWA. Los usuarios pueden:

1. Visitar el sitio en su navegador móvil
2. Agregar a pantalla de inicio
3. Usar como app nativa

**Nota**: Para que funcione en producción, necesitas HTTPS (Vercel lo provee gratis).

---

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Ejecutar en producción local
npm run start

# Verificar tipos TypeScript
npm run type-check

# Linter
npm run lint
```

---

## 📊 Base de Datos

### Tablas Principales:

- `profiles` - Perfiles de usuario
- `products` - Catálogo de productos
- `categories` - Categorías
- `product_images` - Imágenes de productos
- `carts` - Carritos de compra
- `cart_items` - Items en carrito
- `orders` - Pedidos
- `order_items` - Items de pedidos
- `payments` - Transacciones de pago
- `shipping_addresses` - Direcciones de envío

Todas las tablas tienen RLS habilitado para máxima seguridad.

---

## 💡 Tips de Desarrollo

1. **Dark Mode**: Se activa automáticamente según preferencias del sistema
2. **Hot Reload**: Los cambios se reflejan instantáneamente
3. **TypeScript**: Aprovecha el autocompletado para evitar errores
4. **Componentes UI**: Usa los componentes de `@/components/ui` para consistencia

---

## 🌐 Deploy a Vercel

1. Sube el código a GitHub
2. Importa el proyecto en [https://vercel.com](https://vercel.com)
3. Agrega las variables de entorno
4. Deploy automático

¡Listo! Tu tienda estará en línea con SSL y CDN global gratis.
