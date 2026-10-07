# Proposal: add-class-booking

## Why

Actualmente, las reservas de clases grupales en ClaseFit se realizan manualmente a través de WhatsApp con recepción. Este flujo genera sobrecupos, desorganización y reservas olvidadas que impiden a otros socios acceder a los cupos. Este cambio implementa el MVP móvil para que el socio consulte las próximas clases, reserve su cupo de manera autónoma y gestione sus cancelaciones directamente desde la aplicación.

## What Changes

- **Visualización de clases disponibles (HU-01):** Pantalla que lista clases de hoy, mañana y pasado mañana ordenadas cronológicamente, ocultando clases ya iniciadas e indicando disponibilidad de cupos ("Llena" o cupos disponibles).
- **Reserva de clases (HU-02):** Flujo para reservar un cupo validando reglas de negocio RN-01, RN-02 y RN-03, con decremento reactivo de cupos y confirmación al usuario.
- **Consulta y cancelación de reservas (HU-03):** Pantalla "Mis Reservas" que lista las reservas activas ordenadas por proximidad y permite cancelar previa confirmación bajo la regla RN-04.
- **Estructura Clean Architecture & Offline-First:** Separación estricta en 3 capas (Domain, Data, Presentation) con almacenamiento y persistencia local de reservas en AsyncStorage.

## Capabilities

### New Capabilities
- `class-booking`: Agendamiento, visualización de clases disponibles, validación de reglas de negocio (RN-01 a RN-04), reserva y cancelación de clases para el socio con persistencia local.

### Modified Capabilities
<!-- No existen especificaciones previas en el proyecto -->

## Impact

- **Código fuente:** Creación de la estructura base bajo Clean Architecture (`src/domain`, `src/data`, `src/presentation`, `src/core`, `src/di`).
- **Dependencias:** Integración de `@react-native-async-storage/async-storage` para persistencia local y soporte de pruebas unitarias con Jest.
- **Datos locales:** Consumo y mapeo de `mock-data/clases.json` como fuente de datos inicial.

## Out of Scope

- Autenticación y login multi-usuario (el MVP opera con un único socio preautenticado: Laura Gómez, ID: S-0001).
- Pasarela de pagos o cobros por clase.
- Gestión administrativa de clases e instructores.
- Notificaciones push o recordatorios en segundo plano.
- Backend remoto y sincronización con APIs externas (operación 100% local/offline).
