import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, User, Mail, Phone, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { events } from "@/data/events";

const EventDetails = () => {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Event not found</h2>
          <Link to="/events">
            <Button variant="secondary">Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "tech":
        return "text-accent";
      case "cultural":
        return "text-secondary";
      case "sports":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Button */}
        <Link to="/events">
          <Button variant="ghost" className="mb-6 group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Events
          </Button>
        </Link>

        {/* Hero Image */}
        <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8 animate-fade-in">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"></div>
        </div>

        {/* Event Header */}
        <div className="mb-8 animate-fade-in-up">
          <div className={`text-sm font-semibold ${getCategoryColor(event.category)} mb-2`}>
            {event.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
          <div className="flex items-center text-muted-foreground mb-6">
            <User className="h-4 w-4 mr-2" />
            <span className="text-sm">Organized by {event.organizer}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-3 text-primary" />
              <div>
                <div className="text-sm text-muted-foreground">Date</div>
                <div className="font-semibold">{event.date}</div>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-3 text-primary" />
              <div>
                <div className="text-sm text-muted-foreground">Venue</div>
                <div className="font-semibold">{event.venue}</div>
              </div>
            </div>
          </div>

          <Button variant="secondary" size="lg" className="w-full md:w-auto">
            Register Now
          </Button>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            <Card className="animate-fade-in-up">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">About Event</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </CardContent>
            </Card>

            {/* Rules */}
            <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Rules & Guidelines</h2>
                <ul className="space-y-3">
                  {event.rules.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div>
            <Card className="animate-fade-in-up sticky top-24" style={{ animationDelay: "0.2s" }}>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Coordinator
                    </div>
                    <div className="font-semibold">{event.contact.name}</div>
                  </div>
                  <div>
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      <a
                        href={`mailto:${event.contact.email}`}
                        className="text-primary hover:underline"
                      >
                        {event.contact.email}
                      </a>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      <a
                        href={`tel:${event.contact.phone}`}
                        className="text-primary hover:underline"
                      >
                        {event.contact.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
