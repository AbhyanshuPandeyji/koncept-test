import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addCampaignThunkMiddleware,
  getAllCampaignThunkMiddleware,
} from "../../../redux/features/campaigns";
import Spinner from "../../common/Spinner";
import { Select } from "antd";

const AddCampaign = ({ modal, toggle }) => {
  const [campaignName, setCampaignName] = useState("");
  const [selectedCampaignType, setSelectedCampaignType] = useState("");

  const dispatch = useDispatch();
  const { addLoader } = useSelector((state) => state.loaders);
  const { singleUser } = useSelector((state) => state.campaigns);
  // console.log(singleUser);

  const campaignType = [
    {
      lable: "PDF",
      value: "pdfType"
    },
    {
      lable: "Merge",
      value: "mergeType"
    }
  ];

  const uploadHandler = (e) => {
    e.preventDefault();
    dispatch(
      addCampaignThunkMiddleware({
        campaignName, accountId: singleUser.accountId,
        campaignType: selectedCampaignType
      }, (error) => {
        if (!error) {
          toggle();
          setCampaignName("");
          setSelectedCampaignType("");
          // dispatch(getUserAllCampaignThunkMiddleware({ accountId : singleUser.accountId }));
        }
      })
    );

  };

  const handleSelectedCampaignType = (value) => {
    // event.preventDefault();
    setSelectedCampaignType(value);
    console.log(value)
  }




  return (
    <div
      className={` ${modal ? "fixed" : "hidden"
        } fixed top-0 left-0 w-[100%] h-[100%] z-40 flex  justify-center`}
    >
      {/* OverLay  */}
      <div className="absolute w-[100%] h-[100%] bg-black opacity-25"></div>

      {/* Conetnt  */}
      <div className=" bg-white rounded-lg w-[90%] md:w-[60%]  p-2 absolute z-10  mt-10">
        {/* Model Header  */}
        <div className="modelHeadingBackground p-3 border-blue-800 rounded flex items-center justify-between">
          <h1 className="text-white text-xl font-semibold">Add Campaign</h1>
          <span className=" text-black text-xl cursor-pointer" onClick={toggle}>
            <MdOutlineClose />
          </span>
        </div>

        {/* Modal Body  */}
        <div className="px-2 py-1  my-2 h-[100%] border-purple-800 rounded">
          <form onSubmit={uploadHandler} className=" space-y-3" id="myForm">
            <div className="flex flex-col gap-1 rounded">
              <label htmlFor="" className="text-sm font-semibold">
                Campaign Name
              </label>
              <input
                type="text"
                className="border-2 rounded p-1 flex-1 focus:ring-2 focus:ring-purple-800 outline-none"
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1 rounded">
              <label htmlFor="" className="text-sm font-semibold">
                Campaign Type
              </label>
              <Select
                placeholder="Select An Option"
                className="focus:ring-2 h-[40px] focus:ring-purple-800 outline-none"
                options={campaignType?.map((option) => ({ label: option.lable, value: option.value }))}
                onChange={(value) => handleSelectedCampaignType(value)}
              // disabled={inputMethods[itemIndex] === 'input'}
              />
            </div>

            <div className=" py-4">
              <button
                type="submit"
                className="p-3 rounded modelHeadingBackground text-white font-bold hover:bg-transparenttransition-all duration-300 w-full"
                disabled={addLoader}
              >
                {addLoader ? <Spinner /> : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCampaign;
