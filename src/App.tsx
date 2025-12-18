import { useState } from 'react';
import AiCallCenterDashboard from './components/dashboard';
import LoginPage from './components/login_page';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen">
      <AiCallCenterDashboard />
    </div>
  );
}

export default App;
