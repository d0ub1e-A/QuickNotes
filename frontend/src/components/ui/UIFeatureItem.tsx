type Props = {
  icon: any;
  text: string;
};

export default function FeatureItemUI({ icon: Icon, text }: Props) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
      <Icon className="w-5 h-5 text-blue-300 flex-shrink-0" />
      <span className="text-gray-200">{text}</span>
    </div>
  );
}
