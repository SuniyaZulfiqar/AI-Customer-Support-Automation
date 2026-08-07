function DashboardCard({ title, value, icon, color }) {
  return (
    <div
      className={`
        relative
        ${color}
        h-52
        rounded-3xl
        p-6
        shadow-xl
        overflow-hidden
        transition-all
        duration-300
        hover:scale-[1.03]
        hover:shadow-2xl
      `}
    >
      {/* Background Glow */}
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/10 rounded-full blur-2xl"></div>

      <div className="relative h-full flex justify-between items-center">

        <div className="flex flex-col justify-between h-full">

          <div>
            <p className="text-white/80 text-sm font-semibold uppercase tracking-wider">
              {title}
            </p>

            <h2 className="text-5xl font-extrabold text-white mt-3">
              {value}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span>

            <p className="text-white/80 text-sm">
              Live Data
            </p>
          </div>

        </div>

        <div className="bg-white/20 backdrop-blur-md w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl text-white text-4xl">
          {icon}
        </div>

      </div>

    </div>
  );
}

export default DashboardCard;