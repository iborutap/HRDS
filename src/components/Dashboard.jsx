import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Search,
  BarChart3,
  Download,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getAllData, updateData, deleteData } from '../services/Sheethrds';
import DataTable from './DataTable';
import PersonForm from './PersonForm';
import StatsCards from './StatsCards';
import Charts from './Charts';

const Dashboard = () => {
  const { currentUser, logout, authenticateUser } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      logout();
      setLoading(false);
    }, 1000);
  };

  // Data Map
  const dataMap = (serverData) => {
    return serverData.map(person => ({
      id: person.id,
      fullName: person.fullName,
      populationId: person.populationId,
      familyId: person.familyId,
      gender: person.gender,
      dateOfBirth: formatDate(person.dateOfBirth),
      placeOfBirth: person.placeOfBirth,
      religion: person.religion,
      bloodType: person.bloodType
    }));
  };

  // Format date to YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  };

  // Load data from server
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      authenticateUser();

      try {
        // Fetch Data from server
        const serverData = await getAllData();

        if (serverData && serverData.length > 0) {
          setPeople(dataMap(serverData));
        } else {
          // Sample data
          const sampleData = [
            {
              id: '1',
              fullName: 'John Doe',
              populationId: '1234567890123456',
              familyId: '1111111111111111',
              gender: 'Male',
              dateOfBirth: '1990-05-15',
              placeOfBirth: 'Jakarta',
              religion: 'Islam',
              bloodType: 'A+'
            },
            {
              id: '2',
              fullName: 'Jane Smith',
              populationId: '6543210987654321',
              familyId: '2222222222222222',
              gender: 'Female',
              dateOfBirth: '1985-12-08',
              placeOfBirth: 'Surabaya',
              religion: 'Christian',
              bloodType: 'B+'
            },
            {
              id: '3',
              fullName: 'Ahmad Rahman',
              populationId: '1122334455667788',
              familyId: '3333333333333333',
              gender: 'Male',
              dateOfBirth: '1992-03-22',
              placeOfBirth: 'Bandung',
              religion: 'Islam',
              bloodType: 'O+'
            }
          ];
          setPeople(sampleData);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []); // Empty dependency array ensures this runs only once

  const addPerson = (newPerson) => {
    setPeople(prev => [...prev, { ...newPerson, id: Date.now().toString() }]);
    setActiveView('dashboard');
  }

  const updatePerson = async (updatedPerson) => {

  };

  const deletePerson = (id) => {
    setPeople(prev => prev.filter(p => p.id !== id));
  };

  const featureCards = [
    {
      title: 'Tambahkan Data Baru',
      description: 'Masukkan data penduduk baru ke sistem',
      icon: UserPlus,
      color: 'bg-green-500',
      action: () => setActiveView('add')
    },
    {
      title: 'Cari Data Penduduk',
      description: 'Cari dan filter data penduduk',
      icon: Search,
      color: 'bg-blue-500',
      action: () => setActiveView('search')
    },
    {
      title: 'Statistik & Grafik',
      description: 'Lihat statistik dan grafik data penduduk',
      icon: BarChart3,
      color: 'bg-purple-500',
      action: () => setActiveView('stats')
    },
    {
      title: 'Export Data',
      description: 'Download reports and backups',
      icon: Download,
      color: 'bg-orange-500',
      action: () => {
        // In production, implement actual export functionality
        alert('Export functionality would be implemented here');
      }
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Harun Regional Database System</h1>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Selamat Datang, {currentUser?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['dashboard', 'add', 'search', 'stats'].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeView === view
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white/60 text-gray-700 hover:bg-white/80'
                }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeView === 'dashboard' && (
          <div className="space-y-8">
            <StatsCards people={people} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featureCards.map((card, index) => (
                <div
                  key={index}
                  onClick={card.action}
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-200 cursor-pointer group"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${card.color} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 text-sm">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'add' && (
          <PersonForm onSubmit={addPerson} onCancel={() => setActiveView('dashboard')} />
        )}

        {activeView === 'search' && (
          <DataTable
            people={people}
            onUpdate={updatePerson}
            onDelete={deletePerson}
          />
        )}

        {activeView === 'stats' && (
          <Charts people={people} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;