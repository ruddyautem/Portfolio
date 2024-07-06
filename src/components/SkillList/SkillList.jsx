import Image from "next/image";

const SkillItem = ({ skill, icon, altText }) => {
  return (
    <div
      className='bg-gray-600/20 h-16 flex justify-start items-center gap-2 py-4 rounded-md border border-transparent transition-all duration-300 hover:bg-gray-600/30 hover:border-accent hover:scale-105 overflow-hidden'
      key={skill}
    >
      <div className='flex justify-center items-center gap-2 m-2'>
        <div className='bg-[#242936]/50 w-10 h-10 rounded-md flex justify-center items-center flex-shrink-0'>
          <Image src={icon} alt={altText} height={28} width={28} />
        </div>
        <span className='text-sm md:text-base'>{skill}</span>
      </div>
    </div>
  );
};

export default SkillItem;
