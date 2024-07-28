import React from "react";
import Personal from "./details/Personal";
import { MdClose } from "react-icons/md";
import Wallet from "./details/Wallet";

const Userdetails = ({ details, closeEdit }) => {
  return (
    <div className="fixed top-0 left-0 h-screen flex items-center justify-center bg-white bg-opacity-50 w-full overflow-auto">
      <div className="bg-white shadow rounded-md p-6 flex flex-col gap-6 mb-10">
        <div className="flex justify-end" onClick={closeEdit}>
          <MdClose />
        </div>
        <Personal user={details} />
        <hr />
        <Wallet user={details} />
      </div>
    </div>
  );
};

export default Userdetails;
