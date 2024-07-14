import React from "react";

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      productPrice: 0,
    };
  }
  render() {
    return (
      <form
        className="row g-3 mb-5 p-3 border rounded shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          this.props.addItem(this.state.productName, Number(this.state.productPrice));
        }}
      >
        <div className="col-md-4 col-12">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            aria-describedby="name"
            name="productName"
            onChange={(e) => {
              this.setState({ productName: e.currentTarget.value });
            }}
            value={this.state.productName}
          />
        </div>
        <div className="col-md-4 col-12">
          <label htmlFor="inputPrice" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="inputPrice"
            name="productPrice"
            onChange={(e) => {
              this.setState({ productPrice: e.currentTarget.value });
            }}
            value={this.state.productPrice}
          />
        </div>
        <div className="col-md-4 col-12 d-flex align-items-end">
          <button type="submit" className="btn btn-primary w-100">
            Add
          </button>
        </div>
      </form>
    );
  }
}

export default AddItem;
