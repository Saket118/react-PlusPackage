import { useNavigate } from 'react-router-dom';

function useLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all stored session data
    localStorage.clear();
    sessionStorage.clear();

    // Optionally, if you keep token/user data in specific keys, you can clear only those:
    // localStorage.removeItem('authToken');
    // localStorage.removeItem('userType');

    // Redirect to login page
    navigate('/login');
  };

  return handleLogout;
}
