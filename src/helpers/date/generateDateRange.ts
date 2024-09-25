export const generateDateRange =  (days: number): string[] => {
  const today = new Date();
  const dateRange: string[] = [];

  for (let i = 0; i >= -days; i--) {
    const currentDate = new Date();

    currentDate.setDate(today.getDate() + i);
    dateRange.push(currentDate.toString());
  }

  return [dateRange[dateRange.length - 1], dateRange[0]];
};
