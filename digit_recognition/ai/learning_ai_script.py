import pandas as pd
import numpy as np
import os
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
import joblib

df = pd.read_csv("mnist_train.csv")
print(df.shape)

y = df.iloc[:, 0].values
X = df.iloc[:, 1:].values

print("Données chargées :", X.shape, y.shape)

i = 123
plt.imshow(X[i].reshape(28, 28), cmap="gray")
plt.title(f"Label : {y[i]}")
plt.axis("off")
plt.show()

fig, axes = plt.subplots(2, 5, figsize=(10, 5))
for num, ax in enumerate(axes.flat):
    idx = np.where(y == num)[0][0]
    ax.imshow(X[idx].reshape(28, 28), cmap='gray')
    ax.set_title(f"Label: {num}")
    ax.axis('off')
plt.tight_layout()
plt.show()

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))

correct = np.where(y_pred == y_test)[0][:10]
fig, axes = plt.subplots(2, 5, figsize=(10, 5))
for i, ax in enumerate(axes.flat):
    ax.imshow(X_test[correct[i]].reshape(28, 28), cmap='gray')
    ax.set_title(f"Vrai : {y_test[correct[i]]}\nPrévu : {y_pred[correct[i]]}")
    ax.axis('off')
plt.tight_layout()
plt.show()

wrong = np.where(y_pred != y_test)[0][:10]
fig, axes = plt.subplots(2, 5, figsize=(10, 5))
for i, ax in enumerate(axes.flat):
    ax.imshow(X_test[wrong[i]].reshape(28, 28), cmap='gray')
    ax.set_title(f"Vrai : {y_test[wrong[i]]}\nPrévu : {y_pred[wrong[i]]}")
    ax.axis('off')
plt.tight_layout()
plt.show()

joblib.dump(model, "random_forest_mnist.pkl")
print("Modèle sauvegardé !")
