import { useGetNumberMemberQuery } from "@/store/queries/dashboardManagement";
import { Pie } from "@ant-design/charts";

const CategoriesChart = () => {
  const res = useGetNumberMemberQuery({ page: 1 });

  const club = res?.data?.result;
  console.log("club");
  const data = [
    {
      type: "FU-DEVER",
      value: 12,
    },
    {
      type: "FUM",
      value: 25,
    },
    {
      type: "FVC",
      value: 18,
    },
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.5,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}%",
      style: {
        textAlign: "center",
        fontSize: 16,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: 18,
        },
        content: "18,935\nsales",
      },
    },
  };

  // @ts-ignore
  return <Pie {...config} />;
};

export default CategoriesChart;
