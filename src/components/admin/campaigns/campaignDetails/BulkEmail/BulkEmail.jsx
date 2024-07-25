import React, { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  getCampaignLogsThunkMiddleware,
  sendCampaignEmailThunkMiddleware,
  testEmailSendThunkMiddleware,
} from "../../../../../redux/features/campaigns";
import JoditEditor from 'jodit-react';
import EmailBox from "./EmailBox";

const BulkEmail = () => {

  const textRef = useRef(null)

  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [html, setHtml] = useState("");
  // const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(null);
  // const emailTextRef = useRef(null)

  const { campaignEmailTemplates, campaignDetails } = useSelector(
    (state) => state.campaigns
  );

  // const selectedTemplate = useMemo(
  //   () => campaignEmailTemplates[selectedTemplateIndex],
  //   [selectedTemplateIndex]
  // );
  // console.log(selectedTemplate);

  const dispatch = useDispatch();

  // const sendEmailHandler = () => {


  const testEmailHandler = () => {
    dispatch(
      testEmailSendThunkMiddleware(
        {
          subject: subject,
          text: text,
          html: html,
        },
        // () => {
        //   navigate("/campaigns/campaigndetails")
        // }
      )
    );
  };

  const navigate = useNavigate();
  const emailLogsHandler = () => {
    dispatch(
      getCampaignLogsThunkMiddleware(
        {
          campaignName: campaignDetails.name,
          logsType: "Email",
        },
        () => {
          navigate("logs");
        }
      )
    );
  };

  console.log(html)
  // console.log(text)

  console.log(text)
  return (
    <>
      <div className="overflow-y-auto px-6 py-4 md:gap-4 space-y-3">
        {/* Topbar  */}
        <div className="h-fit px-4 py-2 flex sm:flex-row flex-col gap-y-4 sm:gap-y-0 w-full justify-between bg-white rounded-md">
          <div className=" flex items-center gap-4">
            <button
              onClick={() => navigate("/campaigns/campaigndetails")}
              className="w-fit flex items-center gap-1 buttonBackground px-2 py-1 rounded-md text-white font-semibold"
            >
              <IoMdArrowRoundBack size={26} />
            </button>
            <h1 className=" text-xl font-semibold">Bulk Email Campaign</h1>
          </div>
          <div className="flex flex-wrap sm:items-center items-start gap-2">
            <button
              onClick={emailLogsHandler}
              className=" flex items-center gap-1 bg-yellow-600 px-2 py-1 rounded-md text-white font-semibold"
            >
              Logs
            </button>
            <button
              onClick={() => navigate("uploadtemplate")}
              className=" flex items-center gap-1 bg-green-600 px-2 py-1 rounded-md text-white font-semibold"
            >
              Create Template
            </button>
            <button
              onClick={testEmailHandler}
              className=" flex items-center gap-1 bg-gray-600 px-2 py-1 rounded-md text-white font-semibold"
            >
              Save & Send
            </button>
          </div>
        </div>

        <div className=" bg-white rounded-md h-full p-3">
          <h1 className=" font-bold py-2">Send Bulk Email</h1>
          <form action="" className=" space-y-3">
            {/* <div className=" flex flex-col gap-2 rounded">
              <label htmlFor="" className="text-sm font-semibold">
                Select Template :
              </label>
              <select
                name=""
                id=""
                className=" border-2 rounded p-2 flex-1 focus:ring-2 focus:ring-purple-800 outline-none"
                onChange={(e) => setSelectedTemplateIndex(e.target.value)}
                value={selectedTemplateIndex}
              >
                <option value="">Select</option>
                {campaignEmailTemplates &&
                  campaignEmailTemplates.map((item, index) => (
                    <option value={index} key={index} className="">
                      {item.name}
                    </option>
                  ))}
              </select>
            </div> */}

            <div className=" flex flex-col gap-1 rounded flex-1">
              <label htmlFor="" className="text-sm font-semibold">
                Subject :
              </label>
              <input
                type="text"
                className="border-2 rounded p-1 flex-1 focus:ring-2 focus:ring-purple-800 outline-none"
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
              />
            </div>
            <div className=" flex flex-col gap-1 rounded flex-1">
              <label htmlFor="" className="text-sm font-semibold">
                Text :
              </label>
              <input value={text} onChange={(e) => setText(e.target.value)} className="bg-gray-300 border border-black" />
              {/* <JoditEditor
                rows={6}
                ref={emailTextRef}
                config={config}
                // className="border-2 rounded p-1 flex-1 focus:ring-2 focus:ring-purple-800 outline-none"
                onBlur={newContent => setText(newContent)}
                onChange={newcontent => { }}
                value={text}
              /> */}
              <EmailBox  html={html} setHtml={setHtml} />
              {/* <JoditEditor
                rows={6}
                ref={emailTextRef}
                config={config}
                // className="border-2 rounded p-1 flex-1 focus:ring-2 focus:ring-purple-800 outline-none"
                onBlur={newContent => setHtml(newContent)}
                onChange={newcontent => { }}
                value={html}
              /> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BulkEmail;
