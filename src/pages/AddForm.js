export function AddProductForm(props) {
    function handleSubmit(event) {
      event.preventDefault();
      const form = event.target;
      const name = form.elements.name.value;
      const brand = form.elements.brand.value;
      const category = form.elements.category.value;
      const unitPrice = form.elements.unitPrice.value;
      const quantity = form.elements.quantity.value;
  
      if (!name ||!brand ||!unitPrice ||!quantity ||!category) {
        alert("Please fill all the details!!!");
        return;
      }
  
      const newProduct = {
        name,
        brand,
        category,
        price: parseInt(unitPrice, 10),
        quantity: parseInt(quantity, 10)
      };
  
      props.addProduct(newProduct);
    }
  
    return (
      <form className="row mb-5 g-3" onSubmit={(event) => handleSubmit(event)}>
        <div className="col-md-4">
          <label className="form-control">Name:</label>
          <input className="form-control" name="name" />
        </div>
  
        <div className="col-md-4">
          <label className="form-control">Brand:</label>
          <input className="form-control" name="brand" />
        </div>
  
        <div className="col-md-4">
          <label className="form-control">Category:</label>
          <input className="form-control" name="category" />
        </div>
  
        <div className="col-md-4">
          <label className="form-control">Unit Price:</label>
          <input className="form-control" name="unitPrice" />
        </div>
  
        <div className="col-md-4">
          <label className="form-control">Quantity:</label>
          <input className="form-control" name="quantity" />
        </div>
  
        <div className="col-md-12">
          <button type="submit" className="btn btn-primary btn-sm">Add</button>
        </div>
      </form>
    );
  }