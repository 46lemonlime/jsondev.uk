// import routing
import { Link } from "react-router-dom";

// import styles
import styles from "../../../style";

// import global components
import Button from "../../../components/Button";

const ServicesCard = ({ img, name, title, content, link }) => {
  return (
    <div className="flex justify-between flex-col px-10 py-12 rounded-[20px] max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 service-card">
      <div className="flex flex-row justify-center">
        <img
          loading="lazy"
          src={img}
          alt={name}
          className="w-[96px] h-[96px]"
        />
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col mt-10">
          <h4 className={styles.heading4}>{name}</h4>
          <p className={`${styles.paragraph2} text-secondary`}>{title}</p>
        </div>
      </div>
      <p className={`${styles.paragraph} text-dimwhite mt-2 mb-8 text-start`}>
        {content}
      </p>
      <Link
        to={link}
        className={` ${styles.paragraph2} font-semibold bg-secondary-gradient rounded-[10px] px-[10px] text-center bg-secondary text-primary`}
      >
        See More
      </Link>
    </div>
  );
};

export default ServicesCard;
