
import Link from 'next/link';
import { Briefcase, Menu } from 'lucide-react'; // Example icon, replace if needed
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '../ui/button';
import { Separator } from '../ui/separator'; // Added Separator import

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-primary">
          <Briefcase className="h-6 w-6" />
          <span>Freelaunch</span> {/* Changed name */}
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/projects" className="text-foreground/60 hover:text-foreground transition-colors">
            Projects
          </Link>
          <Link href="/messages" className="text-foreground/60 hover:text-foreground transition-colors">
            Messages
          </Link>
           <Link href="/profile/billing" className="text-foreground/60 hover:text-foreground transition-colors">
            Billing
          </Link>
          <Link href="/profile" className="text-foreground/60 hover:text-foreground transition-colors">
            Profile
          </Link>
        </nav>
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                 <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold text-primary"
                  >
                  <Briefcase className="h-6 w-6" />
                  <span>Freelaunch</span> {/* Changed name */}
                </Link>
                <Separator />
                <Link
                  href="/projects"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  Projects
                </Link>
                <Link
                  href="/messages"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  Messages
                </Link>
                 <Link
                  href="/profile/billing"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  Billing
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  Profile
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
