import { Modal, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import { createDocumentTemplateFileThunkMiddleware, getAllCategoriesThunkMiddleware, getAllTemplateFilesThunkMiddleware } from "../../../../../redux/features/campaigns";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLoader } from "../../../../../redux/features/loaders";
import { toastify } from "../../../../toast";

export const TemplateModal = ({ templateModal, setTemplateModal }) => {
    const dispatch = useDispatch();
    const { documentTemplateCategories } = useSelector((state) => state.campaigns);

    // console.log(documentTemplateFiles);

    // const handleCancel = () => {
    //     setTemplateModal(false);
    // };

    const handleCloseBtn = () => {
        setTemplateModal(false);
    }

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();

    const handleTemplateSubmit = (data) => {
        // console.log("Form data:", data); // Log form data for debugging
        // console.log(data.file[0])
        const formData = new FormData();
        formData.append('folderName', data.foldername);
        formData.append('docsName', data.name);
        if (data.category !== "select") formData.append('category', data.category);
        if (data.file && data.file.length > 0) {
            formData.append('file', data.file[0]); // Get the first file
        }

        // Log the FormData content to verify
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        // Dispatch your thunk or action with the form data
        dispatch(createDocumentTemplateFileThunkMiddleware(formData));
        reset();
    };

    // const dummySendCall = async (data) => {
    //     const formData = new FormData();
    //     formData.append('folderName', data.foldername);
    //     formData.append('docsName', data.name);
    //     if (data.category !== "select") formData.append('category', data.category);
    //     if (data.file && data.file.length > 0) {
    //         formData.append('file', data.file[0]); // Get the first file
    //     }

    //     try {
    //         dispatch(setLoader({ loader: true }));
    //         const response = await axios.post(
    //             `http://192.168.1.50:3000/docs/docsTempUpload`,
    //             formData,
    //             {
    //                 headers: {
    //                     "Content-Type": "multipart/form-data",
    //                 },
    //             }
    //         );


    //         console.log(response)

    //         if (response.status === 200) {
    //             const { message } = response.data;
    //             toastify({
    //                 msg: message,
    //                 type: "success",
    //             });
    //             await dispatch(getAllTemplateFilesThunkMiddleware());
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

    useEffect(() => {
        const getCategories = async () => {
            dispatch(getAllCategoriesThunkMiddleware());
        };
        getCategories();

        // const getDocumentTemplates = async () => {
        //     dispatch(getAllTemplateFilesThunkMiddleware());
        // };
        // getDocumentTemplates();
    }, [dispatch]);

    return (
        <>
            <div className="absolute w-[90%] h-[90%] bg-black opacity-25"></div>
            <Modal
                width={"90%"}
                centered
                open={templateModal}
                // onCancel={handleCancel}
                cancelButtonProps={{ hidden: true }}
                okButtonProps={{ hidden: true }}
                closable={false}
            >
                <div className='bg-white rounded-lg w-[100%] mx-auto min-h-[80vh]'>
                    <div className="relative modelHeadingBackground p-3 border-blue-800 rounded flex items-center justify-center">
                        <h1 className="text-white text-xl font-semibold">Create Template</h1>
                        <span
                            className="absolute right-4 text-black text-xl cursor-pointer"
                            onClick={handleCloseBtn}
                        >
                            <MdOutlineClose />
                        </span>
                    </div>
                    {/* <p>Template Create Form</p> */}
                    <div className="flex h-[80vh] flex-col justify-center sm:px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-lg shadow-2xl rounded-xl">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm p-6 sm:p-10">
                                <form
                                    onSubmit={handleSubmit(handleTemplateSubmit)}
                                    // onSubmit={handleSubmit(dummySendCall)}
                                    className="space-y-6 mt-10"
                                    action="#"
                                    method="POST"
                                >

                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Folder Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="name"
                                                name="name"
                                                autoComplete="name"
                                                {...register("foldername", { required: true })}
                                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.name && <span className="text-red-500">This field is required</span>}
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Template Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="name"
                                                name="name"
                                                autoComplete="name"
                                                {...register("name", { required: true })}
                                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.name && <span className="text-red-500">This field is required</span>}
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="file"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Document Upload
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="file"
                                                name="file"
                                                type="file"
                                                {...register("file", { required: true })}
                                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.file && <span className="text-red-500">This field is required</span>}
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="category"
                                            className="block text-sm font-medium leading-6 text-gray-900 my-2"
                                        >
                                            Select Category
                                        </label>
                                        <Controller
                                            name="category"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <Select
                                                    showSearch
                                                    placeholder="Select an Option"
                                                    // defaultValue={{label : "Select An Option" , value : "Some Option"}}
                                                    className="w-full h-[40px] block rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    {...field}
                                                    options={[
                                                        { label: "Select an Option", value: "select" },
                                                        ...(documentTemplateCategories?.map((option) => ({ label: option.name, value: option.name })) || [])
                                                    ]}
                                                />
                                            )}
                                        />
                                        {errors.category && <span className="text-red-500">This field is required</span>}
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Create Template
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};
