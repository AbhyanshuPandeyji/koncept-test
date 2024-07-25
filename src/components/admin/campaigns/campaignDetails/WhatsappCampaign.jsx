import React, { useEffect, useMemo, useState } from "react";
import Topbar from "./Topbar";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import {
  deleteCampaignWhatsappTemplateThunkMiddleware,
  getCampaignLogsThunkMiddleware,
  saveAndSendCampaignWhatsappTemplateThunkMiddleware,
  sendCampaignWhatsappTemplateThunkMiddleware,
} from "../../../../redux/features/campaigns";
import { Dropdown, Select } from "antd";

import { IoMdArrowRoundBack } from "react-icons/io";
import { TiArrowRepeat } from "react-icons/ti";
import axios from "axios";
import { toastify } from "../../../toast";
import ConfirmMessage from "../../../common/ConfirmMessage";
import { MdDeleteOutline } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { LiaSave } from "react-icons/lia";
import { TbFileUpload } from "react-icons/tb";




const WhatsappCampaign = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(null);

  const { campaignWhatsappTemplates, campaignDetails } = useSelector(
    (state) => state.campaigns
  );

  const selectedTemplate = useMemo(
    () => campaignWhatsappTemplates[selectedTemplateIndex],
    [selectedTemplateIndex, campaignWhatsappTemplates]
  );

  // changes made by abhyanshu
  const [ShowDeleteConfirmMessage, setShowDeleteConfirmMessage] = useState(false);
  const [ShowSaveConfirmMessage, setShowSaveConfirmMessage] = useState(false);
  const [ShowSaveAndSendConfirmMessage, setShowSaveAndSendConfirmMessage] = useState(false);


  //changes made by abhyanshu
  const [selectedVariables, setSelectedVariables] = useState({});
  // const [selectedVariables, setSelectedVariables] = useState([]);
  const [optionList, setOptionList] = useState([])
  const [userDisplayVariables, setUserDisplayVariables] = useState({})
  const [messageInTemplate, setMessageInTemplate] = useState(``);
  const [dropDownList, setDropDownList] = useState(null);
  const [headerValue, setHeaderValue] = useState(null);
  const [activeInputMethods, setActiveInputMethods] = useState({});
  const [message, setMessage] = useState(``);
  const [textVariableCount, setTextVariableCount] = useState(null);
  const [variableCount, setVariableCount] = useState(null);
  // changes made by abhyanshu

  // changes made by abhyanshu
  const sendWhatsappHandler = () => {
    if (!selectedTemplate || variableCount !== textVariableCount) {
      return;
    }
    try {
      if (selectedTemplate && variableCount === textVariableCount) {
        dispatch(
          sendCampaignWhatsappTemplateThunkMiddleware({
            templateId: selectedTemplate.templateId,
            templateName: selectedTemplate.templateName,
            message: selectedTemplate.message,
            variables: selectedVariables,
            campaignName: campaignDetails.name,
          },
            // setTimeout(() => {
            //   navigate("/campaigns/campaigndetails/reports")
            // }, 1500)
            (error) => {
              if (!error) {
                navigate("/campaigns/campaigndetails/reports")
              }
            }
          )
        );
      }
    } catch (error) {
      if (error.response?.data) {
        toastify({ msg: error.response.data, type: "error" })
      } else {
        toastify({ msg: error.message, type: "error" })
      }
    }
  };

  const saveAndSendWhatsappHandler = () => {
    if (!selectedTemplate || variableCount !== textVariableCount) {
      return;
    }
    try {
      if (selectedTemplate && variableCount === textVariableCount) {
        dispatch(
          saveAndSendCampaignWhatsappTemplateThunkMiddleware({
            templateId: selectedTemplate.templateId,
            templateName: selectedTemplate.templateName,
            message: selectedTemplate.message,
            variables: selectedVariables,
            campaignName: campaignDetails.name,
          },
            // setTimeout(() => {
            //   navigate("/campaigns/campaigndetails")
            // }, 1500)
            (error) => {
              if (!error) {
                navigate("/campaigns/campaigndetails/reports")
              }
            }
          )
        );
      }
    } catch (error) {
      if (error.response?.data) {
        toastify({ msg: error.response.data, type: "error" })
      } else {
        toastify({ msg: error.message, type: "error" })
      }
    }
  };
  // changes  made by abhyanshu


  const smsLogsHandler = () => {
    dispatch(
      getCampaignLogsThunkMiddleware(
        {
          campaignName: campaignDetails.name,
          logsType: "Whatsapp",
        },
        () => {
          navigate("logs");
        }
      )
    );
  };


  // changes made by abhyanshu
  const sendWhatsappDeleteHandler = (e) => {
    // if (selectedTemplate) {
    //   const response = dispatch(deleteCampaignWhatsappTemplateThunkMiddleware(selectedTemplate.templateId));
    //   toastify({ msg: response.data, type: "success" });
    //   navigate("/campaigns/campaigndetails/whatsapp");
    // }
    if (!selectedTemplate) {
      return;
    }
    try {
      if (selectedTemplate) {
        dispatch(deleteCampaignWhatsappTemplateThunkMiddleware(selectedTemplate.templateId,
        )
        );
      }
    } catch (error) {
      if (error.response?.data) {
        toastify({ msg: error.response.data, type: "error" })
      } else {
        toastify({ msg: error.message, type: "error" })
      }
    }
  }


  //changes made by abhyanshu
  useEffect(() => {
    if (selectedTemplate) {
      setMessageInTemplate(selectedTemplate.message)
    }
    // if (!selectedTemplate) {
    //   return
    // }
    console.log(selectedTemplateIndex)
    const handleDropdownApi = async () => {
      try {
        const response = await axios.post("https://m.kcptl.in/campaign/readExcelHeaders", { campaignName: campaignDetails.name });
        const data = response.data;
        setDropDownList(data)
      } catch (error) {
        console.log(error)
      }
    }

    if (!selectedTemplate) {
      setDropDownList(null)
      setMessageInTemplate("")
      setHeaderValue(null)
      setSelectedVariables({})
      // setSelectedVariables([])
      setUserDisplayVariables({})
      setActiveInputMethods({})
      setMessage("")
    }


    handleDropdownApi();
  }, [selectedTemplate, messageInTemplate]);


  useEffect(() => {
    // Function to clear input method values in selectedVariables
    const clearInputMethodValues = () => {
      const updatedVariables = {};
      Object.keys(selectedVariables).forEach((key) => {
        if (activeInputMethods[key] === 'input') {
          updatedVariables[key] = ''; // Clear input method values
        } else {
          updatedVariables[key] = selectedVariables[key]; // Keep dropdown method values as is
        }
      });
      setSelectedVariables(updatedVariables);
    };

    // Call clearInputMethodValues when selectedTemplate changes
    clearInputMethodValues();

    const clearState = () => {
      setSelectedVariables({}); // Clear selected variables
      setUserDisplayVariables({})
      setHeaderValue(null); // Clear header value if applicable
      setActiveInputMethods({}); // Clear active input methods if needed
      setDropDownList(null); // Clear dropdown list if it's used
    };

    // Call clearState when selectedTemplateIndex changes
    clearState();
  }, [selectedTemplateIndex])

  useEffect(() => {

    const getUpdatedString = (template, values) => {
      return template.replace(/{\{(\d+)\}}/g, (match, variableName) => {
        return values[variableName] || match;
      });
    };

    // for displaying values of first row under the header
    const updatedString = getUpdatedString(messageInTemplate, userDisplayVariables);
    // for displaying headers
    // const updatedString = getUpdatedString(messageInTemplate, selectedVariables);

    setMessage(updatedString);

    if (messageInTemplate.length !== 0) {
      let count = messageInTemplate.match(/{\{(\d+)\}}/g);
      count = count ? count.length : 0;
      setTextVariableCount(count)
    }

    if (selectedVariables) {
      let count = selectedVariables;
      let noOfVariables = Object.keys(count);
      setVariableCount(noOfVariables.length)
    }
  }, [messageInTemplate, variableCount, textVariableCount, selectedVariables, userDisplayVariables])
  // changes made by abhyanshu
  // console.log("selected variables count ", variableCount);
  // console.log("matched text in the message count ", textVariableCount);

  // // console.log(selectedTemplate)
  // console.log(activeInputMethods)
  console.log(selectedVariables)
  console.log("variables values need to be displayed to user", userDisplayVariables)

  return (
    <div className="overflow-y-auto px-6 py-4 md:gap-4 space-y-3">
      {
        ShowDeleteConfirmMessage ? <>
          <ConfirmMessage yes="Yes, I am sure" className="flex-col" deleteBtn={true} no="No, I'm not sure!" value={(e) => {
            // console.log(e)
            if (e) {
              sendWhatsappDeleteHandler()
            }
            setShowDeleteConfirmMessage(false);
          }}>
            <MdDeleteOutline size={"50px"} className="mb-3 text-slate-700" />
            <h2 className="text-lg w-full text-center text-slate-700 font-normal">Please confirm if you would like to delete this Whatsapp campaign.</h2>
          </ConfirmMessage>
        </> : null
      }

      {
        ShowSaveConfirmMessage && selectedTemplate ? <>
          <ConfirmMessage yes="Yes, I am sure" className="flex-col" no="No, I'm not sure!" value={(e) => {
            if (e) {
              sendWhatsappHandler()
            }
            setShowSaveConfirmMessage(false);
          }}>
            <LiaSave size={"50px"} className="mb-3 text-slate-700" />
            <h2 className="text-lg w-full text-center text-slate-700 font-normal">Please confirm if you would like to save this Whatsapp campaign.</h2>
          </ConfirmMessage>
        </> : null
      }
      {
        ShowSaveAndSendConfirmMessage && selectedTemplate ? <>
          <ConfirmMessage yes="Yes, I am sure" className="flex-col" no="No, I'm not sure!" value={(e) => {
            if (e) {
              saveAndSendWhatsappHandler();
            }
            setShowSaveAndSendConfirmMessage(false);
          }}>
            <TbFileUpload size={"50px"} className="mb-3 text-slate-700" />
            <h2 className="text-lg w-full text-center text-slate-700 font-normal">Please confirm if you would like to save and send this Whatsapp campaign.</h2>
          </ConfirmMessage>
        </> : null
      }

      {/* Topbar  */}
      <div className="h-fit px-4 py-2 flex md:flex-row flex-col gap-y-2 md:my-0  w-full justify-between bg-white rounded-md">
        <div className=" flex items-center gap-4">
          <button
            onClick={() => navigate("/campaigns/campaigndetails")}
            className="w-fit flex items-center gap-1 buttonBackground px-2 py-1 rounded-md text-white font-semibold"
          >
            <IoMdArrowRoundBack size={26} />
          </button>
          <h1 className=" text-xl font-semibold">Whatsapp Campaign</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={smsLogsHandler}
            className=" flex items-center gap-1 bg-yellow-600 px-2 py-1 rounded-md text-white font-semibold"
          >
            Logs
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (selectedTemplate) {
                setShowSaveConfirmMessage(true);
              }
            }}
            className=" flex items-center gap-1 bg-green-600 px-2 py-1 rounded-md text-white font-semibold"
          >
            Save
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (selectedTemplate) {
                setShowSaveAndSendConfirmMessage(true);
              }
            }}
            className=" flex items-center gap-1 bg-gray-600 px-2 py-1 rounded-md text-white font-semibold"
          >
            Save & Send
          </button>
        </div>
      </div>

      <div className=" bg-white rounded-md h-full p-3">
        <form action="" className=" space-y-3">
          <div className=" flex flex-col gap-2 rounded">
            <label htmlFor="" className="text-sm font-semibold">
              Select Applications :
            </label>
            <div className="flex w-[100%] md:flex-row flex-col" >
              <div className="md:w-[74%] w-[100%] md:my-0 my-2">
                {/* <select
                  name=""
                  id=""
                  className=" border-2 rounded p-2 flex-1 focus:ring-2 focus:ring-purple-800 outline-none w-full"
                  onChange={(e) => setSelectedTemplateIndex(e.target.value)}
                  value={selectedTemplateIndex}
                >
                  <option value="">Select</option>
                  {campaignWhatsappTemplates &&
                    campaignWhatsappTemplates?.map((item, index) => (
                      <option value={index} key={index} className="">
                        {item?.templateName}
                      </option>
                    ))}
                </select> */}
                {
                  campaignWhatsappTemplates && (
                    <Select
                      placeholder="Select an Option"
                      // defaultValue={{ label: "Select an Option", value: "select" }}
                      className="rounded flex-1 focus:ring-2 h-[44px] focus:ring-purple-800 outline-none w-full"
                      // options={selectOptions}
                      options={[{ label: "Select A Template", value: "" }, ...(campaignWhatsappTemplates?.map((option, index) => ({ label: option?.templateName, value: index })) || [])]}
                      onChange={(value) => setSelectedTemplateIndex(value)}
                    />
                  )
                }

              </div>
              <div className="flex justify-center items-center">
                <Link
                  // onClick={sendSmsHandler}
                  to="/campaigns/campaigndetails/whatsapp/createtemplate"
                  className=" flex items-center text-center justify-center bg-blue-600
                rounded-md text-white font-semibold w-[150px] h-fit mx-1 md:p-2 p-1"
                >
                  Create Template
                </Link>
                {
                  selectedTemplate ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (selectedTemplate) {
                          setShowDeleteConfirmMessage(true);
                        }
                      }}
                      className=" flex items-center justify-center bg-red-600  
                      rounded-md text-white font-semibold w-[150px] h-fit mx-1 md:p-2 p-1"
                    >
                      Delete Template
                    </button>
                  ) : ""
                }
              </div>
            </div>
          </div>

          <div className=" flex gap-4 sm:flex-row flex-col">
            <div className=" flex flex-col gap-1 rounded flex-1">
              <label htmlFor="" className="text-sm font-semibold">
                Message :
              </label>
              <textarea
                rows={6}
                className="border-2 rounded p-1 flex-1 focus:ring-2 focus:ring-purple-800 outline-none"
                // change made by abhyanshu
                value={messageInTemplate}
                disabled
              />
            </div>

            {/* changes made by abhyanshu */}
            <div className=" sm:w-[25%] w-full mt-5 my-5">
              {selectedTemplate ? (
                <div>
                  <h1 className=" font-semibold">Sample Message:</h1>
                  <p>{message}</p>
                </div>
              ) : ("")}
            </div>
            {/* changes made by abhyanshu */}
          </div>


          <div>
            {selectedTemplate &&
              selectedTemplate?.variables.map((item, index) => (
                <DropDown
                  key={index}
                  itemIndex={index}
                  title={item?.name}
                  options={dropDownList?.headers}
                  selectedVar={selectedVariables}
                  inputMethods={activeInputMethods}
                  setActiveMethod={setActiveInputMethods}
                  setSelectedVariable={setSelectedVariables}
                  setUserDisplayVariables={setUserDisplayVariables}
                  campaignDetail={campaignDetails}
                // optionList={optionList}
                // setOptionList={setOptionList}
                />
              ))
            }
          </div>
          {/* changes made by abhyanshu */}
        </form>
      </div>
    </div>
  );
};

