# sns-reduction
sns-reduction


## Running

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

## DB

```
psql reduction reduction

# In the DB:
drop owned by reduction;

```