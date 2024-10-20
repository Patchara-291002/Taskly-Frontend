import LeftSideOverview from "./component/dashboarOverview/LeftSideOverview";
import Header from "./component/header";
import RightSideOverview from "./component/dashboarOverview/RightSideOverview";

export default function page() {
  return (
    <div
      className="
        w-full
        flex
        gap-[60px]
      "
    >
      <LeftSideOverview />
      <RightSideOverview />
    </div>
  );
}