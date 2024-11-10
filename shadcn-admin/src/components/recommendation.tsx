import React, { useState, useEffect, useMemo } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Adjust the import path as needed

const AQI_API_KEY = '1f960b41646a0ac749ae3aeb31ad3d8bcd3061b2';
const AQI_API_URL = 'https://api.waqi.info/feed/geo:{lat};{lon}/?token=' + AQI_API_KEY;

const getNearbyCoordinates = (lat, lon, radius = 5, spacing = 0.5) => {
  const latOffset = spacing / 111;
  const lonOffset = spacing / (111 * Math.cos(lat * (Math.PI / 180)));

  const coordinates = [];
  for (let i = -radius / spacing; i <= radius / spacing; i++) {
    for (let j = -radius / spacing; j <= radius / spacing; j++) {
      const newLat = lat + i * latOffset;
      const newLon = lon + j * lonOffset;

      const distance = Math.sqrt(i * i + j * j) * spacing;
      if (distance <= radius) {
        coordinates.push({ latitude: newLat, longitude: newLon });
      }
    }
  }
  return coordinates;
};

function DataTable() {
  const [userLocation, setUserLocation] = useState(null);
  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error fetching user location:', error);
      }
    );
  }, []);

  useEffect(() => {
    if (userLocation) {
      const nearbyCoordinates = getNearbyCoordinates(userLocation.latitude, userLocation.longitude, 5, 0.5);

      const fetchAQIData = async () => {
        const aqiPromises = nearbyCoordinates.map((coordinate) =>
          fetch(AQI_API_URL.replace('{lat}', coordinate.latitude).replace('{lon}', coordinate.longitude))
            .then((response) => response.json())
            .then((data) => ({
              ...coordinate,
              aqi: data?.data?.aqi,
              recommendation: data?.data?.aqi > 100,
            }))
        );

        const results = await Promise.all(aqiPromises);
        setData(results.slice(0,15));
      };

      fetchAQIData();
    }
  }, [userLocation]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'latitude',
        header: 'Latitude',
      },
      {
        accessorKey: 'longitude',
        header: 'Longitude',
      },
      {
        accessorKey: 'aqi',
        header: 'AQI',
        cell: ({ getValue }) => (
          <span style={{ color: getValue() > 100 ? 'red' : 'green' }}>{getValue()}</span>
        ),
      },
      {
        accessorKey: 'recommendation',
        header: 'Recommendation',
        cell: ({ getValue }) => (getValue() ? 'Consider plantation' : ''),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageCount: Math.ceil(data.length / pageSize),
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: ({ pageIndex }) => setPageIndex(pageIndex),
  });

  return (
    <div className="p-4 bg-white rounded-lg  border-1 w-full border-1 overflow-y-scroll my-10 border-x-2 border-y-2">
<div className='text-3xl px-2 py-2 font-bold'>Recommendations</div>
      <Table className='w-full '>
        <TableCaption>Air Quality Index (AQI) Data for Nearby Locations</TableCaption>
        <TableHeader>
          <TableRow>
            {table.getHeaderGroups().map(headerGroup =>
              headerGroup.headers.map(header => (
                <TableHead
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer font-semibold text-gray-700 py-2 px-4"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() ? (header.column.getIsSortedDesc() ? ' 🔽' : ' 🔼') : ''}
                </TableHead>
              ))
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id} className="hover:bg-gray-100">
              {row.getVisibleCells().map(cell => (
                <TableCell
                  key={cell.id}
                  className="py-2 px-4 text-gray-700"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          
        </TableFooter>
      </Table>
    </div>
  );
}

export default DataTable;
