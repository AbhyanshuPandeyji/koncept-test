import { createSlice } from "@reduxjs/toolkit";
import { toastify } from "../../../components/toast";
import { removeCampaignLoader, setCampaignLoader, setLoader } from "../loaders";
import createAxiosInstance from "../../../config/axiosConfig";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import { setProgress } from "../progress";

const axios = createAxiosInstance();

// changes made by abhyanshu
const initialState = {
  allUsers: null,
  allCampaigns: null,
  campaignDetails: null,
  // campaignCount: null,
  campaignDocCount: 0,
  campaignTemplates: null,
  campaignWhatsappTemplates: null,
  campaignEmailTemplates: null,
  campaignFilesLink: null,

  // changes made by abhyanshu
  singleUser: null,
  documentTemplateCategories: null,
  documentTemplateFiles: null,
  wordFile: null,
  documentVariables: null,
  // documentVariables: {},
  // documentExcelCount: null,

  filteredCampaignData: null,

  campaignReports: null,
  specificCampaignSms: null,
  // dummyCount : null,

  logsType: null,
  logs: null,
};

const campaignsSlice = createSlice({
  name: "campaigns",
  initialState: initialState,
  reducers: {
    setCampaigns(state, action) {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const { setCampaigns } = campaignsSlice.actions;
export default campaignsSlice.reducer;


// export const settingCount = ({count})=>{
//   return async (dispatch) => {
//     dispatch(setCampaigns({dummyCount: count }));
//   }
// }

// changes made by abhyanshu
export const getAllUsersThunkMiddleware = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ getLoader: true }));

      const response = await axios.get(`https://m.kcptl.in/account/get`);

      if (response.status === 200) {
        const data = response.data;
        await dispatch(setCampaigns({ allUsers: data }));
      }

    } catch (error) {
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ getLoader: false }));
    }
  };
}


export const setSingleUserThunkMiddleware = ({ selectedUser }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ getLoader: true }));

      if (selectedUser === null) {
        await dispatch(setCampaigns({ singleUser: selectedUser }))
      } else
        if (selectedUser !== null) {
          await dispatch(setCampaigns({ singleUser: selectedUser }));
        }

    } catch (error) {
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ getLoader: false }));
    }
  };
}


// export const gettingCampaignDetailsData = ({ campaignName }, callback) => {
//   return async (dispatch) => {
//     try {
//       dispatch(setLoader({ loader: true }));

//       const response = await axios.post(`/campaign/getOneCampaign`, {
//         name: campaignName,
//       });

//       if (response.status === 200) {
//         const response1 = await axios.post(`/campaign/countVariousFiles`, {
//           campaignName,
//         });

//         console.log(response1.data);
//         dispatch(
//           setCampaigns({
//             campaignDetails: response.data,
//             campaignCount: response1.data,
//           })
//         );
//         // if (callback) callback(null);
//         return { campaignDetails: response.data, campaignCount: response1.data };
//       }
//     } catch (error) {
//       if (error.response?.data) {
//         toastify({ msg: error.response.data.message, type: "error" });
//       } else {
//         toastify({ msg: error.message, type: "error" });
//       }
//     } finally {
//       dispatch(setLoader({ loader: false }));
//     }
//   };
// }

// changes made by abhyanshu

export const deleteUserThunkMiddleware = ({ accountId }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));
      const response = await axios.post(`/account/delete `, {
        accountId: accountId
      });
      if (response.status === 200) {
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });
        // dispatch()
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

export const addCampaignThunkMiddleware = ({ campaignName, accountId,
  campaignType
}, callback) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ addLoader: true }));

      if (!campaignName) {
        return toastify({ msg: "Please fill all fields", type: "error" });
      }

      const response = await axios.post(`/campaign/add`, {
        name: campaignName,
        accountId: accountId,
        type: campaignType,
      });

      if (response.status === 200) {
        const { message } = response.data;
        callback(null);
        toastify({
          msg: message,
          type: "success",
        });
        dispatch(getAllCampaignThunkMiddleware({ accountId: accountId }));
      }
    } catch (error) {
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ addLoader: false }));
    }
  };
};


// changes made by abhyanshu
export const getAllCampaignThunkMiddleware = ({ accountId }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ getLoader: true }));

      const response = await axios.post(`/campaign/getall`, {
        accountId: accountId
      });

      if (response.status === 200) {
        const data = response.data;
        if (accountId !== null) {
          dispatch(setCampaigns({ allCampaigns: data }));
        } else
          if (accountId === null) {
            dispatch(setCampaigns({ allCampaigns: null }))
          }
      }

    } catch (error) {
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ getLoader: false }));
    }
  };
};

// export const getAllCampaignThunkMiddleware = () => {
//   return async (dispatch) => {
//     dispatch(setLoader({ getLoader: true }));

//     const response = await axios.get(`/campaign/getall`);

//     if (response.status === 200) {
//       const data = response.data;
//       dispatch(setCampaigns({ allCampaigns: data }));
//     }
//     try {
//     } catch (error) {
//       if (error.response?.data) {
//         toastify({ msg: error.response.data.message, type: "error" });
//       } else {
//         toastify({ msg: error.message, type: "error" });
//       }
//     } finally {
//       dispatch(setLoader({ getLoader: false }));
//     }
//   };
// };

// export const getCampaignByNameThunkMiddleware = ({ campaignName }) => {
//   return async (dispatch) => {
//     dispatch(setLoader({ loader: true }));

//     const response = await axios.post(`/campaign/getOneCampaign`, {
//       name: campaignName,
//     });

//     if (response.status === 200) {
//       const data = response.data;
//       dispatch(setCampaigns({ campaignDetails: data }));
//     }
//     try {
//     } catch (error) {
//       if (error.response?.data) {
//         toastify({ msg: error.response.data.message, type: "error" });
//       } else {
//         toastify({ msg: error.message, type: "error" });
//       }
//     } finally {
//       dispatch(setLoader({ loader: false }));
//     }
//   };
// };

export const getCampaignByNameThunkMiddleware = (
  { campaignName,
    // campaignType
  },
  callback
) => {
  return async (dispatch) => {
    try {

      dispatch(setLoader({ loader: true }));
      const response = await axios.post(`/campaign/getOneCampaign`, {
        name: campaignName,
      });

      console.log("campaign details api response ", response.data)

      // changes made by abhyanshu
      if (response.status === 200) {
        // const response1 = await axios.post(
        //   // `/campaign/countVariousFiles`, 
        //   `/campaign/countVariousFilesS3`,
        //   {
        //     campaignName,
        //     // type: campaignType,
        //   });

        // const response2 = await axios.post(`docs/countVariousFiles`, {
        //   campaignName,
        // });

        // console.log(response1.data);
        // const { message } = response.data;
        dispatch(
          setCampaigns({
            campaignDetails: response.data,
            // campaignCount: response.data,
            // campaignDocCount: response.data.itemsInExcel,
          })
        );

        if (callback) callback(null);
      }
    } catch (error) {
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};



export const deleteCampaigns = ({ userId, accountId }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));
      const response = await axios.post(`/campaign/deleteCampaign`, {
        campaignId: userId
      });
      if (response.status === 200) {
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });
        await dispatch(getAllCampaignThunkMiddleware({ accountId }))
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
}

export const editCampaignThunkMiddleware = ({ campaignId, campaignName,
  accountId,
  // campaignType 
}) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));
      const response = await axios.post(`/campaign/editCampaign`, {
        campaignId: campaignId,
        campaignName: campaignName,
        // type: campaignType,
      });
      if (response.status === 200) {
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });
        await dispatch(getAllCampaignThunkMiddleware({ accountId }))
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
}

