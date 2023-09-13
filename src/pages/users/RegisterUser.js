import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Select, Upload, Button, message } from "antd";
import { getValueProps } from "@refinedev/strapi-v4";
import { useForm } from "@refinedev/core";
import { Tabs } from "antd";
import CreateProfile from "./ProfileCreate";
import AddressDetails from "./Address";
import InfoPage from "./Info";
import AddressForm from "./Address";
import ConnectedForm from "./ConnectForm";
import DigitalCardlist from "./DigitalCardlist";

const RegisterUser = () => {
  const [activeTab, setActiveTab] = useState("tab1"); // Initial active tab key
  const { TabPane } = Tabs;

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div>
      <img
        src="./images/chetbandetemp.png"
        className="w-100"
        style={{
          height: "350px",
        }}
        alt="Sample photo"
      />
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
      <TabPane tab="List" key="tab1">
          <DigitalCardlist setActiveTab={setActiveTab} />
        </TabPane>
        <TabPane tab="ChaitBande" key="tab2">
          <InfoPage setActiveTab={setActiveTab} />
        </TabPane>
        <TabPane tab="register" key="tab3">
          <ConnectedForm setActiveTab={setActiveTab} />
        </TabPane>
       
      </Tabs>
    </div>
  );
};

export default RegisterUser;
