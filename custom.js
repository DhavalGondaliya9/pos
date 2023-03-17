function displayProducts() {
    return {
        error: {},
        errors: false,
        title: '',
        invoice: '',
        dateTime: '',
        address: '',
        quantity: '',
        productName: '',
        amount: '',
        subtotal: 0,
        tax: '',
        totalTax: 0,
        grandTotal: 0,
        cash: '',
        change: '',
        footer: '',
        productData: [],
        quantityArray: [],
        productNameArray: [],
        amountArray: [],
        quantityError: [],
        productNameError: [],
        amountError: [],

        addProduct() {
            this.productValidation();

            if (Object.keys(this.error).length > 0) {
                return false;
            }

            let length = this.quantityArray.length;
            this.quantityArray[length] = Math.round(this.quantity);
            this.productNameArray[length] = this.productName;
            this.amountArray[length] = this.amount;

            this.quantity = '';
            this.productName = '';
            this.amount = '';
            this.updateTotal();
        },

        changeTax(event) {

            if(event.target.value > 100){
                this.error.tax = "Tax maximum 100%";
                this.tax = '';
            }
            this.updateTotal();
        },

        productValidation() {
            this.error = {};
            if (this.quantity == "") {
                this.error.quantity = 'Quantity field required';
            } else {

                if (this.quantity <= 0) {
                    this.error.quantity = 'Quantity cannot be negative or 0';
                }

            }

            if (this.productName == "") {
                this.error.productName = 'Product Name field required';
            }

            if (this.amount == "") {
                this.error.amount = 'Amount field required';
            } else {

                if (this.amount < 0) {
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

            if (this.cash > 0) {
                this.change = parseInt(this.cash - this.grandTotal);
            }

        },
        changeValue() {

            this.productArrayValidation();

            this.updateTotal();
        },

        updateTotal() {
            this.subtotal = 0;
            this.totalTax = 0;
            this.grandTotal = 0;

            this.amountArray.map((amount) => {
                this.subtotal += parseInt(amount);
            });

            this.totalTax = (this.subtotal * this.tax) / 100;
            this.grandTotal = this.subtotal + this.totalTax;
            this.totalTax = this.totalTax.toFixed(2);
            this.subtotal = this.subtotal.toFixed(2);
            this.grandTotal = this.grandTotal.toFixed(2);

            this.changeCash();
        },

        productArrayValidation() {
            let $this = this;
            this.amountArray.map(function (element, index) {
                $this.quantityError[index] = '';

                if ($this.quantityArray[index] == '') {
                    $this.errors = true;
                    $this.quantityError[index] = 'Quantity field required';
                } else {
                    if ($this.quantityArray[index] <= 0) {
                        $this.errors = true;
                        $this.quantityError[index] = 'Quantity cannot be negative or 0';
                    }
                }

                $this.productNameError[index] = '';

                if ($this.productNameArray[index] == '') {
                    $this.errors = true;
                    $this.productNameError[index] = 'Product Name field required';
                }

                $this.amountError[index] = '';

                if ($this.amountArray[index] == '') {
                    $this.errors = true;
                    $this.amountError[index] = 'Amount field required';
                } else {

                    if ($this.amountArray[index] < 0) {
                        $this.errors = true;
                        $this.amountError[index] = 'Amount cannot be negative';
                    }

                }
            });
        },

        generatePDF() {
            this.error = {};
            this.errors = false;

            if (this.amountArray.length == 0) {
                this.productValidation();
            }

            if (this.title == "") {
                this.error.title = 'Title field required';
            }

            if (this.invoice == "") {
                this.error.invoice = 'Invoice field required';
            }

            if (this.dateTime == "") {
                this.error.dateTime = 'Date and Time field required';
            }

            if (this.address == "") {
                this.error.address = 'Address field required';
            }

            this.productArrayValidation();
            if (Object.keys(this.error).length > 0 || this.errors) {
                this.errors = true;
                window.scrollTo(0, 0);
                return false;
            }
            document.title = '';

            document.getElementById("pos-billing").style.display = "none";
            document.getElementById("print-pos-billing").style.display = "block";

            window.print();

            document.getElementById("pos-billing").style.display = "block";
            document.getElementById("print-pos-billing").style.display = "none";
        },
    }
}