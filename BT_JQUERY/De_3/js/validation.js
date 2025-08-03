$(document).ready(function () {
  $.validator.addMethod("chuKhongSo", function (value, element) {
    return this.optional(element) || /^[a-zA-ZÀ-ỹ\s]+$/.test(value);
  }, "Chỉ được nhập chữ cái và khoảng trắng.");

  $("#transactionForm").validate({
    onfocusout: function (element) {
      this.element(element);
    },
    rules: {
      "ten": {
        required: true,
        chuKhongSo: true,
        maxlength: 15
      },
      "hoDem": {
        required: true,
        chuKhongSo: true,
        maxlength: 20
      },
      "diaChi": {
        required: true,
        maxlength: 50
      }
    },
    messages: {
      "ten": {
        required: "Vui lòng nhập Tên.",
        chuKhongSo: "Tên chỉ được chứa chữ cái và khoảng trắng.",
        maxlength: "Tên không được vượt quá 15 ký tự."
      },
      "hoDem": {
        required: "Vui lòng nhập Họ đệm.",
        chuKhongSo: "Họ đệm chỉ được chứa chữ cái và khoảng trắng.",
        maxlength: "Họ đệm không được vượt quá 20 ký tự."
      },
      "diaChi": {
        required: "Vui lòng nhập Địa chỉ.",
        maxlength: "Địa chỉ không được vượt quá 50 ký tự."
      }
    },
    errorElement: "div",
    errorClass: "invalid-feedback",
    highlight: function (element) {
      $(element).addClass("is-invalid");
    },
    unhighlight: function (element) {
      $(element).removeClass("is-invalid");
    },
    errorPlacement: function (error, element) {
      error.insertAfter(element);
    },
    submitHandler: function (form) {
      alert("Dữ liệu hợp lệ! Gửi form thành công.");
      form.reset();
    }
  });
});
