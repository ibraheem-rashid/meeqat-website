export const timeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  // Basic conversion, assuming 24-hour format from data.js or handling AM/PM if provided
  // Looking at data.js, it seems to be in 12-hour format maybe? 
  // Wait, "12:35" dhuhr, "3:15" asr, "5:33" maghrib... this is 12-hour format.
  
  // We need to know if it's AM or PM. 
  // Fajr/Sunrise/Dhuhr(usually)/Asr/Maghrib/Isha
  
  if (timeStr.includes('PM') || timeStr.includes('AM')) {
     if (period === 'PM' && hours !== 12) hours += 12;
     if (period === 'AM' && hours === 12) hours = 0;
  } else {
    // Infer based on prayer name if not provided
    // This is a bit tricky, but usually:
    // Fajr, Sunrise: AM
    // Dhuhr: AM (if 11) or PM (if 12, 1)
    // Asr, Maghrib, Isha: PM
  }
  
  return hours * 60 + minutes;
};

export const getMinutesFromPrayer = (timeStr, prayerName) => {
    if (!timeStr) return 0;
    let [hours, minutes] = timeStr.split(':').map(Number);
    
    // Manual adjustment based on prayer name for typical 12h data
    if (prayerName === 'Dhuhr') {
        if (hours < 11) hours += 12; // 1:00 -> 13:00
    } else if (['Asr', 'Maghrib', 'Isha'].includes(prayerName)) {
        if (hours < 12) hours += 12;
    } else if (prayerName === 'Fajr' || prayerName === 'Sunrise') {
        // usually AM
    }
    
    return hours * 60 + minutes;
}
