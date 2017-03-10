from django.shortcuts import render
from django.shortcuts import redirect
from pprint import pformat
import logging

'''
Formset helper for Create and Update View

Usage Example:

class AlbumCreate(FormsetMixin,CreateView):
    template_name = 'app1/album_form.html'
    model = models.Musician
    form_class = forms.MusicianForm
    formset_class = forms.AlbumFormSetCreate

class AlbumEdit(FormsetMixin,UpdateView):
    template_name = 'app1/album_form.html'
    model = models.Musician
    form_class = forms.MusicianForm
    formset_class = forms.AlbumFormSetUpdate

    
'''

logger = logging.getLogger(__name__)


class FormsetMixin(object):
    object = None

    def get(self, request, *args, **kwargs):
        logger.debug("get")
        if 'pk' in kwargs:
            # For the UpdateView
            self.object = self.get_object()
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        formset_class = self.get_formset_class()
        formset = self.get_formset(formset_class)
        return self.render_to_response(self.get_context_data(form=form, formset=formset))

    def post(self, request, *args, **kwargs):
        logger.debug("post")
        if 'pk' in kwargs:
            # For the UpdateView
            self.object = self.get_object()
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        formset_class = self.get_formset_class()
        formset = self.get_formset(formset_class)
        logger.debug(pformat(locals()))
        if form.is_valid() and formset.is_valid():
            return self.form_valid(form, formset)
        else:
            return self.form_invalid(form, formset)

    def get_formset_class(self):
        logger.debug("get_formset_class")
        return self.formset_class

    def get_formset(self, formset_class):
        logger.debug("get_formset")
        return formset_class(**self.get_formset_kwargs())

    def get_formset_kwargs(self):
        logger.debug("get_formset_kwargs")
        kwargs = {
            'instance': self.object
        }
        if self.request.method in ('POST', 'PUT'):
            kwargs.update({
                'data': self.request.POST,
                'files': self.request.FILES,
            })
        logger.debug("kwargs: %s", pformat(kwargs))
        return kwargs

    def form_valid(self, form, formset):
        logger.debug("form_valid")
        self.object = form.save()
        formset.instance = self.object
        formset.save()
        return redirect(self.object.get_absolute_url())

    def form_invalid(self, form, formset):
        logger.debug("form_invalid")
        return self.render_to_response(self.get_context_data(form=form, formset=formset))



