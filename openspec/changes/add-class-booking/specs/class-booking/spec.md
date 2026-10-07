# Spec Delta

## Purpose

Permite al socio de ClaseFit consultar las próximas clases disponibles, reservar cupos validando las reglas de negocio del gimnasio y cancelar reservas activas de manera local y autónoma.

## ADDED Requirements

### Requirement: Consulta de clases próximas y disponibilidad
The system SHALL permitir consultar las clases programadas para hoy, mañana y pasado mañana, excluyendo aquellas cuya hora de inicio ya haya transcurrido y señalando el estado de cupos.

#### Scenario: Visualización cronológica de clases disponibles
- **GIVEN** que el socio consulta el listado de clases y existen clases para hoy, mañana y pasado mañana
- **WHEN** se carga la pantalla principal de clases
- **THEN** el sistema presenta las clases ordenadas cronológicamente por fecha y hora
- **AND** cada clase muestra nombre, instructor, horario y cupos disponibles en formato "X de Y cupos"

#### Scenario: Exclusión de clases que ya iniciaron
- **GIVEN** que la hora actual del dispositivo supera la hora calculada de inicio de una clase de hoy
- **WHEN** el socio visualiza el catálogo de clases
- **THEN** el sistema no incluye dicha clase en el listado visible

#### Scenario: Clase sin cupos disponibles
- **GIVEN** que una clase tiene ocupados la totalidad de sus cupos
- **WHEN** el socio visualiza la tarjeta de la clase
- **THEN** el sistema muestra la etiqueta "Llena" e inhabilita la acción de reserva

---

### Requirement: Validación de cupo disponible (RN-01)
The system SHALL impedir la reserva de una clase cuando no existan cupos libres y notificar al socio.

#### Scenario: Intento de reserva en clase llena
- **GIVEN** que una clase tiene 0 cupos disponibles (cupoTotal igual a ocupados más reservas activas)
- **WHEN** el socio intenta reservar la clase
- **THEN** el sistema rechaza la solicitud sin registrar la reserva
- **AND** muestra el mensaje de error: "Esta clase ya no tiene cupos."

---

### Requirement: Prevención de reservas duplicadas (RN-02)
The system SHALL impedir que un socio reserve más de una vez la misma clase grupal.

#### Scenario: Intento de reservar una clase previamente reservada
- **GIVEN** que el socio ya cuenta con una reserva activa para una clase específica
- **WHEN** el socio intenta reservar nuevamente la misma clase
- **THEN** el sistema no permite duplicar la reserva
- **AND** presenta el mensaje de error: "Ya reservaste esta clase."

---

### Requirement: Límite diario de reservas por socio (RN-03)
The system SHALL restringir las reservas activas a un máximo de dos clases por día calendario para el socio.

#### Scenario: Intento de reservar una tercera clase en el mismo día
- **GIVEN** que el socio ya tiene 2 clases reservadas para el mismo día (mismo día calendario/offset)
- **WHEN** el socio intenta reservar una tercera clase para esa misma fecha
- **THEN** el sistema bloquea la creación de la reserva
- **AND** presenta el mensaje de error: "Solo puedes reservar 2 clases por día."

#### Scenario: Reserva exitosa cumpliendo todas las reglas
- **GIVEN** que una clase tiene cupos disponibles, el socio no la ha reservado y tiene menos de 2 reservas en el día
- **WHEN** el socio confirma la reserva de la clase
- **THEN** el sistema registra la reserva del socio
- **AND** decrementa en uno el cupo disponible de la clase
- **AND** muestra la confirmación: "¡Listo! Tu cupo está reservado"

---

### Requirement: Restricción temporal para cancelación de reservas (RN-04)
The system SHALL permitir cancelar una reserva únicamente si faltan al menos 2 horas para el inicio de la clase.

#### Scenario: Cancelación bloqueada con menos de 2 horas de anticipación
- **GIVEN** que faltan menos de 2 horas para el inicio programado de la clase reservada
- **WHEN** el socio intenta cancelar su reserva
- **THEN** el sistema no procesa la cancelación
- **AND** muestra el mensaje de error: "Ya no puedes cancelar: faltan menos de 2 horas."

#### Scenario: Cancelación exitosa con más de 2 horas de anticipación
- **GIVEN** que faltan más de 2 horas para el inicio de la clase reservada
- **WHEN** el socio solicita cancelar y confirma la acción en el diálogo de confirmación
- **THEN** el sistema elimina la reserva del socio
- **AND** incrementa en uno el cupo disponible de la clase correspondiente

---

### Requirement: Gestión offline y persistencia local de reservas
The system SHALL operar sin conexión a red, persistiendo el estado de clases y reservas en el dispositivo.

#### Scenario: Persistencia y recuperación del estado local
- **GIVEN** que el socio registra o cancela una reserva en modo local/offline
- **WHEN** la aplicación se reinicia o se recarga sin conexión a internet
- **THEN** el sistema recupera las reservas activas desde el almacenamiento local
- **AND** los cupos calculados reflejan fielmente las reservas almacenadas previamente
