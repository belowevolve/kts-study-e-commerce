import * as React from "react";
import PageLabel from "components/PageLabel";
import styles from "./About.module.scss";

export type AboutProps = {};

const About: React.FC<AboutProps> = ({}) => {
  return (
    <div>
      <PageLabel title="About Us" description="Some sample info"></PageLabel>
    </div>
  );
};

export default About;
