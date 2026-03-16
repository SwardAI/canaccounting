import { DollarSign, CircleHelp, UserCheck } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "7+ Years of Experience",
    description: "We've filed hundreds of LLC returns since 2018",
  },
  {
    icon: CircleHelp,
    title: "No Experience Needed",
    description: "We guide you through everything",
  },
  {
    icon: UserCheck,
    title: "Human-Reviewed",
    description: "Tax pros check every line",
  },
];

export function Benefits() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-gray-900 mb-4 font-serif">
            Perfect for LLC owners
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="group h-full">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 h-full">
                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-50 to-white rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <div className="text-gray-700">
                          <b.icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {b.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {b.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
