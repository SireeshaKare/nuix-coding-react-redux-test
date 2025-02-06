import { useDispatch, useSelector } from "react-redux";
import ColouredTabs from "../components/ColouredTabs";
import { StyledTable } from "../components/StyledTable";
import { AppDispatch, RootState } from "../redux/store";
import { getItems, Item, selectItem } from "../redux/itemSlice";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../util/common";

interface TableColumnProps<T> {
  id: keyof T;
  label: string;
}
export const AllItems = () => {
  const dispatch: AppDispatch = useDispatch();
  const items: Item[] = useSelector((state: RootState) => state.items.items);
  const isLoading: boolean = useSelector(
    (state: RootState) => state.items.isLoading
  );
  const error: string = useSelector((state: RootState) => state.items.error);
  const selectedItem: Item = useSelector(
    (state: RootState) => state.items.selectedItem
  );

  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  type RowData = {
    guid: string;
    name: string;
    pathString: string;
  };

  const rows: RowData[] = items.map(({ guid, name, path }) => ({
    guid,
    name,
    pathString: path.join("/"),
  }));

  const headerTitles: TableColumnProps<RowData>[] = [
    { id: "guid", label: "GUID" },
    { id: "name", label: "Name" },
    { id: "pathString", label: "Path" },
  ];

  const getPropertiesData = () => {
    const properties = selectedItem.properties;
    const propertiesData = [];
    for (const [key, value] of Object.entries(properties)) {
      propertiesData.push(
        <>
          <div
            key={key}
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <h3>{key}</h3>
            <p>{value}</p>
          </div>
        </>
      );
    }
    return propertiesData;
  };

  const getTabData = () => {
    const tabData = [];
    if (selectedItem.guid) {
      tabData.push({
        properties: getPropertiesData(),
        image: (
          <>
            <h3>Image {selectedItem.guid}</h3>
            <img
              src={`${API_BASE_URL}/image/${selectedItem.guid}`}
              alt={`Image ${selectedItem.guid}`}
            />
          </>
        ),
      });
    }

    return tabData;
  };

  const handleRowClick = (row: RowData, rowIndex: number) => {
    setSelectedRowIndex(rowIndex);
    dispatch(selectItem(items.find((item) => item.guid === row.guid) as Item));
  };

  if (error) {
    return <h1>{error}</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>All Items</h1>
      <p>Click on a row to view more details</p>
      <StyledTable
        rows={rows}
        headerTitles={headerTitles}
        onRowClick={handleRowClick}
        selectedRowIndex={selectedRowIndex}
      />
      <ColouredTabs tabData={getTabData()} defaultTab="properties" />
    </>
  );
};
