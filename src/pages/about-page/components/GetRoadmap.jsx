import { notionBlack } from "../../../assets";

const GetRoadmap = ({ styles }) => (
  <button
    type="button"
    className={`flex flex-row items-center py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-secondary-gradient rounded-[10px] outline-none ${styles} rounded-[10px]`}
    onClick={() =>
      window.open(
        "https://juicy-resolution-f28.notion.site/My-CS-Journey-56da4e6378854b02a0dda599d55d633d"
      )
    }
  >
    Get Roadmap
    <img
      src={notionBlack}
      alt="notionBlack"
      className="w-[28px] h-[28px] object-contain ml-2"
    />
  </button>
);

export default GetRoadmap;
