# Bitácora de Consultas y Revisiones Técnicas

Este documento registra todas las consultas, revisiones de código, análisis de lógica y orientaciones técnicas realizadas en el proyecto **Reserva-Clases-Ingles**.

---

### [Entrada 001] - 2026-10-06 06:16
- **Consulta / Solicitud:** Configuración inicial del sistema de trabajo como revisor de código y mentor técnico. Definición de restricciones: mantener la estructura actual del proyecto sin alteraciones arquitectónicas, no instalar ni solicitar paquetes adicionales, no generar código resuelto (solo explicar la lógica de los fallos y cómo abordarlos) y mantener un registro cronológico en esta bitácora.
- **Archivos Analizados:** 
  - Estructura general de carpetas en `src/` (`components`, `constants`, `context`, `data`, `hooks`, `navigation`, `screens`, `theme`).
  - [package.json](file:///c:/Users/ssala/Desktop/CS%20V/Reserva-Clases-Ingles/package.json)
  - [AGENTS.md](file:///c:/Users/ssala/Desktop/CS%20V/Reserva-Clases-Ingles/AGENTS.md)
  - [CLAUDE.md](file:///c:/Users/ssala/Desktop/CS%20V/Reserva-Clases-Ingles/CLAUDE.md)
- **Diagnóstico Lógico / Configuración:**
  - El proyecto cuenta con un stack definido de Expo/React Native con dependencias existentes suficientes (AsyncStorage, React Navigation, Expo Fonts e Icons).
  - Se configuró la skill en [.agents/skills/revisor-codigo/SKILL.md](file:///c:/Users/ssala/Desktop/CS%20V/Reserva-Clases-Ingles/.agents/skills/revisor-codigo/SKILL.md) y se integraron las directivas permanentes para asegurar el cumplimiento estricto de las reglas solicitadas.
- **Orientación Brindada:**
  - Se establecieron las reglas operativas: rol 100% consultivo/revisor, explicaciones conceptuales y algorítmicas sin proveer código de solución directa, y actualización continua de esta bitácora tras cada interacción.
- **Estado:** Inicializado / Activo

---

### [Entrada 002] - 2026-10-06 17:01
- **Consulta / Solicitud:** Análisis arquitectónico sobre si es mejor guardar la información del usuario en claves separadas en `AsyncStorage` (una por cada atributo) o en una sola clave como objeto compuesto, actualizando solo el campo modificado.
- **Archivos Analizados:**
  - [src/constants/storageKeys.js](file:///c:/Users/ssala/Desktop/CS%20V/Reserva-Clases-Ingles/src/constants/storageKeys.js)
  - [src/hooks/useAsyncStorage.js](file:///c:/Users/ssala/Desktop/CS%20V/Reserva-Clases-Ingles/src/hooks/useAsyncStorage.js)
  - [src/screens/UserScreen.js](file:///c:/Users/ssala/Desktop/CS%20V/Reserva-Clases-Ingles/src/screens/UserScreen.js)
  - [src/context/ReservasContext.js](file:///c:/Users/ssala/Desktop/CS%20V/Reserva-Clases-Ingles/src/context/ReservasContext.js)
- **Diagnóstico Lógico:**
  - El uso de claves independientes por atributo (`@UserName`, `@UserLastName`, etc.) genera múltiples llamadas asíncronas de E/S, fragmenta el estado en múltiples hooks/renders, compromete la atomicidad ante fallos y dificulta la extensibilidad del modelo.
  - Almacenar la entidad completa en una única clave como objeto JSON unifica el ciclo de vida del perfil, reduce lecturas/escrituras en disco a una sola operación y mantiene la coherencia con el patrón ya adoptado en `ReservasContext.js`.
- **Orientación Brindada:**
  - Se recomienda adoptar una única clave de almacenamiento para el perfil de usuario.
  - Se explica conceptualmente cómo gestionar la inmutabilidad y la actualización parcial mediante clonación de objetos (spread operator) en memoria antes de persistir.
  - Se detallan las consideraciones de consistencia, rendimiento y ciclo de vida de React.
- **Estado:** Orientado

