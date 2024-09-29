import { Compile, Css } from '@fileforge/react-print'

export function InvoiceTemplate({ invoice }) {
  return (
    <Compile>
      <Css>{`
        body { font-family: Arial, sans-serif; }
        .invoice { max-width: 800px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 20px; }
        .details { display: flex; justify-content: space-between; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      `}</Css>
      <div className="invoice">
        <div className="header">
          <h1>Invoice</h1>
        </div>
        <div className="details">
          <div>
            <h2>From:</h2>
            <p>{invoice.organization.name}</p>
          </div>
          <div>
            <h2>To:</h2>
            <p>{invoice.client.name}</p>
            <p>{invoice.client.email}</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.data.lineItems.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total">
          <h2>Total: ${invoice.data.lineItems.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2)}</h2>
        </div>
      </div>
    </Compile>
  )
}