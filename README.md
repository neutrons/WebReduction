# HFIR and SNS Web Data Reduction

The new version of the HFIR and SNS Web Data Reduction

## Features:

- Catalog data for all SNS instruments and HFIR SANS
- Configuration
- Reduction

# Running

## Python Virtual environment

After cloning the project in e.g. `WebReduction`, create a virtual env called `venv`:

```sh
cd WebReduction
virtualenv venv -p $(which python3)
```

Activate it:

```
source venv/bin/activate
```

Install project dependencies (dev or production):

```
pip install -r config/requirements/dev.txt
```

## Create `.env` File

Create `WebReduction/.env`.

See templates here:
`WebReduction/config/envs/`

## Deploy with `fabric`:

Do:
```
$ fab --list

Available commands:

    full_deploy      Updates the project, make migrations and start all the services.
    migrate          Make the Django migrations and load fixtures
    start            Clones or pull the repo into the project root
    start_celery     Start Celery
    start_daphne     Start daphne
    start_nginx      Start NGINX
    start_redis      Start Redis Server
    start_runworker  Start runworker

```

To see what is available as tasks

To start the project (i.e. clone) from the branch `dev` and with the `staging` configurations:

```
fab -R staging start:branch='dev'
```

## Development OSx

Run in different shells:

Database:

```
postgres.sh
```

Redis:

```
redis-server
```

Celery:

```
source venv/bin/activate
cd src/
celery -A server.celery worker -B --loglevel=debug
```

Django:

```
source venv/bin/activate
cd src
./manage.py runserver
```

## Development Ubuntu

Run in different shells:

Database:

```sh
# Check if postgresql is running
ps -ef | grep postgresql
```

Redis:

```sh
# Check if redis-server is running
ps -ef | grep redis-server
```

Celery:

```
source venv/bin/activate
cd src/
celery -A server.celery worker -B --loglevel=debug
```

Django:

```sh
source venv/bin/activate
cd src
./manage.py runserver 0.0.0.0:8000
```

## Cleaning up

Remove the old migration files:

```sh
find . -regextype sed -regex ".*migrations/[0-9]\{4\}_.*py" | xargs rm
```

Clean up the database:
```
psql -U reduction -d reduction -c "drop owned by reduction;"
```
or:
```
psql reduction reduction
# Once In the DB shell:
drop owned by reduction;
```


Make migration and launch the Django server:

```sh
./manage.py makemigrations && \
./manage.py migrate && \
./manage.py loaddata catalog jobs && \
./manage.py runserver 0.0.0.0:8000
```


All in a **single command**:

```
find . -regextype sed -regex ".*migrations/[0-9]\{4\}_.*py" | xargs rm && \
psql -U reduction -d reduction -c "drop owned by reduction;" && \
./manage.py makemigrations && \
./manage.py migrate && \
./manage.py loaddata catalog jobs && \
./manage.py runserver
```

# Production


```
cd /usr/local/reduction
git pull origin master

source venv/bin/activate
pip install -r config/requirements/dev.txt -U


rm -rf /usr/local/reduction/dist/static/*
cd src/
python manage.py collectstatic

cd ..
find . -regextype sed -regex ".*migrations/[0-9]\{4\}_.*py" | xargs rm

psql -U reduction -d reduction -c "drop owned by reduction;"

cd src
./manage.py makemigrations && ./manage.py migrate && ./manage.py loaddata catalog jobs


sudo systemctl restart celery.service
sudo systemctl status celery.service

sudo systemctl restart runworker.service
sudo systemctl status runworker.service

```
