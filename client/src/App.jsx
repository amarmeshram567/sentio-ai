import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import Home from './pages/Home';
import { SentioWorkspace } from './pages/SentioWorkspace';
import { LoaderIcon, Toaster } from "react-hot-toast"



const ProtectedWorkspace = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    setTimeout(() => {

      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-obsidian-950 text-silver-200">
          <LoaderIcon className="h-8 w-8 animate-spin rounded-full border-2 border-silver-200/20 border-t-silver-200" />
        </div>
      );
    }, 2000);
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false}
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#f8fafc',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/workspace"
          element={
            <ProtectedWorkspace>
              <SentioWorkspace />
            </ProtectedWorkspace>
          }
        />
      </Routes>
    </>
  );
};

export default App;
