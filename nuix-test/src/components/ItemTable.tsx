import { useEffect } from "react";
import { getItems, Item } from "../redux/itemSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

export const ItemTable = () => {
  const dispatch: AppDispatch = useDispatch();
  const items: Item[] = useSelector((state: RootState) => state.items.items);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <>
      <h1>All Items Table</h1>
      {items.map((item, id) => (
        <ol key={id}>
          <li>{item.guid}</li>
          <li>{item.name}</li>
          <li>{item.path}</li>
          <li>{JSON.stringify(item.properties)}</li>
        </ol>
      ))}
    </>
  );
};
