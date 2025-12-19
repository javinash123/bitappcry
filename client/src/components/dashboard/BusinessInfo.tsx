import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Phone, Mail, CheckCircle2, ShieldCheck, Calendar } from "lucide-react";

export function BusinessInfo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
       {/* Account Status Card */}
       <Card className="glass-card border-none shadow-sm lg:col-span-1 bg-gradient-to-br from-emerald-50/50 to-transparent">
         <CardHeader>
           <CardTitle className="text-base font-heading text-emerald-800">Account Status</CardTitle>
         </CardHeader>
         <CardContent>
           <div className="space-y-4">
             <div className="flex items-center justify-between p-3 bg-white/60 rounded-xl border border-emerald-100 shadow-sm">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-emerald-100 rounded-full text-emerald-600">
                   <Mail className="h-4 w-4" />
                 </div>
                 <span className="text-sm font-medium text-emerald-900">Email Verified</span>
               </div>
               <CheckCircle2 className="h-5 w-5 text-emerald-500" />
             </div>
             
             <div className="flex items-center justify-between p-3 bg-white/60 rounded-xl border border-emerald-100 shadow-sm">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-emerald-100 rounded-full text-emerald-600">
                   <ShieldCheck className="h-4 w-4" />
                 </div>
                 <span className="text-sm font-medium text-emerald-900">KYC Approved</span>
               </div>
               <CheckCircle2 className="h-5 w-5 text-emerald-500" />
             </div>
           </div>
         </CardContent>
       </Card>

       {/* Business Details Card */}
       <Card className="glass-card border-none shadow-sm lg:col-span-2">
         <CardHeader className="flex flex-row items-center justify-between pb-2">
           <CardTitle className="text-lg font-heading">Business Profile</CardTitle>
           <Badge variant="outline" className="font-normal text-muted-foreground">Registration: 9/6/2025</Badge>
         </CardHeader>
         <CardContent>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
             <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/5 rounded-xl text-primary mt-1">
                   <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Business Name</p>
                  <p className="text-base font-semibold text-foreground">Webcreaters</p>
                  <p className="text-sm text-muted-foreground mt-1">IT Services & Consulting</p>
                </div>
             </div>

             <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">1254789635</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">kumarparveen2007@gmail.com</span>
                </div>
             </div>
           </div>
         </CardContent>
       </Card>
    </div>
  );
}