export const addCampaignExcelThunkMiddleware = ({
  file,
  campaignName,
  campaignType,
  inputRef,
}) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const formData = new FormData();
      formData.append("excel", file);
      formData.append("campaignName", campaignName);
      // changes made by abhyanshu
      formData.append("type", campaignType);

      // console.log("checking if the type is going in the form data", formData)
      // console.log("checking if the type is going in the form data", formData.type)

      const response = await axios.post(`/campaign/uploadExcel`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log(response.data);
        const { message } = response.data;
        await dispatch(getCampaignByNameThunkMiddleware({ campaignName }));
        toastify({
          msg: message,
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
      if (inputRef.current.value) {
        inputRef.current.value = "";
      }
    }
  };
};

export const deleteCampaignExcelThunkMiddleware = ({ campaignName,
  // campaignType 
}) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.post(`/campaign/deleteuploads`, {
        campaignName,
        // type: campaignType,
      });

      if (response.status === 200) {
        const { message } = response.data;
        await dispatch(getCampaignByNameThunkMiddleware({ campaignName }));
        toastify({
          msg: message,
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

export const validateCampaignExcelThunkMiddleware = ({ campaignName,
  // campaignType 
}) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.post(`/campaign/validateExcel`, {
        campaignName,
        // type: campaignType,
      });

      if (response.status === 200) {
        const { message } = response.data;
        await dispatch(getCampaignByNameThunkMiddleware({ campaignName }));
        toastify({
          msg: message,
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

export const uploadCampaignFilesThunkMiddleware = ({
  campaignName,
  files,
  inputRef,
  campaignType,
}) => {
  return async (dispatch) => {
    try {
      dispatch(setProgress({ progressView: true }));
      dispatch(
        setProgress({ uploadCampaignFileStatus: true, progressTab: "upload" })
      );

      let totalFiles = files.length;
      let totalUploaded = 0;

      dispatch(
        setCampaignLoader({
          campaignName,
          status: true,
          totalFiles: files ? totalFiles : 0,
          totalUpload: totalUploaded,
        })
      );

      toastify({
        msg: "Uploading Started!",
        type: "success",
      });

      for (let i = 0; i < totalFiles; i++) {
        // const currentFileNumber = i + 1 ;
        const formData = new FormData();
        // const fileName = `file${i + 1}`
        // formData.append("pdf", files[i]);
        formData.append("files", files[i]);
        formData.append("currentFile", i + 1)
        formData.append("campaignName", campaignName);
        formData.append("totalFiles", totalFiles);
        formData.append("type", campaignType);

        const response = await axios.post(
          // `/campaign/uploadMultiplePdf`,
          `/campaign/uploadMultiplePdfs3`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          // console.log(response.data);
          totalUploaded++;
          dispatch(
            setCampaignLoader({
              campaignName,
              status: true,
              totalFiles: files ? totalFiles : 0,
              totalUpload: totalUploaded,
            })
          );
        }
      }

      await dispatch(getCampaignByNameThunkMiddleware({ campaignName }));
      toastify({
        msg: "All files uploaded successfully",
        type: "success",
      });
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(
        removeCampaignLoader({
          campaignName,
        })
      );
      dispatch(setProgress({ uploadCampaignFileStatus: false }));
      if (inputRef.current.value) {
        inputRef.current.value = "";
      }
    }
  };
};

export const deleteCampaignFilesThunkMiddleware = ({ campaignName,
  campaignType
}) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      //   const response = await axios.delete(
      //     // `/campaign/resetCampaignPdfData `, 
      //     `/campaign/resetCampaignPdfDataS3`, 
      //     {
      //     // campaignName : "TestCampaignType",
      //     campaignName: campaignName,
      //     // type: campaignType,
      //   }
      // );
      const response = await axios.post(`/campaign/resetCampaignPdfDataS3`, { campaignName: campaignName, type: campaignType });

      console.log(response)
      console.log(response.data)

      if (response.status === 200) {
        const { message } = response.data;
        await dispatch(getCampaignByNameThunkMiddleware({ campaignName }));
        toastify({
          msg: message,
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

export const mapCampaignFilesThunkMiddleware = ({ campaignName, campaignType }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.post(
        // `/campaign/mappingExcel  `, 
        `/campaign/mappingExcelS3`,
        {
          campaignName,
          type: campaignType,
        });

      if (response.status === 200) {
        const { message } = response.data;
        await dispatch(getCampaignByNameThunkMiddleware({ campaignName }));
        toastify({
          msg: message,
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};


// changes made by abhyanshu
// export const getAllCampaignReportsThunkMiddleware = ({
//   campaignName }, callback) => {
//   return async (dispatch) => {
//     try {
//       dispatch(setLoader({ loader: true }));

//       const response = await axios.post(`/campaign/getOneCampaign`, {
//         name: campaignName,
//       });

//       if (response.status === 200) {
//         // const response1 = await axios.post(`/campaign/countVariousFiles`, {
//         //   campaignName,
//         // });

//         // console.log(response1.data);
//         dispatch(
//           setCampaigns({
//             campaignDetails: response.data,
//             // campaignCount: response1.data,
//           })
//         );

//         if (callback) callback(null);
//       }
//     } catch (error) {
//       console.log(error);
//       if (error.response?.data) {
//         toastify({ msg: error.response.data.message, type: "error" });
//       } else {
//         toastify({ msg: error.message, type: "error" });
//       }
//     } finally {
//       dispatch(setLoader({ loader: false }));
//     }
//   };
// };

export const getCampaignSmsTemplateThunkMiddleware = (callback = () => { }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.post(`/campaign/getAllTemplates`, {
        type: "sms",
      });

      if (response.status === 200) {
        const { templates } = response.data;
        dispatch(setCampaigns({ campaignTemplates: templates }));
        callback(null);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

export const sendCampaignSmsTemplateThunkMiddleware = (
  { templateId, templateName, message, variables, campaignName }, callback = {}
) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.post(`/campaign/saveSms`, {
        templateId,
        templateName,
        message,
        variables,
        campaignName,
      });

      if (response.status === 200) {
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });
        await dispatch(getSmsCampaignByNameThunkMiddleware({ campaignName }));
        if (callback) callback(null)
      }

    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

export const saveAndSendCampaignSmsTemplateThunkMiddleware = (
  { templateId, templateName, message, variables, campaignName },
  callback = {}
) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.post(`/campaign/sendSms`, {
        templateId,
        templateName,
        message,
        variables,
        campaignName,
      });

      // console.log(response.data)

      if (response.status === 200) {
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });
        await dispatch(getSmsCampaignByNameThunkMiddleware({ campaignName }));
        if (callback) callback(null);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

// changes made by abhyanshu
export const createCampaignSmsTemplateThunkMiddleware = ({
  templateName,
  message,
  type,
  variables,
  verified
},
  callback
) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));
      const response = await axios.post(`/smsTemp/create`, {
        templateName,
        message,
        type,
        variables,
        verified,
      });

      // console.log(response.data)
      if (response.status === 200) {
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });

        await dispatch(getCampaignSmsTemplateThunkMiddleware())
        if (callback) callback(null)
      }

    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        // changes made by abhyanshu - data instead of data.messasge
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

// changes made by abhyanshu
export const deleteCampaignSmsTemplateThunkMiddleware = (
  id
) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.post(`/smsTemp/delete`, {
        templateId: id,
      });

      if (response.status === 200) {
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });
        await dispatch(getCampaignSmsTemplateThunkMiddleware())
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        // changes made by abhyanshu - data instead of data.messasge
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

// changes done by abhyanshu
// in this the name of the person and type of campaign should match
export const getSmsCampaignByNameThunkMiddleware = (
  { campaignName },
  callback
) => {
  return async (dispatch) => {
    try {

      dispatch(setLoader({ loader: true }));

      const response = await axios.post(`/campaign/getOneCampaign`, {
        name: campaignName,
      });

      // if (response.status === 200) {
      //   const response1 = await axios.post(`/campaign/countVariousFiles`, {
      //     campaignName,
      //   });

      console.log("response in the sms campaign thunk middleware after the start campaign", response.data);
      dispatch(
        setCampaigns({
          campaignDetails: response.data,
          // campaignCount: response1.data,
        })
      );

      if (callback) callback(null);
      // }
    } catch (error) {
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

export const createCampaignShortLinkThunkMiddleware = ({
  campaignName,
  // campaignType
}) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.post(
        // `/campaign/createShortLinks `, 
        `/campaign/createShortLinksS3`,
        {
          campaignName,
          // campaignType,
        });

      console.log(response)

      if (response.status === 200) {
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

export const getCampaignFilesLinkThunkMiddleware = ({ campaignName }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.post(`/campaign/getPresentPdfLinks  `, {
        campaignName,
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        dispatch(setCampaigns({ campaignFilesLink: data.pdfLinks }));
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

export const downloadCampaignFilesThunkMiddleware = ({ campaignName }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.post(
        `/campaign/getPresentPdfLinks`,
        {
          campaignName,
        });

      if (response.status === 200) {
        const campaignFilesLink = response.data.pdfLinks;
        toastify({ msg: "PDF Document Download Started!", type: "success" });

        dispatch(setLoader({ loader: false }));
        dispatch(
          setProgress({
            downloadCampaignFileStatus: true,
            progressTab: "download",
            progressView: true,
          })
        );

        let currentBatchSize = 0;
        const maxSize = 300 * 1024 * 1024; // 300MB in bytes
        let batchNumber = 1;
        let zip = new JSZip();
        let filesFolder = zip.folder(`Document_Part${batchNumber}`);

        let processedFiles = 0;
        const totalFiles = campaignFilesLink.length;
        console.log("campaignfiles", campaignFilesLink)
        for (let i = 0; i < totalFiles; i++) {
          if (campaignFilesLink[i] !== "") {
            // const fileUrl = `${campaignFilesLink[i].link}?t=${Date.now()}`;//this is basically previous code in the terms when the files were in server itself but now files are from the aws storage
            const fileUrl = campaignFilesLink[i].link;
            const fileBlob = await fetch(fileUrl).then((res) => res.blob());
            // const response = await axios.get(fileUrl, {
            //   responseType: 'blob'
            // });
            // console.log("file data in" , response.data)
            // const fileBlob =  new Blob([response.data] , 
            //   {
            //     type : response.headers["content-type"],
            //   }
            // )
            console.log("file blob ", fileBlob)
            const fileSize = fileBlob.size;
            console.log("file size", fileSize)

            if (currentBatchSize + fileSize > maxSize) {
              // Generate and download the current batch's zip file
              const content = await zip.generateAsync({ type: "blob" });
              saveAs(content, `Document_Part${batchNumber}.zip`);

              // Reset for next batch
              batchNumber++;
              zip = new JSZip();
              filesFolder = zip.folder(`Document_Part${batchNumber}`);
              currentBatchSize = 0;
            }

            // Add PDF to the current batch
            console.log("file name ", campaignFilesLink[i].name)
            filesFolder.file(`${campaignFilesLink[i].name}`, fileBlob);

            currentBatchSize += fileSize;
            console.log("current batch size", currentBatchSize)
            processedFiles++;
            console.log("processed files", processedFiles);

            dispatch(
              setProgress({
                downloadCampaignFileProgress: (
                  (processedFiles / totalFiles) *
                  100
                ).toFixed(0),
              })
            );
            console.log(`Added PDF ${i + 1} to zip`);
          }
        }

        if (currentBatchSize > 0) {
          const content = await zip.generateAsync({ type: "blob" });
          saveAs(content, `Document_Part${batchNumber}.zip`);
        }

        toastify({ msg: "PDF Document Download Completed!", type: "success" });
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(
        setProgress({
          downloadCampaignFileProgress: 0,
          downloadCampaignFileStatus: false,
        })
      );
    }
  };
};

export const downloadCampaignModifyExcelThunkMiddleware = ({
  campaignName,
}) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.get(
        `/campaign/downloadXlsx/${campaignName}`,
        {
          responseType: "blob", // Important for handling binary data
        }
      );

      if (response.status === 200) {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });

        // Create a link element
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);

        // Set the download attribute to specify the filename
        link.setAttribute("download", `${campaignName}.xlsx`); // Replace 'filename.extension' with the desired file name

        // Append the link to the document body
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      }
    } catch (error) {
      if (error.response?.data) {
        if (error.response.data instanceof Blob) {
          // If the response is a Blob, convert it to text
          const reader = new FileReader();
          reader.onload = () => {
            const errorMessage = JSON.parse(reader.result);

            toastify({ msg: errorMessage.message, type: "error" });
          };
          reader.onerror = () => {
            toastify({ msg: "Error reading error response", type: "error" });
          };
          reader.readAsText(error.response.data);
        } else {
          toastify({ msg: error.response.data.message, type: "error" });
        }
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

export const getCampaignWhatsappTemplateThunkMiddleware = (callback = () => { }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.post(`/campaign/getAllTemplates`, {
        type: "whatsapp",
      });

      if (response.status === 200) {
        const { templates } = response.data;
        dispatch(setCampaigns({ campaignWhatsappTemplates: templates }));
        callback(null);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

// export const sendCampaignWhatsappTemplateThunkMiddleware = ({
//   templateId,
//   templateName,
//   message,
//   variables,
//   campaignName,
// }) => {
//   return async (dispatch) => {
//     try {
//       dispatch(setLoader({ loader: true }));

//       const response = await axios.post(`/campaign/saveWhatsAppCampaign`, {
//         templateId,
//         templateName,
//         message,
//         variables,
//         campaignName,
//       });

//       console.log(response)
//       if (response.status === 200) {
//         // changes made by abhyanshu
//         const { message } = response.data;
//         toastify({
//           msg: message,
//           type: "success",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       if (error.response?.data) {
//         toastify({ msg: error.response.data.message, type: "error" });
//       } else {
//         toastify({ msg: error.message, type: "error" });
//       }
//     } finally {
//       dispatch(setLoader({ loader: false }));
//     }
//   };
// };

export const sendCampaignWhatsappTemplateThunkMiddleware = ({
  templateId,
  templateName,
  message,
  variables,
  campaignName,
},
  callback = {}
) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.post("/campaign/saveWhatsAppCampaign", {
        templateId,
        templateName,
        message,
        variables,
        campaignName,
      });

      console.log(response);
      if (response.status === 200) {
        // changes made by abhyanshu
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });
        await dispatch(getSmsCampaignByNameThunkMiddleware({ campaignName }));
        if (callback) callback(null);
        // dispatch(getAllCampaignThunkMiddleware());
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};
// changes made by abhyanshu
export const saveAndSendCampaignWhatsappTemplateThunkMiddleware = ({
  templateId,
  templateName,
  message,
  variables,
  campaignName,
},
  callback = {}
) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.post(`/campaign/sendWhatsappSms`, {
        templateId,
        templateName,
        message,
        variables,
        campaignName,
      });

      console.log(response)

      if (response.status === 200) {
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });
        await dispatch(getSmsCampaignByNameThunkMiddleware({ campaignName }));
        if (callback) callback(null);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};


//changes made by abhyanshu
export const startCampaignTemplateThunkMiddleware = ({
  campaignData,
  campaignType,
  campaignUserName,
}) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));
      // console.log(campaignData);
      let startCampaignUrl = ""

      if (campaignType === "Whatsapp") {
        // console.log("whatsapp camapign url")
        startCampaignUrl = "/campaign/startWhatsappSms"
      } else
        if (campaignType === "SMS") {
          startCampaignUrl = "/campaign/startSmsCampaign";
        }

      // check will the quotes be required after creation or not
      console.log(`"${startCampaignUrl}"`)
      console.log("url we are sending", startCampaignUrl)
      console.log("payload we are sending", campaignData)

      const response = await axios.post(`${startCampaignUrl}`, {
        campaignData
      });

      console.log("redux starting campaign response data", response.data)

      if (response.status === 200) {
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });
        await dispatch(getSmsCampaignByNameThunkMiddleware({ campaignName: campaignUserName }));
      }

      // await dispatch(getCampaignByNameThunkMiddleware({campaignName : campaignUserName}));

    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

// changes made by abhyanshu
export const createCampaignWhatsappTemplateThunkMiddleware = ({
  templateName,
  message,
  type,
  variables,
  verified
},
  callback = {}
) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));
      const response = await axios.post(`/whatsappTemp/create`, {
        templateName,
        message,
        type,
        variables,
        verified,
      });
      console.log(response.data)

      if (response.status === 200) {
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });
        await dispatch(getCampaignWhatsappTemplateThunkMiddleware());
        if (callback) callback(null)
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        // changes made by abhyanshu
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

// changes made by abhyanshu
export const deleteCampaignWhatsappTemplateThunkMiddleware = (
  id
) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.post(`/whatsappTemp/delete`, {
        templateId: id,
      });

      console.log(response)

      if (response.status === 200) {
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });
        await dispatch(getCampaignWhatsappTemplateThunkMiddleware())
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        // changes made by abhyanshu - data , instead of data.message
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};


