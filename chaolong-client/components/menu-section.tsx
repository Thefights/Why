import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  popular: boolean;
}

interface MenuSectionProps {
  title: string;
  subtitle: string;
  items: MenuItem[];
}

export function MenuSection({ title, subtitle, items }: MenuSectionProps) {
  return (
    <section className="mb-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-4">
          {title}
        </h2>
        <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-48 object-cover"
                width={400}
                height={300}
              />
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3 ">
                <h3 className="font-serif font-semibold text-xl text-foreground">
                  {item.name}
                </h3>
                <span className="font-sans font-semibold text-lg text-primary">
                  {item.price}
                </span>
              </div>
              <p className="font-sans text-muted-foreground mb-4 leading-relaxed">
                {item.description}
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Add to Order
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
