$(document).ready(function () {
    $('#empleadoTable').DataTable({
        ajax: {
            url: "http://localhost:5214/api/Empleado/",
            dataSrc: ""
        },
        success: function (data) {
            console.log(data);
            console.log(data.data);
        },
        failure: function (response) {
            alert(response.responseText);
        },
        error: function (req, textStatus, errorThrown) {
            //this is going to happen when you send something different from a 200 OK HTTP
            alert('Wow algo salio mal ' + textStatus + ' ' + errorThrown);
        },
        columns: [
            {
                data: "idEmpleado"
            },
            {
                data: null, render: function (data, type, row) {
                    // Combine the first and last names into a single table field
                    return data.nombre + ' ' + data.apellido_Paterno + ' ' + data.apellido_Materno;
                }
            },
            { data: "email" },
            { data: "puesto" },
            { data: "rfc" },
            { data: "fecha_Alta" },
            { data: "estatus" },
            {
                data: null,
                render: function (data, type, full, meta) {
                    return '<a class="btn btn-primary"  onclick=EditData("' + full.idEmpleado + '");><i class="fa fa-pencil"></i></a>';
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return '<a href="#" class="btn btn-danger" onclick=DeleteData("' + row.idEmpleado + '");><i class="fa fa-trash"></i></a>';
                },
                orderable: false
            }
        ],
        columnDefs: [
            {
                targets: 5, render: function (data) { return moment(data).format('DD/MM/YYYY'); }
            },
            {
                targets: 6, visible: false
            }
        ],
        dom: 't'
    });

    $('a.editor-create').on('click', function (e) {
            e.preventDefault();

            editor.create({
                title: 'Crear nuevo registro',
                buttons: 'Add'
            });
     });

    $('#empleadoTable').on('click', 'td.editor-edit', function (e) {
            e.preventDefault();

            editor.edit($(this).closest('tr'), {
                title: 'Actualizar Registro',
                buttons: 'Update'
            });
        });

        // Delete a record
    $('#empleadoTable').on('click', 'td.editor-delete', function (e) {
            e.preventDefault();

            editor.remove($(this).closest('tr'), {
                title: 'Dar de baja',
                message: '¿Esta seguro de dar de baja?',
                buttons: 'Delete'
            });
    });

    $("#btnBuscar").click(function () {
        $('#modalBusqueda').modal('show'); 
    });

    $("#btnUpdate").click(function () {
        console.log("Entre");
        $("#empleadoTable").DataTable().ajax.reload();
    });

    $("#btnCrear").click(function () {
        $('#modalAlta').modal('show');
    });

});
