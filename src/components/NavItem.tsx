import React from 'react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  mobile?: boolean;
}

function NavItem({ icon, label, active, onClick, mobile }: NavItemProps) {
  const baseClasses = mobile
    ? 'flex items-center px-3 py-2 rounded-xl text-base font-medium w-full transition-all duration-200'
    : 'flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200';

  const activeClasses = active
    ? 'bg-white/50 text-indigo-600 shadow-sm'
    : 'text-gray-600 hover:text-gray-900 hover:bg-white/30';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${activeClasses}`}
    >
      <span className={`mr-2 transition-transform duration-200 ${active ? 'scale-110' : ''}`}>
        {icon}
      </span>
      {label}
    </button>
  );
}

export default NavItem;