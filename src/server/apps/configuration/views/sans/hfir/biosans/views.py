from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.views.generic import (
    CreateView, DeleteView, DetailView, ListView, TemplateView, UpdateView)

from server.apps.configuration.models.sans.hfir.biosans import Configuration
from server.apps.configuration.forms.sans.hfir.biosans import ConfigurationForm

from server.apps.configuration.views.mixins import (
    ConfigurationMixin,
    ConfigurationCreateMixin,
    ConfigurationDeleteMixin,
    ConfigurationCloneMixin,
    ConfigurationAssignListUidMixin,
    ConfigurationAssignListIptsMixin,
    ConfigurationAssignUidMixin,
    ConfigurationAssignIptsMixin,
)


class ConfigurationList(LoginRequiredMixin, ConfigurationMixin, ListView):
    '''
    '''
    template_name = 'configuration/list.html'
    model = Configuration


class ConfigurationDetail(LoginRequiredMixin, ConfigurationMixin, DetailView):
    '''
    Detail of a configuration
    '''
    template_name = 'configuration/detail.html'
    model = Configuration


class ConfigurationCreate(LoginRequiredMixin, ConfigurationMixin, ConfigurationCreateMixin, CreateView):
    '''
    Detail of a configuration
    '''
    template_name = 'configuration/form.html'
    model = Configuration
    form_class = ConfigurationForm
    success_url = reverse_lazy('configuration:list')


class ConfigurationUpdate(LoginRequiredMixin, ConfigurationMixin, UpdateView):
    '''
    Detail of a configuration
    '''
    template_name = 'configuration/form.html'
    model = Configuration
    form_class = ConfigurationForm
    success_url = reverse_lazy('configuration:list')


class ConfigurationDelete(LoginRequiredMixin, ConfigurationMixin, ConfigurationDeleteMixin, DeleteView):

    template_name = 'configuration/confirm_delete.html'
    model = Configuration
    success_url = reverse_lazy('configuration:list')

class ConfigurationClone(LoginRequiredMixin, ConfigurationMixin, ConfigurationCloneMixin, DetailView):
    '''
    Clones the Object Configuration. Keeps the same user
    '''
    template_name = 'configuration/detail.html'
    model = Configuration


class ConfigurationAssignListUid(LoginRequiredMixin, ConfigurationMixin,
                                 ConfigurationAssignListUidMixin, TemplateView):
    '''
    List all UIDS + names and provides a link to assign a Configuration
    to a user.
    Context has 2 objects: the conf to assign and a list of uids + names
    '''
    template_name = 'configuration/list_uid.html'
    model = Configuration


class ConfigurationAssignListIpts(LoginRequiredMixin, ConfigurationMixin,
                                  ConfigurationAssignListIptsMixin, TemplateView):
    '''
    List all IPTSs and provides a link to assign a Configuration
    to all users to that IPTS.
    Context has 2 objects: the conf to assign and a list of ipts
    '''
    template_name = 'configuration/list_ipts.html'
    model = Configuration

class ConfigurationAssignUid(LoginRequiredMixin, ConfigurationMixin,
    ConfigurationAssignUidMixin, DetailView):
    '''
    This gets a configuration pk and uid from url, clones the Configuration
    and assigns it to the user
    It will display the original Configuration
    '''
    template_name = 'configuration/detail.html'
    model = Configuration


class ConfigurationAssignIpts(LoginRequiredMixin, ConfigurationMixin,
                              ConfigurationAssignIptsMixin, DetailView):
    '''

    '''
    template_name = 'configuration/detail.html'
    model = Configuration
