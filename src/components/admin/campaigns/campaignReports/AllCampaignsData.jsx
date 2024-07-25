import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CampaignTopBar from "./CampaignTopBar";

// changes by devankar
// import AllCampaignsSidebar from "./AllCampaignsSidebar.jsx";
import AllCampaignsSidebar from "./AllCampaignsSidebar1";
import { getAllCampaignReportsThunkMiddleware } from "../../../../redux/features/campaigns";
import Loader from "../../../common/Loader";
// import { getAllCampaignThunkMiddleware } from "../../../../redux/features/campaigns";
// import { gettingCampaignDetailsData } from "../../../../redux/features/campaigns";

const AllCampaignsData = () => {
  const dispatch = useDispatch();
  const { campaignDetails, campaignReports } = useSelector((state) => state.campaigns);
  // console.log(campaignDetails)
  // console.log(campaignDetails.name)
  useEffect(() => {
    dispatch(getAllCampaignReportsThunkMiddleware({ campaignName: campaignDetails.name }))
  }, [dispatch , campaignDetails]);

  // const { dummyCount } = useSelector((state)=>state.campaigns)

  // const refreshCampaignData = () => {
  //   console.log("REFRESHED");
  //   dispatch(getCampaignByNameThunkMiddleware({ campaignName :  campaignDetails.name}));
  // };



  // useEffect(() => {

  // useEffect(() => {

  //   // if (campaignDetails.name) {
  //   //   const response = dispatch(gettingCampaignDetailsData({ campaignName: campaignDetails.name }))
  //   //   console.log(response.data);
  //   // }

  // }, [
  //   dispatch, campaignDetails.name, campaignDetails
  //   // dispatch
  // ])

  // const handleClick = async () => {
  //   if (campaignDetails.name) {
  //     try {
  //       const response = await dispatch(gettingCampaignDetailsData({ campaignName: campaignDetails.name }));
  //       console.log(response.campaignDetails); // This should now show the fetched data
  //       setData(response.campaignDetails);
  //     } catch (error) {
  //       console.error("Failed to fetch campaign details:", error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   // if (campaignDetails.name) {
  //   //   handleClick();
  //   // }
  // }, [campaignDetails]);

  //   setData(campaignDetails)
  // }, [data, campaignDetails]);

  useEffect(() => {
    // console.log("campaign details in the main component top level " ,  campaignDetails)

    // console.log("campaign Reports  whatscampaings", campaignReports.insideWhatsAppCampaign)
    // console.log("campaign Reports  sms", campaignReports.insideSmsCampaigns)
    // console.log("campaign reports" , campaignReports)
    // if(campaignReports){
    //   console.log("campaign reports whatsapp campaign" , campaignReports[0]?.insideWhatsAppCampaign)
    // }

  }, [campaignReports, campaignDetails]);

  // console.log("campaign details in the main component top level non useEffect   " ,  campaignDetails)
  // console.log("count value in top level component " , dummyCount)

  // console.log("campaign Reports  whatscampaings", campaignReports[0]?.insideWhatsAppCampaign)
  // console.log("campaign Reports  sms", campaignReports.insideSmsCampaigns)

  

  return (
    <>
      {!campaignReports && <Loader />}

      <div className="h-fit w-full px-6 py-4 flex gap-2 md:gap-4 flex-col">
        {/* <button className="bg-blue-600 text-white">Refresh</button> */}
        <CampaignTopBar title={campaignDetails.name} />
        <div className="flex gap-2">
          <div className="w-full">
            {/* <button className="bg-gray-600 p-4 text-white" onClick={handleClick}>Click me</button> */}
            <AllCampaignsSidebar
              // data={campaignDetails}
              // countData={dummyCount}
              // refreshData={refreshCampaignData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCampaignsData;
