import React, { useMemo } from "react";
import { MdCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadCampaignModifyExcelThunkMiddleware,
  getAllCampaignReportsThunkMiddleware,
  getCampaignByNameThunkMiddleware,
  viewCampaignDocumentThunkMiddleware,
} from "../../../../redux/features/campaigns";
import { Link, useNavigate } from "react-router-dom";

const Reports = ({ campaignType }) => {

  const { campaignDetails } = useSelector(
    (state) => state.campaigns
  );

  const isDownloadSinglePdfReady = useMemo(
    () => campaignDetails.isDownloadSinglePdfReady,
    [campaignDetails]
  );

  const { uploadCampaignFileStatus, downloadCampaignFileStatus } = useSelector((state) => state.progress);

  const isExcelPresent = useMemo(
    () => campaignDetails.isExcelPresent,
    [campaignDetails]
  );

  const isExcelValidated = useMemo(
    () => campaignDetails.isExcelValidated,
    [campaignDetails]
  );

  const isFilePresent = useMemo(() => {
    return campaignDetails.pdfsUploaded && campaignDetails.pdfsUploaded !== "0"
      ? true
      : false;
  }, [campaignDetails])

  const isDataMappedCorrectly = useMemo(
    () => campaignDetails.isDataMappedCorrectly,
    [campaignDetails]
  );

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const downloadModifyExcelHandler = () => {
    // if (isDataMappedCorrectly) {
    dispatch(
      downloadCampaignModifyExcelThunkMiddleware({
        campaignName: campaignDetails.name,
      })
    );
    // }
  };

  // const viewDocumentHandler = () => {
  //   dispatch(
  //     viewCampaignDocumentThunkMiddleware({
  //       campaignName: campaignDetails.name,
  //     })
  //   );
  // };

  const viewAllCampaignReportsHanlder = () => {
    // if (isDataMappedCorrectly) {

    // dispatch(
    //   getAllCampaignReportsThunkMiddleware({
    //     campaignName: campaignDetails.name,
    //   }, () => {
    //     navigate("/campaigns/campaigndetails/reports")
    //   })
    // );
    // }
    navigate("/campaigns/campaigndetails/reports")
    // navigate("/campaigns/campaigndetails/reports");
  };

  const downloadByCategory = () => {
    console.log("download documents by category")
    dispatch(
      getCampaignByNameThunkMiddleware({
        campaignName: campaignDetails.name,
      }, () => {
        navigate("/campaigns/documentscategorydownload")
      })
    );
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div className=" grid grid-cols-2 sm:grid-cols-4 gap-2">
        {/* { campaignType === "mergeType"  && (<div
          onClick={viewDocumentHandler}
          className=" flex items-center justify-center flex-col gap-3 bg-blue-100 px-3 py-4 cursor-pointer border border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300"
        >
          <MdCloudUpload size={32} />
          <h1 className=" text-center font-semibold mt-auto">View Document</h1>
        </div>)} */}

        <div
          onClick={downloadModifyExcelHandler}
          className={`relative flex items-center justify-center flex-col gap-3 bg-blue-100 px-3 py-4 cursor-pointer border border-gray-700 rounded-3xl group hover:scale-105 transition-all duration-300 overflow-hidden`}
        >
          <MdCloudUpload size={32} />
          <h1 className=" text-center font-semibold mt-auto">
            Download Modify Excel
          </h1>
          {/* original condition */}
          {/* {(!isFilePresent || downloadCampaignFileStatus) && (
            <>
              <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
            </>
          )} */}
          {/* {(!isDataMappedCorrectly) && (
            <>
              <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
            </>
          )} */}
          {/* // changes made by abhyanshu */}
          {/* {!isDownloadSinglePdfReady && (
            <>
              <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
            </>
          )} */}
        </div>
        <div
          onClick={viewAllCampaignReportsHanlder}
          className="relative flex items-center justify-center flex-col gap-3 bg-blue-100 px-3 py-4 cursor-pointer border border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300"
        >
          <MdCloudUpload size={32} />
          <h1 className=" text-center font-semibold mt-auto">All Campaign Report</h1>
          {/* {(!isDataMappedCorrectly) && (
            <>
              <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full rounded-3xl bg-opacity-80"></div>
            </>
          )} */}
        </div>
        {campaignType === "mergeType" && (<div
          onClick={downloadByCategory}
          className="relative flex items-center justify-center flex-col gap-3 bg-blue-100 px-3 py-4 cursor-pointer border border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300"
        >
          <MdCloudUpload size={32} />
          <h1 className=" text-center font-semibold mt-auto">Download All Category Documents</h1>
          {/* {(!isDataMappedCorrectly) && (
            <>
              <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full rounded-3xl bg-opacity-80"></div>
            </>
          )} */}
        </div>)}
      </div>
      <h1 className=" font-bold text-xl text-center pt-6">Reports</h1>
    </div>
  );
};

export default Reports;
