import Link from 'next/link';
import { Briefcase } from 'lucide-react'; // Example icon, replace if needed

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <Briefcase className="h-6 w-6" />
          <span>BidCraft</span>
        </Link>
        <nav className="hidden md:flex gap-4">
          <Link href="/projects" className="text-sm font-medium hover:underline underline-offset-4">
            Projects
          </Link>
          <Link href="/messages" className="text-sm font-medium hover:underline underline-offset-4">
            Messages
          </Link>
          <Link href="/profile" className="text-sm font-medium hover:underline underline-offset-4">
            Profile
          </Link>
        </nav>
        {/* Add mobile menu trigger here if needed */}
      </div>
    </header>
  );
}
