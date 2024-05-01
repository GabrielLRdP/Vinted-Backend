# Vinted Backend

## Description

Ce projet constitue le backend du clone de Vinted, une plateforme de vente et d'achat de vêtements d'occasion. Il fournit les fonctionnalités nécessaires pour gérer les utilisateurs, les annonces, les paiements et d'autres aspects de l'application. Vous pouvez retrouver le repository du frontend en [cliquant ici](https://github.com/GabrielLRdP/Vinted-frontend/edit/main/README.md)


## Technologies Utilisées

- **Framework:** Express.js
- **Base de Données:** MongoDB
- **Authentification:** JWT (JSON Web Tokens)

### Librairies Additionnelles:

- **cloudinary:** Utilisé pour le stockage et la gestion des images.
- **cors:** Middleware pour permettre les requêtes CORS (Cross-Origin Resource Sharing).
- **crypto-js:** Utilisé pour le chiffrement des données sensibles.
- **dotenv:** Utilisé pour charger les variables d'environnement à partir d'un fichier `.env`.
- **express-fileupload:** Middleware pour gérer le téléchargement de fichiers.
- **mongoose:** ODM (Object-Document Mapper) pour MongoDB, facilitant la manipulation des données.
- **stripe:** Bibliothèque utilisée pour l'intégration des paiements.
- **uid2:** Utilisé pour la génération d'identifiants uniques.

## Installation

1. Cloner ce repository.
2. Installer les dépendances en utilisant `npm install`.
3. Créer un fichier `.env` à la racine du projet et configurer les variables d'environnement nécessaires (voir `.env.example` pour un exemple).
4. Lancer le serveur avec `npm start`.

   ## Configuration des Variables d'Environnement

Avant de lancer le serveur, assurez-vous de configurer correctement les variables d'environnement en créant un fichier `.env` à la racine du projet. Voici les variables requises :

- **MONGODB_URI:** L'URL de connexion à votre base de données MongoDB.
- **CLOUDINARY_NAME:** Le nom de votre compte Cloudinary
- **CLOUDINARY_KEY:** La clé API de votre compte Cloudinary.
- **CLOUDINARY_SECRET_KEY:** Le secret de votre compte Cloudinary.
- **STRIPE_SECRET_KEY:** La clé secrète de votre compte Stripe pour l'intégration des paiements.