// changes made by abhyanshu
export const startSingleCampaignPdfTemplateThunkMiddleware = ({
  campaignName,
  campaignType
}) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.post(`/campaign/mergePdfs `, {
        campaignName,
        type: campaignType,
      });

      if (response.status === 200) {
        const { message } = response.data;

        toastify({
          msg: message,
          type: "success",
        });

        dispatch(
          setProgress({
            progressView: true,
            progressTab: "merge",
            singlePdfCampaignFileStatus: true,
          })
        );

        const intervalId = setInterval(async () => {
          try {
            const response = await axios.post("/campaign/singlePdfProgress ", {
              campaignName,
              type: campaignType,
            });

            if (response.status === 200) {
              const { totalSinglePdfProgress, singlePdfProgress } =
                response.data;

              dispatch(
                setProgress({
                  singlePdfCampaignFileProgress: (
                    (singlePdfProgress / totalSinglePdfProgress) *
                    100
                  ).toFixed(0),
                })
              );

              if (
                response.data?.totalSinglePdfProgress ===
                response.data?.singlePdfProgress
              ) {
                toastify({
                  msg: "Single Pdf Merge Successfully",
                  type: "success",
                });
                clearInterval(intervalId);
              }
            }
          } catch (error) {
            if (error.response?.data) {
              toastify({ msg: error.response.data.message, type: "error" });
            } else {
              toastify({ msg: error.message, type: "error" });
            }
          } finally {
            dispatch(
              setProgress({
                singlePdfCampaignFileStatus: false,
                singlePdfCampaignFileProgress: 0,
              })
            );
            clearInterval(intervalId);
          }
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

export const downloadCampaignSinglePdfThunkMiddleware = ({ campaignName }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.get(
        `/campaign/downloadMergedPdf/${campaignName}`,
        {
          responseType: "blob", // Important for handling binary data
        }
      );

      if (response.status === 200) {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });

        // Create a link element
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);

        // Set the download attribute to specify the filename
        link.setAttribute("download", `${campaignName}.xlsx`); // Replace 'filename.extension' with the desired file name

        // Append the link to the document body
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      }
    } catch (error) {
      if (error.response?.data) {
        if (error.response.data instanceof Blob) {
          // If the response is a Blob, convert it to text
          const reader = new FileReader();
          reader.onload = () => {
            const errorMessage = JSON.parse(reader.result);

            toastify({ msg: errorMessage.message, type: "error" });
          };
          reader.onerror = () => {
            toastify({ msg: "Error reading error response", type: "error" });
          };
          reader.readAsText(error.response.data);
        } else {
          toastify({ msg: error.response.data.message, type: "error" });
        }
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

export const filterCampaignFilesThunkMiddleware = ({ fileName }, callback) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      console.log(fileName);
      const response = await axios.post(`/campaign/searchFile`, {
        fileName,
      });

      if (response.status === 200) {
        const data = response.data;

        dispatch(setCampaigns({ filteredCampaignData: data }));
        callback(null);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

export const getCampaignEmailTemplateThunkMiddleware = (callback) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.get(`/campaign/eTemp`);

      if (response.status === 200) {
        const data = response.data;
        dispatch(setCampaigns({ campaignEmailTemplates: data }));
        if (callback) callback(null);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

export const uploadCampaignEmailTemplateThunkMiddleware = (
  { name, html },
  callback
) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.post(`/campaign/eTemp`, {
        name,
        html,
      });

      if (response.status === 200) {
        const { message } = response.data;
        dispatch(getCampaignEmailTemplateThunkMiddleware());
        toastify({ msg: message, type: "success" });
        callback(null);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};


export const testEmailSendThunkMiddleware = (
  { text, subject, html },
  callback
) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));


      const response = await axios.post(`192.168.1.24:8000/sendemail`, {
        to: "adityaraj9843@gmail.com",
        subject: subject,
        text: text,
        html: html,
      });

      console.log(response)
      console.log(response.data)

      if (response.status === 200) {
        const { message } = response.data;
        // dispatch(getCampaignEmailTemplateThunkMiddleware());
        toastify({ msg: message, type: "success" });
        callback(null);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};


export const sendCampaignEmailThunkMiddleware = (
  { subject, text, templateName, campaignName },
  callback
) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.post(`/campaign/sendBulkEmail`, {
        subject,
        text,
        templateName,
        campaignName,
      });

      if (response.status === 200) {
        const { message } = response.data;
        toastify({ msg: message, type: "success" });
        callback(null);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

export const viewCampaignDocumentThunkMiddleware = ({ campaignName }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.get(
        `/campaign/viewDocument/${campaignName}`,
        {
          responseType: "blob", // Important to specify 'blob' to handle binary data
        }
      );

      if (response.status === 200) {
        // Create a blob from the response data
        const blob = new Blob([response.data], { type: "application/pdf" });
        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);
        // Open the URL in a new window/tab
        window.open(url, "_blank");
        // Optionally, release the object URL after some time
        setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response)
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

export const getCampaignLogsThunkMiddleware = (
  { campaignName, logsType },
  callback
) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      let url;

      if (logsType === "Sms") {
        url = `/campaign/getSmsLogs/${campaignName}`;
      } else if (logsType === "Email") {
        url = `/campaign/EmailLog/${campaignName}`;
      } else {
        url = `/campaign/getWhatsappSmsLogs/${campaignName}`;
      }

      const response = await axios.get(url);

      if (response.status === 200) {
        const data = response.data;
        dispatch(setCampaigns({ logs: data, logsType }));
        if (callback) callback(null);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};



// changes made by abhyanshu
export const createDocumentTemplateCategoryThunkMiddleware = (
  { categoryName },
) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      console.log(categoryName)

      const response = await axios.post(`docsCategory/post`, {
        categoryName,
      });


      console.log(response)

      if (response.status === 200) {
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });
        await dispatch(getAllCategoriesThunkMiddleware());
      }

    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};


