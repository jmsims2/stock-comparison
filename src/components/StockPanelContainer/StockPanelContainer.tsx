import React, { useState, useEffect } from "react";
import {
    Pane,
    Spinner,
    IconButton,
    CrossIcon,
    Text,
    toaster,
} from "evergreen-ui";
import StockPanel from "../StockPanel/StockPanel";
import LineChart from "../LineChart/LineChart";
import "./StockPanelContainer.css";
import {
    fetchStockData,
    StockData,
    Earnings,
    QuoteResponse,
    EarningsResponse,
} from "../../services/ApiService";

interface StockContainerPanelProps {
    stock: { symbol: string; name: string };
    remove: (symbol: string) => void;
}

export default function StockPanelContainer(props: StockContainerPanelProps) {
    const [stock, setStock] = useState<StockData>(() => ({
        symbol: props.stock.symbol,
        name: props.stock.name,
        high: undefined,
        low: undefined,
        price: undefined,
        changePercent: undefined,
        annualEarnings: undefined,
    }));
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
                let data: [
                    QuoteResponse,
                    EarningsResponse
                ] = await Promise.all([
                    fetchStockData("GLOBAL_QUOTE", props.stock.symbol),
                    fetchStockData("EARNINGS", props.stock.symbol),
                ]);
                let newStock = transformAPIResponse(data);
                setStock((prevState) => ({
                    ...prevState,
                    ...newStock,
                }));
                setLoading(false);
            } catch (e) {
                console.error(e);
                toaster.danger("An Error Occurred. Please try again.");
                props.remove(props.stock.symbol);
            }
        }

        function transformAPIResponse(
            data: [QuoteResponse, EarningsResponse]
        ): StockData {
            let newStock: StockData;
            let transformedQuoteResponse = {
                changePercent: data[0]["Global Quote"]["10. change percent"],
                price: data[0]["Global Quote"]["05. price"],
                high: data[0]["Global Quote"]["03. high"],
                low: data[0]["Global Quote"]["04. low"],
                annualEarnings: undefined,
            };
            let transformedEarningsResponse = {
                annualEarnings: data[1].annualEarnings
                    ? data[1].annualEarnings
                          .filter(
                              (year: {
                                  fiscalDateEnding: string;
                                  reportedEPS: string;
                              }) =>
                                  Number(year.fiscalDateEnding.split("-")[0]) >=
                                  new Date().getFullYear() - 5
                          )
                          .map(
                              (year: {
                                  fiscalDateEnding: string;
                                  reportedEPS: string;
                              }) => {
                                  let earnings: Earnings;
                                  earnings = {
                                      year: year.fiscalDateEnding.split("-")[0],
                                      eps: Number(year.reportedEPS),
                                  };
                                  return earnings;
                              }
                          )
                    : undefined,
            };

            newStock = {
                ...stock,
                ...transformedQuoteResponse,
                ...transformedEarningsResponse,
            };
            return newStock;
        }

        getData();
        // eslint-disable-next-line
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
                role="button"
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
                <Pane
                    display="flex"
                    flex={1}
                    flexDirection="column"
                    width={100}
                >
                    <StockPanel stock={stock} />
                    {stock.annualEarnings === undefined ? (
                        <Pane
                            style={{ width: "100%", height: "100%" }}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Text>No Annual Earnings Data Found.</Text>
                        </Pane>
                    ) : (
                        <LineChart
                            lineData={stock.annualEarnings}
                            xProperty="year"
                            yProperty="eps"
                            title="EPS by Year"
                            responsiveWidth={true}
                            responsiveHeight={true}
                        />
                    )}
                </Pane>
            )}
        </Pane>
    );
}
