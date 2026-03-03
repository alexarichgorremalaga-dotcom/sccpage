import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserPlus, LogIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

type EducationLevel = "basic" | "higher";

interface EnrollmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  level: EducationLevel | null;
}

const EnrollmentDialog = ({ open, onOpenChange, level }: EnrollmentDialogProps) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        toast({
          title: "Signed in successfully!",
          description: `Welcome, ${session.user.email}`,
        });
        onOpenChange(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const levelTitle = level === "basic" ? "Basic Education" : "Higher Education";

  if (user) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-center uppercase">
              {levelTitle}
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-6 space-y-4">
            <p className="text-foreground font-medium">
              Signed in as <span className="text-gold">{user.email}</span>
            </p>
            <p className="text-muted-foreground text-sm">
              Enrollment form coming soon. You'll be notified when it's ready.
            </p>
            <Button variant="outline" onClick={handleSignOut} className="mt-4">
              Sign Out
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-center uppercase">
            {levelTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* New Learners */}
          <div className="text-center p-6 bg-secondary rounded-lg">
            <UserPlus className="w-10 h-10 mx-auto mb-3 text-gold" />
            <h4 className="font-heading font-bold text-foreground mb-1">
              NEW Learners
            </h4>
            <p className="text-muted-foreground text-sm mb-4">
              Sign up with your Google account
            </p>
            <GoogleSignInButton />
          </div>

          {/* Old Learners */}
          <div className="text-center p-6 bg-secondary rounded-lg">
            <LogIn className="w-10 h-10 mx-auto mb-3 text-gold" />
            <h4 className="font-heading font-bold text-foreground mb-1">
              OLD and NEW Learners
            </h4>
            <p className="text-muted-foreground text-sm mb-4">
              Already have an account? Sign in
            </p>
            <GoogleSignInButton />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollmentDialog;
