import { Navigation } from "@/components/navigation";
import { MenuSection } from "@/components/menu-section";

const porridgeItems = [
  {
    id: 1,
    name: "Cháo Gà",
    description:
      "Traditional chicken porridge with tender shredded chicken, ginger, and fresh herbs",
    price: "$12.99",
    image: "/chaoga-porridge.png",
    popular: true,
  },
  {
    id: 2,
    name: "Cháo Tôm",
    description:
      "Fresh shrimp porridge with aromatic broth, cilantro, and crispy shallots",
    price: "$14.99",
    image: "/chaotom-porridge.png",
    popular: false,
  },
  {
    id: 3,
    name: "Cháo Thịt Băm",
    description:
      "Ground pork porridge with fish sauce, white pepper, and green onions",
    price: "$11.99",
    image: "/chaothitbam-porridge.png",
    popular: false,
  },
  {
    id: 4,
    name: "Cháo Cá",
    description:
      "Fish porridge with fresh dill, turmeric, and Vietnamese herbs",
    price: "$13.99",
    image: "/chaoca-porridge.png",
    popular: true,
  },
  {
    id: 5,
    name: "Cháo Chay",
    description:
      "Vegetarian porridge with mushrooms, tofu, and seasonal vegetables",
    price: "$10.99",
    image: "/chaochay-porridge.png",
    popular: false,
  },
  {
    id: 6,
    name: "Cháo Lòng",
    description: "Traditional pork organ porridge with herbs and spices",
    price: "$13.99",
    image: "/chaolong-porridge.png",
    popular: false,
  },
];

const beverages = [
  {
    id: 11,
    name: "Cà Phê Sữa Đá",
    description: "Vietnamese iced coffee with condensed milk",
    price: "$4.99",
    image: "/caphe-suada.png",
    popular: true,
  },
  {
    id: 12,
    name: "Trà Đá",
    description: "Traditional Vietnamese iced tea",
    price: "$2.99",
    image: "/tra-da.png",
    popular: false,
  },
  {
    id: 13,
    name: "Nước Mía",
    description: "Fresh sugarcane juice",
    price: "$3.99",
    image: "/nuoc-mia.png",
    popular: false,
  },
  {
    id: 14,
    name: "Sinh Tố",
    description: "Vietnamese fruit smoothie (seasonal fruits)",
    price: "$5.99",
    image: "/sinh-to.png",
    popular: true,
  },
];

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Menu Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <MenuSection
          title="Traditional Porridge"
          subtitle="Our signature dishes made with the finest ingredients"
          items={porridgeItems}
        />

        <MenuSection
          title="Beverages"
          subtitle="Authentic Vietnamese drinks to complement your dining experience"
          items={beverages}
        />
      </div>
    </main>
  );
}
