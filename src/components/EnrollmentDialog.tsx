import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type EducationLevel = "basic" | "higher";
type FormMode = "signup" | "signin";

interface EnrollmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  level: EducationLevel | null;
}

const EnrollmentDialog = ({ open, onOpenChange, level }: EnrollmentDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<FormMode>("signup");
  const [form, setForm] = useState({
    username: "",
    password: "",
    familyName: "",
    firstName: "",
    email: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm({ username: "", password: "", familyName: "", firstName: "", email: "" });
  };

  const handleSignUp = async () => {
    if (!form.username || !form.password || !form.familyName || !form.firstName || !form.email) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    if (form.username.length > 15) {
      toast({ title: "Username must be 15 characters or less", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          username: form.username,
          family_name: form.familyName,
          first_name: form.firstName,
        },
      },
    });
    setLoading(false);

    if (error) {
      toast({ title: "Sign-up failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Account created!", description: "Please check your email to verify your account." });
      resetForm();
      onOpenChange(false);
    }
  };

  const handleSignIn = async () => {
    if (!form.email || !form.password) {
      toast({ title: "Please fill in email and password", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    setLoading(false);

    if (error) {
      toast({ title: "Sign-in failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Signed in successfully!" });
      resetForm();
      onOpenChange(false);
    }
  };

  const switchMode = (newMode: FormMode) => {
    setMode(newMode);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { onOpenChange(o); if (!o) { setMode("signup"); resetForm(); } }}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        {/* Tab Switcher */}
        <div className="flex border-b border-border">
          <button
            onClick={() => switchMode("signup")}
            className={`flex-1 py-3 text-sm font-bold transition-colors ${
              mode === "signup"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            New Learner (Sign-up)
          </button>
          <button
            onClick={() => switchMode("signin")}
            className={`flex-1 py-3 text-sm font-bold transition-colors ${
              mode === "signin"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Returning Learner (Sign-in)
          </button>
        </div>

        <DialogHeader className="px-6 pt-4 pb-0">
          <DialogTitle className="font-heading text-lg text-foreground text-center">
            {mode === "signup" ? "Sign-up Form to create an ACCOUNT" : "Sign-in to your ACCOUNT"}
          </DialogTitle>
        </DialogHeader>

        <div className="bg-accent/40 px-6 py-6 space-y-5">
          {mode === "signup" && (
            <>
              <div className="space-y-1.5">
                <Label htmlFor="username" className="text-foreground font-medium">Username:</Label>
                <div className="flex items-center gap-2">
                  <Input id="username" maxLength={15} value={form.username} onChange={(e) => handleChange("username", e.target.value)} className="bg-white border-border" />
                  <span className="text-xs text-muted-foreground whitespace-nowrap">(max. 15 characters)</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="familyName" className="text-foreground font-medium">Family Name:</Label>
                <Input id="familyName" value={form.familyName} onChange={(e) => handleChange("familyName", e.target.value)} className="bg-white border-border" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="firstName" className="text-foreground font-medium">First Name:</Label>
                <Input id="firstName" value={form.firstName} onChange={(e) => handleChange("firstName", e.target.value)} className="bg-white border-border" />
              </div>
            </>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-foreground font-medium">Email:</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className="bg-white border-border" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-foreground font-medium">Password:</Label>
            <Input id="password" type="password" value={form.password} onChange={(e) => handleChange("password", e.target.value)} className="bg-white border-border max-w-[280px]" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 bg-accent/60 px-6 py-3">
          <Button
            onClick={mode === "signup" ? handleSignUp : handleSignIn}
            disabled={loading}
            className="bg-primary text-primary-foreground font-bold px-6 hover:bg-primary/90"
          >
            {loading ? (mode === "signup" ? "Signing up..." : "Signing in...") : (mode === "signup" ? "Sign-up" : "Sign-in")}
          </Button>
          <span className="text-muted-foreground">|</span>
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="font-bold text-foreground">
            CANCEL
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollmentDialog;
