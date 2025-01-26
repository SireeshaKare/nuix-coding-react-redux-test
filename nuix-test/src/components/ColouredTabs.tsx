import { Box, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  value: string;
  index: string;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

interface TabData {
  [tabName: string]: React.ReactNode;
}

interface ColouredTabsProps {
  tabData: TabData[];
  defaultTab: string;
}

export default function ColouredTabs({
  tabData,
  defaultTab,
}: ColouredTabsProps) {
  const [value, setValue] = useState(defaultTab.toLowerCase());

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!tabData.length) {
    return null;
  }

  return (
    <Box sx={{ boxShadow: 1, padding: 2, backgroundColor: "white" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="dynamic tabs"
      >
        {Object.keys(tabData[0]).map((tabName, index) => (
          <Tab key={index} value={tabName.toLowerCase()} label={tabName} />
        ))}
      </Tabs>

      {tabData.map((data, dataIndex) =>
        Object.entries(data).map(([tabName, content], tabIndex) => (
          <TabPanel
            key={`${dataIndex}-${tabIndex}`}
            value={value}
            index={tabName.toLowerCase()}
          >
            {content}
          </TabPanel>
        ))
      )}
    </Box>
  );
}