//changes by abhyanshu
export const DropDown = ({ title, inputMethods, setSelectedVariable, setActiveMethod,
  selectedVar, options = [], itemIndex, campaignDetail, setUserDisplayVariables,
  // optionList, setOptionList
}) => {

  const defaultOption = { label: "Select an Option", value: "select" };

  /* */
  // const formatStringWithNewLines = (str, chunkSize = 22) => {
  //   let formattedString = '';
  //   for (let i = 0; i < str.length; i += chunkSize) {
  //     formattedString += str.substring(i, i + chunkSize) + '\n';
  //   }
  //   return formattedString.trim();
  // };
  /* */

  /* */
  const handleDropDownListChange = async (variableIndex, option) => {
    console.log(option)
    setActiveMethod((prevMethods) => {
      const methodVal = {
        ...prevMethods,
        [variableIndex]: 'dropdown',
      };

      if (option === "select") {
        delete methodVal[variableIndex];
      }

      return methodVal;
    });

    try {
      if (option !== "select") {
        let displayValue = "";
        const response = await axios.post("https://m.kcptl.in/campaign/getValueBySingleHeader", { campaignName: campaignDetail.name, header: option });
        displayValue = response.data.value;
        const variableName = `${variableIndex + 1}`;
        setUserDisplayVariables((prevValues) => {
          const updatedValues = {
            ...prevValues,
            [variableName]: displayValue,
          };
          if (option === "" || option === "select") {
            delete updatedValues[variableName];
          }
          return updatedValues;
        });
        // value = formatStringWithNewLines(value);
      }

      let value = option;
      // let value = "";
      // if (option !== "select") {
      //   const response = await axios.post("https://m.kcptl.in/campaign/getValueBySingleHeader", { campaignName: campaignDetail.name, header: option });
      //   value = response.data.value;
      //   // value = formatStringWithNewLines(value);

      // }

      console.log(value)

      const variableName = `${variableIndex + 1}`;
      setSelectedVariable((prevValues) => {
        const updatedValues = {
          ...prevValues,
          [variableName]: value,
        };
        if (value === "" || option === "select") {
          delete updatedValues[variableName];
        }
        return updatedValues;
      });
    } catch (error) {
      console.log(error);
    }
  };
  /* */

  /* */
  const handleInputChange = (variableIndex, value) => {
    console.log(value)
    setActiveMethod((prevMethods) => {
      const methodVal = {
        ...prevMethods,
        [variableIndex]: 'input',
      }
      if (value === "") {
        delete methodVal[variableIndex];
      }
      return methodVal
    });

    try {
      if (value !== "") {
        let displayValue = value;
        const variableName = `${variableIndex + 1}`;
        setUserDisplayVariables((prevValues) => {
          const updatedValues = {
            ...prevValues,
            [variableName]: displayValue || "",
          };
          if (value === "") {
            delete updatedValues[variableName];
          }
          return updatedValues;
        });
        // value = formatStringWithNewLines(value);
      }
      // value = formatStringWithNewLines(value);
      const variableName = `${variableIndex + 1}`;
      setSelectedVariable((prevValues) => {
        const updatedValues = {
          ...prevValues,
          [variableName]: value || "",
        };
        if (value === "") {
          delete updatedValues[variableName];
        }
        return updatedValues;
      }
      );
    } catch (error) {
      console.log(error)
    }
  }
  /* */

  // Ensure options is an array and map it correctly
  const selectOptions = [defaultOption, ...(options?.map((option) => ({ label: option, value: option })) || [])];

  // const [properties, setProperties] = useState([]);
  // const [optionList, setOptionList] = useState([])

  // console.log("displaying option list of the changed varialbe method from object to array of objects", optionList)
  /* */
  // const handleVariableChange = async (variableIndex, value, method) => {
  //   console.log(value);

  //   setActiveMethod((prevMethods) => {
  //     const methodVal = {
  //       ...prevMethods,
  //       [variableIndex]: method,
  //     };
  //     if (value === "" || (method === 'dropdown' && value === "select")) {
  //       delete methodVal[variableIndex];
  //     }
  //     return methodVal;
  //   });

  //   try {
  //     // let displayValue = value;

  //     // if (method === 'dropdown' && value !== "select") {
  //     //   const response = await axios.post("https://m.kcptl.in/campaign/getValueBySingleHeader", { campaignName: campaignDetail.name, header: value });
  //     //   displayValue = response.data.value;
  //     // }

  //     // const updatedProperties = [...properties];
  //     // const propertyName = `var${variableIndex + 1}`;
  //     // const existingIndex = updatedProperties.findIndex(prop => prop.propertyName === propertyName);

  //     //   const newProperty = {
  //     //     propertyName,
  //     //     propertyValue: displayValue,
  //     //     input: method === 'input',
  //     //   };

  //     //   if (existingIndex > -1) {
  //     //     updatedProperties[existingIndex] = newProperty;
  //     //   } else {
  //     //     updatedProperties.push(newProperty);
  //     //   }

  //     //   setProperties(updatedProperties);
  //     // } catch (error) {
  //     //   console.log(error);
  //     // }

  //     // try {

  //     const propertyName = `var${variableIndex + 1}`;

  //     setOptionList((prevValues) => {
  //       // Check if the variable already exists in the array

  //       const existingVariableIndex = prevValues.findIndex(
  //         (exData) => exData.propertyName === propertyName
  //       );

  //       console.log(existingVariableIndex)

  //       // Create a new array to avoid mutating the previous state directly
  //       const updatedValues = [...prevValues];

  //       if ((method === "dropdown" && (value === "" || value === "select")) || (method === "input" && value === "")) {
  //         // If the value is empty or "select", remove the variable from the array
  //         if (existingVariableIndex !== -1) {
  //           updatedValues.splice(existingVariableIndex, 1);
  //         }
  //       } else {
  //         // If the variable exists, update its value
  //         if (existingVariableIndex !== -1) {
  //           updatedValues[existingVariableIndex].propertyValue = value;
  //           updatedValues[existingVariableIndex].input = method === "input" ? true : false
  //         } else {
  //           // If the variable does not exist, add a new object to the array
  //           updatedValues.push({
  //             propertyName: propertyName,
  //             propertyValue: value,
  //             input: method === "input" ? true : false,
  //             // variableExcelValue: `row[${value}]`,
  //           });
  //         }
  //       }
  //       console.log('Updated Values:', updatedValues);

  //       return updatedValues;
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  /* */

  // console.log("displaying option list of the changed varialbe method from object to array of objects", optionList)


  return (
    <div className="flex sm:flex-row  flex-col my-4 w-[100%]">
      <label className={`sm:w-1/4 sm:text-start text-center sm:min-w-[25%] p-2 sm:rounded-l-lg sm:rounded-r-none rounded-lg rounded-b-none border-b-2 text-lg 
                    text-black bg-blue-100 shadow-md font-semibold  border-b-blue-300`}>{title}</label>
      <div className="flex sm:flex-row flex-col rounded-lg gap-y-2 sm:gap-y-0 w-full sm:w-3/4">
        <Select
          showSearch
          placeholder="Select an Option"
          // defaultValue={{ label: "Select an Option", value: "select" }}
          className={`sm:w-[50%] w-full h-[50px] text-lg border-blue-300 border-b-2 rounded-none
            ${inputMethods[itemIndex] == "input" ? "bg-gray-300 border-gray-500" : "bg-white shadow-md"}  
            `}
          options={selectOptions}
          onChange={(value) => handleDropDownListChange(itemIndex, value)}
          // onChange={(value) => handleVariableChange(itemIndex, value, "dropdown")}
          disabled={inputMethods[itemIndex] === 'input'}
        />
        <p className="text-lg hidden sm:block bg-gray-100 w-fit text-center text-black font-semibold p-3">
          <TiArrowRepeat size={"22px"} />
        </p>
        {/* <p className="text-lg block sm:hidden bg-gray-100 w-fit text-center text-black font-semibold p-2">
          <HiOutlineArrowsUpDown size={"16px"} />
        </p> */}
        <input type="text"
          // value={selectedVar[`var${itemIndex + 1}`]}
          // value={inputValue}
          className={`sm:w-[50%] w-[100%] p-2 text-lg 
                      ${inputMethods[itemIndex] == "dropdown" ? "bg-gray-300 border-gray-500" : "bg-white shadow-md"}
                      border-b-2 border-blue-300`}
          placeholder={`Input${itemIndex + 1}`}
          onChange={(e) => { handleInputChange(itemIndex, e.target.value); }}
          // onChange={(e) => { handleVariableChange(itemIndex, e.target.value, "input"); }}
          disabled={inputMethods[itemIndex] === 'dropdown'}
        />
      </div>
    </div>
  )
}
// changes made by abhyanshu

export default WhatsappCampaign;
