/**
 * Firebase Operations
 * Gestion des opérations Firestore pour la synchronisation temps réel des produits
 */

import { db } from './firebaseConfig.js';
import {
    collection,
    doc,
    onSnapshot,
    updateDoc,
    query,
    orderBy
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

/**
 * Écoute les changements en temps réel sur la collection products
 * @param {Function} callback - Fonction appelée avec les produits mis à jour
 * @returns {Function} Fonction pour arrêter l'écoute
 */
export function listenToProducts(callback) {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, orderBy('id'));

    console.log('👂 Écoute des changements Firestore activée');

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const products = [];

        snapshot.forEach((doc) => {
            products.push({
                firestoreId: doc.id,
                ...doc.data()
            });
        });

        console.log(`📦 ${products.length} produits chargés depuis Firestore`);
        callback(products);
    }, (error) => {
        console.error('❌ Erreur lors de l\'écoute Firestore:', error);

        // En cas d'erreur, fallback sur config.json
        console.log('🔄 Fallback sur config.json');
        callback(null, error);
    });

    return unsubscribe;
}

/**
 * Marque un produit comme acheté
 * @param {number|string} productId - ID du produit
 * @returns {Promise<void>}
 */
export async function markProductAsPurchased(productId) {
    try {
        const productRef = doc(db, 'products', productId.toString());

        await updateDoc(productRef, {
            purchased: true,
            purchasedAt: new Date().toISOString()
        });

        console.log(`✅ Produit ${productId} marqué comme acheté`);
    } catch (error) {
        console.error('❌ Erreur lors du marquage:', error);
        throw error;
    }
}

/**
 * Annule le marquage "acheté" d'un produit
 * @param {number|string} productId - ID du produit
 * @returns {Promise<void>}
 */
export async function unmarkProduct(productId) {
    try {
        const productRef = doc(db, 'products', productId.toString());

        await updateDoc(productRef, {
            purchased: false,
            purchasedAt: null
        });

        console.log(`🔄 Marquage annulé pour le produit ${productId}`);
    } catch (error) {
        console.error('❌ Erreur lors de l\'annulation:', error);
        throw error;
    }
}

/**
 * Vérifie si Firebase est configuré
 * @returns {boolean}
 */
export function isFirebaseConfigured() {
    try {
        const config = db.app.options;
        return config.apiKey !== 'YOUR_API_KEY' && config.projectId !== 'YOUR_PROJECT_ID';
    } catch (error) {
        return false;
    }
}
