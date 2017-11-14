from .env import * #@UnusedWildImport
from django_auth_ldap.config import LDAPSearch, PosixGroupType
import ldap

# Server to search on
AUTH_LDAP_SERVER_URI = 'ldaps://ldap-vip.sns.gov'

# Anonymous login
AUTH_LDAP_BIND_DN = ''
AUTH_LDAP_BIND_PASSWORD = ''

#
AUTH_LDAP_GLOBAL_OPTIONS = {
    ldap.OPT_X_TLS_REQUIRE_CERT : ldap.OPT_X_TLS_NEVER,
    # Giving the certificate path, does not work on OSx
    # ldap.OPT_X_TLS_CACERTFILE : ROOT_DIR("../config/certificates/ldap.crt"),
}

# Direct bind to user's username
AUTH_LDAP_USER_DN_TEMPLATE = 'uid=%(user)s,ou=Users,dc=sns,dc=ornl,dc=gov'

# Always update the user's fields into the database
AUTH_LDAP_ALWAYS_UPDATE_USER = True

# Search to find the user's groups
AUTH_LDAP_GROUP_SEARCH = LDAPSearch('ou=Groups,dc=sns,dc=ornl,dc=gov',
                                    ldap.SCOPE_SUBTREE,
                                    '(objectClass=posixGroup)')
AUTH_LDAP_GROUP_TYPE = PosixGroupType(name_attr='cn')

# Mirror the LDAP groups to Django's groups
AUTH_LDAP_MIRROR_GROUPS = True

# Determine Django group permissions from LDAP groups
AUTH_LDAP_FIND_GROUP_PERMS = True

# User flag groups from ldap
AUTH_LDAP_USER_FLAGS_BY_GROUP = {
    'is_active': 'cn=SNS_Neutron,ou=Groups,dc=sns,dc=ornl,dc=gov',
    'is_staff': 'cn=SNS_Neutron_dev,ou=Groups,dc=sns,dc=ornl,dc=gov',
    'is_superuser': 'cn=SNS_Neutron_dev,ou=Groups,dc=sns,dc=ornl,dc=gov',
}

# User attributes from ldap
AUTH_LDAP_USER_ATTR_MAP = {
    'email': 'description',
    'address': 'gecos',
    'fullname': 'cn',
}

# Add to authentication backend
AUTHENTICATION_BACKENDS = (
    'django_auth_ldap.backend.LDAPBackend',
    'django.contrib.auth.backends.ModelBackend',
)
