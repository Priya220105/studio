
import type { Project } from "@/types/project";
import type { Profile } from "@/types/profile";
import type { Feedback, RatingStats } from "@/types/feedback";


// ==================================
// Mock Project Data
// ==================================

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Build a Responsive E-commerce Website",
    description: "Need a modern e-commerce site with payment gateway integration (Stripe/PayPal). Must be mobile-friendly. Key requirements: Shopify integration or custom build, secure checkout, product filtering, user accounts.",
    budget: 5000,
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    categoryIcon: "ShoppingCart",
    clientId: "client-abc",
    clientName: "Global Mart Inc.",
    clientAvatarUrl: `https://picsum.photos/40/40?random=clientA`
  },
  {
    id: "2",
    title: "Develop a Mobile App for Task Management",
    description: "Create a cross-platform mobile app (iOS & Android) using React Native for managing daily tasks. Requirements: User authentication (Firebase Auth), task creation/editing/deletion, push notifications (Firebase Cloud Messaging), offline storage.",
    budget: 8000,
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
    categoryIcon: "Smartphone",
     clientId: "client-def",
     clientName: "Productivity Co.",
     clientAvatarUrl: `https://picsum.photos/40/40?random=clientB`
  },
  {
    id: "3",
    title: "Design a Logo and Brand Identity",
    description: "Looking for a creative designer to craft a unique logo and comprehensive branding guidelines for a new tech startup. Deliverables: Logo files (vector SVG, PNG), color palette, typography guidelines, brand style guide document.",
    budget: 1500,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    categoryIcon: "Palette",
     clientId: "client-ghi",
     clientName: "Innovate Solutions",
     clientAvatarUrl: `https://picsum.photos/40/40?random=clientC`
  },
   {
    id: "4",
    title: "Write Blog Content for Tech Startup",
    description: "Need engaging, high-quality blog posts about AI, machine learning, and data science trends. 4 posts per month, approx. 1000-1500 words each. Requirements: SEO optimized (keywords provided), original content, target audience: tech professionals.",
    budget: 1000, // Per month retainer might be better, but using fixed for example
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now (for first batch)
    categoryIcon: "PenTool",
    clientId: "client-jkl",
    clientName: "Future Tech Blog",
    clientAvatarUrl: `https://picsum.photos/40/40?random=clientD`
  },
  {
    id: "5",
    title: "Data Analysis for Marketing Campaign",
    description: "Analyze marketing campaign data (Google Analytics, social media insights) to provide actionable insights on performance and ROI. Requires experience with SQL, Python (Pandas), and data visualization tools (Tableau/PowerBI). Deliverable: Detailed report with findings and recommendations.",
    budget: 3000,
    deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
    categoryIcon: "BarChart",
    clientId: "client-mno",
    clientName: "Ad Insights Ltd.",
    clientAvatarUrl: `https://picsum.photos/40/40?random=clientE`
  },
   {
    id: "6",
    title: "Setup CI/CD Pipeline for NodeJS App",
    description: "Configure a continuous integration and deployment (CI/CD) pipeline using GitHub Actions and AWS (Elastic Beanstalk/ECR). App is a standard NodeJS/Express application. Requires experience with Docker, GitHub Actions YAML, and basic AWS services.",
    budget: 2000,
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    categoryIcon: "Cog",
    clientId: "client-pqr",
    clientName: "DevOps Experts",
    clientAvatarUrl: `https://picsum.photos/40/40?random=clientF`
  },
];

// ==================================
// Mock Profile Data
// ==================================

