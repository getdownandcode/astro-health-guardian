
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './lib/firebase'; // Import Firebase initialization

// Log that Firebase is being initialized
console.log("Initializing Firebase and mounting React app");

createRoot(document.getElementById("root")!).render(<App />);
