// Business Logic for BankAccount ---------

function Bank() {
    this.accounts = {};
    this.currentId = 2206146243;
}

Bank.prototype.assignID = function () {
    this.currentId += 1264;
    return this.currentId;
};

Bank.prototype.addAccount = function (account) {
    account.id = this.assignID();
    this.accounts[account.id] = account
}

Bank.prototype.deleteAccount = function (id) {
    if (this.accounts[id] === undefined) {
        return false;
    }
    delete this.accounts[id];
    return true;
};

Bank.prototype.findAccount = function (id) {
    if (this.accounts[id] != undefined) {
        return this.accounts[id];
    }
    return false;
};

function account(name, address, passWord, balance) {
    this.name = name
    this.address = address
    this.passWord = passWord
    this.balance = balance
    this.history = ["Credit:$" + balance]
}

account.prototype.makeDeposit = function (amount) {
    $("#notice").hide();
    this.balance += parseInt(amount);
    this.history.push("Credit:$" + amount);
}

account.prototype.makeWithdrawl = function (amount) {
    if (amount > this.balance) {
        $("#notice").show();
    } else {
        $("#notice").hide();
        this.balance -= parseInt(amount);
        this.history.push("Debit:$" + amount);
    }
}

account.prototype.getHistory = function () {
    let output = "";
    for (let i = 0; i < this.history.length; i++) {
        if (this.history[i].toString().includes("Debit")) {
            output += "<span class='negative'>" + this.history[i] + "</span>";
        } else {
            output += "<span class='positive'>" + this.history[i] + "</span>";
        }
        if (i < this.history.length - 1) {
            output += ", ";
        }
    }
    return output;
}

let bank = new Bank();

function displayAccount(bank) {
    let accList = $(".accSelect");
    let accHTML = "";
    Object.keys(bank.accounts).forEach(function (key) {
        const account = bank.findAccount(key);
        accHTML += "<option id=" + account.id + ">" + account.name + "</option>";
    });
    accList.html(accHTML);
}

function showAccount(accountId) {
    const account = bank.findAccount(accountId);
    $(".balanceDisp").show();
    $(".accName").html(account.name);
    $(".bvnNum").html(account.id);
    $(".currBal").html("$" + account.balance);
    $(".accHistory").html(account.getHistory());
    let buttons = $("#buttons");
    buttons.empty();
    buttons.append("<button class='deleteButton' id=" + + account.id + ">Delete</button>");
}

function getSelectedAccount() {
    return parseInt($(".accSelect").children(":selected").attr("id"));
}

function attachAccountListeners() {
    $("#buttons").on("click", ".deleteButton", function () {
        bank.deleteAccount(this.id);
        $(".balanceDisp").hide();
        displayAccount(bank);
    });
}

function Confirm() {

    const passWord = $("#passWord").val();
    const passWord1 = passWord;

    if (passWord1 === passWord) {
        alert("Purchase Successful!!!!!");
    } else if (passWord1 !== passWord) {
        alert("WRONG PASSWORD!!!!");
    }
}

$(document).ready(function () {
    $("form#form-One").submit(function (event) {
        event.preventDefault();

        $("#gun").click(function () {
            $("#form-Two").show()
            $("#form-One").hide()
        })

        $("#xrt").click(function () {
            $("#form-Three").show()
            $("#form-One").hide()
            $("#form-Two").hide()
        })
    })
})


// User Interface Logic ---------

$(document).ready(function () {
    attachAccountListeners();
    $("#form-Two").submit(function (event) {
        event.preventDefault();
        const name = $("#inputName").val();
        const address = $("#currentAddress").val();
        const passWord = $("#passWord").val();
        const deposit = parseInt($("#initialDeposit").val());

        if (deposit < 1000) {
            $(".balanceDisp").hide();
            $("#notice2").show();
        } else {
            $("#notice2").hide();
            let newAccount = new account(name, address, passWord, deposit);
            bank.addAccount(newAccount);
            $("#inputName").val("");
            $("#currentAddress").val("");
            $("#passWord").val("")
            $("#initialDeposit").val("");
            displayAccount(bank);
            showAccount(getSelectedAccount());
        }

        $(document).ready(function () {
            $("input:radio[value=current]").click(function () {
                $("#form-Three").fadeIn("slow");
                $("#form-Two").hide();
            });
        });

    });



    $("#form-Three").submit(function (event) {
        event.preventDefault();
        const deposit = $("#newDeposit").val();
        const withdraw = $("#newWithdraw").val();
        $("#newDeposit").val("");
        $("#newWithdraw").val("");
        if (getSelectedAccount()) {
            if (deposit) {
                bank.findAccount(getSelectedAccount()).makeDeposit(deposit);
            }
            if (withdraw) {
                bank.findAccount(getSelectedAccount()).makeWithdrawl(withdraw);
            }
            showAccount(getSelectedAccount());
        }
    });
    $(".accSelect").change(function () {
        showAccount(getSelectedAccount());
    });

    $(document).ready(function () {
        $("#form-Three").submit(function (event) {
            event.preventDefault();

            Confirm();

        });
    });
})
