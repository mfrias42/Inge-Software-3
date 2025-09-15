# Decisiones de arquitectura y despliegue

## Aplicación elegida
- **Courses API (Go)** dentro del monorepo `final-arqsoft2`.
- Motivo: servicio acotado con CRUD, ideal para mostrar imagen única corriendo en QA/PROD con variables de entorno, y conexión a una base de datos document-friendly.

## Entorno Docker
- Docker para empaquetar el binario de Go y sus dependencias.
- **docker-compose.assignment.yml** (archivo aparte) para levantar:
  - MongoDB (con volumen persistente)
  - Courses API en **QA** y **PROD** usando **la misma imagen** (mismo `image:`) y distinta config por variables de entorno.

> Nota: No se modifica ni reemplaza ningún archivo del stack original. RabbitMQ, Solr y el resto del ecosistema quedan intactos. Este práctico corre aislado.

## Imagen base elegida
- **golang:1.22-alpine** para la etapa *builder* (toolchain completo y liviano).
- **alpine:3.20** para *runtime* (mínima superficie, binario estático).
- Beneficio: *multi-stage build* → imagen final pequeña, reproducible y segura (usuario no root).

## Estructura del Dockerfile
1. **Builder**: descarga módulos Go y compila el binario (CGO desactivado para binario estático).
2. **Runtime**: copia binario, define variables por defecto, expone puerto y `HEALTHCHECK`.
3. Se evita incluir toolchain en la imagen final.

## Tagging y versionado
- Convención **SemVer**: `vMAJOR.MINOR.PATCH`.
- Tags por release:
  - `tu_usuario/courses-api:v1.0`
  - `tu_usuario/courses-api:latest`


## Base de datos elegida
- **MongoDB** (oficial `mongo:6.0`).
- Motivos: esquema flexible para cursos, velocidad de puesta en marcha, fácil separación de bases (`courses_qa` / `courses_prod`) sin overhead.
- Persistencia con volumen `mongo_data`.

## QA y PROD con la misma imagen
- La diferencia entre ambientes se hace **solo** con variables de entorno:
  - `APP_ENV` (qa|prod)
  - `LOG_LEVEL` (debug|info)
  - `MONGO_URI` y `MONGO_DB`
- Compose levanta **dos contenedores** de la misma imagen, con puertos **8086 (QA)** y **8087 (PROD)** para no colisionar.

## Reproducibilidad (docker-compose)
- Versiones fijas (`mongo:6.0`, `v1.0` de la app).
- `healthcheck` en Mongo y la app.
- Documentación de prerequisitos y comandos (`docker compose pull`, `up -d`).

## Estrategia de versionado de imágenes
- **SemVer** + `latest`.
- Política simple:
  - Cambios compatibles: `v1.MINOR+1`
  - Fixes menores: `v1.0.PATCH+1`
  - Cambios incompatibles: `vMAJOR+1.0.0`
- Mantener `latest` apuntando a la última estable para dev local.


## Test de que levanta la app
- Se levanta la app con `docker compose -f docker-compose.assignment.yml up -d`.
- Se verifica que la app se levante correctamente.
  <img src="/images/imagenes corriendo.png" alt="test" width="800">

- Se verifica que anden los tests
 <img src="/images/test funciona.png" alt="test" width="800">

 - Se verifica que se gaurden los datos cuando se reinicia
 <img src="/images/Test que se guardan datos.png" alt="test" width="800">