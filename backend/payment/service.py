
import requests

from django.conf import settings


class BmoniAPIError(Exception):
    pass


class BmoniClient:
    def __init__(self):
        self.base_url = settings.BMONI_BASE_URL.rstrip("/")
        self.session = requests.Session()
        self.session.headers.update({
            "x-api-key": settings.BMONI_API_KEY,
            "Content-Type": "application/json",
        })

    def request(self, method, path, **kwargs):
        if not settings.BMONI_API_KEY:
            raise BmoniAPIError("BMONI API key is not configured.")

        try:
            response = self.session.request(
                method=method,
                url=f"{self.base_url}/{path.lstrip('/')}",
                timeout=20,
                **kwargs,
            )
            response.raise_for_status()
            return response.json()

        except requests.RequestException as exc:
            raise BmoniAPIError(
                "Could not complete the BMONI API request."
            ) from exc
