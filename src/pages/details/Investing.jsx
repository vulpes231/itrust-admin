import React from "react";

import Formcontain from "./Formcontain";
import Admininput from "./Admininput";
import Divcontain from "./Divcontain";

const Investing = ({ user }) => {
  // console.log(user);
  return (
    <div className="capitalize ff font-medium text-xs flex flex-col gap-4 p-10 bg-white shadow-xl rounded-xl">
      <h5 className="text-xl">Investment Details</h5>
      <form action="">
        <Formcontain>
          <Divcontain>
            <label htmlFor="">currency</label>
            <Admininput placeHolder={user?.currency} />
          </Divcontain>
        </Formcontain>
      </form>
    </div>
  );
};

export default Investing;
