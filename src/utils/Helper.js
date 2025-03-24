export const calculateDaysAgo = (dateString) => {
  const today = new Date();
  const [day, month, year] = dateString.split("/").map(Number);
  const targetDate = new Date(year, month - 1, day); // Month is 0-based
  return differenceInDays(today, targetDate);
};

