# Client Management Application

A modern web application built with React, Redux Toolkit, and Supabase for managing client profiles with role-based access control (ADMIN/USER). Implements secure authentication, client profile workflows, and optimized rendering techniques.

## Features

### 🔒 Authentication System
- **Multi-role registration** (ADMIN/USER) with email verification
- JWT-based authentication flow with Supabase
- Protected routes using `PrivateRoute` component
- Automatic profile creation in `profiles` table on registration
- Session management with Redux (`userSlice`)

### 👥 Client Profile Management
- **Dual-table architecture**:
  - `clientstemp` for pending approvals
  - `clients` for validated entries
- **Role-based workflows**:
  - Users create/edit/delete temporary entries
  - Admins validate/reject submissions
- CRUD operations with Supabase real-time updates
- Redux state management (`clientsSlice`)

### 🛡 Security Architecture
- Route protection based on authentication state
- Dynamic navigation rendering (auth/role-dependent)
- Two layout system:
  - `AuthLayout` for login/registration
  - `MainLayout` for authenticated content

## Project Structure

```plaintext
src/
├── api/               # Supabase API abstractions
│   ├── authApi.js
│   ├── clientsApi.js
│   └── supabaseClient.js
│
├── features/          # Feature-based modules
│   ├── auth/         # Authentication flows
│   ├── clients/      # Client management
│   ├── admin/        # Admin validation panels
│   └── home/         # Landing pages
│
├── redux/            # State management
│   ├── store.js
│   ├── slices/       # Redux Toolkit slices
│       └── clientsSlice.js
│       └── userSlice.js
│
├── services/         # Business logic layer
│   ├── authService.js
│   └── clientsService.js
│
├── layouts/          # Application layouts
├── routes/           # Routing configuration
└── common/           # Shared components & utilities
```

# Détails Techniques Clés
## Optimisations de Performance
### Mémoïsation des composants :

- React.memo pour les composants purs

- useMemo/useCallback pour les opérations coûteuses

- Découpage de code :

    . Chargement différé des routes avec React.lazy()

    . Imports dynamiques pour les fonctionnalités admin

    . SCSS Modules pour le styling localisé

    . Requêtes Supabase optimisées avec filtres

# Flux de Données

graph LR
  A[Composants] -->|Dispatch d'Actions| B[Redux Thunks]
  B --> C[Couche API Supabase]
  C --> D[(Base de Données Supabase)]
  D --> C
  C -->|Mise à jour de l'État| E[Slices Redux]
  E --> A

# Schéma Supabase

- Authentification:
```bash
create table public.users (
  id uuid references auth.users primary key,
  email text
);
```

- Profils Utilisateurs:
```bash
create table public.profiles (
  id uuid references auth.users primary key,
  role varchar(5) check (role in ('ADMIN', 'USER'))
);
```

- Données Clients:
```bash
create table public.clientstemp (
  id uuid primary key,
  data jsonb,
  owner uuid references profiles(id),
  created_at timestamp
);

create table public.clients (
  id uuid primary key,
  data jsonb,
  owner uuid references profiles(id),
  approved_by uuid references profiles(id),
  created_at timestamp
);

```
# Installation et Utilisation

1. Cloner le dépôt

```bash 
git clone git@github.com:issamedine/client-management-app.git
```

2. Configuration d'Environnement 

```bash 
cp .env
# Renseigner les identifiants Supabase
REACT_APP_SUPABASE_URL=your-project-url
REACT_APP_SUPABASE_KEY=your-key
```

3. Installer les dépendances
```bash 
npm install
npm run start
```

4. Build de Production
```bash
npm run build
```