export const deleteDocumentTemplateCategoryThunkMiddleware = (
  { categoryName },
) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      console.log(categoryName)

      const response = await axios.post(`docsCategory/delete`, {
        categoryName,
      });


      console.log(response)

      if (response.status === 200) {
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });
        await dispatch(getAllCategoriesThunkMiddleware());
      }

    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};


export const getAllCategoriesThunkMiddleware = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ getLoader: true }));

      const response = await axios.get(`docsCategory/get`);
      console.log("category data , in api", response.data)


      if (response.status === 200) {
        const data = response.data;
        console.log("category data , in api", data)
        await dispatch(setCampaigns({ documentTemplateCategories: data }));
      }

    } catch (error) {
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ getLoader: false }));
    }
  };
};


export const createDocumentTemplateFileThunkMiddleware = (
  // { docsName, file, category },
  formData
) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));
      const response = await axios.post(`docs/docsTempUpload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );


      console.log(response)

      if (response.status === 200) {
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });
        await dispatch(getAllTemplateFilesThunkMiddleware());
      }

    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};


export const getAllTemplateFilesThunkMiddleware = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ getLoader: true }));

      const response = await axios.get(`docs/get`);
      // console.log("category data , in api", response.data)


      if (response.status === 200) {
        const data = response.data;
        // console.log("category data , in api", data)
        await dispatch(setCampaigns({ documentTemplateFiles: data }));
      }

    } catch (error) {
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ getLoader: false }));
    }
  };
};

export const deleteDocumentFileThunkMiddleware = ({ documentName, documentId }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ getLoader: true }));

      const response = await axios.post(`docs/delete/${documentId}`, {
        //  id : documentId 
      });
      // console.log("category data , in api", response.data)


      if (response.status === 200) {
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });
        await dispatch(getAllTemplateFilesThunkMiddleware())
        // console.log("category data , in api", data)
      }

    } catch (error) {
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ getLoader: false }));
    }
  };
}



// Merge and Pdf Process pre part
// export const getWordDocumentFileThunkMiddleware = ({filePath}) => {
//   return async (dispatch) => {
//     try {
//       dispatch(setLoader({ getLoader: true }));

//       const response = await axios.post(`/docs/docxBuffer` , {
//         path: filePath
//       });
//       // console.log("category data , in api", response.data)


//       if (response.status === 200) {
//         const data = response.data;
//         console.log("category data , in api", data)
//         dispatch(setCampaigns({ wordFile : data }));
//       }

//     } catch (error) {
//       if (error.response?.data) {
//         toastify({ msg: error.response.data.message, type: "error" });
//       } else {
//         toastify({ msg: error.message, type: "error" });
//       }
//     } finally {
//       dispatch(setLoader({ getLoader: false }));
//     }
//   };
// };






// Merging Process Prepare Section
// to upload excel in the merge section
// export const addDocumentCampaignExcelThunkMiddleware = ({
//   file,
//   campaignName,
//   inputRef,
// }) => {
//   return async (dispatch) => {
//     try {
//       dispatch(setLoader({ loader: true }));

//       const formData = new FormData();
//       formData.append("excel", file);
//       formData.append("campaignName", campaignName);

//       const response = await axios.post(`docs/documentExcelUpload`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.status === 200) {
//         console.log(response.data);
//         const { message } = response.data;
//         await dispatch(getCampaignByNameThunkMiddleware({ campaignName }));
//         toastify({
//           msg: message,
//           type: "success",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       if (error.response?.data) {
//         toastify({ msg: error.response.data.message, type: "error" });
//       } else {
//         toastify({ msg: error.message, type: "error" });
//       }
//     } finally {
//       dispatch(setLoader({ loader: false }));
//       if (inputRef.current.value) {
//         inputRef.current.value = "";
//       }
//     }
//   };
// };

// to validate excel in the merge section
// export const validateDocumentCampaignExcelThunkMiddleware = ({ campaignName }) => {
//   return async (dispatch) => {
//     try {
//       dispatch(setLoader({ loader: true }));

//       const response = await axios.post(`docs/validateExcel`, {
//         campaignName,
//       });

//       if (response.status === 200) {
//         const { message } = response.data;
//         await dispatch(getCampaignByNameThunkMiddleware({ campaignName }));
//         toastify({
//           msg: message,
//           type: "success",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       if (error.response?.data) {
//         toastify({ msg: error.response.data.message, type: "error" });
//       } else {
//         toastify({ msg: error.message, type: "error" });
//       }
//     } finally {
//       dispatch(setLoader({ loader: false }));
//     }
//   };
// };

// to send templateId in backend of documents to be merged

export const sendSelectedDocumentTemplateThunkMiddleware = ({ templateId, campaignName, campaignType },
  callback
) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));
      const response = await axios.post(`docs/docxVariable`, {
        templateId: templateId,
        campaignName: campaignName,
      });

      // problem is here can't set the document varialbes values otherwise it should be 
      // different for every campaign , and that cant be done if the state is saved in the 
      // redux it should be either sepereate or selected by the campaign name 
      // if object method can work
      console.log("document template response of sending template", response.data)
      if (response.status === 200) {
        if (callback) callback(null)
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });
        // dispatch(setCampaigns({ documentVariables: {
        //   [campaignName] : response.data
        // }}))
        // dispatch(setCampaigns({ documentVariables: response.data }))
        // if(callback) 
        // return response.status;
        await dispatch(getCampaignByNameThunkMiddleware({ campaignName }));
      }

    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
}

// for getting document variables 
// export const getDocumentTemplateVaribalesThunkMiddleware = ({ campaignName }) => {
//   return async (dispatch) => {
//     try {
//       dispatch(setLoader({ loader: true }));
//       const response = await axios.post(`docs/getPlaceholders`, {
//         campaignName: campaignName,
//       });
//       console.log("document template response of sending template", response.data)
//       console.log("document template response of getting variables in the middleware", response)
//       if (response.status === 200) {
//         const { message } = response.data;
//         toastify({
//           msg: message,
//           type: "success",
//         });
//         console.log("document template response of getting variables in the middleware", response)
//         // await dispatch(setCampaigns({ documentVariables: response.data }))
//       }
//     } catch (error) {
//       console.log(error);
//       if (error.response?.data) {
//         toastify({ msg: error.response.data.message, type: "error" });
//       } else {
//         toastify({ msg: error.message, type: "error" });
//       }
//     } finally {
//       dispatch(setLoader({ loader: false }));
//     }
//   };
// }


// to send the maped data variables values in merge section

export const sendDocumentVaribleValuesThunkMiddleware = ({
  selectedVariablesValues,
  campaignName,
  campaignType,
},
  callback
) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      console.log("the mapped data variable api payload sending ", selectedVariablesValues, campaignName)
      // const response = await axios.post("https://m.kcptl.in/docs/mergeMapped", {
      const response = await axios.post("/docs/mergeMapped", {
        selectedVariablesValues: selectedVariablesValues,
        // customizeData: docxVarValues,
        campaignName: campaignName,
      });

      console.log("response of sending the mapped data variables ", response)

      console.log(response);
      if (response.status === 200) {
        // changes made by abhyanshu
        if (callback) callback(null);
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });
        await dispatch(getCampaignByNameThunkMiddleware({ campaignName }));
        // dispatch(getAllCampaignThunkMiddleware());
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

// export const uploadDocumentCampaignPDFFilesThunkMiddleware = ({
//   campaignName,
//   files,
//   inputRef,
// }) => {
//   return async (dispatch) => {
//     try {
//       dispatch(setProgress({ progressView: true }));
//       dispatch(
//         setProgress({ uploadCampaignFileStatus: true, progressTab: "upload" })
//       );

//       let totalFiles = files.length;
//       let totalUploaded = 0;

//       dispatch(
//         setCampaignLoader({
//           campaignName,
//           status: true,
//           totalFiles: files ? totalFiles : 0,
//           totalUpload: totalUploaded,
//         })
//       );

//       toastify({
//         msg: "Uploading Started!",
//         type: "success",
//       });

//       for (let i = 0; i < totalFiles; i++) {
//         const formData = new FormData();
//         formData.append("pdf", files[i]);
//         formData.append("campaignName", campaignName);
//         formData.append("totalFiles", totalFiles);

//         const response = await axios.post(
//           `/campaign/uploadMultiplePdf`,
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         if (response.status === 200) {
//           // console.log(response.data);
//           totalUploaded++;
//           dispatch(
//             setCampaignLoader({
//               campaignName,
//               status: true,
//               totalFiles: files ? totalFiles : 0,
//               totalUpload: totalUploaded,
//             })
//           );
//         }
//       }

//       await dispatch(getCampaignByNameThunkMiddleware({ campaignName }));
//       toastify({
//         msg: "All files uploaded successfully",
//         type: "success",
//       });
//     } catch (error) {
//       console.log(error);
//       if (error.response?.data) {
//         toastify({ msg: error.response.data.message, type: "error" });
//       } else {
//         toastify({ msg: error.message, type: "error" });
//       }
//     } finally {
//       dispatch(
//         removeCampaignLoader({
//           campaignName,
//         })
//       );
//       dispatch(setProgress({ uploadCampaignFileStatus: false }));
//       if (inputRef.current.value) {
//         inputRef.current.value = "";
//       }
//     }
//   };
// };


/* */
// Process section
// export const deleteDocumentCampaignFilesThunkMiddleware = ({ campaignName }) => {
//   return async (dispatch) => {
//     try {
//       dispatch(setLoader({ loader: true }));

//       const response = await axios.post(`/campaign/resetCampaignPdfData `, {
//         campaignName,
//       });

//       if (response.status === 200) {
//         const { message } = response.data;
//         await dispatch(getCampaignByNameThunkMiddleware({ campaignName }));
//         toastify({
//           msg: message,
//           type: "success",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       if (error.response?.data) {
//         toastify({ msg: error.response.data.message, type: "error" });
//       } else {
//         toastify({ msg: error.message, type: "error" });
//       }
//     } finally {
//       dispatch(setLoader({ loader: false }));
//     }
//   };
// };

// export const mapDocumentCampaignFilesThunkMiddleware = ({ campaignName }) => {
//   return async (dispatch) => {
//     try {
//       dispatch(setLoader({ loader: true }));

//       const response = await axios.post(`/campaign/mappingExcel  `, {
//         campaignName,
//       });

//       if (response.status === 200) {
//         const { message } = response.data;
//         await dispatch(getCampaignByNameThunkMiddleware({ campaignName }));
//         toastify({
//           msg: message,
//           type: "success",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       if (error.response?.data) {
//         toastify({ msg: error.response.data.message, type: "error" });
//       } else {
//         toastify({ msg: error.message, type: "error" });
//       }
//     } finally {
//       dispatch(setLoader({ loader: false }));
//     }
//   };
// };

// to delete document campaign excel of merge section


// export const deleteDocumentCampaignExcelThunkMiddleware = ({ campaignName }) => {
//   return async (dispatch) => {
//     try {
//       dispatch(setLoader({ loader: true }));
//       console.log("document deleted api call")
//       // const response = await axios.post(`/campaign/deleteuploads`, {
//       //   campaignName,
//       // });

//       // if (response.status === 200) {
//       //   const { message } = response.data;
//       //   await dispatch(getCampaignByNameThunkMiddleware({ campaignName }));
//       //   toastify({
//       //     msg: message,
//       //     type: "success",
//       //   });
//       // }
//     } catch (error) {
//       console.log(error);
//       if (error.response?.data) {
//         toastify({ msg: error.response.data.message, type: "error" });
//       } else {
//         toastify({ msg: error.message, type: "error" });
//       }
//     } finally {
//       dispatch(setLoader({ loader: false }));
//     }
//   };
// };


// Merging Process Pdf Section
// starting pdf sample

export const startDocumentSingleCampaignPdfTemplateThunkMiddleware = ({
  campaignName,
}) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      // to actually start uploading the pdf
      const response = await axios.post(`docs/docxPdfMaker`, {
        campaignName,
      });

      if (response.status === 200) {
        const { message } = response.data;

        toastify({
          msg: message,
          type: "success",
        });

        dispatch(
          setProgress({
            progressView: true,
            progressTab: "merge",
            singlePdfCampaignFileStatus: true,
          })
        );

        // to get progress the pdfs is been started and completed
        const intervalId = setInterval(async () => {
          try {
            const response = await axios.post("/campaign/singlePdfProgress", {
              campaignName,
            });

            if (response.status === 200) {
              const { totalSinglePdfProgress, singlePdfProgress } =
                response.data;

              dispatch(
                setProgress({
                  singlePdfCampaignFileProgress: (
                    (singlePdfProgress / totalSinglePdfProgress) *
                    100
                  ).toFixed(0),
                })
              );

              if (
                response.data?.totalSinglePdfProgress ===
                response.data?.singlePdfProgress
              ) {
                toastify({
                  msg: "Single Pdf Merge Successfully",
                  type: "success",
                });
                clearInterval(intervalId);
              }
            }
          } catch (error) {
            if (error.response?.data) {
              toastify({ msg: error.response.data.message, type: "error" });
            } else {
              toastify({ msg: error.message, type: "error" });
            }
          } finally {
            dispatch(
              setProgress({
                singlePdfCampaignFileStatus: false,
                singlePdfCampaignFileProgress: 0,
              })
            );
            clearInterval(intervalId);
          }
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

// downloading pdf files
export const downloadCampaignDocumentSinglePdfThunkMiddleware = ({ campaignName }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.get(
        `/campaign/downloadMergedPdf/${campaignName}`,
        {
          responseType: "blob", // Important for handling binary data
        }
      );

      if (response.status === 200) {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });

        // Create a link element
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);

        // Set the download attribute to specify the filename
        link.setAttribute("download", `${campaignName}.xlsx`); // Replace 'filename.extension' with the desired file name

        // Append the link to the document body
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      }
    } catch (error) {
      if (error.response?.data) {
        if (error.response.data instanceof Blob) {
          // If the response is a Blob, convert it to text
          const reader = new FileReader();
          reader.onload = () => {
            const errorMessage = JSON.parse(reader.result);

            toastify({ msg: errorMessage.message, type: "error" });
          };
          reader.onerror = () => {
            toastify({ msg: "Error reading error response", type: "error" });
          };
          reader.readAsText(error.response.data);
        } else {
          toastify({ msg: error.response.data.message, type: "error" });
        }
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};

// downloading multiple files pdfs handler for merge process section
export const downloadCampaignDocumentFilesThunkMiddleware = ({ campaignName }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.post(`/campaign/getPresentPdfLinks  `, {
        campaignName,
      });

      if (response.status === 200) {
        const campaignFilesLink = response.data.pdfLinks;
        toastify({ msg: "Document Download Started!", type: "success" });

        dispatch(setLoader({ loader: false }));
        dispatch(
          setProgress({
            downloadCampaignFileStatus: true,
            progressTab: "download",
            progressView: true,
          })
        );

        let currentBatchSize = 0;
        const maxSize = 300 * 1024 * 1024; // 300MB in bytes
        let batchNumber = 1;
        let zip = new JSZip();
        let filesFolder = zip.folder(`Document_Part${batchNumber}`);

        let processedFiles = 0;
        const totalFiles = campaignFilesLink.length;

        for (let i = 0; i < totalFiles; i++) {
          if (campaignFilesLink[i] !== "") {
            const fileUrl = `${campaignFilesLink[i].link}?t=${Date.now()}`;
            const fileBlob = await fetch(fileUrl).then((res) => res.blob());
            const fileSize = fileBlob.size;

            if (currentBatchSize + fileSize > maxSize) {
              // Generate and download the current batch's zip file
              const content = await zip.generateAsync({ type: "blob" });
              saveAs(content, `Document_Part${batchNumber}.zip`);

              // Reset for next batch
              batchNumber++;
              zip = new JSZip();
              filesFolder = zip.folder(`Document_Part${batchNumber}`);
              currentBatchSize = 0;
            }

            // Add PDF to the current batch
            filesFolder.file(`${campaignFilesLink[i].name}`, fileBlob);

            currentBatchSize += fileSize;
            processedFiles++;

            dispatch(
              setProgress({
                downloadCampaignFileProgress: (
                  (processedFiles / totalFiles) *
                  100
                ).toFixed(0),
              })
            );
            console.log(`Added PDF ${i + 1} to zip`);
          }
        }

        if (currentBatchSize > 0) {
          const content = await zip.generateAsync({ type: "blob" });
          saveAs(content, `Document_Part${batchNumber}.zip`);
        }

        toastify({ msg: "Document Download Completed!", type: "success" });
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(
        setProgress({
          downloadCampaignFileProgress: 0,
          downloadCampaignFileStatus: false,
        })
      );
    }
  };
};

export const createMultipleDocumentCampaignFilesThunkMiddleware = ({
  campaignName,
  files,
  inputRef,
}) => {
  return async (dispatch) => {
    try {
      dispatch(setProgress({ progressView: true }));
      dispatch(
        setProgress({ uploadCampaignFileStatus: true, progressTab: "upload" })
      );

      let totalFiles = files.length;
      let totalUploaded = 0;

      dispatch(
        setCampaignLoader({
          campaignName,
          status: true,
          totalFiles: files ? totalFiles : 0,
          totalUpload: totalUploaded,
        })
      );

      toastify({
        msg: "Uploading Started!",
        type: "success",
      });

      for (let i = 0; i < totalFiles; i++) {
        const formData = new FormData();
        formData.append("pdf", files[i]);
        formData.append("campaignName", campaignName);
        formData.append("totalFiles", totalFiles);

        const response = await axios.post(
          `/campaign/uploadMultiplePdf`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          // console.log(response.data);
          totalUploaded++;
          dispatch(
            setCampaignLoader({
              campaignName,
              status: true,
              totalFiles: files ? totalFiles : 0,
              totalUpload: totalUploaded,
            })
          );
        }
      }

      await dispatch(getCampaignByNameThunkMiddleware({ campaignName }));
      toastify({
        msg: "All files uploaded successfully",
        type: "success",
      });
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(
        removeCampaignLoader({
          campaignName,
        })
      );
      dispatch(setProgress({ uploadCampaignFileStatus: false }));
      if (inputRef.current.value) {
        inputRef.current.value = "";
      }
    }
  };
};


// process section new - changes made by abhyanshu
// export const startSamplePdfThunkMiddleware = ({
//   campaignName,
//   campaignType
// }) => {
//   return async (dispatch) => {
//     try {
//       dispatch(setLoader({ loader: true }));

//       const response = await axios.post(`/docs/createSamplePdf`, {
//         campaignName: campaignName,
//         type: campaignType,
//       });

//       console.log("response in the start sample pdf", response)
//       if (response.status === 200) {
//         const { message } = response.data;

//         toastify({
//           msg: message,
//           type: "success",
//         });

//         dispatch(
//           setProgress({
//             progressView: true,
//             progressTab: "merge",
//             uploadCampaignFileStatus: true,
//           })
//         );

//         // let totalFiles = 0;
//         // let totalUploaded = 0;

//         // dispatch(
//         //   setCampaignLoader({
//         //     campaignName,
//         //     status: true,
//         //     totalFiles: totalFiles ? totalFiles : 0,
//         //     totalUpload: totalUploaded,
//         //   })
//         // );

//         const intervalId = setInterval(async () => {
//           try {
//             const response = await axios.post("/docs/getProgressSampleMerging", {
//               campaignName: campaignName,
//             });

//             if (response.status === 200) {
//               const { totalFiles, progress } =
//                 response.data;

//               console.log("total files", totalFiles);
//               console.log("no of files created in the backend", progress);

//               dispatch(
//                 setProgress({
//                   samplePdfCampaignFileProgress: (
//                     (progress / totalFiles) *
//                     100
//                   ).toFixed(0),
//                 })
//               );
//               // dispatch(
//               //   setCampaignLoader({
//               //     campaignName,
//               //     status: true,
//               //     totalFiles: totalFiles,
//               //     // ? totalFiles : 0,
//               //     totalUpload: progress,
//               //   })
//               // );

//               if (
//                 response.data?.totalFiles ===
//                 response.data?.progress
//               ) {
//                 toastify({
//                   msg: "Sample Pdf Merge Successfully",
//                   type: "success",
//                 });
//                 clearInterval(intervalId);
//               }
//             }
//           } catch (error) {
//             if (error.response?.data) {
//               toastify({ msg: error.response.data.message, type: "error" });
//             } else {
//               toastify({ msg: error.message, type: "error" });
//             }
//           } finally {
//             // dispatch(
//             //   setProgress({
//             //     samplePdfCampaignFilesStatus: false,
//             //     samplePdfCampaignFilesProgress: 0,
//             //   })
//             // );
//             dispatch(
//               removeCampaignLoader({
//                 campaignName,
//               })
//             );
//             dispatch(setProgress({ uploadCampaignFileStatus: false }));
//             clearInterval(intervalId);
//           }
//         }, 1000);
//       }
//     } catch (error) {
//       console.log(error);
//       if (error.response?.data) {
//         toastify({ msg: error.response.data.message, type: "error" });
//       } else {
//         toastify({ msg: error.message, type: "error" });
//       }
//     } finally {
//       dispatch(setLoader({ loader: false }));
//     }
//   };
// };


// for reference of multiple files creating in backend when using start sample pdfs

export const startSamplePdfThunkMiddleware = ({
  campaignName,
  campaignType,
}) => {
  return async (dispatch) => {
    try {

      dispatch(setLoader({ loader: true }));

      // let progressResponse = 0;

      const response = await axios.post(`/docs/createSamplePdf`, {
        campaignName: campaignName,
      });

      if (response.status === 200) {
        const { message } = response.data;
        console.log("whole data at the request ", response.data)
        console.log("whole data at the request only response", response)
        let files = response.data.totalFiles;

        toastify({
          msg: message,
          type: "success",
        });

        await dispatch(
          setProgress({
            progressView: true,
            progressTab: "merge",
            samplePdfCampaignFilesStatus: true,
          })
        );

        const intervalId =
          setInterval(async () => {
            try {
              const response1 = await axios.post("/docs/getProgressSampleMerging", {
                campaignName: campaignName
              });

              if (response1.status === 200) {
                // progressResponse++
                const { progress } = response1.data;

                dispatch(
                  setProgress({
                    samplePdfCampaignFilesProgress: (
                      (Number.parseInt(progress) / files) *
                      100
                    ).toFixed(0),
                  })
                );

                if (response.data?.totalFiles === Number.parseInt(response1.data?.progress)) {
                  toastify({
                    msg: "All Sample Pdfs Merge Successfully",
                    type: "success",
                  });
                  dispatch(
                    setProgress({
                      samplePdfCampaignFilesStatus: false,
                      samplePdfCampaignFilesProgress: 0,
                    })
                  );
                  clearInterval(intervalId);
                  // await dispatch(getCampaignByNameThunkMiddleware({campaignName}))
                }
              }
            }
            catch (error) {
              clearInterval(intervalId);
              if (error.response?.data) {
                toastify({ msg: error.response.data.message, type: "error" });
              } else {
                toastify({ msg: error.message, type: "error" });
              }
            }
          }, 1000);
        await dispatch(getCampaignByNameThunkMiddleware({ campaignName: campaignName }))
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};


export const deleteSamplePdfsFilesThunkMiddleware = ({
  campaignName,
}) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));
      const response = await axios.post(`/docs/deleteSamplePdf`, {
        campaignName: campaignName,
      });
      if (response.status === 200) {
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });
        // dispatch()
        await dispatch(getCampaignByNameThunkMiddleware({ campaignName: campaignName, }))
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
}

// prepare deleting map data variables
export const deleteMapSelectedVariableValues = ({ campaignName }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));
      const response = await axios.post(`/docs/deleteSelectedVariablesValues`, {
        campaignName
      });
      if (response.status === 200) {
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });
        // dispatch()
        await dispatch(getCampaignByNameThunkMiddleware({ campaignName: campaignName }))
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};


// finalize download single pdf file
export const downloadCampaignSinglePdfFileThunkMiddleware = ({ campaignName }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      // method 1
      const response = await axios.get(`/docs/downloadpdf?campaignName=${campaignName}`,
        {
          responseType: "blob",
        }
      );

      if (response.status === 200) {
        // const  message  = response.data;
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        // link.target = "_blank";
        link.setAttribute("download", `${campaignName}.pdf`);
        // link.setAttribute("download", `${campaignName}.docx`);
        // link.setAttribute("download", `${campaignName}.xlsx`);


        document.body.appendChild(link);
        link.click();

        // Optionally remove the link after clicking
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 100);
      }

      // method 2
      // const link = document.createElement("a");

      // link.target = "_blank"
      // const link = document.createElement("a");
      // link.href = `https://m.kcptl.in/docs/downloadpdf?campaignName=${campaignName}`
      // link.target = "_blank";
      // document.body.appendChild(link);
      // link.click();

      // // Append the link to the document body
      // document.body.appendChild(link);

      // // Programmatically click the link to trigger the download
      // link.click();

      // link.parentNode.removeChild(link);


    } catch (error) {
      if (error.response?.data) {
        if (error.response.data instanceof Blob) {
          // If the response is a Blob, convert it to text
          const reader = new FileReader();
          reader.onload = () => {
            const errorMessage = JSON.parse(reader.result);

            toastify({ msg: errorMessage.message, type: "error" });
          };
          reader.onerror = () => {
            toastify({ msg: "Error reading error response", type: "error" });
          };
          reader.readAsText(error.response.data);
        } else {
          toastify({ msg: error.response.data.message, type: "error" });
        }
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};


// create documents
export const createDocumentsThunkMiddleware = ({
  campaignName,
  campaignType,
}) => {
  return async (dispatch) => {
    try {

      dispatch(setLoader({ loader: true }));

      // let progressResponse = 0;

      const response = await axios.post(`/docs/createMergedPdfMain`, {
        campaignName: campaignName,
      });

      if (response.status === 200) {
        const { message } = response.data;
        let files = response.data.totalFiles;

        toastify({
          msg: message,
          type: "success",
        });

        await dispatch(
          setProgress({
            progressView: true,
            progressTab: "merge",
            createDocumentsCampaignFilesStatus: true,
          })
        );

        const intervalId =
          setInterval(async () => {
            try {
              const response1 = await axios.post("/docs/getProcessMainMerging", {
                campaignName: campaignName
              });

              if (response1.status === 200) {
                // progressResponse++
                const { progress } = response1.data;

                dispatch(
                  setProgress({
                    createDocumentsCampaignFilesProgress: (
                      (Number.parseInt(progress) / files) *
                      100
                    ).toFixed(0),
                  })
                );

                if (response.data?.totalFiles === Number.parseInt(response1.data?.progress)) {
                  clearInterval(intervalId);
                  toastify({
                    msg: "All Main Document Created Successfully",
                    type: "success",
                  });
                  dispatch(
                    setProgress({
                      createDocumentsCampaignFilesStatus: false,
                      createDocumentsCampaignFilesProgress: 0,
                    })
                  );
                  // await dispatch(getCampaignByNameThunkMiddleware({campaignName}))
                }
              }
            }
            catch (error) {
              clearInterval(intervalId);
              if (error.response?.data) {
                toastify({ msg: error.response.data.message, type: "error" });
              } else {
                toastify({ msg: error.message, type: "error" });
              }
            }
          }, 1000);
        await dispatch(getCampaignByNameThunkMiddleware({ campaignName: campaignName }))
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};


export const deleteCreatedDocumentsFilesThunkMiddleware = ({
  campaignName,
}) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));
      const response = await axios.post(`/docs/deleteMainPdf
`, {
        campaignName: campaignName,
      });
      if (response.status === 200) {
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });
        // dispatch()
        await dispatch(getCampaignByNameThunkMiddleware({ campaignName: campaignName, }))
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
}

