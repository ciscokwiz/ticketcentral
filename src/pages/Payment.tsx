import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Payment = () => {
  const handlePayment = () => {
    console.log("Processing payment...");
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-12 lg:pt-32 pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Payment</h1>
          
          <Tabs defaultValue="fiat" className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="fiat">Fiat Currency</TabsTrigger>
              <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
            </TabsList>
            
            <TabsContent value="fiat">
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Payment Method</h3>
                    <RadioGroup defaultValue="full">
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="full" id="full" />
                        <Label htmlFor="full">Full Payment</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="installment" id="installment" />
                        <Label htmlFor="installment">Installment Payment (3 months)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="crypto">
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Select Cryptocurrency</h3>
                    <RadioGroup defaultValue="btc">
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="btc" id="btc" />
                        <Label htmlFor="btc">Bitcoin (BTC)</Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="eth" id="eth" />
                        <Label htmlFor="eth">Ethereum (ETH)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="usdt" id="usdt" />
                        <Label htmlFor="usdt">Tether (USDT)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label>Wallet Address</Label>
                    <p className="text-sm text-neutral-600 mb-2">
                      Send your payment to the following address:
                    </p>
                    <Card className="p-4 bg-neutral-50">
                      <code className="text-sm">
                        bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                      </code>
                    </Card>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Button className="w-full" onClick={handlePayment}>
            Complete Payment
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Payment;