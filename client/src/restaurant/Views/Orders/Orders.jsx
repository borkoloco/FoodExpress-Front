import { BackButton } from "../../../ui/components/BackButton/BackButton"

import style from "./Orders.module.css"


export const Orders = () => {
  return (
    <>
    <div className={style.containerHeader}>
        <BackButton />
        <hr />
        <h2>My Orders</h2>
      </div>

        <div className={`card ${style.containerTable}`}>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
                </tr>
            </tbody>
            </table>
        </div>
        


    </>
  )
}
