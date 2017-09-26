# Deploy the reduction server to RHEL7


## Inits

```bash

# SSH to the VM
# Note that port forwarding was configured in the VM
ssh  vagrant@127.0.0.1 -p 2222

##

echo $'PATH=$PATH:/usr/pgsql-9.5/bin\nexport PATH' >> ~/.bash_profile
source ~/.bash_profile

##
echo $'Host github.com\n\tHostname ssh.github.com\n\tPort 443\n' >> ~/.ssh/config
chmod 600 ~/.ssh/config

```

## Software needed:

```bash
sudo yum install libffi-devel openldap-devel openssl-devel
sudo yum install https://yum.postgresql.org/9.5/redhat/rhel-7-x86_64/postgresql95-devel-9.5.7-1PGDG.rhel7.x86_64.rpm

sudo yum install lapack.x86_64
sudo yum install ftp://rpmfind.net/linux/centos/7.3.1611/os/x86_64/Packages/lapack-devel-3.4.2-5.el7.x86_64.rpm

sudo yum install uwsgi uwsgi-plugin-python

sudo yum install nginx

```

## Place the certificates here:

```
/etc/ssl/certs/wildcard.sns.gov.crt
/etc/pki/tls/private/wildcard.sns.gov.key
```

## Installing the server

```bash

cd ~
git clone git@github.com:ricleal/sns-reduction.git

##
cd /home/vagrant/sns-reduction
virtualenv-3.5 venv -p /opt/rh/rh-python35/root/usr/bin/python3.5
source venv/bin/activate
pip install -r config/requirements/production.txt 

# Create .env file:
cp config/envs/env.prod .env

```

## Database ini

It looks like it's launched in init by default

```sh
# No need for this
# sudo /usr/pgsql-9.5/bin/postgresql95-setup initdb

# Enter as postgres user
sudo su - postgres

# Create user reduction
createuser -P -s -e reduction

# Once postgres user, create a db
createdb -O reduction -W reduction

# edit and get the authentication method as
sudo vi /var/lib/pgsql/9.5/data/pg_hba.conf
# local   all             all                                     md5
# host    all             all             127.0.0.1/32            md5
# host    all             all             ::1/128                 md5

# Restart the service
sudo systemctl restart postgresql-9.5

# Test
psql --username=reduction -W reduction
# list all databases
\list
# Connect to database:
\connect reduction
# list all tables in the current database
\dt
```

# Services system.d

**General**:

```sh

# Init scripts are here:
/usr/lib/systemd/system/

#To start a service at boot, the init file must be linked / moved to:
/etc/systemd/system/

# To enable a service at startup
systemctl enable [name.service]
# this will create a link in /etc/systemd/system/

# List services
systemctl list-unit-files --type=service
# Enabled: it has a symlink in a .wants directory: it was enable to start at boot.
# Disabled
# Static: the service script is missing the [Install] section. Static services are usually dependencies of other services.

# to see if a service is running
systemctl status bluetooth.service

# Usefull commands:

systemctl start [name.service]
systemctl stop [name.service]
systemctl restart [name.service]
systemctl reload [name.service]
systemctl status [name.service]
systemctl is-active [name.service]
systemctl list-units --type service --all

```

**Remove a service**

```
sudo systemctl stop reduction_nginx
sudo systemctl disable reduction_nginx
sudo rm /etc/systemd/system/reduction_nginx.service 
sudo rm /lib/systemd/system/reduction_nginx.service 
sudo rm /usr/lib/systemd/system/reduction_nginx.service 
sudo systemctl daemon-reload
sudo systemctl reset-failed
```

**Logs**

```
# See all systemd logs
journalctl

# Tail logs
journalctl -f

# Show logs for specific service
journalctl -u my_daemon.service
```

**User mode**:

See https://wiki.archlinux.org/index.php/Systemd/User

Nginx needs to start as root! (port 80!), the others could start as user.
However, all services to start on boot thus need root!

## Redis

Not in init by default:

```bash
$ systemctl list-unit-files | grep redis
redis-sentinel.service                      disabled
redis.service                               disabled
```




## NGINX


