# Django Imports
from django.shortcuts import redirect
from django.urls import reverse
from django.conf import settings
from django.db.utils import OperationalError, ProgrammingError

# Local Imports
from cms.models import Page


def index(request):
    try:
        page = Page.objects.filter(title=settings.HOME_PAGE_TITLE)
        if page.exists():
            redirect_url = reverse("cms:home", args=[page.first().permalink])
        else:
            redirect_url = reverse("workshop_app:index")
    except (OperationalError, ProgrammingError):
        # Fresh local setups may not have CMS tables yet.
        redirect_url = reverse("workshop_app:index")
    return redirect(redirect_url)
