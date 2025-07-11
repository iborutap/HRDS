import React, { useState, useMemo } from 'react';
import { Search, Filter, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { differenceInYears } from 'date-fns';
import PersonForm from './PersonForm';
import { updateData, deleteData } from '../services/Sheethrds';

const DataTable = ({ people, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');
  const [bloodTypeFilter, setBloodTypeFilter] = useState('all');
  const [sortField, setSortField] = useState('fullName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [editingPerson, setEditingPerson] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedPeople = useMemo(() => {
    let filtered = people.filter(person => {
      const matchesSearch =
        person.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.populationId.includes(searchTerm) ||
        person.familyId.includes(searchTerm) ||
        person.placeOfBirth.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.religion.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGender = genderFilter === 'all' || person.gender === genderFilter;
      const matchesBloodType = bloodTypeFilter === 'all' || person.bloodType === bloodTypeFilter;

      return matchesSearch && matchesGender && matchesBloodType;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue;
      let bValue;

      if (sortField === 'age') {
        aValue = differenceInYears(new Date(), new Date(a.dateOfBirth));
        bValue = differenceInYears(new Date(), new Date(b.dateOfBirth));
      } else {
        aValue = a[sortField];
        bValue = b[sortField];
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [people, searchTerm, genderFilter, bloodTypeFilter, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      onDelete(id);
    }
  };

  const handleEdit = (person) => {
    setEditingPerson(person);
  };

  if (editingPerson) {
    return (
      <PersonForm
        initialData={editingPerson}
        onSubmit={handleEdit}
        onCancel={() => setEditingPerson(null)}
      />
    );
  }

  const SortIcon = ({ field }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ?
      <ChevronUp className="w-4 h-4" /> :
      <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, ID, place, or religion..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
              <select
                value={bloodTypeFilter}
                onChange={(e) => setBloodTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Blood Types</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="text-sm text-gray-600">
        Menampilkan {filteredAndSortedPeople.length} dari {people.length} Jumlah Data Keseluruhan
      </div>

      {/* Data Table */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                {[
                  { key: 'fullName', label: 'Nama Lengkap' },
                  { key: 'populationId', label: 'NIK' },
                  { key: 'gender', label: 'Jenis Kelamin' },
                  { key: 'age', label: 'Usia' },
                  { key: 'placeOfBirth', label: 'Tempat Lahir' },
                  { key: 'dateOfBirth', label: 'Tanggal Lahir' },
                  { key: 'religion', label: 'Agama' },
                  { key: 'bloodType', label: 'Gol. Darah' },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className="px-6 py-4 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {label}
                      <SortIcon field={key} />
                    </div>
                  </th>
                ))}
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50">
              {filteredAndSortedPeople.map((person) => (
                <tr key={person.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{person.fullName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">{person.populationId}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{person.gender}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {differenceInYears(new Date(), new Date(person.dateOfBirth))} years
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{person.placeOfBirth}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{new Date(person.dateOfBirth).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{person.religion}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                      {person.bloodType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(person)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {/* <button
                        onClick={() => handleDelete(person.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAndSortedPeople.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-2">No people found</div>
            <div className="text-sm text-gray-400">Try adjusting your search or filter criteria</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;