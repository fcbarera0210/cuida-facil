# Cuida Fácil

Prototipo interactivo de una aplicación móvil de ayuda y emergencias, diseñada para adultos mayores. Simula pedir ayuda, llamar contactos, servicios de emergencia y compartir ubicación con familiares.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

## Despliegue en Vercel

### Opción 1: Desde GitHub (recomendado)

1. Sube este repositorio a GitHub.
2. Entra en [vercel.com](https://vercel.com) e inicia sesión.
3. Clic en **Add New Project** → importa el repositorio `cuida-facil`.
4. Vercel detectará automáticamente **Vite**; no necesitas cambiar la configuración.
5. Clic en **Deploy**.

### Opción 2: Desde la CLI

```bash
npm install -g vercel
vercel
```

Sigue las instrucciones en pantalla. En el primer despliegue, Vercel vinculará el proyecto a tu cuenta.

## Scripts disponibles

| Comando         | Descripción                    |
|-----------------|--------------------------------|
| `npm run dev`   | Servidor de desarrollo         |
| `npm run build` | Compila para producción        |
| `npm run preview` | Vista previa del build       |

## Notas

- Todas las funciones son **simuladas** para demostración académica.
- La app está optimizada para verse como un teléfono móvil (mobile first).
- Los datos del usuario son ficticios: **Don Pedro** y sus contactos familiares.
