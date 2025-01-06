from rest_framework import serializers
from .models import Product, Supplier, SaleOrder, StockMovement

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    supplier_name = serializers.CharField(source='supplier.name', read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'category', 'price', 
                 'stock_quantity', 'supplier', 'supplier_name']

class SaleOrderSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    
    class Meta:
        model = SaleOrder
        fields = ['id', 'product', 'product_name', 'quantity', 
                 'total_price', 'sale_date', 'status']

class StockMovementSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    
    class Meta:
        model = StockMovement
        fields = ['id', 'product', 'product_name', 'quantity', 
                 'movement_type', 'movement_date', 'notes']