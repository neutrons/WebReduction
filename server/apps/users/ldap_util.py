#!/usr/bin/env python3

from django.conf import settings
import ldap

import logging
logger = logging.getLogger('users.util')

'''

from django_auth_ldap.backend import LDAPSearch, LDAPBackend

uids = get_all_users_uid(l)

ldapobj = LDAPBackend()
for uid in uids:
    ldapobj.populate_user(uid)


'''

class LdapSns(object):
    def __init__(self):
        ldap.set_option(ldap.OPT_X_TLS_REQUIRE_CERT, ldap.OPT_X_TLS_NEVER)
        self.server = ldap.initialize(settings.AUTH_LDAP_SERVER_URI)

    def __del__(self):
        self.server.unbind()

    def get_all_ipts(self):
        '''
        >>> all_ipts[-1]
        ('cn=IPTS-17757,ou=Groups,dc=sns,dc=ornl,dc=gov', {'cn': [b'IPTS-17757']})
        '''
        results = self.server.search_s(
            "ou=Groups,dc=sns,dc=ornl,dc=gov",
            ldap.SCOPE_SUBTREE,
            "(cn=IPTS*)",
            ["cn",]
        )
        return [result[1]['cn'][0].decode('UTF-8') for result in results]


    def get_all_uids_for_an_ipts(self,ipts):
        '''
        '''
        results = self.server.search_s(
            "ou=Groups,dc=sns,dc=ornl,dc=gov",
            ldap.SCOPE_SUBTREE,
            "(&(cn=%s)(memberUid=*))"%ipts,
            ["memberUid"]
        )
        uids = []
        for result in results:
            for uid in result[1]['memberUid']:
                uids.append(uid.decode('UTF-8'))
        return uids

    def get_all_users_and_ipts(self):
        '''
        >>> all_users_and_ipts[-1]
        ('cn=IPTS-17329,ou=Groups,dc=sns,dc=ornl,dc=gov', {'cn': [b'IPTS-17329'], 'memberUid': [b'ckt', b'boehler', b'biancahaberl', b'l8d', b'yyc', b'ri2', b'j7t']})
        >>> all_users_and_ipts[-1][1]
        {'cn': [b'IPTS-17329'], 'memberUid': [b'ckt', b'boehler', b'biancahaberl', b'l8d', b'yyc', b'ri2', b'j7t']}

        '''
        results = self.server.search_s(
            "ou=Groups,dc=sns,dc=ornl,dc=gov",
            ldap.SCOPE_SUBTREE,
            "(&(cn=IPTS*)(description=proposal)(memberUid=*))",
            ["cn","memberUid"]
        )
        return results

    def get_all_users_name_and_uid(self):
        results = self.server.search_s(
            "ou=Users,dc=sns,dc=ornl,dc=gov",
            ldap.SCOPE_SUBTREE,
            "(objectClass=posixAccount)",
            ["cn","uid"]
        )
        return [ { 'uid' : result[1]['uid'][0].decode('UTF-8'), 'name' : result[1]['cn'][0].decode('UTF-8') } for result in results]




# l = setup()
# all_ipts = get_all_ipts(l)
# uids = get_all_uids_for_an_ipts(l,all_ipts[-1])
# users =  get_all_users_name_and_uid(l)
# l.unbind()
