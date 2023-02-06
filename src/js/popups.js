import Swal from 'sweetalert2'

export const MODAL = {
    generic: (title, text, icon, textButtonConfirm, textButtonCancel = 'Cancel') => {
        return Swal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: textButtonConfirm,
            cancelButtonText: textButtonCancel,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            showCancelButton: true,
        })
    }
}