# Tasks: add-class-booking

## 1. Domain Layer

- [x] 1.1 Crear entidades y objetos de valor (`ClassItem`, `Booking`, `Member`, `ClassDate`) en `src/domain/entities/` y verificar contratos de tipos con `npx tsc --noEmit`.
- [x] 1.2 Definir interfaces de repositorios (`IClassRepository`, `IBookingRepository`) y tipos de retorno/errores de negocio en `src/domain/repositories/` y verificar consistencia de interfaces.
- [x] 1.3 Implementar utilidad de cálculo de fechas y horas (`dateUtils.ts`) en `src/domain/utils/dateUtils.ts` y validar con pruebas unitarias en `src/domain/utils/__tests__/dateUtils.test.ts`.
- [x] 1.4 Implementar `GetUpcomingClassesUseCase` con filtrado de clases pasadas y cálculo de cupos en `src/domain/usecases/GetUpcomingClassesUseCase.ts` y verificar con pruebas unitarias en `src/domain/usecases/__tests__/GetUpcomingClassesUseCase.test.ts`.
- [x] 1.5 Implementar `BookClassUseCase` con validación de RN-01 (cupos), RN-02 (no duplicados) y RN-03 (máx 2 por día) en `src/domain/usecases/BookClassUseCase.ts` y verificar con pruebas unitarias en `src/domain/usecases/__tests__/BookClassUseCase.test.ts`.
- [x] 1.6 Implementar `CancelBookingUseCase` con validación de RN-04 (límite 2 horas previas) en `src/domain/usecases/CancelBookingUseCase.ts` y verificar con pruebas unitarias en `src/domain/usecases/__tests__/CancelBookingUseCase.test.ts`.
- [x] 1.7 Implementar `GetMemberBookingsUseCase` para consulta ordenada de reservas en `src/domain/usecases/GetMemberBookingsUseCase.ts` y verificar con pruebas unitarias en `src/domain/usecases/__tests__/GetMemberBookingsUseCase.test.ts`.

## 2. Data Layer

- [x] 2.1 Definir DTOs y Mappers para parsear `mock-data/clases.json` en `src/data/models/` y `src/data/mappers/ClassMapper.ts` con pruebas en `src/data/mappers/__tests__/ClassMapper.test.ts`.
- [x] 2.2 Implementar `MockClassDataSource` para lectura de datos locales en `src/data/datasources/MockClassDataSource.ts` y verificar carga de datos con `src/data/datasources/__tests__/MockClassDataSource.test.ts`.
- [x] 2.3 Implementar `AsyncStorageBookingDataSource` para persistencia en memoria y AsyncStorage en `src/data/datasources/AsyncStorageBookingDataSource.ts` con pruebas en `src/data/datasources/__tests__/AsyncStorageBookingDataSource.test.ts`.
- [x] 2.4 Implementar `ClassRepositoryImpl` y `BookingRepositoryImpl` en `src/data/repositories/` conectando fuentes de datos con contratos de dominio y verificar con pruebas unitarias en `src/data/repositories/__tests__/BookingRepositoryImpl.test.ts`.
- [x] 2.5 Configurar el contenedor de inyección de dependencias (`ServiceLocator`) en `src/di/container.ts` y verificar la resolución de instancias de casos de uso y repositorios en `src/di/__tests__/container.test.ts`.

## 3. Presentation Layer

- [x] 3.1 Implementar custom hook `useClassBooking` para listado y reserva de clases con estado reactivo en `src/presentation/hooks/useClassBooking.ts` y verificar con pruebas de hook en `src/presentation/hooks/__tests__/useClassBooking.test.ts`.
- [x] 3.2 Implementar custom hook `useMemberBookings` para visualización y cancelación de reservas en `src/presentation/hooks/useMemberBookings.ts` y verificar con pruebas de hook en `src/presentation/hooks/__tests__/useMemberBookings.test.ts`.
- [x] 3.3 Crear componentes atómicos y moleculares reutilizables (`ClassCard`, `BookingCard`, `Badge`, `ConfirmModal`) en `src/presentation/components/` y validar renderizado.
- [x] 3.4 Implementar pantalla de catálogo `ClassListScreen` (HU-01, HU-02) en `src/presentation/screens/ClassListScreen.tsx` con manejo de estados de carga, clases llenas y confirmación de reserva.
- [x] 3.5 Implementar pantalla `MyBookingsScreen` (HU-03) en `src/presentation/screens/MyBookingsScreen.tsx` con lista ordenada, estado vacío y modal de confirmación de cancelación (RN-04).
- [x] 3.6 Integrar navegación por pestañas o cambio de vista principal en `App.tsx` / `src/presentation/navigation/` y verificar interacción fluida en simulador o expo dev server.

## 4. Tests y Verificación

- [x] 4.1 Ejecutar suite completa de pruebas unitarias y de integración de casos de uso con `npm test` verificando cobertura total de RN-01, RN-02, RN-03 y RN-04.
- [x] 4.2 Ejecutar validación de tipado estricto con `npx tsc --noEmit` y verificar cero errores en todas las capas.
- [x] 4.3 Validar persistencia offline simulando reinicio de la app y comprobación de reservas almacenadas en AsyncStorage.
