
import React, { useEffect, useState } from "react";
// import Chart from 'react-apexcharts';

// icons
import { TbReload } from "react-icons/tb";

// components
import BlackButton from "../../../../common/Buttons/BlackButton.jsx"
import ReportCard from "./ReportCard.jsx";
import { BarElement, CategoryScale, Legend, Chart as ChartJS, LinearScale, Tooltip, ArcElement } from "chart.js"
import { useNavigate } from "react-router-dom";
import { xor } from "lodash";
import Charts from "../Charts.jsx";
import { getCampaignByNameThunkMiddleware, startCampaignTemplateThunkMiddleware } from "../../../../../redux/features/campaigns/index.js";
import { useDispatch, useSelector } from "react-redux";
import ConfirmMessage from "../../../../common/ConfirmMessage.jsx";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineNotStarted } from "react-icons/md";
import { MdOutlineCampaign } from "react-icons/md";


// import ApexCharts from 'apexcharts';
// import Chart from 'react-apexcharts';

const ReportSection = ({ dataInCampaign,
    // countData
    // totalSent, totalSms, totalFailed, totalDelivered, totalInvalidNumber, campaignStartTime, campaignEndTime 
}) => {

    
    
    const { campaignDetails , campaignReports } = useSelector((state) => state.campaigns)
    useEffect(() => { }, [campaignDetails , campaignReports])
    
    
    
    // const { dummyCount } = useSelector((state) => state.campaigns);
    
    // console.log("count value in report section component ", dummyCount)

    const dispatch = useDispatch();

    // const DataArray = [dataInCampaign?.totalSms, dataInCampaign?.totalSent, dataInCampaign?.totalDelivered, 
    // dataInCampaign?.totalInvalidNumber, dataInCampaign?.totalFailed,];
    const colorArray = ["blue", "lightgreen", "green", "yellow", "red"];
    const titleArray = ["Total", "Sent", "Delivered", "Invalid Number", "Failed"];
    const [ShowStartConfirmMessage, setShowStartConfirmMessage] = useState(false);

    const [DataArray, SetDataArray] = useState([])

    // console.log("campaign details in all campaigns report section the original campaign details data", campaignDetails)
    // console.log("data sending inside the campaigns report section", dataInCampaign);
    // useEffect(() => { }, [dummyCount])
    // const [count, setCount] = useState(0)

    useEffect(() => {
        SetDataArray([ +dataInCampaign?.totalSms , +dataInCampaign?.totalSent, +dataInCampaign?.totalDelivered,
        +dataInCampaign?.totalInvalidNumber, +dataInCampaign?.totalFailed,])
    }, [campaignDetails , campaignReports , dataInCampaign, dataInCampaign?.campaignStatus])

    // changes made by abhyanshu
    const sendStartCampaignHandler = () => {
        // try {
        if (dataInCampaign && dataInCampaign?.campaignStatus !== "completed") {
            dispatch(startCampaignTemplateThunkMiddleware({
                campaignData: dataInCampaign
                , campaignType: dataInCampaign.type, campaignUserName: campaignDetails.name
            }));
        }
    }

    // const handleSettingValue = () => {
    //     dispatch(settingCount({ count: count }))
    // }
    // console.log("total sms in report section" , typeof DataArray[0])
    
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex justify-between w-full">
                <div className="flex p-3 items-center">
                    {
                        ShowStartConfirmMessage ? <>
                            <ConfirmMessage yes="Yes, I am sure" deleteBtn="" saveOrsend="" className="flex-col" no="No, I'm not sure!" value={(e) => {
                                if (e) {
                                    sendStartCampaignHandler()
                                }
                                setShowStartConfirmMessage(false);
                            }}>
                                <MdOutlineCampaign size={"50px"} className="mb-3 text-slate-700" />
                                <h2 className="text-lg w-full text-center text-slate-700 font-normal">Do You Want to Start This Campaign?</h2>
                            </ConfirmMessage>
                        </> : null
                    }
                    {
                        dataInCampaign && dataInCampaign?.campaignStatus === "pending" ? (
                            <>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    if (dataInCampaign) {
                                        setShowStartConfirmMessage(true);
                                    }
                                }}
                                    className="bg-green-600 w-40 p-2 rounded-md text-white font-semibold"
                                >Send Campaign</button></>
                        ) :
                            ("")
                    }
                </div>
                {/* <button className="bg-gray-500 rounded-md text-lg font-semibold p-2 text-black" onClick={() => setCount(count => count + 1)}>+</button>
                <input className="bg-gray-100 rounded-md text-lg font-semibold p-2 text-black" type="number" value={count} disabled={true} />
                <button  className="bg-gray-500 rounded-md text-lg font-semibold p-2 text-black" onClick={() => setCount(count => count - 1)}>-</button>
                <button className="bg-green-500 rounded-md text-lg font-semibold p-2" onClick={handleSettingValue} >Send Count New Value</button>
                <input className="bg-gray-100 rounded-md text-lg font-semibold p-2 text-black" type="number" value={countData} disabled={true} /> */}
                
                {/* <div className="flex justify-end w-full p-3 items-center">
                    <BlackButton onClick={() => navigate(`/campaigns/campaigndetails/reports`)}>
                        <TbReload size={"22px"} />
                    </BlackButton>
                </div> */}
            </div>

            <div className="w-full flex sm:flex-row flex-col px-2 sm:px-0 justify-center mt-3 mb-3 items-center">
                <div className="p-2 pl-4 pr-4 text-center w-full text-wrap m-2 font-semibold bg-green-200 rounded-md border-2 border-solid border-green-300">Start On: {dataInCampaign?.campaignStartTime}</div>
                <div className="p-2 pl-4 pr-4 text-center w-full text-wrap m-2 font-semibold bg-green-200 rounded-md border-2 border-solid border-green-300">Complete On: {dataInCampaign?.campaignEndTime}</div>
            </div>
            <div className="w-full flex justify-center flex-wrap items-center">
                {DataArray && DataArray.map((item, index) => {
                    return (
                        <ReportCard
                            key={index}
                            number={item}
                            color={colorArray[index]}
                            title={titleArray[index]}
                            total={DataArray[0]}
                            startTime={item?.campaignStartTime}
                            endTime={item?.campaignEndTime}
                        />
                    );
                })}
            </div>

            <div className="flex md:flex-row flex-col w-full justify-center items-center rounded-md p-2">
                <Charts barDataArray={DataArray} />
            </div>
            <div className="w-full flex sm:flex-row flex-col px-2 sm:px-0 justify-center mt-3 mb-3 items-center">
                <div className="p-2 pl-4 pr-4 text-center w-full text-wrap m-2 font-semibold bg-green-200 rounded-md border-2 border-solid border-green-300">Total Clicks:</div>
                <div className="p-2 pl-4 pr-4 text-center w-full text-wrap m-2 font-semibold bg-green-200 rounded-md border-2 border-solid border-green-300">Reported Clicks:</div>
                <div className="p-2 pl-4 pr-4 text-center w-full text-wrap m-2 font-semibold bg-green-200 rounded-md border-2 border-solid border-green-300">Unique Clicks:</div>
            </div>
        </div>
    )
}

export default ReportSection;
