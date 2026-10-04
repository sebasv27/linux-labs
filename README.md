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

## Next steps

Docker and CI/CD with GitHub Actions.
