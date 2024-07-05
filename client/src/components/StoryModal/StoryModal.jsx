import React, { useState } from 'react';
import './storyModal.scss';

const StoryModal = ({ story, onClose, isOwner, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="storyModal">
      <div className="overlay" onClick={onClose}></div>
      <div className="content">
        <span>{story.name}</span>
        <img src={story.img} alt={story.name} />
        {isOwner && (
          <div className="menu-icon" onClick={handleToggleMenu}>
            ⋮
          </div>
        )}
        {showMenu && (
          <div className="menu">
            <button onClick={onDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryModal;
