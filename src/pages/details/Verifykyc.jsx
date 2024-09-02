import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../../utils/utilities";
import { getVerification } from "../../features/verifySlice";

const Verifykyc = ({ user }) => {
  const dispatch = useDispatch();

  const { getReqLoading, getReqError, verifyRequest } = useSelector(
    (state) => state.verify
  );

  //   console.log(verifyRequest);
  const id = user?.userId;
  const accessToken = getAccessToken();

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
        <div>{/* <span>{ }</span> */}</div>
      )}
    </div>
  );
};

export default Verifykyc;
