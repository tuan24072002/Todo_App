import Swal from "sweetalert2";

const failed = (text?: string) => {
  if (text !== "Unauthorized") {
    Swal.fire({
      icon: "error",
      title: "Có lỗi",
      text: text ?? "Lỗi chưa xác định",
      timer: 15000,
      customClass: {
        popup: "",
        confirmButton: "bg-main text-white py-2 px-4 rounded hover:bg-blue-600",
      },
    });
  }
};
const completed = (text?: string) => {
  Swal.fire({
    icon: "success",
    showConfirmButton: false,
    title: text ?? "Success!",
    text: "",
    timer: 2000,
  });
};
const processing = () => {
  Swal.fire({
    title: "Processing",
    /* timer: 10000,
        timerProgressBar: true, */
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};
export { failed, completed, processing };
