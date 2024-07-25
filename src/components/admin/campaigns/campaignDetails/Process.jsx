import React, { useMemo } from "react";
import { MdCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createDocumentsThunkMiddleware, deleteCreatedDocumentsFilesThunkMiddleware, deleteSamplePdfsFilesThunkMiddleware, startSamplePdfThunkMiddleware, startSingleCampaignPdfTemplateThunkMiddleware } from "../../../../redux/features/campaigns";
import { IoReloadCircle } from "react-icons/io5";
const Process = ({ campaignType }) => {
  const dispatch = useDispatch();
  const { campaignDetails } = useSelector((state) => state.campaigns);

  const isDownloadSinglePdfReady = useMemo(
    () => campaignDetails.isDownloadSinglePdfReady,
    [campaignDetails]
  );

  const isSamplePdfsFilesPresent = useMemo(() => {
    return campaignDetails.progressSampleMerging && (Number.parseInt(campaignDetails.progressSampleMerging) !== 0) ? true : false
  }, [campaignDetails]);


  const isCreateDocumentFilesPresent = useMemo(() => {
    return campaignDetails.progressMainMerging && (Number.parseInt(campaignDetails.progressMainMerging) !== 0) ? true : false
  }, [campaignDetails]);
  // console.log("is sample pdfs uploaded ", isSamplePdfsFilesPresent);
  // console.log("is sample pdfs uploaded ", Number.parseInt(campaignDetails.progressSampleMerging) !== 0);
  // console.log("is sample pdfs uploaded ", campaignDetails.progressSampleMerging !== null);


  // const { uploadCampaignFileStatus } = useSelector((state) => state.progress);

  // const isExcelPresent = useMemo(
  //   () => campaignDetails.isExcelPresent,
  //   [campaignDetails]
  // );

  // const isExcelValidated = useMemo(
  //   () => campaignDetails.isExcelValidated,
  //   [campaignDetails]
  // );

  // const isFilePresent = useMemo(() => {
  //   return campaignCount.noOfFiles && campaignCount.noOfFiles !== 0
  //     ? true
  //     : false;
  // }, [campaignDetails]);

  const isDataMappedCorrectly = useMemo(
    () => campaignDetails.isDataMappedCorrectly,
    [campaignDetails]
  );

  const startSinglePdfHandler = () => {
    // if (!isDownloadSinglePdfReady)
    dispatch(
      startSingleCampaignPdfTemplateThunkMiddleware({
        campaignName: campaignDetails.name,
        campaignType: campaignType,
      })
    );
  };

  const startSamplePdfHandler = () => {
    if (!isSamplePdfsFilesPresent || isDataMappedCorrectly) {
      dispatch(
        startSamplePdfThunkMiddleware({ campaignName: campaignDetails.name, campaignType: campaignType })
      )
    }
  }

  const createDocumentsHandler = () => {
    // if (!isDownloadSinglePdfReady)
    dispatch(
      createDocumentsThunkMiddleware({
        campaignName: campaignDetails.name,
      })
    );
    console.log("create single pdf")
  };

  const deleteSamplePdfsFilesHandler = () => {
    if (isSamplePdfsFilesPresent) {
      dispatch(deleteSamplePdfsFilesThunkMiddleware({ campaignName: campaignDetails.name }))
    }
  }

  const deleteDocumentFilesHandler = () => {
    if (isCreateDocumentFilesPresent) {
      dispatch(deleteCreatedDocumentsFilesThunkMiddleware({ campaignName: campaignDetails.name }))
    }
  }



  return (
    <div className="flex flex-col justify-between h-full">
      <div className=" grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-2 gap-2">
        {/* {
          campaignType === "pdfType" &&
          (
            <>
              <div
                onClick={startSinglePdfHandler}
                className={`relative flex items-center justify-center flex-col gap-3 bg-blue-100 px-3 py-4 cursor-pointer border border-gray-700 rounded-3xl group hover:scale-105 transition-all duration-300 overflow-hidden`}
              >
                <MdCloudUpload size={32} />
                <h1 className=" text-center font-semibold mt-auto">
                  Start Single Pdf Excel
                </h1>

                {isDownloadSinglePdfReady && (
                  <>
                    <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
                  </>
                )}
              </div>
            </>
          )
        } */}

        {
          campaignType === "mergeType" &&
          (
            <>
              <div
                onClick={!isDataMappedCorrectly || isSamplePdfsFilesPresent ? () => { } : startSamplePdfHandler}
                className={`relative flex items-center justify-center flex-col gap-3 bg-blue-100 px-3 py-4 cursor-pointer border border-gray-700 rounded-3xl group hover:scale-105 transition-all duration-300 overflow-hidden`}
              >
                <MdCloudUpload size={32} />
                <h1 className=" text-center font-semibold mt-auto">
                  Start Sample PDFs
                </h1>
                {/* {(!isSamplePdfsFilesPresent) && (  
                      <>
                        {isSamplePdfsFilesPresent && ( */}
                {/* <div className="absolute top-2 right-2 z-20">
                  <figure
                    className={`text-red-600 font-bold  -translate-y-10 transition-all duration-300 group-hover:translate-y-0`}
                    onClick={deleteSamplePdfsFilesHandler}
                  >
                    <IoReloadCircle size={30} />
                  </figure>
                </div> */}
                {
                  (!isDataMappedCorrectly || isSamplePdfsFilesPresent) && (
                    <>
                      {
                        isSamplePdfsFilesPresent && (
                          <div className="absolute top-2 right-2 z-20">
                            <figure
                              className={`text-red-600 font-bold  -translate-y-10 transition-all duration-300 group-hover:translate-y-0`}
                              onClick={deleteSamplePdfsFilesHandler}
                            >
                              <IoReloadCircle size={30} />
                            </figure>
                          </div>
                        )
                      }
                      <div className="absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
                    </>
                  )
                }
                {/* {
                  (isSamplePdfsFilesPresent)
                } */}
                {/* )}
                        <div className="absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
                      </>
                    )} */}

                {/* {isDownloadSinglePdfReady && (
                  <>
                    <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
                  </>
                )} */}
              </div>
              {/* <button className="bg-red-500 p-4 rounded-2xl" onClick={deleteSamplePdfsFilesHandler} >Delete Pdfs</button> */}
              <div
                // onClick={createDocumentsHandler}
                onClick={!isDataMappedCorrectly || isCreateDocumentFilesPresent ? () => { } : createDocumentsHandler}
                className={`relative flex items-center justify-center flex-col gap-3 bg-blue-100 px-3 py-4 cursor-pointer border border-gray-700 rounded-3xl group hover:scale-105 transition-all duration-300 overflow-hidden`}
              >
                <MdCloudUpload size={32} />
                <h1 className=" text-center font-semibold mt-auto">
                  Create Documents
                </h1>

                {
                  (!isDataMappedCorrectly || isCreateDocumentFilesPresent) && (
                    <>
                      {
                        isCreateDocumentFilesPresent && (
                          <div className="absolute top-2 right-2 z-20">
                            <figure
                              className={`text-red-600 font-bold  -translate-y-10 transition-all duration-300 group-hover:translate-y-0`}
                              onClick={deleteDocumentFilesHandler}
                            >
                              <IoReloadCircle size={30} />
                            </figure>
                          </div>
                        )
                      }
                      <div className="absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
                    </>
                  )
                }
                {/* {isDownloadSinglePdfReady && (
            <>
              <div className=" absolute top-0 left-0 bg-gray-100 w-full h-full bg-opacity-80"></div>
            </>
          )} */}
              </div>
            </>
          )
        }
      </div>
      <h1 className=" font-bold text-xl text-center pt-6">Process</h1>
    </div>
  );
};

export default Process;
