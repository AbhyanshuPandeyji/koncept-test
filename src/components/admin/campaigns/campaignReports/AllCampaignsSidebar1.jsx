import React, { useEffect, useState } from 'react'
import CampaignsCard from './CampaignsCard';
import InsideCampaignTable from './InsideCampaignTable';
import { MdOutlineWhatsapp } from "react-icons/md";
import { FcSms } from "react-icons/fc";
// import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getCampaignByNameThunkMiddleware } from '../../../../redux/features/campaigns';
// import { getCampaignByNameThunkMiddleware } from '../../../../redux/features/campaigns';

const AllCampaignsSidebar = ({ data, refreshData, countData }) => {
    const dispatch = useDispatch();
    const { campaignDetails, campaignReports } = useSelector((state) => state.campaigns)
    // const { dummyCount } = useSelector((state) => state.campaigns)

    // console.log(campaignDetails)

    const [toggleTab, setToggleTab] = useState("all-campaigns");
    const [sortedData, setSortedData] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [activeCardIndex, setActiveCardIndex] = useState(null);
    // const [someData , setSomeData] = useState(null)


    // useEffect(() => {
    //     dispatch(getCampaignByNameThunkMiddleware({ campaignName: campaignDetails.name }))
    // }, [dispatch]);

    useEffect(() => {
        // if (data) refreshData();
        // refreshData()

    }, [data,
        // selectedCampaign
        // refreshData
        campaignDetails,
        selectedCampaign,
        campaignReports,
        // dummyCount
        // sortedData,
        // selectedCampaign,
        // selectedCampaign?.campaignStatus
    ]);

    // useEffect(() => {
    //     // const response = dispatch(
    //     //     gettingCampaignDetailsData({ campaignName: campaignDetails.name })
    //     // );
    //     // setSomeData(response)
    //     // console.log("response from the api " , response);
    // }, [selectedCampaign,
    //     // dispatch
    //     // , sortedData , incomingData
    // ])

    // console.log(someData)

    // const handleToggleChange = (event) => {
    //     event.preventDefault();
    //     setToggleTab(event.target.value);
    // }

    useEffect(() => {
        if (!campaignReports || campaignReports === null) return;

        // let whatsappCampaignData = [...data.insideWhatsAppCampaign];
        // let smsCampaignData = [...data.insideSmsCampaigns];
        let whatsappCampaignData = campaignReports[0]?.insideWhatsAppCampaign;
        let smsCampaignData = campaignReports[0]?.insideSmsCampaigns;

        // let

        let allData = smsCampaignData.concat(whatsappCampaignData);
        const allSortedData = allData.sort((a, b) => new Date(a.date) - new Date(b.date)).reverse();

        if (selectedCampaign === null) {
            setSelectedCampaign(allSortedData[0]);
            setActiveCardIndex(allSortedData[0]?.id);
        }

        if (toggleTab === "all-campaigns") {
            setSortedData(allSortedData);
            // setSelectedCampaign(allSortedData[0]);
            // setActiveCardIndex(allSortedData[0]?.id);
        } else if (toggleTab === "whatsapp-campaigns") {
            let whatsappOrderByDate = [...whatsappCampaignData].sort((a, b) => new Date(a.date) - new Date(b.date)).reverse();
            setSortedData(whatsappOrderByDate);
            // setSelectedCampaign(whatsappOrderByDate[0]);
            // setActiveCardIndex(whatsappOrderByDate[0]?.id);
        } else if (toggleTab === "sms-campaigns") {
            let smsOrderByDate = [...smsCampaignData].sort((a, b) => new Date(a.date) - new Date(b.date)).reverse();
            setSortedData(smsOrderByDate);
            // setSelectedCampaign(smsOrderByDate[0]);
            // setActiveCardIndex(smsOrderByDate[0]?.id);
        } else {
            setSortedData(allSortedData);
        }
    }, [data, toggleTab, campaignDetails, campaignReports]);
    // console.log(toggleTab, sortedData)

    const handleSelectedCampaign = (item) => {
        setSelectedCampaign(item);
        setActiveCardIndex(item.id)
        // dispatch(getCampaignByNameThunkMiddleware({ campaignName: item.name }));
    }

    // console.log("sorted data in all campaigns sidebar", sortedData);
    // console.log("selected campaign in all campaigns sidebar", selectedCampaign);
    // // console.log("selected campaign in all campaigns sidebar status", selectedCampaign.status);
    // console.log(" data inside the campaign side bar ", data)



    return (
        <>
            <div className="flex lg:flex-row flex-col h-fit bg-gray-200 p-4 rounded-md gap-4">
                <div className='flex w-full lg:w-1/3 flex-col bg-white rounded-md border-2 border-black'>
                    <div className='flex w-full rounded-md'>
                        <button
                            className={`w-1/4 text-sm md:text-lg font-bold  text-center flex justify-center items-center p-2
                                ${toggleTab === "all-campaigns" ? "bg-white text-black rounded-tl-md" : "bg-gray-600 text-white"}
                            `}
                            // onClick={(e) => handleToggleChange(e)}
                            onClick={(e) => setToggleTab("all-campaigns")}
                            value={"all-campaigns"}
                        >
                            All
                        </button>
                        <button
                            className={`w-1/4 text-sm md:text-lg font-bold text-center flex justify-center items-center p-2
                            ${toggleTab === "whatsapp-campaigns" ? "bg-white" : "bg-gray-600"}
                            `}
                            // onClick={(e) => handleToggleChange(e)}
                            onClick={(e)=>setToggleTab("whatsapp-campaigns")}
                            value={"whatsapp-campaigns"}
                        >
                            {/* Whatsapp Campaigns */}
                            <MdOutlineWhatsapp size={"26px"}
                                // onClick={(e) => handleToggleChange(e)}
                                // value={"whatsapp-campaigns"}
                                color={`${toggleTab === "whatsapp-campaigns" ? "black" : "white"}`}
                            />
                        </button>

                        <button
                            className={`w-1/4 text-sm md:text-lg font-bold text-center flex justify-center items-center p-2
                            ${toggleTab === "sms-campaigns" ? "bg-white" : "bg-gray-600"}
                            `}
                            // onClick={(e) => handleToggleChange(e)}
                            onClick={(e) => setToggleTab("sms-campaigns")}
                            value={"sms-campaigns"}
                        >
                            {/* SMS Campaigns */}
                            <FcSms size={"26px"}
                                // onClick={(e) => handleToggleChange(e)}
                                // onClick={(e) => setToggleTab("sms-campaigns")}
                                // value={"sms-campaigns"}
                                color={`${toggleTab === "sms-campaigns" ? "black" : "white"}`}
                            />
                        </button>
                        <button
                            className={`w-1/4 text-sm md:text-lg font-bold text-center flex justify-center items-center p-2
                            ${toggleTab === "email-campaigns" ? "bg-white rounded-tr-md" : "bg-gray-600"}
                            `}
                            // onClick={(e) => handleToggleChange(e)}
                            onClick={(e) => setToggleTab("email-campaigns")}
                            value={"email-campaigns"}
                        >
                            {/* SMS Campaigns */}
                            <MdOutlineAlternateEmail
                                // onClick={(e) => handleToggleChange(e)}
                                // value={"email-campaigns"}
                                size={"26px"} color={`${toggleTab === "email-campaigns" ? "black" : "white"}`}
                            />
                        </button>
                    </div>
                    <div className='lg:h-screen lg:min-h-[130vh] h-[40vh] table-container overflow-y-scroll '>
                        {sortedData &&
                            sortedData?.map((item, index) => (
                                <CampaignsCard
                                    // data={data}
                                    key={index}
                                    value={item}
                                    isActive={item?.id === activeCardIndex}
                                    handleSelectedCard={() => handleSelectedCampaign(item)}
                                />
                            ))
                        }
                    </div>
                </div>
                <div className="lg:w-2/3 w-full md:min-h-[130vh] h-fit">
                    <div>
                        {selectedCampaign &&
                            <InsideCampaignTable data={selectedCampaign}
                            // countData={dummyCount} 
                            />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllCampaignsSidebar
