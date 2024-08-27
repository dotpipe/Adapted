export const generateHeatmapCSV = (userId, storeId) => {
  let csv = 'x,y,intensity\n';
  const maxIntensity = Math.max(...heatmapData.flat());
  
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const normalizedIntensity = heatmapData[y][x] / maxIntensity;
      csv += `${x},${y},${normalizedIntensity}\n`;
    }
  }

  uploadCSV(userId, storeId, csv);
};
