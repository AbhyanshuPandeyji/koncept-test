import { memo, useEffect } from "react";
import DataTable from "react-data-table-component"
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DownloadDocumentByCategory = () => {

    const data = [
        {
            id: 1,
            category: "one"
        },
        {
            id: 2,
            category: "two"
        },
        {
            id: 3,
            category: "three"
        },
        {
            id: 4,
            category: "four"
        },
        {
            id: 5,
            category: "five"
        },
        {
            id: 6,
            category: "six"
        },
    ]

    const columns = [
        {
            name: 'Category',
            selector: row => row.category,
        }
    ]

    const tableCustomStyles = {
        headRow: {
            style: {
                background: "linear-gradient(90deg, #359FF3 0%, #8256FF 100%)",
                color: "#ffffff",
                fontWeight: "38px",
                fontSize: "14px",
                borderRadius: "5px",
                minHeight: "41px",
            },
        },
        rows: {
            style: {
                borderBottomStyle: "solid",
                borderBottomWidth: "1px",
                borderBottomColor: "#42bbff",
                cursor: "pointer",
                "&:not(:last-of-type)": {
                    borderBottomStyle: "solid",
                    borderBottomWidth: "1px",
                    borderBottomColor: "#42bbff",
                },
            },
        },
    };


    return (
        <>
            <div className="h-[94vh] overflow-y-auto px-6 py-4 flex gap-2 md:gap-4 flex-col">
                <DownloadDocumentTopBar/>
                {/* <Topbar toggle={openAddCampaignHandler} /> */}
                <div className="p-3 bg-white h-full rounded-md overflow-hidden overflow-y-auto">
                    {/* <CampaignsTable toggle={openAddCampaignHandler} /> */}
                    <DataTable
                        data={data}
                        columns={columns}
                        pagination
                        customStyles={tableCustomStyles}
                        responsive={true}
                        noDataComponent={< CustomNoDataComponenet />}
                        progressComponent={< CustomProgressComponenet />}
                    />
                </div>
            </div>
            {/* <div>
                <h1>Download Document By Category</h1>
                <DataTable
                    data={data}
                    columns={columns}
                    pagination
                    customStyles={tableCustomStyles}
                    responsive={true}
                    noDataComponent={< CustomNoDataComponenet />}
                    progressComponent={< CustomProgressComponenet />}
                />
            </div> */}
        </>
    )
}

export default DownloadDocumentByCategory



const CustomNoDataComponenet = () => {
    return (
        <div className="w-full p-10 text-center">
            There are no records to displays
        </div>
    );
};

const CustomProgressComponenet = () => {
    return <div className="w-full p-10 text-center">Loading...</div>;
};

export const DownloadDocumentTopBar = memo(({ title = "" }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { docuementTemplateFiles } = useSelector((state) => state.campaigns);

    useEffect(() => { }, [docuementTemplateFiles])

    const refreshHandler = () => {
        // dispatch(
        //     // getAllCampaignThunkMiddleware({ accountId: singleUser.accountId})
        //     getAllTemplateFilesThunkMiddleware()
        // );
    };

    return (
        <div className="h-fit px-4 py-2 flex flex-wrap w-full justify-between bg-white rounded-md">
            <div className=" flex items-center gap-4">
                <button
                    onClick={() => navigate("/campaigns/campaigndetails")}
                    className="w-fit flex items-center gap-1 buttonBackground px-2 py-1 rounded-md text-white font-semibold"
                >
                    <IoMdArrowRoundBack size={26} />
                </button>
                <h1 className=" text-xl font-semibold">{title}</h1>
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
    )
})

