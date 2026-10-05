
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

# Cheat sheet Docker

## Conceptos clave
- Imagen = receta congelada (solo lectura) | Contenedor = imagen corriendo
- Cliente (`docker`) le habla al daemon (`dockerd`) por HTTP a través de `/var/run/docker.sock`
- Un contenedor vive mientras vive su proceso principal (PID 1)
- Los contenedores comparten el kernel de la máquina (no son máquinas virtuales)
- Los contenedores son DESECHABLES: lo que cambias adentro se pierde al borrarlos
- Los datos que deben sobrevivir van en VOLÚMENES

## Setup en WSL
- `sudo service docker start` → encender el daemon (no arranca solo en WSL)
- `sudo usermod -aG docker master` → poder usar docker sin sudo (luego reabrir terminal o `wsl --shutdown`)
- Estar en el grupo docker = casi lo mismo que ser root

## Comandos básicos
- `docker run -d -p 8080:80 --name web nginx` → correr en el fondo, puerto tu_máquina:contenedor
- `docker run -e VAR=valor` / `--env-file .env` → pasar variables de entorno
- `docker run -v "$PWD/web":/ruta/en/contenedor:ro` → conectar una carpeta (ro = solo lectura)
- `docker run --rm imagen comando` → ejecutar un comando y borrar el contenedor al terminar
- `docker ps` corriendo | `docker ps -a` todos | STATUS Exited (0) bien, Exited (1) error
- `docker logs nombre` → ver la salida del contenedor
- `docker exec -it nombre sh` → entrar a un contenedor (bash si la imagen lo trae)
- `docker rm -f nombre` → detener y borrar contenedor
- `docker images` → listar imágenes | `docker rmi imagen:tag` → borrar imagen
- Nombre de CONTENEDOR (--name) ≠ nombre de IMAGEN (repo:tag)

## Dockerfile
- `FROM node:20-alpine` → imagen base (alpine = liviana)
- `WORKDIR /app` → carpeta de trabajo dentro de la imagen
- `COPY package*.json ./` → primero las dependencias...
- `RUN npm install` → RUN se ejecuta al CONSTRUIR
- `COPY . .` → ...y el código al final (lo que cambia mucho, al final = aprovecha el caché)
- `EXPOSE 3000` → solo documentación
- `CMD ["npm", "start"]` → CMD se ejecuta al ARRANCAR el contenedor
- `docker build -t nombre:1.0 .` → construir (no olvidar el punto)
- Tags = versiones. Permiten volver a una versión anterior (rollback)
- Cambiar el código NO cambia la imagen: hay que reconstruir

## .dockerignore
- Excluye archivos de la imagen: `node_modules`, `.env`, `.git`, `Dockerfile`
- Los secretos NUNCA dentro de la imagen: se pasan al arrancar con --env-file

## Docker Compose
- `compose.yaml` describe varios servicios, redes y volúmenes
- `docker compose up -d --build` → levantar todo reconstruyendo
- `docker compose ps -a` / `logs servicio` / `exec servicio comando`
- `docker compose down` → borra contenedores y red, NO los volúmenes
- `docker compose down -v` → borra TAMBIÉN los volúmenes (¡se pierden los datos!)
- Compose lee el `.env` de la carpeta y reemplaza `${VARIABLE}`
- Entre servicios se usa el NOMBRE DEL SERVICIO (`@db:5432`), no localhost
- `healthcheck` + `depends_on: condition: service_healthy` → esperar a que la base esté lista

## PostgreSQL
- `docker compose exec db psql -U usuario -d base` → entrar a psql
- Nada se ejecuta hasta el `;` | `\dt` tablas | `\q` salir | `\r` cancelar
- `ALTER TABLE ... RENAME COLUMN` → cambiar estructura sin perder datos (migraciones)
- `pg` devuelve NUMERIC como texto (precisión del dinero) y las fechas en UTC

## Lecciones Docker
- Si algo no responde, revisar `docker compose ps -a` y `logs` antes de suponer
- `curl -s` oculta errores: usar `curl -sS` para diagnosticar
- Un puerto ocupado por un contenedor viejo impide arrancar el nuevo
- Revisar nombres de imágenes: un typo va a Docker Hub (riesgo de imágenes falsas)
- Preferir imágenes oficiales
