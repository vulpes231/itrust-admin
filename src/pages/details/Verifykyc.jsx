import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../../utils/utilities";
import {
  approveVerification,
  getVerification,
  rejectVerification,
  resetApprove,
  resetReject,
} from "../../features/verifySlice";
import { format, parseISO } from "date-fns";
const Verifykyc = ({ user }) => {
  const dispatch = useDispatch();

  const {
    getReqLoading,
    getReqError,
    verifyRequest,
    approveError,
    approveLoading,
    approveSuccess,
    rejectError,
    rejectLoading,
    rejectSuccess,
  } = useSelector((state) => state.verify);

  // console.log(verifyRequest);
  const id = user?.userId;
  const accessToken = getAccessToken();

  let formattedDate;

  const dateValue = verifyRequest?.verificationRequest?.date;

  if (dateValue) {
    // Convert to Date object if it's not already one
    const dateObject =
      dateValue instanceof Date ? dateValue : parseISO(dateValue);

    try {
      formattedDate = format(dateObject, "yyyy/MM/dd");
    } catch (error) {
      console.error("Error formatting date:", error);
    }
  } else {
    console.warn("Date value is not available");
  }

  const handleApprove = (e) => {
    e.preventDefault();
    dispatch(approveVerification(id));
  };
  const handleReject = (e) => {
    e.preventDefault();
    dispatch(rejectVerification(id));
  };

  useEffect(() => {
    let timeout;
    if (approveSuccess) {
      timeout = 3000;

      setTimeout(() => {
        dispatch(resetApprove());
        window.location.reload();
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [approveSuccess]);

  useEffect(() => {
    let timeout;
    if (rejectSuccess) {
      timeout = 3000;

      setTimeout(() => {
        dispatch(resetReject());
        window.location.reload();
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [rejectSuccess]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getVerification(id));
    }
  }, [accessToken]);

  return (
    <div>
      {getReqError ? (
        <small className="text-slate-500">{getReqError}</small>
      ) : (
        <div className="flex flex-col gap-4 font-thin text-xs mt-5">
          <div className="flex justify-between items-center ">
            <span>date</span>
            <span>filepath</span>
            <span>status</span>
          </div>
          <div className="flex justify-between items-center">
            <small>{formattedDate}</small>
            <small>{verifyRequest?.verificationRequest?.passport}</small>
            <small>{verifyRequest?.verificationRequest?.status}</small>
          </div>
          {approveError && <p className="text-red-500">{approveError}</p>}
          {approveSuccess && (
            <p className="text-green-500">Verification approved.</p>
          )}
          {rejectError && <p className="text-red-500">{rejectError}</p>}
          {rejectSuccess && (
            <p className="text-red-500">Verification rejected.</p>
          )}
          <div className="flex items-center gap-3 ">
            <button
              onClick={handleApprove}
              disabled={user?.isKYCVerified}
              className={`bg-purple-500 text-white rounded-sm py-2.5 px-5 hover:border hover:border-purple-500 hover:text-purple-500 hover:bg-transparent capitalize`}
            >
              {!approveLoading ? "approve" : "Wait.."}
            </button>
            <button
              onClick={handleReject}
              disabled={user?.isKYCVerified}
              className="border border-purple-500 text-purple-500 rounded-sm py-2.5 px-5 capitalize"
            >
              {!rejectLoading ? "reject" : "Wait.."}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verifykyc;
