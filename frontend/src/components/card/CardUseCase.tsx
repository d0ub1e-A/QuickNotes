type Props = {
  icon: any;
  title: string;
  description: string;
  textColor: string;
};

export default function UseCaseCard({
  icon: Icon,
  title,
  description,
  textColor,
}: Props) {
  return (
    <div className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl">
      <Icon className={`w-16 h-16 ${textColor} mx-auto mb-4`} />
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