export const mockProfiles: { [key: string]: Profile } = {
    'mock-user-id': {
        id: "mock-user-id",
        name: "Alice Developer",
        email: "alice.dev@example.com",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Firebase"],
        bio: "Experienced full-stack web developer specializing in modern frontend frameworks (React/Next.js) and Node.js backends. Passionate about creating intuitive, performant, and accessible user interfaces. Familiar with cloud platforms like Firebase and Vercel.",
        avatarUrl: `https://picsum.photos/100/100?random=alice`,
    },
    'freelancer1': {
        id: "freelancer1",
        name: "Bob Designer",
        email: "bob.design@example.com",
        skills: ["UI/UX Design", "Figma", "Adobe XD", "Brand Identity", "Logo Design", "Graphic Design"],
        bio: "Creative UI/UX designer with a strong focus on user-centered design principles. Proficient in Figma and Adobe Creative Suite. Experience in creating branding guidelines and visually appealing interfaces.",
        avatarUrl: `https://picsum.photos/100/100?random=bob`,
    },
    'freelancerA': { id: 'freelancerA', name: 'Charlie Coder', email: 'charlie@example.com', skills: ['Python', 'Data Analysis', 'SQL'], bio: 'Data analyst.'},
    'freelancerB': { id: 'freelancerB', name: 'Diana DevOps', email: 'diana@example.com', skills: ['AWS', 'Docker', 'CI/CD', 'GitHub Actions'], bio: 'DevOps Engineer.'},
    'freelancerC': { id: 'freelancerC', name: 'Ethan Writer', email: 'ethan@example.com', skills: ['Content Writing', 'SEO', 'Blog Writing'], bio: 'Content writer.'},
     // Add clients as profiles too if needed for feedback etc.
     'client-abc': { id: 'client-abc', name: 'Global Mart Inc.', email: 'contact@globalmart.com', skills: [], bio: 'Retail company.'},
     'client-def': { id: 'client-def', name: 'Productivity Co.', email: 'hello@prodco.com', skills: [], bio: 'Software company.'},
     'client-ghi': { id: 'client-ghi', name: 'Innovate Solutions', email: 'info@innovate.com', skills: [], bio: 'Tech startup consulting.'},
     'client-jkl': { id: 'client-jkl', name: 'Future Tech Blog', email: 'editor@futuretech.com', skills: [], bio: 'Technology publication.'},
     'client-mno': { id: 'client-mno', name: 'Ad Insights Ltd.', email: 'analyze@adinsights.com', skills: [], bio: 'Marketing analytics firm.'},
     'client-pqr': { id: 'client-pqr', name: 'DevOps Experts', email: 'support@devopsexperts.com', skills: [], bio: 'DevOps consulting agency.'},
     'client1': { id: 'client1', name: 'Client One Inc.', email: 'client1@example.com', skills: [], bio: 'Client company.'},
     'client2': { id: 'client2', name: 'Client Two Co.', email: 'client2@example.com', skills: [], bio: 'Another client company.'},
};


// ==================================
// Mock Feedback Data
// ==================================

export const mockFeedback: Feedback[] = [
    // Feedback FOR 'mock-user-id' (Alice)
    { id: 'fb1', projectId: 'projA', authorId: 'client1', recipientId: 'mock-user-id', rating: 5, comment: 'Excellent work on Project A, Alice delivered ahead of schedule!', submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), authorRole: 'client' },
    { id: 'fb2', projectId: 'projB', authorId: 'client2', recipientId: 'mock-user-id', rating: 4, comment: 'Good communication and quality results on Project B.', submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), authorRole: 'client' },
    // Feedback FROM 'mock-user-id' (Alice) for a client
    { id: 'fb3', projectId: 'projC', authorId: 'mock-user-id', recipientId: 'client1', rating: 5, comment: 'Great client (Client One Inc.), clear requirements and prompt payment for Project C.', submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), authorRole: 'freelancer' },

     // Feedback FOR 'freelancer1' (Bob)
    { id: 'fb4', projectId: 'projD', authorId: 'client-ghi', recipientId: 'freelancer1', rating: 5, comment: 'Bob did an amazing job designing our logo!', submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), authorRole: 'client' },

    // Feedback FOR 'client-abc' (Global Mart)
    { id: 'cfb1', projectId: '1', authorId: 'freelancerA', recipientId: 'client-abc', rating: 5, comment: 'Clear communication, paid promptly. A pleasure to work with Global Mart!', submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), authorRole: 'freelancer' },
    // Feedback FOR 'client-def' (Productivity Co.)
    { id: 'cfb2', projectId: '2', authorId: 'freelancerB', recipientId: 'client-def', rating: 4, comment: 'Project scope was well-defined by Productivity Co. Some minor delays in providing assets.', submittedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), authorRole: 'freelancer' },

];


// ==================================
// Mock API Functions (Simulated)
// ==================================

