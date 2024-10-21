import Papa from "papaparse";
import { useEffect, useState } from "react";

interface CSVData {
  "Posted Date": Date;
  "Reference Number": number;
  Payee: string;
  Address: string;
  Amount: string;
}

function App() {
  const [parsedData, setParsedData] = useState<CSVData[]>();

  useEffect(() => {
    const getData = async () => {
      const parsed = await fetch("./transactions-data/October2024_8527.csv")
        .then((response) => response.text())
        .then((responseText) => {
          // -- parse csv
          return Papa.parse<CSVData>(responseText, {
            header: true,
            dynamicTyping: true,
          });
        });
      setParsedData(parsed.data);
    };

    getData();
  }, []);

  return <div>{parsedData?.toString()}</div>;
}

export default App;
