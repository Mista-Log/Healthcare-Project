
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.serializers import ModelSerializer

from .models import Payment


class PaymentSerializer(ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            "id",
            "bill_reference",
            "amount",
            "currency",
            "provider",
            "provider_reference",
            "status",
            "created_at",
        ]
        read_only_fields = fields


class PaymentListView(generics.ListAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(
            patient=self.request.user
        ).order_by("-created_at")
