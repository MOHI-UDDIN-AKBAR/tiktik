import React from "react";

import styles from "../styles/indexPage/index.module.css";
import { footerList1 } from "../utils/iconsAndFooterContent";
import { footerList2 } from "../utils/iconsAndFooterContent";
import { footerList3 } from "../utils/iconsAndFooterContent";

interface IProps {
  list: string[];
}
const List = ({ list }: IProps) => {
  return (
    <div className={styles.section}>
      {list?.map((each) => (
        <div className={styles.each} key={each}>
          <span>{each}</span>
        </div>
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <div className={styles.footer}>
      <List list={footerList1} />
      <List list={footerList2} />
      <List list={footerList3} />
    </div>
  );
};

export default Footer;
