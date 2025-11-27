/**
 * Firestore Initialization Script
 * ⚠️ À exécuter UNE SEULE FOIS pour peupler Firestore avec les produits
 */

import { db } from './firebaseConfig.js';
import { collection, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

async function populateFirestore() {
    try {
        console.log('📦 Chargement de config.json...');

        // Load config.json
        const response = await fetch('../config.json');
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const config = await response.json();
        console.log(`✅ ${config.products.length} produits trouvés dans config.json`);

        console.log('🔥 Initialisation de Firestore...');

        // Create products collection
        for (const product of config.products) {
            const productData = {
                ...product,
                purchased: false,
                purchasedAt: null
            };

            await setDoc(doc(db, 'products', product.id.toString()), productData);
            console.log(`✅ Produit ${product.id} (${product.name}) ajouté`);
        }

        console.log('🎉 Firestore initialisé avec succès !');
        console.log(`📊 ${config.products.length} produits ajoutés à la base de données`);

        alert(`✅ Firestore initialisé avec succès !\n\n${config.products.length} produits ont été ajoutés.`);

    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation de Firestore:', error);
        alert(`❌ Erreur: ${error.message}\n\nVérifiez la console pour plus de détails.`);
    }
}

// Auto-execute when the script loads
populateFirestore();
