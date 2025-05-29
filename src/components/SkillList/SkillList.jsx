import Image from "next/image";

const categoryStyles = {
  frontend: {
    from: "#2563eb", // Royal blue
    to: "#60a5fa", // Sky blue
  },
  backend: {
    from: "#764bbe", // Purple
    to: "#aea1f6", // Light purple
  },
  outils: {
    from: "#059669", // Emerald
    to: "#34d399", // Light emerald
  },
};

const SkillList = ({ skill, icon, altText, category }) => {
  const style = categoryStyles[category.toLowerCase()];

  return (
    <div
      className="group relative flex h-32 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg transition-all duration-300"
      style={{
        background: `linear-gradient(45deg, ${style.from}15, ${style.to}15)`,
        boxShadow: `0 0 20px ${style.from}10`,
      }}
    >
      {/* Hover gradient */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(45deg, ${style.from}25, ${style.to}25)`,
        }}
      />

      {/* Icon */}
      <div
        className="relative mb-2 flex h-12 w-12 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `linear-gradient(45deg, ${style.from}20, ${style.to}20)`,
        }}
      >
        <Image
          src={icon}
          alt={altText}
          width={36}
          height={36}
          className="object-contain"
        />
      </div>

      {/* Skill name */}
      <p
        className="relative mt-1 text-center text-sm font-medium text-white/90 transition-all duration-300 group-hover:scale-110 group-hover:text-white"
        style={{
          textShadow: `0 2px 8px ${style.from}40`,
        }}
      >
        {skill}
      </p>
    </div>
  );
};

export default SkillList;
