import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">
      <Skeleton height={20} width={120} />
      <Skeleton height={45} width={80} className="mt-4" />
      <Skeleton height={15} className="mt-4" />
    </div>
  );
}

export default SkeletonCard;