# TP4 DevOps - Azure Pipelines

Este proyecto implementa un pipeline CI/CD en Azure DevOps utilizando un agente Self-Hosted para una aplicación con frontend (React) y backend (Node.js).

## Estructura del Proyecto

```
/
├── front/              # Frontend en React
├── back/               # Backend en Node.js
└── azure-pipelines.yml # Configuración del pipeline
```

## Requisitos Previos

- Node.js 24.x
- NPM 11.x
- Cuenta en Azure DevOps
- Agente Self-Hosted configurado

## Ejecución Local

### Frontend

```bash
cd front
npm install
npm start
```

El frontend estará disponible en http://localhost:3000

### Backend

```bash
cd back
npm install
npm start
```

El backend estará disponible en http://localhost:3001

## Endpoints API

- `GET /api/message`: Devuelve un mensaje de prueba
- `GET /api/health`: Endpoint de verificación de estado

## Configuración del Agente Self-Hosted

1. En Azure DevOps:
   - Project Settings > Agent pools
   - Crear pool "SelfHosted"
   - Descargar agente

2. En local:
   ```bash
   mkdir myagent && cd myagent
   tar zxvf vsts-agent-osx-x64-3.230.0.tar.gz
   ./config.sh
   ./run.sh
   ```

## Pipeline CI

El pipeline se ejecuta automáticamente en push a `main`:

- **Stage CI**:
  - BuildBackend:
    - Compilación Node.js
    - Tests unitarios
    - Publicación backend-dist (28 MB)
  
  - BuildFrontend:
    - Compilación React
    - Publicación frontend-dist (708 KB)

## Puertos

- Frontend: 3000
- Backend: 3001

## Artefactos Generados

- **frontend-dist**: Build optimizado de React (708 KB)
- **backend-dist**: Código Node.js y dependencias (28 MB)

