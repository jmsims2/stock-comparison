import React from "react";
import { Pane, Text } from "evergreen-ui";
import ResponsiveXYFrame from "semiotic/lib/ResponsiveXYFrame";
import { scaleTime } from "d3-scale";

export default function LineChart(props: any) {
    console.log("LINE CHART PROPS", props);
    return (
        <Pane>
            <ResponsiveXYFrame
                lines={props.lineData}
                responsiveWidth={true}
                margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
                /*@ts-ignore */
                xScaleType={scaleTime()}
                /*@ts-ignore */
                xAccessor={(d: unknown) => new Date(d.date)}
                yAccessor="yAxis"
                yExtent={[0]}
                lineStyle={{ stroke: "#3cc3b2", strokeWidth: 2, fill: "none" }}
                title={<Text>{props.title}</Text>}
            />
        </Pane>
    );
}
