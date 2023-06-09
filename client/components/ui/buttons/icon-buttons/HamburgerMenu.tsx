import React from 'react';

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

// Hamburger menu icon on the top header. It is used to toggle the mobile dropdown menu.
const HamburgerMenu: React.FC<Props> = ({ visible, setVisible, className = '' }) => {
  return (
    <div
      className={`flex-center lg:hidden -my-2 h-[2.4rem] w-[2.4rem] rounded-full hover:bg-gray-100 mr-2 cursor-pointer ${className}`}
      onClick={() => setVisible((ps) => !ps)}
    >
      <div className={`hamburger-menu ${visible ? 'active' : ''}`} />
    </div>
  );
};

export default HamburgerMenu;
