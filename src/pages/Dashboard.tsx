import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import TicketsList from "@/components/dashboard/TicketsList";
import { User, LogOut, Settings, Ticket, Calendar } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* User Profile Card */}
            <Card className="md:w-1/3">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={currentUser.photoURL || undefined} />
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-3">
                  <CardTitle>{currentUser.displayName || 'User'}</CardTitle>
                  <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" onClick={handleLogout} className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="md:w-2/3">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-24 flex flex-col items-center justify-center gap-2"
                  onClick={() => navigate('/manage-events')}
                >
                  <Settings className="h-6 w-6" />
                  <span>Manage Events</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-24 flex flex-col items-center justify-center gap-2"
                  onClick={() => navigate('/create-event')}
                >
                  <Calendar className="h-6 w-6" />
                  <span>Create Event</span>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="tickets" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tickets">
                <Ticket className="h-4 w-4 mr-2" />
                My Tickets
              </TabsTrigger>
              <TabsTrigger value="upcoming">
                <Calendar className="h-4 w-4 mr-2" />
                Upcoming Events
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tickets">
              <TicketsList />
            </TabsContent>
            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your upcoming events will appear here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;