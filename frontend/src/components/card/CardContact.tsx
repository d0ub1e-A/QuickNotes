type Props = {
  link: string;
  icon: any;
  label: string;
  alt?: string;
};

export default function ContactCard({ link, icon: Icon, label }: Props) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl"
    >
      <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white drop-shadow-lg" />
      <span className="absolute -bottom-8 text-xs font-medium text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {label}
      </span>
    </a>
  );
}
