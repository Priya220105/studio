import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react"; // Example Icon

export default function MessagesPage() {
  // TODO: Fetch and display message threads or contacts
  // For now, display a placeholder

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8 flex justify-center items-start">
        <Card className="w-full max-w-md mt-10">
          <CardHeader className="items-center">
            <MessageCircle className="h-12 w-12 text-primary mb-4" />
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            <p>Your conversations will appear here.</p>
            <p className="mt-2 text-sm">Direct messaging functionality is coming soon!</p>
            {/* Placeholder for message list or contacts */}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
