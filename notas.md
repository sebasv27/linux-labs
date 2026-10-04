
# Cheat sheet Linux

## Lab 1: Navegación y archivos
- `pwd` → muestra en qué carpeta estoy
- `whoami` → usuario actual
- `ls -la` → lista todo, con detalles y ocultos (`-R` recursivo, `-r` orden inverso)
- `cd ..` sube un nivel | `cd ~` a mi carpeta personal | `cd -` vuelve a la anterior
- `mkdir carpeta` → crea carpetas | `touch archivo.txt` → crea archivos vacíos
- `mv viejo.txt nuevo.txt` → mueve o renombra
- `cp origen destino` → copia
- `rm archivo` → borra archivo (sin papelera) | `rmdir carpeta` → borra carpeta vacía | `rm -r` → borra carpeta con todo (cuidado)
- `echo "texto" > archivo` → REEMPLAZA todo el contenido
- `echo "texto" >> archivo` → AGREGA al final
- `cat archivo` → muestra el contenido

## Lab 2: Texto y logs
- `wc -l archivo` → cuenta líneas
- `head -n 5` / `tail -n 5` → primeras / últimas líneas
- `grep ERROR app.log` → busca líneas (`-c` cuenta, `-i` ignora mayúsculas, `-v` invierte, `-w` palabra exacta)
- `cut -d ' ' -f3` → saca la columna 3 separada por espacios
- `sort` ordena | `uniq -c` cuenta repetidos (SIEMPRE después de sort)
- `cut -d ' ' -f3 app.log | sort | uniq -c | sort -rn` → resumen ordenado
- `Ctrl + C` → cancela el comando actual
- `man comando` / `comando --help` → ayuda

## Lab 3: Permisos
- `-rwxr-xr-x` → tipo | dueño | grupo | otros
- r=4 w=2 x=1 → 644 archivos normales, 755 scripts y carpetas, 600 privados (llaves SSH)
- `chmod u+x script.sh` → da ejecución al dueño | `chmod o-r archivo` → quita lectura a otros
- `chmod 755 script.sh` → permisos con números
- En carpetas, `x` = poder entrar/atravesarla
- `ls -ld carpeta` → permisos de la carpeta en sí
- `sudo comando` → ejecutar como administrador | `sudo -u usuario comando` → como otro usuario
- `chown` → cambia el dueño de un archivo

## Lab 4: Procesos y paquetes
- `ps` → mis procesos | `ps aux` → todos los del sistema
- `top` / `htop` → monitor en vivo (salir con `q`)
- `comando &` → correr en el fondo | `jobs` → ver procesos en el fondo
- `Ctrl + Z` pausa | `bg` reanuda en el fondo | `fg` trae al frente
- `kill %1` → mata por número de job | `kill 1234` → mata por PID
- `pgrep -a nombre` → busca procesos | `kill $(pgrep nombre)` → mata por nombre
- `sudo apt update` → actualiza la lista de paquetes
- `sudo apt install paquete` → instala

## Lecciones aprendidas
- Leer el mensaje de error COMPLETO antes de reintentar
- Verificar con `ls` en vez de suponer
- Linux distingue mayúsculas: `-r` ≠ `-R`, `-v` ≠ `-V`
- La extensión no define si algo es archivo o carpeta: lo define el comando con que lo creo
- Mirar el prompt antes de un comando grande (¿dónde estoy?)
- Usar Tab para autocompletar
- En un pipe, solo el PRIMER comando lleva el archivo
- No seguir sugerencias de "command not found" a ciegas

## Lab 5: Redes y variables de entorno
- `ip a` → interfaces de red y mis IPs (`lo` = localhost 127.0.0.1, `eth0` = red)
- `ping -c 4 google.com` → ¿llego al servidor? ¿cuánto tarda?
- `curl url` → petición HTTP desde la terminal (`-I` solo encabezados, `-s` sin barra de progreso)
- Códigos HTTP: 200 OK | 301 redirección | 404 no encontrado | 500 error del servidor
- `ss -tuln` → puertos escuchando en mi sistema
- `0.0.0.0` → escucha en todas las interfaces | `127.0.0.1` → solo mi máquina
- `python3 -m http.server 8000` → servidor web rápido en la carpeta actual
- `Ctrl + C` solo afecta al proceso del FRENTE (si está en el fondo: `fg` primero o `kill %1`)
- `echo $HOME` / `$USER` / `$PATH` → variables del sistema
- `$PATH` → carpetas donde Linux busca los comandos
- `VAR="valor"` → variable solo en esta terminal
- `export VAR` → la heredan los procesos hijos (Node, Python...)
- `VAR=valor comando` → la variable existe solo para ese comando
- `set -a; source .env; set +a` → carga un .env como variables exportadas
- `env | grep TEXTO` → busca variables exportadas
- `alias nombre='comando'` → atajo; en `~/.bashrc` para que sea permanente
- `source ~/.bashrc` → recarga la configuración sin cerrar la terminal

## Lecciones (parte 2)
- Una variable mal escrita NO da error: se convierte en vacío (peligroso en scripts)
- `.env` siempre en `.gitignore`, con `chmod 600`, y subir solo `.env.example`
- Escribir una ruta sola = intentar EJECUTAR ese archivo
- "Permission denied" no siempre significa "dame más permisos": primero entender por qué
- No usar `sudo` por reflejo cuando algo falla
- Un solo `>` sobre un archivo de configuración lo borra todo
