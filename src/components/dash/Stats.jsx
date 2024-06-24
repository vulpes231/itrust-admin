import React from "react";
import Box from "./Box";
import {} from "react-icons/fa";
import { FaUserGroup, FaBoxArchive } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";

const Stats = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Box icon={<FaUserGroup />} title={"users"} value={0} />
      <Box icon={<FaBoxArchive />} title={"transactions"} value={0} />
      <Box icon={<MdAdminPanelSettings />} title={"admins"} value={0} />
    </div>
  );
};

export default Stats;
