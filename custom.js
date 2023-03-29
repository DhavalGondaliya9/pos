function displayProducts() {
    return {
        error: {},
        errors: false,
        title: localStorage.getItem('title'),
        invoice: localStorage.getItem('invoice'),
        dateTime: localStorage.getItem('dateTime'),
        address: localStorage.getItem('address'),
        quantity: '',
        productName: '',
        amount: '',
        subtotal: 0,
        tax: localStorage.getItem('tax'),
        totalTax: 0,
        grandTotal: 0,
        cash: localStorage.getItem('cash'),
        change: '',
        footer: localStorage.getItem('footer'),
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

            this.addLocalStorageProducts();

            this.quantity = '';
            this.productName = '';
            this.amount = '';

            this.updateTotal();
        },

        changeTax(event) {
            this.error.tax = '';
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

            this.addLocalStorageProducts();
            this.updateTotal();
        },

        changeCash() {

            if (this.cash > 0) {
                this.change = parseInt(this.cash - this.grandTotal);
            }

        },

        changeValue() {

            this.productArrayValidation();
            this.addLocalStorageProducts();
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

            if (this.title == '' || this.title == null) {
                this.error.title = 'Title field required';
            }

            if (this.invoice == "" || this.invoice == null) {
                this.error.invoice = 'Invoice field required';
            }

            if (this.dateTime == "" || this.dateTime == null) {
                this.error.dateTime = 'Date and Time field required';
            }

            if (this.address == "" || this.address == null) {
                this.error.address = 'Address field required';
            }

            this.productArrayValidation();

            if (Object.keys(this.error).length > 0 || this.errors) {
                this.errors = true;
                window.scrollTo(0, 0);
                return false;
            }
            document.title = this.title;
            document.getElementById("pos-billing").style.display = "none";
            document.getElementById("print-pos-billing").style.display = "block";

            window.print();

            document.getElementById("pos-billing").style.display = "block";
            document.getElementById("print-pos-billing").style.display = "none";
        },

        exportLocalStorage(type) {
            let data = {};
            let filename = '';

            if (type == 'export') {
                const keys = Object.keys(localStorage);
                const values = keys.map(key => localStorage.getItem(key));
                keys.forEach((key, i) => data[key] = values[i]);
            
                filename = 'local-storage-data.json';
            }

            if (type == 'sample') {
                data = {
                    title     : "The Lone Pine",
                    invoice   : "08000008",
                    dateTime  : "Mar 31, 2023 12:00 PM",
                    address   : "43 Manchester Road, 12480 Brisbane, Australia",
                    tax       : "18",
                    cash      : "71000",
                    footer    : "Bring this bill back within the next 10 days and get 15% discount on that day's food bill...",
                    products  : JSON.stringify([{quantity : 2, productName : 'phone', amount : 10000},{quantity : 4, productName : 'laptop', amount : 50000}])
                };
              
                filename = 'local-storage-sample-data.json';
            }
            
            const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
          
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        },

        importLocalStorage(event) {
            const file = event.target.files[0];
            if (!file.name.endsWith(".json")) {
                alert('Only json file accepted');
                event.target.value = '';
                return;
            }

            if (!file) return;

            const result = window.confirm("Are you sure you want to import this file?");
            if (result) {
                const reader = new FileReader();
                reader.onload = () => {
                    const data = JSON.parse(reader.result);
                    Object.entries(data).forEach(([key, value]) => localStorage.setItem(key, value));
                    alert('Data imported successfully');
                    window.location.reload();
                };
                reader.readAsText(file);
            }
            event.target.value = '';
        },
        setLocalStorageProducts() {
            let products = JSON.parse(localStorage.getItem('products'));
            let $this = this;
            if (products != null) {
                products.forEach(function(product,index) {
                    $this.quantityArray[index] = product.quantity;
                    $this.productNameArray[index] = product.productName;
                    $this.amountArray[index] = product.amount;
                });
                this.updateTotal();
            }
        },

        addLocalStorageProducts() {
            let productArray = [];
            let length = this.quantityArray.length;
            for (var i = 0; i < length; i++) {
                productArray[i] = {};
                productArray[i].quantity    = this.quantityArray[i];
                productArray[i].productName = this.productNameArray[i];
                productArray[i].amount      = this.amountArray[i]; 
            }

            localStorage.setItem('products', JSON.stringify(productArray));
        }
    }
}