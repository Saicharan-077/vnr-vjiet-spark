import { Calendar, MapPin, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface EventCardProps {
  id: number;
  title: string;
  category: string;
  date: string;
  venue: string;
  image: string;
  description: string;
}

const EventCard = ({ id, title, category, date, venue, image, description }: EventCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "tech":
        return "bg-accent text-accent-foreground";
      case "cultural":
        return "bg-secondary text-secondary-foreground";
      case "sports":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="group overflow-hidden hover-lift shadow-custom-sm hover:shadow-custom-lg transition-all duration-300">
      <div className="relative overflow-hidden h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
              category
            )}`}
          >
            <Tag className="h-3 w-3" />
            {category}
          </span>
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            {date}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            {venue}
          </div>
        </div>
        <Link to={`/events/${id}`}>
          <Button variant="secondary" className="w-full">
            Know More
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default EventCard;
