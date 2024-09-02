import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Personal from "./details/Personal";
import { MdClose } from "react-icons/md";
import Wallet from "./details/Wallet";
import queryString from "query-string";
import { getAccessToken } from "../utils/utilities";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../features/userSlice";

const Userdetails = ({ details, closeEdit }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = queryString.parse(location.search);

  const { detailsLoading, detailsError, userDetails } = useSelector(
    (state) => state.user
  );

  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  useEffect(() => {
    if (userId) {
      dispatch(getUserDetails(userId));
    }
  }, [userId]);

  return (
    <div className="bg-opacity-50 w-full h-full overflow-auto mt-20">
      <div className="p-6 flex flex-col gap-6 mb-10 lg:max-w-[900px] lg:mx-auto">
        <Personal user={userDetails} />
        <hr />
        <Wallet user={userDetails} userId={userId} />
      </div>
    </div>
  );
};

export default Userdetails;
