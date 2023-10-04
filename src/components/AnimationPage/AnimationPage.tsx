import cn from "classnames";
import { motion } from "framer-motion";
import * as React from "react";
import styles from "./AnimationPage.module.scss";

export type AnimationPageProps = {
  className?: string;
  children: React.ReactNode;
};

const AnimationPage: React.FC<AnimationPageProps> = ({
  className,
  children,
}) => {
  return (
    <motion.div
      className={cn(styles.page, className)}
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { delay: 3 } }}
    >
      {children}
    </motion.div>
  );
};

export default AnimationPage;