// --- Projects ---
export async function fetchAllProjects(): Promise<Project[]> {
    console.log("API: Fetching all projects...");
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProjects;
}

export async function fetchProjectDetails(projectId: string): Promise<Project | null> {
    console.log(`API: Fetching project details for ID: ${projectId}`);
    await new Promise(resolve => setTimeout(resolve, 300));
    const project = mockProjects.find(p => p.id === projectId);
    return project || null;
}

// --- Profiles ---
export async function fetchUserProfile(userId: string): Promise<Profile | null> {
    console.log(`API: Fetching user profile for ID: ${userId}...`);
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockProfiles[userId] || null;
}

export async function saveProfile(userId: string, data: Omit<Profile, 'id'>): Promise<Profile> {
  console.log(`API: Saving profile data for user ${userId}:`, data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newProfile = { ...data, id: userId };
  mockProfiles[userId] = newProfile; // Update mock data store
  return newProfile;
}

export async function updateProfile(userId: string, data: Partial<Omit<Profile, 'id' | 'email'>>): Promise<Profile> {
  console.log(`API: Updating profile data for user ${userId}:`, data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (!mockProfiles[userId]) {
      throw new Error("Profile not found for update");
  }
  // Merge updates, ensure skills are handled correctly
  const updatedSkills = data.skills !== undefined
    ? (Array.isArray(data.skills) ? data.skills : data.skills.split(',').map(s => s.trim()).filter(s => s))
    : mockProfiles[userId].skills;

  mockProfiles[userId] = {
      ...mockProfiles[userId],
      ...data,
      skills: updatedSkills,
  };
  return mockProfiles[userId];
}

// --- Proposals ---
// Mock function - replace with actual API call
export async function submitProposalApi(projectId: string, freelancerId: string, proposalData: { coverLetter: string; proposedRate: number }): Promise<void> {
    console.log(`API: Submitting proposal for project ${projectId} by freelancer ${freelancerId}`, proposalData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    // In a real app, save this to DB
    console.log("Proposal saved (simulated).");
}


// --- Feedback ---
export async function fetchUserFeedback(userId: string): Promise<{ feedback: Feedback[], stats: RatingStats }> {
    console.log(`API: Fetching feedback for user ID: ${userId}`);
    await new Promise(resolve => setTimeout(resolve, 400));

    const receivedFeedback = mockFeedback.filter(f => f.recipientId === userId);

    if (receivedFeedback.length === 0) {
        return { feedback: [], stats: { averageRating: 0, totalRatings: 0 } };
    }

    const totalRatingSum = receivedFeedback.reduce((sum, fb) => sum + fb.rating, 0);
    const averageRating = totalRatingSum / receivedFeedback.length;

    return {
        feedback: receivedFeedback.sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime()), // Sort newest first
        stats: {
            averageRating: Math.round(averageRating * 10) / 10, // Round to one decimal place
            totalRatings: receivedFeedback.length,
        }
    };
}


export async function fetchClientFeedback(clientId: string): Promise<{ feedback: Feedback[], stats: RatingStats }> {
    console.log(`API: Fetching feedback for client ID: ${clientId}`);
    await new Promise(resolve => setTimeout(resolve, 400));

    const receivedFeedback = mockFeedback.filter(f => f.recipientId === clientId); // Feedback *received by* client

     if (receivedFeedback.length === 0) {
        return { feedback: [], stats: { averageRating: 0, totalRatings: 0 } };
    }

    const totalRatingSum = receivedFeedback.reduce((sum, fb) => sum + fb.rating, 0);
    const averageRating = totalRatingSum / receivedFeedback.length;

    return {
        feedback: receivedFeedback.sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime()),
        stats: {
            averageRating: Math.round(averageRating * 10) / 10,
            totalRatings: receivedFeedback.length,
        }
    };
}


export async function submitFeedbackApi(data: Omit<Feedback, 'id' | 'submittedAt'>): Promise<Feedback> {
  console.log("API: Submitting feedback data:", data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newFeedback: Feedback = {
      ...data,
      id: `feedback-${Math.random().toString(36).substring(7)}`,
      submittedAt: new Date(),
  };
  mockFeedback.push(newFeedback); // Add to mock data store
  return newFeedback;
}
