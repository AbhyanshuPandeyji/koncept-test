import { useEffect, useState } from 'react'
// import InsideCampaignTable from './InsideDocumentBox';
import { MdDeleteOutline, MdOutlineClose } from "react-icons/md";
import { FaMinusCircle } from "react-icons/fa";
import "../scrollBar.scss"
// import { FcSms } from "react-icons/fc";
// import { FaWhatsapp } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import {
    createDocumentTemplateCategoryThunkMiddleware, createDocumentTemplateFileThunkMiddleware, deleteDocumentTemplateCategoryThunkMiddleware, getAllCategoriesThunkMiddleware,
    getAllTemplateFilesThunkMiddleware,
    // getAllTemplateFilesThunkMiddleware, getWordDocumentFileThunkMiddleware 
} from '../../../../redux/features/campaigns';
import { Modal, Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import DocumentTemplateCard from './DocumentTemplateCard';
import InsideDocumentBox from './InsideDocumentBox';
import DataTable from 'react-data-table-component';
import ConfirmMessage from '../../../common/ConfirmMessage';
import { IoSearch } from 'react-icons/io5';
import { CategoriesModal } from './DocumentTemplateModal/CategoryModal';
import { TemplateModal } from './DocumentTemplateModal/TemplateModal';
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import { setLoader } from '../../../../redux/features/loaders';
import { toastify } from '../../../toast';
import axios from 'axios';
import { logoutThunkMiddleware } from '../../../../redux/features/user';

// import { getCampaignByNameThunkMiddleware } from '../../../../redux/features/campaigns';

const AllDocumentSidebar = ({ data }) => {
    const dispatch = useDispatch();
    const { documentTemplateFiles } = useSelector((state) => state.campaigns)
    // console.log(documentTemplateFiles)

    // modals variables 
    const [categoriesModal, setCategoriesModal] = useState(false);
    const [templateModal, setTemplateModal] = useState(false)

    // files data display and values variables
    const [sortedData, setSortedData] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [activeCardIndex, setActiveCardIndex] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);

    // folder list display varialbes
    const [folderList, setFolderList] = useState([]);
    const [filesInFolder, setFilesInFolder] = useState([]);
    const [SingleFolder, SetSingleFolder] = useState(null);

    // display variables 
    const [isFilesDisplay, setIsFilesDisplay] = useState(false);
    const [isFolderListDisplay, setIsFolderListDisplay] = useState(true)

    useEffect(() => {
        if (!documentTemplateFiles || documentTemplateFiles === null) {
            return;
        }

        if (documentTemplateFiles.length > 0) {
            const sortedDataByDate = [...documentTemplateFiles].sort((a, b) => new Date(b.date) - new Date(a.date));
            setSortedData(sortedDataByDate);

            if (!selectedTemplate) {
                setSelectedTemplate(sortedDataByDate[0]);
                setFileUrl(sortedDataByDate[0].path.split("/")[1]);
                setActiveCardIndex(sortedDataByDate[0]._id);
            }
            else {
                // find different method to redirect to the template after changes to child component 
                setSelectedTemplate(sortedDataByDate[0]);
                setFileUrl(sortedDataByDate[0].path.split("/")[1]);
                setActiveCardIndex(sortedDataByDate[0]._id);
            }
        }
    }, [documentTemplateFiles]);


    // useEffect(() => {
    //     if (!filesInFolder) {
    //         return;
    //     }

    //     console.log("files in folder use Effect ", filesInFolder)

    //     if (filesInFolder.length > 0) {
    //         const sortedDataByDate = [...filesInFolder].sort((a, b) => new Date(b.date) - new Date(a.date));
    //         setSortedData(sortedDataByDate);

    //         if (!selectedTemplate) {
    //             setSelectedTemplate(sortedDataByDate[0]);
    //             setFileUrl(sortedDataByDate[0].path.split("/")[1]);
    //             setActiveCardIndex(sortedDataByDate[0]._id);
    //         }
    //         else {
    //             // find different method to redirect to the template after changes to child component 
    //             setSelectedTemplate(sortedDataByDate[0]);
    //             setFileUrl(sortedDataByDate[0].path.split("/")[1]);
    //             setActiveCardIndex(sortedDataByDate[0]._id);
    //         }
    //     }
    // }, [documentTemplateFiles, filesInFolder]);

    useEffect(() => { }, [sortedData, filesInFolder, selectedTemplate, documentTemplateFiles])
    useEffect(() => { }, [sortedData, selectedTemplate, documentTemplateFiles])

    const handleSelectedTemplate = (item) => {
        setSelectedTemplate(item);
        setActiveCardIndex(item._id)
        setFileUrl(item.path.split("/")[1]);
    }

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

    // console.log("folderlist", folderList)

    // const handleGetFiles = async (folder) => {
    //     let folderArray = [];
    //     folderArray.push(folder);
    //     // for(let i = 0 ; i < folder.lenght ; i++){
    //     //     folderArray.push(folder[i].name)
    //     // }

    //     try {
    //         dispatch(setLoader({ loader: true }));
    //         const response = await axios.post(
    //             // `http://localhost:3000/docs/docsFolders`,
    //             `http://192.168.1.50:3000/docs/getDocsByFolders`,
    //             {
    //                 folderNames: folderArray,
    //             }
    //         );


    //         console.log(response)

    //         if (response.status === 200) {
    //             const data = response.data;
    //             SetSingleFolder(folder);
    //             setFilesInFolder(data);
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

    // console.log("files inside folder", filesInFolder.length)

    // useEffect(() => {
    //     getFolderList();
    // }, [isFolderListDisplay, isFilesDisplay])

    return (
        <>
            <div className="flex lg:flex-row flex-col bg-gray-200 p-4 rounded-md gap-4">
                <div className='flex w-full lg:w-1/3 flex-col bg-white rounded-md border-2 border-black'>
                    <div className='flex w-full justify-between flex-wrap items-center p-2'>
                        <button className='bg-gray-600 w-fit rounded-md p-2 text-white' onClick={() => setCategoriesModal(true)}>Categories</button>
                        <button className='bg-gray-600 w-fit rounded-md text-white p-2' onClick={() => setTemplateModal(true)}>Create Template</button>
                    </div>
                    {/* {
                        isFolderListDisplay &&
                        (<div>
                            <div className='lg:h-[80vh] h-[40vh] table-container overflow-y-scroll flex flex-col '>
                                {folderList &&
                                    folderList.map((folder, index) => {
                                        return (
                                            <div key={index} className='flex w-full p-2 mx-auto transition-all duration-1000'>
                                                <div className='w-full rounded-md text-white font-semibold bg-gray-600 flex items-center p-2'>
                                                    <span className={`w-[40px] h-full flex justify-center rounded-md 
                                                    cursor-pointer items-center text-white font-semibold bg-gray-600`}
                                                        onClick={() => { handleGetFiles(folder); SetSingleFolder(folder) }} >
                                                        <MdArrowForwardIos />
                                                    </span>
                                                    <p
                                                        className='cursor-pointer'
                                                        onClick={() => {
                                                            handleGetFiles(folder);
                                                            setIsFilesDisplay(true);
                                                            setIsFolderListDisplay(false)
                                                        }}
                                                    >{folder}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>)
                    }

                    {
                        isFilesDisplay && (
                            <div
                                className={`transition-all duration-1000`}
                                onClick={() => {
                                    setIsFilesDisplay(false);
                                    setIsFolderListDisplay(true);
                                    setSortedData(null);
                                    SetSingleFolder(null);
                                    setSelectedTemplate(null)
                                    setActiveCardIndex(null)
                                    setFileUrl(null)
                                }}>
                                <div className='flex w-full p-2 mx-auto'>
                                    <div className='w-full rounded-md text-white font-semibold bg-gray-600 flex items-center p-2'>
                                        <span className={`w-[40px] h-full flex justify-center rounded-md 
                                                    cursor-pointer items-center text-white font-semibold bg-gray-600`}
                                        >
                                            <MdArrowBackIosNew />
                                        </span>
                                        <p
                                            className='cursor-pointer'
                                        >{SingleFolder}</p>
                                    </div>
                                </div>
                                <div className='lg:h-[80vh] h-[40vh] table-container overflow-y-scroll'>
                                    {sortedData &&
                                        sortedData?.map((item, index) => (
                                            <DocumentTemplateCard
                                                key={index}
                                                value={item}
                                                isActive={item?._id === activeCardIndex}
                                                handleSelectedCard={() => {
                                                    handleSelectedTemplate(item);
                                                }}
                                            // handleFileUrl={() => handleFileUrl(item)}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    } */}
                    <div className='lg:h-[80vh] h-[40vh] table-container overflow-y-scroll'>
                        {sortedData &&
                            sortedData?.map((item, index) => (
                                <DocumentTemplateCard
                                    key={index}
                                    value={item}
                                    isActive={item?._id === activeCardIndex}
                                    handleSelectedCard={() => {
                                        handleSelectedTemplate(item);
                                    }}
                                // handleFileUrl={() => handleFileUrl(item)}
                                />
                            ))
                        }
                    </div>
                </div>

                <div className={`lg:w-2/3 w-full h-full`} >
                    {/* {
                        isFolderListDisplay && (
                            <div>
                                <div className={`bg-white h-screen w-full flex`} >
                                    <CustomNoDataComponenet />
                                </div>
                            </div>
                        )
                    }
                    {
                        isFilesDisplay && (
                            <div>
                                {(filesInFolder) && (
                                    <div>
                                        {(selectedTemplate) &&
                                            <InsideDocumentBox
                                                data={selectedTemplate}
                                                fileUrl={fileUrl ? fileUrl : ""}
                                            />
                                        }
                                    </div>
                                )}
                                {(!filesInFolder || filesInFolder.length <= 0) && (
                                    <div className={`bg-white h-full w-full flex`} >
                                        <CustomNoDataComponenet />
                                    </div>
                                )}
                            </div>
                        )
                    } */}
                    {(selectedTemplate) &&
                        <InsideDocumentBox
                            data={selectedTemplate}
                            fileUrl={fileUrl ? fileUrl : ""}
                        />
                    }
                </div>
            </div>
            {categoriesModal && <CategoriesModal categoriesModal={categoriesModal} setCategoriesModal={setCategoriesModal} />}
            {templateModal && <TemplateModal templateModal={templateModal} setTemplateModal={setTemplateModal} />}
        </>
    )
}

export default AllDocumentSidebar;

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
