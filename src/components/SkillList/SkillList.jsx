import Image from "next/image";

const SkillList = ({ skill, icon, altText, category }) => {
  const categoryStyles = {
    frontend: {
      gradient: "from-blue-500/15 via-blue-400/10 to-slate-800/5",
      hoverGradient:
        "hover:from-blue-500/25 hover:via-blue-400/15 hover:to-blue-300/10",
      border: "border-blue-500/30 hover:border-blue-400/50",
      glow: "hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)] hover:shadow-glow",
      iconBg: "bg-gradient-to-br from-blue-500/20 to-blue-600/15",
      iconHover: "group-hover:from-blue-400/30 group-hover:to-blue-500/25",
      textGlow: "group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.7)]",
    },
    backend: {
      gradient: "from-purple-500/15 via-purple-400/10 to-slate-800/5",
      hoverGradient:
        "hover:from-purple-500/25 hover:via-purple-400/15 hover:to-purple-300/10",
      border: "border-purple-500/30 hover:border-purple-400/50",
      glow: "hover:shadow-[0_0_30px_-5px_rgba(147,51,234,0.4)] hover:shadow-glow",
      iconBg: "bg-gradient-to-br from-purple-500/20 to-purple-600/15",
      iconHover: "group-hover:from-purple-400/30 group-hover:to-purple-500/25",
      textGlow: "group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.7)]",
    },
    outils: {
      gradient: "from-emerald-500/15 via-emerald-400/10 to-slate-800/5",
      hoverGradient:
        "hover:from-emerald-500/25 hover:via-emerald-400/15 hover:to-emerald-300/10",
      border: "border-emerald-500/30 hover:border-emerald-400/50",
      glow: "hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)] hover:shadow-glow",
      iconBg: "bg-gradient-to-br from-emerald-500/20 to-emerald-600/15",
      iconHover:
        "group-hover:from-emerald-400/30 group-hover:to-emerald-500/25",
      textGlow: "group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]",
    },
  };

  const style = categoryStyles[category.toLowerCase()];

  return (
    <div
      className={`item-animate group relative overflow-hidden rounded-2xl border bg-gradient-to-br backdrop-blur-sm ${style.gradient} ${style.hoverGradient} ${style.border} ${style.glow} h-32 2xl:h-40 cursor-pointer transition-all duration-500 ease-out before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:before:opacity-100`}
    >
      {/* Animated dots */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute top-3 right-4 h-1 w-1 animate-pulse rounded-full bg-white/50"></div>
        <div className="absolute top-6 right-2 h-0.5 w-0.5 animate-pulse rounded-full bg-white/40 delay-100"></div>
        <div className="absolute bottom-4 left-3 h-1 w-1 animate-pulse rounded-full bg-white/30 delay-200"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-3 2xl:p-4">
        {/* Icon container */}
        <div
          className={`relative mb-3 2xl:mb-4 flex h-14 w-14 2xl:h-18 2xl:w-18 items-center justify-center rounded-xl 2xl:rounded-2xl ${style.iconBg} ${style.iconHover} border border-white/20 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:border-white/30 group-hover:shadow-xl backdrop-blur-sm`}
        >
          <div className="absolute inset-0 rounded-xl 2xl:rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <Image
            src={icon}
            alt={altText}
            width={32}
            height={32}
            className="relative z-10 object-contain transition-all duration-300 group-hover:brightness-110 group-hover:contrast-110 2xl:w-[42px] 2xl:h-[42px]"
          />
        </div>
        
        {/* Skill name */}
        <h3
          className={`relative text-center text-sm 2xl:text-base font-semibold text-white/95 transition-all duration-300 group-hover:scale-105 group-hover:text-white ${style.textGlow} leading-tight tracking-wide`}
        >
          {skill}
        </h3>
        
        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-all duration-500 group-hover:w-4/5 group-hover:-translate-x-1/2"></div>
      </div>
      
      {/* Top right corner glow */}
      <div className="absolute top-0 right-0 h-8 w-8 2xl:h-10 2xl:w-10 bg-gradient-to-bl from-white/8 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      
      {/* Additional glassmorphism overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    </div>
  );
};

export default SkillList;