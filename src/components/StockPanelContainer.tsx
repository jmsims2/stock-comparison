import React, { useState, useEffect } from "react";
import { Pane, Spinner, IconButton, CrossIcon } from "evergreen-ui";
import StockPanel from "./StockPanel";
import "./StockPanelContainer.css";
import { fetchQuote } from "../services/ApiService";

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
        },
    }));
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            //let data = await fetchQuote(props.stock.symbol);
            //console.log("DATA", data);
            //setStock((prevState) => ({
            //    ...prevState,
            //    data: data["Global Quote"],
            //}));
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
            margin={16}
            display="flex"
            elevation={1}
            style={{ minHeight: "75%" }}
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
                <StockPanel stock={stock} />
            )}
        </Pane>
    );
}
