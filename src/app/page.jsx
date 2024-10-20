import LeftSideOverview from "./component/LeftSideOverview";
import Header from "./component/header";
import RightSideOverview from "./component/RightSideOverview";

export default function page() {
  return (
    <div
      className="
        w-full
        flex
        gap-[60px]
        pb-[20px]
      "
    >
      <LeftSideOverview />
      <RightSideOverview />
    </div>
  );
}