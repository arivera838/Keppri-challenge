export const BusinessErrorCode = {
  NO_SPOTS: 'NO_SPOTS',
  DUPLICATE_BOOKING: 'DUPLICATE_BOOKING',
  MAX_DAILY_BOOKINGS: 'MAX_DAILY_BOOKINGS',
  CANCEL_TOO_LATE: 'CANCEL_TOO_LATE',
  BOOKING_NOT_FOUND: 'BOOKING_NOT_FOUND',
  CLASS_NOT_FOUND: 'CLASS_NOT_FOUND',
} as const;

export type BusinessErrorCode =
  (typeof BusinessErrorCode)[keyof typeof BusinessErrorCode];

export const BUSINESS_ERROR_MESSAGES: Record<BusinessErrorCode, string> = {
  [BusinessErrorCode.NO_SPOTS]: 'Esta clase ya no tiene cupos.',
  [BusinessErrorCode.DUPLICATE_BOOKING]: 'Ya reservaste esta clase.',
  [BusinessErrorCode.MAX_DAILY_BOOKINGS]:
    'Solo puedes reservar 2 clases por día.',
  [BusinessErrorCode.CANCEL_TOO_LATE]:
    'Ya no puedes cancelar: faltan menos de 2 horas.',
  [BusinessErrorCode.BOOKING_NOT_FOUND]: 'Reserva no encontrada.',
  [BusinessErrorCode.CLASS_NOT_FOUND]: 'Clase no encontrada.',
};

export class BusinessError extends Error {
  readonly code: BusinessErrorCode;

  constructor(code: BusinessErrorCode, message?: string) {
    super(message ?? BUSINESS_ERROR_MESSAGES[code]);
    this.name = 'BusinessError';
    this.code = code;
  }
}

export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: BusinessError };
