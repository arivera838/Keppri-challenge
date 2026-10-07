export type BookingStatus = 'active' | 'cancelled';

export type Booking = {
  id: string;
  classId: string;
  memberId: string;
  diaOffset: number;
  hora: string;
  className: string;
  instructor: string;
  status: BookingStatus;
  createdAt: string;
};
