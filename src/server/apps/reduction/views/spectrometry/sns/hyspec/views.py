from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.views.generic import (
    CreateView, DeleteView, DetailView, ListView, UpdateView,
)

from server.apps.configuration.models.spectrometry.sns.hyspec import Configuration
from server.apps.reduction.forms.spectrometry.sns.hyspec import (
    ReductionForm,
    ReductionScriptForm,
    RegionInlineFormSetCreate,
    RegionInlineFormSetUpdate,
)
from server.apps.reduction.models.spectrometry.sns.hyspec import Reduction
from server.apps.reduction.views.mixins import (
    ReductionCreateMixin,
    ReductionDeleteMixin,
    ReductionMixin,
    ReductionCloneMixin,
    ReductionUpdateMixin,
    ReductionScriptUpdateMixin,
)

from datetime import datetime


class ReductionList(LoginRequiredMixin, ReductionMixin, ListView):
    '''
    List all Reduction.
    '''
    template_name = 'reduction/list.html'
    model = Reduction


class ReductionDetail(LoginRequiredMixin, ReductionMixin, DetailView):
    '''
    '''
    template_name = 'reduction/detail.html'
    model = Reduction


class ReductionCreate(LoginRequiredMixin, ReductionCreateMixin, CreateView):
    '''
    Create a new entry!
    '''
    template_name = 'reduction/form.html'
    model = Reduction
    model_configuration = Configuration
    form_class = ReductionForm
    formset_class = RegionInlineFormSetCreate
    success_url = reverse_lazy('reduction:list')


class ReductionDelete(LoginRequiredMixin, ReductionDeleteMixin, DeleteView):

    template_name = 'reduction/confirm_delete.html'
    model = Reduction
    success_url = reverse_lazy('reduction:list')

class ReductionClone(LoginRequiredMixin, ReductionCloneMixin, UpdateView):

    template_name = 'reduction/detail.html'
    model = Reduction
    model_configuration = Configuration
    form_class = ReductionForm
    formset_class = RegionInlineFormSetCreate


class ReductionUpdate(LoginRequiredMixin, ReductionUpdateMixin, UpdateView):
    '''
    Edit a Reduction (The spreadsheet)
    '''
    template_name = 'reduction/form.html'
    model = Reduction
    model_configuration = Configuration
    form_class = ReductionForm
    formset_class = RegionInlineFormSetUpdate
    success_url = reverse_lazy('reduction:list')


class ReductionScriptUpdate(LoginRequiredMixin, ReductionScriptUpdateMixin, UpdateView):

    template_name = 'reduction/script_form.html'
    model = Reduction
    model_configuration = Configuration
    form_class = ReductionScriptForm
    formset_class = RegionInlineFormSetUpdate
    success_url = reverse_lazy('reduction:list')

    # Variables for jobsubmission
    remote_filename="reduce_HYS_{}.py".format(
        datetime.now().strftime(r"%Y%m%d-%H%M%S")
    )

