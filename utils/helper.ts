const getTime = () => {
  const timeList = [];
  for (let i = 8; i < 12; i++) {
    timeList.push({ time: `${i}:00 AM` });
    timeList.push({ time: `${i}:30 AM` });
  }
  for (let i = 1; i < 7; i++) {
    timeList.push({ time: `${i}:00 PM` });
    timeList.push({ time: `${i}:30 PM` });
  }
  return timeList;
};

export { getTime };
