$().ready(function(){
    $.validator.addMethod("Chữ", function(value, element){
        return this.optional(element) || /^[a-zA-ZÀ-ỹ\s]+$/.test(value);
    },"Vui lòng chỉ nhập chữ cái và khoảng trắng.");

    $.validator.addMethod("Số", function(value, element){
        return this.optional(element) || /^[0-9]+$/.test(value);
    },"Vui lòng chỉ nhập số dương.");

    $("#transactionForm").validate({
    onfocusout: function(element) {
        this.element(element);
    },
    rules: {
        "khachHang":{
            required: true,
            Chữ: true,
            maxlength: 30,
        },
        "nhanVien": {
            required: true,
            Chữ: true,
            maxlength: 30,
        },
        "soTien": {
            required: true,
            Số: true
        }
    },
    messages: {
        "khachHang": {
            required: "Vui lòng nhập tên khách hàng",
            Chữ: "Vui lòng chỉ nhập chữ cái và khoảng trắng.",
            maxlength: "Tên khách hàng không được vượt quá 30 ký tự."
        },
        "nhanVien": {
            required: "Vui lòng nhập tên nhân viên",
            Chữ: "Vui lòng chỉ nhập chữ cái và khoảng trắng.",
            maxlength: "Tên nhân viên không được vượt quá 30 ký tự."
        },
        "soTien": {
            required: "Vui lòng nhập số tiền",
            Số: "Vui lòng chỉ nhập số."
        }
    },
    errorElement: "div",
    errorClass: "invalid-feedback",
    highlight: function(element) {
      $(element).addClass("is-invalid");
    },
    unhighlight: function(element) {
      $(element).removeClass("is-invalid");
    },
    errorPlacement: function(error, element) {
      error.insertAfter(element);
    },
    submitHandler: function(form) {
      alert("Data is valid! Employee added successfully.");
      form.reset();
      $("#addEmployeeModal").modal("hide");
    }
    });
});