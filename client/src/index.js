import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext"; // Wrap with AuthProvider
import Header from './components/Header'

// route layout page, app and header are wrapped within auth context with updates based off user login status
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <AuthProvider> {/* AuthProvider wraps the entire app */}
        <BrowserRouter> 
            <Header/>
            <App />
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
