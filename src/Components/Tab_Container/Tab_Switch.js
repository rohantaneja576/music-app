import React, { useState } from "react";
import "../../App.css";

const Tab_Switch = () => {
  const [tabs] = useState([
    { id: 1, label: "Discovery" },
    { id: 2, label: "Setting" },
  ]);
  const [activeTab, setActiveTab] = useState(1);

  const TabItems = ({ id, label }) => (
    <button style={{ marginLeft: "10px" }} onClick={() => setActiveTab(id)}>
      {label}
    </button>
  );

  const TabView = ({ activeTab }) => {
    const foundValue = tabs.find((val) => val.id === activeTab);
    //console.log(foundValue);
    return <h1>{foundValue.label}</h1>;
    // switch (activeTab) {
    //   case 1:
    //     return <h1>{tabs[0].label}</h1>;
    //   case 2:
    //     return <h1>{tabs[1].label}</h1>;
    //   default:
    //     return null;
    // }
  };

  return (
    <React.Fragment>
      {tabs.length > 0
        ? tabs.map((item, index) => {
            return <TabItems key={index} id={item.id} label={item.label} />;
          })
        : null}
      <TabView activeTab={activeTab} />
    </React.Fragment>
  );
};

export default Tab_Switch;
