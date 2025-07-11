import React, { useState } from 'react';
import { Save, X, User } from 'lucide-react';

const AddPersonForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || '',
    populationId: initialData?.populationId || '',
    familyId: initialData?.familyId || '',
    gender: initialData?.gender || 'Male',
    dateOfBirth: initialData?.dateOfBirth || '',
    placeOfBirth: initialData?.placeOfBirth || '',
    religion: initialData?.religion || '',
    bloodType: initialData?.bloodType || 'A+'
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.populationId.trim()) newErrors.populationId = 'Population ID is required';
    else if (formData.populationId.length !== 16) newErrors.populationId = 'Population ID must be 16 digits';
    else if (!/^\d{16}$/.test(formData.populationId)) newErrors.populationId = 'Population ID must contain only digits';
    
    if (!formData.familyId.trim()) newErrors.familyId = 'Family ID is required';
    else if (formData.familyId.length !== 16) newErrors.familyId = 'Family ID must be 16 digits';
    else if (!/^\d{16}$/.test(formData.familyId)) newErrors.familyId = 'Family ID must contain only digits';
    
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.placeOfBirth.trim()) newErrors.placeOfBirth = 'Place of birth is required';
    if (!formData.religion.trim()) newErrors.religion = 'Religion is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <User className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {initialData ? 'Edit Person' : 'Add New Person'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.fullName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter full name"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Population ID * (16 digits)
            </label>
            <input
              type="text"
              value={formData.populationId}
              onChange={(e) => handleChange('populationId', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.populationId ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="1234567890123456"
              maxLength={16}
            />
            {errors.populationId && (
              <p className="mt-1 text-sm text-red-600">{errors.populationId}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Family ID * (16 digits)
            </label>
            <input
              type="text"
              value={formData.familyId}
              onChange={(e) => handleChange('familyId', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.familyId ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="1111111111111111"
              maxLength={16}
            />
            {errors.familyId && (
              <p className="mt-1 text-sm text-red-600">{errors.familyId}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender *
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth *
            </label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.dateOfBirth ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.dateOfBirth && (
              <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Place of Birth *
            </label>
            <input
              type="text"
              value={formData.placeOfBirth}
              onChange={(e) => handleChange('placeOfBirth', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.placeOfBirth ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter place of birth"
            />
            {errors.placeOfBirth && (
              <p className="mt-1 text-sm text-red-600">{errors.placeOfBirth}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Religion *
            </label>
            <input
              type="text"
              value={formData.religion}
              onChange={(e) => handleChange('religion', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.religion ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter religion"
            />
            {errors.religion && (
              <p className="mt-1 text-sm text-red-600">{errors.religion}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blood Type *
            </label>
            <select
              value={formData.bloodType}
              onChange={(e) => handleChange('bloodType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200"
          >
            <Save className="w-5 h-5" />
            {initialData ? 'Update Person' : 'Add Person'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPersonForm;