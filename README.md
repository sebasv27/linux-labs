# Linux Labs

Hands-on labs I completed to learn Linux, as part of my transition from IT support to software development.

## What I learned

- **Lab 1:** Navigating the file system and managing files
- **Lab 2:** Reading and filtering logs with grep, cut, sort and pipes
- **Lab 3:** Users and file permissions (chmod, numeric permissions)
- **Lab 4:** Processes, background jobs and package management
- **Lab 5:** Networking basics, environment variables and .env files
- **Lab 6:** A backup script written in Bash

## Backup script

The script in `lab6/backup.sh`:

- Creates a compressed backup (`.tar.gz`) with the date and time in the name
- Stops and shows a clear error if the source folder does not exist
- Deletes backups older than 7 days

### How to use it

```bash
chmod +x lab6/backup.sh
./lab6/backup.sh
```

# Docker labs

- Docker Lab 1: Running an Nginx container, using volumes, and building my first custom image with a Dockerfile
- Docker Lab 2: Building a Node.js API image, configuring it with environment variables, and protecting secrets with .dockerignore
- Docker Lab 3: Connecting the API to PostgreSQL with Docker Compose and storing data in a volume

## CI/CD

On every push, GitHub Actions:

- Checks the Bash scripts with ShellCheck
- Runs the backup script and verifies the result
- Builds the Docker image of the API and tests that it responds

## Next steps

Dockerizing my personal finance app, Control de Gastos.

![CI](https://github.com/sebasv27/linux-labs/actions/workflows/ci.yml/badge.svg)
