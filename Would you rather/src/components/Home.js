import React from 'react';
import HTabs from './HTabs';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location && location.state) {
    navigate(location.state.from.pathname);
    return null;
  }

  return (
    <div className="home">
      <HTabs />
    </div>
  );
}

export default Home;
