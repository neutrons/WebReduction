#

ssh  vagrant@127.0.0.1 -p 2222

##

echo $'PATH=$PATH:/usr/pgsql-9.5/bin\nexport PATH' >> ~/.bash_profile
source ~/.bash_profile

##
echo $'Host github.com\n\tHostname ssh.github.com\n\tPort 443\n' >> ~/.ssh/config
chmod 600 ~/.ssh/config
##


sudo yum install libffi-devel openldap-devel openssl-devel
sudo yum install https://yum.postgresql.org/9.5/redhat/rhel-7-x86_64/postgresql95-devel-9.5.7-1PGDG.rhel7.x86_64.rpm

sudo yum install lapack.x86_64
sudo yum install ftp://rpmfind.net/linux/centos/7.3.1611/os/x86_64/Packages/lapack-devel-3.4.2-5.el7.x86_64.rpm

yum install uwsgi uwsgi-plugin-python

##

cd ~
git clone git@github.com:ricleal/sns-reduction.git

##
cd /home/vagrant/sns-reduction
virtualenv-3.5 venv -p /opt/rh/rh-python35/root/usr/bin/python3.5
source venv/bin/activate
pip install -r config/requirements/production.txt 

## Database ini

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

## NGINX

certificates:
/etc/pki/tls/private/wildcard.sns.gov.key
/etc/pki/tls/private/wildcard.sns.gov.key
