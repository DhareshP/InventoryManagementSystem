from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import F
from .models import Product, Supplier, SaleOrder, StockMovement
from .serializers import (ProductSerializer, SupplierSerializer, 
                        SaleOrderSerializer, StockMovementSerializer)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(detail=True, methods=['post'])
    def update_stock(self, request, pk=None):
        product = self.get_object()
        quantity = int(request.data.get('quantity', 0))
        
        if quantity + product.stock_quantity < 0:
            return Response({'error': 'Insufficient stock'}, status=400)
            
        product.stock_quantity = F('stock_quantity') + quantity
        product.save()
        
        StockMovement.objects.create(
            product=product,
            quantity=abs(quantity),
            movement_type='In' if quantity > 0 else 'Out',
            notes=request.data.get('notes', '')
        )
        
        return Response(ProductSerializer(product).data)

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

class SaleOrderViewSet(viewsets.ModelViewSet):
    queryset = SaleOrder.objects.all()
    serializer_class = SaleOrderSerializer

    def create(self, request, *args, **kwargs):
        product_id = request.data.get('product')
        quantity = int(request.data.get('quantity', 0))
        
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=404)
            
        if product.stock_quantity < quantity:
            return Response({'error': 'Insufficient stock'}, status=400)
            
        total_price = product.price * quantity
        
        sale_order = SaleOrder.objects.create(
            product=product,
            quantity=quantity,
            total_price=total_price,
            status='Pending'
        )
        
        return Response(SaleOrderSerializer(sale_order).data)

    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        sale_order = self.get_object()
        new_status = request.data.get('status')
        
        if new_status not in ['Completed', 'Cancelled']:
            return Response({'error': 'Invalid status'}, status=400)
            
        if sale_order.status != 'Pending':
            return Response({'error': 'Can only update pending orders'}, status=400)
            
        if new_status == 'Completed':
            product = sale_order.product
            if product.stock_quantity < sale_order.quantity:
                return Response({'error': 'Insufficient stock'}, status=400)
                
            product.stock_quantity = F('stock_quantity') - sale_order.quantity
            product.save()
            
            StockMovement.objects.create(
                product=product,
                quantity=sale_order.quantity,
                movement_type='Out',
                notes=f'Sale order #{sale_order.id}'
            )
        
        sale_order.status = new_status
        sale_order.save()
        
        return Response(SaleOrderSerializer(sale_order).data)

class StockMovementViewSet(viewsets.ModelViewSet):
    queryset = StockMovement.objects.all()
    serializer_class = StockMovementSerializer