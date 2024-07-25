import React, { useMemo, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  createCampaignShortLinkThunkMiddleware,
  createMergeCampaignShortLinkThunkMiddleware,
  downloadCampaignFilesThunkMiddleware,
  downloadCampaignSinglePdfFileThunkMiddleware,
  downloadCampaignSinglePdfThunkMiddleware,
  downloadDocumentCampaignFilesThunkMiddleware,
} from "../../../../redux/features/campaigns";
import { useNavigate } from "react-router-dom";

const Finalize = ({ campaignType }) => {
  const dispatch = useDispatch();

  const { campaignDetails } = useSelector(
    (state) => state.campaigns
  );

  const { downloadCampaignFileStatus } = useSelector((state) => state.progress);

  const isFilePresent = useMemo(() => {
    return campaignDetails.pdfsUploaded && campaignDetails.pdfsUploaded !== "0"
      ? true
      : false;
  }, [campaignDetails])

  const isDownloadSinglePdfReady = useMemo(
    () => campaignDetails.isDownloadSinglePdfReady,
    [campaignDetails]
  );

  const isDataMappedCorrectly = useMemo(
    () => campaignDetails.isDataMappedCorrectly,
    [campaignDetails]
  );

  const createShortLinkHandler = () => {
    if (isDataMappedCorrectly) {
      dispatch(
        createCampaignShortLinkThunkMiddleware({
          campaignName: campaignDetails.name,
          // campaignType: campaignType,
        })
      );
    }
  };

  const createMergeShortLinkHandler = () => {
    // if (isDataMappedCorrectly) {
    dispatch(
      createMergeCampaignShortLinkThunkMiddleware({
        campaignName: campaignDetails.name,
        // campaignType: campaignType,
      })
    );
    // }
  };

  const downloadFilesHandler = () => {
    if (isFilePresent && !downloadCampaignFileStatus) {
      dispatch(
        downloadCampaignFilesThunkMiddleware({
          campaignName: campaignDetails.name,
          campaignType: campaignType,
        })
      );
    }
  };

  const downloadDocxFilesHandler = () => {
    // if (isFilePresent && !downloadCampaignFileStatus) {
    dispatch(
      downloadDocumentCampaignFilesThunkMiddleware({
        campaignName: campaignDetails.name,
      })
    );
    // }
    // console.log("document Handler")
  };

  // const downloadSingleFileHandler = () => {
  //   if (isDownloadSinglePdfReady) {
  //     dispatch(
  //       downloadCampaignSinglePdfThunkMiddleware({
  //         campaignName: campaignDetails.name,
  //         campaignType: campaignType,
  //       })
  //     );
  //   }
  // };

  // const navigate = useNavigate();

  const downloadSinglePdfFileHandler = () => {
    // if (isDownloadSinglePdfReady) {
    dispatch(
      downloadCampaignSinglePdfFileThunkMiddleware({
        campaignName: campaignDetails.name,
      })
    );
  };



  return (
    <div className="flex flex-col justify-between h-full">
      <div className=" grid grid-cols-2 sm:grid-cols-4 gap-2">
        {
          campaignType === "pdfType" &&
          (<div
            onClick={downloadFilesHandler}
            className={`relative flex items-center justify-center flex-col gap-3 bg-blue-100 px-3 py-4 cursor-pointer border border-gray-700 rounded-3xl group hover:scale-105 transition-all duration-300 overflow-hidden`}
          >
            <MdCloudUpload size={32} />
            <h1 className=" text-center font-semibold mt-auto">
              Download All PDFS
            </h1>

            {(!isFilePresent || downloadCampaignFileStatus || !isDataMappedCorrectly) && (
              <>
                <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
              </>
            )}
          </div>)
        }

        {campaignType === "mergeType" && (<div
          onClick={downloadDocxFilesHandler}
          className={`relative flex items-center justify-center flex-col gap-3 bg-blue-100 px-3 py-4 cursor-pointer border border-gray-700 rounded-3xl group hover:scale-105 transition-all duration-300 overflow-hidden`}
        >
          <MdCloudUpload size={32} />
          <h1 className=" text-center font-semibold mt-auto">
            Download All Documents
          </h1>

          {/* {(!isFilePresent || downloadCampaignFileStatus) && (
            <>
              <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
            </>
          )} */}
        </div>)}

        {/* <div className=" flex items-center justify-center flex-col gap-3 bg-blue-100 px-3 py-4 cursor-pointer border border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300">
          <MdCloudUpload size={32} />
          <h1 className=" text-center font-semibold mt-auto">
            Export to Excel
          </h1>
        </div> */}

        {/* <div
          onClick={downloadSingleFileHandler}
          className={`relative flex items-center justify-center flex-col gap-3 bg-blue-100 px-3 py-4 cursor-pointer border border-gray-700 rounded-3xl group hover:scale-105 transition-all duration-300 overflow-hidden`}
        >
          <MdCloudUpload size={32} />
          <h1 className=" text-center font-semibold mt-auto">
            Download in Single PDF
          </h1>

          {!isDownloadSinglePdfReady && (
            <>
              <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
            </>
          )}
        </div> */}
        {campaignType === "mergeType" && (<div
          onClick={downloadSinglePdfFileHandler}
          className={`relative flex items-center justify-center flex-col gap-3 bg-blue-100 px-3 py-4 cursor-pointer border border-gray-700 rounded-3xl group hover:scale-105 transition-all duration-300 overflow-hidden`}
        >
          <MdCloudUpload size={32} />
          <h1 className=" text-center font-semibold mt-auto">
            Download Single PDF
          </h1>

          {/* {!isDownloadSinglePdfReady && (
            <>
              <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
            </>
          )} */}
        </div>)}
        {campaignType === "pdfType" && (<div
          onClick={createShortLinkHandler}
          className={`relative flex items-center justify-center flex-col gap-3 bg-blue-100 px-3 py-4 cursor-pointer border border-gray-700 rounded-3xl group hover:scale-105 transition-all duration-300 overflow-hidden`}
        >
          <MdCloudUpload size={32} />
          <h1 className=" text-center font-semibold mt-auto">
            Create ShortLink
          </h1>

          {!isDataMappedCorrectly && (
            <>
              <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
            </>
          )}
        </div>)}

        { campaignType === "mergeType" && (<div
          onClick={createMergeShortLinkHandler}
          className={`relative flex items-center justify-center flex-col gap-3 bg-blue-100 px-3 py-4 cursor-pointer border border-gray-700 rounded-3xl group hover:scale-105 transition-all duration-300 overflow-hidden`}
        >
          <MdCloudUpload size={32} />
          <h1 className=" text-center font-semibold mt-auto">
            Create ShortLink
          </h1>

          {!isDataMappedCorrectly && (
            <>
              <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
            </>
          )}
        </div>)}
      </div>
      <h1 className=" font-bold text-xl text-center pt-6">Finalize</h1>
    </div>
  );
};

export default Finalize;
