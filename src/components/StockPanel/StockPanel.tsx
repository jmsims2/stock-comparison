import React from "react";
import {
    Pane,
    Heading,
    Text,
    SymbolTriangleDownIcon,
    SymbolTriangleUpIcon,
} from "evergreen-ui";

export default function StockPanel(props: any) {
    console.log("PROPS", props);
    return (
        <Pane style={{ width: "100%" }}>
            <Pane padding={10}>
                <Heading size={700}>{props.stock.name}</Heading>
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
