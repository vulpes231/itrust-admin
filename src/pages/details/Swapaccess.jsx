import React, { useEffect, useState } from "react";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { manageSwapAccess } from "../../features/userSlice";

const Swapaccess = ({ user }) => {
  const dispatch = useDispatch();

  const [error, setError] = useState(false);

  const { manageSwapLoading, manageSwapError, manageSwapSuccess } = useSelector(
    (state) => state.user
  );

  const handleSwapAccess = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(manageSwapAccess(user.userId));
  };

  useEffect(() => {
    if (manageSwapSuccess) {
      console.log("yes");
      window.location.reload();
    }
  }, [manageSwapSuccess]);

  useEffect(() => {
    if (manageSwapError) {
      setError(manageSwapError);
    }
  }, [manageSwapError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = 4000;
      setTimeout(() => {
        setError(false);
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <div className="flex flex-col border border-slate-200 p-4 rounded-md ">
      <div className="flex justify-between items-center">
        <p>Can swap</p>
        <button
          onClick={handleSwapAccess}
          disabled={manageSwapLoading}
          className="flex items-center gap-2"
        >
          {manageSwapLoading ? (
            <MdToggleOn className="text-slate-500 text-4xl" />
          ) : (
            <>
              {user?.swapAccess ? (
                <MdToggleOn className="text-green-500 text-4xl" />
              ) : (
                <MdToggleOff className="text-slate-500 text-4xl" />
              )}
            </>
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Swapaccess;
