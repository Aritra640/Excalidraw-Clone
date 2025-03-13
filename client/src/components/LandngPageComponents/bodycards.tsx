import { Card, CardContent } from "@/components/ui/card";

export function FeatureCards() {
  const features = [
    {
      title: "🚀 Open Source",
      description: "Completely free and open-source. Contribute and improve the project.",
    },
    {
      title: "🤝 Collaborate (Upcoming)",
      description: "Real-time collaboration with your team is coming soon!",
    },
    {
      title: "✏️ Free Hand Drawing",
      description: "Draw anything you want with a smooth and natural experience.",
    },
    {
      title: "☁️ Save to the Cloud",
      description: "Your drawings are saved securely to access them from anywhere.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-screen-lg mx-auto px-4 py-12">
      {features.map((feature, index) => (
        <Card
          key={index}
          className="p-6 border border-gray-700 bg-gradient-to-br from-slate-900 to-gray-800 text-white rounded-xl transition-colors duration-300 hover:from-slate-800 hover:to-gray-700"
        >
          <CardContent>
            <h3 className="text-2xl font-semibold">{feature.title}</h3>
            <p className="mt-2 text-gray-300">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
