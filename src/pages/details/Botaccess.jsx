import React, { useEffect, useState } from "react";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { manageUserBot } from "../../features/userSlice";

const Botaccess = ({ user }) => {
  const dispatch = useDispatch();

  const [error, setError] = useState(false);

  const { manageBotLoading, manageBotError, manageBotSuccess } = useSelector(
    (state) => state.user
  );

  const handleBotAccess = (e) => {
    e.preventDefault();
    dispatch(manageUserBot(user.userId));
  };

  useEffect(() => {
    if (manageBotSuccess) {
      window.location.reload();
    }
  }, [manageBotSuccess]);

  useEffect(() => {
    if (manageBotError) {
      setError(manageBotError);
    }
  }, [manageBotError]);

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
        <p>Can use bot</p>
        <button
          onClick={handleBotAccess}
          disabled={manageBotLoading}
          className="flex items-center gap-2"
        >
          {manageBotLoading ? (
            <MdToggleOn className="text-slate-500 text-4xl" />
          ) : (
            <>
              {user?.botAccess ? (
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

export default Botaccess;
