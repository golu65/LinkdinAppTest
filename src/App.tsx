import React from 'react'; 
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './context/store';
import LoginPage from './pages/LoginPage';
import FeedPage from './pages/FeedPage';
import CreatePostPage from './pages/CreatePostPage';
import ProfilePage from './pages/ProfilePage';
import NavBar from './components/NavBar';

const App: React.FC = () => {
  const LocationProvider: React.FC = () => {
    const location = useLocation();
    return (
      <>
        {location.pathname !== '/' && <NavBar />}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </>
    );
  };

  return (
    <Provider store={store}>
      <Router>
        <LocationProvider />
      </Router>
    </Provider>
  );
};

export default App;
