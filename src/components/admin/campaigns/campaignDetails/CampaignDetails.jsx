import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import { useDispatch, useSelector } from "react-redux";
import Stats from "./Stats";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import {
  getCampaignEmailTemplateThunkMiddleware,
  getCampaignSmsTemplateThunkMiddleware,
  getCampaignWhatsappTemplateThunkMiddleware,
} from "../../../../redux/features/campaigns";
import Progress from "./Progress";
import { useMemo, useState } from "react";
import { LuMessageCircle } from "react-icons/lu";
import { CiFileOn } from "react-icons/ci";
import Prepare from "./Prepare";
import Process from "./Process";
import Finalize from "./Finalize";
import Reports from "./Reports";

const CampaignDetails = () => {

  const { campaignDetails } = useSelector(
    (state) => state.campaigns
  );

  console.log("campaign details ", campaignDetails)
  // console.log("campaign doccument count ", campaignDocCount)
  // // const { singleUser } = useSelector((state)=>state.campaings)

  // // const isDownloadSinglePdfReady = useMemo(
  // //   () => campaignDetails.isDownloadSinglePdfReady,
  // //   [campaignDetails]
  // // );

  // // const { uploadCampaignFileStatus } = useSelector((state) => state.progress);

  // // const isExcelPresent = useMemo(
  // //   () => campaignDetails.isExcelPresent,
  // //   [campaignDetails]
  // // );

  // // const isExcelValidated = useMemo(
  // //   () => campaignDetails.isExcelValidated,
  // //   [campaignDetails]
  // // );

  // // const isFilePresent = useMemo(() => {
  // //   return campaignCount.noOfFiles && campaignCount.noOfFiles !== 0
  // //     ? true
  // //     : false;
  // // }, [campaignDetails]);

  const isDataMappedCorrectly = useMemo(
    () => campaignDetails.isDataMappedCorrectly,
    [campaignDetails]
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendCampaignHandler = async () => {
    // if (isDataMappedCorrectly) {
    dispatch(
      getCampaignSmsTemplateThunkMiddleware(() => {
        navigate("sms");
      })
    );
    // }
  };

  const whatsappCampaignHandler = async () => {
    // if (isDataMappedCorrectly) {
    dispatch(
      getCampaignWhatsappTemplateThunkMiddleware(() => {
        navigate("whatsapp");
      })
    );
    // }
  };

  const bulkEmailCampaignHandler = async () => {
    // if (isDataMappedCorrectly) {
    dispatch(
      getCampaignEmailTemplateThunkMiddleware(() => {
        navigate("bulkemail");
      })
    );
    // }
  };


  // console.log(campaignDetails)

  return (
    <>
      <div className="h-[90vh] overflow-y-auto px-6 py-4 flex gap-2 md:gap-4 flex-col">
        <Topbar />
        <div className="py-2 space-y-4">
          <div>
            <Stats />
          </div>

          {/* changes made by abhyanshu */}
          <div className=" grid gap-4 grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
            <div className=" bg-white p-4 rounded-md col-span-2">
              <Prepare campaignType={campaignDetails.type} />
            </div>
            { campaignDetails.type === "mergeType" && (<div className=" bg-white p-4 rounded-md col-span-2 xl:col-span-1">
              <Process campaignType={campaignDetails.type} />
            </div>)}

            <div className="bg-white p-4 sm:p-8 rounded-md order-6 xl:order-none">
              <div
                className="h-full relative items-center flex-col justify-center gap-3 flex  bg-blue-100 px-3 py-4 cursor-pointer border border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300"
                onClick={bulkEmailCampaignHandler}
              >
                <BiMessageRoundedDetail size={32} />
                <h1 className=" text-center font-bold">
                  Bulk Email Campaign Excel
                </h1>
                {/* {(!isDataMappedCorrectly) && (
                  <>
                    <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full rounded-3xl bg-opacity-80"></div>
                  </>
                )} */}
              </div>
            </div>

            <div className="bg-white p-4 sm:p-8 rounded-md order-7 xl:order-none">
              <div
                className="h-full relative items-center flex-col justify-center gap-3 flex  bg-blue-100 px-3 py-4 cursor-pointer border border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300"
                onClick={sendCampaignHandler}
              >
                <BiMessageRoundedDetail size={32} />
                <h1 className=" text-center font-bold">SMS Campaign Excel</h1>
                {/* {(!isDataMappedCorrectly) && (
                  <>
                    <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full rounded-3xl bg-opacity-80"></div>
                  </>
                )} */}
              </div>
            </div>

            <div className=" bg-white p-4 rounded-md col-span-2">
              <Finalize campaignType={campaignDetails.type} />
            </div>
            <div className=" bg-white p-4 rounded-md col-span-2">
              <Reports campaignType={campaignDetails.type} />
            </div>

            <div className="bg-white p-4 sm:p-8 rounded-md">
              <div
                className="h-full items-center relative flex-col justify-center gap-3 flex  bg-blue-100 px-3 py-4 cursor-pointer border border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300"
                onClick={whatsappCampaignHandler}
              >
                <MdOutlineRemoveRedEye size={32} />
                <h1 className=" text-center font-bold">
                  Whatsapp Campaign Excel
                </h1>
                {/* {(!isDataMappedCorrectly) && (
                  <>
                    <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full rounded-3xl bg-opacity-80"></div>
                  </>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Progress campaignType={campaignDetails.type} />
      {/* <ProgressUpdateChecking/> */}
    </>
  );
};



export default CampaignDetails;


const TopScreenButton = ({ children, select = false, onClick = function () { } }) => {
  return <button className={"p-2 bg-white flex justify-center transition-all items-center" + (select ? ` rounded-t-md border-2 border-solid border-blue-600` : null)} onClick={onClick}>{children}</button>
}