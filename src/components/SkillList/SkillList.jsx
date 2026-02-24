import Image from 'next/image';

const SkillList = ({ skill, icon, altText, category }) => {
  const categoryStyles = {
    frontend: {
      hoverBorder: 'hover:border-blue-400/60',
      hoverBg: 'hover:bg-blue-500/10',
      iconBoxBg: 'bg-blue-500/10',
      iconBorder: 'border-blue-500/20 group-hover:border-blue-400/50',
      shadowGlow: 'hover:shadow-[0_4px_20px_-4px_rgba(59,130,246,0.3)]',
      shimmerColor: 'via-blue-400/15',
      glowLine: 'via-blue-400/40',
    },
    backend: {
      hoverBorder: 'hover:border-purple-400/60',
      hoverBg: 'hover:bg-purple-500/10',
      iconBoxBg: 'bg-purple-500/10',
      iconBorder: 'border-purple-500/20 group-hover:border-purple-400/50',
      shadowGlow: 'hover:shadow-[0_4px_20px_-4px_rgba(147,51,234,0.3)]',
      shimmerColor: 'via-purple-400/15',
      glowLine: 'via-purple-400/40',
    },
    outils: {
      hoverBorder: 'hover:border-emerald-400/60',
      hoverBg: 'hover:bg-emerald-500/10',
      iconBoxBg: 'bg-emerald-500/10',
      iconBorder: 'border-emerald-500/20 group-hover:border-emerald-400/50',
      shadowGlow: 'hover:shadow-[0_4px_20px_-4px_rgba(16,185,129,0.3)]',
      shimmerColor: 'via-emerald-400/15',
      glowLine: 'via-emerald-400/40',
    },
  };

  const style = categoryStyles[category?.toLowerCase()] || categoryStyles.frontend;

  return (
    <div
      className={`item-animate group relative flex w-full flex-col items-center justify-center gap-3
        overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/40 p-4 text-center
        backdrop-blur-md transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1
        active:scale-[0.98] ${style.hoverBorder} ${style.hoverBg} ${style.shadowGlow}`}
    >
      {/* Shimmer sweep */}
      <div
        className={`pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r
          from-transparent ${style.shimmerColor} to-transparent opacity-0 transition-none
          group-hover:translate-x-full group-hover:opacity-100 group-hover:transition-all
          group-hover:duration-600 group-hover:ease-in-out`}
      />

      {/* Top glass highlight */}
      <div
        className="pointer-events-none absolute top-0 left-0 h-px w-full bg-linear-to-r
          from-transparent via-white/12 to-transparent opacity-0 transition-opacity duration-300
          group-hover:opacity-100"
      />

      {/* Bottom glow line */}
      <div
        className={`pointer-events-none absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2
          bg-linear-to-r from-transparent ${style.glowLine} to-transparent transition-all
          duration-500 group-hover:w-3/4`}
      />

      {/* Icon Container */}
      <div
        className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg
          border backdrop-blur-sm transition-all duration-300 group-hover:scale-110
          group-hover:-translate-y-1 ${style.iconBoxBg} ${style.iconBorder}`}
      >
        <div
          className="absolute inset-0 rounded-lg bg-linear-to-b from-white/10 to-transparent
            opacity-40 transition-opacity duration-300 group-hover:opacity-70"
        />
        <Image
          src={icon}
          alt={altText}
          width={24}
          height={24}
          className="relative z-10 h-6 w-6 object-contain transition-all duration-300
            group-hover:brightness-110"
        />
      </div>

      {/* Text */}
      <h3
        className="relative z-10 w-full truncate text-sm font-medium text-slate-300
          transition-colors duration-300 group-hover:text-white leading-tight"
      >
        {skill}
      </h3>
    </div>
  );
};

export default SkillList;
