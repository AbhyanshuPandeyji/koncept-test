import React, { memo } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCampaignByNameThunkMiddleware } from "../../../../redux/features/campaigns";

const Topbar = memo(() => { 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { campaignDetails } = useSelector((state) => state.campaigns);

  const refreshHandler = () => {
    dispatch(
      getCampaignByNameThunkMiddleware({ campaignName: campaignDetails.name })
    );
  };

  return (
    <div className=" flex flex-wrap items-center justify-between gap-4 bg-white px-4 py-2 rounded-md">
      <div className=" flex items-center flex-wrap gap-4">
        <button
          onClick={() => navigate("/campaigns")}
          className="w-fit flex items-center gap-1 buttonBackground px-2 py-1 rounded-md text-white font-semibold"
        >
          <IoMdArrowRoundBack size={26} />
        </button>
        <h1 className=" font-semibold text-xl">{campaignDetails?.name}</h1>
      </div>
      <div>
        <button
          onClick={refreshHandler}
          className="w-fit flex items-center gap-1 buttonBackground px-2 py-1 rounded-md text-white font-semibold"
        >
          Refresh
        </button>
      </div>
    </div>
  );
});

export default Topbar;