export const getAllCampaignReportsThunkMiddleware = ({ campaignName }) => {
  return async (dispatch) => {
    try {

      dispatch(setLoader({ loader: true }));
      const response = await axios.post(`/campaign/getInsideCampaigns`, {
        campaignName: campaignName,
      });

      // console.log("campaign details api response ", response.data)

      // changes made by abhyanshu
      if (response.status === 200) {
        dispatch(
          setCampaigns({
            campaignReports: response.data,
          })
        );
      }
    } catch (error) {
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
}

export const getSpecificCampaignSmsThunkMiddleware = ({ campaignName, id }) => {
  return async (dispatch) => {
    try {

      dispatch(setLoader({ loader: true }));
      const response = await axios.post(`/campaign/getInsideCampaignsSms`, {
        campaignName: campaignName,
        id: id,
      });

      console.log("campaign details api response ", response.data)

      // changes made by abhyanshu
      if (response.status === 200) {
        dispatch(
          setCampaigns({
            specificCampaignSms: response.data,
          })
        );
      }
    } catch (error) {
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  }
}


export const downloadDocumentCampaignFilesThunkMiddleware = ({ campaignName }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.post(
        `/campaign/getPresentMergedPdfLinks`,
        {
          campaignName,
        });

      if (response.status === 200) {
        const campaignFilesLink = response.data.pdfLinks;
        toastify({ msg: "Document Download Started!", type: "success" });

        dispatch(setLoader({ loader: false }));
        dispatch(
          setProgress({
            downloadDocumentCampaignFileStatus: true,
            progressTab: "download",
            progressView: true,
          })
        );

        let currentBatchSize = 0;
        const maxSize = 300 * 1024 * 1024; // 300MB in bytes
        let batchNumber = 1;
        let zip = new JSZip();
        let filesFolder = zip.folder(`Document_Part${batchNumber}`);

        let processedFiles = 0;
        const totalFiles = campaignFilesLink.length;
        console.log("campaignfiles", campaignFilesLink)
        for (let i = 0; i < totalFiles; i++) {
          if (campaignFilesLink[i] !== "") {
            // const fileUrl = `${campaignFilesLink[i].link}?t=${Date.now()}`;//this is basically previous code in the terms when the files were in server itself but now files are from the aws storage
            const fileUrl = campaignFilesLink[i].link;
            const fileBlob = await fetch(fileUrl).then((res) => res.blob());
            // const response = await axios.get(fileUrl, {
            //   responseType: 'blob'
            // });
            // console.log("file data in" , response.data)
            // const fileBlob =  new Blob([response.data] , 
            //   {
            //     type : response.headers["content-type"],
            //   }
            // )
            console.log("file blob ", fileBlob)
            const fileSize = fileBlob.size;
            console.log("file size", fileSize)

            if (currentBatchSize + fileSize > maxSize) {
              // Generate and download the current batch's zip file
              const content = await zip.generateAsync({ type: "blob" });
              saveAs(content, `Document_Part${batchNumber}.zip`);

              // Reset for next batch
              batchNumber++;
              zip = new JSZip();
              filesFolder = zip.folder(`Document_Part${batchNumber}`);
              currentBatchSize = 0;
            }

            // Add PDF to the current batch
            console.log("file name ", campaignFilesLink[i].name)
            filesFolder.file(`${campaignFilesLink[i].name}`, fileBlob);

            currentBatchSize += fileSize;
            console.log("current batch size", currentBatchSize)
            processedFiles++;
            console.log("processed files", processedFiles);

            dispatch(
              setProgress({
                downloadDocumentCampaignFileProgress: (
                  (processedFiles / totalFiles) *
                  100
                ).toFixed(0),
              })
            );
            console.log(`Added PDF ${i + 1} to zip`);
          }
        }

        if (currentBatchSize > 0) {
          const content = await zip.generateAsync({ type: "blob" });
          saveAs(content, `Document_Part${batchNumber}.zip`);
        }

        toastify({ msg: "Document Download Completed!", type: "success" });
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(
        setProgress({
          downloadDocumentCampaignFileProgress: 0,
          downloadDocumentCampaignFileStatus: false,
        })
      );
    }
  };
};


// create merge shortlinks
export const createMergeCampaignShortLinkThunkMiddleware = ({
  campaignName,
  // campaignType
}) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ loader: true }));

      const response = await axios.post(
        // `/campaign/createShortLinks `, 
        `/campaign/createMainShortLinksS3`,
        {
          campaignName,
          // campaignType,
        });

      console.log(response)

      if (response.status === 200) {
        const { message } = response.data;
        toastify({
          msg: message,
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toastify({ msg: error.response.data.message, type: "error" });
      } else {
        toastify({ msg: error.message, type: "error" });
      }
    } finally {
      dispatch(setLoader({ loader: false }));
    }
  };
};