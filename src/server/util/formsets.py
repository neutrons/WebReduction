import logging
from pprint import pformat

from django.http import HttpResponseRedirect

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

logger = logging.getLogger(__name__)  # pylint: disable=C0103


class FormsetMixin(object):
    '''
    This basically overrides the methods get and post in the BaseFormView
    The BaseFormView is ancestor of any FormView (E.g. Create and update)
    '''
    object = None

    def get(self, request, *args, **kwargs):
        # pylint: disable=unused-argument
        logger.debug("FormsetMixin: Get")
        if 'pk' in kwargs:
            # For the UpdateView
            self.object = self.get_object()
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        formset_class = self.get_formset_class()
        formset = self.get_formset(formset_class)
        return self.render_to_response(
            self.get_context_data(form=form, formset=formset))

    def post(self, request, *args, **kwargs):
        # pylint: disable=unused-argument
        logger.debug("FormsetMixin: Post")
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
        logger.debug("FormsetMixin: get_formset_class")
        return self.formset_class

    def get_formset(self, formset_class):
        logger.debug("FormsetMixin: get_formset")
        return formset_class(**self.get_formset_kwargs())

    def get_formset_kwargs(self):
        logger.debug("FormsetMixin: get_formset_kwargs")
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
        logger.debug("FormsetMixin: form_valid")
        self.object = form.save()
        formset.instance = self.object
        formset.save()
        # return redirect(self.object.get_absolute_url())
        # Same as in FormMixin (copied from FormMixin)
        return HttpResponseRedirect(self.get_success_url())

    def form_invalid(self, form, formset):
        logger.debug("FormsetMixin: form_invalid!\nForm errors: %s"
                     "\nFormset errors: %s", form.errors, formset.errors)
        return self.render_to_response(
            self.get_context_data(form=form, formset=formset))
