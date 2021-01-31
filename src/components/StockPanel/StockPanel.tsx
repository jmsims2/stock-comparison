import React from "react";
import {
    Pane,
    Heading,
    Text,
    SymbolTriangleDownIcon,
    SymbolTriangleUpIcon,
    Tooltip,
} from "evergreen-ui";

export default function StockPanel(props: any) {
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
                    {props.stock.data["10. change percent"].startsWith("-") ? (
                        <SymbolTriangleDownIcon size={40} color="danger" />
                    ) : (
                        <SymbolTriangleUpIcon size={40} color="success" />
                    )}
                </Pane>
                <Pane margin="auto" flex={4}>
                    <Pane padding={5}>
                        <Text>{props.stock.data["05. price"]}</Text>
                    </Pane>
                    <Pane padding={5}>
                        <Text
                            color={
                                props.stock.data[
                                    "10. change percent"
                                ].startsWith("-")
                                    ? "danger"
                                    : "success"
                            }
                        >
                            {props.stock.data["10. change percent"]}
                        </Text>
                    </Pane>
                </Pane>
            </Pane>
            <Pane padding={10}>
                <Heading size={500}>Stats</Heading>
            </Pane>
            <Pane paddingX={10} paddingY={3} display="flex" flexDirection="row">
                <Text flex={1}>High</Text>
                <Text flex={1}>{props.stock.data["03. high"]}</Text>
            </Pane>
            <Pane paddingX={10} paddingY={3} display="flex" flexDirection="row">
                <Text flex={1}>Low</Text>
                <Text flex={1}>{props.stock.data["04. low"]}</Text>
            </Pane>
        </Pane>
    );
}
