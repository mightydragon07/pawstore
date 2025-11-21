// components/ProfilePage.jsx
import React, { useState } from 'react';
import { User, Mail, LogOut, Package, Settings, Edit, CheckCircle, Phone, MapPin } from 'lucide-react';

export const ProfilePage = ({ user, logout, setCurrentPage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || 'Smart User',
    email: user?.email || 'user@smartpaws.com',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const handleSave = () => {
    console.log('Profile saved:', profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <User className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-white mb-4">
            My Profile
          </h2>
          <p className="text-gray-400">
            Manage your account and pet information
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Profile Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 relative">
            <button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="absolute top-6 right-6 p-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2"
            >
              {isEditing ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Save</span>
                </>
              ) : (
                <>
                  <Edit className="w-5 h-5" />
                  <span className="text-sm font-medium">Edit</span>
                </>
              )}
            </button>
            
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-blue-500/10 rounded-full flex items-center justify-center border-4 border-blue-500 shadow-lg shadow-blue-500/30">
                  <User className="w-16 h-16 text-blue-500" />
                </div>
              </div>
              
              <div className="flex-1 w-full space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-400 mb-2">
                      <User className="w-4 h-4 mr-2 text-blue-400" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="w-full py-2 px-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-white font-medium text-lg">{profile.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-400 mb-2">
                      <Mail className="w-4 h-4 mr-2 text-blue-400" />
                      Email
                    </label>
                    <p className="text-white font-medium text-lg">{profile.email}</p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-400 mb-2">
                      <Phone className="w-4 h-4 mr-2 text-blue-400" />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input 
                        type="tel" 
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="w-full py-2 px-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      profile.phone ? (
                        <p className="text-white font-medium text-lg">{profile.phone}</p>
                      ) : (
                        <div className="flex items-center space-x-3">
                          <p className="text-gray-400 text-sm">No phone added</p>
                          <button onClick={() => setIsEditing(true)} className="text-blue-400 text-sm underline">Add</button>
                        </div>
                      )
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-400 mb-2">
                      <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                      Address
                    </label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={profile.address}
                        onChange={(e) => setProfile({...profile, address: e.target.value})}
                        className="w-full py-2 px-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      profile.address ? (
                        <p className="text-white font-medium text-lg">{profile.address}</p>
                      ) : (
                        <div className="flex items-center space-x-3">
                          <p className="text-gray-400 text-sm">No address added</p>
                          <button onClick={() => setIsEditing(true)} className="text-blue-400 text-sm underline">Add</button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={() => setCurrentPage('orders')}
              className="flex items-center justify-center p-6 bg-slate-800/50 border border-slate-700 rounded-xl text-white hover:bg-slate-800 hover:border-blue-500/50 transition-all group"
            >
              <Package className="w-6 h-6 mr-3 text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">My Orders</span>
            </button>
            <button 
              className="flex items-center justify-center p-6 bg-slate-800/50 border border-slate-700 rounded-xl text-white hover:bg-slate-800 hover:border-blue-500/50 transition-all group"
            >
              <Settings className="w-6 h-6 mr-3 text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Settings</span>
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="w-full py-4 text-lg font-semibold rounded-xl text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/30 transition-all flex items-center justify-center space-x-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};