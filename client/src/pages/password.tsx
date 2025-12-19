import { Sidebar } from "@/components/layout/Sidebar";
import { Menu, Bell, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChangePassword() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.currentPassword) newErrors.currentPassword = "Current password is required";
    if (!formData.newPassword) newErrors.newPassword = "New password is required";
    else if (formData.newPassword.length < 8) newErrors.newPassword = "Password must be at least 8 characters";
    else if (!/[A-Z]/.test(formData.newPassword)) newErrors.newPassword = "Password must contain uppercase letter";
    else if (!/[a-z]/.test(formData.newPassword)) newErrors.newPassword = "Password must contain lowercase letter";
    else if (!/[0-9]/.test(formData.newPassword)) newErrors.newPassword = "Password must contain number";
    else if (!/[!@#$%^&*]/.test(formData.newPassword)) newErrors.newPassword = "Password must contain special character (!@#$%^&*)";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm password";
    else if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (formData.currentPassword === formData.newPassword) newErrors.newPassword = "New password must be different from current password";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setErrors({});
    }
  };

  const PasswordInput = ({ label, field, show, onToggle }: any) => (
    <div className="space-y-2">
      <Label htmlFor={field} className="text-sm font-medium">{label}</Label>
      <div className="relative">
        <Input
          id={field}
          type={show ? "text" : "password"}
          placeholder={`Enter ${label.toLowerCase()}`}
          className="border-2 border-border/50 focus:border-primary/50 h-11 pr-10"
          value={formData[field as keyof typeof formData]}
          onChange={(e) => handleChange(field, e.target.value)}
          data-testid={`input-${field}`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {errors[field as keyof typeof errors] && <p className="text-xs text-destructive">{errors[field as keyof typeof errors]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-background font-sans flex">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1 md:ml-72 flex flex-col min-h-screen transition-all duration-300">
        <header className="h-20 border-b border-border/40 bg-white/50 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="p-2 hover:bg-muted rounded-md">
                  <Menu className="h-6 w-6 text-foreground" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 border-r-0 bg-transparent">
                <Sidebar />
              </SheetContent>
            </Sheet>
            <div className="font-bold font-heading text-lg">SimpleBit</div>
          </div>

          <div className="hidden md:flex flex-col">
            <h1 className="text-xl font-bold font-heading text-foreground">Change Password</h1>
            <p className="text-muted-foreground text-xs">Update your account password</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2.5 hover:bg-muted rounded-full transition-colors group">
              <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-2xl mx-auto w-full">
          <div className="mb-8">
            <h2 className="text-2xl font-bold font-heading">Change Password</h2>
            <p className="text-muted-foreground text-sm mt-1">Update your account password for enhanced security</p>
          </div>

          <Card className="border-2 border-border/50">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <PasswordInput
                label="Current Password"
                field="currentPassword"
                show={showPassword.current}
                onToggle={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
              />

              <PasswordInput
                label="New Password"
                field="newPassword"
                show={showPassword.new}
                onToggle={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
              />

              <PasswordInput
                label="Confirm New Password"
                field="confirmPassword"
                show={showPassword.confirm}
                onToggle={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
              />

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="font-semibold text-foreground text-sm">Password Requirements:</p>
                <ul className="space-y-1 text-xs text-foreground/70">
                  <li className="flex gap-2"><span>•</span> At least 8 characters long</li>
                  <li className="flex gap-2"><span>•</span> Contains uppercase and lowercase letters</li>
                  <li className="flex gap-2"><span>•</span> Contains at least one number</li>
                  <li className="flex gap-2"><span>•</span> Contains at least one special character</li>
                </ul>
              </div>

              <Button
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90 w-full h-11 text-base"
                data-testid="button-change-password"
              >
                Change Password
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
