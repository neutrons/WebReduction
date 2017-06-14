# sns-reduction
sns-reduction

## Launching with fab file:

```
fab deploy_dev
fab deploy_dev_ssl

### within virtualenv
ps -ef | grep uwsgi
killall -s INT $(which uwsgi)

ps -ef | grep nginx
killall -s INT $(which nginx)
```


## Running

Single command:

```
find . -regextype sed -regex ".*migrations/[0-9]\{4\}_.*py" | xargs rm && \
psql -U reduction -d reduction -c "drop owned by reduction;" && \
./manage.py makemigrations && \
./manage.py migrate && \
./manage.py loaddata catalog && \
./manage.py runserver

```

```
find . -iname "$????_*.py*" | grep migrations
find . -iname "$????_*.py*" | grep migrations | xargs rm
./manage.py makemigrations
./manage.py migrate
./manage.py loaddata catalog
./manage.py createsuperuser
# RUN
./manage.py runserver
```

Also for celery & redis:

```

redis-server

celery -A server.celery worker -B --loglevel=debug

```

## Deploying:

### Redhat 7


## DB

```
# Delete all migrations
find . -regextype sed -regex ".*migrations/[0-9]\{4\}_.*py"
```

```
psql reduction reduction

# In the DB:
drop owned by reduction;

```

OR

In `bash` (folder `src`):

```
find .. -regextype sed -regex ".*migrations/[0-9]\{4\}_.*py" | xargs rm && \
psql -U reduction -d reduction -c "drop owned by reduction;" && \
./manage.py makemigrations && \
./manage.py migrate && \
./manage.py loaddata catalog jobs && \
./manage.py runserver 0.0.0.0:8000
```

## TODO

- cache sessions : get rid of the `authorized_keys`.
