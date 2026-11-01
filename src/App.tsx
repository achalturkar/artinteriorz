import { Router, Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ServicesPage from "@/pages/ServicesPage";
import PortfolioPage from "@/pages/PortfolioPage";
import ContactPage from "@/pages/ContactPage";
import BlogPage from "@/pages/BlogPage";
import NotFoundPage from "@/pages/NotFoundPage";
import FloatingChatbot from "@/components/FloatingChatbot";
import WhatsAppButton from "@/components/WhatsAppButton";
import CareerPage from "@/pages/CareerPage";
import VendorsPage from "@/pages/VendorsPage";

const queryClient = new QueryClient();

/** Vite base path without trailing slash (empty string when deployed at domain root). */
const routerBase = import.meta.env.BASE_URL.replace(/\/$/, "");

function AppRoutes() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/portfolio" component={PortfolioPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/career" component={CareerPage} />
        <Route path="/vendors" component={VendorsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Layout>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router base={routerBase}>
        <AppRoutes />
      </Router>
      <FloatingChatbot />
      <WhatsAppButton />
    </QueryClientProvider>
  );
}
