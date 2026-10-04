#!/bin/bash
set -euo pipefail

ORIGEN="$HOME/Aprendizaje-linux/lab6/datos"
DESTINO="$HOME/Aprendizaje-linux/lab6/backups"
DIAS_A_GUARDAR=7
FECHA=$(date +%Y-%m-%d_%H-%M-%S)
ARCHIVO="$DESTINO/backup-$FECHA.tar.gz"

if [ ! -d "$ORIGEN" ]; then
    echo "ERROR: no existe la carpeta de origen: $ORIGEN"
    exit 1
fi

mkdir -p "$DESTINO"
tar -czf "$ARCHIVO" -C "$ORIGEN" .
echo "Backup creado: $ARCHIVO"

find "$DESTINO" -name "backup-*.tar.gz" -mtime +"$DIAS_A_GUARDAR" -print -delete
echo "Limpieza lista: se borraron los backups de mas de $DIAS_A_GUARDAR dias"
