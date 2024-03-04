import { Link } from "react-router-dom"
import Chart from 'chart.js/auto'
import DoughnutChart from "./DoughnutChart.jsx"

const Transactions = ({ transactions }) => {
    if(transactions.length === 0){
        return null
    } 

    function formattedDate(date) {
        // Split the input date string into an array of parts using the "-" delimiter
        const parts = date.split("-");
      
        // Create a new Date object using the parts, adjusting the month value by -1 since months are zero-based in JavaScript Date objects
        const transactionDate = new Date(parts[0], parts[1] - 1, parts[2]);
      
        // Format the Date object using the toLocaleDateString method with the specified options
        return transactionDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }
      
    transactions.sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return dateB - dateA
    })

    const categories = transactions.reduce((acc, current) => {
        if(!acc.includes(current.category) && current.transactionType === "Withdrawal"){
        acc.push(current.category)
        }
        return acc 
    }, [])

    const matchingTransactions = categories.map((category) => 
         transactions.filter((transaction) => transaction.category === category))
    const totals = matchingTransactions.map((transactionsByCategory) => {
        return transactionsByCategory.reduce((acc, current) => {
            if(current.transactionType === "Withdrawal"){
                acc += Math.abs(current.amount)
            }
            return acc
        }, 0)
    })
    // console.log(matchingTransactions)
    // console.log(totals)

    const chartData = {
        labels: categories,
        datasets: [
          {
            backgroundColor: ['#e4d1d1', '#b9b0b0', '#d9ecd0', '#77a8a8', '#E1E8ED', '#d5f4e6'],
            hoverBackgroundColor: ['#e4d1d1', '#b9b0b0', '#d9ecd0', '#77a8a8', '#E1E8ED', '#d5f4e6'],
            data: totals,
          },
        ],
      }

      const expenseTotals = transactions.reduce((acc, current) => {
        if(current.transactionType === "Withdrawal"){
            acc += Math.abs(current.amount)
        }
        return acc
      }, 0)

  return (
    <div className ="table-wrapper">
        <div className="transactions-header">
            {/* <h3>Account Total: ${total}</h3> */}
            <h2>Transactions</h2>
        </div>
        <table>
            <thead>
                <tr>
                    <th>DATE</th>
                    <th>NAME</th>
                    <th>AMOUNT</th>
                </tr>
            </thead>
            <tbody className="table-body">
            {transactions.map(({ id, date, itemName, amount }) => (
            <tr key={id} className={amount > 0 ? "positive" : "negative"}>
                <td>{formattedDate(date)}</td>
                <td>
                <Link to={`/${id}`}>{itemName}</Link>
                </td>
                <td>${amount}</td>
            </tr>
        ))}
            </tbody>
        </table>
        <div className="total-expenses">
            <p>Total Expenses: ${expenseTotals}</p>
        </div>
        <div className="chart-wrapper">
            <DoughnutChart data={chartData} />
        </div>
    </div>
  )
}

export default Transactions