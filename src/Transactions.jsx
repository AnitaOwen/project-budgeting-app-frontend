import { Link } from "react-router-dom"
// import DoughnutChart from "./DoughnutChart.jsx"

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

    // const chartData = {
    //     labels: ['Food', 'Rent', 'Transportation', 'Entertainment'],
    //     datasets: [
    //       {
    //         // label: 'Expenses',
    //         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8A2BE2'],
    //         hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8A2BE2'],
    //         data: [300, 500, 200, 100],
    //       },
    //     ],
    //   }

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
        {/* <DoughnutChart data={chartData} /> */}
    </div>
  )
}

export default Transactions