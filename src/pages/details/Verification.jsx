import React from "react";

const Verification = ({ user }) => {
  return (
    <div className="capitalize font-medium text-xs flex flex-col gap-4 p-10 bg-white shadow-xl rounded-xl">
      <h5 className="text-xl">Verifications</h5>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
          <p>Email verified</p>
          <small
            className={!user?.emailVerified ? "text-red-500" : "text-green-500"}
          >
            {user?.emailVerified ? "true" : "false"}
          </small>
        </div>
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
          <p>KYC verified</p>
          <small className={!user?.kyc ? "text-red-500" : "text-green-500"}>
            {user?.kyc ? "true" : "false"}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Verification;
