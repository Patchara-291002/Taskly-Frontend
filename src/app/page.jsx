import BannerOverview from "./component/dashboarOverview/BannerOverview";
import ProjectOverview from "./component/dashboarOverview/ProjectOverview";

export default function page() {
  return (
    <div
      className="
        w-full
      "
    >
      <div
        className="
            max-w-[700px]
          "
      >
        <div>
          <BannerOverview />
        </div>
        <div
          className="
            mt-[68px]
          "
        >
          <ProjectOverview />
        </div>
      </div>
    </div>
  );
}