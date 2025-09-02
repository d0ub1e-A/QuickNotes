type Props = {
  icon: any;
  title: string;
  description: string;
  gradient: string;
};

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient,
}: Props) {
  return (
    <div
      className={`relative p-6 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1`}
    >
      <div className="absolute inset-0 bg-black/10 rounded-2xl backdrop-blur-sm"></div>
      <div className="relative z-10">
        <Icon className="w-12 h-12 mb-4 drop-shadow-lg" />
        <h3 className="text-xl font-bold mb-2 drop-shadow-md">{title}</h3>
        <p className="text-white/90 leading-relaxed drop-shadow-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
