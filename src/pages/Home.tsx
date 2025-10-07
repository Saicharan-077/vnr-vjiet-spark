import { Link } from "react-router-dom";
import { Calendar, Users, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/EventCard";
import { events } from "@/data/events";
import heroCampus from "@/assets/hero-campus.jpg";

const Home = () => {
  const trendingEvents = events.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroCampus})` }}
        >
          <div className="absolute inset-0 gradient-hero"></div>
        </div>
        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Where Innovation Meets
            <br />
            <span className="text-accent">Celebration</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Explore campus events, register effortlessly, and stay connected with all
            happenings at VNR VJIET
          </p>
          <Link to="/events">
            <Button variant="hero" size="lg" className="group">
              View Events
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Events Hosted</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <div className="text-4xl font-bold text-secondary mb-2">50+</div>
              <div className="text-muted-foreground">Active Clubs</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <Trophy className="h-8 w-8 text-accent" />
              </div>
              <div className="text-4xl font-bold text-accent mb-2">5000+</div>
              <div className="text-muted-foreground">Participants</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Events */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trending <span className="text-secondary">Events</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't miss out on these exciting upcoming events happening at our campus
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {trendingEvents.map((event, index) => (
              <div
                key={event.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <EventCard {...event} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/events">
              <Button variant="outline" size="lg">
                View All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
