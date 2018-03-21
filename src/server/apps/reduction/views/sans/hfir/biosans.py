import logging
import os


from django.contrib import messages
from django.http import Http404
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.shortcuts import get_object_or_404
from django.views.generic import (
    CreateView, DeleteView, DetailView, ListView, TemplateView, UpdateView)
from server.apps.catalog.models import Instrument
from server.apps.users.ldap_util import LdapSns
from server.apps.catalog.oncat.facade import Catalog
from server.util.path import import_class_from_module

logger = logging.getLogger(__name__)  # pylint: disable=C0103


class ConfigurationList(LoginRequiredMixin, ListView):
    model = None