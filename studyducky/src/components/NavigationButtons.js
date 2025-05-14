import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-3">
      <Button variant="primary" onClick={() => navigate(-1)} className="me-2">Back</Button>
      <Button variant="secondary" onClick={() => navigate(1)}>Forward</Button>
    </div>
  );
};

export default NavigationButtons;