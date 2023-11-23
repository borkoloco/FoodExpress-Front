export const ProductsAdmin = () => {
  return (
    <>
      <button className="btn btn-success">Add</button>
      <table class="table caption-top bg-white rounded mt-2">
        <caption className="text-black fs-4">Products</caption>
        <thead>
          <tr>
            <th scope="col">#</th> <th scope="col">Product</th>
            <th scope="col">Last</th> <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th> <td>Ceviche</td> <td>Otto</td>{" "}
            <td>
              <button className="btn btn-primary">Edit</button>
              <button className="btn btn-warning">View</button>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th> <td>Arroz con pollo</td> <td>Thornton</td>
            <td><button className="btn btn-primary">Edit</button>
              <button className="btn btn-warning">View</button>
              <button className="btn btn-danger">Delete</button></td>
          </tr>
          <tr>
            <th scope="row">3</th> <td>Ensalada Rusa</td> <td>the Bird</td>
            <td><button className="btn btn-primary">Edit</button>
              <button className="btn btn-warning">View</button>
              <button className="btn btn-danger">Delete</button></td>
          </tr>
          <tr>
            <th scope="row">4</th> <td>Papa Rellena</td> <td>the Bird</td>
            <td><button className="btn btn-primary">Edit</button>
              <button className="btn btn-warning">View</button>
              <button className="btn btn-danger">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
