
import type { Feedback } from '@/types/feedback';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RatingDisplay } from '@/components/rating-display';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from './ui/badge';

interface FeedbackListProps {
  feedbackItems: Feedback[];
  title?: string;
}

/**
 * Displays a list of feedback entries.
 */
export function FeedbackList({ feedbackItems, title = "Feedback Received" }: FeedbackListProps) {
  if (!feedbackItems || feedbackItems.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-4">
        No feedback available yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
       <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {feedbackItems.map((feedback) => (
        <Card key={feedback.id} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-4 pb-2 bg-muted/30 p-4 border-b">
            {/* Placeholder Avatar - replace with actual user fetching */}
            <Avatar className="h-10 w-10">
              {/* Assume fetching author details based on feedback.authorId */}
              <AvatarImage src={`https://picsum.photos/40/40?random=${feedback.authorId}`} alt="Author" data-ai-hint="person avatar" />
              <AvatarFallback>{feedback.authorId.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                {/* Placeholder Name - replace with actual user fetching */}
                <p className="font-semibold text-sm">User {feedback.authorId.substring(0, 5)}...</p>
                 <Badge variant="outline" className="capitalize text-xs">{feedback.authorRole}</Badge>
              </div>
               <div className="flex justify-between items-center mt-1">
                <RatingDisplay rating={feedback.rating} size={14} />
                <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(feedback.submittedAt, { addSuffix: true })}
                </p>
               </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-foreground leading-relaxed">{feedback.comment}</p>
            {/* Optionally link to the project */}
            {/* <p className="text-xs text-muted-foreground mt-2">Project ID: {feedback.projectId}</p> */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
