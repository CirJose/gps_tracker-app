const calculateSpeed = (lat1, lon1, timestamp1, lat2, lon2, timestamp2) => {
  const R = 6371e3; // Earth's radius in meters
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const lat1Rad = lat1 * (Math.PI / 180);
  const lat2Rad = lat2 * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance between the two points in meters

  const timeDiff = (timestamp2 - timestamp1) / 1000; // Time difference in seconds
  const speed = d / timeDiff; // Speed in meters per second

  return speed;
};

module.exports = calculateSpeed;
  