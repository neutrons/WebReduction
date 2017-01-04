# TODO

Make file for deploy using the .env

Run everything from the .env

```
#
# Launch in parallel:
/usr/sbin/nginx -c nginx.conf -g 'daemon off;' -p nginx
uwsgi --ini reduction_uwsgi.ini
#
```

See env variobles here for nginx:
https://blog.doismellburning.co.uk/environment-variables-in-nginx-config/

