/**
 * Firebase Configuration
 * Configuration du projet Firebase pour la synchronisation en temps réel
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Configuration Firebase
// ⚠️ IMPORTANT : Remplacez ces valeurs par celles de votre projet Firebase
// Ces clés sont publiques et sécurisées côté Firestore avec des règles
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialisation de Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Log pour vérifier que Firebase est bien initialisé
console.log('🔥 Firebase initialisé avec succès');
