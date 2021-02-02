import React, { useCallback } from "react";
import { Pane, toaster, Text } from "evergreen-ui";
import AsyncSelect from "react-select/async";
import { fetchByKeyword } from "../../services/ApiService";
import debounce from "lodash.debounce";

export default function Search(props: { handleChange: (value: any) => void }) {
    const fetchStocks = (
        inputValue: string,
        callback: (res: any) => void
    ): void => {
        if (!inputValue) return;
        fetchByKeyword(inputValue)
            .then((res) => {
                callback(res);
            })
            .catch((e) =>
                toaster.danger("An Error Occurred. Please try again later.", {
                    id: "search-results-error",
                    duration: 3,
                })
            );
    };

    //debounce autocomplete so it doesn't fire on every change
    const debouncedFetchStocks = debounce(useCallback(fetchStocks, []), 500);

    return (
        <Pane padding={16}>
            <Pane paddingY={8}>
                <Text>
                    Enter up to 3 stocks to compare the current stock prices.
                </Text>
            </Pane>
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
                    obj.inputValue
                        ? `No Stocks found for ${obj.inputValue}`
                        : "Type to start searching..."
                }
                loadOptions={(i, c) => debouncedFetchStocks(i, c)}
                onChange={props.handleChange}
            />
        </Pane>
    );
}
