import React from "react";
import { Pane, toaster } from "evergreen-ui";
import AsyncSelect from "react-select/async";
import { fetchByKeyword } from "../services/ApiService";

type Stock = {
    "1. symbol": string;
    "2. name": string;
};

export default function Search(props: { handleChange: (value: any) => void }) {
    const fetchStocks = (inputValue: string): any => {
        return fetchByKeyword(inputValue);
        // //
        // console.log(inputValue);
        // return fetch(
        //     `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputValue.toUpperCase()}&apikey=9V72LTIQYE8DM1FI`
        // )
        //     .then((res) => res.json())
        //     .then((res) => {
        //         if (!res.hasOwnProperty("bestMatches"))
        //             return toaster.danger(
        //                 "API Limit Exceeded. Please try again later.",
        //                 { id: "api-limit-warning", duration: 3 }
        //             );
        //         return res.bestMatches.map((stock: Stock) => {
        //             return {
        //                 value: stock["1. symbol"],
        //                 label: `${stock["1. symbol"]} - ${stock["2. name"]}`,
        //             };
        //         });
        //     });
    };

    return (
        <Pane padding={16}>
            <AsyncSelect
                value={null}
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                }}
                cacheOptions
                defaultOptions
                placeholder="Search for Stocks"
                noOptionsMessage={(obj) =>
                    `No Stocks found for ${obj.inputValue}`
                }
                loadOptions={fetchStocks}
                onChange={props.handleChange}
            />
        </Pane>
    );
}
