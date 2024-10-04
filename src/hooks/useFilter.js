import { useState } from "react";

export default function useFilter(dataList, callback) {
  const [query, setQuery] = useState("");
  const filteredData = dataList.filter((el) =>
    callback(el).toLowerCase().includes(query)
  );
  return [filteredData, setQuery];
}
