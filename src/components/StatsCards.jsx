import React from 'react';
import { Users, UserCheck, Calendar, TrendingUp } from 'lucide-react';
import { differenceInYears } from 'date-fns';

const StatsCards = ({ people }) => {
  const totalPeople = people.length;
  const maleCount = people.filter(p => p.gender === 'Male').length;
  const femaleCount = people.filter(p => p.gender === 'Female').length;

  const averageAge = people.length > 0
    ? Math.round(people.reduce((sum, person) => {
      const age = differenceInYears(new Date(), new Date(person.dateOfBirth));
      return sum + age;
    }, 0) / people.length)
    : 0;

  const uniqueFamilies = new Set(people.map(p => p.familyId)).size;

  const stats = [
    {
      title: 'Jumlah Data',
      value: totalPeople.toLocaleString(),
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Laki-Laki / Perempuan',
      value: `${maleCount} / ${femaleCount}`,
      icon: UserCheck,
      color: 'bg-green-500',
      change: `${((maleCount / totalPeople) * 100 || 0).toFixed(1)}% Laki-Laki`
    },
    {
      title: 'Rerata Umur',
      value: `${averageAge} Tahun`,
      icon: Calendar,
      color: 'bg-purple-500',
      change: 'Berdasarkan Tanggal Lahir'
    },
    {
      title: 'Jumlah Keluarga',
      value: uniqueFamilies.toLocaleString(),
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: `${(totalPeople / uniqueFamilies || 0).toFixed(1)} orang/keluarga`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;