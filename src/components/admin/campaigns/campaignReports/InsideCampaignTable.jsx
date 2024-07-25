import React, { useEffect, useState } from "react";

// icons
import { CiFileOn } from "react-icons/ci";
import { LuMessageCircle } from "react-icons/lu";

// changes by devankar
import DataTable from "react-data-table-component";
import ReportSection from "./ReportSection/ReportSection.jsx"
import BlackButton from "../../../common/Buttons/BlackButton.jsx";
import { TbReload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmMessage from "../../../common/ConfirmMessage.jsx";
// import { getCampaignByNameThunkMiddleware, startCampaignTemplateThunkMiddleware } from "../../../../redux/features/campaigns/index.js";
import { useDispatch, useSelector } from "react-redux";
import "../scrollBar.scss"
import Loaders from "../../../../redux/features/loaders/index.js";
import { getSpecificCampaignSmsThunkMiddleware } from "../../../../redux/features/campaigns/index.js";
import axios from "axios";

const InsideCampaignTable = ({ data }) => {
    // if (!data) return <div>Loading</div>
    console.log("data inside inside campaign table", data);
    //   console.log("count value in inside table component " , countData)

    const dispatch = useDispatch();

    const { campaignDetails, campaignReports, specificCampaignSms } = useSelector((state) => state.campaigns);

    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        // const allData = 

        let allData = campaignReports[0]?.insideWhatsAppCampaign.concat(campaignReports[0]?.insideSmsCampaigns);
        const allSortedData = allData.sort((a, b) => new Date(a.date) - new Date(b.date)).reverse();

        if (!filteredData) {
            setFilteredData(allSortedData[0]);
        }

        setFilteredData(() => {
            return allSortedData.filter((item) => {
                return data?.id === item?.id;
            })
        });

    }, [data, campaignDetails]);

    useEffect(() => { }, [data, campaignDetails, campaignReports, filteredData]);




    // console.log("filtered out data in the inside campaigns table", filteredData);
    // console.log("campaignDetails out data in the inside campaigns table", campaignDetails);
    // console.log("campaignReports out data in the inside campaigns table", campaignReports);
    // console.log("actual card data i am sending in the inside campaigns table", data);


    // State
    const [ReportSelect, setReportSelect] = useState(true);
    const [MessageSelect, setMessageSelect] = useState(false);
    const [count, setCount] = useState(0);
    const [rowUrl, setRowUrl] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [clicksData, setClicksData] = useState([]);


    // const [ClickSelect, setClickSelect] = useState(false);
    // const [ShowStartConfirmMessage, setShowStartConfirmMessage] = useState(false);
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    useEffect(() => {

        if (MessageSelect) {
            dispatch(getSpecificCampaignSmsThunkMiddleware({ campaignName: campaignDetails.name, id: filteredData[0].id }))
        }
    }, [MessageSelect, filteredData]);

    // console.log("sms of the campain i am selecting", specificCampaignSms)

    const tableCustomStyles = {
        headRow: {
            style: {
                background: "#f1f5f9",
                textWrap: "wrap",
            },
        },
        rows: {
            style: {
                // marginLeft: "3px",
                // marginRight: "3px",
            },
        },
    }

    const columns = [
        // {
        //     name: "Id",
        //     selector: (row) => row.campaign_id,
        //     width: "150px",
        // },
        {
            name: "Message Id",
            selector: (row) => {
                return <h2 className="text-center text-wrap">{row._id}</h2>
            },
            width: "200px",
        },
        {
            name: "Mobile Number",
            selector: (row) => {
                return <h2 className="text-center text-wrap">{row.to}</h2>
            },
            width: "150px",
        },
        {
            name: "Status",
            selector: (row) => {
                return <h2 className="text-center text-wrap">{row.status}</h2>
            },
            width: "100px",
        },
        {
            name: "Sent Time",
            selector: (row) => {
                return <h2 className="text-center text-wrap">{row.sentTime}</h2>
            },
            width: "200px",
        },
        {
            name: "App",
            selector: (row) => {
                return <h2 className="text-center text-wrap">{row.app}</h2>
            },
            width: "100px",
        },
        {
            name: "Channel",
            selector: (row) => {
                return <h2 className="text-center text-wrap">{row.channel}</h2>
            },
            width: "100px",
        },
        // {
        //     name: "Email",
        //     selector: (row) => {
        //         return <h2 className="text-center text-wrap">{row.email}</h2>
        //     },
        //     width: "100px",
        // },
        {
            name: "Error",
            selector: (row) => {
                return <h2 className="text-center text-wrap">{row.error}</h2>
            },
            width: "200px",
        },
        {
            name: "Timestamp",
            selector: (row) => {
                return <h2 className="text-center text-wrap">{row.timeStamp}</h2>
            },
            width: "180px",
        },
        {
            name: "Clicks",
            selector: (row) => {
                // const handleCellClick = () => {
                //     const result = clicksData.filter((item, index) => {
                //         return item.shortId === JSON.parse(row?.data).var3.split("/")[4];
                //     });
                //     console.log("click count value", result)
                // }

                const shortId = JSON.parse(row?.data).var3.split("/")[4];
                const clickData = clicksData.find(item => item.shortId === shortId);

                return (
                    <>
                        <span>
                            {clickData ? clickData.clicks : "There is no click data"}
                        </span>
                    </>
                )
                // return <h2 className="text-center text-wrap">{`Clicks ${count}`}</h2>
            },
            width: "fit",
        }
    ]

    if (!data) return <Loaders />

    const rowClickHandler = async (rowData) => {
        // console.log("data in the message ", JSON.parse(rowData?.data).var3.split('/')[4]);
        // const setUrls = [];
        // setUrls[0] = `"${JSON.parse(rowData?.data).var3.split('/')[4]}"`
        // console.log("row data", rowData)
        // // console.log("data in the message ", rowData?.data);
        // const setUrl = JSON.parse(rowData?.data).var3.split("/")[4];
        // const urlIdArray = [];
        // urlIdArray.push(setUrl);
        // console.log("url id array of single row", urlIdArray)

        // // setCount( counting => counting + 1)
        // const response = await axios.post("http://192.168.1.26:3000/clicks", {
        //     shortIds: urlIdArray,
        // });
        // console.log(response.data);
        // setClicksData(response.data);    

        // const allRowIds = specificCampaignSms?.sms.map(row => JSON.parse(row?.data).var3.split("/")[4]); // all short urls
        let allRowIds = []
        allRowIds[0] = JSON.parse(rowData?.data).var3.split("/")[4]; // all short urls
        // setSelectedRowIds(allRowIds); // Set the IDs to state
        // console.log('Selected Row IDs:', allRowIds); // Log the IDs to the console or handle as needed
        const response = await axios.post("http://192.168.1.26:3000/clicks", {
            shortIds: allRowIds,
        });

        const updatedData = response.data;
        // console.log(response.data);
        // setClicksData(response.data);

        // const arrayValue = JSON.parse(rowData?.data).var3.split("/")[4];
        setClicksData(prevData => prevData.map(row => row.shortId === allRowIds[0].shortId ? { ...row, ...updatedData } : row))
        // console.log( "single url send" , arrayValue)
    }

    // const selectAllRows = async (rows) => {
    //     // const allRowIds = rows.map(row => row._id); // Extract IDs from all rows
    //     const allRowIds = rows.map(row => JSON.parse(row?.data).var3.split("/")[4]); // all short urls
    //     setSelectedRowIds(allRowIds); // Set the IDs to state
    //     console.log('Selected Row IDs:', allRowIds); // Log the IDs to the console or handle as needed
    //     const response = await axios.post("http://192.168.1.26:3000/clicks", {
    //         shortIds: allRowIds,
    //     });
    //     console.log(response.data);
    //     setClicksData(response.data);
    // };

    const selectAllRows = async () => {
        // const allRowIds = rows.map(row => row._id); // Extract IDs from all rows
        const allRowIds = specificCampaignSms?.sms.map(row => JSON.parse(row?.data).var3.split("/")[4]); // all short urls
        setSelectedRowIds(allRowIds); // Set the IDs to state
        // console.log('Selected Row IDs:', allRowIds); // Log the IDs to the console or handle as needed
        const response = await axios.post("http://192.168.1.26:3000/clicks", {
            shortIds: allRowIds,
        });
        console.log(response.data);
        setClicksData(response.data);
    };

    useEffect(() => {
        if (specificCampaignSms?.sms || MessageSelect || filteredData) {
            selectAllRows();
        }
    }, [filteredData, MessageSelect, specificCampaignSms?.sms])

    return (
        <>
            <div className="flex flex-col justify-start">
                <div className="w-[98%] flex justify-between items-center">
                    <div className="flex justify-start items-center w-full">
                        <TopScreenButton select={ReportSelect} onClick={() => {
                            setMessageSelect(false);
                            setReportSelect(true);
                            // setClickSelect(false);
                        }}>
                            <CiFileOn size={"22px"} />
                            <span className="">Reports</span>
                        </TopScreenButton>

                        <TopScreenButton select={MessageSelect} onClick={() => {
                            setReportSelect(false);
                            setMessageSelect(true);
                            // setClickSelect(false);
                        }}>
                            <LuMessageCircle size={"22px"} />
                            <span className="">Message</span>
                        </TopScreenButton>
                    </div>
                    {/* // changes made by abhyanshu */}
                </div>
                <div className="bg-white items-center justify-center">
                    {
                        MessageSelect ? (
                            <div className="md:min-h-[130vh] flex flex-1 mt-4 rounded-md flex-col">
                                <div className="rounded-lg w-[94%] mx-auto">
                                    <div className="bg-gray-600 p-2 text-white font-semibold text-lg rounded-t-md">
                                        Contacts
                                    </div>
                                    <div className="overflow-y-scroll overflow-x-scroll">
                                        {/* <button onClick={() => selectAllRows(specificCampaignSms?.sms)} className="mb-4 p-2 bg-blue-500 text-white rounded">
                                            Select All Rows
                                        </button> */}
                                        <div className="h-[100vh] w-full">
                                            <DataTable
                                                columns={columns}
                                                data={specificCampaignSms?.sms ? specificCampaignSms.sms.slice().reverse() : []}
                                                fixedHeader
                                                pagination
                                                selectableRows
                                                onRowClicked={(row) => rowClickHandler(row)}
                                                // onSelectedRowsChange={({ selectedRows }) => setSelectedRows(selectedRows)}
                                                // selectableRowSelected={row => selectedRows.some(selectedRow => selectedRow.id === row.id)}
                                                onRowSelected={() => { console.log("insideSmsCampaigns on Row Selected!") }}
                                                highlightOnHover
                                                customStyles={tableCustomStyles}
                                                responsive
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (<>
                            {
                                filteredData &&
                                <div className="" >
                                    <ReportSection
                                        dataInCampaign={filteredData ? filteredData[0] : []}
                                    // countData={countData}
                                    // totalSent={data?.totalSent}
                                    // totalFailed={data?.totalFailed}
                                    // totalDelivered={data?.totalDelivered}
                                    // totalInvalidNumber={data?.totalInvalidNumber}
                                    // totalSms={data?.totalSms}
                                    // // status={data?.status}
                                    // campaignStartTime={data?.campaignStartTime}
                                    // campaignEndTime={data?.campaignEndTime}
                                    />
                                </div>
                            }
                        </>)
                    }

                </div>

            </div>
        </>
    )
}

export default InsideCampaignTable;

const TopScreenButton = ({ children, select = false, onClick = function () { } }) => {
    return <button className={"p-2 bg-white text-center flex w-fit" + (select ? ` rounded-t-md border-2 border-solid border-blue-600` : null)} onClick={onClick}>{children}</button>
}