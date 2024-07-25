import React from "react";
import { MdAccountBox, MdEmail, MdSms, MdWhatsapp } from "react-icons/md";
import { useSelector } from "react-redux";

const StatsCard = ({ title, value, icon }) => {
  return (
    <>
      <div
        key={value}
        className="bg-white rounded-md flex items-center  px-2 py-4 shadow-lg "
      >
        <div className="flex items-center gap-2 ">
          <div className=" w-fit h-fit p-2 rounded-full text-white sidebarBackground text-3xl">
            {icon}
          </div>
          <div>
            <h1 className="font-bold text-2xl">{value}</h1>
            <h1 className=" font-semibold">{title}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

const Stats = () => {
  const { campaignDetails } = useSelector(
    (state) => state.campaigns
  );
  const data = [
    {
      title: "Total Documents",
      value: campaignDetails.totalFiles ? campaignDetails.totalFiles : 0,
      icon: <MdAccountBox />,
    },
    {
      title: "Total SMS",
      value: campaignDetails.totalSms ? campaignDetails.totalSms : 0,
      icon: <MdSms />,
    },
    {
      title: "Total Email",
      value: campaignDetails.totalEmail ? campaignDetails.totalEmail : 0,
      icon: <MdEmail />,
    },
    {
      title: "Total Whatsapp",
      value: campaignDetails.totalWhatsappSms
        ? campaignDetails.totalWhatsappSms
        : 0,
      icon: <MdWhatsapp />,
    },
  ];
  return (
    <div className=" grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2">
      {data?.map((item, index) => (
        <StatsCard
          key={index}
          value={item.value}
          title={item.title}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default Stats;
