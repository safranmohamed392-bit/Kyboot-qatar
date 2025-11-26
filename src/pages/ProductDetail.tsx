import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useCartStore, ShopifyProduct } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import { storefrontApiRequest, PRODUCT_QUERY } from "@/lib/shopify";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ShopifyProduct['node']['variants']['edges'][0]['node'] | null>(null);
  const addItem = useCartStore(state => state.addItem);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return;
      
      try {
        const data = await storefrontApiRequest(PRODUCT_QUERY, { handle });
        const productData = data.data.productByHandle;
        
        if (productData) {
          const wrappedProduct = { node: productData };
          setProduct(wrappedProduct);
          setSelectedVariant(productData.variants.edges[0]?.node);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  const handleAddToCart = () => {
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
    
    if (!product || !selectedVariant) return;
    
    const cartItem = {
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success('Added to cart', {
      description: `${product.node.title} has been added to your cart.`
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product not found</h2>
            <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const imageUrl = product.node.images.edges[0]?.node.url;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.node.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground">No image</span>
              </div>
            )}
          </div>
          
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.node.title}</h1>
            <p className="text-3xl font-bold text-primary mb-6">
              {product.node.priceRange.minVariantPrice.currencyCode} {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
            </p>
            
            <div className="prose max-w-none mb-8">
              <p className="text-muted-foreground">{product.node.description}</p>
            </div>

            {product.node.options.length > 0 && (
              <div className="mb-8">
                {product.node.options.map((option) => (
                  <div key={option.name} className="mb-4">
                    <label className="block text-sm font-medium mb-2">{option.name}</label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value: string) => {
                        const variant = product.node.variants.edges.find((v) =>
                          v.node.selectedOptions.some((o) => o.value === value)
                        )?.node;
                        
                        return (
                          <Button
                            key={value}
                            variant={selectedVariant?.id === variant?.id ? "default" : "outline"}
                            onClick={() => setSelectedVariant(variant || null)}
                            disabled={!variant?.availableForSale}
                          >
                            {value}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button 
              onClick={handleAddToCart}
              size="lg"
              className="w-full md:w-auto"
              disabled={!selectedVariant?.availableForSale}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
