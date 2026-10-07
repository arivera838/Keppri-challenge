export type ClassDto = {
  id: string;
  nombre: string;
  instructor: string;
  diaOffset: number;
  hora: string;
  duracionMin: number;
  cupoTotal: number;
  ocupados: number;
};

export type ClassesFileDto = {
  gimnasio: string;
  socio: { id: string; nombre: string };
  clases: ClassDto[];
};

export type BookingStorageDto = {
  id: string;
  classId: string;
  memberId: string;
  diaOffset: number;
  hora: string;
  className: string;
  instructor: string;
  status: 'active' | 'cancelled';
  createdAt: string;
};
