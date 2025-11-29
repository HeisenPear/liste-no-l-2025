/**
 * Firebase Configuration
 * Configuration du projet Firebase pour la synchronisation en temps réel
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Configuration Firebase
// Ces clés sont publiques et sécurisées côté Firestore avec des règles
const firebaseConfig = {
  apiKey: "AIzaSyByYQB3MC9CSMWo7r0ATEGEOh11BamXtLU",
  authDomain: "liste-noel-2025-4557a.firebaseapp.com",
  projectId: "liste-noel-2025-4557a",
  storageBucket: "liste-noel-2025-4557a.firebasestorage.app",
  messagingSenderId: "655870224696",
  appId: "1:655870224696:web:8e0e0a9eddb3b40084f9cd",
  measurementId: "G-3WRNTB6RBN"
};

// Initialisation de Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Log pour vérifier que Firebase est bien initialisé
console.log('🔥 Firebase initialisé avec succès');
