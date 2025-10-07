import { Zap, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import heroCampus from "@/assets/hero-campus.jpg";

const About = () => {
  const features = [
    {
      icon: Zap,
      title: "Real-time Updates",
      description:
        "Stay informed about new events, announcements, and changes as they happen.",
    },
    {
      icon: Users,
      title: "Easy Registration",
      description:
        "Register for events with just a few clicks and get instant confirmation.",
    },
    {
      icon: Award,
      title: "Certificate Downloads",
      description:
        "Download your participation certificates directly from your profile.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero Section with Background */}
      <section
        className="relative h-[400px] flex items-center justify-center overflow-hidden mb-16"
        style={{
          backgroundImage: `url(${heroCampus})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary/80"></div>
        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            About VNR VJIET Events
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            The VNR VJIET Event Management System helps students stay updated on
            campus happenings, register effortlessly, and explore unique
            opportunities across clubs.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Purpose Statement */}
        <section className="mb-16 animate-fade-in">
          <Card className="shadow-custom-lg">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Our <span className="text-secondary">Purpose</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
                We believe that campus life extends far beyond classrooms. Our
                platform is designed to connect students with the vibrant culture of
                VNR VJIET, making it easier than ever to discover, participate in,
                and celebrate the diverse events that make our college community
                unique. Whether you're into technology, arts, sports, or social
                causes, there's something here for everyone.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Features */}
        <section>
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've built features that make your campus experience seamless and
              enjoyable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="group hover-lift shadow-custom-sm hover:shadow-custom-lg transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center animate-fade-in">
          <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-custom-lg">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Join thousands of students already using our platform to stay
                connected
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/events">
                  <button className="px-8 py-3 bg-background text-primary rounded-lg font-semibold hover:bg-background/90 transition-all duration-300 shadow-md hover:shadow-lg">
                    Browse Events
                  </button>
                </a>
                <a href="/login">
                  <button className="px-8 py-3 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/20 transition-all duration-300 border border-primary-foreground/20">
                    Login Now
                  </button>
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;
