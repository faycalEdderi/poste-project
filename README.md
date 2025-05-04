Projet Reconnaissance de Chiffres Manuscrits
============================================

Ce projet utilise un modèle d'intelligence artificielle pour reconnaître les chiffres manuscrits dessinés dans une interface web. Il est basé sur le dataset MNIST, un modèle RandomForestClassifier (scikit-learn), et une application fullstack (Django REST + React).

Structure du projet :
---------------------

digit_recognition/           -> Backend Django
digit-recognition-frontend/ -> Frontend React
ai/random_forest_mnist.pkl  -> Modèle IA entraîné

Comment lancer le projet :
--------------------------

1. Entraîner le modèle (si besoin) :
   À exécuter depuis un environnement Python local ou sur Google Colab :

   python learning_ai_script.py

   Cela génère le fichier `random_forest_mnist.pkl`.

2. Lancer le backend Django :

   cd digit_recognition
   python manage.py runserver

   Installer les dépendances si besoin :
   pip install -r requirements.txt

3. Lancer le frontend React :

   cd digit-recognition-frontend
   npm install
   npm start

   L'application React s'ouvre sur http://localhost:3000

Fonctionnement :
----------------

- L'utilisateur dessine un chiffre dans une cellule 28x28.
- L'image est envoyée au backend via une requête POST.
- Le modèle IA prédit le chiffre et le retourne à l’utilisateur.

Tâches & Organisation :
-----------------------

- Lien Trello :


*La répartition des tâches a été faite individuellement (projet réalisé seul).*

Support de présentation :
-------------------------

Lien vers le support :


Auteur : Edderi Fayçal
--------

Étudiant à IPSSI — Projet IA & Développement Web
