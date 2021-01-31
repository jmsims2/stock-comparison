import React from "react";
import {
    Pane,
    Heading,
    Text,
    SymbolTriangleDownIcon,
    SymbolTriangleUpIcon,
    Tooltip,
} from "evergreen-ui";
import { StockData } from "../../services/ApiService";

export default function StockPanel(props: { stock: StockData }) {
    return (
        <Pane>
            <Pane
                padding={10}
                style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                }}
            >
                <Tooltip content={props.stock.name}>
                    <Heading size={600}>{props.stock.name}</Heading>
                </Tooltip>
            </Pane>
            <Pane padding={10} flexDirection="row" display="flex">
                <Pane margin="auto" flex={1}>
                    {props?.stock?.changePercent?.startsWith("-") ? (
                        <SymbolTriangleDownIcon size={40} color="danger" />
                    ) : (
                        <SymbolTriangleUpIcon size={40} color="success" />
                    )}
                </Pane>
                <Pane margin="auto" flex={4}>
                    <Pane padding={5}>
                        <Text>{props.stock.price}</Text>
                    </Pane>
                    <Pane padding={5}>
                        <Text
                            color={
                                props?.stock?.changePercent?.startsWith("-")
                                    ? "danger"
                                    : "success"
                            }
                        >
                            {props.stock.changePercent}
                        </Text>
                    </Pane>
                </Pane>
            </Pane>
            <Pane padding={10}>
                <Heading size={500}>Stats</Heading>
            </Pane>
            <Pane paddingX={10} paddingY={3} display="flex" flexDirection="row">
                <Text flex={1}>High</Text>
                <Text flex={1}>{props.stock.high}</Text>
            </Pane>
            <Pane paddingX={10} paddingY={3} display="flex" flexDirection="row">
                <Text flex={1}>Low</Text>
                <Text flex={1}>{props.stock.low}</Text>
            </Pane>
        </Pane>
    );
}
