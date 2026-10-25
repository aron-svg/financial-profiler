# Moteur de simulation

Le moteur est volontairement separe de l'interface afin de pouvoir etre expose plus tard par une API FastAPI ou appele par un job d'analyse.

## Lancer l'exemple

```bash
cd analytics
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python financial_simulator.py
```

## Modules

- `FinancialProfile` porte les revenus, depenses, horizon et profil de risque.
- `compound_projection` applique la formule d'une rente mensuelle capitalisee chaque mois.
- `build_projection` produit un `DataFrame` avec les scenarios pessimiste, median et optimiste.
- `recommended_allocation` centralise l'allocation indicative par profil.

Les rendements sont des hypotheses pedagogiques. Une version de production devra ajouter frais, fiscalite, inflation, validation des donnees, historique de marche et avertissements reglementaires.
