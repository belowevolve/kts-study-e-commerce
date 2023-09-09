import * as React from "react";
import PageLabel from "components/PageLabel";
// import styles from "./User.module.scss";

export type UserProps = {};

const User: React.FC<UserProps> = ({}) => {
  return (
    <div>
      <PageLabel title="User" description="Under maintenance"></PageLabel>
    </div>
  );
};

export default User;
