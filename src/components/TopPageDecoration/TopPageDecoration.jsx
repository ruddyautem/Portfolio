const TopPageDecoration = ({ filename }) => {
  return (
    <div className="flex h-12 items-center bg-gradient-to-r from-slate-800/50 to-slate-900/15 px-6">
      <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
        <span className="h-3 w-3 rounded-full bg-red-500/80"></span>
        <span className="h-3 w-3 rounded-full bg-yellow-500/80"></span>
        <span className="h-3 w-3 rounded-full bg-green-500/80"></span>
        <span className="ml-4 text-slate-500">
          {"//"} {filename}
        </span>
      </div>
    </div>
  );
};
export default TopPageDecoration;
