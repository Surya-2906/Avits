import React, { useState, useRef } from 'react';
import { Upload, Bell, LayoutDashboard, Users, FolderKanban, Clock, LogOut, Sun, Moon, MessageSquare, Menu, Globe } from 'lucide-react';

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
    // You can add logic here to handle language change (e.g., updating context or state)
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-800 border-gray-900' : 'bg-white'} border-b fixed top-0 left-0 right-0 z-10`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-purple-900 font-bold text-2xl">
            Avits
          </div>
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <input 
                type="search" 
                placeholder="Search..." 
                className={`w-full px-3 py-1.5 border rounded-md pl-8 ${
                  isDarkMode 
                    ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300'
                }`}
              />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <Globe size={20} className={`mr-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className={`bg-transparent border border-gray-300 rounded-md text-sm p-1 focus:outline-none focus:border-purple-900 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {['English', 'Spanish', 'French', 'German', 'Chinese'].map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
            <button 
              onClick={toggleDarkMode}
              className={`p-1 ${isDarkMode ? 'text-yellow-400' : 'text-gray-600'} hover:text-yellow-500`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className={`p-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} hover:text-gray-800`}>
              <Bell size={20} />
            </button>
            <button className={`p-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} hover:text-gray-800`}>
              <MessageSquare size={20} />
            </button>
            <button className={`p-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} hover:text-gray-800`}>
              <Menu size={20} />
            </button>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen w-48 border-r pt-16 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-900 text-white' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="p-4">
          <h2 className={`text-xs font-medium mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Main</h2>
          <ul className="space-y-4">
            <li className="flex items-center gap-2 font-medium">
              <LayoutDashboard size={18} color="#a020f0" />
              Dashboard
            </li>
          </ul>
          
          <h2 className={`text-xs font-medium mt-8 mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Lists</h2>
          <ul className="space-y-4">
            <li className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-900'}`}>
              <Users size={18} color="#a020f0" />
              Employee
            </li>
            <li className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-900'}`}>
              <FolderKanban size={18} color="#a020f0"/>
              Projects
            </li>
            <li className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-900'}`}>
              <Clock size={18} color="#a020f0"/>
              Attendance
            </li>
            <li className={`flex items-center gap-2 mt-8 ${isDarkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-900 '}`}>
              <LogOut size={18} color="#a020f0"/>
              Logout
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <main className="ml-48 pt-16">
        <div className="p-8">
          <h1 className={`text-xl font-medium mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Add new employee</h1>
          
          <div className={`p-8 rounded-lg border shadow-sm ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-900' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="grid grid-cols-2 gap-x-16 gap-y-8">
              <div className="col-span-2">
                <div className="flex items-start gap-8">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                    {previewImage ? (
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users size={32} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Image:</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button 
                      onClick={triggerFileInput}
                      className={`flex items-center gap-2 border rounded px-4 py-1.5 text-sm ${
                        isDarkMode 
                          ? 'border-gray-600 hover:bg-gray-900 text-gray-300' 
                          : 'border-gray-300 hover:bg-gray-50 text-gray-900'
                      }`}
                    >
                      <Upload size={16} />
                      Upload
                    </button>
                  </div>
                </div>
              </div>

              {['Name:', 'Phone Number:', 'Password:', 'Email:', 'Joining Date:', 'Role:'].map((label) => (
                <div key={label}>
                  <label className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{label}</label>
                  <input 
                    type={label === 'Password:' ? 'password' : label === 'Joining Date:' ? 'date' : label === 'Phone Number:' ? 'number' : 'text'}
                    placeholder={label === 'Joining Date:' ? 'dd-mm-yyyy' : ''}
                    className={`w-full border-b pb-1 focus:outline-none focus:border-purple-900 ${
                      isDarkMode 
                        ? 'bg-gray-800 text-white border-gray-600' 
                        : 'bg-white text-gray-900 border-gray-300'
                    }`}
                  />
                </div>
              ))}

              <div className="col-span-2 flex justify-end">
                <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
                  Add Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;