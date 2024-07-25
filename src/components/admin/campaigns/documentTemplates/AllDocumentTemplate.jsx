import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DocumentTemplateTopBar from "./DocumentTemplateTopBar";

// changes by devankar
// import AllCampaignsSidebar from "./AllCampaignsSidebar.jsx";
import AllDocumentSidebar from "./AllDocumentSidebar";
import { getAllTemplateFilesThunkMiddleware } from "../../../../redux/features/campaigns";
import { setLoader } from "../../../../redux/features/loaders";
import axios from "axios";
import { logoutThunkMiddleware } from "../../../../redux/features/user";
import { toastify } from "../../../toast";
// import { getAllCampaignThunkMiddleware } from "../../../../redux/features/campaigns";
// import { gettingCampaignDetailsData } from "../../../../redux/features/campaigns";

const DocumentTemplates = () => {
  const dispatch = useDispatch();
  const { documentTemplateFiles } = useSelector((state) => state.campaigns);
  console.log("document template files ", documentTemplateFiles)

  useEffect(() => {
    const getDocumentTemplates = async () => {
      dispatch(getAllTemplateFilesThunkMiddleware());
    };
    getDocumentTemplates();
  }, [dispatch]);

  useEffect(() => { }, [documentTemplateFiles]);


  return (
    <>
      <div className="relative h-fit w-full px-6 py-4 flex gap-2 md:gap-4 flex-col">
        {/* <button className="bg-blue-600 text-white">Refresh</button> */}
        <DocumentTemplateTopBar title="Document Templates" />
        <div className="flex gap-2 flex-col">
          {/* <CreateFolderStructure /> */}
          <div className="w-full">
            {/* <button className="bg-gray-600 p-4 text-white" onClick={handleClick}>Click me</button> */}
            <AllDocumentSidebar
              data={documentTemplateFiles && documentTemplateFiles.length > 0 ? documentTemplateFiles : []}
            // refreshData={refreshCampaignData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentTemplates;


export const CreateFolderStructure = () => {

  const [pending, setPending] = useState(false)

  const dispatch = useDispatch();

  // const { documentTemplateFiles } = useSelector((state) => state.campaigns)

  // console.log(documentTemplateFiles);

  const [folderLists, setFolderLists] = useState([])

  const createFolderStructure = async (data) => {

    const folderList = [];
    const tempMap = new Map();

    await data.forEach((folder) => {
      const profile = folder.name || "superAdmin"; // Handle folders without profile
      if (!tempMap.has(profile)) {
        tempMap.set(profile, []);
      }
      tempMap.get(profile).push(folder.name);
    })

    for (const [profile, folders] of tempMap.entries()) {
      folderList.push({ profile, folders });
    }

    // return folderList;
    // setFolderLists(folderList);
    return folderList;
  }


  const getFolderList = async () => {
    try {
      // setPending(true);
      // dispatch(setLoader({ loader : true}))
      // setPending(true)
      const response = await axios.get(`http://192.168.1.26:3000/docs/folders`);

      if (response?.status === 200) {
        const data = response.data;
        const grpData = await createFolderStructure(data);
        setFolderLists(grpData);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403) {
        dispatch(logoutThunkMiddleware());
      } else if (error.response?.data) {
        toastify({ msg: error.response.data, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      // setPending(false);
      // dispatch(setLoader({ loader : false}))
    }
  };


  useEffect(() => {
    getFolderList();
  }, [])

  console.log("created folder structure", folderLists)

  return (
    <>
      <div className="h-[60vh] w-full bg-yellow-200" >
        {/* ${documentSidebar ? " translate-x-0" : "translate-x-[-110%]"}   */}
        <div
          className={`w-full h-full justify-center items-center`}
        >
          {
            folderLists.map((item, index) => {
              return (
                <div key={index} className="flex flex-col gap-2 text-lg font-semibold">
                  <p>
                    {item.profile}
                    <ul className="relative left-5">
                      {
                        item.folders.map((itemnested, idx) => {
                          return (
                            <li key={idx}>
                              {itemnested}
                            </li>
                          )
                        })
                      }
                    </ul>
                  </p>
                </div>
              )
            })
          }
          {/* <button
            className={`bg-green-600 px-4 p-2 rounded-md font-semibold text-md`}
            onClick={() => createFolderStructure(documentTemplateFiles)}
          >
            Create Folder list
          </button> */}
          {/* <ul>
            <li></li>
          </ul> */}
        </div>
        {/* <button >animation</button>
        <div 
          className="h-[100px] w-[100px] transition-all bg-red-500 z-1 duration-[2s] delay-[200ms]  hover:translate-x-[500px]"
        ></div> */}
        {/* <div className={`box-animation  h-[100px] w-[100px] bg-blue-500 `} ></div> */}
      </div>
    </>
  )
}