import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

const Analytics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);

  const { data: camps = [] } = useQuery({
    queryKey: ['registered-camps', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/registered-camps?email=${user?.email}`);
      return data;
    }
  });

  useEffect(() => {
    if (!camps || camps.length === 0) return;

    const validCamps = camps.filter(c => c?.campName && c?.campFees && c?.location && c?.healthCare);

    // Bar chart: Fees per camp
    const bar = validCamps.map(c => ({
      name: c.campName,
      fees: Number(c.campFees)
    }));

    // Pie chart: HealthCare category distribution
    const healthMap = {};
    validCamps.forEach(c => {
      healthMap[c.healthCare] = (healthMap[c.healthCare] || 0) + 1;
    });
    const pie = Object.entries(healthMap).map(([name, value]) => ({ name, value }));

    // Line chart: Count by location
    const locationMap = {};
    validCamps.forEach(c => {
      locationMap[c.location] = (locationMap[c.location] || 0) + 1;
    });
    const line = Object.entries(locationMap).map(([location, count]) => ({ location, count }));

    // Total Money Spent
    const total = validCamps.reduce((sum, c) => sum + Number(c.campFees), 0);

    setBarData(bar);
    setPieData(pie);
    setLineData(line);
    setTotalSpent(total);
  }, [camps]);

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">📊 Camp Analytics</h2>

      {camps.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No registered camps found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-blue-100 p-6 rounded-xl shadow">
              <h3 className="text-lg font-medium text-blue-900">Total Camps Registered</h3>
              <p className="text-3xl font-bold">{camps.length}</p>
            </div>
            <div className="bg-green-100 p-6 rounded-xl shadow">
              <h3 className="text-lg font-medium text-green-900">Total Money Spent</h3>
              <p className="text-3xl font-bold">${totalSpent}</p>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Camp Fees per Camp</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="fees" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Camp Count by Location</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <XAxis dataKey="location" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#82ca9d" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">HealthCare Services Used</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
