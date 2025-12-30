import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Invoices from "@/pages/invoices";
import CreateInvoice from "@/pages/create-invoice";
import InvoiceSuccess from "@/pages/invoice-success";
import InvoiceDetail from "@/pages/invoice-detail";
import Pay from "@/pages/pay";
import PayWith from "@/pages/pay-with";
import Items from "@/pages/items";
import Transactions from "@/pages/transactions";
import Payouts from "@/pages/payouts";
import Profile from "@/pages/profile";
import KYC from "@/pages/kyc";
import ChangePassword from "@/pages/password";
import Login from "@/pages/login";
import ForgotPassword from "@/pages/forgot-password";
import Signup from "@/pages/signup";

function Router() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL}>
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/invoices" component={Invoices} />
        <Route path="/create-invoice" component={CreateInvoice} />
        <Route path="/invoice-success" component={InvoiceSuccess} />
        <Route path="/invoice/:id" component={InvoiceDetail} />
        <Route path="/pay/:id" component={Pay} />
        <Route path="/pay-with/:id/:crypto" component={PayWith} />
        <Route path="/items" component={Items} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/payouts" component={Payouts} />
        <Route path="/profile" component={Profile} />
        <Route path="/kyc" component={KYC} />
        <Route path="/password" component={ChangePassword} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
