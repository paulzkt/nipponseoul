# Nippon Seoul

Application de planification et de suivi du voyage Japon / Coree du Sud du 30 septembre au 15 octobre 2026.

## Fonctions

- tableau de bord avec compte a rebours et progression ;
- itineraire de 16 jours, filtrable visuellement par ville ;
- jours cochables et sauvegardes dans le navigateur ;
- kanban de preparation avec ajout et changement de statut des taches ;
- recapitulatif des vols, hotels, trains et visites ;
- budget editable avec enveloppes personnalisables.

## Lancer en local

```bash
pnpm install
pnpm dev
```

## Build de production

```bash
pnpm run build
```

Le build statique est produit dans `dist/`. L application est aussi compatible avec le format Salesforce UI Bundle.

## Sources du voyage

Les horaires de vols et inclusions utilisent le document officiel Voyage Prive mis a jour le 4 aout 2026. Le planning personnel a servi a enrichir les idees de visites, de restaurants et d hotels. Les donnees divergentes sont signalees comme a confirmer.
