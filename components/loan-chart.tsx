"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface LoanChartProps {
  principal: number
  interest: number
  totalPaid: number
}

interface ChartDataItem {
  name: string
  value: number
  fill: string
  [key: string]: string | number
}

const COLORS = {
  principal: "#0f172a", // Deep blue
  interest: "#d4af37", // Gold
}

export function LoanChart({ principal, interest, totalPaid }: LoanChartProps) {
  const data: ChartDataItem[] = [
    { name: "Principal", value: principal, fill: COLORS.principal },
    { name: "Interest", value: interest, fill: COLORS.interest },
  ]

  const customTooltip = (props: any) => {
    const { active, payload } = props
    if (active && payload && payload.length) {
      const item = payload[0]
      const dataItem = item.payload as ChartDataItem
      return (
        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-foreground">{dataItem.name}</p>
          <p className="text-lg font-bold" style={{ color: dataItem.fill }}>
            ${dataItem.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>
      )
    }
    return null
  }

  const customLegendFormatter = (value: string) => {
    return <span className="text-sm text-foreground">{value}</span>
  }

  return (
    <div className="space-y-4">
      <div className="w-full flex justify-center items-center overflow-hidden">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={customTooltip as any} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              align="center"
              wrapperStyle={{ paddingTop: "10px" }}
              formatter={customLegendFormatter}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 rounded-lg bg-red-50 border border-red-100 dark:bg-red-950/20 dark:border-red-900/30">
        <p className="text-sm text-muted-foreground mb-1">Total Interest Paid Over Life of Loan</p>
        <p className="text-3xl font-bold text-red-600 dark:text-red-400">
          ${interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </p>
        <p className="text-xs text-muted-foreground mt-2">Lower your rate to save thousands. Check rates above.</p>
      </div>
    </div>
  )
}
