import React from 'react';
import { googleLogout } from '@react-oauth/google';
import { FaSignOutAlt } from 'react-icons/fa';

// Bileşen artık 'className' prop'u alıyor
function Logout({ onLogout, className }) {
  const handleLogoutClick = () => {
    googleLogout();
    onLogout();
  };

  return (
    // Tüm stil tanımlamaları kaldırıldı, sadece className kullanılıyor
    <button 
      onClick={handleLogoutClick} 
      className={className} // Dışarıdan gelen sınıf adı buraya atanıyor
      title="Logout"
    >
      <FaSignOutAlt />
    </button>
  );
}

export default Logout;