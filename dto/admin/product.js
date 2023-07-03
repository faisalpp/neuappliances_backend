class ProductDTO{
    constructor(product){
        this._id = product._id;
        this.title = product.title;
        this.salePrice = product.salePrice;
        this.regularPrice = product.regularPrice;
        this.rating = user.rating;
    }
}

module.exports = ProductDTO;