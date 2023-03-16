function displayProducts() {
    return {
        error: {},
        errors:false, 
        title : '',
        invoice : '',
        dateTime : '',
        address : '',
        quantity : '',
        productName : '',
        amount : '',
        subtotal: 0,
        tax: '',
        totalTax: 0,
        grandTotal: 0,
        cash: '',
        change: '',
        footer: '',
        productData:[],
        quantityArray : [],
        productNameArray : [],
        amountArray : [],
        quantityError : [],
        productNameError : [],
        amountError : [],

        addProduct() {
            this.productValidation();
            if (this.errors) {
                return false;
            }
            let length = this.quantityArray.length; 
            this.quantityArray[length]      = this.quantity;
            this.productNameArray[length]   = this.productName;
            this.amountArray[length]        = this.amount;

            this.quantity       = '';
            this.productName    = '';
            this.amount         = '';
            this.updateTotal();
        },
        productValidation() {
            this.error  = {};
            this.errors = false;
            if (this.quantity == "") {
                this.errors = true;
                this.error.quantity = 'Quantity field required';
            } else {
                
                if (this.quantity <= 0) {
                    this.errors = true;
                    this.error.quantity = 'Quantity cannot be negative or 0';
                }
            }

            if (this.productName == "") {
                this.errors = true;
                this.error.productName = 'Product Name field required';
            }

            if (this.amount == "") {
                this.errors = true;
                this.error.amount = 'Amount field required';
            } else {
                if (this.amount < 0) {
                    this.errors = true;
                    this.error.amount = 'Amount cannot be negative';
                }
            }
        },

        removeProduct(index) {
            this.quantityArray.splice(this.quantityArray.indexOf(index), 1);
            this.productNameArray.splice(this.productNameArray.indexOf(index), 1);
            this.amountArray.splice(this.amountArray.indexOf(index), 1);
            this.updateTotal();
        },
        changeCash() {
            if(this.cash > 0){
                this.change = parseInt(this.cash - this.grandTotal);
            }
        },
        changeValue(event,index) {
            if (event.target.name == 'quantity') {
                this.quantityError[index] = ''; 
                if (event.target.value == '') {
                    this.quantityError[index] = 'Quantity field required';
                } else {

                    if (event.target.value <= 0) {
                        this.quantityError[index] = 'Quantity cannot be negative or 0';
                    }
                }
            }
            if (event.target.name == 'productName') {
                this.productNameError[index] = ''; 
                if (event.target.value == '') {
                    this.productNameError[index] = 'Product Name field required';
                }
            }
            if (event.target.name == 'amount') {
                this.amountError[index] = ''; 
                if (event.target.value == '') {
                    this.amountError[index] = 'Amount field required';
                } else {
                    if (event.target.value < 0) {
                        this.amountError[index] = 'Amount cannot be negative';
                    }
                }

                this.updateTotal();
            }
        },

        updateTotal() {
            this.subtotal   = 0;
            this.totalTax   = 0;
            this.grandTotal = 0;

            this.amountArray.map((amount) => {
                this.subtotal += parseInt(amount);
            });

            this.totalTax   = (this.subtotal * this.tax) / 100;
            this.grandTotal = this.subtotal + this.totalTax;
            this.totalTax   = this.totalTax.toFixed(2);
            this.subtotal   = this.subtotal.toFixed(2);
            this.grandTotal = this.grandTotal.toFixed(2);
            this.changeCash();
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

            // this.amountArray.map((amount) => {
            //     this.subtotal += parseInt(amount);
            // });

            this.quantityError = [];
            this.productNameError = [];
            this.amountError = [];
            this.amountArray.map(function(element, index) {
                this.quantityError[index] = ''; 
                if (this.quantityArray[index] == '') {
                    this.errors = true;
                    this.quantityError[index] = 'Quantity field required';
                } else {
                    if (this.quantityArray[index] <= 0) {
                        this.errors = true;
                        this.quantityError[index] = 'Quantity cannot be negative or 0';
                    }
                }
                this.productNameError[index] = ''; 
                if (this.productNameArray[index] == '') {
                    this.errors = true;
                    this.productNameError[index] = 'Product Name field required';
                }

                this.amountError[index] = ''; 
                if (this.amountArray[index] == '') {
                    this.errors = true;
                    this.amountError[index] = 'Amount field required';
                } else {
                    if (this.amountArray[index] < 0) {
                        this.errors = true;
                        this.amountError[index] = 'Amount cannot be negative';
                    }
                }
            });
            
            if (this.errors) {
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