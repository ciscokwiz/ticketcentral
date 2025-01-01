import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import TicketsList from "@/components/dashboard/TicketsList";
import { User, LogOut, Settings } from "lucide-react";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={currentUser.photoURL || undefined} />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-3">
                <CardTitle className="text-accent-purple">{currentUser.displayName || 'User'}</CardTitle>
                <p className="text-sm text-muted-foreground">{currentUser.email}</p>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={handleLogout} className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <Link to="/manage-events">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Manage Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">View and manage your created events</p>
              </CardContent>
            </Link>
          </Card>

          <div className="md:col-span-2">
            <TicketsList />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;