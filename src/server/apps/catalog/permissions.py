from django.contrib.auth.models import Group

import logging

'''
My groups: rhf

adara
fermi-users
hfiradmin
hfir_cg1a_team
hfir_cg1b_team
hfir_cg1dimaging_team
hfir_cg1d_team
hfir_cg2_team
hfir_cg3_team
hfir_cg4c_team
hfir_cg4d_team
hfir_cg4_team
hfir_hb1a_team
hfir_hb1_team
hfir_hb2a_team
hfir_hb2b_team
hfir_hb2c_team
hfir_hb2ds_team
hfir_hb2d_team
hfir_hb3a_team
hfir_hb3_team
hfir_sans1_team
hfir_sans2_team
mantidwheel
sns_aclr_team
sns_arcs_team
sns_bss_team
sns_builds_admins
sns_builds_users
sns_cncs_team
sns-corelli
sns_corelli_team
sns-dev
sns_eqsans_team
sns_fd1_team
sns-heater
sns_hys_team
sns_mandi_team
SNS_Neutron
SNS_Neutron_dev
sns_nom_team
sns_pg3_team
sns_ref_l_team
sns_ref_m_team
sns_seq_team
sns_snap_team
sns-spare
sns-subversion
sns-topaz
sns_topaz_team
sns_usans_team
sns_venus_team
sns_vis_team
sns_vulcan_team
snswheel
ucams

'''

logger = logging.getLogger(__name__)


def user_has_permission_to_see_this_ipts(user, instrument, ipts):
    """
    @param user: user object
    @param instrument : string
    @param ipts : string

    User must belong to:
    - SNS_Neutron_dev (NDAV!)
    - Scientist from the instrument: sns_<instrument>_team
    - Or be in this IPTS group!

    """
    
    logger.debug("Checking if user %s has permissions to access %s",
                 user, ipts)

    if user.groups.filter(name='SNS_Neutron_dev'):
        return True
    elif user.groups.filter(name='hfir_%s_team' %
                            instrument.ldap_group_name.lower()):
        return True
    elif user.groups.filter(name='sns_%s_team' %
                            instrument.ldap_group_name.lower()):
        return True
    elif user.groups.filter(name=ipts.upper()):
        return True
    else:
        return False

def filter_user_permission(user, instrument, ipts_list):
    '''
    Iterates the ipts_list and returns a new ipts_list width
    ipts whose user is allowed to see
    '''
    return [ipts for ipts in ipts_list
            if user_has_permission_to_see_this_ipts(user, instrument, ipts)]
