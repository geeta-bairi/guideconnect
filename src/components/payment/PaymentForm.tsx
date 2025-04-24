
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BookingDetails } from "@/types/booking";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { loadStripe } from '@stripe/stripe-js';

// Replace with your own publishable key
const stripePromise = loadStripe('pk_test_your_publishable_key');

interface PaymentFormProps {
  booking: BookingDetails;
  onSuccess?: (paymentId: string) => void;
  onCancel?: () => void;
}

export function PaymentForm({ booking, onSuccess, onCancel }: PaymentFormProps) {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  
  // Credit card state
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    } 
    
    return value;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'paypal') {
      toast({
        title: "PayPal Integration",
        description: "PayPal integration is not fully implemented yet.",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // In a real app, you would use Stripe Elements here
      // This is a simplified version
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      // Create a mock payment method ID (in real app, you'd use Stripe Elements)
      const mockPaymentMethodId = 'pm_card_visa';
      
      // Process payment through the edge function
      const { data, error } = await supabase.functions.invoke('process-payment', {
        body: {
          paymentMethodId: mockPaymentMethodId,
          amount: booking.price, 
          guideId: booking.guide_id,
          userId: booking.traveler_id,
          description: `Booking for ${booking.description} at ${booking.location}`,
        },
      });
      
      if (error) {
        throw error;
      }
      
      if (data && data.success) {
        // Update booking with payment information
        const { error: bookingError } = await supabase
          .from('bookings')
          .update({
            payment_id: data.paymentIntentId,
            payment_status: 'paid',
            status: 'confirmed'
          })
          .eq('id', booking.id);
        
        if (bookingError) {
          throw bookingError;
        }
        
        toast({
          title: t('paymentSuccess'),
          description: "Your booking has been confirmed.",
        });
        
        if (onSuccess) {
          onSuccess(data.paymentIntentId);
        }
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: t('paymentError'),
        description: error.message || 'Please try again.',
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">{t('payment')}</h2>
      <div className="mb-4">
        <div className="flex justify-between">
          <span>{t('totalAmount')}</span>
          <span className="font-semibold">${booking.price.toFixed(2)}</span>
        </div>
      </div>
      
      <Tabs defaultValue="card" value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'card' | 'paypal')}>
        <h3 className="text-sm font-medium mb-2">{t('selectPaymentMethod')}</h3>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="card">{t('creditCard')}</TabsTrigger>
          <TabsTrigger value="paypal">{t('paypal')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="card">
          <form onSubmit={handlePayment} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('cardNumber')}</label>
              <input 
                type="text" 
                value={cardNumber} 
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} 
                placeholder="4242 4242 4242 4242" 
                className="w-full p-2 border rounded"
                maxLength={19}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('expiryDate')}</label>
                <input 
                  type="text" 
                  value={expiry} 
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))} 
                  placeholder="MM/YY" 
                  className="w-full p-2 border rounded"
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('cvv')}</label>
                <input 
                  type="text" 
                  value={cvc} 
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))} 
                  placeholder="123" 
                  className="w-full p-2 border rounded"
                  maxLength={3}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('nameOnCard')}</label>
              <input 
                type="text" 
                value={nameOnCard} 
                onChange={(e) => setNameOnCard(e.target.value)} 
                placeholder="John Doe" 
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={onCancel}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-travel-green hover:bg-travel-green/90"
                disabled={isProcessing || !cardNumber || !expiry || !cvc || !nameOnCard}
              >
                {isProcessing ? t('loading') : t('payNow')}
              </Button>
            </div>
          </form>
        </TabsContent>
        
        <TabsContent value="paypal">
          <div className="text-center p-6">
            <p className="mb-4">Click the button below to pay with PayPal</p>
            <Button className="bg-blue-500 hover:bg-blue-600">
              Pay with PayPal
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
