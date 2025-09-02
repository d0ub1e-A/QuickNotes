import {
  Brain,
  Zap,
  Shield,
  Users,
  Lightbulb,
  Star,
  Search,
  Eye,
  Edit,
  Tag,
  Pin,
  Palette,
  Github,
  Mail,
  CheckCircle,
  Settings,
} from "lucide-react";
import { useAppSelector } from "../hooks";
import { useEffect, useRef } from "react";

import ContactCard from "../components/card/CardContact";
import FeatureCard from "../components/card/CardFeature";
import FeatureItemUI from "../components/ui/UIFeatureItem";
import PublicSectionFooter from "../components/footer/FooterPublicSection";
import UseCaseCard from "../components/card/CardUseCase";

export default function HomePage() {
  const { toTop } = useAppSelector((state) => state.homeScroller);
  const homeRef = useRef<HTMLDivElement>(null);

  document.title = "Quick Notes";

  useEffect(() => {
    if (!toTop || !homeRef.current) return;

    homeRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [toTop]);

  return (
    <div
      ref={homeRef}
      className={`homepage-section dark:bg-blend-soft-light bg-slate-100 dark:bg-slate-700`}
    >
      {/* Welcome section */}
      <section className="relative flex flex-col items-center justify-center h-svh font-bold text-gray-800 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 text-center space-y-8">
          <div className="p-8 backdrop-blur-md bg-white/10 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700 rounded-3xl shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img
                src="/LogoQuickNotes.png"
                className="w-[3.5rem] h-[3.5rem]"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                QuickNotes
              </span>
            </div>
            <h1 className="walter text-4xl md:text-6xl lg:text-7xl mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent font-extrabold leading-tight">
              Never Lose
            </h1>
            <h1 className="walter text-4xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 dark:from-purple-100 dark:via-pink-100 dark:to-red-100 bg-clip-text text-transparent font-extrabold leading-tight">
              Your Ideas...
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Your second brain for capturing, organizing, and transforming
              thoughts into reality. From billion-dollar concepts to daily
              reminders - never let a great idea slip away.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose QuickNotes?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Designed for everyone - from students to entrepreneurs,
              researchers to developers. Your ideas deserve a home that's as
              dynamic as your mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Brain}
              title="Your Second Brain"
              description="Capture fleeting thoughts instantly. Never lose a potentially game-changing idea again."
              gradient="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon={Zap}
              title="Effortless Capture"
              description="Simple interface, powerful features. Just an account needed to start organizing your thoughts."
              gradient="from-purple-500 to-pink-500"
            />
            <FeatureCard
              icon={Users}
              title="For Everyone"
              description="Students, developers, entrepreneurs, teachers - built for diverse needs and workflows."
              gradient="from-green-500 to-teal-500"
            />
            <FeatureCard
              icon={Shield}
              title="Reliable & Secure"
              description="Your ideas are safe with us. Accessible anywhere, anytime, on any device."
              gradient="from-orange-500 to-red-500"
            />
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 to-blue-900 dark:from-slate-900 dark:to-blue-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to capture, organize, and transform your ideas
              into reality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureItemUI icon={Edit} text="Create & Edit Notes" />
            <FeatureItemUI icon={Tag} text="Custom Tags & Organization" />
            <FeatureItemUI icon={Palette} text="Custom Colors" />
            <FeatureItemUI icon={Pin} text="Pin Important Notes" />
            <FeatureItemUI icon={Search} text="Search by Tags" />
            <FeatureItemUI icon={Eye} text="Beautiful Markdown Preview" />
            <FeatureItemUI icon={Star} text="Real-time Notifications" />
            <FeatureItemUI icon={CheckCircle} text="User-Friendly Interface" />
            <FeatureItemUI icon={Settings} text="Easy Note Management" />
          </div>
        </div>
      </section>

      {/* Testimonial/Use Cases Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12">
            From Idea to Impact
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <UseCaseCard
              icon={Lightbulb}
              title={`Students`}
              textColor={`text-yellow-500`}
              description={`Capture lecture notes, research ideas, and study materials in one organized space.`}
            />
            <UseCaseCard
              icon={Brain}
              title={`Developers`}
              textColor={`text-blue-500`}
              description={`Document code snippets, project ideas, and technical solutions for future reference.`}
            />
            <UseCaseCard
              icon={Star}
              title={`Entrepreneurs`}
              textColor={`text-purple-500`}
              description={`Never lose that billion-dollar idea. Brainstorm, plan, and execute your next big venture.`}
            />
          </div>
        </div>
      </section>

      {/* Contacts section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-100 to-blue-100 dark:from-slate-800 dark:to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#10466b] dark:text-[#acbef7] mb-4">
            Let's Connect
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Have questions about QuickNotes? Want to collaborate? Reach out
            through your preferred channel.
          </p>

          <div className="flex justify-center gap-8 md:gap-16">
            <ContactCard
              link="https://github.com/d0ub1e-A"
              icon={Github}
              alt="Github Icon"
              label="GitHub"
            />
            <ContactCard
              link="mailto:ahnafabid.casual@gmail.com"
              icon={Mail}
              alt="Gmail Icon"
              label="Email"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <PublicSectionFooter />
    </div>
  );
}
