function displayProducts() {
    return {
        error: {},
        errors:false, 
        productData:[],
        countId : 0,
        title : '',
        invoice : '',
        dateTime : '',
        address : '',
        quantity : '',
        productName : '',
        amount : '',
        quantityArray : [],
        productNameArray : [],
        amountArray : [],
        quantityError : [],
        productNameError : [],
        amountError : [],
        subtotal: 0,
        tax: '',
        totalTax: 0,
        grandTotal: 0,
        cash: '',
        change: '',
        footer: '',

        addProduct() {
            this.productValidation();
            if (this.errors) {
                return false;
            }
            let length = this.quantityArray.length; 
            this.quantityArray[length]      = this.quantity;
            this.productNameArray[length]   = this.productName;
            this.amountArray[length]        = this.amount;
            this.countId++;
            this.productData.push({
                id          : this.countId,
                quantity    : this.quantity,
                name        : this.productName,
                amount      : this.amount,
            });
            this.quantity       = '';
            this.productName    = '';
            this.amount         = '';
            this.updateTotal();
        },
        productValidation() {
            this.error  = {};
            this.errors = false;
            // if (this.quantity == "") {
            //     this.errors = true;
            //     this.error.quantity = 'Quantity field required';
            // }

            // if (this.productName == "") {
            //     this.errors = true;
            //     this.error.productName = 'Product Name field required';
            // }

            // if (this.amount == "") {
            //     this.errors = true;
            //     this.error.amount = 'Amount field required';
            // }
        },

        removeProduct(product) {
            this.productData.splice(this.productData.indexOf(product), 1);
            this.updateTotal();
        },
        changeValue(event,index) {
            if (event.target.value == '') {
                this.quantityError[index] = 'required';
            }
        },

        updateTotal() {
            this.subtotal   = 0;
            this.totalTax   = 0;
            this.grandTotal = 0;

            this.productData.map((product) => {
                this.subtotal += parseInt(product.amount);
            });
            this.totalTax   = (this.subtotal * this.tax) / 100;
            this.grandTotal = this.subtotal + this.totalTax;
            this.totalTax   = this.totalTax.toFixed(2);
            this.subtotal   = this.subtotal.toFixed(2);
            this.grandTotal = this.grandTotal.toFixed(2);
            console.log(this.quantityArray);
            
        },

        generatePDF() {
            this.error = {};
            this.errors = false;
            if (this.title == "") {
                this.errors = true;
                this.error.title = 'Title field required';
            }
            
            if (this.invoice == "") {
                this.errors = true;
                this.error.invoice = 'Invoice field required';
            }

            if (this.dateTime == "") {
                this.errors = true;
                this.error.dateTime = 'Date and Time field required';
            }

            if (this.address == "") {
                this.errors = true;
                this.error.address = 'Address field required';
            }
            
            if (errors) {
                return false;
            }  
            // var printContents = document.getElementById("my-html").innerHTML;
            // var originalContents = document.body.innerHTML;

            // document.body.innerHTML = printContents;

            // window.print();

            // document.body.innerHTML = originalContents;
        },
    }
}