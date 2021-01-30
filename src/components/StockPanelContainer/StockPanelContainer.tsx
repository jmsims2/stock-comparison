import React, { useState, useEffect } from "react";
import { Pane, Spinner, IconButton, CrossIcon, Text } from "evergreen-ui";
import StockPanel from "../StockPanel/StockPanel";
import LineChart from "../LineChart/LineChart";
import "./StockPanelContainer.css";
import { fetchStockData } from "../../services/ApiService";

export default function StockPanelContainer(props: any) {
    const [stock, setStock] = useState(() => ({
        symbol: props.stock.symbol,
        name: props.stock.name,
        data: {
            "01. symbol": "GSAC",
            "02. open": "0.0040",
            "03. high": "0.0040",
            "04. low": "0.0040",
            "05. price": "0.0040",
            "06. volume": "0",
            "07. latest trading day": "2021-01-29",
            "08. previous close": "0.0040",
            "09. change": "0.0000",
            "10. change percent": "0.0000%",
            annualEarnings: [
                {
                    date: "2020-12-31",
                    yAxis: 8.67,
                },
                {
                    date: "2019-12-31",
                    yAxis: 12.81,
                },
                {
                    date: "2018-12-31",
                    yAxis: 13.82,
                },
                {
                    date: "2017-12-31",
                    yAxis: 13.83,
                },
                {
                    date: "2016-12-31",
                    yAxis: 13.6,
                },
            ],
        },
    }));
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            // let data = await Promise.all([
            //     fetchStockData("GLOBAL_QUOTE", props.stock.symbol),
            //     fetchStockData("EARNINGS", props.stock.symbol),
            // ]);
            // console.log("DATA", data);
            // setStock((prevState) => ({
            //     ...prevState,
            //     data: {
            //         ...data[0]["Global Quote"],
            //         annualEarnings: data[1].hasOwnProperty("annualEarnings")
            //             ? data[1].annualEarnings.map((year: any)  => ({
            //                   date: year.fiscalDateEnding,
            //                   yAxis: Number(year.reportedEPS),
            //               }))
            //             : "No Annual Earnings Data Found.",
            //     },
            // }));
            setTimeout(() => setLoading(false), 1000);
        }
        getData();
    }, [props.stock.symbol]);

    return (
        <Pane
            className="container"
            key={props.stock.symbol}
            flex={"1 1 33ch"}
            padding={16}
            margin={8}
            display="flex"
            elevation={1}
        >
            <IconButton
                onClick={() => props.remove(props.stock.symbol)}
                className="remove-button"
                marginBottom={16}
                height={40}
                appearance="minimal"
                icon={CrossIcon}
            />
            {isLoading ? (
                <Pane
                    style={{ width: "100%" }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Spinner />
                </Pane>
            ) : (
                <Pane display="flex" flex={1} flexDirection="column">
                    <StockPanel stock={stock} />
                    {typeof stock.data.annualEarnings === "object" ? (
                        <LineChart
                            lineData={stock.data.annualEarnings}
                            title="Annual Earnings"
                        />
                    ) : (
                        <Text>{stock.data.annualEarnings}</Text>
                    )}
                </Pane>
            )}
        </Pane>
    );
}
