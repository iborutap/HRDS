import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { differenceInYears } from 'date-fns';

const Charts = ({ people }) => {
  // Gender distribution
  const genderData = [
    { name: 'Laki-Laki', value: people.filter(p => p.gender === 'Male').length, color: '#3B82F6' },
    { name: 'Perempuan', value: people.filter(p => p.gender === 'Female').length, color: '#EC4899' }
  ];

  // Blood type distribution
  const bloodTypeData = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => ({
    name: type,
    value: people.filter(p => p.bloodType === type).length
  })).filter(item => item.value > 0);

  // Age groups
  const ageGroups = people.reduce((acc, person) => {
    const age = differenceInYears(new Date(), new Date(person.dateOfBirth));
    let group;
    if (age < 18) group = '0-17';
    else if (age < 30) group = '18-29';
    else if (age < 45) group = '30-44';
    else if (age < 60) group = '45-59';
    else group = '60+';

    acc[group] = (acc[group] || 0) + 1;
    return acc;
  }, {});

  const ageGroupData = Object.entries(ageGroups).map(([name, value]) => ({ name, value }));

  // Religion distribution
  const religionData = people.reduce((acc, person) => {
    acc[person.religion] = (acc[person.religion] || 0) + 1;
    return acc;
  }, {});

  const religionChartData = Object.entries(religionData).map(([name, value]) => ({ name, value }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Data Statistics</h2>
        <p className="text-gray-600">Data Visual Sebaran Data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gender Distribution */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sebaran Jenis Kelamin</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Age Groups */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Kelompok Umur</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageGroupData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Blood Type Distribution */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sebaran Golongan Darah</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bloodTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Religion Distribution */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sebaran Agama</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={religionChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {religionChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;