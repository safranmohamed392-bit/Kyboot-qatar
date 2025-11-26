import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useCartStore, ShopifyProduct } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  const { isAuthenticated } = useAuthStore();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please sign in', {
        description: 'You need to sign in to add items to cart.',
        action: {
          label: 'Sign In',
          onClick: () => navigate('/auth')
        }
      });
      return;
    }
    
    const defaultVariant = product.node.variants.edges[0]?.node;
    if (!defaultVariant) return;
    
    const cartItem = {
      product,
      variantId: defaultVariant.id,
      variantTitle: defaultVariant.title,
      price: defaultVariant.price,
      quantity: 1,
      selectedOptions: defaultVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success('Added to cart', {
      description: `${product.node.title} has been added to your cart.`
    });
  };

  const imageUrl = product.node.images.edges[0]?.node.url;
  const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
  const currencyCode = product.node.priceRange.minVariantPrice.currencyCode;

  return (
    <Link to={`/product/${product.node.handle}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden bg-muted">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.node.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground">No image</span>
              </div>
            )}
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
              {product.node.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {product.node.description}
            </p>
            <p className="text-xl font-bold">
              {currencyCode} {price.toFixed(2)}
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            onClick={handleAddToCart}
            className="w-full"
            size="lg"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
