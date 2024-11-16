// Checks if a time slot is available, comparing start and end times with booked slots
export interface TimeSlot {
  start: string; // in the format "HH:MM AM/PM"
  end: string;   // in the format "HH:MM AM/PM"
}


// Parses a time string in the format "HH:MM AM/PM" and converts it to total minutes
export const parseTime = (time: string): number => {
  const [timePart, period] = time.split(' ');
  const [hour, minute] = timePart.split(':').map(Number);

  let totalMinutes = hour * 60 + minute;

  if (period === 'PM' && hour !== 12) {
    totalMinutes += 12 * 60;
  } else if (period === 'AM' && hour === 12) {
    totalMinutes -= 12 * 60;
  }

  return totalMinutes;
};

// Formats total minutes into a "HH:MM AM/PM" time string
export const formatTime = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  const adjustedH = hours % 12 || 12;
  const adjustedMin = minutes.toString().padStart(2, '0');
  return `${adjustedH}:${adjustedMin} ${period}`;
};

// Parses a duration string in the format "HH:MM:SS" and converts it to total minutes
export const parseDuration = (durationStr: string): number => {
  const [hours, minutes, seconds] = durationStr.split(':').map(Number);
  return hours * 60 + minutes + seconds / 60;
};

export const isTimeSlotAvailable = (
  startTime: number,  // total minutes from midnight
  endTime: number,    // total minutes from midnight
  bookedSlots: TimeSlot[]  // array of booked time slots
): boolean => {
  //console.log('istime', bookedSlots)
  return !bookedSlots.some(slot => {
    const slotStart = parseTime(slot.start);
    const slotEnd = parseTime(slot.end);
    return (startTime < slotEnd && endTime > slotStart);
  });
};
