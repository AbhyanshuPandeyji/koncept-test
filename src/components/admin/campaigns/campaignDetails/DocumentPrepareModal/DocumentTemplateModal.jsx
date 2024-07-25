import DataTable from "react-data-table-component";
import Spinner from "../../../../common/Spinner";
import { IoSearch } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import { Modal, Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { sendSelectedDocumentTemplateThunkMiddleware } from "../../../../../redux/features/campaigns";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../../../redux/features/loaders";
import { toastify } from "../../../../toast";

const DocumentTemplateModal = ({ isDocumentTemplateModal, setIsDocumentTemplateModal, campaignType }) => {

    const dispatch = useDispatch();
    const [multiSelectRows, setMultiSelectRows] = useState([]);

    // dispalying folder and files of those folders
    const [folderList, setFolderList] = useState([]);
    const [filesInFolder, setFilesInFolder] = useState([]);
    // const [listData, setListData] = useState([]);
    const [filesView, setFilesView] = useState(false);
    const [folderView, setFolderView] = useState(true);
    // const [columnsValues, setColumnsValues] = useState([])

    const {
        // documentTemplateFiles,
        campaignDetails } = useSelector((state) => state.campaigns);

    const [documentTemplateFiles, setDocumentTemplateFiles] = useState([]);


    const columns = [
        {
            name: "Template",
            selector: (row) => row.name,
            width: "40vw",
        },
        {
            name: "Category",
            selector: (row) => row.category,
            width: 20,
        },
        {
            name: "File Type",
            selector: (row) => row.fileType,
            width: 20,
        },
    ];


    // const columnsFiles = [
    //     {
    //         name: "Template",
    //         selector: (row) => row.name,
    //         width: "40vw",
    //     },
    //     {
    //         name: "Category",
    //         selector: (row) => row.category,
    //         width: 20,
    //     },
    //     {
    //         name: "File Type",
    //         selector: (row) => row.fileType,
    //         width: 20,
    //     },
    // ];

    // const columnsFolders = [
    //     {
    //         name: "Folders",
    //         selector: (row) => row,
    //         width: "40vw",
    //     },
    // ];


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

    const handleCancel = () => {
        setIsDocumentTemplateModal(false)
    }

    const handleSelectedRowsChange = (state) => {
        setMultiSelectRows(state.selectedRows);
    };

    const handleSelectedRowsSend = () => {
        let templateSelectedIdArray = [];
        multiSelectRows.forEach((row) => {
            templateSelectedIdArray.push(row._id);
        })
        // console.log("sending the selected template ids", templateSelectedIdArray)
        dispatch(sendSelectedDocumentTemplateThunkMiddleware({
            templateId: templateSelectedIdArray,
            campaignName: campaignDetails.name, campaignType: campaignType
        }, (error) => {
            if (!error) {
                setIsDocumentTemplateModal(false);
                // dispatch(getUserAllCampaignThunkMiddleware({ accountId : singleUser.accountId }));
            }
        }));
        // if (response === 200) {
        //   console.log("document sending templateId response status", response)
        // }
        // setIsDocumentTemplateModal(false)
    }

    const handleModalClose = () => {
        setIsDocumentTemplateModal(false)
    }

    useEffect(() => {
        // const getDocumentTemplates = async () => {
        //   dispatch(getAllTemplateFilesThunkMiddleware());
        // };
        // getDocumentTemplates();
        const getDocumentTemplates = async () => {
            const response = await axios.get(`https://m.kcptl.in/docs/get`);
            if (response.status === 200) {
                console.log(response.data)
                setDocumentTemplateFiles(response.data)
                // setDocumentTemplateFiles(response.data.data)
            }
        };
        getDocumentTemplates();
    }, []);

    useEffect(() => { }, [documentTemplateFiles])

    const handleCloseBtn = () => {
        setIsDocumentTemplateModal(false);
    }

    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    }

    const handleSearch = () => {
        setSearchQuery(searchInput);
    };

    // console.log(documentTemplateFiles)

    const filteredData = documentTemplateFiles?.filter(item => {
        return (
            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.fileType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.name.toLowerCase().includes(searchQuery.toLowerCase())

            // <div>{item}</div>
            // item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            // item.id.toString().includes(searchQuery)
        );
    });

    // const handleChange = async (folder) => {
    //     await handleGetFiles(folder);
    // };

    // const getFolderList = async () => {
    //     try {
    //         dispatch(setLoader({ loader: true }));
    //         const response = await axios.get(
    //             // `http://localhost:3000/docs/docsFolders`,
    //             `http://192.168.1.50:3000/docs/docsFolders`,
    //         );


    //         console.log(response)

    //         if (response.status === 200) {
    //             const data = response.data;
    //             setFolderList(data);
    //             const { message } = response.data;
    //             toastify({
    //                 msg: message,
    //                 type: "success",
    //             });
    //             // await dispatch(getAllTemplateFilesThunkMiddleware());
    //         }

    //     } catch (error) {
    //         console.log(error);
    //         if (error.response?.data) {
    //             toastify({ msg: error.response.data.message, type: "error" });
    //         } else {
    //             toastify({ msg: error.message, type: "error" });
    //         }
    //     } finally {
    //         dispatch(setLoader({ loader: false }));
    //     }
    // }

    // // console.log("folderlist", folderList)

    // /* */
    // const handleGetFiles = async (folder) => {
    //     // let folderArray = [];
    //     // folderArray.push(folder);
    //     // for(let i = 0 ; i < folder.lenght ; i++){
    //     //     folderArray.push(folder[i].name)
    //     // }

    //     if (folder.length === 0) {
    //         setFilesInFolder([]);
    //         return;
    //     }

    //     if (folder.length > 0) {

    //         try {
    //             dispatch(setLoader({ loader: true }));
    //             const response = await axios.post(
    //                 // `http://localhost:3000/docs/docsFolders`,
    //                 `http://192.168.1.50:3000/docs/getDocsByFolders`,
    //                 {
    //                     folderNames: folder,
    //                 }
    //             );


    //             console.log(response)

    //             if (response.status === 200) {
    //                 const data = response.data;
    //                 // setFilesInFolder((prevData) => [...prevData , ...data]);
    //                 console.log("files data", data)
    //                 setFilesInFolder(data);
    //                 const { message } = response.data;
    //                 toastify({
    //                     msg: message,
    //                     type: "success",
    //                 });
    //                 // await dispatch(getAllTemplateFilesThunkMiddleware());
    //             }

    //         } catch (error) {
    //             console.log(error);
    //             if (error.response?.data) {
    //                 toastify({ msg: error.response.data.message, type: "error" });
    //             } else {
    //                 toastify({ msg: error.message, type: "error" });
    //             }
    //         } finally {
    //             dispatch(setLoader({ loader: false }));
    //         }
    //     }

    // }

    // // console.log("files inside folder", filesInFolder.length)
    // /* */

    // useEffect(() => {
    //     getFolderList();
    // }, [])


    // console.log("filesInfolder every time the option is selected", filesInFolder)
    // console.log("filesInfolder every time the option is selected", filesInFolder.length);
    // console.log("folders list", folderList)

    // useEffect(() => { }, [folderList, filesInFolder])

    // const filteredDataFiles = (filesInFolder && filesInFolder.length !== 0) && filesInFolder?.filter(item => {
    //     return (
    //         item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         item.fileType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         item.name.toLowerCase().includes(searchQuery.toLowerCase())
    //     );
    // });

    // const filteredDataFolders = (folderList && folderList.length !== 0) && folderList?.filter(item => {
    //     return (
    //         item.toLowerCase().includes(searchQuery.toLowerCase())
    //     );
    // });

    // useEffect(() => {
    //     if (folderList) {
    //         if (filesInFolder.length !== 0) {
    //             setFilesView(true);
    //             setFolderView(false);
    //             console.log("files length while changing view", filesInFolder.length)
    //         }
    //         else
    //             if (filesInFolder.length === 0) {
    //                 setFilesView(false);
    //                 setFolderView(true);
    //                 console.log("files length while changing view", filesInFolder.length)
    //             }
    //     }
    // }, [folderView, filesView, filesInFolder, folderList])

    return (
        <>
            {/* <div className="absolute w-[90%] h-[90%] bg-black opacity-25"></div> */}
            <Modal
                width={"90%"} centered open={isDocumentTemplateModal}
                onCancel={handleCancel}
                cancelButtonProps={{ hidden: true }}
                okButtonProps={{ hidden: true }}
                closable={false}
            >
                <div className="bg-white rounded-lg relative min-h-[80vh] h-[80vh] mx-auto  flex flex-col w-full gap-y-1" >
                    <div className="modelHeadingBackground p-3 border-blue-800 rounded flex items-center justify-between">
                        <h1 className="text-white  text-xl font-semibold">Select Document Templates</h1>
                        <span
                            className=" text-black text-xl cursor-pointer"
                            onClick={handleCloseBtn}
                        >
                            <MdOutlineClose />
                        </span>
                    </div>
                    <div className='bg-gray-200 flex gap-x-4 p-2 my-1 rounded-md sm:h-[60px] h-fit flex-wrap gap-y-2'
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                    >
                        <input
                            type="text"
                            className="border-2 rounded p-1 flex-1 focus:ring-2 focus:ring-purple-800 outline-none"
                            placeholder="Search Now"
                            onChange={handleInputChange}
                        // onKeyDown={handleSearch}  
                        />
                        <button
                            type="submit"
                            className=" flex items-center gap-1 buttonBackground px-2 py-1 rounded-md text-white font-semibold"
                            onClick={() => handleSearch()}
                        // onChange={handleSearch}
                        // onKeyDown={handleSearch}  
                        >
                            <IoSearch size={26} /> Search
                        </button>
                    </div>
                    {/* <div className={`w-full flex md:flex-col bg-gray-200 p-2 my-1 rounded-md md:h-[60px] h-fit flex-wrap gap-y-2`} >
                        <div className={`horizontal-container w-full`}>
                            <Select
                                mode="multiple"
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Please select"
                                // defaultValue={['a10', 'c12']}
                                onChange={handleChange}
                                options={[{ label: "Select An Folder", value: "select" },
                                ...(folderList?.map((option) => ({ label: option, value: option })) || [])]}
                            />
                        </div>
                    </div> */}
                    {/* <div className="w-[100%] mx-auto py-2 rounded-md h-[100%] table-container overflow-y-scroll">
                        {
                            (folderView) && (
                                <DataTable
                                    // data={folderList ? folderList : []}
                                    data={filteredDataFolders ? filteredDataFolders.reverse() : []}
                                    // data={filesInFolder ? [{ name: "value1" }, { name: "value2" }, { name: "value3" }] : []}
                                    // data={documentTemplateFiles ? documentTemplateFiles.slice().reverse() : []}
                                    columns={columnsFolders}
                                    // data={filesInFolder ? (filteredData ? filteredData.slice().reverse() : []) : folderList }
                                    noHeader
                                    // noTableHead
                                    selectableRows
                                    fixedHeader
                                    onSelectedRowsChange={handleSelectedRowsChange}
                                    customStyles={tableCustomStyles}
                                    // progressPending={getLoader}
                                    // onRowClicked={rowClickHandler}
                                    responsive={true}
                                    noDataComponent={<CustomNoDataComponenet />}
                                    progressComponent={<CustomProgressComponenet />}
                                />
                            )
                        }
                        {
                            (filesView) && (
                                <DataTable
                                    columns={columnsFiles}
                                    // data={documentTemplateFiles ? documentTemplateFiles.slice().reverse() : []}
                                    // data={filesInFolder ? (filteredData ? filteredData.slice().reverse() : []) : []}
                                    // data={filesInFolder ? filesInFolder : []}
                                    data={filteredDataFiles ? filteredDataFiles.slice().reverse() : []}
                                    // data={filesInFolder}
                                    // data={filesInFolder ? (filteredData ? filteredData.slice().reverse() : []) : folderList }
                                    // pagination
                                    noHeader
                                    // noTableHead
                                    selectableRows
                                    fixedHeader
                                    onSelectedRowsChange={handleSelectedRowsChange}
                                    customStyles={tableCustomStyles}
                                    // progressPending={getLoader}
                                    // onRowClicked={rowClickHandler}
                                    responsive={true}
                                    noDataComponent={<CustomNoDataComponenet />}
                                    progressComponent={<CustomProgressComponenet />}
                                />
                            )
                        }
                        {
                            (!folderView && !filesView) && (
                                <CustomNoDataComponenet/>
                            )
                        }
                    </div> */}
                    <div className="w-[100%] mx-auto py-2 rounded-md h-[100%] table-container overflow-y-scroll" >
                        <DataTable
                            columns={columns}
                            // data={documentTemplateFiles ? documentTemplateFiles.slice().reverse() : []}
                            data={filteredData ? filteredData.slice().reverse() : []}
                            // pagination
                            noHeader
                            // noTableHead
                            selectableRows
                            fixedHeader
                            onSelectedRowsChange={handleSelectedRowsChange}
                            customStyles={tableCustomStyles}
                            // progressPending={getLoader}
                            // onRowClicked={rowClickHandler}
                            // fixedHeaderScrollHeight="100vh"
                            responsive={true}
                            noDataComponent={<CustomNoDataComponenet />}
                            progressComponent={<CustomProgressComponenet />}
                        />
                    </div>
                </div>
                <div className="flex justify-end flex-wrap right-0 bottom-0">
                    <button onClick={() => handleSelectedRowsSend()} className="p-2 bg-green-600 text-white px-4 mx-2 rounded-md 
            font-semibold" >Send</button>
                    <button onClick={() => handleModalClose()} className="p-2 bg-gray-200 text-black px-4 mx-2 rounded-md 
            font-semibold" >Close</button>
                </div>
            </Modal >
        </>
    )
}

export default DocumentTemplateModal;

const CustomNoDataComponenet = () => {
    return (
        <div className="w-full p-10 text-center">
            There are no records to displays
        </div>
    );
};

const CustomProgressComponenet = () => {
    return <div className="w-full p-10 text-center"><Spinner /></div>;
};