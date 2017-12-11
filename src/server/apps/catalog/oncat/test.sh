
source ../../../../.env

# grant_type=password
# grant_type=client_credentials
POST_DATA="\
client_id=${ONCAT_CLIENT_ID}&\
client_secret=${ONCAT_CLIENT_SECRET}&\
username=${TEST_USERNAME}&\
password=${TEST_PASSWORD}&\
grant_type=password\
"

curl -v -X POST -o token.txt -d ${POST_DATA} https://oncat.ornl.gov/oauth/token


curl -X POST -d @token.txt -H "Content-Type: application/json" \
https://oncat.ornl.gov/api



#

curl -v -c cookie.txt -X GET \
        https://oncat.ornl.gov/oauth/token \
       -u "$ONCAT_CLIENT_ID:$ONCAT_CLIENT_SECRET" \
       -d "grant_type=password" \
       -d "username=$TEST_USERNAME" \
       -d "password=$TEST_PASSWORD" \
       redirect_uri=http://localhost/etc&\