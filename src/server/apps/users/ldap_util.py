#!/usr/bin/env python3

import logging

from django.conf import settings
import ldap


logger = logging.getLogger(__name__)

'''

from django_auth_ldap.backend import LDAPSearch, LDAPBackend

uids = get_all_users_uid(l)

ldapobj = LDAPBackend()
for uid in uids:
    ldapobj.populate_user(uid)


'''


class LdapSns(object):
    '''

    UID is the URCAMS 3 digit!

    It uses the Django ldap server settings

    '''

    def __init__(self):
        ldap.set_option(ldap.OPT_X_TLS_REQUIRE_CERT, ldap.OPT_X_TLS_NEVER)
        self.server = ldap.initialize(settings.AUTH_LDAP_SERVER_URI)

    def __del__(self):
        self.server.unbind()

    def get_all_ipts(self):
        '''
        @return list of IPTSs: ['IPTS-18360', 'IPTS-18361', 'IPTS-17692']

        >>> all_ipts[-1]
        ('cn=IPTS-17757,ou=Groups,dc=sns,dc=ornl,dc=gov', {'cn': [b'IPTS-17757']})
        '''
        results = self.server.search_s(
            "ou=Groups,dc=sns,dc=ornl,dc=gov",
            ldap.SCOPE_SUBTREE,
            "(cn=IPTS*)",
            ["cn", ]
        )
        return [result[1]['cn'][0].decode('UTF-8') for result in results]

    def get_all_uids_for_an_ipts(self, ipts):
        '''
        @return list of uids: ['djk', 'jameshutchison', 'sandercr', 'hbd', 'q3n']
        '''
        results = self.server.search_s(
            "ou=Groups,dc=sns,dc=ornl,dc=gov",
            ldap.SCOPE_SUBTREE,
            "(&(cn=%s)(memberUid=*))" % ipts,
            ["memberUid"]
        )
        uids = []
        for result in results:
            for uid in result[1]['memberUid']:
                uids.append(uid.decode('UTF-8'))
        return uids

    def get_all_users_and_ipts(self):
        '''
        @return: lists of:   {'cn': [b'IPTS-17329'],
                               'memberUid': [b'ckt',
                                             b'boehler',
                                             b'biancahaberl',
                                             b'l8d',
                                             b'yyc',
                                             b'ri2',
                                             b'j7t']})
        Not used!!

        >>> all_users_and_ipts[-1]
        ('cn=IPTS-17329,ou=Groups,dc=sns,dc=ornl,dc=gov', {'cn': [b'IPTS-17329'], 'memberUid': [b'ckt', b'boehler', b'biancahaberl', b'l8d', b'yyc', b'ri2', b'j7t']})
        >>> all_users_and_ipts[-1][1]
        {'cn': [b'IPTS-17329'], 'memberUid': [b'ckt', b'boehler', b'biancahaberl', b'l8d', b'yyc', b'ri2', b'j7t']}

        '''
        results = self.server.search_s(
            "ou=Groups,dc=sns,dc=ornl,dc=gov",
            ldap.SCOPE_SUBTREE,
            "(&(cn=IPTS*)(description=proposal)(memberUid=*))",
            ["cn", "memberUid"]
        )
        return results

    def get_all_users_name_and_uid(self):
        '''
        @return: list of {'name': 'Whitaker, Tracy H', 'uid': 'twq'},
                            {'name': 'Williamson, Richard L', 'uid': 'wrt'}]
        '''
        results = self.server.search_s(
            "ou=Users,dc=sns,dc=ornl,dc=gov",
            ldap.SCOPE_SUBTREE,
            "(objectClass=posixAccount)",
            ["cn", "uid"]
        )
        return [{'uid': result[1]['uid'][0].decode('UTF-8'), 'name': result[1]['cn'][0].decode('UTF-8')} for result in results]

    def get_all_ipts_for_an_uid(self, uid):
        '''
        return a list of IPTSs: [ 'IPTS-7007', 'IPTS-6292']
        '''
        results = self.server.search_s(
            "ou=Groups,dc=sns,dc=ornl,dc=gov",
            ldap.SCOPE_SUBTREE,
            "(&(cn=IPTS*)(description=proposal)(memberUid=%s))" % uid,
            ["cn"]
        )
        return [result[1]['cn'][0].decode('UTF-8') for result in results]

# Test
if __name__ == '__main__':
    from pprint import pprint
    l = LdapSns()

    #all_ipts = l.get_all_ipts()
    # pprint(all_ipts)

    #all_uids_for_an_ipts = l.get_all_uids_for_an_ipts(all_ipts[-1])
    # pprint(all_uids_for_an_ipts)

    #all_users_and_ipts = l.get_all_users_and_ipts()
    # pprint(all_users_and_ipts)

    #all_users_name_and_uid = l.get_all_users_name_and_uid()
    # pprint(all_users_name_and_uid)

    #all_ipts_for_an_uid = l.get_all_ipts_for_an_uid("19g")
    # pprint(all_ipts_for_an_uid)
