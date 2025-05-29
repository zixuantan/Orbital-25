import React, { useState } from 'react';
import './Chats.css';

const Chats = ({ title, groups }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="groups">
      <div className="group-type" onClick={() => setIsOpen(!isOpen)}>

        <p id="title">{title}</p>
        <span className="extend">{isOpen ? '▴' : '▾'}</span>

      </div>

      {isOpen && (
        <ul className="group-list">

          {groups.map((name, index) => (
            <li key={index} className="chat">
              {name}
              <span className="arrow">›</span>
            </li>
          ))}

        </ul>
      )}

    </div>
  );
};

export default Chats; 


