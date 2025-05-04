
'use client';

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, History } from "lucide-react"; // Icons

export default function BillingPage() {
  // TODO: Fetch actual billing data (payment methods, transaction history)

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8 flex justify-center items-start">
        <Card className="w-full max-w-2xl mt-10 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Billing & Payments</CardTitle>
            <CardDescription>Manage your payment methods and view transaction history.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Payment Methods Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <CreditCard className="h-6 w-6 text-primary" />
                 <h3 className="text-lg font-semibold">Payment Methods</h3>
              </div>
              {/* Placeholder for listing payment methods */}
              <div className="p-4 border rounded-md bg-muted/50 text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  You currently have no saved payment methods.
                </p>
                {/*
                  TODO: Implement actual payment method integration (e.g., Stripe Elements).
                  This button is a placeholder.
                */}
                <Button variant="outline" disabled>
                   Add Payment Method (Coming Soon)
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Integration with a secure payment provider (like Stripe) is required.
                </p>
              </div>
            </div>

            <Separator />

            {/* Transaction History Section */}
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                 <History className="h-6 w-6 text-primary" />
                 <h3 className="text-lg font-semibold">Transaction History</h3>
              </div>
              {/* Placeholder for transaction history */}
              <div className="p-4 border rounded-md bg-muted/50 text-center">
                <p className="text-sm text-muted-foreground">
                  Your transaction history will appear here once payments are processed.
                </p>
                 <p className="text-xs text-muted-foreground mt-2">
                  Requires backend implementation for tracking payments.
                </p>
                {/* TODO: Fetch and display actual transactions in a table or list */}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
