import Image from "next/image";

const SkillList = ({ skill, icon, altText, category }) => {
  const categoryStyles = {
    frontend: {
      gradient: "from-blue-500/10 via-blue-400/5 to-transparent",
      hoverGradient:
        "hover:from-blue-500/20 hover:via-blue-400/10 hover:to-blue-300/5",
      border: "border-blue-500/20 hover:border-blue-400/40",
      glow: "hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]",
      iconBg: "bg-gradient-to-br from-blue-500/15 to-blue-600/10",
      iconHover: "group-hover:from-blue-400/25 group-hover:to-blue-500/20",
      textGlow: "group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]",
    },
    backend: {
      gradient: "from-purple-500/10 via-purple-400/5 to-transparent",
      hoverGradient:
        "hover:from-purple-500/20 hover:via-purple-400/10 hover:to-purple-300/5",
      border: "border-purple-500/20 hover:border-purple-400/40",
      glow: "hover:shadow-[0_0_30px_-5px_rgba(147,51,234,0.3)]",
      iconBg: "bg-gradient-to-br from-purple-500/15 to-purple-600/10",
      iconHover: "group-hover:from-purple-400/25 group-hover:to-purple-500/20",
      textGlow: "group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.6)]",
    },
    outils: {
      gradient: "from-emerald-500/10 via-emerald-400/5 to-transparent",
      hoverGradient:
        "hover:from-emerald-500/20 hover:via-emerald-400/10 hover:to-emerald-300/5",
      border: "border-emerald-500/20 hover:border-emerald-400/40",
      glow: "hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]",
      iconBg: "bg-gradient-to-br from-emerald-500/15 to-emerald-600/10",
      iconHover:
        "group-hover:from-emerald-400/25 group-hover:to-emerald-500/20",
      textGlow: "group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]",
    },
  };

  const style = categoryStyles[category.toLowerCase()];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br backdrop-blur-sm ${style.gradient} ${style.hoverGradient} ${style.border} ${style.glow} h-28 2xl:h-36 cursor-pointer transition-all duration-500 ease-out before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:before:opacity-100`}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute top-2 right-4 h-1 w-1 animate-pulse rounded-full bg-white/40"></div>
        <div className="absolute top-6 right-2 h-0.5 w-0.5 animate-pulse rounded-full bg-white/30 delay-100"></div>
        <div className="absolute bottom-4 left-3 h-1 w-1 animate-pulse rounded-full bg-white/20 delay-200"></div>
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-3 2xl:p-4">
        <div
          className={`relative mb-2 2xl:mb-4 flex h-12 w-12 2xl:h-16 2xl:w-16 items-center justify-center rounded-xl 2xl:rounded-2xl ${style.iconBg} ${style.iconHover} border border-white/10 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:border-white/20 group-hover:shadow-xl`}
        >
          <div className="absolute inset-0 rounded-xl 2xl:rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <Image
            src={icon}
            alt={altText}
            width={30}
            height={30}
            className="relative z-10 object-contain transition-all duration-300 group-hover:brightness-110 group-hover:contrast-110 2xl:w-[40px] 2xl:h-[40px]"
          />
        </div>
        <h3
          className={`relative text-center text-xs 2xl:text-sm font-semibold text-white/90 transition-all duration-300 group-hover:scale-105 group-hover:text-white ${style.textGlow} leading-tight tracking-wide`}
        >
          {skill}
        </h3>
        <div className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-500 group-hover:w-3/4 group-hover:-translate-x-1/2"></div>
      </div>
      <div className="absolute top-0 right-0 h-6 w-6 2xl:h-8 2xl:w-8 bg-gradient-to-bl from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    </div>
  );
};

export default SkillList;
