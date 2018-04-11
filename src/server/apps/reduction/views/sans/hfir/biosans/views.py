from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.views.generic import (
    CreateView, DeleteView, DetailView, ListView,
    TemplateView, UpdateView,
)

from server.apps.configuration.models.sans.hfir.biosans import Configuration
from server.apps.reduction.forms.sans.hfir.biosans import (
    ReductionForm,
    RegionInlineFormSetCreate,
    RegionInlineFormSetUpdate,
)
from server.apps.reduction.models.sans.hfir.biosans import Reduction
from server.apps.reduction.views.mixins import (
    ReductionCreateMixin,
    ReductionDeleteMixin,
    ReductionFormMixin,
    ReductionMixin,
    ReductionCloneMixin,
    ReductionUpdateMixin,
)

from ...mixins import SANSMixin


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


class ReductionCreate(LoginRequiredMixin, ReductionCreateMixin, SANSMixin, CreateView):
    '''
    Create a new entry!
    '''
    template_name = 'reduction/sans/form.html'
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
    template_name = 'reduction/sans/form.html'
    model = Reduction
    model_configuration = Configuration
    form_class = ReductionForm
    formset_class = RegionInlineFormSetUpdate
    success_url = reverse_lazy('reduction:list')

