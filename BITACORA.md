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

---

### [Entrada 003] - 2026-10-07 18:45
- **Consulta / Solicitud:** Revisión de código del nuevo componente `HomeScreen.js` (sin estilos definidos inicialmente).
- **Archivos Analizados:**
  - `src/screens/HomeScreen.js`
  - `src/data/clases.js`
  - `src/components/Card.js`
  - `src/navigation/ClasesStack.js`
- **Diagnóstico Lógico:**
  - Referencias a propiedades del objeto `styles` inexistente (error de tiempo de ejecución `ReferenceError`).
  - Filtrado `CLASES.filter(...)` ejecutándose innecesariamente en cada ciclo de render.
  - Ausencia de interacción o botón para navegar hacia el catálogo general de clases.
  - Importaciones no consumidas (`Pressable`, tokens de tema).
- **Orientación Brindada:**
  - Se estructuró la declaración mínima de estilos para permitir montaje sin errores.
  - Se explicó la optimización mediante extracción del filtro fuera del componente o uso de `useMemo`.
  - Se orientó el uso de `Pressable` para conectar la navegación hacia la pantalla de clases.
- **Estado:** Resuelto / Aplicado

---

### [Entrada 004] - 2026-10-07 18:56
- **Consulta / Solicitud:** Diagnóstico de error en navegación: `The action 'NAVIGATE' with payload {"name":"DetailClase", ...} was not handled by any navigator` y advertencia en `ScrollView`.
- **Archivos Analizados:**
  - `src/screens/HomeScreen.js`
  - `src/navigation/TabNavigation.js`
  - `src/navigation/ClasesStack.js`
- **Diagnóstico Lógico:**
  - Conflicto de jerarquía por navegadores anidados: `HomeScreen` residía como hijo directo de `TabNavigation` (`HomeTab`), mientras que `DetailClase` pertenecía al stack hijo `ClasesStack` (`ClasesTab`).
  - Caracteres parásitos (`HGVJKGVHKHJK`) introducidos accidentalmente en el JSX de la línea 52 de `HomeScreen.js`, generando anomalías en el render de `ScrollView`.
- **Orientación Brindada:**
  - Se explicó la sintaxis y concepto de navegación anidada (`navigation.navigate('ClasesTab', { screen: 'DetailClase', params: { clase } })`).
  - Se indicó la eliminación del texto residual en la línea 52.
- **Estado:** Resuelto / Aplicado

---

### [Entrada 005] - 2026-10-07 19:21
- **Consulta / Solicitud:** Cómo consultar y mostrar el nombre del estudiante guardado localmente en `HomeScreen.js`.
- **Archivos Analizados:**
  - `src/screens/HomeScreen.js`
  - `src/screens/UserScreen.js`
  - `src/constants/storageKeys.js`
  - `src/context/StorageContext.js`
  - `src/hooks/useAsyncStorage.js`
- **Diagnóstico Lógico:**
  - El saludo utilizaba un texto estático ("AGREGAR NOMBRE DEL ESTUDIANTE").
  - En un `TabNavigator`, las pantallas no se desmontan al alternar entre pestañas; por lo tanto, un `useEffect` tradicional no recargaba los datos al regresar de `UserScreen`.
- **Orientación Brindada:**
  - Identificación de la clave `STORAGE_KEYS.USER_PROFILE` (`@UserProfile`) y su campo `name`.
  - Explicación del ciclo de vida en pestañas y uso recomendado de `useFocusEffect` junto con `useCallback` y `getData` para sincronizar los datos de usuario al ganar foco la pantalla de inicio.
- **Estado:** Resuelto / Aplicado

---

### [Entrada 006] - 2026-10-07 19:38
- **Consulta / Solicitud:** Al cancelar una reserva desde `ReservasScreen.js`, el cupo no se devolvía a la clase correspondiente.
- **Archivos Analizados:**
  - `src/context/ReservasContext.js`
  - `src/screens/DetailClaseScreen.js`
  - `src/screens/ReservasScreen.js`
  - `src/data/clases.js`
- **Diagnóstico Lógico:**
  - En `DetailClaseScreen.js` se restaba el cupo modificando `clase.cupos`, pero en `ReservasContext.js` la función `cancelarReserva` solo realizaba un `.filter()` sobre la lista de reservas, sin consultar el `claseId` ni sumar nuevamente el cupo en `CLASES`.
- **Orientación Brindada:**
  - Estructuración lógica en fases para `cancelarReserva`:
    1. Localizar la reserva previa a su eliminación con `.find()`.
    2. Buscar la clase correspondiente en `CLASES` mediante `reserva.claseId`.
    3. Incrementar el contador de `cupos` de la clase en 1.
    4. Aplicar el filtrado de reservas sobre el estado.
- **Estado:** Resuelto / Aplicado

---

### [Entrada 007] - 2026-10-07 19:55
- **Consulta / Solicitud:** Escaneo estático general del proyecto en búsqueda de inconsistencias y errores lógicos sin modificar código.
- **Archivos Analizados:**
  - `src/screens/DetailClaseScreen.js`
  - `src/hooks/useAlmacenamiento.js`
  - `src/screens/UserScreen.js`
  - `src/navigation/ClasesStack.js`
  - `src/screens/ReservasScreen.js`
- **Diagnóstico Lógico:**
  1. Ruta `"ClasesList"` inexistente en el botón volver de `DetailClaseScreen.js` (la ruta registrada es `"Clases"` o retorno con `goBack()`).
  2. Hook `useAlmacenamiento.js` sin sentencia `return` (retornaba `undefined`, rompiendo desestructuración) e importación inapropiada de `act`.
  3. Llamado a `clearAll()` en `UserScreen.js`, que provocaba el borrado de todo el almacenamiento de la app (incluyendo reservas y contadores) en lugar de limpiar solo el perfil.
  4. Configuración `initialRouteName="Home"` en `ClasesStack.js`, lo que provocaba la duplicación de la pantalla de inicio en la pestaña de clases.
- **Orientación Brindada:**
  - Se proporcionaron los pasos conceptuales y seudocódigo para corregir cada uno de los 4 fallos identificados.
- **Estado:** Reportado / En proceso de corrección por el desarrollador
