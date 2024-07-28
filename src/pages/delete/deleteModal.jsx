import React, { useEffect } from "react";
import { MdWarning } from "react-icons/md";
import { useSelector } from "react-redux";

const DeleteModal = ({ close, deleteUser }) => {
  const { deleteLoading, deleteError, deleted } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (deleted) {
      window.location.reload();
    }
  }, [deleted]);
  return (
    <div className="top-4 right-2 absolute bg-white p-6 shadow flex flex-col gap-3 rounded-lg">
      <p className="flex items-center gap-2">
        <span>
          <MdWarning />
        </span>
        Confirm user deletion
      </p>
      <small className="text-red-500 font-thin">
        Note: This action is irreversible!
      </small>
      {deleteError && (
        <p className="text-xs font-thin text-red-500">{deleteError}</p>
      )}
      <div className="flex justify-between items-center">
        <button
          onClick={deleteUser}
          className="bg-purple-500 text-white py-2 px-4 rounded-3xl text-xs font-medium"
        >
          {!deleteLoading ? "Confirm" : "Wait..."}
        </button>
        <button
          onClick={close}
          className="border border-purple-500 text-purple-500 text-xs font-medium py-2 px-4 rounded-3xl"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
