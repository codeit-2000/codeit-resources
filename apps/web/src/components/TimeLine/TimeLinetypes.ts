interface Reservation {
  startTime: string;
  endTime: string;
}

export interface ThirtyMinutesTimeBoxProps {
  isHalfHour?: boolean;
  isCurrentTime?: boolean;
  isTestCurrentTime: boolean;
  time?: string;
  reservation?: Reservation;
}
