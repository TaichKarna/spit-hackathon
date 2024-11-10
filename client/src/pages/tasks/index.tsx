import React, { useState } from 'react';

const AQIDataTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample data (replace with your full data array)
  const data =  [
      {
        "main": {
          "aqi": 1
        },
        "components": {
          "co": 200.0,
          "no": 15.0,
          "no2": 20.0,
          "o3": 55.0,
          "so2": 1.0,
          "pm2_5": 8.0,
          "pm10": 20.0,
          "nh3": 0.5
        },
        "dt": 1637138400
      },
      {
        "main": {
          "aqi": 3
        },
        "components": {
          "co": 180.0,
          "no": 30.0,
          "no2": 45.0,
          "o3": 50.0,
          "so2": 3.0,
          "pm2_5": 20.0,
          "pm10": 30.0,
          "nh3": 1.0
        },
        "dt": 1637138500
      },
      {
        "main": {
          "aqi": 2
        },
        "components": {
          "co": 160.0,
          "no": 10.0,
          "no2": 35.0,
          "o3": 60.0,
          "so2": 2.5,
          "pm2_5": 15.0,
          "pm10": 25.0,
          "nh3": 0.7
        },
        "dt": 1637138600
      },
      {
        "main": {
          "aqi": 4
        },
        "components": {
          "co": 220.0,
          "no": 40.0,
          "no2": 50.0,
          "o3": 65.0,
          "so2": 4.0,
          "pm2_5": 30.0,
          "pm10": 40.0,
          "nh3": 1.5
        },
        "dt": 1637138700
      },
      {
        "main": {
          "aqi": 5
        },
        "components": {
          "co": 250.0,
          "no": 60.0,
          "no2": 60.0,
          "o3": 70.0,
          "so2": 5.0,
          "pm2_5": 40.0,
          "pm10": 50.0,
          "nh3": 2.0
        },
        "dt": 1637138800
      },
      {
        "main": {
          "aqi": 2
        },
        "components": {
          "co": 170.0,
          "no": 25.0,
          "no2": 40.0,
          "o3": 55.0,
          "so2": 2.2,
          "pm2_5": 10.0,
          "pm10": 22.0,
          "nh3": 0.8
        },
        "dt": 1637138900
      },
      {
        "main": {
          "aqi": 3
        },
        "components": {
          "co": 190.0,
          "no": 35.0,
          "no2": 55.0,
          "o3": 60.0,
          "so2": 3.5,
          "pm2_5": 25.0,
          "pm10": 35.0,
          "nh3": 1.2
        },
        "dt": 1637139000
      },
      {
        "main": {
          "aqi": 4
        },
        "components": {
          "co": 230.0,
          "no": 45.0,
          "no2": 50.0,
          "o3": 65.0,
          "so2": 4.2,
          "pm2_5": 35.0,
          "pm10": 45.0,
          "nh3": 1.7
        },
        "dt": 1637139100
      },
      {
        "main": {
          "aqi": 1
        },
        "components": {
          "co": 150.0,
          "no": 12.0,
          "no2": 25.0,
          "o3": 50.0,
          "so2": 1.8,
          "pm2_5": 5.0,
          "pm10": 18.0,
          "nh3": 0.6
        },
        "dt": 1637139200
      },
      {
        "main": {
          "aqi": 3
        },
        "components": {
          "co": 210.0,
          "no": 50.0,
          "no2": 60.0,
          "o3": 68.0,
          "so2": 4.8,
          "pm2_5": 28.0,
          "pm10": 38.0,
          "nh3": 1.3
        },
        "dt": 1637139300
      },
      {
        "main": {
          "aqi": 5
        },
        "components": {
          "co": 280.0,
          "no": 80.0,
          "no2": 75.0,
          "o3": 75.0,
          "so2": 6.0,
          "pm2_5": 45.0,
          "pm10": 55.0,
          "nh3": 2.3
        },
        "dt": 1637139400
      },
      {
        "main": {
          "aqi": 2
        },
        "components": {
          "co": 180.0,
          "no": 18.0,
          "no2": 40.0,
          "o3": 60.0,
          "so2": 2.0,
          "pm2_5": 12.0,
          "pm10": 25.0,
          "nh3": 0.9
        },
        "dt": 1637139500
      },
      {
        "main": {
          "aqi": 3
        },
        "components": {
          "co": 210.0,
          "no": 55.0,
          "no2": 50.0,
          "o3": 70.0,
          "so2": 3.8,
          "pm2_5": 27.0,
          "pm10": 37.0,
          "nh3": 1.4
        },
        "dt": 1637139600
      }
    ]
  

  // Calculate pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Format timestamp
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 m-4 mt-10 overflow-y pb-14">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Air Quality Index Data</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 text-sm text-gray-600 font-medium">AQI</th>
              <th className="p-4 text-sm text-gray-600 font-medium">CO</th>
              <th className="p-4 text-sm text-gray-600 font-medium">NO</th>
              <th className="p-4 text-sm text-gray-600 font-medium">NO₂</th>
              <th className="p-4 text-sm text-gray-600 font-medium">O₃</th>
              <th className="p-4 text-sm text-gray-600 font-medium">SO₂</th>
              <th className="p-4 text-sm text-gray-600 font-medium">PM2.5</th>
              <th className="p-4 text-sm text-gray-600 font-medium">PM10</th>
              <th className="p-4 text-sm text-gray-600 font-medium">NH₃</th>
              <th className="p-4 text-sm text-gray-600 font-medium">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr
                key={row.dt + index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 text-sm text-gray-700">{row.main.aqi}</td>
                <td className="p-4 text-sm text-gray-700">{row.components.co.toFixed(2)}</td>
                <td className="p-4 text-sm text-gray-700">{row.components.no.toFixed(2)}</td>
                <td className="p-4 text-sm text-gray-700">{row.components.no2.toFixed(2)}</td>
                <td className="p-4 text-sm text-gray-700">{row.components.o3.toFixed(2)}</td>
                <td className="p-4 text-sm text-gray-700">{row.components.so2.toFixed(2)}</td>
                <td className="p-4 text-sm text-gray-700">{row.components.pm2_5.toFixed(2)}</td>
                <td className="p-4 text-sm text-gray-700">{row.components.pm10.toFixed(2)}</td>
                <td className="p-4 text-sm text-gray-700">{row.components.nh3.toFixed(2)}</td>
                <td className="p-4 text-sm text-gray-700">{formatDate(row.dt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-gray-700 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Previous
        </button>
        
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 text-sm font-medium border rounded-md transition ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-gray-700 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AQIDataTable;
