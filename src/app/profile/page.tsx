import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react"; // Example Icon
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  // TODO: Fetch user profile data
  // For now, display a placeholder

  const user = {
    name: "Freelancer Name",
    email: "freelancer@example.com",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    bio: "Experienced web developer specializing in modern frontend frameworks.",
    avatarUrl: "https://picsum.photos/100/100?random=1", // Placeholder
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8 flex justify-center items-start">
        <Card className="w-full max-w-lg mt-10">
          <CardHeader className="items-center text-center">
             <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="professional portrait" />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <CardTitle>{user.name}</CardTitle>
             <p className="text-sm text-muted-foreground">{user.email}</p>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
                <h4 className="font-semibold mb-1">Bio</h4>
                <p className="text-sm text-muted-foreground">{user.bio || "No bio provided."}</p>
             </div>
             <div>
                <h4 className="font-semibold mb-1">Skills</h4>
                 <div className="flex flex-wrap gap-2">
                    {user.skills.length > 0 ? (
                        user.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)
                    ) : (
                        <p className="text-sm text-muted-foreground">No skills listed.</p>
                    )}
                 </div>
             </div>
             <div className="pt-4">
                 <Button className="w-full" variant="outline">Edit Profile (Coming Soon)</Button>
             </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
