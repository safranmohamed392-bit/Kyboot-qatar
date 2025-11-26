import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore, type Address } from "@/stores/authStore";
import { toast } from "sonner";
import { Loader2, CreditCard, Truck, MapPin, Plus } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const { user, isAuthenticated, addresses, addAddress } = useAuthStore();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const [shippingForm, setShippingForm] = useState({
    fullName: user?.name || '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Qatar',
    phone: '',
  });

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  // Calculate totals
  const subtotal = items.reduce((acc, item) => acc + (parseFloat(item.price.amount) * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 35; // Free shipping over 500 QAR, otherwise 35 QAR
  const tax = 0; // No VAT in Qatar for retail
  const total = subtotal + shipping + tax;

  const handleAddressSave = () => {
    if (!shippingForm.fullName || !shippingForm.addressLine1 || !shippingForm.city || !shippingForm.state || !shippingForm.zipCode || !shippingForm.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    addAddress({
      ...shippingForm,
      isDefault: addresses.length === 0,
    });
    
    toast.success('Address saved successfully');
    setShowAddressForm(false);
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to continue');
      navigate('/auth');
      return;
    }

    if (!selectedAddress && !showAddressForm) {
      toast.error('Please select or add a delivery address');
      return;
    }

    if (showAddressForm) {
      handleAddressSave();
    }

    if (paymentMethod === 'card') {
      if (!paymentForm.cardNumber || !paymentForm.cardName || !paymentForm.expiryDate || !paymentForm.cvv) {
        toast.error('Please fill in all payment details');
        return;
      }
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      toast.success('Order placed successfully!', {
        description: 'Thank you for your purchase. You will receive an email confirmation shortly.',
      });
      navigate('/');
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Add some products to proceed to checkout</p>
          <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {addresses.length > 0 && !showAddressForm && (
                  <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                    {addresses.map((address) => (
                      <div key={address.id} className="flex items-start space-x-3 space-y-0">
                        <RadioGroupItem value={address.id} id={address.id} />
                        <Label htmlFor={address.id} className="flex-1 cursor-pointer">
                          <div className="font-medium">{address.fullName}</div>
                          <div className="text-sm text-muted-foreground">
                            {address.addressLine1}
                            {address.addressLine2 && `, ${address.addressLine2}`}
                            <br />
                            {address.city}, {address.state} {address.zipCode}
                            <br />
                            {address.phone}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {(showAddressForm || addresses.length === 0) && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={shippingForm.fullName}
                          onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={shippingForm.phone}
                          onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                          placeholder="+974 1234 5678"
                        />
                      </div>

                      <div className="col-span-2">
                        <Label htmlFor="addressLine1">Address Line 1 *</Label>
                        <Input
                          id="addressLine1"
                          value={shippingForm.addressLine1}
                          onChange={(e) => setShippingForm({ ...shippingForm, addressLine1: e.target.value })}
                          placeholder="Building 123, Street Name"
                        />
                      </div>

                      <div className="col-span-2">
                        <Label htmlFor="addressLine2">Address Line 2</Label>
                        <Input
                          id="addressLine2"
                          value={shippingForm.addressLine2}
                          onChange={(e) => setShippingForm({ ...shippingForm, addressLine2: e.target.value })}
                          placeholder="Zone/Area"
                        />
                      </div>

                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={shippingForm.city}
                          onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                          placeholder="Doha"
                        />
                      </div>

                      <div>
                        <Label htmlFor="state">Area/Zone *</Label>
                        <Input
                          id="state"
                          value={shippingForm.state}
                          onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                          placeholder="West Bay"
                        />
                      </div>

                      <div>
                        <Label htmlFor="zipCode">P.O. Box</Label>
                        <Input
                          id="zipCode"
                          value={shippingForm.zipCode}
                          onChange={(e) => setShippingForm({ ...shippingForm, zipCode: e.target.value })}
                          placeholder="12345"
                        />
                      </div>

                      <div>
                        <Label htmlFor="country">Country *</Label>
                        <Input
                          id="country"
                          value={shippingForm.country}
                          onChange={(e) => setShippingForm({ ...shippingForm, country: e.target.value })}
                          placeholder="Qatar"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {addresses.length > 0 && !showAddressForm && (
                  <Button
                    variant="outline"
                    onClick={() => setShowAddressForm(true)}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Address
                  </Button>
                )}

                {showAddressForm && addresses.length > 0 && (
                  <Button
                    variant="ghost"
                    onClick={() => setShowAddressForm(false)}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      Credit / Debit Card (Visa, Mastercard)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      Cash on Delivery
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex-1 cursor-pointer">
                      Bank Transfer
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={paymentForm.cardNumber}
                        onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        value={paymentForm.cardName}
                        onChange={(e) => setPaymentForm({ ...paymentForm, cardName: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          value={paymentForm.expiryDate}
                          onChange={(e) => setPaymentForm({ ...paymentForm, expiryDate: e.target.value })}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>

                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="password"
                          value={paymentForm.cvv}
                          onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value })}
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={`${item.variantId}`} className="flex justify-between text-sm">
                      <span className="flex-1">
                        {item.product.node.title}
                        <span className="text-muted-foreground"> x{item.quantity}</span>
                      </span>
                      <span>QAR {(parseFloat(item.price.amount) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>QAR {subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Truck className="h-3 w-3" />
                      Shipping
                    </span>
                    <span>{shipping === 0 ? 'FREE' : `QAR ${shipping.toFixed(2)}`}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>QAR {tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>QAR {total.toFixed(2)}</span>
                </div>

                {subtotal < 500 && (
                  <p className="text-xs text-muted-foreground">
                    Add QAR {(500 - subtotal).toFixed(2)} more for FREE shipping!
                  </p>
                )}

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Place Order - QAR ${total.toFixed(2)}`
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By placing your order, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
